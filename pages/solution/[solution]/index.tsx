import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import styled from "styled-components";
import placeholderImg from "@/public/images/blueAbstractBg.png";
import Image, { StaticImageData } from "next/image";
import { BsFillGiftFill, BsPlay, BsPlayFill, BsStars } from "react-icons/bs";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import NavigationBar from "@/components/Common/NavigationBar";
import { useRouter } from "next/router";
import SlideBottom from "@/components/Animated/SlideBottom";
import { solutions } from '../../../solutions';
import ErrorPage from "@/pages/404";
import { IconType } from 'react-icons';
import { IoClose } from "react-icons/io5";
interface TutorialOrUseCase {
  icon: IconType;
  title: string;
  description: string;
  image?: string; // Optional because it's not present in the "useCases" items
}

const SolutionPage = () => {

  const router = useRouter();
  const { solution } = router.query;
  const [solutionData, setSolutionData] = useState<Solution>();
  const [mobile, setMobile] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  interface TutorialOrUseCase {
    icon: IconType;
    title: string;
    description: string;
    image?: any;
  }
  
  interface Solution {
    title: any;
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
          setSolutionData(currentSolution);
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
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="AI Marketing Platform."
          />
         <title>Yepp AI | {solutionData.title}</title>
        </Head>
        {isModalOpen && 
            <div className="top-0 fixed w-full z-50 h-full bg-black bg-opacity-60 flex justify-center items-center cursor-pointer" onClick={handleCloseModal}>
              <VideoModal className="w-[95svw] lg:w-[80svw] aspect-video group relative cursor-auto" onClick={(e) => e.stopPropagation()}>
              <iframe width="900" height="1600" className="w-full h-full" allowFullScreen
                src={`${solutionData.video}`}>
              </iframe>
                <button className="absolute hidden group-hover:flex top-2 right-2 bg-black bg-opacity-60 text-white rounded-full cursor-pointer w-10 h-10 justify-center items-center" onClick={handleCloseModal}><IoClose className="w-1/2 h-1/2"/></button>
              </VideoModal>
            </div>
        }
        <Navbar />
        <div className="lg:mt-[6rem] mt-[7rem] z-20" />
        <section className="relative w-full">
          <div className="lg:h-[80vh] h-[60vh] relative w-full">
          <div className="z-10 w-full h-full bg-black bg-opacity-20 absolute flex pb-[20rem] lg:pb-28 justify-center items-center">
              <button onClick={() => setModalOpen(true)} className="text-white backdrop-blur-sm bg-blue-900 shadow-lg bg-opacity-30 p-2 lg:p-4 rounded-full cursor-pointer hover:scale-105 transition ease-in-out">
                <BsPlayFill className="h-8 w-8 lg:h-12 lg:w-12 opacity-1" />
              </button>
            </div>
            <Image src={solutionData.image} alt="chat with your data image" style={{width: "100%"}} width={3000} height={900} />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-white z-20 flex flex-col gap-12 px-12 lg:px-16 shadow-[0px_-20px_20px_40px_#fff] shadow-white ">
          <SlideBottom>
            <div className="lg:grid lg:grid-cols-2 flex flex-col w-full border-b border-[#e5e5e5] pb-6">
              <SectionTitle className="lg:text-3xl text-[8vw] lg:pb-0  pb-[15vh]">
                {solutionData.title}
              </SectionTitle>
              <div className="lg:gap-8 gap-4 h-12 flex flex-col lg:flex-row py-8 lg:p-0 justify-end mt-6 lg:mt-0">
                <TestButton className="start-free-trial-landing">
                  <BsFillGiftFill />
                  <TestText>Start free trial</TestText>
                </TestButton>
                <DemoBtn href="https://calendly.com/yeppai/yepp-introduction-call">Book free demo</DemoBtn>
              </div>
              {!mobile &&
              <div className="flex items-center lg:justify-start  justify-center  mb-6 text-center">
                <p className="text-xl mt-4 lg:pl-1 text-center lg:text-start  ">
                {solutionData.description}
                </p>
              </div>
              }
            </div>
            </SlideBottom>
          </div>
        </section>
        <PageContent>
          <section className=" h-full lg:border-t-2 bg-white lg:border-[#e5e5e5] p-4 relative lg:px-24 px-4">
            <div className="flex mt-[5vh] h-full w-full">
  
              {/* {!mobile && (
                // Adjust bar with dots and tiles with icons
                <div className="h-[158vh] mt-36 rounded-full w-2 bg-black overflow-visible relative">
                  <div className="w-6 h-6 rounded-full absolute top-0 bg-black -translate-x-[50%] ml-[.1rem]" />
                  <div className="w-6 h-6 rounded-full absolute top-[47%] bg-black -translate-x-[50%] ml-[.1rem]" />
                  <div className="w-6 h-6 rounded-full absolute bottom-0 bg-black -translate-x-[50%] ml-[.1rem]" />
                </div>
              )} */}
  
              <div className="flex flex-col lg:pt-12 pt-8 lg:gap-[20vh] gap-[12vh]">
              {solutionData.tutorial.map((tutorial, index) => (
              <div className="grid lg:grid-cols-2 items-center justify-center flex-col" key={index}>
                <SlideBottom>
                  <div className="flex flex-col gap-[6vw] lg:gap-6 lg:w-[80%] w-full lg:p-0">
                    <div className="flex flex-col lg:gap-3 lg:items-start items-center gap-4 text-center lg:text-left justify-center lg:justify-start ">
                      <tutorial.icon className="w-10 h-10"/>
                      <SectionSubtitle>{index +1}. {tutorial.title}</SectionSubtitle>
                    </div>
                    <p className="lg:text-[1.3vw] text-center lg:text-start text-[4vw] pb-8">
                      {tutorial.description}
                    </p>
                  </div>
                </SlideBottom>
                <SlideBottom>
                  <div className="relative lg:w-full border-4 border-black w-full aspect-video flex items-center justify-center  rounded-3xl  overflow-x-hidden ">
                    <Image src={tutorial.image} alt={tutorial.title} fill />
                  </div>
                </SlideBottom>
              </div>
            ))}
              </div>
            </div>
          </section>
          <section className="mt-24 lg:px-24 px-6">
              <div className="flex w-full pb-8 border-b-2 lg:mb-14 mb-12">
                <SectionTitle className="lg:text-[3.5vw]  text-4xl">Use cases</SectionTitle>
              </div>
              <div className="grid gap-16 lg:grid-cols-2 grid-cols-1 ">
                {solutionData.useCases.map((useCase, index) => (
                  <SlideBottom key={index}>
                    <div className="flex flex-col gap-2 pb-2 lg:w-10/12 w-full">
                      <useCase.icon className="w-10 h-10"/>
                      <SectionSubtitle className="lg:text-[3vw] text-[5vw]">{useCase.title}</SectionSubtitle>
                      <p className="pr-6 lg:text-lg text-[4vw]">{useCase.description}</p>
                    </div>
                  </SlideBottom>
                ))}
              </div>
            </section>
            <section className="mt-28 lg:mb-36 mb-28 lg:px-24 px-6">
              <div className="flex w-full pb-8 border-b-2 lg:mb-16 mb-12">
                <SectionTitle>Other solutions</SectionTitle>
              </div>
              <div className="grid lg:grid-cols-3 gap-10 grid-cols-1">
                {solutions.map((solution, index) => (
                  <div key={index} onClick={() => router.push(`/solution/${solution.query}`)}>
                    <SlideBottom>
                      <SolutionTemplate className="aspect-video scale-105 border-[#e5e5e5] hover:scale-110 transition-all ease-in-out">
                      <Image src={solution.miniThumbnail || placeholderImg} fill alt={solution.title} className="rounded-2xl"/>
                      </SolutionTemplate>
                    </SlideBottom>
                    <SlideBottom>           
                    <div className="relative w-full py-3 rounded-2xl overflow-hidden  ">
                        <CardTitle>{solution.title}</CardTitle>
                        <CardText>
                          {solution.description}
                        </CardText>
                    </div>
                    </SlideBottom>   
                  </div>
                ))}
              </div>
            </section>
  
          <div className="px-5"><LearnMoreSection /></div>
          <div className="pb-0" />
          <Footer />
        </PageContent>
      </>
    );
  }
}

