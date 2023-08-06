import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

type LineProps = {
  isLast: boolean;
};

const Line = styled.div<LineProps>`
  width: ${({ isLast }) => (isLast ? '50%' : '100%')};
  height: 1.2rem;
  background: linear-gradient(90deg, #CEC3AE, #EEE9DF, #CEC3AE);
  background-size: 200% 100%;
  animation: ${pulse} 1.75s linear infinite;
  border-radius: 7px;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MultiLineSkeletonLoader = (props: { lines: number, justifyContent: string }) => {
  const { lines } = props;

  return (
    <div style={{width: "100%", display: "flex", justifyContent: `${props.justifyContent}`, flexWrap: "wrap", marginTop: "0.5rem"}}>
      {Array.from({ length: lines }).map((_, index) => (
        <Line key={index} isLast={index === lines - 1} />
      ))}
    </div>
  );
};

export default MultiLineSkeletonLoader;
