import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import Plans from "@/components/Landing/Plans";
import ContactPopup from "../OnboardingModals/ContactPopup";

interface Background {
    background: any
}

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}

interface Button {
    backgroundColor: string,
    color: string,
}


const UpgradeSubscription = (props: {onClose: any, closeable: boolean, purchase: boolean, landing: boolean}) => {
    
    return (
        // <ModalBackground>
        //     <SlideBottom>
        //     <ModalContainer onClick={(e) =>  e.stopPropagation()}>
        //         {props.closeable &&
        //         <CloseIcon onClick={props.onClose}>
        //             <BsXLg style={{width: "100%", height: "auto"}}/>
        //         </CloseIcon>
        //         }
        //         <Plans openRegistration={false} purchase={props.purchase} landing={props.landing}/>
        //     </ModalContainer>
        //     </SlideBottom>
        // </ModalBackground>
        <ContactPopup onClose={props.onClose} />
    )
    
}

export default UpgradeSubscription;

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    overflow: scroll;
        &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: black;
    @media (max-width: 1023px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100vw;
        overflow-x: hidden;
    }
`

const ModalContainer = styled.div`
    width: 100vw;
    padding: 1rem 7rem 7rem 7rem;
    margin-top: 0vh;
    margin-bottom: 5vh;
    position: relative;
    background: white;
    z-index: 100;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    cursor: auto;
    color: black;
    font-weight: 500;
    border: 2px solid rgba(255, 255, 255, 0.15);
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 100svw;
        height: 100svh;
        overflow-y: scroll;
        padding: 1rem 0.5rem 0.5rem 0.5rem;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        border: 2px solid rgba(255, 255, 255, 0.1);
    }
`

const Content = styled.div`
    -ms-overflow-style: none;
    padding: 6vh 3.5vw 5vh 3.5vw;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 94%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.div`
    font-size: 4.5vh;
    text-align: center;
    margin-bottom: 2vh;
    color: black;
    width: 95%;
    line-height: 1.2;
    font-weight: 700;
    @media only screen and (min-width: 1023px) {
        font-size: 6vh;
        line-height: 1.2;
        margin-bottom: 1vh;
        width: 80%;
    }
`

const PlanSection = styled.div`
    width: calc(33% - 1rem);
    @media (max-width: 1023px) {
        margin-top: 1vh;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
    }
`

const PlanImageSection = styled.div<Background>`
    width: auto
    height: auto;
    padding: 2rem 2rem 2rem 2rem;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${props => props.background.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    @media (max-width: 1023px) {
        padding: 3vh;
        width: 95%;
    }
`

const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: #0D0E16;
    padding: 4vh 1vh 5vh 4vh;
    border-radius: 25px;
    box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.45);
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const PlanTitle = styled.div`
    font-size: 4vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    display: flex;
    align-items:center;
`

const PlanTitleText = styled.p`
    margin-right: 1vw;
    @media (max-width: 1023px) {
        margin-right: 3vw;
    }
`

const BriefDescription = styled.p`
    font-family: 'Lato', sans-serif;
    margin-top: 1vh;
    width: 80%;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
        width: 90%;
    }
`

const Price = styled.div`
    font-size: 4vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    margin-top: 3vh;
    display: flex;
    align-items: flex-end;
`

const Note = styled.p`
    text-align: left;
    margin-top: 0vh;
    font-size: 1.5vh;
    line-height: 1.8vh;
    color: #818FB9;
    max-width: 85%;
`

const BuyButton = styled.button<Button>`
    background-color: ${props => props.backgroundColor || 'black'};
    color: ${props => props.color || 'white'};
    padding: 1.6vh 2.5vw 1.6vh 2.5vw;
    width: 9vw;
    border-radius: 25px;
    margin-top: 3.5vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 2vh;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        padding: 1.5vh 4vh 1.5vh 4vh;
        width: auto;
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const Monthly = styled.div`
    font-size: 2vh;
    margin-bottom: 1.7vh;
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        margin-bottom: 0.5rem;
    }
`

const BtnIcon = styled.div`
    height: auto;
    min-width: 4vh;
    width: 4vh;
`

const PlanInfo = styled.div`
    width: 100%;
    padding: 1vh 0vw 0 5vw;
    @media (max-width: 1023px) {
        padding: 3vh 0vw 4vh 5vw;
    }
`

const PlanDescription = styled.p`
    color: black;
    font-size: 2vh;
    margin-top: 0.4vh;
`

const FeaturesTitle = styled.p`
    font-size: 2.5vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    margin-top: 4vh;
`

const Feature = styled.div`
    display: flex;
    align-items: center;
    margin: 2vh 0 0 0;
`

const TickIcon = styled.div`
    width: 2vh;
    height: 2vh;
    @media (max-width: 1023px) {
        width: 4vw;
        height: 4vw;
    }
`

const FeatureText = styled.p`
    margin-left: 1vw;
    font-size: 1.75vh;
    @media (max-width: 1023px) {
        margin-left: 3vw;
    }
`
const OwnedButton = styled.div`
    background-color: #00D770;
    color: white;
    padding: 1.6vh 2.5vw 1.6vh 2.5vw;
    width: 9vw;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    margin-top: 3.5vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 2.5vh;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        padding: 1.5vh 4vh 1.5vh 4vh;
        width: 20vw;
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

const ElixirImage = styled.div`
    width: 4rem;
    height: 4rem;
    margin-bottom: 3vh;
    display: flex;
    justify-content: center;
`

const PlansSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
    }
`

const LearnMore = styled.div`
    color: #818FB9;
    margin-top: 4vh;
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: 500;
    &:hover {
        color: white;
    }
    @media (max-width: 1023px) {
        font-size: 0.8rem;
        margin-top: 5vh;
    }
`