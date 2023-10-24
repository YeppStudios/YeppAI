import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import Centered from "../../Centered";
import Image from "next/image";
import api from "@/pages/api";
import { BsFiles, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import upgradeIcon from "../../../public/images/up-arrow.png";
import { useSelector } from "react-redux";
import { selectedUserState } from "@/store/userSlice";
import { selectedPlanState } from "@/store/planSlice";

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}


const FilesNumberLimit = (props: {onClose: any}) => {
    const router = useRouter();

    const plan = useSelector(selectedPlanState);
    const user = useSelector(selectedUserState);


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
                <ElixirImage>
                    <Image style={{ width: "auto", height: "100%" }}  src={upgradeIcon} alt={'elixir_icon'}></Image> 
                </ElixirImage>
            </Centered>
             <div>
                <Centered>
                <Title>Upgrade your plan</Title>
                </Centered>
                <Centered>
                <Description>You&apos;ve reached the limit of uploaded resources in {plan.name} plan. <br /> Uploaded resources: <b>{plan.maxFiles}/{plan.maxFiles}</b></Description>
                </Centered>
               <Centered>
                    <BtnContainer>
                    <BuyBtn onClick={() => goToProfile("openSubscriptions")}>
                    Upgrade plan
                    </BuyBtn>
                    </BtnContainer>
                </Centered>
            </div>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default FilesNumberLimit;


const ModalContainer = styled.div`
    width: 45vw;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border: 2px solid #E5E8F0;
    margin: 1.4rem 0rem 1.4rem 1.4rem;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    overflow: hidden;
    color: black;
    font-weight: 500;
    padding: 6vh 2vw 8vh 2vw;
    @media (max-width: 1023px) {
        width: 90vw;
        margin: 0;
    }
`

const Title = styled.div`
    font-size: 8vw;
    text-align: center;
    margin-bottom: 2vh;
    color: black;
    width: 90%;
    font-weight: 700;
    @media only screen and (min-width: 1023px) {
        font-size: 5vh;
        line-height: 7vh;
        margin-bottom: 1vh;
        width: 100%;
    }
`


const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: #0D0E16;
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
    font-size: 2vh;
    margin-top: 1vh;
    text-align: center;
    width: 70%;
    @media (max-width: 1023px) {
        width: 90%;
        margin-top: 2vh;
    }
`



const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 3rem;
    right: 2rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1rem;
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
        width: 90%;
        justify-content: center;
        margin-top: 1rem;
    }
`

const BuyBtn = styled.button`
    width: 70%;
    height: 3.2rem;
    margin: 0 2rem 0 2rem;
    border: solid 3px transparent;
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

const ElixirImage = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    margin-bottom: 3vh;
    margin-left: -0.5rem;
    display: flex;
    justify-content: center;
    @media (max-width: 1023px) {
        width: 3rem;
        height: 3rem;
        margin-left: 0;
    }
`