import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedTooltip = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="text-white text-4xl"
      >
        <Icon />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-full ml-2 flex text-xs flex-col items-start justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-black transform rotate-45" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-[60%] bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
            <div className="font-bold text-white relative z-30 text-base whitespace-nowrap">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};