import React, { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Footer from "@/components/Landing/Footer";
import { useRouter } from "next/router";
import dashbaordVisualization from "@/public/images/custom_idea_dashboard.png";
import { IconType } from 'react-icons';
import Centered from "@/components/Centered";
import MainTitle from "@/components/Landing/common/MainTitle";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import Stats from "@/components/Landing/Stats";
import Section from "@/components/Landing/common/Section";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import ContactPopup from "@/components/Modals/OnboardingModals/ContactPopup";

const SolutionPage = () => {

  const router = useRouter();
  const [mobile, setMobile] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth >= 1023) {
        setMobile(false);
      } else setMobile(true);
    }
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';

  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
}, [isModalOpen]);


    return (
      <>
        <Head>
          <meta name="theme-color" content="#F6F6FB" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Turn your business automation idea into reality with Yepp."
          />
         <title>Yepp AI | Custom Solutions</title>
        </Head>
        {isModalOpen && <ContactPopup onClose={() => setModalOpen(false)} />}
          <Navbar />
            <div className="mt-[6rem] lg:mt-[10rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="lg:w-11/12 flex justify-center flex-wrap">
                <Centered>
                <div className="flex gap-4 items-center mb-4">
                  <CommandLineIcon className="h-6 w-6" />
                  <MiniTitle>Custom Solution</MiniTitle>
                </div>
                </Centered>
                <div className="w-full lg:w-9/12"><MainTitle>Step in With a Vision. Walk Out with the Game-Changer.</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Imagine, Validate, and Implement with Yepp AI — The Ecosystem for Your Success</div>
                <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
                  <Centered><a href="https://www.yeppstydios.com"><BlueButton onClick={() => setModalOpen(true)}>Go to Yepp Studios</BlueButton></a></Centered>
                </div>
                <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
                  <a href="https://www.yeppstydios.com"><BlueButton onClick={() => setModalOpen(true)}>Go to Yepp Studios</BlueButton></a>
                </div>
            </div>
            </Centered>
            </div>
            <Centered>
                <Image src={dashbaordVisualization}  alt="dashboard" className='w-full mt-10 lg:mt-0'/>
            </Centered>
            <Stats />
            <Footer />
      </>
    );
}

export default SolutionPage;


const BlueButton = styled.button`
    font-size: 1rem;
    padding: 2vh 15vw 2vh 15vw;
    border: solid 3px transparent;
    border-radius: 15px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-size: 120%;
    background-position-x: -1rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 500;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (min-width: 1023px) {
      margin-top: 4vh;
      font-size: 1rem;
      padding: 1vh 10vw 1vh 10vw;
    }
`