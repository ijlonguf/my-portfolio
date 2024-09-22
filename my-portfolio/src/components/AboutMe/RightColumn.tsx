// components/AboutMe/RightColumn.tsx

import React, { useEffect } from 'react';
import Stage from './Stage';

interface RightColumnProps {
  currentStage: number;
  onStageChange: (stage: number) => void;
  onFinalAnimationTrigger: () => void;
  isFinalAnimationTriggered: boolean;
}

const stagesData = [
  {
    title: 'Stage 1: The Spark of Curiosity',
    content: `My journey began with a simple idea—to merge creativity with technology and unlock new potential. Born and raised in Florida, I’ve always been captivated by the unknown, whether exploring the vastness of space, contemplating complex philosophical ideas, or diving into the mechanics behind what makes great businesses thrive. What started as a fascination for crafting better processes while managing a restaurant soon grew into a broader mission: using technology to solve real-world challenges in ways that anyone can leverage.`,
  },
  {
    title: 'Stage 2: From Bartending to Building Solutions',
    content: `Professionally, I’ve always been about crafting experiences—whether behind the bar mixing up a drink that brightens someone’s day or building tools that simplify life. My work spans projects like Dash Analytics, Kutta.AI, and co-founding Dynamo Directive, an agency that merges tech with strategic insights to drive value. Working in front-end development, I focus on creating visually stunning and responsive applications using React, Next.js, and TypeScript. I enjoy bringing user interfaces to life while keeping functionality front and center.`,
  },
  {
    title: 'Stage 3: A Glimpse into the Future',
    content: `Now, I’m on a mission to bridge the gap between data and intuitive design, with my projects nearing their beta stages and the horizon ever expanding. Whether it’s integrating cutting-edge payment systems, experimenting with new UI patterns, or launching an agency aimed at leveling the playing field for regular individuals against corporate conglomerates, the vision remains clear: to illuminate a path forward through technology. Let’s build something extraordinary together.`,
  },
];

const RightColumn: React.FC<RightColumnProps> = ({
  currentStage,
  onStageChange,
  onFinalAnimationTrigger,
  isFinalAnimationTriggered,
}) => {
  useEffect(() => {
    // Prevent SSR issues by checking if window is defined
    if (typeof window === 'undefined') return;

    let isThrottled = false;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (isThrottled || isFinalAnimationTriggered) return;
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, 800); // Adjust throttle duration as needed

      if (event.deltaY > 0) {
        // Scrolling down
        if (currentStage < stagesData.length) {
          onStageChange(currentStage + 1);
        } else if (currentStage === stagesData.length) {
          onFinalAnimationTrigger();
        }
      } else {
        // Scrolling up
        if (currentStage > 1) {
          onStageChange(currentStage - 1);
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentStage, onStageChange, onFinalAnimationTrigger, isFinalAnimationTriggered]);

  return (
    <div className="w-full md:w-3/5 h-full flex items-center justify-center overflow-hidden relative">
      {stagesData.map((stage, index) => (
        <Stage
          key={index}
          title={stage.title}
          content={stage.content}
          index={index + 1}
          currentStage={currentStage}
        />
      ))}
    </div>
  );
};

export default RightColumn;