import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import styled from "styled-components";
import placeholderImg from "@/public/images/blueAbstractBg.png";
import Image from "next/image";
import { BsFillGiftFill } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";

const SolutionPage = () => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1023) {
      setMobile(false);
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
    }
  }, []);

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
      <Navbar />
      <div className="mt-[6rem] " />

      <section className="relative  lg:mb-24 mb-56">
        <div className="h-[80vh]  relative ">
          <Image src={placeholderImg} alt="chat with your data image" fill />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[25%]   bg-white z-20 flex flex-col gap-12 px-12 pt-12  shadow-[0px_-40px_40px_50px_#fff] shadow-white ">
          <div className="lg:grid lg:grid-cols-2 flex flex-col w-full   ">
            <SectionTitle className=" lg:text-[4vw] text-[8vw] lg:pb-12 lg:text-start text-center pb-24">
              Chat with your data
            </SectionTitle>
            <div className=" gap-8 h-12 flex flex-col lg:flex-row p-8 lg:p-0 justify-end mt-6 lg:mt-0">
              <TestButton className="start-free-trial-landing">
                <BsFillGiftFill />
                <TestText>Start free trial</TestText>
              </TestButton>
              <button className="bg-white border-2 border-black rounded-xl  px-12 py-1">
                Request the pricing
              </button>
            </div>
            <div className="flex items-center lg:justify-start justify-center  mb-6 text-center">
              <p className="text-xl mt-4 pl-2 text-center lg:text-start  ">
                Unleash the full potential of AI and chat with your data.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PageContent className="p-12">
        <section className=" h-full border-t-2  border-slate-300  p-8 relative">
          <div className="flex h-full w-full ">
            {!mobile && (
              // Adjust bar with dots and tiles with icons

              <div className="h-[151vh] mt-24 rounded-full w-4 bg-black overflow-visible relative">
                <div className="w-6 h-6 rounded-full absolute top-0 bg-black -translate-x-[50%] ml-[.2rem]" />
                <div className="w-6 h-6 rounded-full absolute top-[49%] bg-black -translate-x-[50%] ml-[.2rem]" />
                <div className="w-6 h-6 rounded-full absolute bottom-0 bg-black -translate-x-[50%] ml-[.2rem]" />
              </div>
            )}

            <div className="flex flex-col  gap-[18vh]">
              <div className="flex lg:flex-row items-center justify-center flex-col">
                <div className="flex flex-col gap-6 lg:w-1/2 w-full lg:p-24">
                  <div className="flex lg:flex-col flex-row  lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-8 w-8" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl pl-1">
                      1.Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.5vw] md:text-2xl text-xl py-8">
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
                <div className="flex flex-col gap-6 lg:w-1/2 w-full lg:p-24">
                  <div className="flex lg:flex-col flex-row  lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-8 w-8" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl pl-1">
                      1.Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.5vw] md:text-2xl text-xl py-8">
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
                <div className="flex flex-col gap-6 lg:w-1/2 w-full lg:p-24">
                  <div className="flex lg:flex-col flex-row  lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-8 w-8" />
                    <SectionSubtitle className="lg:text-[3.5vw]  text-4xl pl-1">
                      1.Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.5vw] md:text-2xl text-xl py-8">
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
          <div className="flex w-full pb-8 border-b-2 mb-24">
            <SectionTitle className="lg:text-[3.5vw]  text-4xl">
              Use cases
            </SectionTitle>
          </div>
          <div className="grid gap-16 md:grid-cols-2 grid-cols-1 ">
            {/* Adjust titles and icons */}
            <div px-12v className="flex flex-col gap-8 pb-[5vw] px-16">
              <AiOutlineCloudUpload className="h-8 w-8" />
              <SectionSubtitle className="lg:text-[3vw]  text-3xl">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw] md:text-2xl text-xl">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
            <div className="flex flex-col gap-8 pb-[5vw] px-16">
              <AiOutlineCloudUpload className="h-8 w-8" />
              <SectionSubtitle className="lg:text-[3vw]  text-3xl">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw] md:text-2xl text-xl">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
            <div className="flex flex-col gap-8 pb-[5vw] px-16">
              <AiOutlineCloudUpload className="h-8 w-8" />
              <SectionSubtitle className="lg:text-[3vw]  text-3xl">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-[1.5vw] md:text-2xl text-xl">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
          </div>
        </section>
        <section className="mt-24 mb-60">
          {/* Adjust titles and icons */}

          <div className="flex w-full pb-8 border-b-2 mb-24">
            <SectionTitle>Other solutions</SectionTitle>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 grid-cols-1">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white gap-3 z-20 flex flex-col p-6 ">
                <CardTitle className="text-2xl">Marketing campaigns</CardTitle>
                <CardText>
                  Our comunity is full of proliftic developers, creative
                  builders, and fantastic teachers. Check out YouTube tutorials
                  for great tutorials from folks in the comunity, and Gallery
                  for a list of awesome LangChain projects, compiled by the
                  folks
                </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white gap-3 z-20 flex flex-col p-6 ">
                <CardTitle className="text-2xl">Marketing campaigns</CardTitle>
                <CardText>
                  Our comunity is full of proliftic developers, creative
                  builders, and fantastic teachers. Check out YouTube tutorials
                  for great tutorials from folks in the comunity, and Gallery
                  for a list of awesome LangChain projects, compiled by the
                  folks
                </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white gap-3 z-20 flex flex-col p-6 ">
                <CardTitle className="text-2xl">Marketing campaigns</CardTitle>
                <CardText>
                  Our comunity is full of proliftic developers, creative
                  builders, and fantastic teachers. Check out YouTube tutorials
                  for great tutorials from folks in the comunity, and Gallery
                  for a list of awesome LangChain projects, compiled by the
                  folks
                </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white gap-3 z-20 flex flex-col p-6 ">
                <CardTitle className="text-2xl">Marketing campaigns</CardTitle>
                <CardText>
                  Our comunity is full of proliftic developers, creative
                  builders, and fantastic teachers. Check out YouTube tutorials
                  for great tutorials from folks in the comunity, and Gallery
                  for a list of awesome LangChain projects, compiled by the
                  folks
                </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
                className="opacity-70"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black z-10">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white gap-3 z-20 flex flex-col p-6 ">
                <CardTitle className="text-2xl">Marketing campaigns</CardTitle>
                <CardText>
                  Our comunity is full of proliftic developers, creative
                  builders, and fantastic teachers. Check out YouTube tutorials
                  for great tutorials from folks in the comunity, and Gallery
                  for a list of awesome LangChain projects, compiled by the
                  folks
                </CardText>
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
      </PageContent>

      <Footer isLanding />
    </>
  );
};

const CardText = styled.p`
  padding-top: 1.5rem;
  padding-right: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
`;

const CardTitle = styled.h4`
  font-size: 3vw;
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
  font-size: 3vw;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 1.875rem /* 30px */;
    line-height: 2.25rem /* 36px */;
  }
`;

const PageContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  @media (max-width: 1023px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const TestText = styled.p`
  margin-left: 1vw;
  @media (max-width: 1023px) {
    margin-left: 3vw;
  }
`;

const TestButton = styled.button`
  padding: 0.75rem 2.7rem 0.75rem 2.7rem;
  border: solid 3px transparent;
  border-radius: 25px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
    inset -2px -2px 4px #fafbff, 2px 2px 6px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  align-items: center;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  background-size: 120%;
  background-position-x: -1rem;
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
