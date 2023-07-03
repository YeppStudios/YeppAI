import React from 'react';
import { motion } from "framer-motion";
import styled from 'styled-components'
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useState } from 'react';

interface AccordionButton {
  backgroundColor: string
}

export default function Accordion(props: {onClick: any, question: string, answer: string, backgroundColor: string, index: number, openedAccordion: number}) {
  
  return (
    <div>
    <AccordionButton onClick={props.onClick} backgroundColor={props.backgroundColor}>
      {props.question}
      {props.openedAccordion === props.index ? <BsDashLg /> : <BsPlusLg />}
    </AccordionButton>
    <motion.div 
        initial={{ height: 0 }}
        animate={{ height: props.openedAccordion ? 'auto' : 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.2 }}
    >
      {props.openedAccordion === props.index && 
        <AccordionBody>
          {props.answer}
        </AccordionBody>
      }
    </motion.div>
    </div>
  )
}

const AccordionButton = styled.div<AccordionButton>`
  width: 80%;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw 0 2vw;
  cursor: pointer;
  color: black;
  border-radius: 15px;
  background-color: ${props => props.backgroundColor || '#ECECEC'};
  font-weight: 600;
  margin-top: 3vh;
  @media (max-width: 1023px) {
    width: 100%;
    padding: 2vh 4vw 2vh 4vw;
    height: 10vh;
    font-size: 2vh;
    margin-top: 2vh;
  }
`

const AccordionBody = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3vh 2vw 2vh 2vw;
  color: black;
  font-weight: 500;
  border-radius: 15px;
  @media (max-width: 1023px) {
    width: 100%;
    padding: 2vh 4vw 2vh 4vw;
    font-size: 2vh;
  }
`