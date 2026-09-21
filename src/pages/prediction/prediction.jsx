import { useState } from "react";
import axios from "axios";
import teams from "../../data/teams";

function Prediction() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [venue, setVenue] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("bat");

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const venues = [
    "Wankhede Stadium",
    "M. A. Chidambaram Stadium",
    "Eden Gardens",
    "Narendra Modi Stadium",
    "M. Chinnaswamy Stadium",
    "Rajiv Gandhi International Stadium",
    "Sawai Mansingh Stadium",
    "Ekana Cricket Stadium",
    "Punjab Cricket Association Stadium",
    "Arun Jaitley Stadium",
  ];

  const handlePredict = async () => {
    if (
      !team1 ||
      !team2 ||
      !venue ||
      !tossWinner ||
      team1 === team2
    ) {
      alert("Please complete all fields and choose different teams.");
      return;
    }

    try {
      setLoading(true);
      setPrediction(null);

      const response = await axios.post(
        "http://localhost:5000/api/predict",
        {
          team1,
          team2,
          venue,
          tossWinner,
          tossDecision,
        }
      );

      setPrediction(response.data);
    } catch (error) {
      console.error("Prediction error:", error);

      alert(
        error.response?.data?.error ||
          "Backend connection failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const team1Probability =
    prediction?.team1Probability ?? 0;

  const team2Probability =
    prediction?.team2Probability ?? 0;

  const winnerProbability =
    prediction?.winner === prediction?.team1
      ? team1Probability
      : team2Probability;

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <h1 className="text-5xl font-bold text-center text-white">
          IPL Match Predictor
        </h1>

        <p className="text-slate-400 text-center mt-4 mb-12">
          Predict IPL Match Winner using AI
        </p>


        {/* PREDICTION FORM */}

        <div className="bg-slate-900 rounded-3xl p-8 space-y-6">

          {/* TEAM 1 */}

          <select
            value={team1}
            onChange={(e) => {
              setTeam1(e.target.value);
              setTossWinner("");
            }}
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          >
            <option value="">
              Select Team 1
            </option>

            {teams.map((team) => (
              <option
                key={team.id}
                value={team.name}
              >
                {team.name}
              </option>
            ))}
          </select>


          {/* TEAM 2 */}

          <select
            value={team2}
            onChange={(e) => {
              setTeam2(e.target.value);
              setTossWinner("");
            }}
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          >
            <option value="">
              Select Team 2
            </option>

            {teams.map((team) => (
              <option
                key={team.id}
                value={team.name}
              >
                {team.name}
              </option>
            ))}
          </select>


          {/* VENUE */}

          <select
            value={venue}
            onChange={(e) =>
              setVenue(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          >
            <option value="">
              Select Venue
            </option>

            {venues.map((venueName) => (
              <option
                key={venueName}
                value={venueName}
              >
                {venueName}
              </option>
            ))}
          </select>


          {/* TOSS WINNER */}

          <select
            value={tossWinner}
            onChange={(e) =>
              setTossWinner(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          >
            <option value="">
              Toss Winner
            </option>

            {teams
              .filter(
                (team) =>
                  team.name === team1 ||
                  team.name === team2
              )
              .map((team) => (
                <option
                  key={team.id}
                  value={team.name}
                >
                  {team.name}
                </option>
              ))}
          </select>


          {/* TOSS DECISION */}

          <select
            value={tossDecision}
            onChange={(e) =>
              setTossDecision(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
          >
            <option value="bat">
              Bat
            </option>

            <option value="bowl">
              Bowl
            </option>
          </select>


          {/* PREDICT BUTTON */}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-xl text-white font-bold transition"
          >
            {loading
              ? "Predicting..."
              : "Predict Winner"}
          </button>

        </div>


        {/* RESULT */}

        {prediction && (
          <div className="mt-10 bg-slate-900 rounded-3xl p-8">

            <h2 className="text-3xl text-green-400 font-bold mb-6">
              Prediction Result
            </h2>


            {/* WINNER */}

            <div className="text-center mb-8">

              <p className="text-slate-400 mb-2">
                Predicted Winner
              </p>

              <h3 className="text-3xl text-white font-bold">
                🏆 {prediction.winner}
              </h3>

            </div>


            {/* TEAM 1 PROBABILITY */}

            <div className="space-y-6">

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white font-semibold">
                    {prediction.team1}
                  </span>

                  <span className="text-blue-400 font-bold">
                    {team1Probability}%
                  </span>

                </div>

                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${team1Probability}%`,
                    }}
                  />

                </div>

              </div>


              {/* TEAM 2 PROBABILITY */}

              <div>

                <div className="flex justify-between mb-2">

                  <span className="text-white font-semibold">
                    {prediction.team2}
                  </span>

                  <span className="text-purple-400 font-bold">
                    {team2Probability}%
                  </span>

                </div>

                <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${team2Probability}%`,
                    }}
                  />

                </div>

              </div>

            </div>


            {/* WINNER PROBABILITY */}

            <div className="mt-8 p-5 bg-slate-800 rounded-2xl text-center">

              <p className="text-slate-400">
                Winner Probability
              </p>

              <p className="text-4xl font-bold text-green-400 mt-2">
                {winnerProbability}%
              </p>

            </div>


            {/* MODEL INFORMATION */}

            <div className="mt-6 text-center">

              <p className="text-slate-500 text-sm">
                Prediction generated by the IPL 2026
                performance-based Random Forest ML model
              </p>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Prediction;