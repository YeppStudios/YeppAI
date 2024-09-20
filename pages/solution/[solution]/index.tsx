import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import styled from "styled-components";
import placeholderImg from "@/public/images/blueAbstractBg.png";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import { useRouter } from "next/router";
import dashbaordVisualization from "@/public/images/dashboard_visualization.png";
import { solutions } from '../../../solutions';
import { IconType } from 'react-icons';
import { IoClose } from "react-icons/io5";
import GraySection from "@/components/Landing/common/GraySection";
import Subtitle from "@/components/Landing/common/Subtitle";
import Centered from "@/components/Centered";
import MainTitle from "@/components/Landing/common/MainTitle";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import BlueButton from "@/components/Landing/common/BlueButton";
import UnderlineButton from "@/components/Landing/common/UnderlineButton";
import Stats from "@/components/Landing/Stats";
import Section from "@/components/Landing/common/Section";

const breakpointColumnsObj = {
  default: 3,
  1250: 2,
  770: 1,
};


const SolutionPage = () => {

  const router = useRouter();
  const { solution } = router.query;
  const [solutionData, setSolutionData] = useState<Solution>();
  const [mobile, setMobile] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  interface TutorialOrUseCase {
    icon: IconType;
    title: string;
    description: string;
    image?: any;
  }
  
  interface Solution {
    title: string;
    mainTitle: string;
    icon: any;
    mainImage : any;
    imageSections: any[];
    overview: object[];
    description: string;
    video: string;
    image: any;
    tutorial: TutorialOrUseCase[];
    useCases: Omit<TutorialOrUseCase, 'image'>[];
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth >= 1023) {
        setMobile(false);
      } else setMobile(true);
    }
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    if (solution) {
      solutions.forEach((currentSolution) => {
        if (currentSolution.query === solution) { 
          setSolutionData(currentSolution as any);
          return;
        }
      });
    }

  }, [solution]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
}, [isModalOpen]);


  if (solutionData) {
    return (
      <>
        <Head>
          <meta name="theme-color" content="#F6F6FB" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content={solutionData.title}
          />
         <title>Yepp AI | {solutionData.mainTitle}</title>
        </Head>
          <Navbar />
            <div className="mt-[6rem] lg:mt-[10rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="lg:w-11/12 flex justify-center flex-wrap">
                <Centered>
                <div className="flex gap-3 lg:gap-4 items-center mb-4">
                  {solutionData.icon && <solutionData.icon className="h-4 w-4 lg:h-6 lg:w-6" />}
                  <MiniTitle>{solutionData.title}</MiniTitle>
                </div>
                </Centered>
                <div className="w-full lg:w-8/12"><MainTitle>{solutionData.mainTitle}</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">{solutionData.description}</div>
                <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
                  <Centered><BlueButton href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD">Get an offer</BlueButton></Centered>
                  <UnderlineButton onClick={() => router.push("/pricing")}>See pricing</UnderlineButton>
                </div>
                <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
                  <BlueButton href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD">Get an offer</BlueButton>
                  <UnderlineButton onClick={() => router.push("/pricing")}>See pricing</UnderlineButton>
                </div>
            </div>
            </Centered>
            </div>
            <Centered>
                <Image src={solutionData.mainImage}  alt="dashboard" className='w-full mt-10 lg:mt-0'/>
            </Centered>
            {solutionData.imageSections &&
            <GraySection>
            <div className="w-full flex justify-center flex-wrap px-[5%] lg:px-[10rem]">
                <Subtitle>How {solutionData.title} can help you achieve more?</Subtitle>
                <div className="mt-36 w-full">
                <div className="mt-10 w-full flex flex-wrap lg:flex-nowrap lg:flex-row flex-cols-reverse items-center justify-between gap-10 lg:gap-28">
                  <div className="lg:w-1/2 w-full">
                    <h2 className="text-3xl font-medium">{solutionData.imageSections[0].title}</h2>
                    <p className="text-lg mt-6">{solutionData.imageSections[0].description}</p>
                  </div>
                  <div className="lg:w-4/12 w-full">
                    <AttributeBackground background={solutionData.imageSections[0].imageURL} />
                  </div>
                </div>
                {solutionData.imageSections[1] &&
                <div className="mt-48 w-full flex flex-wrap lg:flex-nowrap lg:flex-row flex-col-reverse items-center justify-between gap-10 lg:gap-28">
                  <div className="lg:w-4/12 w-full">
                    <AttributeBackground background={solutionData.imageSections[1].imageURL} />
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <h2 className="text-3xl font-medium">{solutionData.imageSections[1].title}</h2>
                    <p className="text-lg mt-6">{solutionData.imageSections[1].description}</p>
                  </div>
                </div>
                }
                </div>
            </div>
            </GraySection>
            }
            <Section>
              <Centered><Subtitle>{solutionData.title}: Quick Overview</Subtitle></Centered>
              <ExamplesContainer
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName={MasonryColumn}
                style={{ marginTop: "0rem" }}
              >
                {solutionData.overview.map((overviewItem: any) => {
                  return (
                    <Example key={overviewItem.title} className="w-full shadow">
                      <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">{overviewItem.title}</div>
                      <p className="mt-4">{overviewItem.description}</p>
                    </Example>
                  )
                })}
              </ExamplesContainer>
            </Section>
            <Section>
            <Stats />
            </Section>
            <Footer />
      </>
    );
  }
}

export default SolutionPage;


const AttributeBackground = styled.img<{background: string}>`
  height: 60vh;
  width: 80vw;
  background-image: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
  @media (max-width: 1023px) {
    width: 100vw;
    height: 100vw;
    }
`


const ExamplesContainer = styled(Masonry)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 4rem 10rem 3rem 10rem;
    @media (max-width: 1023px) {
    padding: 0vh 0 2vh 0vw;
    width: 100vw;
    }
`

const MasonryColumn = styled.div`
  background-clip: padding-box;
`;


const Example = styled.div`
    width: calc(100% - 1.4rem);
    background: #F6F6FB;
    margin: 1.4rem 0rem 1.4rem 0.75rem;
    border-radius: 20px;
    padding: 2rem 2.4rem 2rem 2.4rem;
`