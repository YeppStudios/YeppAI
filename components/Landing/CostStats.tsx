import styled from "styled-components";
import Centered from "../Centered";
import Image from "next/image";
import costImage from "../../public/images/money.png"
import mobileComparisonImage from "../../public/images/mobileComparisonImage.png"
import pieChart from "../../public/images/pieChart.png"
import ColorfulText from "../Common/ColorfulText";
import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";

const ContextSection = () => {
    const [mobile, setMobile] = useState(false);
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
          setMobile(true);
        }
      }, []);
    return (
        <Centered>
            <Containers>
                <SlideBottom>
                <BottomContainer>
                    <BottomContainerTitle>Asystent generuje treści średnio <ColorfulText>98% taniej</ColorfulText></BottomContainerTitle>
                    <Table>
                    {!mobile &&
                   <ComparisonTitles>
                        <ComparisonTitle>Copywriter</ComparisonTitle>
                        <ColorfulText><ComparisonTitle>Asystent</ComparisonTitle></ColorfulText>
                    </ComparisonTitles>                        
                    }
                    {!mobile ?
                    <ComparisonContainer>
                        <TableHeader>150 słów</TableHeader>
                        <TableHeader>Artykut SEO</TableHeader>
                        <TableHeader>Mail sprzedażowy</TableHeader>
                        <Stat>30 zł</Stat>
                        <Stat>60 zł</Stat>
                        <Stat>40 zł</Stat>
                        <Stat>40 <ColorfulText>gr</ColorfulText></Stat>
                        <Stat>80 <ColorfulText>gr</ColorfulText></Stat>
                        <Stat>10 <ColorfulText>gr</ColorfulText></Stat>
                    </ComparisonContainer>              
                    :
                    <MobileComparisonImage>
                        <Image style={{ width: "100%", height: "auto" }}  src={mobileComparisonImage} alt={'illustration'}></Image> 
                    </MobileComparisonImage>   
                    }
   
                    </Table>
                </BottomContainer>
                </ SlideBottom>
            </Containers>
        </Centered>
    )

}

export default ContextSection;


const Containers = styled.div`
    display: flex;
    width: 80vw;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        width: 95vw;
    }
`

const BottomContainer = styled.div`
    width: 80vw;
    padding: 2rem 0 3rem 2rem;
    background-color: #F0F3F8;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        padding: 2rem 2rem 3rem 2rem;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
`

const BottomContainerTitle = styled.h2`
    font-size: 6vh;
    font-weight: 700;
    text-align: center;
    width: 60%;
    margin-bottom: 2rem;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 4.5vh;
        line-height: 1.4;
        margin-left: 0;
    }
`

const Table = styled.div`
   width: 100%;
   display: flex;
   @media (max-width: 1023px) {
    flex-wrap: wrap;
    justify-content: center;
}
`
const ComparisonContainer = styled.div`
    height: 60%;
    flex: 1;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 0.6fr 1.2fr 1.2fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". . ."
    ". . ."
    ". . ."; 
    @media (max-width: 1023px) {
        height: auto;
        display: flex;
        flex-wrap: wrap;
    }
`

const ComparisonTitles = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    width: 25%;
    @media (max-width: 1023px) {
        width: 100%;
        flex-wrap: nowrap;
    }
`

const ComparisonTitle  = styled.h2`
    font-size: 1.75vw;
    margin-left: 2rem;
    font-weight: 700;
    width: 100%;
    height: 1%;
    @media (max-width: 1023px) {
        width: 40%;
        font-size: 1rem;
        white-space: nowrap;
        margin-left: 0rem;
    }
`

const TableHeader = styled.p`
    font-weight: 500;
    margin-top: 0.7rem;
    font-size: 1.2vw;
`

const Stat = styled.p`
    font-weight: 700;
    margin-top: 0.7rem;
    font-size: 2vw;
`

const MobileComparisonImage = styled.div`
    width: 100%;
    height: auto;
`