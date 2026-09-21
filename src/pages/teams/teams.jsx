import { useState } from "react";
import TeamCard from "../../components/teamcard/teamcard";
import teams from "../../data/teams";

function Teams() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-slate-950 min-h-screen py-16 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-white">
            IPL Teams
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Browse all IPL teams, captains, coaches and home grounds.
          </p>

        </div>

        <div className="flex justify-center mb-12">

          <input
            type="text"
            placeholder="Search Team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition"
          />

        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                id={team.id}
                name={team.name}
                shortName={team.shortName}
                logo={team.logo}
                captain={team.captain}
                coach={team.coach}
                homeGround={team.homeGround}
                primaryColor={team.primaryColor}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 text-xl">
              No teams found.
            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Teams;