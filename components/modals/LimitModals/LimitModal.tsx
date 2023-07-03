import styled from "styled-components"
import Description from "../../Common/Description";
import ModalBackground from "../common/ModalBackground"
import ModalTitle from "../common/ModalTitle";
import fuelIcon from "../../../public/images/fuel.png";
import Centered from "../../Centered";
import Image from "next/image";
import GenerateBtn from "../../Common/GenerateBtn";
import SlideBottom from "../../Animated/SlideBottom";
import { BsXLg } from "react-icons/bs";

const LimitModal = (props: {onClose: any}) => {
    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <Modal onClick={(e) =>  e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <ModalTitle>Osiągnąłeś limit profili</ModalTitle>
                <Centered>
                <DescriptionText>
                    Aby móc dodać więcej profili ulepsz plan subskrypcji. <br/><br/>
                    Basic -  1 profil<br /><br />
                    Assistant -  5 profili<br /><br />
                    Expert -  ∞ profili<br /><br />
                    Dziękujemy za takie zainteresowanie!
                </DescriptionText>
                </Centered>
                <Centered>
                    <GenerateBtn onClick={props.onClose}>Powrót do profilu</GenerateBtn>
                </Centered>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default LimitModal;

const Modal = styled.div`
    width: 50vw;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    overflow: hidden;
    padding: 6vh 3.5vw 7vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;
    }
`

const FuelIcon = styled.div`
    width: 8vh;
    height: 8vh;
    margin-bottom: 5vh;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const DescriptionText = styled.p`
    color: #000000;
    font-size: 2vh;
    width: 34vw;
    text-align: center;
    margin-top: 1vh;
    margin-bottom: 3vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 2.2vh;
        width: 100%;
        margin-bottom: 2vh;
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