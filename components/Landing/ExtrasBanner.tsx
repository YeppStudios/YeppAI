import styled from "styled-components";
import Centered from "../Centered";
import bannerBg from "../../public/images/conference2.png";
import { useRouter } from "next/router";
import wandIcon from "../../public/images/magicWand.png";
import Image from "next/image";

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}

interface Button {
    backgroundColor: string,
    color: string,
}



const ExtrasBanner = () => {

    const router = useRouter();

    return (
        <Centered>
            <Banner image={bannerBg}>
                <div style={{display: "flex", alignItems: "center", flexWrap: "wrap", width: "100%"}}>
                    <div>
                        <BannerTitle>Zrób to raz a dobrze.</BannerTitle>
                    </div>
                </div>
                <Extras>    
                    <Extra>
                        <ExtraTitle>Audyt identyfikacyjny</ExtraTitle>
                        <ExtraDescription>Dokładne zidentyfikowanie obszarów, w których firma może zaoszczędzić czas i koszty.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                    <Extra>
                        <ExtraTitle>Audyt & Szkolenie</ExtraTitle>
                        <ExtraDescription>Przeprowadzenie audytu identyfikacyjnego poprzedzającego szkolenie wdrożeniowe.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                    <Extra>
                        <ExtraTitle>Szkolenie wdrożeniowe</ExtraTitle>
                        <ExtraDescription>Przeprpwadzenie szkolenia zakresu funkcjonalności oraz ich biznesowych zastosowań.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                    <Extra>
                        <ExtraTitle>Konfiguracja modelu AI</ExtraTitle>
                        <ExtraDescription>Zapewnienie prowadzenia podczas konfiguracji modelu Asystenta Biznes.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                    <Extra>
                        <ExtraTitle>Strategia użycia</ExtraTitle>
                        <ExtraDescription>Kreacja strategii marketingowo-sprzedażowej z zastosowaniem Asystenta Biznes.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                    <Extra>
                        <ExtraTitle>Analiza efektywności</ExtraTitle>
                        <ExtraDescription>Konsultacja efektywności użytkowania Asystenta Biznes w Twojej firmie.</ExtraDescription>
                        <BuyBtn>Zróbmy to!</BuyBtn>
                    </Extra>
                </Extras>         
            </Banner>
        </Centered>

    )
}

export default ExtrasBanner;

const Banner = styled.div<{image: any}>`
    width: 100%;
    height: auto;
    border-radius: 25px;
    color: white;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 5rem 3rem 5rem 3rem;
    box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.25);
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        height: auto;
        padding: 3vh 5vw 3vh 5vw;
    }
`

const BannerTitle = styled.h2`
    font-weight: 700;
    font-size: 3rem;
    margin-top: -2rem;
    @media (max-width: 1023px) {
        margin-top: 0rem;
        font-size: 2rem;
    }
`

const Extras = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: space-between;
    flex-wrap: wrap;
    margin-top: 2rem;
`

const Extra = styled.div`
    width: 22.5rem;
    background-color: rgba(40, 40, 120, 0.4);
    backdrop-filter: blur(5px);
    margin: 0 0.2rem 0 0.2rem;
    border-radius: 15px;
    margin-top: 0.4vw;
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23);
    padding: 1.5rem 1.2rem 1.75rem 1.2rem;
    @media (max-width: 1023px) {
        width: 100%;
        margin-bottom: 0.4rem;
    }
`

const ExtraTitle = styled.div`
    font-size: 1.75rem;
    font-weight: 700;
`

const ExtraDescription = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
`

const BuyBtn = styled.button`
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 15px;
    background-color: white;
    color: black;
    font-weight: 700;
    margin-top: 1.4rem;
    transition: all 0.4s ease;
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    &:hover {
        transform: scale(0.95);

        background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);

    }
`