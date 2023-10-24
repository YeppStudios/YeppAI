import SlideBottom from "@/components/Animated/SlideBottom";
import Centered from "@/components/Centered";
import ModalBackground from "@/components/Modals/common/ModalBackground";
import { useState } from "react";
import { BsMic, BsPerson, BsXLg } from "react-icons/bs";
import { HiCheck } from "react-icons/hi";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";

const ChoiceModal = (props: {onClose: any, setNextModal: any}) => {

    const [step, setStep] = useState(0);

    return (
        <ModalBackground onClose={props.onClose} closeable={true}>
            <SlideBottom>
            <Container onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                <MdOutlineClose style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            {step === 0 &&
                <div>
                    <Title>What to create?</Title>
                    <ChoiceContainer>
                        <Choice onClick={() => setStep(1)}>
                            <div>
                                <ChoiceIcon><BsPerson style={{width: "100%", height: "120%"}} /></ChoiceIcon>
                                <ChoiceTitle>Persona</ChoiceTitle>
                            </div>
                        </Choice>
                        <Choice onClick={() => props.setNextModal("tone")}>
                            <div>
                                <ChoiceIcon><BsMic style={{width: "100%", height: "100%"}} /></ChoiceIcon>
                                <ChoiceTitle>Tone</ChoiceTitle>
                            </div>
                        </Choice>
                    </ChoiceContainer>
                </div>
            }
            {step === 1 &&
                <div>
                    <Title>Do you know your persona?</Title>
                    <ChoiceContainer>
                        <Choice onClick={() => props.setNextModal("persona-form")}>
                            <div>
                                <ChoiceIcon><IoClose style={{width: "100%", height: "105%"}} /></ChoiceIcon>
                                <ChoiceTitle>No</ChoiceTitle>
                                <ChoiceDescription>generate it with AI</ChoiceDescription>
                            </div>
                        </Choice>
                        <Choice onClick={() => props.setNextModal("persona-description")}>
                            <div>
                                <ChoiceIcon><HiCheck style={{width: "100%", height: "100%"}} /></ChoiceIcon>
                                <ChoiceTitle>Yes</ChoiceTitle>
                                <ChoiceDescription>your own description</ChoiceDescription>
                            </div>
                        </Choice>
                    </ChoiceContainer>
                </div>
            }
            </Container>
            </SlideBottom>
        </ModalBackground>
    )
}

export default ChoiceModal;

const Container = styled.div`
    width: 37rem;
    padding: 2.5rem 0rem 0rem 0rem;
    background: white;
    position: relative;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 4vh 3vw 2vh 3vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
    }
`

const Title = styled.h2`
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: black;
    @media (max-width: 1023px) {
        font-size: 1.75rem;
    }
`
const ChoiceContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        margin-top: 1.25rem;
    }
`

const Choice = styled.div`
    width: 100%;
    padding-bottom: 1rem;
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    
    &:hover {
        background: #F6F6FB;
    }
    &:nth-child(1) {
        &:hover {
            border-top-right-radius: 25px;
            border-bottom-left-radius: 25px;
        }
    }
    &:nth-child(2) {
        &:hover {
            border-top-left-radius: 25px;
            border-bottom-right-radius: 25px;
        }

    }
`


const ChoiceTitle = styled.h3`
    font-size: 1.25rem;
    width: 100%;
    font-weight: 500;
    text-align: center;
    color: black;
    margin-top: 1rem;
`

const ChoiceIcon = styled.div`
    width: 100%;
    height: 3rem;
    color: black;
`

const ChoiceDescription = styled.p`
    font-size: 1rem;
    color: #cbd5e1;
    text-align: center;
    margin-top: 0.5rem;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
`