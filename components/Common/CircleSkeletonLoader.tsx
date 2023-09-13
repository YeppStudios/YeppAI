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

type CircleProps = {
  diameter: string;
};

const Circle = styled.div<CircleProps>`
  width: ${({ diameter }) => diameter};
  height: ${({ diameter }) => diameter};
  background: linear-gradient(90deg, #ECECEC, white, #ECECEC);
  background-size: 200% 100%;
  animation: ${pulse} 2s linear infinite;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

type CircleSkeletonLoaderProps = {
  justifyContent?: string;
  width: string;
  height: string;
};

const CircleSkeletonLoader = (props: CircleSkeletonLoaderProps) => {
  const { width, height } = props;
  const diameter = width > height ? height : width;  // take the smaller of width and height

  return (
    <div style={{width: "100%", display: "flex", justifyContent: props.justifyContent || 'center', flexWrap: "wrap", marginTop: "0.5rem"}}>
      <Circle diameter={diameter} />
    </div>
  );
};

export default CircleSkeletonLoader;