export default SolutionPage;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  cursor: pointer;
`;

const CardTitle = styled.h4`
  padding-top: 12px;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  @media (max-width: 1023px) {
    font-size: 1.5rem;
    margin-top: 0.45rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: left;
  @media (max-width: 1023px) {
    text-align: center;
    font-size: 2.25rem /* 36px */;
    line-height: 2.5rem /* 40px */;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 7vw;
    line-height: 2.25rem;
  }
`;

const PageContent = styled.div`
  position: relative;
  height: 100%;
  background: white;
  width: 100%;
`;

const TestText = styled.p`
  margin-left: 1vw;
  @media (max-width: 1023px) {
    margin-left: 3vw;
  }
`;

const DemoBtn = styled.a`
  font-weight: 700;
  padding: 0.75rem 2.7rem 0.75rem 2.7rem;
  text-align: center;
  border: 2px solid black;
  border-radius: 25px;
  border: solid 3px transparent;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: none;
    transform: scale(0.95);
  }
  @media (max-width: 1023px) {
    padding: 1.3vh 7vw 1.3vh 7vw;
    font-size: 0.9rem;
  }
`;

const TestButton = styled.button`
  padding: 0.75rem 2.7rem 0.75rem 2.7rem;
  border: solid 3px transparent;
  border-radius: 25px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  align-items: center;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 120%;
  background-position-x: -1rem;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  &:hover {
      box-shadow: none;
      transform: scale(0.95);
  }
  @media (max-width: 1023px) {
      padding: 1.3vh 7vw 1.3vh 7vw;
      font-size: 0.9rem;
  }
`;


const SolutionTemplate = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 25px;
  cursor: pointer;
  box-shadow(0 6px 32px 0 rgba(31, 38, 135, 0.3);
  transition: all 0.3s ease;
`

const VideoModal = styled.div`
cursor: auto;
position: relative;
`;



