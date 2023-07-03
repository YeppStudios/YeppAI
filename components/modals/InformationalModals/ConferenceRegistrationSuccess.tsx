import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import { BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";

interface WidthProp {
    width: string;
  }


interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}


const PhoneNumberPopup = (props: {onClose: any}) => {
      
    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            <Centered>
                <Title>Do zobaczenia!</Title>
            </Centered>
            <Centered>
                <About>Dziękujemy za rejestrację, widzimy się 16 maja o godzinie 18:30 na Złotych Tarasach! 😎</About>
            </Centered>           
            <Centered><Link href="/"><HomeBtn>Strona główna</HomeBtn></Link></Centered>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default PhoneNumberPopup;


const ModalContainer = styled.div`
    width: 40vw;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    color: black;
    font-weight: 500;
    overflow: hidden;
    padding: 6vh 3.5vw 6vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 6vh 3.5vw 10vh 3.5vw;
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

const About = styled.p`
    margin-top: 3vh;
    font-size: 1.2rem;
    width: 90%;
    text-align: center;
    @media (max-width: 1023px) {
        margin-top: 3vh;
        width: 90%;
        margin-bottom: 1vh;
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
const HomeBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  color: white;
  font-weight: 500;
  margin-top: 3rem;
  padding: 0.5rem 3rem 0.5rem 3rem;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 110%;
  background-position-x: -1rem;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  }
  @media (max-width: 1023px) {
    padding: 0.5rem 4rem 0.5rem 4rem;
    margin-top: 2rem;
}
`