import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import { BsXLg } from "react-icons/bs";

const ContactPopup = (props: {onClose: any}) => {
      
    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            <Centered>
                <Title>Contact us for pricing:</Title>
            </Centered>
            <div>
                <Contact>Mail: <br /><b>hello@yepp.ai</b></Contact>
            </div>           
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default ContactPopup;


const ModalContainer = styled.div`
    width: 40vw;
    height: auto;
    background: white;
    box-shadow: 0px 0px 20px rgba(0, 0, 100, 0.15);
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
        font-size: 4vh;
        line-height: 7vh;
        margin-bottom: 1vh;
        width: 100%;
    }
`

const Contact = styled.p`
    margin-top: 4vh;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        width: 100%;
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
const BtnContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 70%;
    justify-content: space-between;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        margin-top: 1rem;
    }
`
