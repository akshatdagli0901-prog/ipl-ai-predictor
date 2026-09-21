import os
import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score


# ============================================================
# PATHS
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_FILE = os.path.join(
    BASE_DIR,
    "dataset",
    "ipl_matches_2026.csv"
)

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
# LOAD DATA
# ============================================================

print("\nLoading IPL 2026 dataset...")

df = pd.read_csv(DATASET_FILE)

print(f"Rows loaded: {len(df)}")


# ============================================================
# REQUIRED COLUMNS
# ============================================================

required_columns = [
    "date",
    "team1",
    "team2",
    "venue",
    "toss_winner",
    "toss_decision",
    "team1_runs",
    "team1_wickets",
    "team2_runs",
    "team2_wickets",
    "winner",
]

missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]

if missing_columns:
    raise ValueError(
        f"\nMissing columns: {missing_columns}"
    )


# ============================================================
# CLEAN DATA
# ============================================================

matches = df[required_columns].copy()

matches["date"] = pd.to_datetime(
    matches["date"],
    errors="coerce"
)

matches = matches.dropna(
    subset=[
        "team1",
        "team2",
        "venue",
        "toss_winner",
        "toss_decision",
        "winner",
    ]
)

matches = matches.drop_duplicates()

matches = matches.sort_values(
    "date"
).reset_index(drop=True)

print(f"Clean matches: {len(matches)}")


# ============================================================
# STAT STORAGE
# ============================================================

team_stats = {}

venue_stats = {}

training_rows = []


def get_team(team):

    if team not in team_stats:

        team_stats[team] = {
            "matches": 0,
            "wins": 0,
            "runs_scored": 0,
            "runs_conceded": 0,
            "wickets_lost": 0,
            "wickets_taken": 0,
        }

    return team_stats[team]


def get_venue_team(venue, team):

    key = (venue, team)

    if key not in venue_stats:

        venue_stats[key] = {
            "matches": 0,
            "wins": 0,
        }

    return venue_stats[key]


# ============================================================
# BUILD PRE-MATCH FEATURES
# ============================================================

for _, match in matches.iterrows():

    team1 = match["team1"]
    team2 = match["team2"]
    venue = match["venue"]
    winner = match["winner"]

    t1 = get_team(team1)
    t2 = get_team(team2)

    v1 = get_venue_team(
        venue,
        team1
    )

    v2 = get_venue_team(
        venue,
        team2
    )


    # --------------------------------------------------------
    # TEAM PERFORMANCE
    # --------------------------------------------------------

    t1_matches = t1["matches"]
    t2_matches = t2["matches"]


    if t1_matches > 0:

        t1_win_rate = t1["wins"] / t1_matches
        t1_avg_runs = t1["runs_scored"] / t1_matches
        t1_avg_conceded = t1["runs_conceded"] / t1_matches
        t1_avg_lost = t1["wickets_lost"] / t1_matches
        t1_avg_taken = t1["wickets_taken"] / t1_matches

    else:

        t1_win_rate = 0.5
        t1_avg_runs = 0
        t1_avg_conceded = 0
        t1_avg_lost = 0
        t1_avg_taken = 0


    if t2_matches > 0:

        t2_win_rate = t2["wins"] / t2_matches
        t2_avg_runs = t2["runs_scored"] / t2_matches
        t2_avg_conceded = t2["runs_conceded"] / t2_matches
        t2_avg_lost = t2["wickets_lost"] / t2_matches
        t2_avg_taken = t2["wickets_taken"] / t2_matches

    else:

        t2_win_rate = 0.5
        t2_avg_runs = 0
        t2_avg_conceded = 0
        t2_avg_lost = 0
        t2_avg_taken = 0


    # --------------------------------------------------------
    # VENUE PERFORMANCE
    # --------------------------------------------------------

    if v1["matches"] > 0:

        t1_venue_win_rate = (
            v1["wins"] / v1["matches"]
        )

    else:

        t1_venue_win_rate = 0.5


    if v2["matches"] > 0:

        t2_venue_win_rate = (
            v2["wins"] / v2["matches"]
        )

    else:

        t2_venue_win_rate = 0.5


    # --------------------------------------------------------
    # DIFFERENCE FEATURES
    # --------------------------------------------------------

    win_rate_diff = (
        t1_win_rate - t2_win_rate
    )

    avg_runs_diff = (
        t1_avg_runs - t2_avg_runs
    )

    runs_conceded_diff = (
        t1_avg_conceded - t2_avg_conceded
    )

    wickets_lost_diff = (
        t1_avg_lost - t2_avg_lost
    )

    wickets_taken_diff = (
        t1_avg_taken - t2_avg_taken
    )

    venue_win_rate_diff = (
        t1_venue_win_rate -
        t2_venue_win_rate
    )

    matches_diff = (
        t1_matches - t2_matches
    )


    # --------------------------------------------------------
    # TOSS
    # --------------------------------------------------------

    toss_team1 = int(
        match["toss_winner"] == team1
    )

    toss_bat = int(
        str(match["toss_decision"]).lower()
        in ["bat", "batted first"]
    )


    # --------------------------------------------------------
    # TARGET
    #
    # 1 = TEAM 1 WINS
    # 0 = TEAM 2 WINS
    # --------------------------------------------------------

    team1_won = int(
        winner == team1
    )


    training_rows.append({

        "win_rate_diff": win_rate_diff,

        "avg_runs_diff": avg_runs_diff,

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

        "team1_won":
            team1_won,
    })


    # ========================================================
    # UPDATE TEAM STATS
    # ========================================================

    t1["matches"] += 1
    t2["matches"] += 1

    team1_runs = (
        match["team1_runs"]
        if pd.notna(match["team1_runs"])
        else 0
    )

    team2_runs = (
        match["team2_runs"]
        if pd.notna(match["team2_runs"])
        else 0
    )

    team1_wickets = (
        match["team1_wickets"]
        if pd.notna(match["team1_wickets"])
        else 0
    )

    team2_wickets = (
        match["team2_wickets"]
        if pd.notna(match["team2_wickets"])
        else 0
    )


    t1["runs_scored"] += team1_runs
    t2["runs_scored"] += team2_runs

    t1["runs_conceded"] += team2_runs
    t2["runs_conceded"] += team1_runs

    t1["wickets_lost"] += team1_wickets
    t2["wickets_lost"] += team2_wickets

    t1["wickets_taken"] += team2_wickets
    t2["wickets_taken"] += team1_wickets


    if winner == team1:
        t1["wins"] += 1

    elif winner == team2:
        t2["wins"] += 1


    # ========================================================
    # UPDATE VENUE STATS
    # ========================================================

    v1["matches"] += 1
    v2["matches"] += 1

    if winner == team1:
        v1["wins"] += 1

    elif winner == team2:
        v2["wins"] += 1


