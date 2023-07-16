import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Centered from "../../Centered";
import {  BsXLg, BsChevronLeft } from "react-icons/bs";
import Cookies from "js-cookie";
import BackBtn from "../../Common/BackBtn";
import BackBtnIcon from "../../Common/BackBtnIcon";
import SlideBottom from "../../Animated/SlideBottom";
import Image from "next/image";
import api from "@/pages/api";
import { Loader } from "@/components/Common/Loaders";

const steps = [
    { number: 1},
    { number: 2},
    { number: 3},
    { number: 4},
    { number: 5},
  ]

const industries = [
    "E-commerce",
    "Agency",
    "Education",
    "SaaS",
    "Nonprofit",
    "Other"
]

const roles = [
    "IT Developer",
    "Product / Project manager",
    "Founder / Executive",
    "Marketing / Growth",
    "Freelancer / Consultant",
    "Support / Operations",
    "Sales / Business Development",
    "Human Resources",
    "Student / Professor",
    "Inna..."
]

const companySize = [
    "Just me",
    "2-50",
    "51-200",
    "201-500",
    "500+"
]

const OnboardingModal = (props: {onClose: any}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [username, setUsername] = useState("");
    const [exampleLengthError, setExampleLengthError] = useState(false);
    const [userIndustry, setUserIndustry] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userCompanySize, setUserCompanySize] = useState("");
    const [usedAI, setUsedAI] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        let username = Cookies.get("username");
        if (window.innerWidth <= 1023) {
            setMobile(true);
        }
        if (username) {
            setUsername(username);
        }
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        };
    }, []);

    const selectIndustry = (industry: string) => {
        setUserIndustry(industry);
        setSelectedTab(2)
    }

    const selectRole = (role: string) => {
        setUserRole(role);
        setSelectedTab(3)
    }

    const selectCompanySize = (size: string) => {
        setUserCompanySize(size);
        setSelectedTab(4)
    }

    const selectAIExperience = (experienced: boolean) => {
        setUsedAI(experienced);
        setSelectedTab(5)
    }

    const saveOnboardingData = async () => {
        setLoading(true);
        try {
            await api.post("/addOnboardingData", {
                industry: userIndustry,
                role: userRole,
                companySize: userCompanySize,
                hasUsedAI: usedAI
                    
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            )
            props.onClose();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    return (
        <ModalBackground selectedTab={selectedTab} mobile={mobile}>
            <SlideBottom>
            <Modal selectedTab={selectedTab}>
                {selectedTab > 0 &&
                    <BackArrow selectedTab={selectedTab}>   
                        <BackBtn onClick={() => setSelectedTab(selectedTab - 1)}>
                            <BackBtnIcon>
                                <BsChevronLeft style={{ width: "250%", height: "auto" }} />
                            </BackBtnIcon> 
                        </BackBtn>
                    </BackArrow>
                } 
                <CloseIcon onClick={props.onClose} selectedTab={selectedTab}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <div>
                {selectedTab === 0 &&
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem"}}>
                <Centered>
                        <ModalTitle><p style={{fontSize: "3rem", marginBottom: "0.5rem"}}>👋</p>Hello {username}!</ModalTitle>
                </Centered>
                <Centered>
                <ModalDescription>We&apos;ve prepared for you a short onboarding that will help you get started and us provide a service tailored for your needs. </ModalDescription>
                </Centered>
                <Centered>
                    <EstimatedTime>Est. onboarding time: ~ 4 min</EstimatedTime>
                </Centered>
                    <Centered>
                        <ContinueBtn onClick={() => setSelectedTab(1)}>
                            Let&apos;s get started!
                        </ContinueBtn>
                    </Centered>
                </div>
                }
                {selectedTab === 1 &&
                    <>
                    <ModalTitle>What is your industry?</ModalTitle>
                    <Centered><ModalDescription>This will help us develop a platform tailored for your needs.</ModalDescription></Centered>
                    <Tabs justifyContent="center">
                        {industries.map((industry: any) => {
                            return (
                            <Tab key={industry} onClick={() => selectIndustry(industry)}>{industry}</Tab>
                            );

                        })}
                    </Tabs>
                    <Centered><SkipBtn onClick={() => setSelectedTab(selectedTab+1)}>Skip</SkipBtn></Centered>
                    </>
                }
                {selectedTab === 2 &&
                    <>
                    <ModalTitle>What is your role?</ModalTitle>
                    <Centered><ModalDescription>This will help us develop a platform tailored for your needs.</ModalDescription></Centered>
                    <Tabs justifyContent="center">
                        {roles.map((role: any) => {
                            return (
                            <Tab key={role} onClick={() => selectRole(role)}>{role}</Tab>
                            );

                        })}
                    </Tabs>
                    <Centered><SkipBtn onClick={() => setSelectedTab(selectedTab+1)}>Skip</SkipBtn></Centered>
                    </>
                }
                {selectedTab === 3 &&
                    <>
                    <ModalTitle>How big is your company?</ModalTitle>
                    <Centered><ModalDescription>This will help us develop a platform tailored for your needs.</ModalDescription></Centered>
                    <Tabs justifyContent="center">
                        {companySize.map((size: any) => {
                            return (
                            <Tab key={size} onClick={() => selectCompanySize(size)}>{size}</Tab>
                            );

                        })}
                    </Tabs>
                    <Centered><SkipBtn onClick={() => setSelectedTab(selectedTab+1)}>Skip</SkipBtn></Centered>
                    </>
                }
                {selectedTab === 4 &&
                    <>
                    <ModalTitle>Did you use AI before?</ModalTitle>
                    <Centered><ModalDescription>This will help us develop a platform tailored for your needs.</ModalDescription></Centered>
                    <Tabs justifyContent="center">
                        <Tab onClick={() => selectAIExperience(true)}>Yes</Tab>
                        <Tab onClick={() => selectAIExperience(false)}>No</Tab>
    
                    </Tabs>
                    <Centered><SkipBtn onClick={() => setSelectedTab(selectedTab+1)}>Skip</SkipBtn></Centered>
                    </>
                }
                {selectedTab === 5 &&
                    <>
                    <ModalTitle>Let&apos;s get started!</ModalTitle>
                    <Centered><ModalDescription><b>Assets</b> which you upload are the cornerstone of our platform. Uploaded assets are stored in folders, which AI can easily access later on.</ModalDescription></Centered>
                    <Centered>
                    <GifContainer>
                    {!mobile ?
                    <Image 
                        src="/videos/uploading.gif"
                        width={500}
                        height={300}
                        style={{borderRadius: "20px", boxShadow: "0 2px 25px 1px rgba(0,0,0,0.15)"}}
                        alt={"gif of uploading the file"}
                    />
                    :
                    <Image 
                        src="/videos/mobile_uploading.gif"
                        width={175}
                        height={300}
                        style={{borderRadius: "20px", border: "8px solid black", boxShadow: "0 2px 25px 1px rgba(0,0,0,0.15)"}}
                        alt={"gif of uploading the file"}
                    />
                    }
                    </GifContainer>
                    </Centered>
                    <Centered>
                        <ContinueBtn onClick={saveOnboardingData}>
                            {loading ?
                                <Loader color="white"/>
                            :
                               <p>Continue</p> 
                            }
                        </ContinueBtn>
                    </Centered>
                    </>
                }

                {selectedTab !== 0 &&
                    <nav className="flex items-center justify-center mt-8" aria-label="Progress">
                    <ol role="list" className="flex items-center space-x-5">
                        {steps.map((step) => (
                        <li key={step.number}>
                            {selectedTab > step.number ? (
                            <div onClick={() => setSelectedTab(step.number)} className="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900">
                                <span className="sr-only">{step.number}</span>
                            </div>
                            ) : selectedTab === step.number ? (
                            <div onClick={() => setSelectedTab(step.number)} className="relative flex items-center justify-center" aria-current="step">
                                <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                                <span className="h-full w-full rounded-full bg-blue-200" />
                                </span>
                                <span className="relative block h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                                <span className="sr-only">{step.number}</span>
                            </div>
                            ) : (
                            <div onClick={() => setSelectedTab(step.number)} className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                                <span className="sr-only">{step.number}</span>
                            </div>
                            )}
                        </li>
                        ))}
                    </ol>
                    </nav>
                }
                </div>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default OnboardingModal;

const Modal = styled.div<{selectedTab: number}>`
    width: 60vw;
    border-radius: 25px;
    background: white;
    padding: ${props => props.selectedTab === 0 ? "4rem 3rem 5em 3rem;" : "4rem 3rem 5rem 3rem;"};
    border: 2px solid #E5E8F0;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    cursor: auto;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: ${props => props.selectedTab === 0 ? "1.5rem 1.5rem 2.5rem 1.5rem;" : "2.5rem 3rem 2.5rem 3rem;"};
    }
`

const ModalBackground = styled.div<{selectedTab: number, mobile: boolean}>`
    width: 100%;
    height: 100vh;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: ${props => (props.selectedTab === 0) ? "center" : props.mobile ? "flex-start" : "center"};
    padding-top: ${props => (props.selectedTab === 0) ? "0" : props.mobile ? "1rem" : "0"};
    padding-bottom: ${props => (props.selectedTab === 0) ? "0" : props.mobile ? "8rem" : "0"};
    cursor: pointer;
    overflow: scroll;
        &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: black;
    @media (max-width: 768px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
`

const ModalTitle = styled.h2`
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
    @media (max-width: 1023px) {
        font-size: 1.5rem;
        line-height: 1.25;
        margin-bottom: 0.75rem;
    }
`

const ModalDescription = styled.p`
    width: 85%;
    text-align: center;
    font-weight: 500;
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 0.85rem;
        margin-bottom: 0rem;
    }
`

const Tabs = styled.div<{justifyContent: string}>`
    width: 100%;
    display: flex;
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: ${props => props.justifyContent};
`

const Tab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.25rem 0.5rem 0.25rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        background: #E9EDF5;
    }
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
`

const EstimatedTime = styled.p`
    margin-top: 1vh;
    font-size: 1rem;
    color: #798094;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const CloseIcon = styled.button<{selectedTab: any}>`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: 1rem;
    }
`

const BackArrow = styled.button<{selectedTab: any}>`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 0rem;
        left: 0rem;
    }
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        margin-top: 3rem;
        padding: 0rem 5rem 0rem 5rem;
        height: 3rem;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        background-size: 110%;
        background-position-x: -1rem;
        transition: all 0.4s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            transform: scale(0.95);
            box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
        }
        @media (max-width: 1023px) {
            font-size: 1rem;
            padding: 0;
            width: 100%;
        }
`

const SkipBtn = styled.button`
    margin-top: 2.5rem;
    color: #798094;
    font-weight: 700;
`

const GifContainer = styled.div`
    overflow: visible;
    @media (max-width: 1023px) {
        margin-top: 2rem;
    }
`