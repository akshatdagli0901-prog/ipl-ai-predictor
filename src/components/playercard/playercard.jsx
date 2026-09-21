import { Link } from "react-router-dom";
import { FaUser, FaChartLine } from "react-icons/fa";

function PlayerCard({
  id,
  name,
  shortTeam,
  role,
  matches,
  runs,
  wickets,
  average,
  strikeRate,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition duration-300 border border-slate-800">

      <div className="bg-blue-600 p-6 flex justify-center">
        <FaUser className="text-6xl text-white" />
      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold text-white">
          {name}
        </h2>

        <p className="text-slate-400 mt-1">
          {shortTeam} • {role}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-slate-400 text-sm">Matches</p>
            <p className="text-xl font-bold text-white">{matches}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-slate-400 text-sm">Runs</p>
            <p className="text-xl font-bold text-white">{runs}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-slate-400 text-sm">Wickets</p>
            <p className="text-xl font-bold text-white">{wickets}</p>
          </div>

          <div className="bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-slate-400 text-sm">Average</p>
            <p className="text-xl font-bold text-white">{average}</p>
          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-slate-400">
            <FaChartLine />
            <span>{strikeRate} SR</span>
          </div>

          <Link
            to={`/players/${id}`}
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white font-semibold"
          >
            View Profile
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PlayerCard;