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
    <ColorfulText><h2 className="font-black text-[1.5rem] lg:text-[4.5vw] pb-2 lg:mt-6 lg:text-6xl text-center lg:text-left">
        <TypeAnimation
          sequence={[
            "chat with your data",
            3000,
            "generate SEO content",
            3000,
            "save time & money",
            3000,
            "generate unique content",
            3000,
            "personalize communication",
            3000,
            "overcome writer's block",
            3000,
            "personalize offers",
            3000,
          ]}
          repeat={Infinity}
        />
    </h2>
    </ColorfulText>
  );
};