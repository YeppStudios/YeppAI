import styled from "styled-components";
import Centered from "../Centered";
import analyseImage from "../../public/images/analyseImage.jpg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import ColorfulText from "../Common/ColorfulText";
import giftIcon from "../../public/images/giftIcon.png";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import api from "@/pages/api";
const CountdownTimer = dynamic(() => import('@/components/Common/Countdown'));

const Banner = (props: {onClick: any}) => {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, []);

    return (
        <Centered>
            <BannerContainer>
                <div>
                    {mobile ?
                        <BannerTitle>Zostań jedną z <br /><ColorfulText>wybranych firm.</ColorfulText></BannerTitle>
                        :
                        <BannerTitle>Zostań jedną z <ColorfulText>wybranych firm.</ColorfulText></BannerTitle>
                    }

                    <BannerText>Zostań jedną z wybranych firm, które jako <ColorfulText><b>pierwsze w Polsce</b></ColorfulText> będą miały okazję stworzyć firmowych Asystentów AI i zyskaj:</BannerText>
                    <BenefitsList>
                        <Point>+ <ColorfulText><b>Darmową rozmowę</b></ColorfulText> wprowadzającą</Point>
                        <Point>+ <ColorfulText><b>Wczesny dostęp</b></ColorfulText> do platformy</Point>
                        <Point>+ <ColorfulText><b>Gwarancja</b></ColorfulText> najniższej ceny subskrypcji</Point>
                    </BenefitsList>
                </div>
                <SignupContainer>
                <IconContainer>
                <TrialIcon>
                    <Image style={{ width: "auto", height: "100%" }}  src={giftIcon} alt={'nofification-icon'}></Image> 
                </TrialIcon>
                </IconContainer>
                <div>
                <TimerContainer>
                    <TimerTitle>Koniec zapisów za:</TimerTitle>
                    <Timer><b><CountdownTimer targetDate={new Date('2023-06-01')} /></b></Timer>
                </TimerContainer>
                {mobile ?
                    <SignupBtn id="join-business-waitlist" onClick={props.onClick}>Dołącz do listy oczekujących</SignupBtn>
                :
                    <SignupBtn id="join-business-waitlist" onClick={props.onClick}>Dołącz do listy oczekujących</SignupBtn>
                }
                <Disclaimer>Zapisz się do 31 maja, a my postaramy się do Ciebie odezwać, przedstawić ofertę i doprecyzować szczegóły.</Disclaimer>
                </div>
                </SignupContainer>
        </BannerContainer>
        </Centered>
    )
}

export default Banner;

const BannerContainer = styled.div`
    width: 100%;
    background-color: #0D0E16;
    padding: 2.5rem 3rem 3rem 3rem;
    margin-top: 4vh;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    margin-bottom: 2vh;
    display: grid; 
    grid-template-columns: 1.4fr 0.6fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1023px) {
        padding: 2rem 2rem 3rem 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
    }
`

const BannerText = styled.p`
    font-size: 1.2rem;
    color: white;
    font-weight: 500;
    margin-top: 2rem;
    width: 75%;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 1rem;
    }
`

const BenefitsList = styled.ul`
    color: white;
    width: 75%;
    margin-top: 1.5rem;
    font-size: 1.2rem;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 0.95rem;
    }
`

const Point = styled.li`
    margin-top: 0.5rem;
`


const IconContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
        margin-top: 2rem;
        height: 3rem;
    }
`

const TrialIcon = styled.div`
    width: 5rem;
    height: 5rem;
    background: -webkit-linear-gradient(-70deg, #6578F8, #64B5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #6578F8;
    position: relative;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        width: 3rem;
        height: 3rem;
    }
`

const BannerTitle = styled.div`
    font-size: 2.7rem;
    color: white;
    font-weight: 700;
    line-height: 1.2;
    margin-top: -0.2rem;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        margin-left: 0;
        margin-top: 0;
        text-align: center;
        font-size: 1.9rem;
    }
`
const Disclaimer = styled.div`
    color: white;
    font-size: 0.75em;
    margin-top: 0.75rem;
    display: flex;
    width: 22rem;
    justify-content: flex-start;
    @media (max-width: 1023px) {
        justify-content: center;
        width: 100%;
        font-size: 0.65rem;
    }
`

const SignupContainer = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: auto;
    }
`

const TimerContainer = styled.div`
    color: white;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (max-width: 1023px) {
       text-align: center;
       margin-top: 1rem;
       margin-bottom: 0rem;
    }
`

const TimerTitle = styled.p`
    color: white;
    font-size: 1.2rem;
    @media (max-width: 1023px) {
       text-align: center;
    }
`

const Timer = styled.p`
    font-size: 2rem;
    @media (max-width: 1023px) {
       text-align: center;
    }
`
const SignupBtn = styled.button`
    width: 22rem;
    height: 3.5rem;
    background-color: white;
    color: white;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    font-weight: 700;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        margin-left: 0rem;
        margin-top: 1rem;
        width: 100%;
        font-size: 1rem;
        padding: 0;
    }
`