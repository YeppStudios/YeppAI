import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import Section from '@/components/Landing/common/Section';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dashboardVisualization from "../public/images/dashboard_visualization.png"
import happyTeam from "../public/images/happyTeam.png"
import Explainer from '@/components/Landing/Explainer';
import LanguagePopup from '@/components/Landing/LanguagePopup';
import DemoSection from '@/components/Landing/PercentageSection';
import BlueButton from '@/components/Landing/common/BlueButton';
import UnderlineButton from '@/components/Landing/common/UnderlineButton';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import Stats from '@/components/Landing/Stats';

interface SectionWithBackground {
  image: any,
  mobileBackground: any
}

interface CustomColor {
  color: string
}

const PercentageSection = () => {
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
          <meta name = "theme-color" content = "#F6F6FB" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Platforma AI do marketingu. Wykorzystaj firmowe dane, które już posiadasz przez własne AI." />
          <title>Yepp AI | Generate Marketing Content</title>
        </Head>
        <PageContent>
          <Loading />
          <Navbar />
          <HeroSection>
            <Centered><LanguagePopup /></Centered>
            <Centered><h1 style={{lineHeight: "1.3"}} className='text-[9vw] px-4 inline-block lg:text-7xl max-w-6xl font-medium text-gray-800 text-center'>Unlock AI-Powered Marketing</h1></Centered>
              <div className='w-full'>
              <Centered>
              <DescriptionHero color="black">
                Drive company growth and generate more leads with Yepp AI
              </DescriptionHero>
              </Centered>
              <Centered>
              <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
              <Centered><BlueButton href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD">Get an offer</BlueButton></Centered>
              <UnderlineButton onClick={() => router.push("/assets")}>Sign in</UnderlineButton>
            </div>
            <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
              <BlueButton href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD">Get an offer</BlueButton>
              <UnderlineButton onClick={() => router.push("/demo")}>Talk to an expert</UnderlineButton>
            </div>
              </Centered>
              <Centered>
                <Image src={dashboardVisualization}  alt="dashboard" className='w-full mt-10 lg:mt-0'/>
              </Centered>
              </div>
          </HeroSection>
          <GraySection>
            {!mobile && <MiniTitle>The Yepp AI Marketing Intelligence Platform</MiniTitle>}
            <Centered><Subtitle>Accelerate Brand Growth with Your Own Marketing Platform</Subtitle></Centered>
            <Centered><p className='lg:w-1/2 w-11/12 lg:text-lg text-center text-gray-800 mt-8'>Yepp is your individually tailored AI platform, specifically crafted to align with your marketing team&apos;s workflow. It integrates with your team&apos;s unique processes - from content creation to data analysis - propelling your brand&apos;s growth at every customer engagement stage.</p></Centered>
            <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
              <Centered><BlueButton onClick={() => router.push("/platform/what-is-yepp")}>Platform overview</BlueButton></Centered>
              <UnderlineButton onClick={() => router.push("/pricing")}>Explore pricing</UnderlineButton>
            </div>
            <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
              <BlueButton onClick={() => router.push("/platform/what-is-yepp")}>Platform overview</BlueButton>
              <UnderlineButton onClick={() => router.push("/pricing")}>Explore pricing</UnderlineButton>
            </div>
            <Explainer />
          </GraySection>
          <Section>
            <div className='flex justify-between items-center flex-wrap lg:flex-nowrap'>
              <div className='lg:w-[48%] w-full -ml-14 lg:ml-0 pl-3 lg:pl-0'>
                <Image src={happyTeam}  alt="dashboard" className='lg:w-full'/>
              </div>
              <div className='lg:w-[48%] w-full ml-6 lg:ml-0'>
                <p className='text-gray-800 font-medium mt-4 lg:mt-0'>Why Yepp?</p>
                <h2 style={{lineHeight: "1.2"}} className='lg:text-[4vw] text-3xl text-gray-800 font-medium'>More leads.<br /> More engagement.<br /> Better conversion. </h2>
                <p className='w-11/12 lg:w-9/12 lg:text-lg text-gray-800 mt-4 lg:mt-8 mb-6 lg:mb-0'>Facing smaller teams, tighter budgets, and the need for more profit? See how Yepp AI Marketing Intelligence Platform helps you overcome these challenges and spark greater engagement.</p>
                <BlueButton onClick={() => router.push("/platform/what-is-yepp")}>Learn more</BlueButton>
              </div>
            </div>
          </Section>
          <Section>
            <TestimonialsSection />
          </Section>
            <Centered>
            <GraySection>
              <div className='w-full px-[5%] lg:px-[10rem] mt-12'>
                <SlideBottom>
                  <DemoSection />
                </SlideBottom>
              </div>
            </GraySection>
            </Centered>
          <Stats />
          <Footer />
        </PageContent>
      </div>
    )
}

export default PercentageSection;

const PageContent = styled.div`
  width: 100vw;
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #F6F6FB;
`


const HeroSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12.5rem;
  @media (max-width: 1023px) {
    display: flex;
    margin-top: 8rem;
    margin-bottom: 0rem;
  }
`

const DescriptionHero = styled.p<CustomColor>`
    color: ${props => props.color || 'rgb(31 41 55)'};
    font-size: 1.45rem;
    width: 100%;
    text-align: center;
    font-weight: 400;
    margin-top: 4vh;
    @media (max-width: 1023px) {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        width: 95%;
        padding: 0 0.7rem 0 0.7rem;
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


const MiniTitle = styled.p`
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    text-align: center;
    padding: 1rem 4rem 1rem 4rem;
    border-radius: 25px;
    color: rgb(31, 41, 55);
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`

const Subtitle = styled.h1`
    color: rgb(31 41 55);
    font-size: 4vw;
    line-height: 1.25;
    font-family: 'Satoshi', sans-serif;
    font-weight: 500;
    text-align: center;
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

const GraySection = styled.div`
  padding: 12vh 0 14vh 0;
  width: 100%;
  background: #F2F2FB;
  @media (max-width: 1023px) {
      width: 100%:
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding: 8vh 0 10vh 0;
    }
`
