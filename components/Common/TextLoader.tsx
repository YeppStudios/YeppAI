import Centered from '@/components/Centered';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TextLoader = () => {
  const texts = [
    `I'm thinking of the best content for you.`,
    'I\'m preparing a set of the best answers.',
    'Give me a moment to ask an expert for advice...',
    'Just a sip of coffee left...',
    'I\'m analyzing your command...',
    'I\'m searching for information in my database...',
    'Give me a moment...',
    'I\'m gathering information from various sources...',
    'I\'m matching the best answers...',
    'I\'m verifying the information...',
    'I\'m checking the current information...',
    'Wait a moment, I\'m reviewing resources...',
    'I\'m selecting responses to your command...',
    'I\'m working on your request...',
    'I\'m searching my knowledge...',
    'I\'m looking for additional information...',
    'I\'m checking the data accuracy...',
    'I\'m searching for information on this topic...',
    'I\'m researching the topic you\'re asking about...',
    'I\'m searching for the most relevant information...',
    'I\'m analyzing the query...',
    'I\'m exploring various perspectives...',
    'I\'m checking diverse sources...',
    'I\'m gathering information from my knowledge base...',
    'I\'m looking for the best sources of information...',
    'I\'m preparing responses to your command...',
    'Everything is almost ready...',
    'I\'m reading on this topic...',
    'I\'m checking all possibilities...',
    'I\'ll think of something soon...',
    'Just a moment...',
    'I need to think this through...',
    'Just a little longer, it\'s worth the wait...',
    'Please be a bit patient',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(Math.floor(Math.random() * texts.length));
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Centered>
      <Loader>{texts[currentIndex]}</Loader>
    </Centered>
  );
};

export default TextLoader;

const Loader = styled.div`
  color: black; 
  width: 15vw; 
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;
