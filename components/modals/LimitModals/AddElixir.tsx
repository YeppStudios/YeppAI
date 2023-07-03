import styled from "styled-components";
import ModalBackground from "../common/ModalBackground";
import ModalTitle from "../common/ModalTitle";
import { useState } from "react";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import Router, { useRouter } from "next/router";
import SlideBottom from "../../Animated/SlideBottom";
import fuelIcon from "../../../public/images/fuel.png";
import Image from "next/image";
import Centered from "../../Centered";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectedUserState } from "@/store/userSlice";

const AddElixir = ({onClose}: any) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const user = useSelector(selectedUserState);

    const purchaseElixir = async (amount: number, price: string) => {
        setLoading(true);

        try {
            if (user.accountType === "company") {
                if(amount == 30000 ){
                    router.push("/order/elixir-small")
                } else if(amount == 100000) {
                    router.push("/order/elixir-medium")
                } else {
                    router.push("/order/elixir-big")
                } 

            } else {
                const response = await api.post(`/create-checkout-session`, 
                {
                    priceId: price, 
                    mode: "payment",
                    successURL: "https://www.asystent.ai/profile?success",
                    cancelURL: "https://www.asystent.ai/profile",
                    email: user.email,
                    tokensAmount: amount,
                    planId: ""
                });
                const { url } = await response.data;
                window.location.href = url;
            }

            setLoading(false);
        } catch(e) {
            setLoading(false);
            console.log(e)
        }
    }

    return (
        <ModalBackground closeable={true} onClose={onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
                <CloseIcon onClick={onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <ModalTitle>Doładuj Elixir Kreatywności</ModalTitle>
                <Centered>
                <ElixirsContainer>
                    <ElixirContainer>
                        <Centered>
                        <SmallElixirIcon>
                            <Image style={{ width: "100%", height: "auto" }}  src={fuelIcon} alt={'icon'}></Image> 
                        </SmallElixirIcon>
                        </Centered>
                        <ElixirAmount>+ 30 000ml</ElixirAmount>
                        <Price>24, 99zł</Price>
                        <Button onClick={() => purchaseElixir(30000, "price_1NBAYyFe80Kn2YGGmTM0y2ER")}>+ <ButtonText>Doładuj</ButtonText></Button>
                    </ElixirContainer>
                    <ElixirContainer>
                        <Centered>
                        <MediumElixirIcon>
                            <Image style={{ width: "100%", height: "auto" }}  src={fuelIcon} alt={'icon'}></Image> 
                        </MediumElixirIcon>
                        </Centered>
                        <ElixirAmount>+ 100 000ml</ElixirAmount>
                        <Price>99, 99zł</Price>
                        <Button onClick={() => purchaseElixir(100000, "price_1NBAbsFe80Kn2YGGEHbkus2g")}>+ <ButtonText>Doładuj</ButtonText></Button>
                    </ElixirContainer>
                    <ElixirContainer>
                        <Centered>
                        <BigElixirIcon>
                            <Image style={{ width: "100%", height: "auto" }}  src={fuelIcon} alt={'icon'}></Image> 
                        </BigElixirIcon>
                        </Centered>
                        <ElixirAmount>+ 500 000ml</ElixirAmount>
                        <Price>429, 00zł</Price>
                        <Button onClick={() => purchaseElixir(500000, "price_1NBAcoFe80Kn2YGG7IkK4m63")}>+ <ButtonText>Doładuj</ButtonText></Button>
                    </ElixirContainer>
                </ElixirsContainer>
                </Centered>
                <Centered>
                    <ElixirDescription>
                        Elixir kreatywności jest niezbędny do generowania treści. 
                        Pobierany jest za to, co Asystent napisze, twoje pytania i w przypadku chatu 
                        za dwie poprzednie wiadomości, dzięki którym Asystent zna kontekst.
                    </ElixirDescription>
                </Centered>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default AddElixir;

const ModalContainer = styled.div`
    width: auto;
    padding: 4vh 0vw 6vh 0vw;
    width: 70vw;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    border: 2px solid rgba(255, 255, 255, 0.15);
    @media (max-width: 1023px) {
        width: 94vw;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 4vh 3vw 6vh 3vw;
        border: 2px solid rgba(255, 255, 255, 0.1);
    }
`

const ElixirsContainer = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
    margin-top: 4vh;
    align-items: flex-end;
    @media (max-width: 1023px) {
        width: 95%;
        align-items: flex-end;
        margin-top: 1vh;
    }
`

const ElixirContainer = styled.div`
    text-align: center;
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: black;
`

const SmallElixirIcon = styled.div`
    width: 5vh;
    height: 5vh;
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        width: 4vh;
        height: 4vh;
    }
`

const MediumElixirIcon = styled.div`
    width: 7vh;
    height: 7vh;
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        width: 6vh;
        height: 6vh;
    }
`

const BigElixirIcon = styled.div`
    width: 9vh;
    height: 9vh;
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        width: 7vh;
        height: 7vh;
    }
`


const ElixirAmount = styled.p`
    font-size: 3vh;
    width: 100%;
    margin-top: 2.5vh;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 2.2vh;
    }
`

const Price = styled.p`
    font-size: 1.7vh;
    width: 100%;
`

const Button = styled.button`
    height: 5vh;
    width: 80%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 15px;
    font-weight: 500;
    font-size: 2vh; 
    border-radius: 15px;
    border: solid 3px transparent;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: black;
    margin-top: 2vh;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(0.95);
        border: none;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        box-shadow: none;
        color: white;
    }
    @media (max-width: 1023px) {
        font-size: 1.7vh;
    }
`
const ButtonText = styled.p`
    margin-left: 0.5vw;
`

const ButtonIcon = styled.div`
    position: relative;
    width: 1.5vh;
    height: 1.5vh;
`

const ElixirDescription = styled.p`
    font-size: 1.7vh;
    color: #BCBCBC;
    width: 35vw;
    text-align: center;
    margin-top: 7vh;
    @media (max-width: 1023px) {
        width: 90%;
        margin-top: 5vh;
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