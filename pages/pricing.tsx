import SlideBottom from "@/components/Animated/SlideBottom";
import SlideBottomView from "@/components/Animated/SlideBottomView";
import Centered from "@/components/Centered";
import Navbar from "@/components/Landing/Navbar";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import tickIcon from "../public/images/tickGreen.png"
import plusIcon from "../public/images/plus.png"
import Section from '@/components/Landing/Section';
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import Footer from '@/components/Landing/Footer';
import { FiShoppingBag } from "react-icons/fi";
import giftIcon from "../public/images/giftIcon.png";
import { useEffect, useState } from "react";
import PhoneNumberPopup from "@/components/Modals/InformationalModals/PhoneNumberPopup";
import TrialBanner from "@/components/Landing/TrialBanner";
import xIcon from "../public/images/closeIcon.png";
import Head from "next/head";

const tabs = [
    { name: 'Miesiąc', period: 1, discount: 0},
    { name: '3 Miesiące', period: 3, discount: 0.1},
    { name: '6 Miesięcy', period: 6, discount: 0.15},
    { name: '1 rok', period: 12, discount: 0.2},
  ]
  

const plans = [
    {title: "Assistant Basic", description: "Marketingowa część Asystenta z systemowym Asystentem AI.", isPro: false, features: ["75 000 elixiru/msc. (~80 stron A4)", "Generowanie postów social media", "Generowanie maili i newsletterów", "Generowanie artykułów", "Generowanie opisów produktów", "Zapisywanie treści"], price: 99,  monthlyPriceId: "price_1NFwcqFe80Kn2YGGi4iIulhc", threeMonthPriceId: "price_1NIZENFe80Kn2YGG2T7ztNTj", sixMonthPriceId: "price_1NIZFJFe80Kn2YGG7Eu6tjqb", yearlyPriceId: "price_1NIZFUFe80Kn2YGGQqUbkYaA"}, 
    {title: "Assistant Pro", description: "Podstawowa wersja Asystenta, rozszerzone umiejętności.", isPro: false, features: ["250 000 elixiru/msc. (~270 stron A4)", "1 główny folder z zasobami", "10 wgranych plików do 15MB", "Skanowanie stron internetowych", "Wgrywanie PDF, PPTX, TXT i DOCX", "Chat z firmowym AI", "Copywriter AI"], price: 299, monthlyPriceId: "price_1NFwxWFe80Kn2YGGvpHuUfpi", threeMonthPriceId: "price_1NIZG3Fe80Kn2YGGJqZkXm1h", sixMonthPriceId: "price_1NIZGFFe80Kn2YGGUC9I2Se2", yearlyPriceId: "price_1NIZGPFe80Kn2YGGAXzh3v6d", extraFunctionalities: "Basic"}, 
    {title: "Assistant Business", description: "Podstawowa wersja Asystenta, maksimum treści.", isPro: false, features: ["1M elixiru/msc. (~1100 stron A4)", "Nielimitowana ilość folderów", "Nielimitowana ilość wgranych zasobów", "Nielimitowana liczba użytkowników", "Dostęp do najnowszych funkcjonalności", "1000+ szblonów poleceń do AI"], price: 799, monthlyPriceId: "price_1NFx0EFe80Kn2YGGCWikSSti", threeMonthPriceId: "price_1NIZGjFe80Kn2YGGyUOXvbng", sixMonthPriceId: "price_1NIZGzFe80Kn2YGG1pfRLho5", yearlyPriceId: "price_1NIqZ6Fe80Kn2YGGP1MrMaOM", extraFunctionalities: "Assistant + Basic"},
]

