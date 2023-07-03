import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import ModalTitle from "../common/ModalTitle";
import Centered from "../../Centered";
import planBackground from "../../../public/images/planBackground.png";
import Image from "next/image";
import wandIcon from "../../../public/images/magicWand.png"
import diamondIcon from "../../../public/images/diamond.png"
import pencilIcon from "../../../public/images/pencil.png";
import buildingIcon from "../../../public/images/buildingEmoji.png"
import tickIcon from "../../../public/images/tickGreen.png";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import api from "@/pages/api";
import { useEffect, useState } from "react";
import { Loader } from "../../Common/Loaders";
import { useRouter } from 'next/router';
import Link from "next/link";
import elixirIcon from "../../../public/images/elixir.png";
import { useSelector } from "react-redux";
import { selectedPlanState } from "@/store/planSlice";
import { selectedUserState } from "@/store/userSlice";

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

const plans = [
    {title: "Basic", priceId: "price_1NFwcqFe80Kn2YGGi4iIulhc", planId: "647895cf404e31bfe8753398", query: "/order/basic?price=99&priceId=price_1NFwcqFe80Kn2YGGi4iIulhc&months=1", description: "Generuj treści jak posty, artykuły oraz maile z wykorzystaniem AI.", isPro: false, features: ["75 000 elixiru/msc. (~200 postów)", "1 Asystent AI", "3 wgrane treści do 5MB", "Kreator Treści (maile, posty, opisy...)"], price: "99,99zł"}, 
    {title: "Pro", priceId: "price_1NFwxWFe80Kn2YGGvpHuUfpi", planId: "6478970a404e31bfe87533a0", query: "/order/pro?price=299&priceId=price_1NFwxWFe80Kn2YGGvpHuUfpi&months=1", description: "Wgrywaj własne treści i twórz swój zespół AI.", isPro: false, features: ["250 000 elixiru/msc. (~700 postów)", "3 Asystentów AI", "5 wgranych plików do 15MB", "Inteligentny Edytor AI", "Chat z Asystentami AI", "Skanowanie stron internetowych", "Wgrywanie PDF, PPTX, TXT i DOCX", "Wgrywanie filmików YouTube"], price: "299,00zł", extraFunctionalities: "Basic"}, 
    {title: "Business", priceId: "price_1NFx0EFe80Kn2YGGCWikSSti", planId: "6444d4394ab2cf9819e5b5f4", query: "/order/business?price=799&priceId=price_1NFx0EFe80Kn2YGGCWikSSti&months=1", description: "Maximum możliwości dla biznesu bez ograniczeń.", isPro: false, features: ["1M elixiru/msc. (~2 800 postów)", "Nielimitowana ilość Asystentów AI", "Nielimitowana ilość wgranej wiedzy", "Nielimitowana liczba użytkowników", "Dostęp do najnowszych funkcjonalności", "1000+ szblonów poleceń do AI"], price: "799,00zł", extraFunctionalities: "Assistant + Basic"},
]

