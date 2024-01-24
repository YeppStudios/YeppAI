import SlideBottom from "@/components/Animated/SlideBottom";
import Navbar from "@/components/Landing/Navbar";
import styled from "styled-components";
import Footer from '@/components/Landing/Footer';
import { useEffect, useState } from "react";
import tickIcon from "@/public/images/checked.png";
import Head from "next/head";
import Accordion from "@/components/Landing/Accordion";
import { solutions } from "@/solutions";
import Label from "@/components/Common/Label";
import Input from "@/components/forms/Input";
import Centered from "@/components/Centered";
import Stats from "@/components/Landing/Stats";
import classNames from "classnames";
import { Loader } from "@/components/Common/Loaders";
import api from "./api";
import Image from "next/image";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import CalendlyWidget from "@/components/Modals/OnboardingModals/CalendlyModal";
import { first } from "lodash";

const Demo = () => {

    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
      if (window.innerWidth > 1023) { 
        setMobile(false);
      }
      const updateWindowSize = () => {
        setMobile(window.innerWidth < 1023);
      };
      window.addEventListener("resize", updateWindowSize);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }, []);
  
    const handleScrollTop = () => {
        const contactSection = document.getElementById("top")!;
        contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const sendRequest = async () => {
        setStep(2);
        const msg = {
            to: "hello@asystent.ai",
            nickname: "Yepp AI Website",
            from: {
              email: "hello@asystent.ai",
              name: "Yepp AI Website"
            },
            templateId: 'd-081f0d1b63f54ef0b5357cc5cc8b79ce',
            dynamicTemplateData: {
            request_type: `product demo`,
            email: `${email}`,
            first_name: `${firstName}`,
            last_name: `${lastName}`,
            company_name: `${companyName}`,
            job_title: `${jobTitle}`,
            phone_number: `${phoneNumber}`,
            },
        };
        await api.post('/send-email', { msg });
        if (mobile) {
            handleScrollTop();
        }
        setFirstName("");
        setLastName("");
        setCompanyName("");
        setJobTitle("");
        setPhoneNumber("");
        setEmail("");
    }
    
  return (
    <>
    <Head>
        <title>Yepp AI | Request Demo</title>
        <meta name = "theme-color" content = "#F6F6FB" />
        <meta name="description" content="Subscription plans and offer." />
    </Head>

    <Layout>
      <Navbar />
      {!mobile && <div id="top"></div>}
      <div className="lg:grid lg:grid-cols-2 w-full px-[5vw] lg:px-[7rem] mt-[8rem] lg:mt-[11rem]">
        <div>
            <div className="px-10 lg:px-0"><MiniTitle>Request a demo of platform that&apos;s customized for your needs.</MiniTitle></div>
            <h1 className="lg:text-6xl text-4xl font-medium text-center lg:text-left">Experience AI-powered marketing</h1>
            <div className="mt-16 px-2 mb-20 lg:mb-0 lg:px-0 lg:w-11/12 flex lg:block flex-wrap justify-center">
                <div className="flex gap-6 mt-10 border-b-4 border-b-[#F2F2FB] pb-6">
                    <Image src={tickIcon} alt="tick" className="w-6 h-6" />
                    <p>Deliver at the speed that was impossible before, increasing volume and expanding your customer base.</p>
                </div>
                <div className="flex gap-6 mt-10 border-b-4 border-b-[#F2F2FB] pb-6">
                    <Image src={tickIcon} alt="tick" className="w-6 h-6" />
                    <p>Ensure innovation, very fast feedback loops and constant refresh to get the most of your ad spend and deliver outstanding results.</p>
                </div>
                <div className="flex gap-6 mt-10 border-b-4 border-b-[#F2F2FB] pb-6">
                    <Image src={tickIcon} alt="tick" className="w-6 h-6" />
                    <p>Supercharge every step of content creation with AI, making you and your team focus on what matters.</p>
                </div>
            </div>
        </div>
        {mobile && <div id="top"></div>}
        <div className="w-full flex justify-end">
            {step === 1 &&
            <div style={{boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)"}} className=" rounded-[35px] py-10 px-8 lg:px-14 pb-14 lg:w-9/12 w-full">
                <h2 className="lg:text-2xl text-3xl font-medium text-center lg:text-left">How can we contact you?</h2>
                <div className="mb-10 lg:mb-2">
                    <div className="w-full mt-8">
                        <div>
                            <Label>First Name</Label>
                            <Input onChange={(e) => setFirstName(e.target.value)} value={firstName} height="2.8rem" padding="0.7rem" placeholder="John" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div>
                            <Label>Last Name</Label>
                            <Input onChange={(e) => setLastName(e.target.value)} value={lastName} height="2.8rem" padding="0.7rem" placeholder="Smith" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div>
                            <Label>Email</Label>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} height="2.8rem" padding="0.7rem" placeholder="you@company.com" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div>
                            <Label>Company Name</Label>
                            <Input height="2.8rem" onChange={(e) => setCompanyName(e.target.value)} value={companyName} padding="0.7rem" placeholder="My Company" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div>
                            <Label>Job Title</Label>
                            <Input height="2.8rem" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} padding="0.7rem" placeholder="VP of sales" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <div>
                            <Label>Phone Number (optional)</Label>
                            <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} height="2.8rem" padding="0.7rem" placeholder="+1 (415) 555-7777" />
                        </div>
                    </div>
                </div>
                {firstName.length > 0 && lastName.length > 0 && companyName.length > 0 && jobTitle.length > 0 &&
                <SlideBottom>
                    <Centered>
                    <BlueButton onClick={() => sendRequest()}>
                        <p>Continue</p>
                    </BlueButton>
                    </Centered>
                </SlideBottom>
                }
            </div>
            }
            {step === 2 &&
                <CalendlyWidget name={firstName + " " + lastName} email={email} />
            }
            {step === 3 &&
                <div style={{boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)"}} className=" rounded-[35px] py-10 px-8 lg:px-14 pb-14 lg:w-9/12 w-full flex justify-center items-center">
                    <SlideBottom>
                    <div>
                        <Centered><Image src={tickIcon} alt="tick" className="w-12 h-12" /></Centered>
                        <h2 className="text-4xl font-medium mt-10 text-center">Thank you!</h2>
                        <div className="w-full mt-4">
                            <p className="text-gray-700 text-center">We&apos;ll reach out to you shortly. In the meantime, feel free to explore our latest insights on marketing and AI, delve into Yepp use cases, and find answers for frequently asked questions.</p>
                        </div>
                    </div>
                    </SlideBottom>
                </div>
            }
        </div>
      </div>
        <div className="mt-64"></div>
        <Stats />
        <Footer/>
    </Layout>
    </>
  );
};


export default Demo;


const Layout = styled.div`
    width: 100vw;
    position: relative;
    height: 100%;
    overflow: hidden;
    background: white;
`

const BlueButton = styled.button`
    font-size: 1rem;
    padding: 2vh 10vw 2vh 10vw;
    border: solid 3px transparent;
    width: 100%;
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
      padding: 1vh 6rem 1vh 6rem;
      width: auto;
    }
`
