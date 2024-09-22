"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import AboutMe from "../components/AboutMe/AboutMe";

export default function Home() {
  const [isLight, setIsLight] = useState(false);

  // Scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.body.style.overflow !== "auto") {
        document.body.style.overflow = "auto";
      }
    }, 3000);

    return () => clearInterval(interval); // This will clear the interval when the component unmounts
  }, []);

  const toggleIsLight = () => {
    setIsLight((prev) => !prev);
    console.log("isLight", isLight);
  };

  return (
    <main className="w-full">
      {/*<Hero isLight={isLight} toggleIsLight={toggleIsLight} />*/}
      <AboutMe />
    </main>
  );
}