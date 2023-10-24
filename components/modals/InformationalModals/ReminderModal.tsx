import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import Image from "next/image";
import fuelIcon from "../../../public/images/fuel.png";
import api from "@/pages/api";
import { BsFiles, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface WidthProp {
    width: string;
  }


interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}


const ReminderModal = (props: {onClose: any, elixirWidth: string}) => {
    const router = useRouter();

    const [plan, setPlan] = useState("");

    useEffect(() => {
        const userPlan = localStorage.getItem("plan");
        if(userPlan) {
            setPlan(userPlan);
        }
    }, []);

    const goToProfile = (option: string) => {
        router.push(`/me?${option}=true`);
        props.onClose();
    }

    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            <Centered>
                <Title>Did you know that...</Title>
            </Centered>
            <Centered>
            <Description>AI uses elixir to generate unique content? You can fuel it by buying a subscription.</Description>
            </Centered>
            <Centered>
                <LinkTitle>You have {Math.round(Number(props.elixirWidth))*25} / 7500ml free elixir left</LinkTitle>
            </Centered>
            <Centered>
                <div style={{display: "flex", alignItems: "center", marginTop: "0.6rem"}}>
                    <FuelBar>
                        <Fuel width={props.elixirWidth}></Fuel>
                    </FuelBar>
                    <FuelIcon onClick={() => goToProfile("openElixir")}>
                        <Image style={{ width: "auto", height: "100%" }}  src={fuelIcon} alt={'logo'}></Image> 
                    </FuelIcon>
                </div>
            </Centered>
            <Centered>
                <BtnContainer>
                {plan !== "undefined" &&
                    <BuyBtn onClick={() => goToProfile("openElixir")}>
                       Add elixir
                    </BuyBtn>
                }
                <BuyBtn onClick={() => goToProfile("openSubscriptions")}>
                    Subscribe
                </BuyBtn>
                </BtnContainer>
            </Centered>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default ReminderModal;


const ModalContainer = styled.div`
    width: 65vw;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    color: black;
    font-weight: 500;
    overflow: hidden;
    padding: 6vh 3.5vw 10vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;
    }
`

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
    margin-bottom: 2vh;
    color: white;
    width: 90%;
    font-weight: 600;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    color: black;
    @media only screen and (min-width: 1023px) {
        font-size: 6vh;
        line-height: 7vh;
        margin-bottom: 1vh;
        width: 100%;
    }
`


const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: black;
    padding: 4vh 4vh 5vh 4vh;
    border-radius: 25px;
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.55);
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.97);
    }
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const Description = styled.div`
    font-size: 2.4vh;
    margin-top: 2vh;
    text-align: center;
    width: 85%;
    @media (max-width: 1023px) {
        width: 90%;
        margin-top: 2vh;
    }
`

const LinkTitle = styled.p`
    margin-top: 4vh;
    font-size: 2vh;
    text-align: center;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        width: 80%;
        margin-bottom: 1vh;
    }
`


const FuelBar = styled.div`
  width: 35vw;
  height: 1rem;
  border-radius: 15px;
  box-shadow: inset 0 4px 4px 1px rgb(0, 0, 0, 0.2);
  @media (max-width: 1023px) {
    width:60vw;
}
`

const Fuel = styled.div<WidthProp>`
    width: ${props => props.width}%;
  height: 1rem;
  border-radius: 15px;
  background: linear-gradient(-45deg, #6578F8, #64B5FF);
`

const FuelIcon = styled.button`
  width: 2.2rem;
  height: 2rem;
  position: relative;
  margin-left: 1rem;
  @media (max-width: 1023px) {
      display: none;
}
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        width: 1rem;
        height: 1rem;
    }
`
const BtnContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 70%;
    justify-content: center;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
    }
`

const BuyBtn = styled.button`
    width: 45%;
    height: 3.2rem;
    border: solid 3px transparent;
    margin: 0 2rem 0 2rem;
    border-radius: 15px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23), -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    font-size: 1em;
    margin-top: 1rem;
    color: black;
    display: flex;
    align-items: center;
      font-weight: 700;
    justify-content: center;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (min-width: 1023px) {
      &:hover {
        transform: scale(0.95);
        border: none;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        box-shadow: none;
        color: white;
    }
  }
  @media (max-width: 1023px) {
    width: 80%;
}
`