import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaWrench, FaFeather, FaLightbulb, FaUserCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { GoogleGeminiEffect } from "./ui/GoogleGeminiEffect";
import { LampContainer } from "./ui/LampContainer";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";

interface HeroProps {
  isLight: boolean;
  toggleIsLight: () => void;
}

const iconVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: customDelay * 0.1, duration: 0.3 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const textLength = text.length;
  const spacing = 11;
  const totalWidth = textLength * spacing + 40;

  return (
    <svg className={`w-full ${className}`} viewBox={`0 0 ${totalWidth} 80`}>
      {/* Define clipPath and gradients */}
      <defs>
        <clipPath id="revealClip">
          <motion.rect
            initial={{ width: 0 }}
            animate={startAnimation ? { width: totalWidth } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            x="0"
            y="0"
            height="80"
          />
        </clipPath>
        <linearGradient
          id="borderGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="5%" stopColor="#FFFFFF" />
          <stop offset="5%" stopColor="#0000FF" />
          <stop offset="15%" stopColor="#4169E1" />
          <stop offset="25%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient
          id="glowGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Text Group with clipPath */}
      <g clipPath="url(#revealClip)">
        {text.split("").map((char, index) => (
          <motion.text
            key={index}
            x={index * spacing + 30}
            y="50"
            fontSize="20"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            stroke="url(#borderGradient)"
            strokeWidth="1"
            initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
            animate={{
              strokeDasharray: [0, 200, 0],
              strokeDashoffset: [0, -200, -400],
            }}
            transition={{
              duration: 5,
              ease: "linear",
              delay: 0.2 + index * 0.1,
            }}
          >
            {char}
          </motion.text>
        ))}
      </g>

      {/* Glowing Bar */}
      <motion.rect
        initial={{ x: -spacing * 2 }}
        animate={startAnimation ? { x: totalWidth } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        y="-100"
        width={spacing * 2}
        height="20"
        fill="url(#glowGradient)"
        filter="url(#blurFilter)"
      />
    </svg>
  );
};

export const Hero: React.FC<HeroProps> = ({ isLight, toggleIsLight }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [skipSection1, setSkipSection1] = useState(false); // New state variable

  const heroControls = useAnimation();
  const geminiControls = useAnimation();
  const section2Controls = useAnimation();
  const textControls = useAnimation();
  const buttonControls = useAnimation();
  const contentControls = useAnimation();

  const { ref: heroRef, inView } = useInView({
    threshold: 0,
  });

  const isScrolled = !inView;

  useEffect(() => {
    // Check if Section 1 should be skipped
    const section1ShownAt = localStorage.getItem("section1ShownAt");
    if (section1ShownAt) {
      const timeDiff = Date.now() - parseInt(section1ShownAt, 10);
      const fiveMinutes = 5 * 60 * 1000; // in milliseconds
      if (timeDiff < fiveMinutes) {
        // Skip Section 1
        setSkipSection1(true);
        // Enable scrolling
        document.body.style.overflow = "auto";
        // Start Section 2 animations directly
        section2Controls.start({
          opacity: 1,
          transition: { duration: 0.7, ease: "easeInOut" },
        });
        textControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 1.5, ease: "easeOut" },
        });
        buttonControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        });
        setAnimationStep(5);
        return; // Exit the useEffect
      } else {
        // More than 5 minutes have passed, remove the timestamp
        localStorage.removeItem("section1ShownAt");
      }
    }

    // Proceed with animationSequence
    document.body.style.overflow = "hidden";
    const animationSequence = async () => {
      // Step 1: Fade in Hero
      await heroControls.start({ opacity: 1, transition: { duration: 1 } });
      setAnimationStep(1);

      // Step 2: Start Gemini animation
      geminiControls.start({ pathLength: 1, transition: { duration: 2 } });
      setAnimationStep(2);

      // Wait for AnimatedText animation to complete (duration of 2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3: Fade out Hero (Section 1)
      await heroControls.start({ opacity: 0, transition: { duration: 1 } });
      setAnimationStep(3);

      // 0.5 second pause
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Step 4: Fade in Section 2
      await section2Controls.start({
        opacity: 1,
        transition: { duration: 0.7, ease: "easeInOut" },
      });

      // Step 5: Fade in Text from middle
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut" },
      });
      setAnimationStep(4);

      // Step 6: Animate button (after a 0.5 second delay)
      await new Promise((resolve) => setTimeout(resolve, 200));
      await buttonControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      });
      setAnimationStep(5);

      // Store the timestamp in localStorage
      localStorage.setItem("section1ShownAt", Date.now().toString());

      // Enable scrolling after all animations are complete
      document.body.style.overflow = "auto";
    };

    animationSequence();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    heroControls,
    geminiControls,
    section2Controls,
    textControls,
    buttonControls,
  ]);

  const iconData = [
    { icon: FaWrench, text: "Works" },
    { icon: FaLightbulb, text: "Illuminate" },
    { icon: FaFeather, text: "Contact" },
  ];

  useEffect(() => {
    if (isLight) {
      contentControls.start({
        y: -40,
        transition: { duration: 1 },
      });

      setTimeout(() => {
        textControls.start({
          y: -20,
          transition: { duration: 0.9 },
        });
      }, 1010);
    } else {
      contentControls.start({
        y: 0,
        transition: { duration: 1 },
      });
    }
  }, [isLight, contentControls, textControls]);

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={heroRef}>
      {/* Section 1: Gemini Effect */}
      {!skipSection1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroControls}
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
        >
          <GoogleGeminiEffect
            animate={geminiControls}
            className="w-full h-full -mt-20"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center space-y-32">
            {/* Static Text */}
            <div className="relative w-full h-32 overflow-visible flex justify-center items-center">
              <div className="flex">
                <span className="text-white text-6xl md:text-8xl font-bold -mb-40">
                  Nice to Meet You!
                </span>
              </div>
            </div>
            {/* AnimatedText with new effect */}
            <AnimatedText text="I'm Isaac" className="mt-16 h-72" />
          </div>
        </motion.div>
      )}

      {/* Section 2: Lamp and Text */}
      <motion.div
        initial={{ opacity: skipSection1 ? 1 : 0 }}
        animate={section2Controls}
        className="absolute inset-0 flex flex-col justify-between items-center h-full w-full p-8"
      >
        <motion.div
          animate={contentControls}
          className="flex flex-col items-center w-full h-full"
        >
          <LampContainer>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={textControls}
              className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              Let Me Illuminate <br /> the way
            </motion.h1>
          </LampContainer>
        </motion.div>

        {/* Button Container */}
        <motion.div className="flex justify-center items-center h-16 w-full">
          <AnimatePresence>
            {!isLight && (
              <motion.div
                key="follow-button"
                initial={{ opacity: 0, y: 20 }}
                animate={buttonControls}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                className="pb-20"
              >
                <button
                  onClick={toggleIsLight}
                  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Follow Me
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Icons */}
      <AnimatePresence mode="wait">
        {isLight && (
          <motion.div
            key={`icons-${isScrolled}`}
            initial={{ opacity: 0, x: -50, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-4 left-4 flex flex-col space-y-4 z-50"
          >
            {!isScrolled ? (
              <>
                {iconData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index + 1}
                  >
                    <AnimatedTooltip icon={item.icon} text={item.text} />
                  </motion.div>
                ))}
              </>
            ) : (
              <motion.div
                key="avatar-icon"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={1}
              >
                <AnimatedTooltip icon={FaUserCircle} text="About Me" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};