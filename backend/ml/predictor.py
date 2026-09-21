import os
import sys
import json
import joblib
import pandas as pd


# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_FILE = os.path.join(
    BASE_DIR,
    "model.pkl"
)

TEAM_STATS_FILE = os.path.join(
    BASE_DIR,
    "team_stats_2026.csv"
)

VENUE_STATS_FILE = os.path.join(
    BASE_DIR,
    "venue_stats_2026.csv"
)


# ============================================================
# LOAD MODEL AND STATISTICS
# ============================================================

model = joblib.load(MODEL_FILE)

team_stats = pd.read_csv(
    TEAM_STATS_FILE
)

venue_stats = pd.read_csv(
    VENUE_STATS_FILE
)


# ============================================================
# READ INPUT
# ============================================================

input_data = json.loads(
    sys.stdin.read()
)

team1 = input_data["team1"]
team2 = input_data["team2"]
venue = input_data["venue"]

toss_winner = input_data["toss_winner"]
toss_decision = input_data["toss_decision"]


# ============================================================
# GET TEAM STATISTICS
# ============================================================

def get_team_stats(team):

    row = team_stats[
        team_stats["team"] == team
    ]

    if row.empty:

        return {
            "matches": 0,
            "win_rate": 0.5,
            "avg_runs": 0,
            "avg_runs_conceded": 0,
            "avg_wickets_lost": 0,
            "avg_wickets_taken": 0,
        }

    row = row.iloc[0]

    return {
        "matches": float(row["matches"]),
        "win_rate": float(row["win_rate"]),
        "avg_runs": float(row["avg_runs"]),
        "avg_runs_conceded": float(
            row["avg_runs_conceded"]
        ),
        "avg_wickets_lost": float(
            row["avg_wickets_lost"]
        ),
        "avg_wickets_taken": float(
            row["avg_wickets_taken"]
        ),
    }


# ============================================================
# GET VENUE STATISTICS
# ============================================================

def get_venue_win_rate(
    venue_name,
    team
):

    row = venue_stats[
        (venue_stats["venue"] == venue_name)
        & (venue_stats["team"] == team)
    ]

    if row.empty:
        return 0.5

    return float(
        row.iloc[0]["win_rate"]
    )


# ============================================================
# LOAD TEAM DATA
# ============================================================

team1_data = get_team_stats(team1)
team2_data = get_team_stats(team2)


# ============================================================
# VENUE DATA
# ============================================================

team1_venue_win_rate = get_venue_win_rate(
    venue,
    team1
)

team2_venue_win_rate = get_venue_win_rate(
    venue,
    team2
)


# ============================================================
# CREATE MODEL FEATURES
# ============================================================

win_rate_diff = (
    team1_data["win_rate"]
    - team2_data["win_rate"]
)

avg_runs_diff = (
    team1_data["avg_runs"]
    - team2_data["avg_runs"]
)

runs_conceded_diff = (
    team1_data["avg_runs_conceded"]
    - team2_data["avg_runs_conceded"]
)

wickets_lost_diff = (
    team1_data["avg_wickets_lost"]
    - team2_data["avg_wickets_lost"]
)

wickets_taken_diff = (
    team1_data["avg_wickets_taken"]
    - team2_data["avg_wickets_taken"]
)

venue_win_rate_diff = (
    team1_venue_win_rate
    - team2_venue_win_rate
)

matches_diff = (
    team1_data["matches"]
    - team2_data["matches"]
)


# ============================================================
# TOSS FEATURES
# ============================================================

toss_team1 = int(
    toss_winner == team1
)

toss_bat = int(
    str(toss_decision).lower()
    in ["bat", "batted first"]
)


# ============================================================
# PREPARE MODEL INPUT
# ============================================================

prediction_input = pd.DataFrame([
    {
        "win_rate_diff":
            win_rate_diff,

        "avg_runs_diff":
            avg_runs_diff,

        "runs_conceded_diff":
            runs_conceded_diff,

        "wickets_lost_diff":
            wickets_lost_diff,

        "wickets_taken_diff":
            wickets_taken_diff,

        "venue_win_rate_diff":
            venue_win_rate_diff,

        "matches_diff":
            matches_diff,

        "toss_team1":
            toss_team1,

        "toss_bat":
            toss_bat,
    }
])


# ============================================================
# MODEL PREDICTION
# ============================================================

prediction = model.predict(
    prediction_input
)[0]

probabilities = model.predict_proba(
    prediction_input
)[0]


# ============================================================
# CONVERT MODEL OUTPUT TO TEAM PROBABILITIES
# ============================================================

# Model class 1 = Team 1 wins
# Model class 0 = Team 2 wins

class_probability = dict(
    zip(
        model.classes_,
        probabilities
    )
)

team1_probability = class_probability.get(
    1,
    0.5
)

team2_probability = class_probability.get(
    0,
    0.5
)


# ============================================================
# NORMALIZE
# ============================================================

total = (
    team1_probability
    + team2_probability
)

if total > 0:

    team1_probability /= total
    team2_probability /= total

else:

    team1_probability = 0.5
    team2_probability = 0.5


# ============================================================
# DETERMINE WINNER
# ============================================================

if team1_probability >= team2_probability:

    winner = team1

else:

    winner = team2


# ============================================================
# OUTPUT
# ============================================================

result = {

    "winner": winner,

    "team1": team1,

    "team2": team2,

    "team1Probability": round(
        team1_probability * 100,
        2
    ),

    "team2Probability": round(
        team2_probability * 100,
        2
    ),
}


print(
    json.dumps(result)
)