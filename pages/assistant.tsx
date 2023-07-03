import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import laptopVisualization from "../public/images/personalLaptopVisualization.png";
import iphoneMockup from "../public/images/iphoneMockup.png";
import PartnersSection from '@/components/Landing/PartnersSection';
import Section from '@/components/Landing/Section';
import LearnMore from '@/components/Landing/LearnMore';
import LeftFeature from '@/components/Landing/LeftFeature';
import RightFeature from '@/components/Landing/RightFeature';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import PlansHeader from '@/components/Landing/PlansHeader';
import PlansSection from '@/components/Landing/PlansSection';
import thinArrow from "../public/images/thinArrow.png";
import LearnMoreSection from '@/components/Landing/LearnMoreSection';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import secondFeature from "../public/images/secondFeature.png";
import thirdFeature from "../public/images/thirdFeature.png";
import firstFeature from "../public/images/firstFeature.png";
import fourthFeature from "../public/images/fourthFeature.png";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillGiftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Title from '@/components/Common/Title';
import Banner from '@/components/Landing/Banner';
import BuyAsystentBanner from '@/components/Landing/BuyAsystentBanner';
import AssistantSummary from '@/components/Landing/AssistantSummary';
import ScheduleMeeting from '@/components/Landing/ScheduleMeeting';
import ExtrasBanner from '@/components/Landing/ExtrasBanner';
import ColorfulText from '@/components/Common/ColorfulText';
import Stats from '@/components/Landing/Stats';

interface SectionWithBackground {
  image: any,
  mobileBackground: any
}

interface CustomColor {
  color: string
}

