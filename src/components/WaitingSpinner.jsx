import { motion } from "framer-motion";

const WaitingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0.3 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      }}
      className="relative w-24 h-24 flex justify-center items-center"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-20 h-20 border-8 border-t-8 border-primary rounded-full"
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 1, 0.2] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          repeatType: "reverse",
        }}
        className="absolute w-12 h-12 bg-primary opacity-30 rounded-full"
      />

      <motion.div
        animate={{ scale: [1, 0.7, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          repeatType: "reverse",
        }}
        className="absolute w-8 h-8 bg-white opacity-50 rounded-full"
      />
    </motion.div>
  );
};

export default WaitingSpinner;
