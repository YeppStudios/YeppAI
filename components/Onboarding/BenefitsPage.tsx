import styled, { keyframes } from "styled-components";
import Centered from "../Centered";
import Logo from "./common/Logo";
import Timeline from "./common/Timeline";
import Title from "./common/Title";
import xIcon from "../../public/images/xIcon.png";
import Image from "next/image";
import BackButton from "./common/BackButton";
import BottomTimeline from "./common/BottomTimeline";
import SkipButton from "./common/SkipButton";
import SlideBottom from "../Animated/SlideBottom";
import ContinueButton from "./common/ContinueButton";
import textsIcon from "../../public/images/textsIcon.png";
import socialMediaIcon from "../../public/images/socialMediaIcon.png";
import articleIcon from "../../public/images/articlesIcon.png";
import websiteIcon from "../../public/images/websitesIcon.png";
import mailIcon from "../../public/images/mailIcon.png"
import meshBackground from "../../public/images/testimonialsBackground.png";
import mobileMeshBackground from "../../public/images/mobileMeshBackground2.png";
import mobileBackground from "../../public/images/mobileOnboardingBackground.png";
import { useCallback, useEffect, useState } from "react";
import PageBackground from "./common/PageBackground";
import Link from "next/link";

let count = 0;
const emoji = '😥';
const features = [
    {title: "Opisać Produkt", description: "Asystent wzbudzi zainteresowanie Klientów poprzez przyciągające opisy produktów.", icon: websiteIcon}, 
    {title: "Wygenerować Post", description: "Asystent wygeneruje treści postów trafiających do Twojego potencjalnego klienta.", icon: socialMediaIcon},
    {title: "Wygenerować Treści", description: "Asystent stworzy dla Ciebie newslettera oraz tematyczny artykuł, a nawet wygeneruje maila.", icon: textsIcon}, 
    {title: "Zainteresować Klientów", description: "Asystent stworzy dla Ciebie slogany marketingowe do każdej działaności i produktu.", icon: mailIcon},
    {title: "Stworzyć Strategię", description: "Asystent uwolni Twój potencjał pomagając Ci zbudować strategię marketingową.", icon: articleIcon}, 
    {title: "Wyprasować Ubrania", description: "Asystent stworzy Tobie plan żywieniowy lecz nawet on unika prasowania...", icon: xIcon}, 
]

interface Emoji {
    left: number
  }
interface SectionWithBackground {
    image: any,
    mobileImage: any
}
  

