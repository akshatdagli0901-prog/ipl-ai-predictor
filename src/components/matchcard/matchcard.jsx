import { Link } from "react-router-dom";

function MatchCard({
  id,
  team1,
  team1Short,
  team2,
  team2Short,
  venue,
  date,
  time,
  status,
  winner,
  team1Score,
  team2Score,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition duration-300">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-white text-xl font-bold">
          {team1Short} vs {team2Short}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "Completed"
              ? "bg-green-600 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="space-y-4">

        <div className="flex justify-between items-center">
          <span className="text-white font-medium">{team1}</span>
          <span className="text-slate-300">{team1Score}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white font-medium">{team2}</span>
          <span className="text-slate-300">{team2Score}</span>
        </div>

      </div>

      <div className="mt-6 border-t border-slate-700 pt-4">

        <p className="text-slate-400 text-sm">
          📍 {venue}
        </p>

        <p className="text-slate-400 text-sm mt-2">
          📅 {date} • {time}
        </p>

        {status === "Completed" && (
          <p className="text-green-400 font-medium mt-3">
            Winner: {winner}
          </p>
        )}

      </div>

      <div className="mt-6">

        <Link
          to={`/matches/${id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white font-semibold"
        >
          View Match
        </Link>

      </div>

    </div>
  );
}

export default MatchCard;