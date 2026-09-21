import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/mainlayout";

import Home from "./pages/home/home";
import Teams from "./pages/teams/teams";
import TeamDetails from "./pages/teamdetails/teamdetails";
import Players from "./pages/players/players";
import PlayerDetails from "./pages/playerdetails/playerdetails";
import Matches from "./pages/matches/matches";
import MatchDetails from "./pages/matchdetails/matchdetails";
import Prediction from "./pages/prediction/prediction";
import Statistics from "./pages/statistics/statistics";
import About from "./pages/about/about";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetails />} />

        <Route path="players" element={<Players />} />
        <Route path="players/:id" element={<PlayerDetails />} />

        <Route path="matches" element={<Matches />} />
        <Route path="matches/:id" element={<MatchDetails />} />

        <Route path="prediction" element={<Prediction />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;