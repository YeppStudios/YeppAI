import styled from "styled-components";
import Image from "next/image";
import SlideRight from "../Animated/SlideRight";
import SlideLeft from "../Animated/SlideLeft";

const LeftFeature = (props: {text: string, image: any, title: string, marginTop: string, color: string}) => {
    return (
        <FeatureContainer marginTop={props.marginTop} color={props.color}>
            <div style={{display: "flex", flexWrap: "wrap", alignItems: "center"}}>
                <FeatureTitle>{props.title}</FeatureTitle>
                <FeatureDescription color={props.color}>
                    {props.text}
                </FeatureDescription>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                <ImageContainer>
                    <Image style={{ width: "auto", height: "100%" }}  src={props.image} alt={'preview'}></Image> 
                </ImageContainer>
            </div>
        </FeatureContainer>
    )
} 

export default LeftFeature;

const FeatureContainer = styled.div<{marginTop: string, color: string}>`
    width: 100vw;
    height: auto;
    padding: 0vh 0vw 0vh 5vw;
    margin-left: -8vw;
    margin-top: ${props => props.marginTop};
    color: ${props => props.color};
    display: grid; 
    grid-template-columns: 0.7fr 1.3fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
      align-items: center;
      @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100vw;
        margin-left: 0vw;
        padding: 5vh 0 10vh 0;
        margin-top: 0;
      }
`

const FeatureTitle = styled.h2`
    font-size: 2.6vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 4vh;
        width: 100%;
        line-height: 1.2;
        text-align: center;
      }
`

const FeatureDescription = styled.p<{color: string}>`
    margin-top: 5vh;
    font-size: 2vh;
    color: ${props => props.color === "white" ? "#D1D6E2" : "black"};
    @media (max-width: 1023px) {
        width: 100%;
        text-align: center;
        margin-top: 2.5vh;
    }
`

const ImageContainer = styled.div`
    max-height: 90vh;
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        width: 100%;
        justify-content: center;
        max-height: 90vh;
        max-width: 120vw;
    }
`