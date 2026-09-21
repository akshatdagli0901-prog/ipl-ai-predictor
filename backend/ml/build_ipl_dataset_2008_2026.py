import json
import zipfile
import urllib.request
from pathlib import Path
from collections import defaultdict, deque
from datetime import datetime
import pandas as pd
import numpy as np

URL = "https://cricsheet.org/downloads/ipl_json.zip"
BASE = Path(__file__).resolve().parent
ZIP_PATH = BASE / "ipl_json.zip"
JSON_DIR = BASE / "ipl_json"
RAW_OUT = BASE / "ipl_matches_2008_2026_raw.csv"
MODEL_OUT = BASE / "ipl_prediction_dataset_2008_2026.csv"

print("Downloading official IPL JSON data from Cricsheet...")
urllib.request.urlretrieve(URL, ZIP_PATH)

JSON_DIR.mkdir(exist_ok=True)
with zipfile.ZipFile(ZIP_PATH, "r") as z:
    z.extractall(JSON_DIR)

def season_label(info, date):
    comp = info.get("event", {}).get("name", "")
    if comp and comp != "Indian Premier League":
        return str(comp)
    # Cricsheet IPL season labels are normally supplied in event.name.
    season = info.get("season")
    if season is not None:
        return str(season)
    y = date.year
    # IPL 2008 onward; seasons are calendar-year labels for the IPL.
    return str(y)

def safe_mean(values, default=0.0):
    return float(np.mean(values)) if values else default

def get_innings_totals(data):
    totals = []
    wickets = []
    for innings in data.get("innings", []):
        team = innings.get("team")
        runs = 0
        wkts = 0
        for over in innings.get("overs", []):
            for d in over.get("deliveries", []):
                runs += int(d.get("runs", {}).get("total", 0))
                wkts += len(d.get("wickets", []))
        totals.append((team, runs))
        wickets.append((team, wkts))
    return dict(totals), dict(wickets)

def player_match_stats(data):
    batting = defaultdict(lambda: {"runs": 0, "balls": 0})
    bowling = defaultdict(lambda: {"balls": 0, "runs": 0, "wickets": 0})
    player_team = {}

    for innings in data.get("innings", []):
        batting_team = innings.get("team")
        for p in data.get("info", {}).get("players", {}).get(batting_team, []):
            player_team[p] = batting_team

        bowling_team = next(
            (t for t in data.get("info", {}).get("players", {}) if t != batting_team),
            None
        )
        for over in innings.get("overs", []):
            for d in over.get("deliveries", []):
                batter = d.get("batter")
                bowler = d.get("bowler")
                runs = d.get("runs", {})
                batter_runs = int(runs.get("batter", 0))
                extras = d.get("extras", {})
                legal = not ("wides" in extras or "noballs" in extras)

                batting[batter]["runs"] += batter_runs
                if legal:
                    batting[batter]["balls"] += 1

                bowling[bowler]["balls"] += 1 if legal else 0
                bowling[bowler]["runs"] += int(runs.get("total", 0))
                for w in d.get("wickets", []):
                    kind = w.get("kind", "")
                    if kind not in {"run out", "retired hurt", "retired out", "obstructing the field"}:
                        bowling[bowler]["wickets"] += 1

    return batting, bowling, player_team

# Team state contains only information from matches already completed.
team = defaultdict(lambda: {
    "matches": 0, "wins": 0, "runs_for": [], "runs_against": [],
    "wickets_for": [], "wickets_lost": [], "recent": deque(maxlen=5)
})
venue_team = defaultdict(lambda: {"matches": 0, "wins": 0})
h2h = defaultdict(lambda: {"matches": 0, "wins_a": 0})
player = defaultdict(lambda: {
    "matches": 0, "runs": [], "balls": [], "wickets": [], "bowl_runs": [], "bowl_balls": []
})

files = []
for p in JSON_DIR.rglob("*.json"):
    files.append(p)

records = []
prediction_rows = []

