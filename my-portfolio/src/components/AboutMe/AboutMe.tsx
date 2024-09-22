// components/AboutMe/AboutMe.tsx

import React, { useState, useEffect } from 'react';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import CharacterReveal from './CharacterReveal';

const AboutMe: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [isFinalAnimationTriggered, setFinalAnimationTriggered] = useState<boolean>(false);
  const [isScrollLocked, setScrollLocked] = useState<boolean>(false);

  // Lock or unlock body scrolling
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isScrollLocked]);

  // Handle stage change
  const handleStageChange = (stage: number) => {
    setCurrentStage(stage);
  };

  // Trigger final animation
  const handleFinalAnimationTrigger = () => {
    setFinalAnimationTriggered(true);
    setScrollLocked(true);
  };

  // Unlock scrolling after animation completes
  const handleAnimationComplete = () => {
    setScrollLocked(false);
  };

  return (
    <section className="flex h-screen overflow-hidden relative">
      <LeftColumn />
      <RightColumn
        currentStage={currentStage}
        onStageChange={handleStageChange}
        onFinalAnimationTrigger={handleFinalAnimationTrigger}
        isFinalAnimationTriggered={isFinalAnimationTriggered}
      />
      {isFinalAnimationTriggered && (
        <CharacterReveal onAnimationComplete={handleAnimationComplete} />
      )}
    </section>
  );
};

export default AboutMe;