const features = [
    {title: "Marketing AI", basic: {hasFeature: true, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Zestaw formularzy do generowania treści jak posty, artykuły, maile czy opisy produktów."},
    {title: "Zapisywanie Treści", basic: {hasFeature: true, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Możliwość zapisania treści, aby wrócić do nich później."},
    {title: "Copywriting AI", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Inteligentny edytor AI do generowania dłuższych treści z nastawieniem na SEO."},
    {title: "Chat", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Chat z firmowymi Asystentami AI, którzy odpowiedzą na Twoje pytania i polecenia dotyczące wgranych zasobów i nie tylko."},
    {title: "Wgrywanie wiedzy", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Uczenie Asystentów AI na podstawie własnych zasobów, z którymi możesz pisać oraz generować treści."},
    {title: "Wgrywanie plików", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Możliwość wgrania własnych plików (PDF, TXT, DOCX, PPTX), na których Asystent będzie bazował."},
    {title: "Skanowanie podstron", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Możliwość skanowania treści z wybranych podstron, na których Asystent będzie bazował."},
    {title: "Wgrywanie filmików", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Możliwość wgrania filmiku YouTube, na którym Asystent będzie bazował."},
    {title: "Liczba folderów", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: "1"}, business: {hasFeature: true, value: "∞"}, description: "Foldery, dzięki którym możesz grupować wgrane zasoby na departamenty lub obsługiwawne firmy."},
    // {title: "Własny styl wypowiedzi", basic: {hasFeature: false, value: ""}, pro: {hasFeature: true, value: ""}, business: {hasFeature: true, value: ""}, description: "Własny styl wypowiedzi, który Asystent AI będzie wykorzystywał do generowania treści."},
    {title: "Ilość wgranych zasobów", basic: {hasFeature: false, value: "0"}, pro: {hasFeature: true, value: "10"}, business: {hasFeature: true, value: "∞"}, description: "Ilość wgranych zasobów (PDF, TXT, DOCX, PPTX, Strony www, YouTube), na których Asystent będzie bazował."},
    {title: "Wyszukiwarka propmtów", basic: {hasFeature: false, value: ""}, pro: {hasFeature: false, value: ""}, business: {hasFeature: true, value: ""}, description: "Zestaw 1000+ najefektywniejszych poleceń do AI z zakresu marketingu i sprzedaży."},
    {title: "Miejsce na zasoby", basic: {hasFeature: false, value: "0"}, pro: {hasFeature: true, value: "15 MB"}, business: {hasFeature: true, value: "∞"}, description: "Łączna maksymalna wielkość wgranych zasobów, na których Asystent bazuje swoje odpowiedzi."},
    {title: "Liczba użytkowników", basic: {hasFeature: true, value: "1"}, pro: {hasFeature: true, value: "1"}, business: {hasFeature: true, value: "∞"}, description: "Liczba użytkowników z dostępem do firmowego konta."},
    {title: "Elixir", basic: {hasFeature: true, value: "75 000ml"}, pro: {hasFeature: true, value: "250 000ml"}, business: {hasFeature: true, value: "1 000 000ml"}, description: "Elixir jest zużywany do generowania i wgrywania treści. Przyjmujemy, że na całą kartkę A4 (~350 słów) przypada ~900ml."},
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


const Pricing = () => {

    const [openContactPopup, setOpenContactPopup] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [openBusinessOnboarding, setOpenBusinessOnboarding] = useState(false);
    const router = useRouter();
    const [billingPeriod, setBillingPeriod] = useState(1);
    const [version, setVersion] = useState("individual");
    const [discount, setDiscount] = useState(0.1);
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }, []);

    useEffect(() => {
        if( router.query.type) {
            setVersion(router.query.type as string);
        }
    }, [router.query.type]);
    
    const handleNewsletterScroll = () => {
        const contactSection = document.getElementById("newsletter")!;
        contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    useEffect(() => {
        if (billingPeriod === 3) {
            setDiscount(0.1);
        } else if (billingPeriod === 6) {
            setDiscount(0.15);
        } else if (billingPeriod === 12) {
            setDiscount(0.2);
        }
    }, [billingPeriod]);


    const renderPlans = () => {
        const renderedPlans = plans.map((plan) => {
            return (
                        <MainPlanContainer key={plan.title}>
                            {plan.title === "Assistant Basic" &&
                                <PlanContainer backgroundColor="rgba(101, 120, 248, 0.2)" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">🖋️</span></Emoji><PlanTitleText>{plan.title}</PlanTitleText></PlanTitle>
                                    <BriefDescription>Dla okazjonalnego influencera</BriefDescription>
                                    <MainDescription>Marketingowa część Asystenta z systemowym Asystentem AI.</MainDescription>
                                    <PriceLabel>Cena netto:</PriceLabel>
                                    {billingPeriod === 1 ? <Price>{plan.price}zł<Gross>miesięcznie</Gross></Price> :  <Price>{(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}zł<Gross><ColorfulText>oszczędzasz {(billingPeriod*plan.price*discount).toFixed(0)}zł</ColorfulText></Gross></Price>}
                                    <Centered><Note>z możliwością rezygnacji w każdym momencie</Note></Centered>
                                    {billingPeriod === 1 && <Centered><BuyButton id="order-basic" onClick={() => router.push(`/order/basic?price=${plan.price}&priceId=${plan.monthlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 3 && <Centered><BuyButton id="order-basic" onClick={() => router.push(`/order/basic?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.threeMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 6 && <Centered><BuyButton id="order-basic" onClick={() => router.push(`/order/basic?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.sixMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 12 && <Centered><BuyButton id="order-basic" onClick={() => router.push(`/order/basic?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.yearlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod !== 1 && <Centered><div className="text-black mt-2">bez podłączania karty kredytowej</div></Centered>}
                                    <FeaturesList>
                                    <FeaturesTitle>Zalety</FeaturesTitle>      
                                    {plan.features?.map((feature) => {
                                        return (
                                            <div key={feature}>
                                                <Feature>
                                                    <TickIcon>
                                                        <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                    </TickIcon>
                                                    {feature === "Chat z Asystentem" ?
                                                        <FeatureText>{feature}</FeatureText>
                                                        :
                                                        <FeatureText>{feature}</FeatureText>
                                                    }

                                                </Feature>
                                            </div>
                                        )
                                    })}
                                    </FeaturesList>
                                </PlanContainer>       
                            }
                            {plan.title === "Assistant Pro" &&
                                <PlanContainer backgroundColor="white" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">💎</span> </Emoji><PlanTitleText>Assistant <ColorfulText>Pro</ColorfulText></PlanTitleText> </PlanTitle>
                                    <BriefDescription>Dla współpracownika i freelancera</BriefDescription>
                                    <MainDescription>Własne AI bazujące na wgranych treściach dostępne z wszystkimi funkcjonalnościami.</MainDescription>
                                    <PriceLabel>Cena netto:</PriceLabel>
                                    <Price>
                                        {/* <PriceCrossed>970,00zł</PriceCrossed> */}
                                        {billingPeriod === 1 ? <Price>{plan.price}zł<Gross>miesięcznie</Gross></Price> :  <Price>{(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}zł<Gross><ColorfulText>oszczędzasz {(billingPeriod*plan.price*discount).toFixed(0)}zł</ColorfulText></Gross></Price>}
                                    </Price>
                                    <Centered><Note>z możliwością rezygnacji w każdym momencie</Note></Centered>
                                    {billingPeriod === 1 && <Centered><BuyButton id="order-basic" onClick={() => router.push(`/order/pro?price=${plan.price}&priceId=${plan.monthlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 3 && <Centered><BuyButton id="order-pro" onClick={() => router.push(`/order/pro?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.threeMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 6 && <Centered><BuyButton id="order-pro" onClick={() => router.push(`/order/pro?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.sixMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 12 && <Centered><BuyButton id="order-pro" onClick={() => router.push(`/order/pro?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.yearlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod !== 1 && <Centered><div className="text-black mt-2">bez podłączania karty kredytowej</div></Centered>}
                                    <FeaturesList>
                                    <FeaturesTitle>Zalety</FeaturesTitle>      
                                    {plan.features?.map((feature, index) => {
                                        if (feature.includes("Chat")) {
                                            const parts = feature.split("Chat");
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>
                                                            {parts[0]}
                                                            <ColorfulText><b>Chat</b></ColorfulText>
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
                                        <FeatureText>Wszystko z pakietu Basic</FeatureText>
                                    </Feature>                                    
                                    </FeaturesList>
                                </PlanContainer>                   
                            }
                            {plan.title === "Assistant Business" &&
                                <PlanContainer backgroundColor="rgba(100, 181, 255, 0.2)" color="black" width="auto">
                                    <PlanTitle><Emoji><span role="img" aria-label="diamond">🏛️</span></Emoji><PlanTitleText>{plan.title}</PlanTitleText> </PlanTitle>
                                    <BriefDescription>Dla Twojego biznesu</BriefDescription>
                                    <MainDescription>Maksimum możliwości AI, brak ograniczeń w tworzeniu Asystentów i wgrywaniu treści.</MainDescription>
                                    <PriceLabel>Cena netto:</PriceLabel>
                                    <Price>
                                    {billingPeriod === 1 ? <Price>{plan.price}zł<Gross>miesięcznie</Gross></Price> :  <Price>{(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}zł<Gross><ColorfulText>oszczędzasz {(billingPeriod*plan.price*discount).toFixed(0)}zł</ColorfulText></Gross></Price>}
                                    </Price>
                                    <Centered><Note>z możliwością rezygnacji w każdym momencie</Note></Centered>
                                    {billingPeriod === 1 && <Centered><BuyButton id="order-business" onClick={() => router.push(`/order/business?price=${plan.price}&priceId=${plan.monthlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 3 && <Centered><BuyButton id="order-business" onClick={() => router.push(`/order/business?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.threeMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 6 && <Centered><BuyButton id="order-business" onClick={() => router.push(`/order/business?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.sixMonthPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod === 12 && <Centered><BuyButton id="order-business" onClick={() => router.push(`/order/business?price=${(plan.price*billingPeriod-(billingPeriod*plan.price*discount)).toFixed(0)}&priceId=${plan.yearlyPriceId}&months=${billingPeriod}`)} backgroundColor="black" color="white"><BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Przejdź do zakupu</BuyButton></Centered>}
                                    {billingPeriod !== 1 && <Centered><div className="text-black mt-2">bez podłączania karty kredytowej</div></Centered>}
                                    <FeaturesList>
                                    <FeaturesTitle>Zalety</FeaturesTitle>      
                                    {plan.features?.map((feature, index) => {
                                        if (feature.includes("Nielimitowana")) {
                                            const parts = feature.split("Nielimitowana");
                                            return (
                                                <div key={index}>
                                                    <Feature>
                                                        <TickIcon>
                                                            <Image style={{ height: "auto", width: "100%" }}  src={tickIcon} alt={'icon'}></Image> 
                                                        </TickIcon>
                                                        <FeatureText>
                                                            {parts[0]}
                                                            <ColorfulText><b>Nielimitowana</b></ColorfulText>
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
                                        <FeatureText>Wszystko z pakietu Pro</FeatureText>
                                    </Feature>            
                                    </FeaturesList>
                                </PlanContainer>            
                            }
                        </MainPlanContainer>
            )
        })
        
        return (
            <PlansContainer>
                {openContactPopup && <PhoneNumberPopup onClose={() => setOpenContactPopup(false)} /> }
                {renderedPlans}
            </PlansContainer>
        )
    }

  return (
    <>
    <Head>
        <title>Pricing | Yepp AI</title>
        <meta name = "theme-color" content = "#FFFFFF" />
        <meta name="description" content="Subscription plans and offer." />
    </Head>

    <Layout>
      <Navbar onNewsletterClick={() => handleNewsletterScroll()} />
        <HeroSection>
            <MiniTitle>PLANY & SUBSKRYPCJE</MiniTitle>
            <SlideBottom>
            <HeroText>Gotowy na rewolucję?</HeroText>
            </SlideBottom>
            {/* <ToggleContainer>
                {version === "individual" &&
                    <>
                        <SelectedToggleBtn>Oferta indywidualna</SelectedToggleBtn>
                        <ToggleBtn onClick={() => setVersion("business")}>Oferta firmowa</ToggleBtn>
                    </>
                }
                {version === "business" &&
                    <>
                        <ToggleBtn onClick={() => setVersion("individual")}>Oferta indywidualna</ToggleBtn>
                        <SelectedToggleBtn>Oferta firmowa</SelectedToggleBtn>
                    </>
                }
            </ToggleContainer> */}
            <StartBtnContainer>
            </StartBtnContainer>
        </HeroSection>
        <div className="w-full flex justify-center mt-4">
        <div className="sm:hidden">
            <div className="text-center font-medium mb-4">
                Wybierz okres rozliczeniowy:
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
                    {(tab.period !== billingPeriod && tab.period !== 1) && <div className="text-gray-500"><ColorfulText><b>{tab.discount*100}% taniej</b></ColorfulText></div>}
                </div>
            ))}
            </nav>
        </div>
        </div>
        {renderPlans()}
        {/* {version === "business" &&
        <ConsultationBanner />
        } */}
        <TrialBanner />
        {!mobile &&
        <>
        <div className="px-4 mt-20 sm:px-6 lg:px-0 w-full flex justify-center">
            <div className="flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-4/12 py-2 align-middle">
                    <table className="min-w-4/12 border-separate border-spacing-0">
                    <thead className="sticky top-0">
                        <tr>
                        <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-gray-200 bg-white bg-opacity-75 py-3.5 pl-8 pr-3 text-center text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter w-72 sm:pl-6 lg:pl-8"
                        ></th>
                        <th
                            scope="col"
                            className="sticky top-0 z-10 hidden border-b border-l border-gray-200 bg-white bg-opacity-75 px-4 py-3.5 text-center w-36 text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                        >
                            Basic
                        </th>
                        <th
                            scope="col"
                            className="sticky top-0 z-10 hidden border-b border-l border-gray-200 bg-white bg-opacity-75 px-4 py-3.5 text-center w-36 text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                        >
                            Pro
                        </th>
                        <th
                            scope="col"
                            className="sticky top-0 z-10 border-b border-l border-gray-200 bg-white bg-opacity-75 px-4 py-3.5 text-center w-36 text-2xl font-semibold text-gray-900 backdrop-blur backdrop-filter"
                        >
                            Business
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature, featureIdx) => (
                        <tr key={feature.title}>
                            <td
                            className={classNames(
                                featureIdx !== features.length - 1 ? 'border-b border-gray-200' : '',
                                'py-6 px-6 text-base font-medium text-gray-900 lg:px-8 w-81'
                            )}
                            >
                            <b className="text-xl">{feature.title}</b><br />
                            <p className="mt-2 text-gray-700">{feature.description}</p>
                            </td>
                            <td
                            className={classNames(
                                featureIdx !== features.length - 1 ? 'border-b border-gray-200' : '',
                                'py-4 border-l text-xl font-bold sm:table-cell flex justify-center w-10'
                            )}
                            >
                            {feature.basic.hasFeature ? 
                                    feature.basic.value.length === 0 ?
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                    :
                                    <div className="text-center">
                                        {feature.basic.value}
                                    </div>
                                :
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={xIcon} alt={'no'}></Image> 
                            }
                            </td>
                            <td
                            className={classNames(
                                featureIdx !== features.length - 1 ? 'border-b border-gray-200' : '',
                                'px-6 py-4 border-l text-xl font-bold lg:table-cell'
                            )}
                            >
                            {feature.pro.hasFeature ? 
                                    feature.pro.value.length === 0 ?
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                    :
                                    <div className="text-center">
                                        {feature.pro.value}
                                    </div>
                                :
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={xIcon} alt={'no'}></Image> 
                            }
                            </td>
                            <td
                            className={classNames(
                                featureIdx !== features.length - 1 ? 'border-b border-gray-200' : '',
                                'px-6 py-4 text-sm text-2xl font-bold border-l'
                            )}
                            >
                            {feature.business.hasFeature ? 
                                    feature.business.value.length === 0 ?
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={tickIcon} alt={'yes'}></Image> 
                                    :
                                    <div className="text-center">
                                        <ColorfulText>{feature.business.value}</ColorfulText>
                                    </div>
                                :
                                    <Image className="block mx-auto" style={{ height: "auto", width: "2rem" }}  src={xIcon} alt={'no'}></Image> 
                            }
                            </td>
                        </tr>
                        ))}
                        <tr>
                            <td className='px-6 py-4 text-sm text-2xl font-bold'>
                            </td>
                            <td className='px-6 py-6 text-sm text-lg font-bold border-l border-t'>
                                <div className="w-full flex justify-between mb-2">
                                    <div className="font-medium ml-1">Cena netto:</div>
                                    <div className="flex items-end">99zł <div className="font-medium ml-1">/msc</div></div>
                                </div>
                            <SmallBuyBtn className="w-full flex justify-center" onClick={() => router.push("/order/basic?price=99&priceId=price_1NFwcqFe80Kn2YGGi4iIulhc&months=1")} backgroundColor="black" color="white" id="order-basic">
                                <BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Wybierz
                            </SmallBuyBtn>
                            </td>
                            <td className='px-6 py-6 text-sm text-lg font-bold border-l border-t'>
                            <div className="w-full flex justify-between mb-2">
                                    <div className="font-medium ml-1">Cena netto:</div>
                                    <div className="flex items-end">299zł<div className="font-medium ml-1">/msc</div></div>
                            </div>
                            <SmallBuyBtn className="w-full flex justify-center" onClick={() => router.push("/order/pro?price=299&priceId=price_1NFwxWFe80Kn2YGGvpHuUfpi&months=1")} backgroundColor="black" color="white" id="order-basic">
                                <BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Wybierz
                            </SmallBuyBtn>
                            </td> 
                            <td className='px-6 py-6 text-sm text-lg font-bold border-l border-t'>
                            <div className="w-full flex justify-between mb-2">
                                    <div className="font-medium ml-1">Cena netto:</div>
                                    <div className="flex items-end">799zł <div className="font-medium ml-1">/msc</div></div>
                            </div>
                            <SmallBuyBtn className="w-full flex justify-center" onClick={() => router.push("/order/business?price=799&priceId=price_1NFx0EFe80Kn2YGGCWikSSti&months=1")} backgroundColor="black" color="white" id="order-basic">
                                <BtnIcon><FiShoppingBag style={{width: "100%", height: "auto"}} /></BtnIcon>Wybierz
                            </SmallBuyBtn>

                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </>
        }
        <Section>
        <div id="newsletter"><LearnMoreSection /></div>
        </Section>
        <Footer/>
    </Layout>
    </>
  );
};


export default Pricing;


const Layout = styled.div`
    width: 100vw;
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: white;
    padding: 0 8vw 0 8vw;
    @media (max-width: 1023px) {
    padding: 0 5vw 0 5vw;
    }
`

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  margin-top: 8vh; 
  @media (max-width: 1023px) {
    margin-top: 4vh; 
}
`
const HeroText = styled.h1`
    font-size: 6vw;
    font-weight: 700;
    line-height: 1.2;
    margin-top: -0.5rem;
    @media (max-width: 1023px) {
        margin-top: 0.5rem;
        font-size: 2rem;
    }
`

const MiniTitle = styled.p`
    font-size: 1vw;
    width: 100%;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
`

const StartBtn = styled.button`
    width: 24rem;
    height: 3.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: solid 3px transparent;
    border-radius: 20px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    color: white;
    display: flex;
    font-size: 1.2rem;
    font-weight: 700;
    justify-content: center;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (min-width: 1023px) {
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    }
    @media (max-width: 1023px) {
    background-color: #04040A;
    width: 90%;
    }
`

const ToggleContainer = styled.div`
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const ToggleBtn = styled.button`
    margin: 0 1.5rem 0 1.5rem;
    font-weight: 700;
    padding: 0.75rem 2rem 0.75rem 2rem;
    @media (max-width: 1023px) {
        padding: 0.25rem 1rem 0.25rem 1rem;
        font-size: 0.8rem;
        margin: 0 0.6rem 0 0.6rem;
    }
`

const SelectedToggleBtn = styled.button`
    margin: 0 1.5rem 0 1.5rem;
    font-weight: 700;
    padding: 0.75rem 2rem 0.75rem 2rem;
    border-bottom: solid 3px #6578F8;
    @media (max-width: 1023px) {
        padding: 0.25rem 1rem 0.25rem 1rem;
        font-size: 0.8rem;
        margin: 0 0.6rem 0 0.6rem;
    }
`

const StartBtnContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
`

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
    padding: 4vh;
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
    flex-wrap: wrap;
    width: 100%;
    display: flex;
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
    padding: 0.75rem 3rem 0.75rem 3rem;
    border-radius: 15px;
    margin-top: 3.5vh;
    display: flex;
    align-items: center;
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

const Monthly = styled.div`
    font-size: 1vw;
    margin-bottom: 0.2rem;
    margin-left: 0.2vw;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
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
        font-size: 1.2rem;
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
    }
`

const Gross = styled.div`
    font-size: 1vw;
    margin-top: 0.3rem;
    display: flex;
    justify-content: center;
    width: 100%;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const SmallBuyBtn = styled.button<Button>`
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-size: 110%;
    background-position-x: -1rem;
    color: ${props => props.color || 'white'};
    padding: 0.5rem 3rem 0.5rem 3rem;
    border-radius: 15px;
    margin-top: 0.5vh;
    display: flex;
    align-items: center;
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