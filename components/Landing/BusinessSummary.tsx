import { useEffect, useState } from "react";
import styled from "styled-components";
import lighbulb from "../../public/images/lighbulb.png";
import time from "../../public/images/time.png";
import team from "../../public/images/team.png";
import guide from "../../public/images/guide.png";
import lowprice from "../../public/images/low-price.png";
import whiteboard from "../../public/images/whiteboard.png"
import Image from "next/image";
import proSummaryBackground from "../../public/images/testimonialsBackground.png";
import longMobileBg from "../../public/images/longMobileBg.png";

interface SectionWithBackground {
    image: any,
    mobileBackground: any
  }
  interface CustomColor {
    color: string
  }
  

const ProFunctionalities = (props: {type: string}) => {

    const [mobile, setMobile] = useState(true);

  
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }
    }, []);


    return (
        <Container image={proSummaryBackground} mobileBackground={longMobileBg}>
            <MediumFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={lowprice} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Zredukować wydatki
                </FeatureTitle>
                <Description color="black">Tańsza obsługa klienta dzięki chatowi, marketing i copywriting- kreatorowi treści, szybszy = tańszy dostęp do danych firmy.</Description>
            </MediumFeature>
            <BigFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={whiteboard} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Poprawić kompetencje marketingowe
                </FeatureTitle>
                <Description color="black">Wersja Biznesowa zapewni twojej firmie narzędzie marketingowe, które zwiększy efektywność tworzenia treści dzięki wiedzy o twojej działalności.</Description>
            </BigFeature>
            <SmallFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={time} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Zwiększyć produktywność
                </FeatureTitle>
                <Description color="black">Firmowe AI zwiększa efektywność pracy podając łatwo przyswajalne informacje, treści oraz pomysły.</Description>
            </SmallFeature>
            <BigFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={lighbulb} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Wpłynąć na innowacyjność firmy
                </FeatureTitle>
                <Description color="black">Praca z własnym firmowym narzędziem AI pomoże nie tylko zminimalizować powtarzalną pracę, ale przede wszystkim zapewni materiały na burze mózgów.</Description>
            </BigFeature>
            <MediumFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={team} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Uefektywnić codzienną komunikację zespołów
                </FeatureTitle>
                <Description color="black">Asystent komponuje proste polecenia i potrafi interpretować te skomplikowane.</Description>
            </MediumFeature>
            <SmallFeature>
                <TopFeatureRow>
                <IconContainer>
                    <Image style={{ width: "100%", height: "auto" }}  src={guide} alt={'icon'}></Image> 
                </IconContainer>
                </TopFeatureRow>
                <FeatureTitle>
                    Wspierać pracowników
                </FeatureTitle>
                <Description color="black">Własny model AI z odpowiednimi danymi jest istną firmową encyklopedią.</Description>
            </SmallFeature>
        </Container>
    )
}

export default ProFunctionalities;

const Container = styled.div<SectionWithBackground>`
    background-image: url(${props => props.image.src});
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    margin-left: -8vw;
    padding: 10vh 8vw 10vh 8vw;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    @media (max-width: 1023px) {
    width: 100vw;
    margin-left: 0vw;
    padding: 5vh 0 10vh 0;
    background-size: 100%;
    background-image: none;
    }
`
const TopFeatureRow = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". ."; 
`

const SmallFeature = styled.div`
    width: 26%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh 3vh 3vh 3vh;
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23), -2px -2px 4px #FAFBFF;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
        width: 90vw;  
        margin-bottom: 2vh;
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
        box-shadow: -2px 2px 5px rgba(101, 120, 248, 0.6), 4px -4px 5px rgba(100, 181, 255, 0.6);
    }
    &:hover {
        transform: scale(0.95);
    }
`

const Description = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 1vw;
    width: 95%;
    text-align: left;
    margin-top: 1.5vh;
    @media (max-width: 1023px) {
        margin-top: 0.5rem;
        font-size: 2.4vh;
        width: 100%;
    }
`


const MediumFeature = styled.div`
    width: 31%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh 3vh 3vh 3vh;
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23), -2px -2px 4px #FAFBFF;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
        width: 90vw;  
        margin-bottom: 2vh;
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
        box-shadow: -2px 2px 5px rgba(101, 120, 248, 0.6), 4px -4px 5px rgba(100, 181, 255, 0.6);
    }
    &:hover {
        transform: scale(0.95);
    }
`
const BigFeature = styled.div`
    width: 40%;    
    background: white;
    margin: 0.5%;
    border-radius: 15px;
    padding: 3vh;
    transition: all 0.4s ease;
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23), -2px -2px 4px #FAFBFF;
    cursor: pointer;
    @media (max-width: 1023px) {
        margin-bottom: 2vh;
        width: 90vw;  
        padding: 4vh 4vh 5vh 4vh;
        height: auto;
        box-shadow: -2px 2px 5px rgba(101, 120, 248, 0.6), 4px -4px 5px rgba(100, 181, 255, 0.6);
    }
    &:hover {
        transform: scale(0.95);
    }
`

const IconContainer = styled.div`
    width: 2.5vw;
    height: 2.5vw;
    @media (max-width: 1023px) {
        width: 7vh;
        height: 7vh;
    }
`

const FeatureTitle = styled.div`
    font-size: 1.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    color: #1C1C1C;
    margin-top: 1.5vh;
    @media (max-width: 1023px) {
        font-size: 3vh;
        margin-top: 2vh;
    }
`
