// components/AboutMe/CharacterReveal.tsx

import React from 'react';
import { motion } from 'framer-motion';
import FloatingStars from './FloatingStars';
import EyeTracker from './EyeTracker';

interface CharacterRevealProps {
  onAnimationComplete: () => void;
}

const CharacterReveal: React.FC<CharacterRevealProps> = ({ onAnimationComplete }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-500 to-purple-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={onAnimationComplete}
    >
      <div className="relative">
        <img src="https://via.placeholder.com/500" alt="Character" className="w-64 h-64 mx-auto"/>
        <EyeTracker />
        <FloatingStars />
      </div>
    </motion.div>
  );
};

export default CharacterReveal;