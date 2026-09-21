import { useParams, Link } from "react-router-dom";
import players from "../../data/players";

function PlayerDetails() {
  const { id } = useParams();

  const player = players.find((p) => p.id === Number(id));

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Player Not Found
      </div>
    );
  }

  return (
    <section className="bg-slate-950 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-6xl md:text-7xl font-bold text-white shadow-xl">
              {player.name.charAt(0)}
            </div>

            <div className="text-center md:text-left flex-1">
              <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-2">
                IPL 2026 Player
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {player.name}
              </h1>

              <p className="text-xl text-slate-400 mt-3">
                {player.shortTeam} • {player.role}
              </p>

              <p className="text-slate-500 mt-2">
                {player.nationality}
              </p>
            </div>

          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-10">

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-sm">Matches</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {player.matches}
              </h2>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-sm">Runs</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {player.runs}
              </h2>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-sm">Wickets</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {player.wickets}
              </h2>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-slate-400 text-sm">Average</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {player.average}
              </h2>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center col-span-2 md:col-span-1">
              <p className="text-slate-400 text-sm">Strike Rate</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {player.strikeRate}
              </h2>
            </div>

          </div>

          {/* Information */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-10">

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl text-white font-bold mb-6">
                Player Information
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Team</span>
                  <span className="text-white font-medium text-right">
                    {player.team}
                  </span>
                </div>

                <div className="h-px bg-slate-700" />

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Role</span>
                  <span className="text-white font-medium text-right">
                    {player.role}
                  </span>
                </div>

                <div className="h-px bg-slate-700" />

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Nationality</span>
                  <span className="text-white font-medium">
                    {player.nationality}
                  </span>
                </div>

                <div className="h-px bg-slate-700" />

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Batting Style</span>
                  <span className="text-white font-medium text-right">
                    {player.battingStyle || "Not available"}
                  </span>
                </div>

                <div className="h-px bg-slate-700" />

                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Bowling Style</span>
                  <span className="text-white font-medium text-right">
                    {player.bowlingStyle || "Not available"}
                  </span>
                </div>

              </div>
            </div>

            {/* Performance */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl text-white font-bold mb-6">
                2026 Performance
              </h2>

              <div className="space-y-6">

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Runs</span>
                    <span className="text-white font-semibold">
                      {player.runs}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(player.runs) / 1000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Wickets</span>
                    <span className="text-white font-semibold">
                      {player.wickets}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(player.wickets) / 30) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Strike Rate</span>
                    <span className="text-white font-semibold">
                      {player.strikeRate}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(player.strikeRate) / 200) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400">Batting Average</span>
                    <span className="text-white font-semibold">
                      {player.average}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(player.average) / 60) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Back */}
          <div className="mt-10">
            <Link
              to="/players"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium"
            >
              ← Back to Players
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PlayerDetails;