const Homepage = () => {
  const [mobile, setMobile] = useState(false);
  const router = useRouter();

  const handleNewsletterScroll = () => {
    const contactSection = document.getElementById("newsletter")!;
    contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
  }, []);

    return (
      <div>
        <Head>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Odkryj potęgę sztucznej inteligencji i szybko twórz unikalne artykuły, posty, opisy produktów, strategie i wiele więcej. Usprwanij swój proces twórczy już dziś!" />
          <title>Asystent AI | Marketingowe Narzędzie AI</title>
        </Head>
        <PageContent>
          <Loading />
          <Banner />
          <Navbar onNewsletterClick={() => handleNewsletterScroll()} />
          <HeroSection>
              <HeroText>Twój Personalny <br />Asystent AI.</HeroText>
              <div>
              <DescriptionHero color="black">
                Twórz kreatywne treści nawet 10X szybciej i uwolnij się od powtarzalnych, czasochłonnych zadań!
              </DescriptionHero>
              <Centered>
              <Link href="/business">
                <LoginButton className='login-btn-landing'><BtnText>Sprawdź wersję</BtnText><ColorfulText><b>Business</b></ColorfulText></LoginButton>
              </Link>
              </Centered>
              <Centered>
                <Link href="/assets?registration=true">
                  <TestButton className='start-free-trial-landing'><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></TestButton>
                </Link>       

              </Centered>
              {!mobile ?
                <LearnMore color="black"/>
                :
                <Centered>
                  <Link href="/chat">
                    <MobileAssistantBusinessBtn>Zaloguj się
                    </MobileAssistantBusinessBtn>
                  </Link>
                </Centered>
              }

              </div>
          </HeroSection>
          <SlideBottom>
                <Centered>
                  <LaptopContainer>
                      <Image style={{ width: "auto", height: "100%" }}  src={laptopVisualization} alt={'preview'}></Image> 
                  </LaptopContainer>
                  </Centered>
                  <Centered>
                  <IphoneContainerMobile>
                      <Image style={{ width: "100%", height: "auto" }}  src={iphoneMockup} alt={'preview'}></Image> 
                  </IphoneContainerMobile>
                </Centered>
          </SlideBottom>
          <PartnersSection />
          <Centered>
              <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
              <Link href="/business">
                  <Centered><BusinessBtn className='go-to-business-btn'><TestText>Sprawdź wersję <ColorfulText>Business</ColorfulText></TestText></BusinessBtn></Centered>
              </Link>
              <Note>Twoje własne firmowe AI</Note>
              </div>
            </Centered>
          <Section>
            {!mobile &&
              <Title fontSize='6vh' textAlign='center' width='100%' color="black" mobileFontSize='5.5vh' mobileTextAlign='center'>
                Dzięki Asystentowi Zyskasz...
              </Title>
            }
            <LeftFeature 
              title="Posty, reklamy, maile oraz opisy w kilka sekund." 
              image={firstFeature} 
              text="Chwilowy kryzys kreatywności? Ciągle ta sama tematyka? Asystent AI to Twoje narzędzie do generowania treści. Asystent w Firmie = Czas w kieszeni."
              marginTop='5vh'
              color="black"
            />
            <RightFeature 
              title="Artykuły oraz blogi które piszą się same." 
              image={secondFeature} 
              text="Inteligentny edytor treści AI to funkcjonalność zmieniająca Copywriting. Podaj tematykę, ton i słowa kluczowe i pracuj nad ostatnimi szlifami dla Twojego dzieła."
              color="black"
             />
            <LeftFeature  
              title="Tysiące poleceń, aby wykorzystać AI w 100%" 
              image={thirdFeature} 
              text="Własna wyszukiwarka poleceń marketingowych pomoże Tobie płynnie operować w wielu kategoriach marketingu z wiedzą ekspercką. Jak? Wyszukiwarka = ponad 1000 poleceń specjalistycznych gotowych do zadania Asystentowi"
              marginTop='0'
              color="black"
            />
            <RightFeature 
              title="Inteligentnego Asystenta AI dostępnego 24/7" 
              image={fourthFeature} 
              text="Własny chat o charakterystyce marketingowej zawsze gotowy do doradztwa i wykonania Twojego polecenia."
              color="black"
             />
          </Section>
          <Centered><BigTestButton className='start-free-trial-landing' onClick={() => router.push("/chat?registration=true")}><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></BigTestButton></Centered>
          <Section>
            <Stats />
          </Section>
          <Section>
            <Centered>
              <Title fontSize='6vh' textAlign='center' width='60%' color="black" mobileFontSize='4vh' mobileTextAlign='center'>
                  W telegraficznym skrócie, Asystent AI jest z Tobą aby:
              </Title>
            </Centered>
            <AssistantSummary type="basic"/>
          </Section>
          {/* <Section>
              <Title fontSize='6vh' textAlign='center' width='100%' color="black" mobileFontSize='5.5vh' mobileTextAlign='center'>A komu i w czym już pomagamy?</Title>
              <Centered>
                <Description color="black">
                  Asystent AI jest pierwszym w Polsce narzędziem pracy typu generative AI.
                </Description>
              </Centered>
              <TestimonialsSection />
          </Section> */}
          <Section>
          <BuyAsystentBanner />
          </Section>
          <Section>
            <Centered>
            <Title fontSize='6vh' textAlign='center' width='75%' color="black" mobileFontSize='4vh' mobileTextAlign='center'>
              A może jesteś już gotowy na własny model Sztucznej Inteligencji?
            </Title>
            </Centered>
            <Centered>
              
              <Link href="/business">
                  <Centered><BusinessBtn className='go-to-business-btn'><TestText>Sprawdź wersję <ColorfulText>Business</ColorfulText></TestText></BusinessBtn></Centered>
                </Link>
              
            </Centered>
          </Section>
          {/* <Section>
            <ScheduleMeeting />
          </Section> */}
          {/* <div id="offer"></div>
          <Section >
            <PlansHeader color="black" text="Twórz treści nawet 10X szybciej i zaadaptuj swój biznes do Nowej Ery Technologicznej, zyskując przewagę!">
              Wybierz swojego Asystenta już dziś.
            </PlansHeader>
            <PlansSection />
          </Section> */}
          {/* <Section>
            <ExtrasBanner />
          </Section> */}
          <Section>
            <div id="newsletter"></div>
            <LearnMoreSection />
          </Section>
          <Footer />
        </PageContent>
      </div>
    )
}

