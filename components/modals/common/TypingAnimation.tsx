import styled, { keyframes } from "styled-components";

const TypingAnimation = (props: {colorful: boolean}) => {
    return (
      <TypingContainer>
          <Dot colorful={props.colorful}/>
          <Dot colorful={props.colorful}/>
          <Dot colorful={props.colorful}/>
      </TypingContainer>

    )
}

export default TypingAnimation;

const colorfulAnimation = keyframes`
  0% {
    transform: translateY(0px);
    background-color: #6578F8;
  }
  28% {
    transform: translateY(-7px);
    background-color: #64B5FF;
  }
  44% {
    transform: translateY(0px);
    background-color: #6578F8;
  }
`

const whiteDotsAnimation = keyframes`
  0% {
    transform: translateY(0px);
    background-color: rgba(255, 255, 255, 1);
  }
  28% {
    transform: translateY(-7px);
    background-color: rgba(255, 255, 255, 0.8);
  }
  44% {
    transform: translateY(0px);
    background-color: rgba(255, 255, 255, 0.4);
  }
`


const TypingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 17px;
`

const Dot = styled.div<{colorful: boolean}>`
  animation: ${props => !props.colorful ? whiteDotsAnimation : colorfulAnimation} 2s infinite ease-in-out;
  background-color: ${props => !props.colorful ? "rgba(255, 255, 255, 0.6)" : "#6578F8"};
  border-radius: 50%;
  height: 7px;
  margin-right: 4px;
  vertical-align: middle;
  width: 7px;
  display: inline-block;

  &:nth-child(1) {
    animation-delay: 200ms;
  }
  &:nth-child(2) {
    animation-delay: 300ms;
  }
  &:nth-child(3) {
    animation-delay: 400ms;
  }
  &:last-child {
    margin-right: 0;
  }
`