"use client";

import React, { useState, useEffect } from "react";
import { Hero } from "../components/Hero";

export default function Home() {
  const [isLight, setIsLight] = useState(false);

  // Scroll to top on page load/reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleIsLight = () => {
    setIsLight((prev) => !prev);
    console.log("isLight", isLight);
  };

  return (
    <main className="w-full">
      <Hero isLight={isLight} toggleIsLight={toggleIsLight} />
    </main>
  );
}