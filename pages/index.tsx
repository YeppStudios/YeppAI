import SlideBottom from '@/components/Animated/SlideBottom';
import Centered from '@/components/Centered';
import HeroText from '@/components/Landing/HeroText';
import Navbar from '@/components/Landing/Navbar';
import Head from 'next/head'
import styled from 'styled-components';
import Image from 'next/image';
import laptopVisualization from "../public/images/laptopVisualization.png";
import iphoneMockup from "../public/images/iphoneMockup.png";
import meshBackground2 from "../public/images/meshBackground2.png";
import mobileMeshBackground from "../public/images/mobileMeshBackground.png";
import PartnersSection from '@/components/Landing/PartnersSection';
import Section from '@/components/Landing/Section';
import LearnMore from '@/components/Landing/LearnMore';
import LeftFeature from '@/components/Landing/LeftFeature';
import RightFeature from '@/components/Landing/RightFeature';
import TestimonialsSection from '@/components/Landing/TestimonialsSection';
import PlansHeader from '@/components/Landing/PlansHeader';
import PlansSection from '@/components/Landing/PlansSection';
import LearnMoreSection from '@/components/Landing/LearnMoreSection';
import Footer from '@/components/Landing/Footer';
import Loading from '@/components/Common/Loading';
import firstProFeature from "../public/images/firstProFeature.png";
import secondProFeature from "../public/images/secondProFeature.png";
import thirdProFeature from "../public/images/thirdProFeature.png";
import fourthProFeature from "../public/images/fourthProFeature.png";
import fifthProFeature from "../public/images/fifthProFeature.png";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillGiftFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Title from '@/components/Common/Title';
import Banner from '@/components/Landing/Banner';
import BuyAsystentBanner from '@/components/Landing/BuyAsystentBanner';
import BiznesSummary from '@/components/Landing/BusinessSummary';
import ScheduleMeeting from '@/components/Landing/ScheduleMeeting';
import BusinessStats from '@/components/Landing/BusinessStats';
import BusinessSignupModal from '@/components/Modals/OnboardingModals/BusinessSignupModal';

interface SectionWithBackground {
  image: any,
  mobileBackground: any
}

interface CustomColor {
  color: string
}

