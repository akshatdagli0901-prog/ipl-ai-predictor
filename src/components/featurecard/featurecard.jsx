import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="w-full md:w-[360px] bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-lg hover:border-blue-500 transition-all duration-300 flex flex-col"
    >
      <div className="text-4xl text-blue-400 mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-blue-400 min-h-[64px]">
        {title}
      </h2>

      <p className="mt-4 text-slate-300 leading-relaxed flex-grow">
        {description}
      </p>

      <button className="mt-6 text-blue-400 font-semibold hover:text-blue-300 transition-colors self-start">
        Learn More →
      </button>
    </motion.div>
  );
}

export default FeatureCard;