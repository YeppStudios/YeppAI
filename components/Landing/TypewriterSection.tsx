"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ColorfulText from "../Common/ColorfulText";

export const TypewriterSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl mt-4">
        <TypeAnimation
          sequence={[
            "chat with your data.",
            3000,
            "generate SEO content.",
            3000,
            "save time & money.",
            3000,
            "generate unique content.",
            3000,
            "personalize communication.",
            3000,
            "overcome writer's block.",
            3000,
            "personalize offers.",
            3000,
          ]}
          repeat={Infinity}
        />
    </h2>
  );
};