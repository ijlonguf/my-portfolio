// components/AboutMe/EyeTracker.tsx

import React, { useEffect, useState, useRef } from 'react';

const EyeTracker: React.FC = () => {
  const [pupilPositionLeft, setPupilPositionLeft] = useState({ x: 0, y: 0 });
  const [pupilPositionRight, setPupilPositionRight] = useState({ x: 0, y: 0 });

  const eyeLeftRef = useRef<HTMLDivElement>(null);
  const eyeRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      movePupil(event, eyeLeftRef.current, setPupilPositionLeft);
      movePupil(event, eyeRightRef.current, setPupilPositionRight);
    };

    const movePupil = (
      event: MouseEvent,
      eyeElement: HTMLDivElement | null,
      setPupilPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
    ) => {
      if (eyeElement) {
        const rect = eyeElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const dx = event.clientX - eyeCenterX;
        const dy = event.clientY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.hypot(dx, dy), 5); // Limit the distance
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        setPupilPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-64 h-64">
        {/* Left Eye */}
        <div
          ref={eyeLeftRef}
          className="absolute left-20 top-24 w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <div
            className="w-4 h-4 bg-black rounded-full"
            style={{
              transform: `translate(${pupilPositionLeft.x}px, ${pupilPositionLeft.y}px)`,
            }}
          ></div>
        </div>
        {/* Right Eye */}
        <div
          ref={eyeRightRef}
          className="absolute right-20 top-24 w-8 h-8 bg-white rounded-full flex items-center justify-center"
        >
          <div
            className="w-4 h-4 bg-black rounded-full"
            style={{
              transform: `translate(${pupilPositionRight.x}px, ${pupilPositionRight.y}px)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EyeTracker;