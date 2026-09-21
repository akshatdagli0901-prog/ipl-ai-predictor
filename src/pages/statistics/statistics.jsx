import teams from "../../data/teams";
import players from "../../data/players";
import matches from "../../data/matches";

import {
  FaUsers,
  FaUserTie,
  FaTrophy,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const totalTeams = teams.length;
  const totalPlayers = players.length;
  const totalMatches = matches.length;

  const completedMatches = matches.filter(
    (match) => match.status === "Completed"
  ).length;

  const noResultMatches = matches.filter(
    (match) => match.status === "No Result"
  ).length;

  const cards = [
    {
      title: "Teams",
      value: totalTeams,
      icon: <FaUsers size={28} />,
      description: "IPL 2026 teams",
    },
    {
      title: "Players",
      value: totalPlayers,
      icon: <FaUserTie size={28} />,
      description: "Players tracked",
    },
    {
      title: "Matches",
      value: totalMatches,
      icon: <FaTrophy size={28} />,
      description: "Season matches",
    },
    {
      title: "Completed",
      value: completedMatches,
      icon: <FaCheckCircle size={28} />,
      description: "Completed matches",
    },
  ];

  // Top 5 run scorers
  const topRunScorers = [...players]
    .filter((player) => Number.isFinite(Number(player.runs)))
    .sort((a, b) => Number(b.runs) - Number(a.runs))
    .slice(0, 5);

  const runChartData = {
    labels: topRunScorers.map((player) => player.name),
    datasets: [
      {
        label: "Runs",
        data: topRunScorers.map((player) => Number(player.runs)),
        backgroundColor: "#2563eb",
        borderRadius: 8,
      },
    ],
  };

  // Top 5 wicket takers
  const topWicketTakers = [...players]
    .filter((player) => Number.isFinite(Number(player.wickets)))
    .sort((a, b) => Number(b.wickets) - Number(a.wickets))
    .slice(0, 5);

  const wicketChartData = {
    labels: topWicketTakers.map((player) => player.name),
    datasets: [
      {
        label: "Wickets",
        data: topWicketTakers.map((player) => Number(player.wickets)),
        backgroundColor: "#16a34a",
        borderRadius: 8,
      },
    ],
  };

  // Team win percentage
  const sortedTeams = [...teams].sort(
    (a, b) => Number(b.winPercentage) - Number(a.winPercentage)
  );

  const teamWinChartData = {
    labels: sortedTeams.map((team) => team.shortName),
    datasets: [
      {
        label: "Win Percentage",
        data: sortedTeams.map((team) => Number(team.winPercentage)),
        backgroundColor: [
          "#2563eb",
          "#dc2626",
          "#16a34a",
          "#ca8a04",
          "#9333ea",
          "#0891b2",
          "#ea580c",
          "#db2777",
          "#475569",
          "#84cc16",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Match status
  const statusChartData = {
    labels: ["Completed", "No Result"],
    datasets: [
      {
        data: [completedMatches, noResultMatches],
        backgroundColor: ["#22c55e", "#facc15"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
          maxRotation: 35,
          minRotation: 0,
        },
        grid: {
          color: "#1e293b",
        },
      },

      y: {
        beginAtZero: true,
        ticks: {
          color: "#cbd5e1",
        },
        grid: {
          color: "#1e293b",
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#cbd5e1",
          padding: 14,
        },
      },
    },
  };

  return (
    <section className="min-h-screen bg-slate-950 px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
            IPL 2026
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Analytics Dashboard
          </h1>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Explore player performance, team strength and match insights from
            the IPL 2026 season.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">

          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-blue-500">
                  {card.icon}
                </div>

                <span className="text-xs text-slate-500">
                  2026
                </span>
              </div>

              <p className="text-slate-400 mt-5">
                {card.title}
              </p>

              <p className="text-4xl text-white font-bold mt-1">
                {card.value}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {card.description}
              </p>
            </div>
          ))}

        </div>

        {/* Top Players */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Top Run Scorers
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Leading batters by total runs
              </p>
            </div>

            <div className="h-[320px]">
              <Bar
                data={runChartData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Top Wicket Takers
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Leading bowlers by wickets
              </p>
            </div>

            <div className="h-[320px]">
              <Bar
                data={wicketChartData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

        </div>

        {/* Team + Match Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Team Win Percentage
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Comparative team performance
              </p>
            </div>

            <div className="h-[360px]">
              <Pie
                data={teamWinChartData}
                options={pieOptions}
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Match Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Current season match completion
              </p>
            </div>

            <div className="h-[360px]">
              <Doughnut
                data={statusChartData}
                options={pieOptions}
              />
            </div>
          </div>

        </div>

        {/* Quick Leaderboard */}
        <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">
              Top Performers
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              IPL 2026 statistical leaders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Rank
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Player
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Team
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Runs
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-400">
                    Wickets
                  </th>
                </tr>
              </thead>

              <tbody>
                {topRunScorers.map((player, index) => (
                  <tr
                    key={player.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="px-6 py-4 text-slate-500 font-semibold">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4 text-white font-medium whitespace-nowrap">
                      {player.name}
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      {player.shortTeam}
                    </td>

                    <td className="px-6 py-4 text-blue-400 font-semibold">
                      {player.runs}
                    </td>

                    <td className="px-6 py-4 text-green-400 font-semibold">
                      {player.wickets}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Statistics;