const UpgradeSubscription = (props: {onClose: any}) => {

    const [loadingPlan, setLoadingPlan] = useState("");
    const [mobile, setMobile] = useState(false);
    const user = useSelector(selectedUserState);
    const currentPlan = useSelector(selectedPlanState);
    const router = useRouter();

    useEffect(() => {
        if(window.innerWidth < 1024) {
            setMobile(true);
        }
    }, [])


    const updatePlan = async (priceId: string, planId: string, planName: string, query: string) => {
        const token = localStorage.getItem("token");
        setLoadingPlan(planName);
        try {
            let referrerId = localStorage.getItem("referrer_id");
            if(user.referredBy){
                referrerId = user.referredBy;
                await api.put('/clear-referred-by', {}, {
                    headers: {
                      authorization: token
                    }
                })
            }
            if(user.plan && user.fullName && user.accountType !== "company") {
                await api.post('/update-subscription', {priceId, planId}, {
                    headers: {
                      authorization: token
                    }
                })
                setLoadingPlan("");
                props.onClose();
                router.reload();
            } else {
                if (user.accountType === "company") {
                    router.push(`${query}`);
                    setLoadingPlan("");
                } else {
                    const response = await api.post(`/create-checkout-session`, 
                    {
                        priceId: priceId, 
                        mode: "subscription",
                        successURL: "https://www.asystent.ai/profile?success",
                        cancelURL: "https://www.asystent.ai/profile",
                        email: user.email,
                        planId: planId,
                        referrerId: referrerId
                    });
                    const { url } = await response.data;
                    window.location.href = url;
                    setLoadingPlan("");
                }
            }
            localStorage.setItem("referrer_id", "");
        } catch (e) {
            setLoadingPlan("");
            console.log(e);
        }

    }

    const renderPlans = () => {
        let icon = wandIcon;

        const renderedPlans = plans.map((plan) => {

            if (plan.title === "Basic") {
                icon= pencilIcon;
            } else if (plan.title === "Pro") {
                icon = diamondIcon;
            } else if (plan.title === "Business") {
                icon = buildingIcon;
            }
            if (mobile) {
                return (
                    <PlanSection key={plan.title}>
                        <PlanImageSection background={planBackground}>
                            <PlanContainer backgroundColor="black" color="white" width="100%">
                                <PlanTitle><PlanTitleText>{plan.title}</PlanTitleText> <BtnIcon><Image style={{ width: "100%", height: "auto" }}  src={icon} alt={'preview'}></Image> </BtnIcon></PlanTitle>
                                <BriefDescription>{plan.description}</BriefDescription>
                                <Price>{plan.price}{plan.title === "Assistant" && <Monthly>/msc</Monthly>}</Price>
                                <Note>Subskrypcja płatna w chwili zakupu i odnawiana co miesiąc.</Note>
                                {currentPlan._id === plan.planId ?
                                    <OwnedButton><BsCheckLg /></OwnedButton>
                                    :
                                    <div style={{display: "flex", alignItems: "center"}}>
                                    <BuyButton onClick={() => updatePlan(plan.priceId, plan.planId, plan.title, plan.query)} backgroundColor="white" color="black">
                                        {loadingPlan === plan.title ?
                                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <Loader color="black" />
                                            </div>
                                            :
                                            <p>Zakup</p>
                                        }
                                    </BuyButton>
                                    <Link href={"/pricing"}>
                                    <LearnMore>
                                        Sprawdź ofertę
                                    </LearnMore>
                                    </Link>
                                    </div>
                                }
                            </PlanContainer>
                            </PlanImageSection>
                    </PlanSection>
                )
            } else {
                return (
                    <PlanSection key={plan.title}>
                            <PlanContainer backgroundColor="black" color="white" width="100%">
                                <PlanTitle><PlanTitleText>{plan.title}</PlanTitleText> <BtnIcon><Image style={{ width: "100%", height: "auto" }}  src={icon} alt={'preview'}></Image> </BtnIcon></PlanTitle>
                                <BriefDescription>{plan.description}</BriefDescription>
                                <Price>{plan.price}{plan.title === "Assistant" && <Monthly>/msc</Monthly>}</Price>
                                <Note>Subskrypcja płatna w chwili zakupu i odnawiana co miesiąc.</Note>
                                {currentPlan._id === plan.planId ?
                                    <OwnedButton><BsCheckLg /></OwnedButton>
                                    :
                                    <div style={{display: "flex", alignItems: "center"}}>
                                    <BuyButton onClick={() => updatePlan(plan.priceId, plan.planId, plan.title, plan.query)} backgroundColor="white" color="black">
                                        {loadingPlan === plan.title ?
                                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <Loader color="black" />
                                            </div>
                                            :
                                            <p>Zakup</p>
                                        }
                                    </BuyButton>
                                    <Link href={"/pricing"}>
                                    <LearnMore>
                                        Sprawdź ofertę
                                    </LearnMore>
                                    </Link>
                                    </div>
                                }
                            </PlanContainer>
                    </PlanSection>
                )
            }

        })
        
        return (
            <Content style={{width: "100%", height: "100%"}}>
            {!currentPlan &&
                        <Centered>
                        {!mobile &&
                        <ElixirImage>
                            <Image style={{ width: "auto", height: "100%" }}  src={elixirIcon} alt={'elixir_icon'}></Image> 
                        </ElixirImage>
                        }
                    </Centered>
            }
            <Centered>
                <Title>Wybierz plan dla siebie lub firmy</Title>
            </Centered>
            {mobile ?
                <PlansSection>
                {renderedPlans}
                </PlansSection>
            :
            <PlanImageSection background={planBackground}>
                <PlansSection>
                {renderedPlans}
                </PlansSection>
            </PlanImageSection>
            }

            </Content>
        )
    }


    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                    {renderPlans()}
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default UpgradeSubscription;


const ModalContainer = styled.div`
    width: 87vw;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    cursor: auto;
    color: black;
    font-weight: 500;
    border: 2px solid rgba(255, 255, 255, 0.15);
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 95svw;
        height: 90svh;
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