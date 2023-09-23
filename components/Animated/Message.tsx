import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

const animationVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, type: "spring" },
    y: 0,
  },
  hidden: { opacity: 0, scale: 0.9, y: 30 },
};

export default function ScalingElement(props: { children: any, assistant: boolean, marginLeft: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  if(props.assistant){
    return (
        <AssistantMessage
          ref={ref}
          variants={animationVariants}
          animate={controls}
          initial="hidden"
          layout="position"
          marginLeft={props.marginLeft}
        >
        {props.children}
        </AssistantMessage>
      );
  } else {
    return (
        <UserMessage
          ref={ref}
          variants={animationVariants}
          animate={controls}
          initial="hidden"
          layout="position"
        >
          {props.children}
        </UserMessage>
      );
  }

}


const UserMessage = styled(motion.div)`
    padding: 1rem 1.2rem 1rem 1rem;
    font-size: 0.95rem;
    max-width: 84%;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23);
    border: 2px solid #E5E8F0;
    font-weight: 500;
    color: black;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-right: 1.5rem;
    margin-top: 0.5rem;
    line-height: 1.6rem;
    white-space: pre-wrap;
    will-change: transform;
    @media (max-width: 1023px) {
      width: auto;
      max-width: 100vw;
      padding: 2.5vw 3.5vw 2.5vw 3.5vw;
      font-size: 1rem;
      margin-right: 0;
      margin-top: 0.7rem;
      box-shadow: none;
  }
`

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