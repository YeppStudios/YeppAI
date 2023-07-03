import { useEffect, useState } from "react";
import styled from "styled-components";
import lighbulb from "../../public/images/lighbulb.png";
import time from "../../public/images/time.png";
import team from "../../public/images/team.png";
import guide from "../../public/images/guide.png";
import lowprice from "../../public/images/low-price.png";
import whiteboard from "../../public/images/whiteboard.png"
import Image from "next/image";
import proSummaryBackground from "../../public/images/testimonialsBackground.png";
import longMobileBg from "../../public/images/longMobileBg.png";

interface SectionWithBackground {
    image: any,
    mobileBackground: any
  }
  interface CustomColor {
    color: string
  }
  

const ProFunctionalities = (props: {type: string}) => {

    const [mobile, setMobile] = useState(true);

  
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }
    }, []);


    return (
        <Container image={proSummaryBackground} mobileBackground={longMobileBg}>
            <MediumFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={lowprice} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Przynieść Ci zysk
                </FeatureTitle>
                <Description color="black">Asystent jako narzędzie pracy zwiększy Twoje możliwości realizacji zadań oraz poszerzy kompetencje do zarabiania więcej. </Description>
            </MediumFeature>
            <BigFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={whiteboard} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Zwiększyć jakość treści
                </FeatureTitle>
                <Description color="black">Asystent zwiększy efektywność tworzenia przez Ciebie treści. Posty, maile, opisy produktów, reklamy czy artykuły od dzisiaj mogą zyskać dzięki unikalnemu charakterowi Asystenta.</Description>
            </BigFeature>
            <SmallFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={time} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Zapewnić Ci czas wolny
                </FeatureTitle>
                <Description color="black">Przy pomocy Asystenta jesteś w stanie wykonać w 5 minut pracę, która normalnie zajęłaby cały dzień.</Description>
            </SmallFeature>
        </Container>
    )
}

export default ProFunctionalities;

const Container = styled.div<SectionWithBackground>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin-left: -8vw;
    padding: 10vh 8vw 10vh 8vw;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    @media (max-width: 1023px) {
    width: 100vw;
    margin-left: 0vw;
    padding: 5vh 0 10vh 0;
    background-size: 100%;
    background-image: none;
    }
`
const TopFeatureRow = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". ."; 
`

const TestFeatureButtonContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
`


const TestFeatureButton = styled.div`
      color: black;
      display: flex;
      align-items: center;
      background: #EEF1F3;
      padding: 1vh 2vw 1vh 2vw;
      border-radius: 20px;
      transition: all 0.3s ease;
      &:hover {
        background: #0D0E16;
        color: white;
    }
    @media (max-width: 1023px) {
        padding: 1.2vh 4vw 1.2vh 4vw;
    }
`

const SmallFeature = styled.div`
    width: 26%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh 3vh 3vh 3vh;
    box-shadow: -2px 2px 25px rgba(101, 120, 248, 0.6), 4px -4px 25px rgba(100, 181, 255, 0.6);
    transition: all 0.4s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
        width: 90vw;  
        margin-bottom: 2vh;
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
    }
    &:hover {
        transform: scale(0.95);
    }
`

const Description = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 1vw;
    width: 95%;
    text-align: left;
    margin-top: 1.5vh;
    @media (max-width: 1023px) {
        margin-top: 0.5rem;
        font-size: 2.4vh;
        width: 100%;
    }
`


const MediumFeature = styled.div`
    width: 31%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh 3vh 3vh 3vh;
    box-shadow: -2px 2px 25px rgba(101, 120, 248, 0.6), 4px -4px 25px rgba(100, 181, 255, 0.6);    transition: all 0.4s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
        width: 90vw;  
        margin-bottom: 2vh;
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
        box-shadow: -2px 2px 5px rgba(101, 120, 248, 0.6), 4px -4px 5px rgba(100, 181, 255, 0.6);
    }
    &:hover {
        transform: scale(0.95);
    }
`
const BigFeature = styled.div`
    width: 40%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh;
    transition: all 0.4s ease;
    box-shadow: -2px 2px 25px rgba(101, 120, 248, 0.6), 4px -4px 25px rgba(100, 181, 255, 0.6);
    cursor: pointer;
    @media (max-width: 1023px) {
        margin-bottom: 2vh;
        width: 90vw;  
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
        box-shadow: -2px 2px 5px rgba(101, 120, 248, 0.6), 4px -4px 5px rgba(100, 181, 255, 0.6);
    }
    &:hover {
        transform: scale(0.95);
    }
`

const IconContainer = styled.div`
    width: 2.5vw;
    height: 2.5vw;
    @media (max-width: 1023px) {
        width: 7vh;
        height: 7vh;
    }
`

const FeatureTitle = styled.div`
    font-size: 1.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    color: #1C1C1C;
    margin-top: 1.5vh;
    @media (max-width: 1023px) {
        font-size: 3vh;
        margin-top: 2vh;
    }
`