const Homepage = () => {
  const [mobile, setMobile] = useState(false);
  const [openBusinessSignup, setOpenBusinessSignup] = useState(false);

  const router = useRouter();

  const handleNewsletterScroll = () => {
    const contactSection = document.getElementById("newsletter")!;
    contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  }, []);

    return (
      <div>
        <Head>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Odkryj potęgę sztucznej inteligencji i szybko twórz unikalne artykuły, posty, opisy produktów, strategie i wiele więcej. Usprwanij swój proces twórczy już dziś!" />
          <title>Asystent AI</title>
        </Head>
        <PageContent>
          <Loading />
          <Banner />
          {openBusinessSignup && <BusinessSignupModal  onClose={() => setOpenBusinessSignup(false)} />}
          <Navbar onNewsletterClick={() => handleNewsletterScroll()} />
          <HeroSection>
              <HeroText>Twoje firmowe AI.</HeroText>
              <div>
              <DescriptionHero color="black">
                Asystent napisze za Ciebie spersonalizowane treści marketingowe i wyszuka kluczowe informacje, gdy najbardziej ich potrzebujesz.
              </DescriptionHero>
              <Centered>
              <LoginButton onClick={() => router.push("/chat")}>Zaloguj się</LoginButton>
              </Centered>
              <Centered>
                {mobile ?
                  <TestButton id="landing-big-test-btn" onClick={() => router.push("assets?registration=true&company=true")}><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></TestButton>
                  :
                  <TestButton id="landing-big-test-btn" onClick={() => router.push("assets?registration=true&company=true")}><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></TestButton>
                }
              </Centered>
              <LearnMore color="black"/>
              </div>
          </HeroSection>
          <SlideBottom>
                <Centered>
                  <LaptopContainer>
                      <Image style={{ width: "auto", height: "100%" }}  src={laptopVisualization} alt={'preview'}></Image> 
                  </LaptopContainer>
                  </Centered>
                  <Centered>
                  <IphoneContainerMobile>
                      <Image style={{ width: "100%", height: "auto" }}  src={iphoneMockup} alt={'preview'}></Image> 
                  </IphoneContainerMobile>
                </Centered>
          </SlideBottom>
          <PartnersSection />
          <Section>
            <Centered>
            <Title fontSize='6vh' textAlign='center' width='70%' color="black" mobileFontSize='4vh' mobileTextAlign='center'>
              Jesteś gotowy na własny model Sztucznej Inteligencji?
            </Title>
            </Centered>
            <Centered><BigTestButton onClick={() => router.push("assets?registration=true&company=true")}><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></BigTestButton></Centered>
            </Section>
          <ProFunctionalities>
            <Title fontSize='6vh' textAlign='left' width='100%' color="white" mobileFontSize='5vh' mobileTextAlign='center'>Poznaj Asystenta <ColorfulText>Business</ColorfulText>:</Title>
            <LeftDescription>Firmowe AI, które jest integralną częścią Twojego biznesu.</LeftDescription>
            <RightFeature 
              title="Twoich firmowych Asystentów AI." 
              image={firstProFeature}
              text="Zdefiniuj firmowych Asystentów AI zasilając ich wiedzą ekspercką, a oni wspomogą Twój zespól w codziennych zadaniach pisząc treści, wspomagając w podejmowaniu decyzji opartych na danych, planowaniu oraz kreatywności."
              color="white"
            />
            <LeftFeature
              title="Twój chat obsługi klienta na stronie internetowej." 
              image={fifthProFeature} 
              text="Asystent Business już w czerwcu będzie potrafił przeobrazić się w chat an Twojej stronie, który zaopiekuję się klientem w pierwszym kontakcie."
              color="white"
              marginTop='3vh'
            />
            <RightFeature 
              title="Twoją firmową encyklopedię wiedzy." 
              image={fourthProFeature} 
              text="Cenne dane giną z czasem w stosie papierów lub tysięcy plików? Asystent zasilony dokumentami pozwoli w prosty sposób wykorzystać tą bezcenną wiedzę."
              color="white"
             />
            <LeftFeature 
              title="Twojego kreatywnego marketingowca." 
              image={thirdProFeature} 
              text="Asystent zasilony wiedzą o produktach, najlepszych praktykach marketingowych i sprzedażowych jest niezastąpioną pomocą w pisaniu unikatowych treści marketingowych."
              color="white"
              marginTop='3vh'
             />
            <RightFeature 
              title="Twojego pomocnika od copywritingu." 
              image={secondProFeature} 
              text="Copywriter wiedzący o firmie niemal wszystko? Asystent Business z odpowiednio przygotowanymi danymi to istny poeta! To nie tylko edytor treści, który po podaniu tematu i słów kluczowych napisze dla Ciebie artykuł, bloga czy newsletter- to edytor, który zna Twoje problemy i przewagi."
              color="white"
            />
            <Centered><BigTestButton id="landing-big-test-btn" onClick={() => router.push("assets?registration=true&company=true")}><BsFillGiftFill /><TestText>Zacznij za darmo!</TestText></BigTestButton></Centered>
          </ProFunctionalities>
          <Section>
            <BusinessStats />
          </Section>
          <Section>
            <Centered>
              <Title fontSize='5.5vh' textAlign='center' width='60%' color="black" mobileFontSize='4vh' mobileTextAlign='center'>
                  W telegraficznym skrócie, Asystent Biznes jest z Tobą aby:
              </Title>
            </Centered>
            <BiznesSummary type="pro"/>
          </Section>
          {/* <BusinessSignupBanner onClick={() => setOpenBusinessSignup(true)} /> */}
          <Section>
            <ScheduleMeeting />
          </Section>
          <div id="offer"></div>
          <Section >
            <PlansHeader color="black" text="Twórz treści nawet 10X szybciej i zaadaptuj swój biznes do Nowej Ery Technologicznej, zyskując przewagę!">
              Wybierz swojego Asystenta już dziś.
            </PlansHeader>
            <PlansSection />
          </Section>
          {/* <Section>
            <ExtrasBanner />
          </Section> */}
          <Section>
            <div id="newsletter"></div>
            <LearnMoreSection />
          </Section>
          <Footer />
        </PageContent>
      </div>
    )
}

