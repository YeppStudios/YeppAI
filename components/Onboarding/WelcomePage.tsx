import styled from "styled-components";
import Image from "next/image";
import Centered from "../Centered";
import Timeline from "./common/Timeline";
import SlideBottom from "../Animated/SlideBottom";
import laptopBackground from "../../public/images/laptopVisualization.png";
import iphoneMockup from "../../public/images/iphoneMockup.png";
import Title from "./common/Title";
import Logo from "./common/Logo";
import Description from "./common/Description";
import SkipButton from "./common/SkipButton";
import ContinueButton from "./common/ContinueButton";
import mobileBackground from "../../public/images/mobileOnboardingBackground.png";
import { useEffect, useState } from "react";
import PageBackground from "./common/PageBackground";
import Link from "next/link";

interface SectionWithBackground {
  image: any
}


const WelcomePage = (props: {children: any}) => {
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
      if(window.innerWidth >= 1023){
        setMobile(false);
      }
    }, [])
    
    return (
        <div style={{overflow: "hidden", color: "white"}}>
          <PageBackground image={mobileBackground}/>
            <Centered>
             {mobile ? <Logo color="#ffffff" /> : <Logo color="black" />}
            </Centered>
            <Centered>
                 <Slogan>
                    Witaj w nowej erze tworzenia treści dla Twojego biznesu.
                </Slogan>               

            </Centered>
            <Centered>
                <Description>
                  Z Asystentem zwiększysz swoją widoczność w internecie oraz efektywność działań twojej firmy, poprzez tworzenie treści do 10X razy szybciej zaadaptujesz swój biznes do Nowej Ery Technologicznej, zyskując przewagę konkurencyjną.
                </Description>
            </Centered>
            <BottomContainer>
            <Centered>
              <Link href="/onboarding/?step=2">
                    <ContinueButton text="Kontynuuj"/>
                </Link>
            </Centered>
            <Centered>
                {props.children}
            </Centered>
            <Centered>
            <SlideBottom>
                  <LaptopContainer>
                      <Image style={{ width: "auto", height: "100%" }}  src={laptopBackground} alt={'preview'}></Image> 
                  </LaptopContainer>
                  <Centered>
                  <IphoneContainerMobile>
                      <Image style={{ width: "100%", height: "auto" }}  src={iphoneMockup} alt={'preview'}></Image> 
                  </IphoneContainerMobile>
                  </Centered>
            </SlideBottom>
            </Centered>
            </BottomContainer>
            <SkipButton />
        </div>
    )
}

export default WelcomePage;

const LaptopContainer = styled.div`
  width: auto;
  height: 90vh;
  display: flex;v
  justify-content: center;
  padding: 2rem 3rem 2rem 2rem;
  @media (max-width: 1023px) {
    display: none;
  }
`

const IphoneContainerMobile = styled.div`
  width: 75%;
  height: auto;
  margin-top: 5vh;
  padding: 0;
  margin-bottom: 8rem;
  @media (min-width: 1023px) {
    display: none;
  }
`

const GradientText = styled.span`
    background: -webkit-linear-gradient(-35deg, #4032c6, #00A3FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`


const BottomContainer = styled.div`
  width: 100%;
  @media (max-width: 1023px) {
    margin-top: 2vh;
  }
`

const Slogan = styled.h1`
  text-align: center;
  font-size: 4vw;
  line-height: 4.4vw;
  width: 64vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  margin-top: 6vw;
  color: black;
  @media (max-width: 1023px) {
    margin-top: 3vh;
    line-height: 10.5vw;
    font-size: 9vw;
    width: 95vw;
    color: white;
  }
`

