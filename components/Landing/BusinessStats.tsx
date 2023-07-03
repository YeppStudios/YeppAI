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
                <TopContainer>
                    <div>
                        <Centered><Quote>&quot;Wykorzystanie sztucznej inteligencji w biznesie ma potencjał do tworzenia znaczącej wartości i poprawiania doświadczeń klientów.&quot;</Quote></Centered><QuotePerson>~ Andrew Ng</QuotePerson>
                    </div>
                </TopContainer>
                </SlideBottom>
                <MiddleContainers>
                    <LeftMiddleContainer>
                        <Illustration>
                            <Image style={{ width: "auto", height: "100%" }}  src={costImage} alt={'illustration'}></Image> 
                        </Illustration>
                        <LeftMiddleContainerTitle>Koszt nieskutecznej komunikacji w firmie to średnio 40 tys. złotych rocznie.</LeftMiddleContainerTitle>
                    </LeftMiddleContainer>
                    <RightMiddleContainer>
                        {mobile ?
                        <RightMiddleContainerTitle>U firm z chatem stanowi on 75% pierwszego kontaktu z klientem.</RightMiddleContainerTitle>
                        :
                        <RightMiddleContainerTitle>75% pierwszego kontaktu z klientem w firmach posiadajacych chat nastepuje przez jego użycie.</RightMiddleContainerTitle>
                        }
                        <Illustration>
                            <Image style={{ width: "auto", height: "100%" }}  src={pieChart} alt={'illustration'}></Image> 
                        </Illustration>
                    </RightMiddleContainer>
                </MiddleContainers>
                <BottomContainer>
                    <BottomContainerTitle>Asystent generuje treści średnio <ColorfulText>98% taniej</ColorfulText></BottomContainerTitle>
                    <Table>
                    {!mobile &&
                   <ComparisonTitles>
                        <ComparisonTitle>Copywriter</ComparisonTitle>
                        <ColorfulText><ComparisonTitle>Asystent Business</ComparisonTitle></ColorfulText>
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

const TopContainer = styled.div`
    width: 100%;
    height: 15vw;
    background-color: #E9ECF1;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1023px) {
       height: auto;
       padding: 2rem 1.5rem 2rem 1.5rem;
    }
`

const MiddleContainers = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
     }
`

const LeftMiddleContainer = styled.div`
    width: calc(50% - 0.25rem);
    height: 15vw;
    border-radius: 10px;
    background-color: #E9ECF1;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 1023px) {
        width: 100%;
        height: 10rem;
     }
`

const RightMiddleContainer = styled.div`
    width: calc(50% - 0.25rem);
    height: 15vw;
    border-radius: 10px;
    background-color: #E9ECF1;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3vw 0 3vw;
    @media (max-width: 1023px) {
        width: 100%;
        padding: 0 2rem 0 2rem;
        height: 10rem;
     }
`

const BottomContainer = styled.div`
    width: 100%;
    padding: 2rem 0 3rem 2rem;
    background-color: #E9ECF1;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    @media (max-width: 1023px) {
        padding: 2rem 2rem 3rem 2rem;
        display: flex;
        flex-wrap: wrap;
    }
`

const Quote = styled.h2`
    font-size: 1.7vw;
    font-weight: 700;
    text-align: center;
    width: 75%;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 1.2rem;
     }
`

const QuotePerson = styled.h2`
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-top: 0.5rem;
`

const Illustration = styled.div`
    height: 80%;
    width: auto;
`

const LeftMiddleContainerTitle = styled.h2`
    font-size: 1.2vw;
    font-weight: 700;
    width: 50%;
    margin-left: 4vw;
    @media (max-width: 1023px) {
        font-size: 1rem;
        margin-left: 3rem;
    }
`


const RightMiddleContainerTitle = styled.h2`
    font-size: 1.2vw;
    font-weight: 700;
    width: 50%;
    margin-left: 2rem;
    margin-right: 2rem;
    @media (max-width: 1023px) {
        font-size: 1rem;
        margin-left: 0rem;
    }
`

const BottomContainerTitle = styled.h2`
    font-size: 1.7vw;
    font-weight: 700;
    width: 95%;
    margin-bottom: 2rem;
    margin-left: 2rem;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 1.4rem;
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
    font-size: 1.4vw;
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
    font-size: 1vw;
`

const Stat = styled.p`
    font-weight: 700;
    margin-top: 0.7rem;
    font-size: 1.7vw;
`

const MobileComparisonImage = styled.div`
    width: 100%;
    height: auto;
`