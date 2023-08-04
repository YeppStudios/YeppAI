import { BsFillGiftFill, BsStars } from "react-icons/bs";
import { TypewriterSection } from "./TypewriterSection";
import styled from "styled-components";
import { useRouter } from "next/router";
import SlideBottom from "../Animated/SlideBottom";
import { useEffect, useState } from "react";

const HeroSection = () => {

  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1023) {
      setMobile(false);
    }
  }, []);
  
    const router = useRouter();

    return (
        <div className="relative isolate">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(40rem_40rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
        </svg>
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#B2864F] opacity-30"
            style={{
              clipPath:
                'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 lg:px-8 lg:pt-28">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none">
              <div className="w-full lg:max-w-xl text-center lg:text-left lg:shrink-0 xl:max-w-2xl lg:mt-[10rem]">
                <h1 className="text-[6vw] font-medium tracking-tight text-gray-900 lg:text-6xl">
                Upload your assets,
                </h1>
                <TypewriterSection />
                <p className="relative mt-8 text-lg lg:text-xl leading-8 font-medium text-gray-900 px-10 lg:px-0 lg:max-w-lg flex justify-center items-center">
                    {!mobile && <BsStars className="mr-4" />} No. 1 Generative AI tool among marketing agencies.
                </p>
                <div className="mt-10 flex items-center gap-x-6 flex-wrap w-full justify-center lg:justify-start">
                  <TestButton id="free-trial-btn" onClick={() => router.push("/register?registration=true&trial=true")}>
                  <BsFillGiftFill className="mr-4"/>Start free trial
                  </TestButton>
                  <DemoButton href="#">
                    Schedule free demo
                  </DemoButton>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 lg:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <SlideBottom>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl shadow-xl bg-black/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none rounded-xl absolute inset-0 shadow-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  </SlideBottom>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 lg:pt-36">
                <SlideBottom>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl shadow-xl bg-black/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none rounded-xl absolute inset-0 shadow-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  </SlideBottom>
                  <SlideBottom>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl shadow-xl bg-black/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none rounded-xl absolute inset-0 shadow-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  </SlideBottom>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 lg:pt-0">
                <SlideBottom>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl shadow-xl bg-black/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none rounded-xl absolute inset-0 shadow-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  </SlideBottom>
                  <SlideBottom>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl shadow-xl bg-black/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none rounded-xl absolute inset-0 shadow-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  </SlideBottom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeroSection;

const TestButton = styled.button`
    padding: 0.55rem 2.7rem 0.55rem 2.7rem;
    border: solid 3px transparent;
    border-radius: 15px;

    background-color: black;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 500;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 5px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    }
    @media (max-width: 1023px) {
        padding: 1.3vh 5rem 1.3vh 5rem;
        font-size: 0.9rem;
    }
    
`


const DemoButton = styled.a`
    padding: 0.55rem 2.7rem 0.55rem 2.7rem;
    border: solid 1px black;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 5px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    color: black;
    background: white;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 500;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        padding: 1.3vh 5rem 1.3vh 5rem;
        font-size: 0.9rem;
    }
    @media (max-width: 647px) {
      margin-top: 1rem;
  }
`