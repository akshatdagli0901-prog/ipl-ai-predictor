import { useParams, Link } from "react-router-dom";
import matches from "../../data/matches";

function MatchDetails() {
  const { id } = useParams();

  const match = matches.find((m) => m.id === Number(id));

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Match Not Found
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-slate-900 rounded-3xl p-10">

          <div className="text-center">

            <h1 className="text-5xl font-bold text-white">
              {match.team1Short} vs {match.team2Short}
            </h1>

            <p className="text-slate-400 mt-4">
              {match.venue}
            </p>

            <p className="text-slate-500 mt-2">
              {match.date} • {match.time}
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">

            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {match.team1}
              </h2>

              <p className="text-4xl font-bold text-blue-400">
                {match.team1Score}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {match.team2}
              </h2>

              <p className="text-4xl font-bold text-blue-400">
                {match.team2Score}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">

            <div className="bg-slate-800 rounded-xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                Match Summary
              </h2>

              <p className="text-slate-300 mb-3">
                <strong>Status:</strong> {match.status}
              </p>

              <p className="text-slate-300 mb-3">
                <strong>Winner:</strong> {match.winner || "TBD"}
              </p>

              <p className="text-slate-300">
                <strong>Player of the Match:</strong>{" "}
                {match.playerOfMatch || "TBD"}
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                AI Analytics (Coming Soon)
              </h2>

              <ul className="space-y-3 text-slate-300">
                <li>• Win Probability</li>
                <li>• Toss Impact</li>
                <li>• Venue Analysis</li>
                <li>• Team Comparison</li>
                <li>• Player Impact Score</li>
              </ul>

            </div>

          </div>

          <div className="mt-10">
            <Link
              to="/matches"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"
            >
              ← Back to Matches
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

export default MatchDetails;