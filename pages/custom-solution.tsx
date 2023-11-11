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
import BlueButton from "@/components/Landing/common/BlueButton";
import Stats from "@/components/Landing/Stats";
import Section from "@/components/Landing/common/Section";
import { CommandLineIcon } from "@heroicons/react/24/outline";

const SolutionPage = () => {

  const router = useRouter();
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
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Turn your business automation idea into reality with Yepp."
          />
         <title>Yepp AI | Custom Solutions</title>
        </Head>
          <Navbar />
            <div className="mt-[6rem] lg:mt-[10rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="w-11/12 flex justify-center flex-wrap">
                <Centered>
                <div className="flex gap-4 items-center mb-4">
                  <CommandLineIcon className="h-6 w-6" />
                  <MiniTitle>Custom Solution</MiniTitle>
                </div>
                </Centered>
                <div className="w-9/12"><MainTitle>Step in With a Vision. Walk Out with the Game-Changer.</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Imagine, Validate, and Implement with Yepp AI — The Ecosystem for Your Success</div>
                <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
                  <Centered><BlueButton onClick={() => router.push("/register?registration=true&company=true&trial=true")}>Contact us</BlueButton></Centered>
                </div>
                <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
                  <BlueButton onClick={() => router.push("/register?registration=true&company=true&trial=true")}>Contact us</BlueButton>
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