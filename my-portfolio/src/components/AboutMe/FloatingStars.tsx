// components/AboutMe/FloatingStars.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface StarProps {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const FloatingStars: React.FC = () => {
  const stars = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    size: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-lg"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        ></motion.div>
      ))}
    </div>
  );
};

export default FloatingStars;