import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import planBackground from "../../../public/images/planBackground.png";
import Image from "next/image";
import wandIcon from "../../../public/images/magicWand.png"
import diamondIcon from "../../../public/images/diamond.png"
import pencilIcon from "../../../public/images/pencil.png";
import tickIcon from "../../../public/images/tickGreen.png";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import api from "@/pages/api";
import { useEffect, useState } from "react";
import { Loader } from "../../Common/Loaders";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectedPlanState } from "@/store/planSlice";

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
    {title: "Assistant", priceId: "price_1MdbUeFe80Kn2YGGRlKvmre4", planId: "63f0e7d075de0ef12bb8c484", query: "/order/pro", description: "AI with custom knowledge you upload.", isPro: false, features: ["100,000 elixir/month (~110 A4 pages)", "5 uploaded files up to 5MB", "Web page scanning", "Uploading PDF, PPTX, TXT, and DOCX", "Chat with company AI", "AI Copywriter"], price: "99zł"}, 
    {title: "Assistant Basic", priceId: "price_1MdbTMFe80Kn2YGG5QDfmjvS", planId: "63f0e6968e1b9d507c38a749", query: "/order/basic", description: "AI with custom knowledge you upload.", features: ["70,000 elixir/month (~250 A4 pages)", "5 uploaded files up to 5MB", "Web page scanning", "Uploading PDF, PPTX, TXT, and DOCX", "Chat with company AI", "AI Copywriter"], price: "49.99zł", extraFunctionalities: "Basic"}, 
    {title: "Assistant Expert", priceId: "price_1MdbWFFe80Kn2YGG3w8Xg2ub", planId: "63f0e7ed75de0ef12bb8c487", query: "/order/pro", description: "AI with custom knowledge you upload.", isPro: false, features: ["100,000 elixir/month (~110 A4 pages)", "5 uploaded files up to 5MB", "Web page scanning", "Uploading PDF, PPTX, TXT, and DOCX", "Chat with company AI", "AI Copywriter"], price: "199.99zł", extraFunctionalities: "Assistant + Basic"},
    {title: "Basic", priceId: "price_1NFwcqFe80Kn2YGGi4iIulhc", planId: "647895cf404e31bfe8753398", query: "/order/basic", description: "Generate content like posts, articles, and emails using AI.", isPro: false, features: ["75,000 elixir/month (~80 A4 pages)", "Generating social media posts", "Generating emails and newsletters", "Generating articles", "Generating product descriptions", "Saving content"], price: "99zł"}, 
    {title: "Pro", priceId: "price_1NFwxWFe80Kn2YGGvpHuUfpi", planId: "6478970a404e31bfe87533a0", query: "/order/pro", description: "AI with custom knowledge you upload.", features: ["250,000 elixir/month (~270 A4 pages)", "1 main resource folder", "10 uploaded files up to 15MB", "Web page scanning", "Uploading PDF, PPTX, TXT, and DOCX", "Chat with company AI", "AI Copywriter"], price: "299zł", extraFunctionalities: "Basic"}, 
    {title: "Business", priceId: "price_1NFx0EFe80Kn2YGGCWikSSti", planId: "6444d4394ab2cf9819e5b5f4", query: "/order/assistantbusiness", description: "Maximum possibilities for business, no limits.", isPro: false, features: ["1M elixir/month (~1100 A4 pages)", "Unlimited number of folders", "Unlimited amount of uploaded resources", "Unlimited number of users", "Access to the latest features", "1000+ AI command templates"], price: "799zł", extraFunctionalities: "Assistant + Basic"},
]

