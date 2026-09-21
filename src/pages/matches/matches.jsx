import { useState } from "react";
import MatchCard from "../../components/matchcard/matchcard";
import matches from "../../data/matches";

function Matches() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");

  const teams = [
    "All",
    ...new Set(
      matches.flatMap((match) => [match.team1Short, match.team2Short])
    ),
  ];

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || match.status === statusFilter;

    const matchesTeam =
      teamFilter === "All" ||
      match.team1Short === teamFilter ||
      match.team2Short === teamFilter;

    return matchesSearch && matchesStatus && matchesTeam;
  });

  return (
    <section className="bg-slate-950 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            IPL Matches
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Browse completed and upcoming IPL matches.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <input
            type="text"
            placeholder="Search Team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          />

          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            {teams.map((team) => (
              <option key={team}>{team}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                id={match.id}
                team1={match.team1}
                team1Short={match.team1Short}
                team2={match.team2}
                team2Short={match.team2Short}
                venue={match.venue}
                date={match.date}
                time={match.time}
                status={match.status}
                winner={match.winner}
                team1Score={match.team1Score}
                team2Score={match.team2Score}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 text-xl">
              No matches found.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default Matches;