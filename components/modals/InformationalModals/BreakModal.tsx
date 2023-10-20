import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import { BsXLg } from "react-icons/bs";
import ColorfulText from "@/components/Common/ColorfulText";
import { BiCoffee } from "react-icons/bi";

const PhoneNumberPopup = () => {
      
    return (
        <ModalBackground closeable={false}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
            <Centered>
                <BiCoffee className="w-12 h-12 mb-6"/>
            </Centered>
            <Centered>
                <Title><ColorfulText>Technical break</ColorfulText></Title>
            </Centered>
            <Centered>
                <Contact>Take a coffee break as we work on delivering you the best AI marketing platform! It should take up to 2 hours. Thank you for patience!</Contact>
            </Centered>           
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
    padding: 6vh 3.5vw 10vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;
    }
`

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
    color: white;
    width: 90%;
    font-weight: 600;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    color: black;
    @media only screen and (min-width: 1023px) {
        font-size: 5vh;
        line-height: 7vh;
        width: 100%;
        margin-bottom: 1rem;
    }
`

const Contact = styled.p`
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    @media (max-width: 1023px) {
        margin-top: 2vh;
        font-size: 1rem;
        width: 95%;
        margin-bottom: 1vh;
    }
`