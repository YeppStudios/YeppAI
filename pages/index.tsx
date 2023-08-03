import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import laptopVisualization from "../public/images/visualization-landing.png";
import Section from '@/components/Landing/Section';
import LeftFeature from '@/components/Landing/LeftFeature';
import RightFeature from '@/components/Landing/RightFeature';
import LearnMoreSection from '@/components/Landing/LearnMoreSection';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import { useRouter } from 'next/router';
import { BsFillGiftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import growthIcon from "../public/images/growthIcon.png";
import { TypewriterSection } from '@/components/Landing/TypewriterSection';
import Plans from '@/components/Landing/Plans';
import Space from '@/components/Docs/common/Space';
import HeroSection from '@/components/Landing/HeroSection';
import Stats from '@/components/Landing/Stats';
import uploadingImage from "../public/images/uploading_image.png";
import contentImage from "../public/images/content_image.png";
import seoImage from "../public/images/seo_image.png";
import chatImage from "../public/images/chat_image.png";
import questionmarkIcon from "../public/images/questionmarkIcon.png";
import reviewsImage from "../public/images/reviews_image.png";
import teamIcon from "../public/images/teamIcon.png";
import reviewsImageMobile from "../public/images/reviews_image_mobile.png";

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
          <HeroSection></HeroSection>
          <Stats />
          
          {mobile && <><Space margin="10vh"/><Centered><TestButton id="free-trial-btn"> <BsFillGiftFill className="mr-4"/>Start free trial</TestButton></Centered><Space margin="10vh"/></>}
          
          <Section>
            <Centered>
            <SlideBottom>
            <div id="functionalities"></div>
            <Centered><Icon><Image src={growthIcon} style={{width: "100%"}} alt="icon" /></Icon></Centered>
            <Centered>
            <HeroText>
              Reduce workload and watch your online presence <b className='font-black'>grow.</b>
            </HeroText>
            </Centered>
            <Space margin="5vh"/>
            </SlideBottom>
            </Centered>
            </Section>
            <LeftFeature
                title="Teach AI any relevant informations." 
                image={uploadingImage}
                text="Upload the content and information about your clients, their industry, products etc."
                bulletpoints={["Upload PDF, TXT, PPTX & DOCX files", "Transcribe YouTube content", "Scrape websites"]}
                color="black"
                marginTop='3vh'
            />
            <RightFeature 
                title="Effortlessly generate content." 
                image={contentImage}
                text="Craft unique ads, posts and strategies based on company and industry-specific knowledge."
                bulletpoints={["Generate Google Ads", "Create unique posts and product descriptions", "Engineer growth hacking strategies"]}
                color="black"
            />
            <LeftFeature
                title="Generate SEO articles that ranks." 
                image={seoImage} 
                text="Craft unique ads, posts and strategies based on company and industry-specific knowledge."
                bulletpoints={["Write SEO articles", "Generate insightful blogs", "Craft guides and rankings"]}
                color="black"
                marginTop='3vh'
            />
            <RightFeature 
                title="Access years of wisdom in seconds." 
                image={chatImage}
                text="Craft unique ads, posts and strategies based on company and industry-specific knowledge."
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
             {!mobile && <Space margin='8rem'/>}
             {!mobile &&<Centered><TestButton id="trial-btn" onClick={() => router.push("/register?registration=true&company=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton></Centered>}
            <Centered>{!mobile && <div className='font-medium mt-4'>Claim ~10 000 words or 7 days for free</div>}</Centered>
            <Section>
              <div className='w-full bg-black pt-20 lg:pt-36 overflow-hidden'>
              <Centered><Icon><Image src={questionmarkIcon} style={{width: "100%", filter: "invert(1)"}} alt="icon" /></Icon></Centered>
              <SlideBottom><Centered><HeroText><p className='text-white'>What do marketing agencies say about Yepp?</p></HeroText></Centered></SlideBottom>
              {mobile ? <Image src={reviewsImageMobile} style={{width: "100%"}} alt="reviews" /> : <Image src={reviewsImage} style={{width: "100%"}} alt="reviews" />}
              </div>

          </Section>
          <div id="offer"></div>
          <Section>
          <Centered><Icon><Image src={teamIcon} style={{width: "100%"}} alt="icon" /></Icon></Centered>
          <SlideBottom><Centered><HeroText><b>Empower your team</b> with AI today.</HeroText></Centered></SlideBottom>
          {!mobile && <Space margin='5rem'/>}
          <div className='w-full px-4 sm:px-28'>
          <Plans openRegistration={true} purchase={false} landing={true}/>
          </div>
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
`

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    top: -6rem;
    left: 0;
  `

const TestButton = styled.button`
    font-size: 1.2rem;
    padding: 2vh 5vw 2vh 5vw;
    width: 70vw;
    border: solid 3px transparent;
    border-radius: 15px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: black;
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
      box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
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
    margin-bottom: 0.75rem;
    text-align: center;
    padding: 1rem 4rem 1rem 4rem;
    border-radius: 25px;
    background: #F0F3F8;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`

const FreeTrialBtn = styled.a`
    font-size: 1.2rem;
    padding: 2vh 0 2vh 0;
    width: 80vw;
    border: solid 3px transparent;
    display: flex;
    border-radius: 25px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: white;
    background: black;
    align-items: center;
    background-size: 120%;
    background-position-x: -1rem;
    margin-top: 16vh;
    margin-bottom: 8vh;
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
      box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 5px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    }
    @media (min-width: 1023px) {
      width: 28rem;
      margin-top: 8vh;
      padding: 1.5vh 0vw 1.5vh 0vw;
      margin-left: 1rem;
    }
`

const Icon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: 1.25rem;
`