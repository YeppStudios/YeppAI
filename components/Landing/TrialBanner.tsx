import styled from "styled-components";
import Centered from "../Centered";
import analyseImage from "../../public/images/analyseImage.jpg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import { useEffect, useState } from "react";
import giftIcon from "../../public/images/giftIcon.png";

const Banner = () => {

    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, []);
    
    return (
        <Centered>
        <BannerContainer>
                <TrialIcon>
                    <Image style={{ width: "auto", height: "100%" }}  src={giftIcon} alt={'nofification-icon'}></Image> 
                </TrialIcon>
                <div>
                    <TrialInfoTitle>Claim free 7 days of trial for free!</TrialInfoTitle>

                </div>
                <StartTrialContainer>
                    <TrialBtn onClick={() => router.push("/register?registration=true&trial=true")}>Start free trial</TrialBtn>
                    <Place>generate up to ~10 000 words</Place>
                </StartTrialContainer>
        </BannerContainer>
        </Centered>
    )
}

export default Banner;

const BannerContainer = styled.div`
    width: 100%;
    background-color: #0D0E16;
    padding: 1.5rem 2rem 1.5rem 2rem;
    margin-top: 4vh;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    margin-bottom: 2vh;
    display: grid; 
    grid-template-columns: 0.15fr 2fr 0.75fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". . ."; 
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`


const TrialIcon = styled.div`
    width: 3.5rem;
    height: 3.5rem;
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

const TrialInfoTitle = styled.div`
    font-size: 1.75rem;
    color: white;
    font-weight: 700;
    margin-left: 1.75rem;
    margin-top: -0.2rem;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        margin-left: 0;
        margin-top: 0;
        text-align: center;
    }
`
const StartTrialContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        justify-content: center;
    }
`

const TrialBtn = styled.button`
    width: 15rem;
    margin-left: 2.5rem;
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
    }
`

const Place = styled.div`
    color: white;
    font-size: 0.75em;
    font-weight: 500;
    margin-top: 1rem;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
    }
`
