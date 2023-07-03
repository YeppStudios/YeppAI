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
import api from "@/pages/api";
import { set } from "lodash";
import { Loader } from "@/components/Common/Loaders";

const SecondOnboardingStep = (props: {onClose: any}) => {

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

    const handleOpenTab = async (path: string) => {
        console.log(path);
        setLoading(true);
        try {
            await api.patch("/updateOnboardingData", {
                firstChosenCategory: path.substring(1)
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            )
            props.onClose();
            router.push(path);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

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
                <CloseIcon onClick={props.onClose} selectedTab={selectedTab}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <div>
                {!selectedAssistant &&
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem"}}>
                <Centered>
                        <ModalTitle>Tak trzymaj!</ModalTitle>
                </Centered>
                <Centered>
                    <ModalDescription>Wybierz co chcesz zrobić ze swoim pierwszym zasobem wiedzy:</ModalDescription>
                </Centered>
                    <Centered>
                        <ButtonsContainer>
                            <Tab onClick={() => handleOpenTab("/marketing")}>
                                <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                                <AssistantIcon><Image style={{ width: "auto", height: "100%" }} src={marketerIcon} alt={'logo'}></Image></AssistantIcon>
                                   Marketing
                                </div>
                            </Tab>
                            {!mobile &&
                            <Tab onClick={() => handleOpenTab("/copywriting")}>
                            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                                <AssistantIcon><Image style={{ width: "auto", height: "100%" }} src={copywriterIcon} alt={'logo'}></Image></AssistantIcon>
                                    Copywriting
                                </div>
                            </Tab>
                            }
                            <Tab onClick={() => handleOpenTab("/chat")}>
                            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center"}}>
                                <AssistantIcon><Image style={{ width: "auto", height: "100%" }} src={chatIcon} alt={'logo'}></Image></AssistantIcon>
                                    Firmowy Chat AI
                                </div>
                            </Tab>
                            <Centered>
                            <SkipBtn onClick={props.onClose}>
                                    Kontynuuj wgrywanie zasobów
                            </SkipBtn>
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

export default SecondOnboardingStep;

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
    width: 70%;
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

const Tab = styled.div`
    padding: 1rem 1.75rem 1rem 1.75rem;
    width: 100%;
    font-weight: 700;
    margin: 0.5rem 0.25rem 0.5rem 0.25rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
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

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        margin-top: 3rem;
        width: 22rem;
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


const ButtonsContainer = styled.div`
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        width: 100%;
        margin-top: 2rem;
    }
`

const AssistantIcon = styled.div`
    height: 1.5rem;
    margin-right: 1rem;
    @media (max-width: 1023px) {
        height: 1.25rem;
    }
`