export default Homepage;

const PageContent = styled.div`
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
  justify-content: space-between;
  align-items: center;
  margin-top: 3vh;
  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
`

const DescriptionHero = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 2vh;
    width: 31vw;
    text-align: left;
    font-weight: 500;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 1rem;
        width: 100%;
        padding: 0 2rem 0 2rem;
    }
`

const Description = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 2vh;
    width: 70vw;
    text-align: center;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 2vh;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
`

const LoginButton = styled.button`
    font-size: 2.4vh;
    margin-top: 3vh;
    padding: 1.5vh 5vw 1.5vh 5vw;
    width: 70vw;
    background: #EEF1F3;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    border: none;
    color: black;
    font-weight: 700;
    @media (min-width: 1023px) {
      display: none;
    }
`

const TestButton = styled.button`
    font-size: 2.4vh;
    padding: 1.5vh 5vw 1.5vh 5vw;
    width: 70vw;
    background: #0D0E16;
    margin-top: 3vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    @media (min-width: 1023px) {
      display: none;
    }
`

const LaptopContainer = styled.div`
  width: auto;
  height: 74vh;
  display: flex;
  justify-content: center;
  margin-top: 10vh;
  @media (max-width: 1023px) {
    display: none;
  }
`

const IphoneContainerMobile = styled.div`
  width: 75%;
  height: auto;
  margin-top: 5vh;
  padding: 0;
  margin-bottom: 0rem;
  @media (min-width: 1023px) {
    display: none;
  }
`

const SectionWithBackground = styled.div<SectionWithBackground>`
  background-image: url(${props => props.image.src});
  width: 100vw;
  margin-left: -8vw;
  padding: 20vh 8vw 20vh 8vw;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90%;
  @media (max-width: 1023px) {
    padding: 10vh 5vw 10vh 5vw;
    margin-left: -5vw;
    background-size: 120%;
    background-image: url(${props => props.mobileBackground.src});
  }
`


const BigTestButton = styled.button`
  font-size: 1.2rem;
  margin-top: 5vh;
  padding: 2vh 10vh 2vh 10vh;
  display: flex;
  align-items: center;
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 110%;
  background-position-x: -1rem;
  color: white;
  transition: all 0.3s ease;
  border-radius: 20px;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  &:hover {
      box-shadow: none;
      transform: scale(0.95);
  }
  @media (max-width: 1023px) {
      padding: 1.5vh 15vw 1.5vh 15vw;
      font-size: 2.4vh;
      margin-top: 8vh;
  }

`
const TestText = styled.p`
    margin-left: 1.5vw;
    @media (max-width: 1023px) {
        margin-left: 3vw;
    }
`

const ProFunctionalities = styled.div`
    margin-top: 20vh;
    padding: 15vh 8vw 10vh 8vw;
    background-color: #0D0E16;
    width: 100vw;
    margin-left: -8vw;
    @media (max-width: 1023px) {
        margin-left: -5vw;
        padding: 15vh 5vw 10vh 5vw;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`

const LeftDescription = styled.p`
    color: white;
    width: 40%;
    font-size: 1.2rem;
    margin-top: 1rem;
    @media (max-width: 1023px) {
        text-align: center;
        width: 85%;
        margin-bottom: 3rem;
  }
`

const ColorfulText = styled.span`
  background: -webkit-linear-gradient(-70deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const AssistantBtn = styled.div`
    margin-top: 4rem;
`