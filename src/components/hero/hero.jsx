import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaRobot,
  FaChartLine,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >

        {/* Badge */}

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-slate-900 border border-blue-500/30 rounded-full px-5 py-2 text-sm text-blue-300 mb-8"
        >
          <FaRobot />
          AI Powered IPL Predictions
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight"
        >
          Predict IPL Matches

          <br />

          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Smarter with AI
          </span>
        </motion.h1>

        {/* Description */}

        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          Explore teams, analyze players, visualize statistics,
          and predict IPL match winners using Machine Learning
          and historical match data.
        </motion.p>

        {/* Buttons */}

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-5"
        >

          <Link
            to="/prediction"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
          >
            Predict Match
          </Link>

          <Link
            to="/teams"
            className="border border-slate-600 hover:border-blue-400 hover:text-blue-400 px-8 py-4 rounded-xl transition duration-300 hover:bg-slate-900"
          >
            Explore Teams
          </Link>

        </motion.div>

        {/* Stats */}

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >

          <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
            <FaTrophy className="mx-auto text-3xl text-yellow-400 mb-3" />
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-slate-400 mt-2">IPL Seasons</p>
          </div>

          <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
            <FaUsers className="mx-auto text-3xl text-blue-400 mb-3" />
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-slate-400 mt-2">Players</p>
          </div>

          <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
            <FaChartLine className="mx-auto text-3xl text-green-400 mb-3" />
            <h3 className="text-3xl font-bold">1000+</h3>
            <p className="text-slate-400 mt-2">Matches</p>
          </div>

          <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-800">
            <FaRobot className="mx-auto text-3xl text-cyan-400 mb-3" />
            <h3 className="text-3xl font-bold">AI</h3>
            <p className="text-slate-400 mt-2">Predictions</p>
          </div>

        </motion.div>

      </motion.div>

    </section>
  );
}

export default Hero;