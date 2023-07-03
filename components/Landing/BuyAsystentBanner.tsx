import styled from "styled-components";
import Centered from "../Centered";
import bannerBg from "../../public/images/blueAbstractBg.png";
import { useRouter } from "next/router";
import wandIcon from "../../public/images/magicWand.png";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}

interface Button {
    backgroundColor: string,
    color: string,
}



const BuyAsystentBanner = () => {

    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
          }
    }, []);

    return (
        <Centered>
            <BuyBanner image={bannerBg}>
                <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                    <div>
                        <BannerTitle>Przekonaj się sam!</BannerTitle>
                        {!mobile &&
                        <BannerDescription>Przygotowaliśmy dla Ciebie specjalną ofertę. <br /> Zacznij używać AI póki jest jeszcze wcześnie.</BannerDescription>
                        }
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                <PlanContainer backgroundColor="black" color="white" width="26vw">
                    <PlanTitle><PlanTitleText>Assistant</PlanTitleText> <span role="img" aria-label="diamond">🖋️</span></PlanTitle>
                    <BriefDescription>Bezcenna wartość dla indywidualnych użytkowników.</BriefDescription>
                    <Price>99,99zł<Monthly>/msc</Monthly></Price>
                    <Note>Subskrypcja płatna co miesiąc od momentu zakupu.</Note>
                    <BuyButton id="order-assistant" onClick={() => router.push("/pricing?type=individual")} backgroundColor="white" color="black">Dowiedz się więcej</BuyButton>
                </PlanContainer>       
                </div>         
            </BuyBanner>
        </Centered>

    )
}

export default BuyAsystentBanner;

const BuyBanner = styled.div<{image: any}>`
    width: 100%;
    border-radius: 25px;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: grid; 
    grid-template-columns: 1.4fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    padding: 3rem 5rem 3rem 5rem;
    color: white;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        height: auto;
        padding: 3vh 5vw 3vh 5vw;
        margin-bottom: 10vh;
    }
`

const BannerTitle = styled.h2`
    font-weight: 700;
    font-size: 3.5vw;
    margin-top: -2rem;
    @media (max-width: 1023px) {
        font-size: 2rem;
        margin-top: 0;
    }
`

const BannerDescription = styled.p`
    font-weight: 500;
    font-size: 1.2vw;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: #0D0E16;
    padding: 4vh;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        height: auto;
        width: 80vw;
        margin-top: 4vh;
    }
`

const PlanTitle = styled.div`
    font-size: 2.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    display: flex;
    @media (max-width: 1023px) {
        font-size: 4vh;
    }
`

const PlanTitleText = styled.p`
    margin-right: 1vw;
    @media (max-width: 1023px) {
        margin-right: 3vw;
    }
`


const BriefDescription = styled.p`
    font-family: 'Lato', sans-serif;
    margin-top: 1vh;
    width: 85%;
    font-size: 1.2vw;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const Price = styled.div`
    font-size: 2.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    align-items: flex-end;
    display: flex;
    margin-top: 3vh;
    @media (max-width: 1023px) {
        font-size: 5.5vh;
    }
`

const Note = styled.p`
    text-align: left;
    font-size: 1vw;
    color: #818FB9;
    max-width: 85%;
    @media (max-width: 1023px) {
        font-size: 0.7rem;
    }
`

const BuyButton = styled.button<Button>`
    background-color: ${props => props.backgroundColor || 'black'};
    color: ${props => props.color || 'white'};
    padding: 0.75vw 2.5vw 0.75vw 2.5vw;
    border-radius: 15px;
    margin-top: 3.5vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 1.2vw;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        padding: 1.2vh 5vh 1.2vh 5vh;
        font-size: 1rem;
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const BtnIcon = styled.div`
    width: auto;
    height: 4vh;
`

const Monthly = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
    margin-left: 0.5vw;
`