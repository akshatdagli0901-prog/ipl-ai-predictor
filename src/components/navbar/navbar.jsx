import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          🏏 IPL AI Predictor
        </Link>

        {/* Navigation */}
        <div className="flex gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/matches">Matches</NavLink>
          <NavLink to="/prediction">Prediction</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;