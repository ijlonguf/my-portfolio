// components/AboutMe/Stage.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface StageProps {
  title: string;
  content: string;
  index: number;
  currentStage: number;
}

const Stage: React.FC<StageProps> = ({ title, content, index, currentStage }) => {
  const isActive = index === currentStage;

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <>
      {isActive && (
        <motion.div
          className="stage-content max-w-2xl mx-auto px-4 text-center"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
          <p className="text-lg leading-relaxed text-gray-600">{content}</p>
        </motion.div>
      )}
    </>
  );
};

export default Stage;