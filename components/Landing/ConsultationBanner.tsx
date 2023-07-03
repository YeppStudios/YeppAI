import styled from "styled-components";
import Centered from "../Centered";
import analyseImage from "../../public/images/analyseImage.jpg";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";

const Banner = () => {

    const router = useRouter();

    return (
        <SlideBottom>
        <Centered>
            <BannerContainer>
                <ConsultationImg background={analyseImage}>
                </ConsultationImg>
                <TextConatiner>
                    <div>
                    <Title>Przekonaj się jak Twoja firma może zyskać z AI</Title>
                    <Description>Audyt identyfikujacy procesy, w których sztuczna inteligencja jest w stanie zoptymalizować Twoją firmę czasowo, kosztowo i jakościowo!</Description>
                    </div>
                    <BottomContainer>
                    <PriceContainer><PriceCrossed>7500,00 zł</PriceCrossed><Price>4750,00 zł</Price></PriceContainer>
                    <Link href="/order/audit">
                        <ReservationBtn id="order-consultation">
                            Zróbmy to!
                        </ReservationBtn>
                    </Link>
                    </BottomContainer>
                </TextConatiner>
            </BannerContainer>
        </Centered>
        </SlideBottom>
    )
}

export default Banner;

const BannerContainer = styled.div`
    width: 100%;
    background-color: #0D0E16;
    padding: 2rem 3rem 2.5rem 2rem;
    margin-top: 6vh;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    border-radius: 25px;
    margin-bottom: 2vh;
    display: flex; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". . ."; 
    justify-content: space-between;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        margin-top: 4vh;
        justify-content: center;
        padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    }
`

const ConsultationImg = styled.div<{background: any}>`
    width: 35rem;
    height: 100%;
    border-radius: 25px;
    overflow: hidden;
    background-image: url(${props => props.background.src});
    background-size: cover;
    background-position: center;
    color: #6578F8;
    position: relative;
    @media (max-width: 1023px) {
        width: 100%;
        height: 10rem;
    }
`

const TextConatiner = styled.div`
    display: flex;
    flex-wrap: wrap;
`


const Title = styled.div`
    font-size: 3vw;
    color: white;
    line-height: 1.3;
    font-weight: 700;
    margin-top: 0.5rem;
    width: 85%;
    margin-left: 2.4rem;
    @media (max-width: 1023px) {
        font-size: 2rem;
        margin-bottom: 1rem;
        margin-left: 0;
        margin-top: 1.5rem;
        text-align: center;
        width: 100%;
    }
`

const Description = styled.div`
    font-size: 1.2vw;
    margin-top: 1rem;
    color: white;
    font-weight: 500;
    width: 70%;
    margin-left: 2.4rem;
    @media (max-width: 1023px) {
        font-size: 1rem;
        text-align: center;
        margin-left: 0;
        width: 100%;
    }
`

const ReservationBtn = styled.button`
    width: 18vw;
    font-size: 1.2vw;
    margin-left: 2.4rem;
    background-color: white;
    margin-top: 0.5rem;
    color: black;
    padding: 0.5rem 2rem 0.5rem 2rem;
    border-radius: 15px;
    border: solid 3px transparent;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    font-weight: 700;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        margin-left: 0rem;
        margin-top: 0.5rem;
        width: 65vw;
        font-size: 1.2rem;
    }
`
const BottomContainer = styled.div`
    display: flex; 
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        margin-top: 3rem;
        justify-content: center;
    }
`

const Price = styled.div`
    color: white;
    font-size: 1.7vw;
    margin-left: 0.7rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    text-align: right;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
        text-align: center;
        margin-left: 0rem;
        font-size: 1.5rem;
        width: 100%;
    }
`
const PriceCrossed = styled.div`
    color: white;
    font-size: 1.25vw;
    text-decoration: line-through;
    margin-bottom: 0.4rem;
    text-decoration-color: #FF4646;
    margin-left: 0rem;
    font-weight: 700;
    text-align: right;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
        text-align: center;
        margin-left: 0;
        font-size: 1rem;
        margin-bottom: 0rem;
    }
`
const PriceContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
        margin-bottom: 0.4rem;
        flex-wrap: wrap;
    }
`