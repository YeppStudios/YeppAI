import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import Section from '@/components/Landing/Section';
import LeftFeature from '@/components/Landing/LeftFeature';
import RightFeature from '@/components/Landing/RightFeature';
import LearnMoreSection from '@/components/Landing/LearnMoreSection';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import { useRouter } from 'next/router';
import { BsFillGiftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import webBackground from "../public/images/webBackground.png";
import Plans from '@/components/Landing/Plans';
import Space from '@/components/Docs/common/Space';
import Stats from '@/components/Landing/Stats';
import reviewsImage from "../public/images/reviews_image.png";
import reviewsImageMobile from "../public/images/reviews_image_mobile.png";
import questionmarkIcon from "../public/images/questionmark_icon.png";
import OnboardingTab from '@/components/Landing/OnboardingTab';
import { TypewriterSection } from '@/components/Landing/TypewriterSection';

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
 
  useEffect(() => {
    if (window.innerWidth > 1023) { 
      setMobile(false);
    }
    const updateWindowSize = () => {
      setMobile(window.innerWidth < 1023);
    };
    window.addEventListener("resize", updateWindowSize);
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
          <Navbar />
          <Background>
            {!mobile && <Image style={{ width: "100%", opacity: 0.4}} src={webBackground} alt={'preview'}></Image>}
          </Background>
          <HeroSection>
              <Centered><SlideBottom><h1 style={{lineHeight: "1.3"}} className='text-[9vw] px-4 inline-block lg:text-7xl max-w-5xl font-black text-center'>Marketing content based {!mobile && <br />}on your {!mobile && <TypewriterSection />}</h1></SlideBottom></Centered>
              <h1 style={{lineHeight: "1.3"}} className='text-[8vw] px-4 inline-block lg:text-7xl max-w-5xl font-black text-center'>{mobile && <Centered><TypewriterSection/></Centered>}</h1>
              <div>
                <Centered>
              <DescriptionHero color="black">
                Best AI marketing platform for quality content
              </DescriptionHero>
              </Centered>
              <Centered>
                {mobile ?
                  <TestButton id="trial-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                  :
                  <TestButton id="trial-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                }
              </Centered>
              <Centered>{!mobile && <div className='text-base mt-4 text-center font-medium'>7 days for free with up to 10 000 words <br /></div>}</Centered>
              <Centered>
              <LoginButton className="login-btn-landing" onClick={() => router.push("/marketing")}>Log in</LoginButton>
              </Centered>
              </div>
          </HeroSection>
          <Section>
          <OnboardingTab />
          </Section>
          {/* <SlideBottom>
          <Section>
            <Explainer />
          </Section>
          </SlideBottom>
             {!mobile &&<Centered><TestButton id="trial-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton></Centered>}
             <Centered>{!mobile && <div className='text-base mt-4 text-center font-medium'>7 days for free with up to 10 000 words<br /></div>}</Centered> */}
          <Section>
            <Stats />
          </Section>

          <Section>
            <Centered>
            <SlideBottom>
            <div id="functionalities"></div>
            {!mobile &&
              <div>
                <Centered><MiniTitle>YEPP AI WILL HELP YOU</MiniTitle></Centered>
                <Centered>
                <Subtitle>
                Effortlessly craft content and <ColorfulText><b className='font-black'>boost</b></ColorfulText> your online presence.
                </Subtitle>
                </Centered>
              </div>
            }
            <Space margin="5vh"/>
            </SlideBottom>
            </Centered>
            </Section>
            <LeftFeature
                title="Add context about you and your clients." 
                gif="/videos/uploading.gif" 
                text="Upload the content and information about your clients, their industry, products etc."
                bulletpoints={["PDF, TXT, PPTX, CSV & DOCX files", "Websites and social media", "YouTube audio"]}
                color="black"
                marginTop='3vh'
                link="/solution/assets-upload"
            />
            <RightFeature 
                title="Effortlessly generate catchy content." 
                gif="/videos/marketer.gif"
                text="Make use of intuitive templates and craft engaging content with ease."
                bulletpoints={["Social media content", "Product descriptions", "Converting Ads"]}
                color="black"
                link="/solution/marketing-templates"
            />
            <LeftFeature
                title="Create high-performing SEO content." 
                gif="/videos/copywriter.gif" 
                text="Watch AI write the entire piece inspired by highly ranked articles and your uploaded assets."
                bulletpoints={["SEO articles", "Insightful blogs", "Guides and rankings"]}
                color="black"
                marginTop='3vh'
                link="/solution/copywriting"

            />
            <RightFeature 
                title="Chat with your uploaded assets." 
                gif="/videos/dataAssistant.gif"
                text="Cooperate with uploaded files and websites in order to gain ideas and advice in seconds."
                bulletpoints={["Files", "Websites", "Reports"]}
                color="black"
                link="/solution/chat"
            />
            <LeftFeature 
                title="Generate content campaigns at once." 
                gif="/videos/campaigns.gif" 
                text="Choose desired placements and let AI create the entire content campaign for you."
                bulletpoints={[ "Social media", "Marketing emails", "Headlines & descriptions"]}
                color="black"
                marginTop='3vh'
                link="/solution/campaigns"
            />
          <Section>
              <div className='w-full bg-black pt-20 lg:pt-36 overflow-hidden'>
              <Centered><Icon><Image src={questionmarkIcon} style={{width: "100%"}} alt="icon" /></Icon></Centered>
              <SlideBottom><Centered><Subtitle><p className='text-white'>What do marketing agencies say about Yepp?</p></Subtitle></Centered></SlideBottom>
              {mobile ? <Image src={reviewsImageMobile} style={{width: "100%"}} alt="reviews" /> : <Image src={reviewsImage} style={{width: "100%"}} alt="reviews" />}
              </div>
          </Section>
          <Section>
          <Centered><MiniTitle>PLANS & SUBSCRIPTIONS</MiniTitle></Centered>
          <SlideBottom><Centered><Subtitle>Empower your {mobile && <br />}team <ColorfulText>with AI</ColorfulText></Subtitle></Centered></SlideBottom>
          {!mobile && <Space margin='5rem'/>}
          <div className='px-[5vw] lg:px-[8vw]'><Plans openRegistration={true} purchase={false} landing={true}/></div>
          </Section>
          <Centered><FreeConsultationBtn href='https://calendly.com/yeppai/yepp-introduction-call'>Book a <ColorfulText>free demo</ColorfulText></FreeConsultationBtn></Centered>
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
  margin-top: 14rem;
  margin-bottom: 4rem;
  @media (max-width: 1023px) {
    display: flex;
    margin-top: 8rem;
    margin-bottom: 0rem;
  }
`

const DescriptionHero = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    font-weight: 500;
    margin-top: 8vh;
    @media (max-width: 1023px) {
        margin-top: 1.5rem;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        width: 85%;
        padding: 0 0.7rem 0 0.7rem;
    }
`


const LoginButton = styled.button`
    font-size: 1rem;
    margin-top: 3vh;
    padding: 2vh 5vw 2vh 5vw;
    width: 70vw;
    border: solid 3px transparent;
    border-radius: 25px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: white;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.13), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    align-items: center;
    background-size: 120%;
    background-position-x: -0.5rem;
    transition: all 0.3s ease;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    color: black;
    font-weight: 700;
    @media (min-width: 1023px) {
      display: none;
      font-size: 1.2em;
    }
`

const TestButton = styled.button`
    font-size: 1rem;
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
      font-size: 1.2rem;
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
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    text-align: center;
    padding: 1rem 4rem 1rem 4rem;
    border-radius: 25px;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`

const FreeConsultationBtn = styled.a`
    font-size: 1.2rem;
    padding: 2vh 0 2vh 0;
    width: 80vw;
    border: solid 3px transparent;
    display: flex;
    border-radius: 25px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: #F0F3F8;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.13), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    align-items: center;
    background-size: 120%;
    background-position-x: -1rem;
    margin-top: 16vh;
    display: none;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: block;
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
      margin-left: 1rem;
    }
`
const Icon = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1.25rem;
`
const Subtitle = styled.h1`
    color: black;
    font-size: 4vw;
    line-height: 1.25;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    text-align: center;
    margin-top: 2vh;
    width: 65%;
    @media (max-width: 1023px) {
        margin-top: 0;
        line-height: auto;
        font-size: 2rem;
        line-height: 1.3;
        width: 90vw;
        text-align: center;
    }
`