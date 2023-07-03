import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Centered from "@/components/Centered";
import {  BsXLg, BsChevronLeft } from "react-icons/bs";
import BackBtn from "../../Common/BackBtn";
import BackBtnIcon from "../../Common/BackBtnIcon";
import SlideBottom from "../../Animated/SlideBottom";
import marketerIcon from "../../../public/images/marketerIcon.png";
import copywriterIcon from "../../../public/images/copywriterIcon.png";
import chatIcon from "../../../public/images/chatIcon.png";
import Image from "next/image";
import { useRouter } from "next/router";
import tickIcon from "../../../public/images/tickGreen.png";
import xIcon from "../../../public/images/xxIcon.png";
import api from "@/pages/api";

const SurveyModal = (props: {onClose: any}) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [selectedAssistant, setSelectedAssistant] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth <= 1023) {
            setMobile(true);
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

    const selectOption = async (option: boolean) => {
        setLoading(true);
        try {
            localStorage.setItem('display_survey', "false");
            await api.patch("/updateOnboardingData", {
                englishPanel: option
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            )
            props.onClose();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const closeModal = () => {
        localStorage.setItem('display_survey', "false");
        props.onClose();
    }


    return (
        <ModalBackground selectedAssistant={selectedAssistant} mobile={mobile}>
            <SlideBottom>
            <Modal selectedAssistant={selectedAssistant}>
                {selectedAssistant &&
                    <BackArrow selectedTab={selectedTab}>   
                        <BackBtn onClick={() => setSelectedAssistant("")}>
                            <BackBtnIcon>
                                <BsChevronLeft style={{ width: "250%", height: "auto" }} />
                            </BackBtnIcon> 
                        </BackBtn>
                    </BackArrow>
                } 
                <CloseIcon onClick={closeModal} selectedTab={selectedTab}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <div>
                {!selectedAssistant &&
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem"}}>
                <Centered>
                    <p className="text-5xl mb-6">🌎</p>
                </Centered>
                <Centered>
                    <p className="text-xl font-medium text-gray-500">QUICK QUESTION</p>
                </Centered>
                <Centered>
                        <ModalTitle>Question</ModalTitle>
                </Centered>
                    <Centered>
                        <ButtonsContainer>
                            <Tab onClick={() => selectOption(true)}>
                                <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                                <AssistantIcon><Image style={{ width: "auto", height: "100%" }} src={tickIcon} alt={'logo'}></Image></AssistantIcon>
                                    Yes
                                </div>
                            </Tab>
                            <Tab onClick={() => selectOption(false)}>
                                <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                                <AssistantIcon><Image style={{ width: "auto", height: "100%" }} src={xIcon} alt={'logo'}></Image></AssistantIcon>
                                   No
                                </div>
                            </Tab>
                            <Centered>
                            </Centered>
                        </ButtonsContainer>
                    </Centered>
                </div>
                }
                </div>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default SurveyModal;

const Modal = styled.div<{selectedAssistant: string}>`
    width: 45vw;
    border-radius: 25px;
    background: white;
    padding: ${props => !props.selectedAssistant ? "2rem 3rem 4em 3rem;" : "2rem 3rem 4rem 3rem;"};
    border: 2px solid #E5E8F0;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    cursor: auto;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: ${props => !props.selectedAssistant ? "1.5rem 1.5rem 2.5rem 1.5rem;" : "2.5rem 3rem 2.5rem 3rem;"};
    }
`

const ModalBackground = styled.div<{selectedAssistant: string, mobile: boolean}>`
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
    align-items: ${props => (!props.selectedAssistant) ? "center" : props.mobile ? "flex-start" : "center"};
    padding-top: ${props => (!props.selectedAssistant) ? "0" : props.mobile ? "1rem" : "0"};
    padding-bottom: ${props => (!props.selectedAssistant) ? "0" : props.mobile ? "8rem" : "0"};
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
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
    @media (max-width: 1023px) {
        font-size: 1.5rem;
        line-height: 1.25;
        margin-bottom: 0.75rem;
    }
`

const Tab = styled.div`
    padding: 1rem 1.75rem 1rem 1.75rem;
    width: 100%;
    font-weight: 700;
    margin: 0.5rem 0.25rem 0.5rem 0.25rem;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
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

const ButtonsContainer = styled.div`
    width: 70%;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        width: 100%;
        margin-top: 2rem;
    }
`

const AssistantIcon = styled.div`
    height: 1.2rem;
    margin-right: 1rem;
    @media (max-width: 1023px) {
        height: 1rem;
    }
`