def team_features(name, venue):
    s = team[name]
    matches = s["matches"]
    win_rate = s["wins"] / matches if matches else 0.5
    recent = list(s["recent"])
    recent_win_rate = sum(recent) / len(recent) if recent else 0.5
    return {
        "matches": matches,
        "wins": s["wins"],
        "win_rate": win_rate,
        "recent5_win_rate": recent_win_rate,
        "avg_runs_for": safe_mean(s["runs_for"]),
        "avg_runs_against": safe_mean(s["runs_against"]),
        "avg_wickets_taken": safe_mean(s["wickets_for"]),
        "avg_wickets_lost": safe_mean(s["wickets_lost"]),
        "venue_win_rate": (
            venue_team[(name, venue)]["wins"] / venue_team[(name, venue)]["matches"]
            if venue_team[(name, venue)]["matches"] else 0.5
        )
    }

def player_strength(players):
    bat_runs = []
    bat_sr = []
    wickets = []
    bowl_econ = []
    for p in players:
        s = player[p]
        if s["matches"]:
            bat_runs.append(safe_mean(s["runs"]))
            balls = sum(s["balls"])
            runs = sum(s["runs"])
            if balls:
                bat_sr.append(100 * runs / balls)
            wickets.append(safe_mean(s["wickets"]))
            bballs = sum(s["bowl_balls"])
            bruns = sum(s["bowl_runs"])
            if bballs:
                bowl_econ.append(6 * bruns / bballs)
    return {
        "bat_runs": safe_mean(bat_runs),
        "bat_sr": safe_mean(bat_sr),
        "wickets": safe_mean(wickets),
        "bowl_econ": safe_mean(bowl_econ, 8.0)
    }

