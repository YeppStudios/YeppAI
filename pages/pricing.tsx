import SlideBottom from "@/components/Animated/SlideBottom";
import Navbar from "@/components/Landing/Navbar";
import styled from "styled-components";
import Section from '@/components/Landing/common/Section';
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
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
import CalendlyWidget from "@/components/Modals/OnboardingModals/CalendlyModal";

const teamSizes = [
    "1 - 6",
    "7 - 15",
    "16 - 25",
    "26 - 50",
    "51 - 100",
    "100+"
]

const Pricing = () => {

    const [step, setStep] = useState(1);
    const [openedAccordion, setOpenedAccordion] = useState(1);
    const [teamSize, setTeamSize] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<any>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(true);
    const [agreement, setAgreement] = useState(false);

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

    const selectTeamSize = (teamSize: string) => {
        setTeamSize(teamSize);
        setStep(2);
        if (mobile) {
            handleScrollTop();
        }
    }

    const selectOption = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption: string) => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    }

    const submitOptions = () => {
        setStep(3);
        if (mobile) {
            handleScrollTop();
        }
    }


    const sendRequest = async () => {
        setStep(4);
        const msg = {
            to: "milosz@yepp.ai",
            nickname: "Yepp AI Website",
            from: {
              email: "hello@yepp.ai",
              name: "Yepp AI Website"
            },
            templateId: 'd-0549d75ff64a43b18bb9b5c90abe68f8',
            dynamicTemplateData: {
            request_type: `pricing`,
            email: `${email}`,
            first_name: `${firstName}`,
            last_name: `${lastName}`,
            company_name: `${companyName}`,
            job_title: `${jobTitle}`,
            phone_number: `${phoneNumber}`,
            team_size: `${teamSize}`,
            selected_options: `${selectedOptions.join(", ")}`,
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
        setSelectedOptions([]);
    }
    
  return (
    <>
    <Head>
        <title>Pricing | Yepp AI</title>
        <meta name = "theme-color" content = "#FFFFFF" />
        <meta name="description" content="Subscription plans and offer." />
    </Head>

    <Layout>
      <Navbar />
      <div id="top"></div>
      {mobile && <h1 className="lg:text-6xl text-4xl font-medium text-center lg:text-left mt-[8rem] px-[7%]">Get Your Yepp Pricing</h1>}
      <div className="lg:grid lg:grid-cols-2 w-full px-[5vw] lg:px-[7rem] mt-10 lg:mt-[11rem] flex flex-col-reverse">
        <div>
            {!mobile && <h1 className="lg:text-6xl text-4xl font-medium text-center lg:text-left">Get Your Yepp Pricing</h1>}
            <p className="lg:mt-8 mt-20 lg:w-10/12"><b>We’ll prepare a customized proposal for you!</b> Our pricing model depends on your team’s needs, so we’ll need to get in touch to give you precise information. Get started by filling out the form on the right.</p>
            <div className="lg:w-9/12 w-full mt-10 lg:mt-0">
                <Accordion openedAccordion={openedAccordion} index={1} onClick={() => setOpenedAccordion(1)} question="How does Yepp pricing work?" answer={"The pricing structure for Yepp is based on individual modules, allowing you to customize the platform according to your specific needs. Our objective is to offer a highly personalized experience, which is why our pricing varies on a case-by-case basis."} backgroundColor="#F2F2FB"/>
                <Accordion openedAccordion={openedAccordion} index={2} onClick={() => setOpenedAccordion(2)} question="Does Yepp allow monthly payments?" answer={"Yepp provides a variety of payment methods that vary based on your selected features, additional services, and usage. Our sales representatives are available to discuss the best payment schedule and options for you."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={3} onClick={() => setOpenedAccordion(3)} question="I’m an existing customer, how do I access the new features?" answer={"Contact your Yepp account manager, who can do a full overview of the new features and create a customized proposal for you."} backgroundColor="#F2F2FB"/>
            </div>
        </div>
        <div className="w-full flex justify-end">
            {step === 1 &&
            <div style={{boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)"}} className=" rounded-3xl py-10 px-8 lg:px-14 pb-14 lg:w-9/12 w-full">
                <h2 className="text-2xl font-medium text-center lg:text-left">How big is your team?</h2>
                <div className="w-full mt-10">
                {teamSizes.map((teamSize, index) => (
                    <div key={index} onClick={() => selectTeamSize(teamSize)} className="w-full flex justify-center py-4 bg-[#F2F2FB] rounded-2xl mt-4 cursor-pointer hover:bg-[#EEEEF9]">{teamSize}</div>
                ))}
                </div>
            </div>
            }
            {step === 2 &&
            <div style={{boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)"}} className=" rounded-3xl py-10 px-8 lg:px-14 pb-14 lg:w-9/12 w-full">
                <h2 className="text-2xl font-medium text-center lg:text-left">How can we best help your team?</h2>
                <div className="w-full mt-5 mb-10 lg:mb-2">
                    <p className="text-gray-700 mb-5 text-center lg:text-left">*Select all that apply</p>
                    <div className="w-full flex flex-wrap justify-between">
                    {solutions.map((solution, index) => (
                        <div key={index} onClick={() => selectOption(solution.title)} className={classNames(selectedOptions.includes(solution.title) ? "bg-[#EEEEF9] shadow-inner border-2 border-blue-500" : "bg-[#F2F2FB] border-2 border-[#F2F2FB]", "lg:w-[48%] w-full flex justify-center py-4 rounded-2xl mt-4 cursor-pointer hover:bg-[#EEEEF9]")}>{solution.title}</div>
                    ))}
                    </div>
                </div>
                {selectedOptions.length > 0 && <SlideBottom><Centered><BlueButton onClick={() => submitOptions()}>Continue</BlueButton></Centered></SlideBottom>}
            </div>
            }
            {step === 3 &&
            <div style={{boxShadow: "0px 0px 20px rgba(0, 0, 100, 0.15)"}} className=" rounded-3xl py-10 px-8 lg:px-14 pb-14 lg:w-9/12 w-full">
                <h2 className="text-2xl font-medium text-center lg:text-left">How can we contact you?</h2>
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
                <CheckboxContainer>
                <CheckboxInput
                    id="rules"
                    type="checkbox"
                    checked={agreement}
                    onChange={() => setAgreement(!agreement)}
                    required
                />
                <RegisterText>
                    <a href={"/Yepp_AI_Terms.pdf"} download>I agree with <b>terms of use & privacy policy</b></a>
                </RegisterText>
            </CheckboxContainer>
                {(firstName.length > 0 && lastName.length > 0 && companyName.length > 0 && jobTitle.length > 0 && agreement) &&
                <SlideBottom>
                    <Centered>
                    <BlueButton onClick={() => sendRequest()}>
                        {!loading ? 
                        <p>Get Pricing</p>
                        :
                        <Loader color="white" />
                        }
                    </BlueButton>
                    </Centered>
                </SlideBottom>
                }
            </div>
            }
            {step === 4 &&
                <CalendlyWidget name={firstName + " " + lastName} email={email} />
            }
        </div>
      </div>
        <div className="lg:mt-64 mt-28"></div>
        <Stats />
        <Footer/>
    </Layout>
    </>
  );
};


export default Pricing;


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
    width: 100%;
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
      padding: 1vh 6rem 1vh 6rem;
      width: auto;
    }
`

const CheckboxContainer = styled.div`
    width: 22rem;
    display: grid; 
    grid-template-columns: 0.2fr 1.8fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    margin: 3vh 0 1vh 0;
    align-items: center;
    @media (max-width: 1023px) {
        margin-top: 2vh;
        width: 100%;
    }
`

const CheckboxInput = styled.input`
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    
`


const RegisterText = styled.div`
  font-size: 0.8rem;
  display: flex;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 0.7rem;
}
`
