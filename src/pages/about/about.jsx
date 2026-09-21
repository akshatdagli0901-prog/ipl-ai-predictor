import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaCode,
  FaCloud,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-500/5" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <FaBrain />
              AI-Powered Cricket Analytics
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              IPL AI
              <span className="text-blue-500"> Predictor</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed">
              A data-driven platform designed to analyze IPL teams, players,
              matches and statistics while using machine learning to generate
              match outcome predictions.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/prediction"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition"
              >
                Try Prediction
                <FaArrowRight />
              </Link>

              <Link
                to="/statistics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl font-semibold transition"
              >
                Explore Statistics
                <FaChartLine />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What is the project */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
              About the Project
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Turning IPL data into meaningful insights
            </h2>

            <p className="text-slate-400 mt-6 leading-relaxed">
              IPL AI Predictor combines cricket statistics with machine
              learning to provide an interactive way of exploring IPL data.
              Users can browse teams, players and matches, study historical
              statistics and generate predictions for selected match
              scenarios.
            </p>

            <p className="text-slate-400 mt-4 leading-relaxed">
              The prediction system uses performance-based features such as
              team win rates, scoring performance, wickets, venue performance
              and toss information to estimate the probability of each team
              winning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              icon={<FaDatabase />}
              title="IPL Data"
              text="Match, team and player information"
            />

            <InfoCard
              icon={<FaBrain />}
              title="Machine Learning"
              text="Performance-based prediction model"
            />

            <InfoCard
              icon={<FaChartLine />}
              title="Analytics"
              text="Interactive statistics and insights"
            />

            <InfoCard
              icon={<FaCode />}
              title="Modern Stack"
              text="React, Node.js and Python"
            />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
              How It Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              From data to prediction
            </h2>

            <p className="text-slate-400 mt-4">
              The platform combines multiple layers to turn cricket data into
              an easy-to-understand prediction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <ProcessCard
              number="01"
              title="Collect"
              text="IPL match and performance data is organized into structured datasets."
            />

            <ProcessCard
              number="02"
              title="Analyze"
              text="Team performance, venue statistics, wickets and scoring patterns are converted into useful features."
            />

            <ProcessCard
              number="03"
              title="Predict"
              text="The machine learning model processes the selected match conditions and generates winning probabilities."
            />
          </div>
        </div>
      </div>

      {/* Technology */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">
            Technology
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Built with modern technologies
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          <TechCard
            title="React"
            description="Interactive frontend"
          />

          <TechCard
            title="Tailwind CSS"
            description="Responsive interface"
          />

          <TechCard
            title="Node.js"
            description="Backend API"
          />

          <TechCard
            title="Python"
            description="Machine learning"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h3 className="text-xl font-bold">
            Prediction is not certainty
          </h3>

          <p className="text-slate-400 mt-3 leading-relaxed">
            IPL matches involve many unpredictable factors. The predictions
            generated by this platform are based on historical data and model
            inputs and should be treated as analytical estimates rather than
            guaranteed outcomes.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Explore the IPL through data
          </h2>

          <p className="text-slate-400 mt-3">
            Browse teams, analyze statistics and test the prediction model.
          </p>

          <Link
            to="/prediction"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition"
          >
            Open Predictor
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition">
      <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mt-5">{title}</h3>

      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function ProcessCard({ number, title, text }) {
  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-blue-500/40 transition">
      <span className="text-5xl font-bold text-slate-800">
        {number}
      </span>

      <h3 className="text-xl font-bold mt-4">{title}</h3>

      <p className="text-slate-400 mt-3 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function TechCard({ title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300">
      <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
        <FaCode />
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>
    </div>
  );
}

export default About;