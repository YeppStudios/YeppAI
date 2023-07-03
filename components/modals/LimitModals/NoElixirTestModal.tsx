import styled from "styled-components"
import Description from "../../Common/Description";
import ModalBackground from "../common/ModalBackground"
import ModalTitle from "../common/ModalTitle";
import fuelIcon from "../../../public/images/fuel.png";
import Centered from "../../Centered";
import Image from "next/image";
import GenerateBtn from "../../Common/GenerateBtn";
import SlideBottom from "../../Animated/SlideBottom";

const NoElixirTestModal = (props: {onClose: any, onSubmit: any}) => {
    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <Modal onClick={(e) =>  e.stopPropagation()}>
                <Centered>
                    <FuelIcon onClick={props.onSubmit}>
                        <Image style={{ width: "100%", height: "auto" }}  src={fuelIcon} alt={'icon'}></Image> 
                    </FuelIcon>
                </Centered>
                <ModalTitle>Replenish your elixir</ModalTitle>
                <Centered>
                <DescriptionText>
                    Elixir is essential for generating unique content.
                    It is consumed for what the Assistant writes, your questions, and in the case of chat,
                    for the two previous messages that allow the Assistant to understand the context.
                </DescriptionText>
                </Centered>
                <Centered>
                    <GenerateBtn onClick={props.onSubmit}>Check out the offer</GenerateBtn>
                </Centered>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default NoElixirTestModal;

const Modal = styled.div`
    width: auto;
    padding: 5vh 5vw 7vh 5vw;
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.55);
    border-radius: 25px;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    cursor: auto;
    color: black;
    z-index: 100;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 5vh;
        background: #04040A;
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
    font-size: 2vh;
    width: 34vw;
    text-align: center;
    font-weight: 500;
    margin-top: 1vh;
    margin-bottom: 3vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 2.2vh;
        width: 100%;
        margin-bottom: 2vh;
    }
`