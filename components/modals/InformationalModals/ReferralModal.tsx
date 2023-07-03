import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import Image from "next/image";
import api from "@/pages/api";
import linkBackground from "../../../public/images/linkBackground.png";
import { useRouter } from 'next/router';
import { BsFiles, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";

interface Background {
    background: any
}

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}


const ReferralModal = (props: {onClose: any, showDescription: boolean}) => {

    const [notification, setNotification] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchLink = async () => {
            const { data } = await api.get('/get-refferal-link', {
                headers: {
                  authorization: token
                }
              })
              setLink(data.link)
        }
        fetchLink();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(link)
          .then(() => {
            setNotification("Copied!");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          })
          .catch(err => {
            setNotification("Failed to copy text.");
            console.error(err);
          });
      };

    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            <Centered>
                <Title>Share & Earn</Title>
            </Centered>
            {props.showDescription &&
            <Centered>
               <Description>Reccommend Yepp your friends and whenever they buy a subscription both of you will receive <b>30 000ml of free elixir</b>!</Description>
            </Centered>
            }
            <Centered>
                <LinkTitle>Your special referral link:</LinkTitle>
            </Centered>
            <Centered>
            <LinkImageSection background={linkBackground}>
                <LinkContainer>
                    {notification &&
                        <Notification>
                            {notification}
                        </Notification>
                    }
                    <Link>{link}</Link>
                    <CopyButton onClick={handleCopy}>
                        <BsFiles style={{width: "100%", height: "100%"}}/>
                    </CopyButton>
                </LinkContainer>
            </LinkImageSection>
            </Centered>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default ReferralModal;


const ModalContainer = styled.div`
    width: 70vw;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    color: black;
    font-weight: 500;
    backdrop-filter: blur(25px);
    cursor: auto;
    border: 2px solid rgba(255, 255, 255, 0.15);
    overflow: hidden;
    padding: 6vh 3.5vw 10vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;
    }
`

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
    margin-bottom: 2vh;
    color: white;
    width: 90%;
    font-weight: 600;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    color: black;
    @media only screen and (min-width: 1023px) {
        font-size: 6vh;
        line-height: 7vh;
        margin-bottom: 1vh;
        width: 100%;
    }
`


const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: #0D0E16;
    padding: 4vh 4vh 5vh 4vh;
    border-radius: 25px;
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.55);
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.97);
    }
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const Description = styled.div`
    font-size: 2vh;
    margin-top: 3vh;
    text-align: center;
    width: 60%;
    @media (max-width: 1023px) {
        width: 95%;
        margin-top: 2vh;
        font-size: 1.2rem;
    }
`

const LinkTitle = styled.p`
    margin-top: 7vh;
    font-size: 2vh;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const PsText = styled.p`
    margin-top: 2vh;
`

const LinkImageSection = styled.div<Background>`
    width: auto
    height: auto;
    padding: 2.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${props => props.background.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    width: 100%;
    margin-top: 2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1023px) {
        width: 95%;
    }
`

const LinkContainer = styled.div`
    width: 100%;
    height: 4vh;
    background: #0D0E16;
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 5vh;
    @media (max-width: 1023px) {
        padding: 4vh 3vh 4vh 3vh;
        white-space: nowrap;
    }
`

const Link = styled.p`
    font-size: 2.5vh;
    max-width: 92%;
    overflow: scroll;
    white-space: nowrap;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media (max-width: 1023px) {
        max-width: 85%;
    }
`

const CopyButton = styled.button`
    width: 3vh;
    height: 3vh;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.9);
    }
`

const Notification = styled.div`
    position: absolute;
    margin-bottom: 8vh;
    font-size: 0.7vw;
    margin-left: 36.7vw;
    padding: 0.5vw 1vw 0.5vw 1vw;
    border-radius: 10px;
    color: white;
    background-color: #0D0E16;
    @media (max-width: 1023px) {
        padding: 1vh 2vh 1vh 2vh;
        font-size: 1.7vh;
        margin-left: 45vw;
        margin-bottom: 10vh;
    }
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        width: 1rem;
        height: 1rem;
    }
`