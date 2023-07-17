import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import laptopVisualization from "../public/images/laptopVisualization.png";
import iphoneMockup from "../public/images/iphoneMockup.png";
import PartnersSection from '@/components/Landing/PartnersSection';
import Section from '@/components/Landing/Section';
import LeftFeature from '@/components/Landing/LeftFeature';
import RightFeature from '@/components/Landing/RightFeature';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import PlansHeader from '@/components/Landing/PlansHeader';
import PlansSection from '@/components/Landing/PlansSection';
import LearnMoreSection from '@/components/Landing/LearnMoreSection';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import firstProFeature from "../public/images/firstProFeature.png";
import secondProFeature from "../public/images/secondProFeature.png";
import thirdProFeature from "../public/images/thirdProFeature.png";
import fourthProFeature from "../public/images/fourthProFeature.png";
import fifthProFeature from "../public/images/fifthProFeature.png";
import { useRouter } from 'next/router';
import { BsFillGiftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Title from '@/components/Common/Title';
import ScheduleMeeting from '@/components/Landing/ScheduleMeeting';
import BusinessStats from '@/components/Landing/BusinessStats';
import webBackground from "../public/images/webBackground.png";
import { TypewriterSection } from '@/components/Landing/TypewriterSection';
import Plans from '@/components/Landing/Plans';
import PlanComparison from '@/components/Landing/PlanComparison';
import Space from '@/components/Docs/common/Space';

interface Background {
  image: any
}
interface SectionWithBackground {
  image: any,
  mobileBackground: any
}

interface CustomColor {
  color: string
}

const Homepage = () => {
  const [mobile, setMobile] = useState(true);

  const router = useRouter();

  const handleNewsletterScroll = () => {
    const contactSection = document.getElementById("newsletter")!;
    contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  useEffect(() => {
    if(window.innerWidth >= 1023){
      setMobile(false);
    }
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  }, []);

    return (
      <div>
        <Head>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Platforma AI do marketingu. Wykorzystaj firmowe dane, które już posiadasz przez własne AI." />
          <title>Yepp AI</title>
        </Head>
        <PageContent>
          <Loading />
          <Navbar onNewsletterClick={() => handleNewsletterScroll()} />
          <Background>
            <Image style={{ width: "100%", height: "100%", opacity: 0.4}} src={webBackground} alt={'preview'}></Image>
          </Background>
          <HeroSection>
              <Centered><SlideBottom><HeroText>Supercharge your <br /> <ColorfulText>marketing agency</ColorfulText> with AI.</HeroText></SlideBottom></Centered>
              {/* <Centered><TypewriterSection/></Centered> */}
              <div>
                <Centered>
              <DescriptionHero color="black">
              Upload information about your clients and streamline the process of content creation.
              </DescriptionHero>
              </Centered>
              <Centered>
                {mobile ?
                  <TestButton id="landing-big-test-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                  :
                  <TestButton id="landing-big-test-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                }
              </Centered>
              <Centered>{!mobile && <div className='font-medium mt-4'>Claim ~10 000 words or 5 days for free</div>}</Centered>
              <Centered>
              <LoginButton onClick={() => router.push("/chat")}>Log in</LoginButton>
              </Centered>
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
                      <Image style={{ width: "100%", height: "auto" }}  src={laptopVisualization} alt={'preview'}></Image> 
                  </IphoneContainerMobile>
                </Centered>
          </SlideBottom>
          <Section>
            <Centered>
            <SlideBottom>
            <div id="functionalities"></div>
            <Centered><MiniTitle>YEPP AI WILL HELP YOU</MiniTitle></Centered>
            <HeroText>
              <ColorfulText>Reduce workload</ColorfulText> and make your marketing agency grow.
            </HeroText>
            <Space margin="5vh"/>
            </SlideBottom>
            </Centered>
            </Section>
            <LeftFeature
                title="Create Client Profiles" 
                gif="/videos/uploading.gif" 
                text="Upload the content and information about your clients, their industry, products etc."
                bulletpoints={["Upload PDF, TXT, PPTX and DOCX files", "Transcribe YouTube content", "Scrape websites"]}
                color="black"
                marginTop='3vh'
            />
            <RightFeature 
                title="Use ready templates" 
                gif="/videos/marketer.gif"
                text="Based on company and industry-specific knowledge:"
                bulletpoints={["Generate Google Ads", "Create unique posts and product descriptions", "Engineer growth hacking strategies"]}
                color="black"
            />
            <LeftFeature
                title="Generate SEO content" 
                gif="/videos/copywriter.gif" 
                text="Based on company knowledge and current internet trends:"
                bulletpoints={["Write SEO articles", "Generate insightful blogs", "Craft guides and rankings"]}
                color="black"
                marginTop='3vh'
            />
            <RightFeature 
                title="Chat with assets" 
                gif="/videos/dataAssistant.gif"
                text="Based on the uploaded content:"
                bulletpoints={["Talk with your company's documents", "Search information about your clients", "Ask your documents for advice"]}
                color="black"
            />
            {/* <LeftFeature 
                title="Sales" 
                gif="/videos/sales.gif" 
                text="Based on knowledge about your clients and your services:"
                bulletpoints={[ "Identify your target group", "Define your clients' needs", "Create personalized sales emails"]}
                color="black"
                marginTop='3vh'
            /> */}
             {!mobile && <Space margin='5rem'/>}
            <Centered><TestButton id="landing-big-test-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton></Centered>
            <Centered>{!mobile && <div className='font-medium mt-4'>Claim ~10 000 words or 5 days for free</div>}</Centered>
          <div id="offer"></div>
          <Section>
          <Centered><MiniTitle>PLANS & SUBSCRIPTIONS</MiniTitle></Centered>
          <Centered><SlideBottom><HeroText>Boost your productivity now.</HeroText></SlideBottom></Centered>
          {!mobile && <Space margin='5rem'/>}
          <Plans openRegistration={true}/>
          </Section>
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
  padding: 0 8vw 0 8vw;
  @media (max-width: 1023px) {
    padding: 0 5vw 0 5vw;
  }
`

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    top: -6rem;
    left: 0;
  `

const HeroSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 9rem;
  @media (max-width: 1023px) {
    display: flex;
    margin-top: 8rem;
  }
`

const DescriptionHero = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 1.5rem;
    width: 70%;
    text-align: center;
    font-weight: 500;
    margin-top: 4vh;
    @media (max-width: 1023px) {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        width: 95%;
        padding: 0 0.7rem 0 0.7rem;
    }
`


const LoginButton = styled.button`
    font-size: 1.2rem;
    margin-top: 3vh;
    padding: 2vh 5vw 2vh 5vw;
    width: 70vw;
    background: #EDEEF3;
    transition: all 0.3s ease;
    border-radius: 25px;
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
    font-size: 1.2rem;
    padding: 2vh 5vw 2vh 5vw;
    width: 70vw;
    border: solid 3px transparent;
    border-radius: 25px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    margin-top: 3vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (min-width: 1023px) {
      width: 28rem;
      margin-top: 8vh;
      padding: 1.5vh 0vw 1.5vh 0vw;
    }
`

const LaptopContainer = styled.div`
  width: auto;
  height: 74vh;
  display: flex;
  justify-content: center;
  margin-top: 12vh;
  @media (max-width: 1023px) {
    display: none;
  }
`

const IphoneContainerMobile = styled.div`
  width: 100%;
  height: auto;
  margin-top: 15vh;
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

const TestText = styled.p`
    margin-left: 1.5vw;
    @media (max-width: 1023px) {
        margin-left: 3vw;
    }
`


const ColorfulText = styled.span`
  background: -webkit-linear-gradient(-70deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const MiniTitle = styled.p`
    font-size: 1rem;
    text-align: center;
    padding: 1rem 4rem 1rem 4rem;
    border-radius: 25px;
    background: #F0F3F8;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
`