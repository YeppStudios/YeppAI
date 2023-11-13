import Centered from "@/components/Centered";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import BlueButton from "@/components/Landing/common/BlueButton";
import GraySection from "@/components/Landing/common/GraySection";
import MainTitle from "@/components/Landing/common/MainTitle";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import Subtitle from "@/components/Landing/common/Subtitle";
import Image from "next/image";
import dashboardVisualization from "../../public/images/dashboard_visualization.png"
import workflowVisualization from "../../public/images/workflow_visualization.png"
import Head from "next/head";
import UnderlineButton from "@/components/Landing/common/UnderlineButton";
import { useRouter } from "next/router";

const WhatIsYepp = () => {

    const router = useRouter();

    return (
        <div>
        <Head>
          <meta name="theme-color" content="#F6F6FB" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Yepp AI is an automation house oriented around automating tedious tasks in marketing industry."
          />
         <title>Yepp AI | About</title>
        </Head>
            <Navbar />
            <div className="mt-[6rem] lg:mt-[10rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="w-11/12 flex justify-center flex-wrap">
                <Centered><MiniTitle>What is Yepp?</MiniTitle></Centered>
                <div className="lg:w-8/12"><MainTitle>Meet the Marketing Intelligence Platform</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Yepp AI is the only platform that enhances marketer efficiency, enabling teams to effectively generate and convert more leads with less effort.</div>
                <div className='flex gap-4 lg:hidden w-full justify-center items-center mt-10 flex-wrap'>
              <Centered><BlueButton onClick={() => router.push("/demo")}>Explore the platform</BlueButton></Centered>
              <UnderlineButton onClick={() => router.push("/demo")}>Talk to an expert</UnderlineButton>
            </div>
            <div className='hidden lg:flex gap-20 w-full justify-center items-center mt-4 flex-nowrap'>
              <BlueButton onClick={() => router.push("/demo")}>Explore the platform</BlueButton>
              <UnderlineButton onClick={() => router.push("/demo")}>Talk to an expert</UnderlineButton>
            </div>
            </div>
            </Centered>
            </div>
            <Centered>
                <Image src={dashboardVisualization}  alt="dashboard" className='w-full mt-10 lg:mt-0'/>
            </Centered>
            <GraySection>
            <div className="w-full flex justify-center flex-wrap">
                <Subtitle>What is Marketing Intelligence Platform? </Subtitle>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">The Marketing Intelligence Platform is an all-in-one solution that leverages AI to streamline and enhance every aspect of marketing, from lead generation and engagement to conversion and analytics, enabling marketing teams to deliver superior results with greater efficiency.</div>
                <Image src={workflowVisualization} alt="workflow" className="lg:w-2/3 w-11/12 mt-14" />
            </div>
            </GraySection>
            <Footer />
        </div>
    )
}


export default WhatIsYepp;