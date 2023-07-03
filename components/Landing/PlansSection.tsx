import { useState } from "react";
import styled from "styled-components";
import SlideBottomView from "../Animated/SlideBottomView";
import { useRouter } from "next/router";
import EnterpriseContactForm from "../Modals/InformationalModals/EnterpriseContactForm";

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
    {title: "Basic", description: "Podstawowa wersja Asystenta, idealna dla małych działalności.", isPro: false, pro: ["50 000 słów/msc. (~200 postów)", "Kreator Treści(maile, posty, opisy...)", "Kreator Pomysłów"], cons: ["Kreator Treści(maile, posty, opisy...)", "Kreator Pomysłów"], price: "49,99zł"}, 
    {title: "Pro", description: "Asystenci AI z Twoją wiedzą firmową i branżową.", isPro: false, features: ["200 000 słów/msc. (~800 postów)", "Chat z Asystentem", "Odpowiedzi na Maile",  "+ Wszystko co w Basic"], price: "99,99zł", extraFunctionalities: "Basic"}, 
    {title: "Business", description: "Indywidualna implementacja sztucznej inteligencji.", isPro: false, features: ["500 000 słów/msc. (~2 000 postów)", "Pierwszeństwo do Nowych Funkcjonalności", "+ Wszystko co w Assistant"], price: "199,99zł", extraFunctionalities: "Assistant + Basic"},
]

const PlansSection = () => {

    const router = useRouter();
    const { pathname } = router;
    const [openEnterpriseContactForm, setOpenEnterpriseContactForm] = useState(false);

    const renderPlans = () => {
        const renderedPlans = plans.map((plan) => {
            return (
                        <MainPlanContainer key={plan.title}>
                            {plan.title === "Basic" &&
                                <PlanContainer backgroundColor="rgba(101, 120, 248, 0.2)" color="black" width="26vw">
                                    <PlanTitle><PlanTitleText>Basic</PlanTitleText> <span role="img" aria-label="diamond">🖋️</span></PlanTitle>
                                    <BriefDescription>Generuj treści jak posty, artykuły oraz maile z wykorzystaniem AI.</BriefDescription>
                                    <Price>99,99zł<Monthly>/msc</Monthly></Price>
                                    <Note>netto z możliwością rezygnacji z subskrypcji w każdym momencie.</Note>
                                    {pathname.includes("business") ?
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=business")} backgroundColor="black" color="white">Dowiedz się więcej</BuyButton>
                                        :
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=individual")} backgroundColor="black" color="white">Dowiedz się więcej</BuyButton>
                                    }

                                </PlanContainer>                           
                            }
                            {plan.title === "Pro" &&
                                <SlideBottomView>
                                <MiddlePlanContainer backgroundColor="black" color="white" width="28vw">
                                    <PlanTitle><PlanTitleText>Pro</PlanTitleText> <BtnIcon><span role="img" aria-label="diamond">💎</span> </BtnIcon></PlanTitle>
                                    <BriefDescription>Twórz Asystentów AI na bazie stron, plików oraz audio i ułatw sobie pracę.</BriefDescription>
                                    <Price>299,00zł<Monthly>/msc</Monthly></Price>
                                    <Note>netto z możliwością rezygnacji z subskrypcji w każdym momencie.</Note>
                                    {pathname.includes("business") ?
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=business")} backgroundColor="white" color="black">Dowiedz się więcej</BuyButton>
                                        :
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=individual")} backgroundColor="white" color="black">Dowiedz się więcej</BuyButton>
                                    }
                                    <Note></Note>
                                </MiddlePlanContainer>
                                </SlideBottomView>                        
                            }
                            {plan.title === "Business" &&
                                <PlanContainer backgroundColor="rgba(100, 181, 255, 0.2)" color="black" width="26vw">
                                    <PlanTitle><PlanTitleText>Business</PlanTitleText> <span role="img" aria-label="diamond">🏛️</span></PlanTitle>
                                    <BriefDescription>Twórz firmowe AI skrojone pod branżową i firmową wiedzę.</BriefDescription>
                                    <Price>770,00zł<Monthly>/msc</Monthly></Price>
                                    <Note>netto z możliwością rezygnacji z subskrypcji w każdym momencie.</Note>
                                    {pathname.includes("business") ?
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=business")} backgroundColor="black" color="white">Dowiedz się więcej</BuyButton>
                                        :
                                        <BuyButton id="plan-learn-more" onClick={() => router.push("/pricing?type=individual")} backgroundColor="black" color="white">Dowiedz się więcej</BuyButton>
                                    }
                                </PlanContainer>                       
                            }

                        </MainPlanContainer>
            )
        })
        
        return (
            <PlansContainer>
                {renderedPlans}
            </PlansContainer>
        )
    }

    return (
        <Container>
            {openEnterpriseContactForm && <EnterpriseContactForm onClose={() => setOpenEnterpriseContactForm(false)} /> }
            {renderPlans()}
        </Container>
    )
}

export default PlansSection;

const Container = styled.div`

`

const MainPlanContainer = styled.div`
@media (max-width: 1023px) {
    height: auto;
    width: 100%;
    margin-bottom: 4vh;
}
`

const PlansContainer = styled.div`
    width: 100%;
    display: flex;
    color: black;
    justify-content: space-between;
    padding: 7vh 0 3vh 0;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
    }
`

const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    height: auto;
    background-color: #0D0E16;
    padding: 4vh;
    height: 100%;
    display: flex;
    align-items: space-between;
    flex-wrap: wrap;
    border-radius: 25px;
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const MiddlePlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    padding: 4vh;
    border: solid 3px transparent;
    display: flex;
    align-items: space-between;
    flex-wrap: wrap;
    border-radius: 25px;

    box-shadow: 0 0 18px 5px rgba(100, 100, 255, 0.75);
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const PlanTitle = styled.div`
    font-size: 2.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    display: flex;
    @media (max-width: 1280px) {
        font-size: 2rem;
    }
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
    width: 84%;
`

const Price = styled.div`
    font-size: 3vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: flex-start;
    display: flex;
    margin-top: 3vh;
    @media (max-width: 1023px) {
        font-size: 5.5vh;
    }
`

const Note = styled.p`
    text-align: left;
    margin-top: 0vh;
    font-size: 1vw;
    color: #818FB9;
    max-width: 70%;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
    }
`

const BuyButton = styled.button<Button>`
    background-color: ${props => props.backgroundColor || 'black'};
    color: ${props => props.color || 'white'};
    padding: 0.75rem 3rem 0.75rem 3rem;
    border-radius: 15px;
    margin-top: 3.5vh;
    height: 3rem
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        padding: 2vh 5vh 2vh 5vh;
        font-size: 2vh;
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const PriceCrossed = styled.div`
    color: black;
    font-size: 1.5vw;
    text-decoration: line-through;
    text-decoration-color: #FF4646;
    width: 100%;
    margin-bottom: -0.5rem;
    font-weight: 700;
    text-align: left;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        margin-left: 0;
        font-size: 1.2rem;
    }
`
const BtnIcon = styled.div`
    width: auto;
    height: 4vh;
`

const Monthly = styled.div`
    font-size: 2vh;
    margin-bottom: 1vh;
    margin-left: 0.4vw;
`