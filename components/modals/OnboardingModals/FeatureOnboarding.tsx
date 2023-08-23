import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Centered from "@/components/Centered";
import SlideBottom from "../../Animated/SlideBottom";

const FeatureOnboarding = (props: {onClose: any, title: string, description: string, videoUrl: string}) => {

    const [mobile, setMobile] = useState(false);
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


    return (
        <ModalBackground mobile={mobile}>
            <SlideBottom>
            <Modal>
            <Centered>
                <ModalTitle>{props.title}</ModalTitle>
                </Centered>
                <Centered>
                    <ModalDescription>{props.description}</ModalDescription>
                </Centered>
                <Centered>
                    <div className="w-full aspect-video relative">
                    <iframe className="w-full h-full rounded-xl" allowFullScreen
                        src={props.videoUrl}>
                    </iframe>
                    </div>
                </Centered>
                <Centered>
                    <ContinueBtn onClick={() => props.onClose()}>Continue</ContinueBtn>
                </Centered>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default FeatureOnboarding;

const Modal = styled.div`
    width: 45vw;
    border-radius: 25px;
    background: white;
    padding: 2rem 3rem 4rem 3rem;
    border: 2px solid #E5E8F0;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    cursor: auto;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    }
`

const ModalBackground = styled.div<{mobile: boolean}>`
    width: 100%;
    height: 100svh;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 90%;
    text-align: center;
    font-weight: 500;
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
    margin-top: 0.2rem;
    @media (max-width: 1023px) {
        width: 90%;
        font-size: 0.85rem;
        margin-bottom: 1.5rem;
    }
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        margin-top: 2rem;
        padding: 0rem 7rem 0rem 7rem;
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
