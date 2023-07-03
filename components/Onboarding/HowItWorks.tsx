import Image from "next/image";
import styled from "styled-components";
import Centered from "../Centered";
import BackButton from "./common/BackButton";
import BottomTimeline from "./common/BottomTimeline";
import ContinueButton from "./common/ContinueButton";
import Logo from "./common/Logo";
import SkipButton from "./common/SkipButton";
import Title from "./common/Title";
import conversationVisualisation from "../../public/images/conversationVisualization.png";
import thoughtIcon from "../../public/images/thoughtIcon.png";
import sendIcon from "../../public/images/sendIcon.png";
import conversationIcon from "../../public/images/conversationIcon.png";
import aimIcon from "../../public/images/aimIcon.png";
import line from "../../public/images/line.png";
import SlideLeft from "../Animated/SlideLeft";
import SlideBottom from "../Animated/SlideBottom";
import SlideRight from "../Animated/SlideRight";
import { useEffect, useState } from "react";
import mobileBackground from "../../public/images/mobileOnboardingBackground.png";
import Link from "next/link";


interface SectionWithBackground {
    image: any
  }
  

const HowItWorks = (props: {children: any, back: object}) => {

    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, [])
    
      
    return (
        <div style={{height: "100vh"}}>
            <PageBackground image={mobileBackground}/>
            <BackButton back={props.back}/>
            <SkipButton />
            <Centered>
                {mobile ? <Logo color="white" /> : <Logo color="black" />}
            </Centered>
            <Centered>
                {mobile ? <Title><h1 style={{color: "white"}}>Jak efektywnie użyć asystenta?</h1></Title> : <Title>Jak efektywnie użyć asystenta?</Title>}
            </Centered>
            <Centered>
                <InstructionContainer>
                    <div style={{height: "100%"}}>
                    <InstructionsIcons>
                        <Icon>
                            <Image style={{ width: "auto", height: "100%" }}  src={thoughtIcon} alt={'icon'}></Image> 
                        </Icon>
                        <Line>
                            <Image style={{ width: "auto", height: "100%" }}  src={line} alt={'icon'}></Image> 
                        </Line>
                        <Icon>
                        <Image style={{ width: "auto", height: "100%" }}  src={aimIcon} alt={'icon'}></Image> 
                        </Icon>
                        <Line>
                            <Image style={{ width: "auto", height: "100%" }}  src={line} alt={'icon'}></Image> 
                        </Line>
                        <Icon>
                        <Image style={{ width: "auto", height: "100%" }}  src={sendIcon} alt={'icon'}></Image> 
                        </Icon>
                        <Line>
                            <Image style={{ width: "auto", height: "100%" }}  src={line} alt={'icon'}></Image> 
                        </Line>
                        <Icon>
                        <Image style={{ width: "auto", height: "100%" }}  src={conversationIcon} alt={'icon'}></Image> 
                        </Icon>
                    </InstructionsIcons>
                    </div>
                    <Instrucitons>
                        <SlideBottom>
                        <Instruction>
                            <InstructionNumber>01. </InstructionNumber>
                            <InstructionTitle>Wymyśl Ideę</InstructionTitle>
                            <div></div>
                            <InstructionDescription>Wybierz dowolny temat na który chcesz poznać odpowiedź, a asystent zrobi wszystko aby ci pomóc.</InstructionDescription>
                        </Instruction>
                        </SlideBottom>
                        <SlideBottom>
                        <Instruction>
                            <InstructionNumber>02. </InstructionNumber>
                            <InstructionTitle>Doprecyzuj Oczekiwania</InstructionTitle>
                            <div></div>
                            <InstructionDescription>Czym bardziej szczegółowo opiszesz swoją potrzebę, tym odpowiedź asystenta będzie dokładniejsza.</InstructionDescription>
                        </Instruction>
                        </SlideBottom>
                        <SlideBottom>
                        <Instruction>
                            <InstructionNumber>03. </InstructionNumber>
                            <InstructionTitle>Napisz Wiadomość</InstructionTitle>
                            <div></div>
                            <InstructionDescription>Złóż wszystko w całość i skorzystaj z opcji Chatu <br />z Asystentem zatwierdzając wiadomość.</InstructionDescription>
                        </Instruction>
                        </SlideBottom>
                        <SlideBottom>
                        <Instruction>
                            <InstructionNumber>04. </InstructionNumber>
                            <InstructionTitle>Konwersuj i Ulepszaj</InstructionTitle>
                            <div></div>
                            <InstructionDescription>Dopytuj o najbardziej nurtujące cię zagadnienia aż do wyczerpania próbnego limitu.</InstructionDescription>
                        </Instruction>
                        </SlideBottom>
                    </Instrucitons>
                    <SlideRight>
                    <VisualizationContainer>
                            <Image style={{ width: "90%", height: "90%" }} src={conversationVisualisation} alt={'visualization'}></Image> 
                    </VisualizationContainer>
                    </SlideRight>
                </InstructionContainer>
            </Centered>
            <BottomTimeline>
                <Centered>
                    {props.children}
                </Centered>
            </BottomTimeline>
            <Centered>
                <Link href="/onboarding/?step=4">
                    <ContinueButton text="Kontynuuj"/>
                </Link>
            </Centered>
        </div>
    )
}

