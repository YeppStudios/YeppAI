import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const emojis = ['😓'];
let count = 0;
let maxEmojis = 10;

interface Emoji {
  left: number
}

const fall = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(110vh);
  }
`;

const Emoji = styled.span<Emoji>`
  position: absolute;
  left: ${({ left }) => left}%;
  top: -7vh;
  font-size: 2em;
  animation: ${fall} 4s linear;
`;

const Rain = (props: {click: number}) => {
  const [confetti, setConfetti] = useState<Array<Emoji>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      count +=1;
      if (count<maxEmojis){
      setConfetti([...confetti, { left: Math.random() * 100 }]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [confetti, count, maxEmojis]);

  return (
    <div>
      {confetti.map((item, i) => (
        <Emoji key={i} left={item.left} >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </Emoji>
      ))}
      <button>Button</button>
    </div>
  );
};

export default Rain;
