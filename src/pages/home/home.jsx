import { motion } from "framer-motion";
import Hero from "../../components/hero/hero";
import FeatureCard from "../../components/featurecard/featurecard";

import {
  FaRobot,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

function Home() {
  return (
    <>
      <Hero />

      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-8"
          >

            <FeatureCard
              icon={<FaRobot />}
              title="AI Match Prediction"
              description="Predict IPL match outcomes using machine learning and historical IPL data."
            />

            <FeatureCard
              icon={<FaChartLine />}
              title="Player Statistics"
              description="Explore player performance with detailed batting, bowling and fielding analytics."
            />

            <FeatureCard
              icon={<FaTrophy />}
              title="Team Analytics"
              description="Compare IPL teams, study trends and analyze winning probabilities."
            />

          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Home;