for path in sorted(files):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        continue

    info = data.get("info", {})
    if info.get("gender") not in (None, "male"):
        continue
    teams = info.get("teams", [])
    dates = info.get("dates", [])
    if len(teams) != 2 or not dates:
        continue

    date = pd.to_datetime(str(dates[0])).date()
    if not (2008 <= date.year <= 2026):
        continue

    t1, t2 = teams
    venue = info.get("venue", "Unknown")
    city = info.get("city", "")
    toss = info.get("toss", {})
    toss_winner = toss.get("winner", "")
    toss_decision = toss.get("decision", "")

    outcome = info.get("outcome", {})
    winner = outcome.get("winner")

    totals, wickets = get_innings_totals(data)
    t1_runs = totals.get(t1, np.nan)
    t2_runs = totals.get(t2, np.nan)
    t1_wkts = wickets.get(t1, np.nan)
    t2_wkts = wickets.get(t2, np.nan)

    result_type = "no_result"
    win_by_runs = 0
    win_by_wickets = 0
    if winner:
        by = outcome.get("by", {})
        if "runs" in by:
            result_type = "runs"
            win_by_runs = by["runs"]
        elif "wickets" in by:
            result_type = "wickets"
            win_by_wickets = by["wickets"]
        elif "innings" in by:
            result_type = "innings"
        else:
            result_type = "other"

    season = season_label(info, date)

    # PRE-MATCH features only.
    f1 = team_features(t1, venue)
    f2 = team_features(t2, venue)

    h = h2h[(t1, t2)]
    h2h_rate = h["wins_a"] / h["matches"] if h["matches"] else 0.5

    lineups = info.get("players", {})
    ps1 = player_strength(lineups.get(t1, []))
    ps2 = player_strength(lineups.get(t2, []))

    row = {
        "match_id": path.stem,
        "date": date.isoformat(),
        "season": season,
        "city": city,
        "venue": venue,
        "team1": t1,
        "team2": t2,
        "toss_winner": toss_winner,
        "toss_decision": toss_decision,
        "team1_win_rate": f1["win_rate"],
        "team2_win_rate": f2["win_rate"],
        "team1_recent5_win_rate": f1["recent5_win_rate"],
        "team2_recent5_win_rate": f2["recent5_win_rate"],
        "team1_avg_runs_for": f1["avg_runs_for"],
        "team2_avg_runs_for": f2["avg_runs_for"],
        "team1_avg_runs_against": f1["avg_runs_against"],
        "team2_avg_runs_against": f2["avg_runs_against"],
        "team1_avg_wickets_taken": f1["avg_wickets_taken"],
        "team2_avg_wickets_taken": f2["avg_wickets_taken"],
        "team1_avg_wickets_lost": f1["avg_wickets_lost"],
        "team2_avg_wickets_lost": f2["avg_wickets_lost"],
        "team1_venue_win_rate": f1["venue_win_rate"],
        "team2_venue_win_rate": f2["venue_win_rate"],
        "head_to_head_team1_win_rate": h2h_rate,
        "team1_matches_before": f1["matches"],
        "team2_matches_before": f2["matches"],
        "team1_player_avg_runs": ps1["bat_runs"],
        "team2_player_avg_runs": ps2["bat_runs"],
        "team1_player_avg_strike_rate": ps1["bat_sr"],
        "team2_player_avg_strike_rate": ps2["bat_sr"],
        "team1_player_avg_wickets": ps1["wickets"],
        "team2_player_avg_wickets": ps2["wickets"],
        "team1_player_avg_bowl_economy": ps1["bowl_econ"],
        "team2_player_avg_bowl_economy": ps2["bowl_econ"],
        "toss_team1": int(toss_winner == t1),
        "toss_bat": int(toss_decision == "bat"),
        "winner": winner if winner else "No Result",
        "team1_win": int(winner == t1) if winner in teams else np.nan,
        "team1_runs": t1_runs,
        "team2_runs": t2_runs,
        "team1_wickets": t1_wkts,
        "team2_wickets": t2_wkts,
        "result_type": result_type,
        "win_by_runs": win_by_runs,
        "win_by_wickets": win_by_wickets,
    }
    records.append(row)

    if winner in teams:
        prediction_rows.append(row.copy())

    # Update historical state AFTER creating the row.
    if winner in teams:
        for name, opp, runs_for, runs_against, wk_for, wk_lost in [
            (t1, t2, t1_runs, t2_runs, t1_wkts, t2_wkts),
            (t2, t1, t2_runs, t1_runs, t2_wkts, t1_wkts),
        ]:
            s = team[name]
            s["matches"] += 1
            won = int(winner == name)
            s["wins"] += won
            s["recent"].append(won)
            if pd.notna(runs_for): s["runs_for"].append(float(runs_for))
            if pd.notna(runs_against): s["runs_against"].append(float(runs_against))
            if pd.notna(wk_for): s["wickets_for"].append(float(wk_for))
            if pd.notna(wk_lost): s["wickets_lost"].append(float(wk_lost))

            vt = venue_team[(name, venue)]
            vt["matches"] += 1
            vt["wins"] += won

        h["matches"] += 1
        if winner == t1:
            h["wins_a"] += 1

        batting, bowling, pteams = player_match_stats(data)
        for p, st in batting.items():
            player[p]["matches"] += 1
            player[p]["runs"].append(st["runs"])
            player[p]["balls"].append(st["balls"])
        for p, st in bowling.items():
            player[p]["wickets"].append(st["wickets"])
            player[p]["bowl_runs"].append(st["runs"])
            player[p]["bowl_balls"].append(st["balls"])

raw_df = pd.DataFrame(records).sort_values("date")
model_df = pd.DataFrame(prediction_rows).sort_values("date")

raw_df.to_csv(RAW_OUT, index=False)
model_df.to_csv(MODEL_OUT, index=False)

print(f"\nCreated:")
print(RAW_OUT)
print(MODEL_OUT)
print(f"\nRaw matches: {len(raw_df)}")
print(f"Usable prediction rows: {len(model_df)}")
print(f"Seasons: {model_df['season'].nunique()}")
print("\nModel features:")
print(", ".join(model_df.columns))