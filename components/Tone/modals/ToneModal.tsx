import ModalBackground from "@/components/Modals/common/ModalBackground";
import TextArea from "@/components/forms/TextArea";
import { BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";

const ToneModal = (props: {onClose: any}) => {
    return (
        <ModalBackground onClose={props.onClose} closeable={true}>
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <ModalTitle>
                    Teach AI your tone of voice
                </ModalTitle>
                <div className="px-4">
                <TextArea 
                    placeholder="Paste text you want AI to extract the tone from..."
                    padding="1rem"
                    height="30rem"
                />
                </div>
                <ButtonContainer>
                <ContinueBtn>
                    <p>+ Add Assistant</p>
                </ContinueBtn>  
                </ButtonContainer>
            </Container>
        </ModalBackground>
    )
}

export default ToneModal;

const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 0rem 0rem;
    background: white;
    position: relative;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 5vw 5vh 5vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
        width: 1rem;
        height: 1rem;
    }
`

const ModalTitle = styled.h1`
    margin-bottom: 2rem;
    font-size: 1.2rem;
    width: 100%;
    margin-left: 0rem;
    padding-left: 1.5rem;
    border-bottom: 1px solid #E5E8F0;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.7rem;
        line-height: 1.2;
        width: 95vw;
        margin-top: 2vh;
    }
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        width: 100%;
        height: 3rem;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        background-size: 110%;
        background-position-x: -1rem;
        transition: all 0.4s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 7rem 2rem 7rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`