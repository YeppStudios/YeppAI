import SlideBottom from "@/components/Animated/SlideBottom";
import Navbar from "@/components/Landing/Navbar";
import styled from "styled-components";
import Section from '@/components/Landing/Section';
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import Footer from '@/components/Landing/Footer';
import { useEffect, useState } from "react";
import TrialBanner from "@/components/Landing/TrialBanner";
import Head from "next/head";
import Plans from "@/components/Landing/Plans";
import PlanComparison from "@/components/Landing/PlanComparison";

const Pricing = () => {


    const [mobile, setMobile] = useState(false);

    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }, []);
    
    const handleNewsletterScroll = () => {
        const contactSection = document.getElementById("newsletter")!;
        contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    };


  return (
    <>
    <Head>
        <title>Pricing | Asystent AI</title>
        <meta name = "theme-color" content = "#FFFFFF" />
        <meta name="description" content="Subscription plans and offer." />
    </Head>

    <Layout>
      <Navbar />
        <HeroSection>
            <MiniTitle>PLANS & SUBSCRIPTIONS</MiniTitle>
            <SlideBottom>
            <HeroText>Streamline content creation</HeroText>
            </SlideBottom>
            <StartBtnContainer>
            </StartBtnContainer>
        </HeroSection>
        <Plans openRegistration={true} purchase={false} landing={true}/>
        <TrialBanner />
        {/* {!mobile &&
        <PlanComparison />
        } */}
        <Section>
        <div id="newsletter"><LearnMoreSection /></div>
        </Section>
        <Footer/>
    </Layout>
    </>
  );
};


export default Pricing;


const Layout = styled.div`
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
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  margin-top: 18vh; 
  @media (max-width: 1023px) {
    margin-top: 20vh; 
}
`
const HeroText = styled.h1`
    font-size: 6vw;
    font-weight: 700;
    line-height: 1.2;
    margin-top: -0.5rem;
    @media (max-width: 1023px) {
        margin-top: 0.5rem;
        font-size: 2rem;
    }
`

const MiniTitle = styled.p`
    font-size: 1vw;
    width: 100%;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
`


const StartBtnContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
`

