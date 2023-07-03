import { useEffect } from "react";
import styled from "styled-components";
import { useAnimationControls } from "framer-motion"
import { motion } from "framer-motion";

const fill = {
  hidden: {
      width: 0,
  },
  secondStep: {
      width: "25%",
  },  
  thirdStep: {
      width: "50%",
  },
  fourthStep: {
    width: "75%",
  },
  fifthStep: {
    width: "100%",
  }
}

const appear = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

const Timeline = (props: {step: number}) => {
  const lineControls = useAnimationControls()
  const circleControls = useAnimationControls()

  useEffect(() => {
    const start = () => {
        if (props.step === 1) {
          lineControls.start(fill.hidden)
        } else if (props.step === 2) {
          lineControls.start(fill.secondStep)
        } else if (props.step === 3) {
          lineControls.start(fill.thirdStep)
        } else if (props.step === 4) {
          lineControls.start(fill.fourthStep)
        } else if (props.step === 5) {
          lineControls.start(fill.fifthStep)
        }

        circleControls.start(appear.visible)
    }

    start();

  }, [props.step])
  
    return (
        <TimelineContainer>
        <Line>
          <BlueLine 
            as={motion.div}
            variants={fill}
            initial="hidden"
            animate={lineControls}
            transition={{
                duration: 1,
            }}          
          />
        </Line>
        {props.step >= 1 ? 
          <SelectedCircle 
            as={motion.div} 
            initial="hidden"
            animate={circleControls}
            variants={appear}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
          }}/> : <Circle />
        }
        {props.step >= 2 ? 
          <SelectedCircle 
            as={motion.div} 
            initial="hidden"
            animate={circleControls}
            variants={appear}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}/> : <Circle />
        }
        {props.step >= 3 ? 
          <SelectedCircle 
            as={motion.div} 
            initial="hidden"
            animate={circleControls}
            variants={appear}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
          }}/> : <Circle />
        }
        {props.step >= 4 ? 
          <SelectedCircle 
            as={motion.div} 
            initial="hidden"
            animate={circleControls}
            variants={appear}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}/> : <Circle />
        }
        {props.step === 5 ? 
          <SelectedCircle 
            as={motion.div} 
            initial="hidden"
            animate={circleControls}
            variants={appear}
            transition={{
              default: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
              },
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.001
              }
            }}/> : <Circle />
        }
        </TimelineContainer>
    )
}

export default Timeline;

const TimelineContainer = styled.div`
    width: 40vw;
    height: 3.5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5vh;
    @media (max-width: 1023px) {
      height: 3.5vh;
      width: 70vw;
      margin-top: 4vh;
    }
`

const Line = styled.div`
    position: absolute;
    width: 40vw;
    height: 0.7vh;
    background-color: #ECECEC;
    box-shadow: inset 1px 1px 2.5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: visible;
    display: flex;
    z-index: 0;
    @media (max-width: 1023px) {
      height: 0.6vh;
      width: 70vw;
      z-index: 0;
    }
`

const Circle = styled.div`
    width: 3vh;
    height: 3vh;
    border-radius: 50%;
    z-index: 1;
    background-color: #ECECEC;
    box-shadow: inset 1px 1px 2.5px rgba(0, 0, 0, 0.2);
    @media (max-width: 1023px) {
      width: 2.5vh;
      height: 2.5vh;
    }
`

const SelectedCircle = styled.div`
    width: 3vh;
    height: 3vh;
    border-radius: 50%;
    background-color: #000000;
    @media (max-width: 1023px) {
      width: 2.5vh;
      height: 2.5vh;
    }
`

const BlueLine = styled.div`
  height: 0.7vh;
  background-color: #000000;
  border-radius: 10px;
  @media (max-width: 1023px) {
    height: 0.6vh;
  }
`