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
import { useRouter } from "next/router";

const SolutionPage = () => {

  const router = useRouter();
  const { tab } = router.query;
  useEffect(() => {
    console.log(tab)
  }, [tab])


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

  return (
    <>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="AI Marketing Platform."
        />
        <title>Yepp AI | Solution</title>
      </Head>
      <Navbar />
      <div className="mt-[8rem]" />
      <section className="relative lg:mb-6 lg:mb-56">
        <div className="lg:h-[80vh] h-[90vh] relative w-full">
          <Image src={placeholderImg} alt="chat with your data image" style={{height: "100%"}} />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-white z-20 flex flex-col gap-12 px-12 lg:px-16 shadow-[0px_-20px_20px_40px_#fff] shadow-white ">
          <div className="lg:grid lg:grid-cols-2 flex flex-col w-full">
            <SectionTitle className="lg:text-3xl text-[8vw] lg:pb-0 lg:text-start text-center pb-[15vh]">
              Chat with your data
            </SectionTitle>
            <div className="lg:gap-8 gap-4 h-12 flex flex-col lg:flex-row py-8 lg:p-0 justify-end mt-6 lg:mt-0">
              <TestButton className="start-free-trial-landing ">
                <BsFillGiftFill />
                <TestText>Start free trial</TestText>
              </TestButton>
              <PricingButton>Request the pricing</PricingButton>
            </div>
            {!mobile &&
            <div className="flex items-center lg:justify-start  justify-center  mb-6 text-center">
              <p className="text-xl mt-4 lg:pl-2 text-center lg:text-start  ">
                Unleash the full potential of AI and chat with your data.
              </p>
            </div>
            }
          </div>
        </div>
      </section>
      <PageContent>
        <section className=" h-full lg:border-t-2  lg:border-slate-300 p-4 relative lg:px-24 px-4">
          <div className="flex mt-[10vh] h-full w-full ">
            {/* {!mobile && (
              // Adjust bar with dots and tiles with icons

              <div className="h-[158vh] mt-36 rounded-full w-2 bg-black overflow-visible relative">
                <div className="w-6 h-6 rounded-full absolute top-0 bg-black -translate-x-[50%] ml-[.1rem]" />
                <div className="w-6 h-6 rounded-full absolute top-[47%] bg-black -translate-x-[50%] ml-[.1rem]" />
                <div className="w-6 h-6 rounded-full absolute bottom-0 bg-black -translate-x-[50%] ml-[.1rem]" />
              </div>
            )} */}

            <div className="flex flex-col lg:pt-12 pt-8 lg:gap-[9vw] gap-[12vh]">
              <div className="grid lg:grid-cols-2 items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-6 lg:w-[80%] w-full lg:p-0">
                  <div className="flex flex-col lg:gap-3 lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-10 w-10" />
                    <SectionSubtitle>
                      1. Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.3vw] text-center lg:text-start text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative lg:w-full w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-6 lg:w-[80%] w-full lg:p-0">
                  <div className="flex flex-col lg:gap-3 lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-10 w-10" />
                    <SectionSubtitle>
                      2. Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.3vw] text-center lg:text-start text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative lg:w-full w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
              <div className="grid lg:grid-cols-2 items-center justify-center flex-col">
                <div className="flex flex-col gap-[6vw] lg:gap-6 lg:w-[80%] w-full lg:p-0">
                  <div className="flex flex-col lg:gap-3 lg:items-start items-center gap-4 justify-center ">
                    <AiOutlineCloudUpload className="h-10 w-10" />
                    <SectionSubtitle>
                      3. Upload your data
                    </SectionSubtitle>
                  </div>
                  <p className="lg:text-[1.3vw] text-center lg:text-start text-[4vw] pb-8">
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers. Check out YouTube
                    tutorials for great tutorials from folks in the comunity,
                    and Gallery for a list of awesome LangChain projects,
                    compiled by the folks
                  </p>
                </div>
                <div className="relative lg:w-full w-full aspect-video flex items-center justify-center  rounded-2xl  overflow-x-hidden ">
                  <Image src={placeholderImg} alt="Upload data image" fill />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-24 lg:px-24 px-6">
          <div className="flex w-full pb-8 border-b-2 lg:mb-14 mb-12">
            <SectionTitle className="lg:text-[3.5vw]  text-4xl">
              Use cases
            </SectionTitle>
          </div>
          <div className="grid gap-16 lg:grid-cols-2 grid-cols-1 ">
            {/* Adjust titles and icons */}
            <div px-12v className="flex flex-col gap-2 pb-2 lg:w-10/12 w-full">
              <AiOutlineCloudUpload className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw] text-[5vw]">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-lg text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
            <div px-12v className="flex flex-col gap-2 pb-2 lg:w-10/12 w-full">
              <AiOutlineCloudUpload className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw] text-[5vw]">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-lg text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
            <div px-12v className="flex flex-col gap-2 pb-2 lg:w-10/12 w-full">
              <AiOutlineCloudUpload className="h-10 w-10" />
              <SectionSubtitle className="lg:text-[3vw] text-[5vw]">
                Customer service
              </SectionSubtitle>
              <p className="pr-8 lg:text-lg text-[4vw]">
                Our comunity is full of proliftic developers, creative builders,
                and fantastic teachers. Check out YouTube tutorials for great
                tutorials from folks in the comunity, and Gallery for a list of
                awesome LangChain projects, compiled by the folks
              </p>
            </div>
          </div>
        </section>
        <section className="mt-24 lg:mb-60 mb-28 lg:px-24 px-6">
          {/* Adjust titles and icons */}

          <div className="flex w-full pb-8 border-b-2 lg:mb-16 mb-12">
            <SectionTitle>Other solutions</SectionTitle>
          </div>
          <div className="grid  lg:grid-cols-3 gap-8 grid-cols-1">
            <div className="relative w-full lg:h-64 h-72 rounded-2xl overflow-hidden shadow-xl border border-[#e5e5e5]">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white  z-20 flex flex-col lg:justify-start lg:px-[1.2vw]lg:py-2 px-4 ">
                <CardTitle>Copywriting</CardTitle>
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers.
                  </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
              />
            </div>
            <div className="relative w-full lg:h-64 h-72 rounded-2xl overflow-hidden shadow-xl border border-[#e5e5e5]">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white  z-20 flex flex-col lg:justify-start lg:px-[1.2vw] lg:py-2 px-4 ">
                <CardTitle>Marketing campaigns</CardTitle>
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers.
                  </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
              />
            </div>
            <div className="relative w-full lg:h-64 h-72 rounded-2xl overflow-hidden shadow-xl border border-[#e5e5e5]">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white  z-20 flex flex-col lg:justify-start lg:px-[1.2vw]lg:py-2 px-4 ">
                <CardTitle>Uploading content</CardTitle>
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers.
                  </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
              />
            </div>
            <div className="relative w-full lg:h-64 h-72 rounded-2xl overflow-hidden shadow-xl border border-[#e5e5e5]">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white  z-20 flex flex-col lg:justify-start lg:px-[1.2vw] lg:py-2 px-4 ">
                <CardTitle>Prompt browser</CardTitle>
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers.
                  </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
              />
            </div>
            <div className="relative w-full lg:h-64 h-72 rounded-2xl overflow-hidden shadow-xl border border-[#e5e5e5]">
              <div className="absolute bottom-0 left-0 w-full h-[55%] bg-white  z-20 flex flex-col lg:justify-start lg:px-[1.2vw] lg:py-2 px-4 ">
                <CardTitle>Marketing Templates</CardTitle>
                  <CardText>
                    Our comunity is full of proliftic developers, creative
                    builders, and fantastic teachers.
                  </CardText>
              </div>
              <Image
                src={placeholderImg}
                fill
                alt="other solutions image"
              />
            </div>
          </div>
        </section>
        <LearnMoreSection />
        <div className="pb-28" />
        <Footer />
      </PageContent>

      {/* <Footer /> */}
    </>
  );
};

const CardText = styled.p`
  padding-top: 0.3vw;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin-top: 0.25rem;
`;

const CardTitle = styled.h4`
  padding-top: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  @media (max-width: 1023px) {
    font-size: 1.5rem;
    margin-top: 0.45rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  @media (max-width: 1023px) {
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
export default SolutionPage;
