import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown';
import { Remarkable } from 'remarkable';
const md = new Remarkable();

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
    const normalizedText = props.children;
    return (
        <AssistantMessage
          ref={ref}
          variants={animationVariants}
          animate={controls}
          initial="hidden"
          layout="position"
          marginLeft={props.marginLeft}
        >
        <Content dangerouslySetInnerHTML={{ __html: md.render(normalizedText) }}>
        </Content>
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
    padding: 1rem 1.2rem 1rem 1.2rem;
    font-size: 1rem;
    max-width: 84%;
    background-color: white;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23);
    border: 1px solid #F1F1F1;
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
    & br {
      line-height: 1;
    }
    padding: 1rem 1.2rem 1rem 1.2rem;
    font-size: 1.05rem;
    margin: 0;
    max-width: 84%;
    font-weight: 500;
    background-color: black;
    box-shadow: 1px 1px 6px rgba(15, 27, 40, 0.12);
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

const Content = styled.div`
  line-height: 1;
`