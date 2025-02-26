import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="h-screen hero-section w-full flex justify-center items-center bg-black">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-white rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
