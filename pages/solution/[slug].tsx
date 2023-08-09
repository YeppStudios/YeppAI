import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import styled from "styled-components";
import placeholderImg from "@/public/images/blueAbstractBg.png";
import Image from "next/image";
import { BsFillGiftFill, BsStars } from "react-icons/bs";
import { AiOutlineCloudUpload, AiOutlineUserAdd } from "react-icons/ai";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import NavigationBar from "@/components/Common/NavigationBar";

const SolutionPage = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (typeof window !== undefined) {
      const handleResize = () => {
        if (window.innerWidth >= 1023) {
          setMobile(false);
        } else setMobile(true);
      };
      // Add event listener to listen for window resize
      window.addEventListener("resize", handleResize);
      // Cleanup the event listener when the component is unmounted

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  console.log(mobile);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Possibly to chabge */}
        <meta
          name="description"
          content="Platforma AI do marketingu. Wykorzystaj firmowe dane, które już posiadasz przez własne AI."
        />
        <title>Yepp AI | Solution</title>
      </Head>
      {/* <Navbar onNewsletterClick={() => console.log("NewsletterClick")} /> */}
      <div className="mt-[6rem] " />

      <section className="relative  lg:mb-24 mb-56">
        <div className="h-[80vh]  relative ">
          <Image src={placeholderImg} alt="chat with your data image" fill />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[25%]   bg-white z-20 flex flex-col gap-12 px-12 pt-12  shadow-[0px_-40px_40px_50px_#fff] shadow-white ">
          <div className="lg:grid lg:grid-cols-2 flex flex-col w-full   ">
            <SectionTitle className=" lg:text-[4vw] text-[8vw] lg:pb-0 lg:text-start text-center pb-[15vh]">
              Chat with your data
            </SectionTitle>
            <div className=" gap-8 h-12 flex flex-col lg:flex-row py-8 lg:p-0 justify-end mt-6 lg:mt-0">
              <TestButton className="start-free-trial-landing ">
                <BsFillGiftFill />
                <TestText>Start free trial</TestText>
              </TestButton>
              <PricingButton>Request the pricing</PricingButton>
            </div>
            <div className="flex items-center lg:justify-start  justify-center  mb-6 text-center">
              <p className="text-xl mt-4 lg:pl-2 text-center lg:text-start  ">
                Unleash the full potential of AI and chat with your data.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PageContent className="lg:px-12 px-4">
        <section className=" h-full lg:border-t-2  lg:border-slate-300  lg:p-8 p-4 relative">
          <div className="flex mt-[10vh] h-full w-full ">
            {!mobile && (
              // Adjust bar with dots and tiles with icons

              <div className="h-[158vh] mt-36 rounded-full w-2 bg-black overflow-visible relative">
                <div className="w-6 h-6 rounded-full absolute top-0 bg-black -translate-x-[50%] ml-[.1rem]" />
                <div className="w-6 h-6 rounded-full absolute top-[47%] bg-black -translate-x-[50%] ml-[.1rem]" />
                <div className="w-6 h-6 rounded-full absolute bottom-0 bg-black -translate-x-[50%] ml-[.1rem]" />
              </div>
            )}

            <div className="flex flex-col lg:pt-12 pt-8 lg:gap-[9vw] gap-[12vh]">
              <div className="flex lg:flex-row items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-12 lg:w-1/2 w-full lg:p-[5vw]">
                  <div className="flex flex-col lg:gap-8  lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-10 w-10" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl ">
                      1.Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.3vw] text-center lg:text-start  text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative  lg:w-1/2 w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
              <div className="flex lg:flex-row items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-12 lg:w-1/2 w-full lg:p-[5vw]">
                  <div className="flex flex-col lg:gap-8  lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineUserAdd className="h-10 w-10" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl ">
                      2.Define a new AI assistant
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.5vw] text-center lg:text-start  text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative  lg:w-1/2 w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
              <div className="flex lg:flex-row items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-12 lg:w-1/2 w-full lg:p-[5vw]">
                  <div className="flex flex-col lg:gap-8  lg:items-start items-center gap-4 justify-center ">
                    <BsStars className="h-10 w-10" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl ">
                      3.Chat with your assistant
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.5vw] text-center lg:text-start  text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative  lg:w-1/2 w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-24">
          <div className="flex w-full pb-8 border-b-2 lg:mb-24 mb-12">
            <SectionTitle className="lg:text-[3.5vw]  text-4xl">
              Use cases
            </SectionTitle>
          </div>
          <div className="grid gap-16 lg:grid-cols-2 grid-cols-1 ">
            {/* Adjust titles and icons */}
            <div px-12v className="flex flex-col gap-8 pb-[5vw] lg:px-16 px-4">
              <AiOutlineCloudUpload className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw]  text-[5vw]">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw]  text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
            <div className="flex flex-col gap-8 pb-[5vw] lg:px-16 px-4">
              <AiOutlineCloudUpload className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw]  text-3xl">
                Client encyclopedia
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw]   text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers.
              </p>
            </div>
            <div className="flex flex-col gap-8 pb-[5vw] lg:px-16 px-4">
              <BsStars className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw]  text-3xl">
                Niche expert
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw]   text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
          </div>
        </section>
        <section className="mt-24 lg:mb-60 mb-28">
          {/* Adjust titles and icons */}

          <div className="flex w-full pb-8 border-b-2 lg:mb-24 mb-12">
            <SectionTitle>Other solutions</SectionTitle>
          </div>
          <div className="grid  lg:grid-cols-3 gap-8 grid-cols-1">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full lg:h-[55%] h-[30%] bg-white  z-20 flex flex-col lg:justify-start justify-center lg:px-[1.2vw] px-4 ">
                <CardTitle>Copywriting</CardTitle>
                {!mobile && (
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity
                  </CardText>
                )}
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full lg:h-[55%] h-[30%] bg-white  z-20 flex flex-col lg:justify-start justify-center lg:px-[1.2vw]  px-4 ">
                <CardTitle>Marketing campaigns</CardTitle>
                {!mobile && (
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity
                  </CardText>
                )}
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full lg:h-[55%] h-[30%] bg-white  z-20 flex flex-col lg:justify-start justify-center lg:px-[1.2vw] px-4 ">
                <CardTitle>Uploading content</CardTitle>
                {!mobile && (
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity
                  </CardText>
                )}
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full lg:h-[55%] h-[30%] bg-white  z-20 flex flex-col lg:justify-start justify-center lg:px-[1.2vw]  px-4 ">
                <CardTitle>Prompt browser</CardTitle>
                {!mobile && (
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity
                  </CardText>
                )}
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full lg:h-[55%] h-[30%] bg-white  z-20 flex flex-col lg:justify-start justify-center lg:px-[1.2vw]  px-4 ">
                <CardTitle>Marketing Templates</CardTitle>
                {!mobile && (
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity
                  </CardText>
                )}
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
          </div>
        </section>
        <LearnMoreSection />
        <div className="pb-48" />
      </PageContent>

      {/* <Footer /> */}
    </>
  );
};

const CardText = styled.p`
  padding-top: 0.3vw;
  font-size: 1vw;
  font-weight: 500;
`;

const CardTitle = styled.h4`
  padding-top: 12px;
  font-size: 1.8vw;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 5vw;
    line-height: 2.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5vw;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 2.25rem /* 36px */;
    line-height: 2.5rem /* 40px */;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: 2.8vw;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 7vw;
    line-height: 2.25rem;
  }
`;

const PageContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const TestText = styled.p`
  margin-left: 1vw;
  @media (max-width: 1023px) {
    margin-left: 3vw;
  }
`;

const PricingButton = styled.div`
  font-family: "Satoshi", sans-serif;
  font-weight: 500;
  padding: 0.75rem 2.7rem 0.75rem 2.7rem;
  text-align: center;
  border: 2px solid black;
  border-radius: 0.75rem;
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
  border: solid 2px black;
  border-radius: 0.75rem;

  align-items: center;
  background-color: black;
  background-size: 120%;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Satoshi", sans-serif;
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
export default SolutionPage;
