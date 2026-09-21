import { Link } from "react-router-dom";
import {
  FaUserTie,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

function TeamCard({
  id,
  name,
  shortName,
  logo,
  captain,
  coach,
  homeGround,
  primaryColor,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 shadow-lg">

      {/* Header */}
      <div
        className="h-40 flex items-center justify-center"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="h-28 w-28 flex items-center justify-center">
          <img
            src={logo}
            alt={`${name} logo`}
            className="max-h-28 max-w-28 w-auto h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-white">
          {name}
        </h2>

        <p className="text-slate-400 mb-6">
          {shortName}
        </p>

        <div className="space-y-5">

          <div className="flex gap-3">
            <FaShieldAlt className="text-blue-400 mt-1" />

            <div>
              <p className="text-slate-400 text-sm">
                Captain
              </p>

              <p className="text-white">
                {captain}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <FaUserTie className="text-blue-400 mt-1" />

            <div>
              <p className="text-slate-400 text-sm">
                Coach
              </p>

              <p className="text-white">
                {coach}
              </p>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Home Ground
            </p>

            <p className="text-white">
              {homeGround}
            </p>
          </div>

        </div>

        <Link
          to={`/teams/${id}`}
          className="mt-8 flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-semibold text-white"
        >
          View Team
          <FaArrowRight />
        </Link>

      </div>
    </div>
  );
}

export default TeamCard;