export default HowItWorks;

const PageBackground = styled.div<SectionWithBackground>`
    display: none;
    @media (max-width: 1023px) {
        display: block;
        position: absolute;
        top: -10vh;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 0;
        background-image: url(${props => props.image.src});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }

`

const InstructionContainer = styled.div`
    height: 56vh;
    width: 92%;
    margin-top: 9vh;
    display: grid; 
    grid-template-columns: 0.2fr 1.3fr 1.4fr; 
    grid-template-rows: 54vh; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". . ."; 
    align-items: center;
    @media (max-width: 1023px) {
        display: flex;
        justify-content: center;
          height: 42vh;
          margin-top: 4.5vh;
          width: 95%;
      }
`

const Instrucitons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: black;
    height: 100%;
    @media (max-width: 1023px) {
        justify-content: flex-start;
        margin-top: 2vh;
    }
`

const Instruction = styled.div`
    height: 13vh;
    width: 35vw;
    margin-left: 2vw;
    display: grid; 
    grid-template-columns: 0.2fr 1.8fr; 
    grid-template-rows: 0.3fr 1.7fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."
      ". .";
    @media (max-width: 1023px) {
        width: auto;
        height: auto;
        margin: 0.25vh 0 0.25vh 2vh;
    }
`

const InstructionNumber = styled.div`
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    font-size: 2.5vh;
    @media (max-width: 1023px) {
        font-family: 'Lato' , sans-serif;
        font-weight: 600;
    }
`

const InstructionTitle = styled.div`
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    font-size: 2.5vh;
    @media (max-width: 1023px) {
        margin-left: 2vw;
        font-family: 'Lato' , sans-serif;
        font-weight: 600;
    }
`

const InstructionDescription = styled.div`
    font-size: 2vh;
    margin-top: 0.4vh;
    color: #717EA6;
    width: 94%;
    @media (max-width: 1023px) {
        display: none;
    }
`

const InstructionsIcons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 80%;
    @media (max-width: 1023px) {
        margin-top: 1vh;
    }
`

const VisualizationContainer = styled.div`
    height: 90%; 
    display: flex; 
    justify-content: end; 
    margin-bottom: 2vh;
    @media (max-width: 1023px) {
        display: none;
    }
`

const Icon = styled.div`
    height: 8vh;
    @media (max-width: 1023px) {
        height: 6.5vh;
    }
`

const Line = styled.div`
    height: 6vh;
    @media (max-width: 1023px) {
        height: 3.75vh;
    }
`