const BenefitsPage = (props: {children: any, back: any, openChat: any}) => {

    const [confetti, setConfetti] = useState<Array<Emoji>>([]);
    const [maxCount, setMaxCount] = useState(10);
    const [allowConfetti, setAllowConfetti] = useState(false);
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          if (count < maxCount && allowConfetti){
            count += 1;
            setConfetti([...confetti, { left: Math.random() * 89 }]);
          }
        }, 50);
    
        return () => clearInterval(interval);

      }, [confetti, maxCount]);


      const handleClick = (title: string) => {
          if(title === "Wyprasować Ubrania"){
            setAllowConfetti(true);
            count = 0;
            setMaxCount(maxCount + 1)
          } else if (title === "Opisać Produkt") {
              props.openChat();
              localStorage.setItem("defaultText", "Jak możesz pomóc mi w stworzeniu opisu produktu?");
          } else if (title === "Stworzyć Strategię") {
            props.openChat();
            localStorage.setItem("defaultText", "Jak możesz pomóc mi w stworzeniu strategii marketingowej dla mojego biznesu?");
          } else if (title === "Wygenerować Treści") {
            props.openChat();
            localStorage.setItem("defaultText", "Jakie treści możesz dla mnie wygenerować?");
          }else if (title === "Wygenerować Post") {
            props.openChat();
            localStorage.setItem("defaultText", "Wygeneruj post na Facebooka firmy o nazwie Yepp, która jest software housem. Poszukujemy młodego programisty do pomocy i stawka godzinowa to od 25 do nawet 80zł.");
          } else if (title === "Zainteresować Klientów") {
            props.openChat();
            localStorage.setItem("defaultText", "Jak możesz pomóc mi zainteresować moich klientów?");
          } else if (title === "Wyprasować Ubrania") {
            props.openChat();
          }
      }

    const renderFeatures = () => {
        const renderedFreatures = features.map((feature) => {
            return (
                <div key={feature.title}>
                    <SlideBottom>
                    <FeatureContainer onClick={() => handleClick(feature.title)}>
                        <FeatureIcon>
                            <Image style={{ width: "100%", height: "100%" }}  src={feature.icon} alt={'icon'}></Image> 
                        </FeatureIcon>
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>
                            {feature.description}
                        </FeatureDescription>
                    </FeatureContainer>
                    </SlideBottom>
                </div>
            )
        })
        return (
            <FeaturesSection image={meshBackground} mobileImage={mobileMeshBackground}>
                {renderedFreatures}
            </FeaturesSection>
        )
    }

    return (
        <div style={{width: "100vw", overflow: "hidden"}}>
            <PageBackground image={mobileBackground} />
            {confetti.map((item, i) => (
                <Emoji key={i} left={item.left} >
                    {emoji}
                </Emoji>
            ))}
            <Centered>
                {mobile ? <Logo color="#ffffff" /> : <Logo color="black" />}
            </Centered>
            <BackButton back={props.back}/>
            <Centered>
                {mobile ? <Title><h1 style={{color: "white"}}>Asystent pomoże Ci:</h1></Title> : <Title>Asystent pomoże Ci:</Title>}
            </Centered>
            {renderFeatures()}
            <Centered>
                <Link href="/onboarding/?step=3">
                    <ContinueButton text="Kontynuuj"/>
                </Link>
            </Centered>
            <BottomTimeline>
                <Centered>
                    {props.children}
                </Centered>
            </BottomTimeline>
            <SkipButton />
        </div>
    )
}

export default BenefitsPage;

const FeaturesSection = styled.div<SectionWithBackground>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 7vh;
    margin-bottom: 4vh;
    color: white;
    &:before {
        content: "";
        position: absolute;
        width: 110vw;
        height: 80vh;
        margin-top: -10vh;
        z-index: 0;
        background-image: url(${props => props.image.src});
        background-size: cover;
        background-position: center;
    }
    @media (max-width: 1023px) {
        margin-bottom: 0vh;
        margin-top: 5vh;
        &:before {
            width: 100vw;
        }
    }
`

const FeatureContainer = styled.div`
    width: 30vw;
    cursor: pointer;
    background: rgba(255, 255, 255, 1);
    color: black;
    box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.1);
    margin: 0.7vw;
    border-radius: 15px;
    padding: 3.2vh 2vw 4.4vh 1.5vw;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(0.95);
        box-shadow: none;
    }
    @media (max-width: 1023px) {
        width: 44vw;
        height: 14vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        box-shadow: none;
        align-items: center;
        margin: 0.7vh;
        background-color: white;
        padding: 1.5vh 2.5vh 2.5vh 2vh;
        &:hover {
            transform: scale(1);
        }
    }
`

const FeatureIcon = styled.div`
    width: 5vh;
    height: 5vh;
    position: relative;
    @media (max-width: 1023px) {
        width: 4.5vh;
        height: 4.5vh;
    }
`

const FeatureTitle = styled.h2`
  font-size: 2.5vh;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  margin-top: 0.5rem;
  @media (max-width: 1023px) {
    font-size: 3.5vw;
    text-align: center;
    width: 100%;
  }
`

const FeatureDescription = styled.div`
    font-size: 1.75vh;
    margin-top: 0.2vw;
    color: #717EA6;
    width: 94%;
    @media (max-width: 1023px) {
        display: none;
    }
`

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
  animation: ${fall} 3s linear;
  z-index: 100;
`;