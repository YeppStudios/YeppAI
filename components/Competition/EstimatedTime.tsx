import Centered from "../Centered";
import styled from "styled-components";
import { useEffect, useState } from "react";

function EstimatedTime(props: { competitors: any }) {
    const [timeInSeconds, setTimeInSeconds] = useState(props.competitors.length * 45);
  
    useEffect(() => {
      let interval: string | number | NodeJS.Timeout | undefined;
  
      if (timeInSeconds > 0) {
        interval = setInterval(() => {
          setTimeInSeconds((prevTime) => prevTime - 1);
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [timeInSeconds]);
  
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    
    let timeDisplay;
  
    if (timeInSeconds > 0) {
      if (timeInSeconds > 60) {
        timeDisplay = `${minutes}m ${remainingSeconds}s`;
      } else {
        timeDisplay = `${timeInSeconds}s`;
      }
    } else {
      timeDisplay = 'Wait...';
    }
  
    return (
      <Centered>
        <TimeContainer>
          Est. time: {timeDisplay}
        </TimeContainer>
      </Centered>
    );
  }

export default EstimatedTime;

  const TimeContainer = styled.p`
    margin-top: 3vh;
    font-size: 1rem;
    color: #798094;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

  