const SubscriptionModal = (props: {onClose: any}) => {

    const [loadingPlan, setLoadingPlan] = useState("");
    const currentPlan = useSelector(selectedPlanState);
    const router = useRouter();

    
    const cancelPlan = async (priceId: string, planId: string, planName: string) => {
        const token = localStorage.getItem("token");
        setLoadingPlan(planName);

        try {
            await api.post('/cancel-subscription', {priceId, planId}, {
                headers: {
                  authorization: token
                }
              })
              setLoadingPlan("");
              props.onClose();
              router.reload();
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
            }

            if(plan.planId === currentPlan._id){
                return (
                    <PlanSection key={plan.title}>
                        <PlanImageSection background={planBackground}>
                            <PlanContainer backgroundColor="black" color="white" width="26vw">
                                <PlanTitle><PlanTitleText>{plan.title}</PlanTitleText> <BtnIcon><Image style={{ width: "auto", height: "100%" }}  src={icon} alt={'preview'}></Image> </BtnIcon></PlanTitle>
                                <BriefDescription>{plan.description}</BriefDescription>
                                <Price>{plan.price}<Monthly>/month</Monthly></Price>
                                <Note>net every month.</Note>
                                    <CancelButton onClick={() => cancelPlan(plan.priceId, plan.planId, plan.title)} backgroundColor="white" color="black">
                                        {loadingPlan === plan.title ?
                                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                <Loader color="white" />
                                            </div>
                                            :
                                            <p>End</p>
                                        }
                                    </CancelButton>
                            </PlanContainer>
                        </PlanImageSection>
                        <PlanInfo>
                        <PlanTitle><PlanTitleText>{plan.title}</PlanTitleText></PlanTitle>
                        <PlanDescription>{plan.description}</PlanDescription>
                        <FeaturesTitle>Benefits</FeaturesTitle>      
                        {plan.features?.map((feature) => {
                                return (
                                    <div key={feature}>
                                        <Feature>
                                            <TickIcon>
                                                <Image style={{ width: "100%", height: "auto" }}  src={tickIcon} alt={'icon'}></Image> 
                                            </TickIcon>
                                            {feature === "Chat with the Assistant" ?
                                                <FeatureText style={{fontFamily: "'Satoshi' , sans-serif", fontWeight: "600"}}>{feature}</FeatureText>
                                                :
                                                <FeatureText>{feature}</FeatureText>
                                            }
    
                                        </Feature>
                                    </div>
                                )
                            })}
                        </PlanInfo>
                    </PlanSection>
                )
            }
        })
        
        return (
            <Content style={{width: "100%", height: "100%"}}>
            {renderedPlans}
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

export default SubscriptionModal;



const ModalContainer = styled.div`
    width: 70vw;
    height: auto;
    padding: 6vh 3.5vw 7vh 3.5vw;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    font-weight: 500;
    cursor: auto;
    color: black;
    border: 2px solid rgba(255, 255, 255, 0.15);
    overflow: hidden;
    @media (max-width: 1023px) {
        padding: 2vh 3.5vw 10vh 3.5vw;
        width: 95vw;
        height: 70vh;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

const Content = styled.div`
`

const PlanSection = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". ."; 
    @media (max-width: 1023px) {
        margin-top: 5vh;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`

const PlanImageSection = styled.div<Background>`
    width: auto
    height: auto;
    padding: 5vh;
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

const PlanTitle = styled.div`
    font-size: 4vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    line-height: 1.2;
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
        font-size: 0.85rem;
    }
`

const Price = styled.div`
    font-size: 5.5vh;
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

const CancelButton = styled.button<Button>`
    background-color: transparent;
    color: white;
    padding: 1.6vh 2.5vw 1.6vh 2.5vw;
    border-radius: 25px;
    border: 2px solid red;
    width: 10vw;
    margin-top: 3.5vh;
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
        background-color: red;
    }
`

const Monthly = styled.div`
    font-size: 2vh;
    margin-bottom: 1.7vh;
    margin-left: 0.5vw;
`

const BtnIcon = styled.div`
    width: auto;
    height: 4vh;
`

const PlanInfo = styled.div`
    width: 100%;
    padding: 1vh 0vw 0 5vw;
    @media (max-width: 1023px) {
        padding: 3vh 0vw 8vh 5vw;
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