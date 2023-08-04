import styled, { keyframes } from "styled-components";

interface colorProp {
    color: string;
}

const spinAnimation = keyframes`
100% {
    transform: rotate(1turn);
 }
`

export const Loader = styled.div<colorProp>`
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: ${props => `radial-gradient(farthest-side,${props.color} 94%,#0000) top/0.1rem 0.1rem no-repeat,
        conic-gradient(#0000 30%,${props.color})`};
    -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 0.2rem),#000 0);
    animation: ${spinAnimation} 1s infinite linear;
`

export const BlueLoader = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: radial-gradient(farthest-side,#000 94%,#0000) top/9px 9px no-repeat,
        conic-gradient(#0000 30%,#000);
    -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
    animation: ${spinAnimation} 1s infinite linear;
`

const pulse = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonLoader = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #232127 25%, #e0e0e0 50%, #232127 75%);
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;