export default Homepage;

const PageContent = styled.div`
  width: 100vw;
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: white;
  padding: 0 8vw 0 8vw;
  @media (max-width: 1023px) {
    padding: 0 5vw 0 5vw;
  }
`

const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
`

const DescriptionHero = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 2vh;
    width: 31vw;
    text-align: left;
    font-weight: 500;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 1rem;
        width: 100vw;
        padding: 0 2rem 0 2rem;
    }
`

const Description = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 2vh;
    width: 70vw;
    text-align: center;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 2vh;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
`

const LoginButton = styled.button`
    font-size: 2.4vh;
    margin-top: 3vh;
    padding: 1.5vh 5vw 1.5vh 5vw;
    width: 80vw;
    background: #EEF1F3;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    border: none;
    color: black;
    font-weight: 700;
    @media (min-width: 1023px) {
      display: none;
    }
`

const TestButton = styled.button`
    font-size: 2.4vh;
    padding: 1.5vh 5vw 1.5vh 5vw;
    width: 80vw;
        background: #0D0E16;
    margin-top: 3vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    @media (min-width: 1023px) {
      display: none;
    }
`

const LaptopContainer = styled.div`
  width: auto;
  height: 72vh;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  @media (max-width: 1023px) {
    display: none;
  }
`

const IphoneContainerMobile = styled.div`
  width: 75%;
  height: auto;
  margin-top: 5vh;
  padding: 0;
  margin-bottom: 0rem;
  @media (min-width: 1023px) {
    display: none;
  }
`

const SectionWithBackground = styled.div<SectionWithBackground>`
  background-image: url(${props => props.image.src});
  width: 100vw;
  margin-left: -8vw;
  padding: 20vh 8vw 20vh 8vw;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
  @media (max-width: 1023px) {
    padding: 10vh 5vw 10vh 5vw;
    margin-left: -5vw;
    background-size: 120%;
    background-image: url(${props => props.mobileBackground.src});
  }
`


const BigTestButton = styled.button`
  font-size: 3vh;
  margin-top: 0vh;
  padding: 2vh 10vh 2vh 10vh;
  display: flex;
  align-items: center;
  background: #0D0E16;
  color: white;
  transition: all 0.3s ease;
  border-radius: 15px;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  &:hover {
      box-shadow: none;
      transform: scale(0.95);
  }
  @media (max-width: 1023px) {
      padding: 2vh 17vw 2vh 17vw;
      font-size: 2.4vh;
      margin-top: -4vh;
      margin-bottom: 10vh;
  }

`
const TestText = styled.p`
    margin-left: 1.5vw;
    @media (max-width: 1023px) {
        margin-left: 3vw;
    }
`

const ProFunctionalities = styled.div`
    margin-top: 20vh;
    padding: 15vh 8vw 10vh 8vw;
    background-color: #0D0E16;
    width: 100vw;
    margin-left: -8vw;
    @media (max-width: 1023px) {
        margin-left: -5vw;
        padding: 15vh 5vw 10vh 5vw;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`

const BusinessBtn = styled.div`
    margin-top: 4rem;
    font-size: 3vh;
    padding: 2vh 7vh 2vh 7vh;
    text-align: center;
        background: #0D0E16;
    color: white;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        font-size: 2.4vh;
        margin-top: 6vh;
    }
`

const MobileAssistantBusinessBtn = styled.div`
    margin-top: 1.5rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const LearnMoreArrow = styled.div`
    height: 1vh;
    margin-left: 1.5vw;
`

const BtnText = styled.p`
    margin-right: 0.4rem;
`

const Note = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
`