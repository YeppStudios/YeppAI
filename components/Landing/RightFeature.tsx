import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import thinArrow from "../../public/images/thinArrow.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const RightFeature = (props: {text: string, gif: string, title: string, bulletpoints: any[], color: string}) => {
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, []);
      
    return (
        <FeatureContainer color={props.color}>
            {!mobile && 
                    <GifContainer>
                    <Image 
                        src={props.gif}
                        width={700}
                        height={400}
                        style={{borderRadius: "25px"}}
                        alt={"gif"}
                    />
                    </GifContainer>
            }
            <SlideBottom>
            <div>
                <FeatureTitle>{props.title}</FeatureTitle>
                <FeatureDescription color={props.color}>
                    {!mobile && props.text}
                    <ul className="mt-6">
                    {props.bulletpoints.map((item, index, array) => {
                        return (
                            <li key={item}>
                                {item}{(index !== array.length - 1 && mobile) ? "," : ""}
                            </li>
                        );
                    })}
                    </ul>
                </FeatureDescription>
                {!mobile && 
                    <Link href="/assets?registration=true&trial=true">
                        <Button color={props.color} className="">
                            <BtnText>Try now</BtnText>
                            <LearnMoreArrow>
                                <Image style={{ width: "auto", height: "100%" }}  src={thinArrow} alt={'arrow'}></Image> 
                            </LearnMoreArrow>
                        </Button>
                    </Link>
                }
            </div>
            </SlideBottom>
            {mobile && 
            <>
                <GifContainer>
                    <Image 
                        src={props.gif}
                        width={400}
                        height={200}
                        style={{borderRadius: "20px"}}
                        alt={"gif"}
                    />
                </GifContainer>
                <Link href="/assets?registration=true&trial=true">
                        <Button color={props.color} className="">
                            <BtnText>Try now</BtnText>
                            <LearnMoreArrow>
                                <HiOutlineArrowNarrowRight style={{ width: "auto", height: "100%" }} />
                            </LearnMoreArrow>
                        </Button>
                </Link>
            </>
            }
        </FeatureContainer>
    )
} 

export default RightFeature;

const FeatureContainer = styled.div<{color: string}>`
    width: 100vw;
    height: auto;
    padding: 0vh 8vw 0vh 0vw;
    margin-left: -8vw;
    margin-top: 14rem;
    color: ${props => props.color};
    display: grid; 
    grid-template-columns: 1.3fr 0.7fr; 
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
        margin-left: -5vw;
        padding: 5vh 0 10vh 0;
        margin-top: 0;
      }
`

const FeatureTitle = styled.h2`
    font-size: 2.5rem;
    font-family: 'Satoshi', sans-serif;
    font-weight: 900;
    @media (max-width: 1023px) {
        font-size: 2.4rem;
        width: 100%;
        line-height: 1.2;
        text-align: center;
        font-size: 2rem;
      }
`

const FeatureDescription = styled.p<{color: string}>`
    margin-top: 1.5vh;
    font-size: 1.25rem;
    font-weight: 500;
    color: ${props => props.color === "white" ? "#D1D6E2" : "black"};

    @media (min-width: 1023px) {
        ul {
            list-style-type: disc;
            padding-left: 20px;
        }
    }

    @media (max-width: 1023px) {
        width: 95vw;
        text-align: center;
        margin-top: 2.5vh;
        font-size: 1.2rem;
    }
`

const GifContainer = styled.div`
    overflow: visible;
    margin-left: 8vw;
    max-height: 90vh;
    width: 40rem;
    border-radius: 25px;
    border: 7px solid black;
    box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.3);
    @media (max-width: 1023px) {
        margin-top: 2rem;
        margin-left: 0;
        width: 95vw;
        border: 4px solid black;
    }
`

const Button = styled.div`
    background-color: #F0F3F8;
    color: black;
    box-shadow: inset 2px 2px 8px rgba(22, 27, 29, 0.05), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    padding: 1.75vh 0 1.75vh 0;
    border-radius: 25px;
    width: 14rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    margin-top: 3vh;
    align-items: center;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
        transform: scale(0.96);
        box-shadow: none;
    }
    @media (max-width: 1023px) {
        width: 80vw;
        margin-top: 2rem;
        justify-content: center;
    }
`

const BtnText = styled.div`
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const LearnMoreArrow = styled.div`
    margin-left: 1.5vw;
    height: 0.7rem;
    @media (max-width: 1023px) {
        margin-left: 0.75rem;
        height: 1.5rem;
    }
`