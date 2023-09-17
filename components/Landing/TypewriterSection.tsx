"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import ColorfulText from "../Common/ColorfulText";

export const TypewriterSection = () => {
  return (
    <ColorfulText>
      <TypeAnimation
        sequence={[
          "PDFs",
          3000,
          "social media",
          3000,
          "websites",
          3000,
          "presentations",
          3000,
          "text files",
          3000,
          "briefs",
          3000,
          "Word documents",
          3000,
          "YouTube videos",
          3000,
          "CSV files",
          3000,
        ]}
        repeat={Infinity}
      />
      </ColorfulText>
  );
};