# ============================================================
# CREATE TRAINING DATA
# ============================================================

training_df = pd.DataFrame(
    training_rows
)

print(
    f"Training rows created: {len(training_df)}"
)


# ============================================================
# FEATURES
# ============================================================

features = [
    "win_rate_diff",
    "avg_runs_diff",
    "runs_conceded_diff",
    "wickets_lost_diff",
    "wickets_taken_diff",
    "venue_win_rate_diff",
    "matches_diff",
    "toss_team1",
    "toss_bat",
]

X = training_df[features]

y = training_df["team1_won"]


# ============================================================
# MODEL
# ============================================================

model = RandomForestClassifier(
    n_estimators=500,
    max_depth=5,
    min_samples_leaf=3,
    max_features="sqrt",
    class_weight="balanced",
    random_state=42,
)


# ============================================================
# CROSS VALIDATION
# ============================================================

print("\nRunning 5-fold cross-validation...")

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

scores = cross_val_score(
    model,
    X,
    y,
    cv=cv,
    scoring="accuracy"
)

print("\n======================================")
print("IPL 2026 PERFORMANCE MODEL")
print("======================================")

print(
    "Fold accuracies:"
)

for index, score in enumerate(scores, 1):

    print(
        f"Fold {index}: "
        f"{score * 100:.2f}%"
    )

print(
    f"\nAverage Accuracy: "
    f"{scores.mean() * 100:.2f}%"
)

print(
    f"Standard Deviation: "
    f"{scores.std() * 100:.2f}%"
)


# ============================================================
# FEATURE IMPORTANCE
# ============================================================

model.fit(
    X,
    y
)

importance_df = pd.DataFrame({

    "feature": features,

    "importance":
        model.feature_importances_

}).sort_values(
    "importance",
    ascending=False
)

print("\nFeature Importance:")

print(
    importance_df.to_string(
        index=False
    )
)


# ============================================================
# SAVE MODEL
# ============================================================

joblib.dump(
    model,
    MODEL_FILE
)

print(
    f"\nModel saved successfully:\n"
    f"{MODEL_FILE}"
)


# ============================================================
# SAVE TEAM STATS
# ============================================================

team_rows = []

for team, stats in team_stats.items():

    matches_played = stats["matches"]

    team_rows.append({

        "team": team,

        "matches": matches_played,

        "wins": stats["wins"],

        "win_rate": (
            stats["wins"] / matches_played
            if matches_played > 0
            else 0.5
        ),

        "avg_runs": (
            stats["runs_scored"] /
            matches_played
            if matches_played > 0
            else 0
        ),

        "avg_runs_conceded": (
            stats["runs_conceded"] /
            matches_played
            if matches_played > 0
            else 0
        ),

        "avg_wickets_lost": (
            stats["wickets_lost"] /
            matches_played
            if matches_played > 0
            else 0
        ),

        "avg_wickets_taken": (
            stats["wickets_taken"] /
            matches_played
            if matches_played > 0
            else 0
        ),
    })


pd.DataFrame(
    team_rows
).to_csv(
    TEAM_STATS_FILE,
    index=False
)


# ============================================================
# SAVE VENUE STATS
# ============================================================

venue_rows = []

for (venue, team), stats in venue_stats.items():

    matches_played = stats["matches"]

    venue_rows.append({

        "venue": venue,

        "team": team,

        "matches": matches_played,

        "wins": stats["wins"],

        "win_rate": (
            stats["wins"] / matches_played
            if matches_played > 0
            else 0.5
        ),
    })


pd.DataFrame(
    venue_rows
).to_csv(
    VENUE_STATS_FILE,
    index=False
)


print(
    f"\nTeam statistics saved to:\n"
    f"{TEAM_STATS_FILE}"
)

print(
    f"\nVenue statistics saved to:\n"
    f"{VENUE_STATS_FILE}"
)

print("\nDone.")