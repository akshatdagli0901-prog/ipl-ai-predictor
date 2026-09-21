import { useState } from "react";
import PlayerCard from "../../components/playercard/playercard";
import players from "../../data/players";

function Players() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const teams = ["All", ...new Set(players.map((player) => player.shortTeam))];
  const roles = ["All", ...new Set(players.map((player) => player.role))];

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTeam =
      teamFilter === "All" || player.shortTeam === teamFilter;

    const matchesRole =
      roleFilter === "All" || player.role === roleFilter;

    return matchesSearch && matchesTeam && matchesRole;
  });

  return (
    <section className="bg-slate-950 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            IPL Players
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Browse player profiles and career statistics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">

          <input
            type="text"
            placeholder="Search Player..."
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
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                id={player.id}
                name={player.name}
                shortTeam={player.shortTeam}
                role={player.role}
                matches={player.matches}
                runs={player.runs}
                wickets={player.wickets}
                average={player.average}
                strikeRate={player.strikeRate}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 text-xl">
              No players found.
            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default Players;