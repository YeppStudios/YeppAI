import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import TypingAnimation from "../Modals/common/TypingAnimation";

const animationVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, type: "spring" },
    y: 0,
  },
  hidden: { opacity: 0, scale: 0.9, y: 30 },
};

export default function ScalingElement(props: { assistant: boolean, marginLeft: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  return (
    <AssistantMessage
    ref={ref}
    variants={animationVariants}
    animate={controls}
    initial="hidden"
    layout="position"
    marginLeft={props.marginLeft}
  >
  <TypingAnimation colorful={true}></TypingAnimation>
  </AssistantMessage>
  )

}

const AssistantMessage = styled(motion.div)<{ marginLeft: string }>`
    padding: 1rem 1.2rem 1rem 1rem;
    font-size: 1rem;
    margin: 0;
    max-width: 84%;
    font-weight: 500;
    background: #141418;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23), -2px -2px 4px #FAFBFF;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-left: ${props => props.marginLeft};
    margin-top: 0.5rem;
    line-height: 1.6rem;
    white-space: pre-wrap;
    will-change: transform;
    @media (max-width: 1023px) {
      max-width: 100vw;
      padding: 2.5vw 3.5vw 2.5vw 3.5vw;
      font-size: 1rem;
      margin-left: 0;
      margin-top: 0.7rem;
      background: #04040A;
      box-shadow: none;
  }
`