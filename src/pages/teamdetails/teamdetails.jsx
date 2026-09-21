import { useParams, Link } from "react-router-dom";
import {
  FaTrophy,
  FaCalendarAlt,
  FaChartLine,
  FaHome,
  FaUserTie,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";

import teams from "../../data/teams";

function TeamDetails() {
  const { id } = useParams();

  const team = teams.find((t) => t.id === Number(id));

  if (!team) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Team Not Found</h1>

          <Link
            to="/teams"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
          >
            Back to Teams
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div
          className="rounded-2xl p-10 shadow-xl flex flex-col md:flex-row items-center gap-8"
          style={{ backgroundColor: team.primaryColor }}
        >
          <img
            src={team.logo}
            alt={team.shortName}
            className="w-40 h-40 object-contain bg-white rounded-full p-3 shadow-lg"
          />

          <div>
            <h1 className="text-5xl md:text-6xl font-black">
              {team.name}
            </h1>

            <p className="text-2xl mt-3 opacity-90">
              {team.shortName}
            </p>
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-900 rounded-xl p-6">
            <FaTrophy className="text-yellow-400 text-3xl mb-3" />
            <p className="text-slate-400">Titles</p>
            <h2 className="text-3xl font-bold mt-2">
              {team.titles}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <FaCalendarAlt className="text-blue-400 text-3xl mb-3" />
            <p className="text-slate-400">Founded</p>
            <h2 className="text-3xl font-bold mt-2">
              {team.founded}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <FaChartLine className="text-green-400 text-3xl mb-3" />
            <p className="text-slate-400">Matches</p>
            <h2 className="text-3xl font-bold mt-2">
              {team.matches}
            </h2>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <FaChartLine className="text-purple-400 text-3xl mb-3" />
            <p className="text-slate-400">Win %</p>
            <h2 className="text-3xl font-bold mt-2">
              {team.winPercentage}%
            </h2>
          </div>

        </div>

        {/* Details */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-slate-900 rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Team Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-blue-400 text-xl" />

                <div>
                  <p className="text-slate-400">Captain</p>
                  <p className="text-xl">{team.captain}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaUserTie className="text-blue-400 text-xl" />

                <div>
                  <p className="text-slate-400">Coach</p>
                  <p className="text-xl">{team.coach}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaHome className="text-blue-400 text-xl" />

                <div>
                  <p className="text-slate-400">Home Ground</p>
                  <p className="text-xl">{team.homeGround}</p>
                </div>
              </div>

            </div>

          </div>

          <div className="bg-slate-900 rounded-xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Performance
            </h2>

            <div className="space-y-6">

              <div>
                <p className="text-slate-400">Wins</p>
                <h3 className="text-4xl font-bold text-green-400">
                  {team.wins}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">Losses</p>
                <h3 className="text-4xl font-bold text-red-400">
                  {team.losses}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">Winning Percentage</p>
                <h3 className="text-4xl font-bold text-blue-400">
                  {team.winPercentage}%
                </h3>
              </div>

            </div>

          </div>

        </div>

        <Link
          to="/teams"
          className="inline-flex items-center gap-3 mt-10 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
        >
          <FaArrowLeft />
          Back to Teams
        </Link>

      </div>
    </section>
  );
}

export default TeamDetails;