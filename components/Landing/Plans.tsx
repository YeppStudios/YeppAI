import { useEffect, useState } from "react";
import styled from "styled-components";
import SlideBottom from "../Animated/SlideBottom";
import Image from "next/image";
import tickIcon from "../../public/images/tickGreen.png";
import plusIcon from "../../public/images/plus.png";
import Centered from "../Centered";
import { useRouter } from "next/router";
import { FiPhoneCall, FiShoppingBag } from "react-icons/fi";
import api from "@/pages/api";
import LoginModal from "../Modals/OnboardingModals/LoginModal";
import { Loader } from "../Common/Loaders";
import PhoneNumberPopup from "../Modals/InformationalModals/PhoneNumberPopup";
import { BsPhone, BsPhoneFill } from "react-icons/bs";

const tabs = [
    { name: 'monthly', period: 1, discount: 0},
    { name: '3 months', period: 3, discount: 0.1},
    { name: '6 months', period: 6, discount: 0.15},
    { name: 'yearly', period: 12, discount: 0.2},
]

const plans = [
    {title: "Standard", planId: "64ad0d740e40385f299bcef9", description: "Basic version of Assistant, enhanced skills.", features: ["200 000 elixir/mo (~100 A4 pages)", "1 AI profile", "10 assets to upload (max 15MB total)", "Single web pages scanning", "Uploading PDF, PPTX, TXT and DOCX", "Chat with your AI", "Marketer AI", "Copywriter AI"], price: 59, monthlyPriceId: "price_1NSZjsFe80Kn2YGGYa3pzseT", threeMonthPriceId: "price_1NSafTFe80Kn2YGG5LVrITu1", sixMonthPriceId: "price_1NSagKFe80Kn2YGGFhOuum7Z", yearlyPriceId: "price_1NSaglFe80Kn2YGGZZ8msY1r"}, 
    {title: "Agency", planId: "64ad0d250e40385f299bceea", description: "Basic version of Assistant, maximum content.", features: ["1M elixir/mo (~520 A4 pages)", "Unlimited client AI profiles", "Unlimited number of assets", "Unlimited storage space", "Unlimited number of teammates", "Access to the latest features", "Dedicated customer support"], price: 249, monthlyPriceId: "price_1NSZghFe80Kn2YGGOiClJUPM", threeMonthPriceId: "price_1NSai5Fe80Kn2YGGHrwmUEqe", sixMonthPriceId: "price_1NSaiNFe80Kn2YGGG88egvhI", yearlyPriceId: "price_1NSaieFe80Kn2YGGilwS3SNl"},
    {title: "Custom", planId: "", description: "Marketing part of the platform with base AI Assistant.", features: ["Unlimited elixir", "Unlimited profiles", "Unlimited storage", "Unlimited number of teammates", "Access to the latest features", "Full website scan", "API access"], price: 799, monthlyPriceId: "price_1NFKIsFe80Kn2YGG60KFM7m5", threeMonthPriceId: "price_1NIZENFe80Kn2YGG2T7ztNTj", sixMonthPriceId: "price_1NIZFJFe80Kn2YGG7Eu6tjqb", yearlyPriceId: "price_1NIZFUFe80Kn2YGGQqUbkYaA"}, 
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


interface Button {
    backgroundColor: string,
    color: string,
}

interface PlanContainer {
    backgroundColor: string,
    color: string,
    width: string
}

const Plans = (props: {openRegistration: boolean}) => {

    const [mobile, setMobile] = useState(false);
    const [discount, setDiscount] = useState(0.1);
    const [billingPeriod, setBillingPeriod] = useState(1);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState("");
    const [openContact, setOpenContact] = useState(false);

    const router = useRouter();


    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }, []);
    useEffect(() => {
        if (billingPeriod === 3) {
            setDiscount(0.1);
        } else if (billingPeriod === 6) {
            setDiscount(0.15);
        } else if (billingPeriod === 12) {
            setDiscount(0.2);
        }
    }, [billingPeriod]);

    const openCheckout = async (priceId: string, planName: string, planId: string) => {
        setLoadingBtn(planName);
        let successUrl = `https://www.yepp.ai/assets?success`;
        let token = localStorage.getItem("token");
        let userId = localStorage.getItem("user_id");
        const {data} = await api.get(`/users/${userId}`, {
            headers: {
              authorization: token
            }
        });
        let res = await api.post(`/create-checkout-session`, 
        {
            priceId,
            mode: "subscription",
            successURL: successUrl,
            cancelURL: `${window.location.origin}${router.asPath}`,
            planId: planId,
            email: data.email,
            months: billingPeriod,
            global: true
        });
        const { url } = await res.data;
        window.location.href = url;
    }


    const renderPlans = () => {
        const renderedPlans = plans.map((plan) => {
            return (
                        <MainPlanContainer key={plan.title}>
                            {plan.title === "Standard" &&
                                <PlanContainer backgroundColor="white" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">✏️</span> </Emoji><PlanTitleText>{plan.title}</PlanTitleText> </PlanTitle>
                                    <BriefDescription>Best for a freelancer</BriefDescription>
                                    <MainDescription>Your personal AI content creator with knowledge from uploaded assets.</MainDescription>
                                    <Price>
                                        {/* <PriceCrossed>970,00</PriceCrossed> */}
                                        {billingPeriod === 1 ? <Price>${plan.price}<Monthly>/mo</Monthly></Price> :  <Price>${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}<Monthly>/{billingPeriod}mo</Monthly><Gross><ColorfulText>you save ${(billingPeriod*plan.price*discount).toFixed(0)}</ColorfulText></Gross></Price>}
                                    </Price>
                                    <Centered><Note>No pressure. You can change plans or cancel anytime.</Note></Centered>
                                    {billingPeriod === 1 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.monthlyPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.monthlyPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 3 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.threeMonthPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.threeMonthPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 6 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.sixMonthPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.sixMonthPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 12 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.yearlyPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.yearlyPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    <FeaturesList>  
                                    {plan.features?.map((feature, index) => {
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>{feature}</FeatureText>
                                                    </Feature>
                                                </div>
                                            )
                                    })}                                 
                                    </FeaturesList>
                                </PlanContainer>                   
                            }
                            {plan.title === "Agency" &&
                                <MiddlePlanContainer backgroundColor="rgba(100, 181, 255, 0.2)" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">💎</span></Emoji><PlanTitleText><ColorfulText>{plan.title}</ColorfulText></PlanTitleText> </PlanTitle>
                                    <BriefDescription>Best for a marketing agency</BriefDescription>
                                    <MainDescription>Define AI profiles for your clients and streamline the conetnt creation.</MainDescription>
                                    <Price>
                                    {billingPeriod === 1 ? <Price>${plan.price}<Monthly>/mo</Monthly></Price> :  <Price>${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}<Monthly>/{billingPeriod}mo</Monthly><Gross><ColorfulText>you save ${(billingPeriod*plan.price*discount).toFixed(0)}</ColorfulText></Gross></Price>}
                                    </Price>
                                    <Centered><Note>No pressure. You can change plans or cancel anytime.</Note></Centered>
                                    {billingPeriod === 1 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.monthlyPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.monthlyPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 3 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.threeMonthPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.threeMonthPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 6 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.sixMonthPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.sixMonthPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    {billingPeriod === 12 && 
                                    <Centered>
                                        {props.openRegistration ?
                                        <BuyButton id="order-basic" onClick={() => router.push(`/register?registration=true&priceId=${plan.yearlyPriceId}&planName=${plan.title}&planId=${plan.planId}&billingPeriod=${billingPeriod}`)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        :
                                        <BuyButton id="order-basic" onClick={() => openCheckout(plan.yearlyPriceId, plan.title, plan.planId)} backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon><p>Buy now</p></>}</BuyButton>
                                        }
                                    </Centered>
                                    }
                                    <FeaturesList>  
                                    {plan.features?.map((feature, index) => {
                                        if (feature.includes("Unlimited")) {
                                            const parts = feature.split("Unlimited");
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>
                                                            {parts[0]}
                                                            <ColorfulText><b>Unlimited</b></ColorfulText>
                                                            {parts[1]}
                                                        </FeatureText>
                                                    </Feature>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>{feature}</FeatureText>
                                                    </Feature>
                                                </div>
                                            )
                                        }
                                    })}
                                    <Feature>
                                        <TickIcon>
                                            <Image style={{ height: "auto", width: "100%" }}  src={plusIcon} alt={'icon'}></Image> 
                                        </TickIcon>
                                        <FeatureText><ColorfulText><b>Everything from Standard plan</b></ColorfulText></FeatureText>
                                    </Feature>            
                                    </FeaturesList>
                                </MiddlePlanContainer>            
                            }
                            {plan.title === "Custom" &&
                                <PlanContainer backgroundColor="rgba(101, 120, 248, 0.2)" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">📐</span></Emoji><PlanTitleText>{plan.title}</PlanTitleText></PlanTitle>
                                    <BriefDescription>Tailored to your needs</BriefDescription>
                                    <MainDescription>Unleash the full potential of AI profiles prepared by experts and API access.</MainDescription>
                                    <Price>Custom price</Price>
                                    <Centered><Note>pitch us your idea and we will come up with a tailored plan</Note></Centered>
                                    <Centered>
                                        <BuyButton id="order-basic" onClick={() => setOpenContact(true)}  backgroundColor="black" color="white">{loadingBtn === plan.title ? <Loader color="white"/> : <><BtnIcon><FiPhoneCall style={{width: "100%", height: "auto"}} /></BtnIcon><p>Contact us</p></>}</BuyButton>
                                    </Centered>
                                    <FeaturesList>  
                                    {plan.features?.map((feature, index) => {
                                        if (feature.includes("Unlimited")) {
                                            const parts = feature.split("Unlimited");
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>
                                                            {parts[0]}
                                                            <ColorfulText><b>Unlimited</b></ColorfulText>
                                                            {parts[1]}
                                                        </FeatureText>
                                                    </Feature>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>{feature}</FeatureText>
                                                    </Feature>
                                                </div>
                                            )
                                        }
                                    })}
                                    </FeaturesList>
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
        <>
        {openLoginModal && <LoginModal onClose={undefined} registration={false} />}
        {openContact && <PhoneNumberPopup onClose={() => setOpenContact(false)} />}
        <div className="w-full flex justify-center mt-8">
        <div className="sm:hidden">
            <div className="text-center font-medium mb-4">
                Select a billing period:
            </div>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
            id="tabs"
            name="tabs"
            style={{width: "60vw"}}
            className="block w-full p-6 font-bold rounded-xl border-blue-100 focus:border-blue-500 focus:ring-blue-500"
            onChange={(event) => {
                setBillingPeriod(Number(event.target.value));
            }}
            >
            {tabs.map((tab) => (
                <>
                <option value={tab.period} key={tab.name}>{tab.name}</option>
                </>
            ))}
            </select>
        </div>
        <div className="hidden sm:block flex items-center">
            <nav className="flex space-x-4 text-center items-center" aria-label="Tabs">
            {tabs.map((tab) => (
                <div className="cursor-pointer" key={tab.name} onClick={() => setBillingPeriod(tab.period)}>
                <button
                className={classNames(
                    tab.period === billingPeriod ? 'bg-blue-100 py-4 text-blue-700' : 'text-gray-500 hover:text-gray-700',
                    'rounded-lg px-14 text-lg font-medium'
                )}
                >
                {tab.period === billingPeriod ?<ColorfulText>{tab.name}</ColorfulText> : tab.name}
                </button>
                    {(tab.period !== billingPeriod && tab.period !== 1) && <div className="text-gray-500"><ColorfulText><b>{tab.discount*100}% off</b></ColorfulText></div>}
                </div>
            ))}
            </nav>
        </div>
        </div>
        {renderPlans()}
    </>
    )

}


export default Plans;


const PlansContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr  1fr;
    grid-auto-rows: 1fr;
    grid-gap: 20px;
    margin-top: 2rem;
    color: black;
    justify-content: space-between;
    padding: 1vh 0 3vh 0;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
        display: flex;
    }
`

const ColorfulText = styled.span`
  background: -webkit-linear-gradient(40deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const MainPlanContainer = styled.div`
height: 100%;
@media (max-width: 1023px) {
    height: auto;
    width: 100%;
    margin-bottom: 0.5vh;
    margin-top: 1vh;
}
`
const PlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    background-color: #0D0E16;
    padding: 4vh 4vh 6vh 4vh;
    height: 100%;
    border: solid 3px #ECECEC;
    border-radius: 25px;
    box-shadow: 0px 0px 20px rgba(22, 27, 29, 0.2);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: ${props => props.color || 'black'};
    background-color: white;
    transition: all 0.5s ease;
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const MiddlePlanContainer = styled.div<PlanContainer>`
    width: ${props => props.width || '22vw'};
    background-color: #0D0E16;
    padding: 4vh 4vh 6vh 4vh;
    height: 100%;
    border: solid 3px transparent;
    border-radius: 25px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: 3px 3px 6px rgba(22, 27, 29, 0.2);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: ${props => props.color || 'black'};
    background-color: ${props => props.backgroundColor || 'white'};
    transition: all 0.5s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
        height: auto;
        width: 100%;
    }
`

const Emoji = styled.div`

`

const PlanTitle = styled.div`
    font-size: 2.4vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    justify-content: center;
    width: 100%;
    @media (max-width: 1280px) {
        font-size: 2rem;
    }
`

const PlanTitleText = styled.p`
    width: 100%;
    text-align: center;
    @media (max-width: 1023px) {

    }
`


const BriefDescription = styled.p`
    font-family: 'Lato', sans-serif;
    margin-top: 1vh;
    width: 100%;
    font-weight: 700;
    text-align: center;
    border-bottom: solid 1.5px #DCDCDC;
    padding-bottom: 2vh;
    
`

const PriceLabel = styled.p`
    text-align: center;
    font-size: 1vw;
    width: 100%;
    font-weight: 400;
    margin-top: 0.5rem;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const Price = styled.div`
    font-size: 2.5vw;
    text-align: center;
    line-height: 1.2;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    align-items: flex-end;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    justify-content: center;
    @media (max-width: 1023px) {
        font-size: 5.5vh;
    }
`

const PriceCrossed = styled.div`
    color: black;
    font-size: 1.5vw;
    text-decoration: line-through;
    text-decoration-color: #FF4646;
    width: 100%;
    font-weight: 700;
    text-align: center;
    justify-content: flex-end;
    @media (max-width: 1023px) {
        justify-content: center;
        text-align: center;
        margin-left: 0;
        font-size: 1.2rem;
    }
`

const Note = styled.p`
    text-align: center;
    margin-top: 0vh;
    font-size: 1vw;
    color: #818FB9;
    width: 90%;
    padding: 0.3rem 2.5vw 0 2.5vw;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
    }
`

const BuyButton = styled.button<Button>`
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-size: 110%;
    background-position-x: -1rem;
    color: ${props => props.color || 'white'};
    padding: 0.75rem 0rem 0.75rem 0rem;
    width: 18rem;
    border-radius: 25px;
    margin-top: 3.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-top: 5vh;
        padding: 2vh 2vh 2vh 2vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`



const BtnIcon = styled.div`
    width: auto;
    margin-right: 0.75rem;
    width: 1.2rem;
    height: 1.2rem;

`

const MainDescription = styled.div`
    font-family: 'Lato', sans-serif;
    margin-top: 0.75rem;
    width: 100%;
    text-align: center;
    font-weight: 500;
    line-height: 1.5;
    padding-bottom: 1.5vh;
`

const FeaturesTitle = styled.p`
    font-size: 1.5vw;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.5rem;
    }
`

const FeaturesList = styled.div`
    margin-left: 0.5rem;
    margin-top: 4vh;
`

const Feature = styled.div`
    display: flex;
    align-items: center;
    margin: 2vh 0 0 0;
`

const TickIcon = styled.div`
    width: 1.25rem;
    @media (max-width: 1023px) {
        width: 4vw;
        height: 4vw;
    }
`

const FeatureText = styled.p`
    margin-left: 1vw;
    font-weight: 500;
    font-size: 1.75vh;
    @media (max-width: 1023px) {
        margin-left: 3vw;
        font-size: 0.95rem;
    }
`

const Gross = styled.div`
    font-size: 1vw;
    margin-top: 0.2rem;
    width: 100%;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const Monthly = styled.div`
    font-size: 1vw;
    margin-bottom: 0.2rem;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`