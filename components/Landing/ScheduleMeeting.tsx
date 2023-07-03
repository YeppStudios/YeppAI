import styled from "styled-components";
import Image from "next/image";
import cezary from "../../public/images/cezary.png";
import { BsCalendarCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import Centered from "../Centered";

const ScheduleMeeting = () => {

    const [mobile, setMobile] = useState(true);

  
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }
    }, []);
    
    return (
        <Container>
            <TestimonialContainer>
                <TestimonialImageContainer>
                <TestimonialImage>
                    <Image style={{ width: "100%", height: "auto" }}  src={cezary} alt={'profile'}></Image> 
                </TestimonialImage>
                </TestimonialImageContainer>  
                <div>
                    <Name>Cezary Lech</Name>
                    <Role>Co-Founder Sprawnego Marketingu</Role>
                    {!mobile &&
                           <Testimonial>&quot;Asystent Business przeniesie Twoją firmę na poziom wykorzystania sztucznej inteligencji niedostepny zwykłemu uźytkownikowi ChataGPT. Zyskasz narzędzie, które nauczone Twojego branżowego słownictwa, oferty oraz sposobu w jakim komunikujesz się z klientami będzie w stanie zwracać treści niemal identyczne jak Twój dział sprzedaży czy zewnętrzna agencja.&quot;</Testimonial>
                    }
                </div>
                {mobile &&
                    <Testimonial>&quot;Asystent Business przeniesie Twoją firmę na poziom wykorzystania sztucznej inteligencji niedostepny zwykłemu uźytkownikowi ChataGPT. Zyskasz narzędzie, które nauczone Twojego branżowego słownictwa, oferty oraz sposobu w jakim komunikujesz się z klientami będzie w stanie zwracać treści niemal identyczne jak Twój dział sprzedaży czy zewnętrzna agencja.&quot;</Testimonial>
                }
            </TestimonialContainer>
            <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}}>
                {mobile ?
                <Centered>
                 <Button href="https://calendly.com/asystentai/asystent-business-konsultacja">
                    <CalendarIcon>
                        <BsCalendarCheck style={{width: "100%", height: "auto"}} />
                    </CalendarIcon>
                    Darmowa konsultacja
                </Button>     
                </Centered>
                :
                <Button href="https://calendly.com/asystentai/asystent-business-konsultacja">
                    <CalendarIcon>
                        <BsCalendarCheck style={{width: "100%", height: "auto"}} />
                    </CalendarIcon>
                    Umów się na darmowe spotkanie
                </Button>          
                }

                <Description>Dowiedz się jak własny model AI zrewolucjonizuje produktywność Twojej firmy</Description>
            </div>
        </Container>
    )
}

export default ScheduleMeeting;

const Container = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1.25fr 0.75fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
      margin-top: -10vh;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
    }
`

const TestimonialContainer = styled.div`
    padding: 1.5rem;
    width: 45vw;
    display: flex;
    border: 3px solid #ECECEC;
    border-radius: 25px;
    box-shadow: 10px 10px 20px rgba(22, 27, 29, 0.23);
    @media (max-width: 1023px) {
        width: 90vw;
        flex-wrap: wrap;
    }
`

const TestimonialImageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    @media (max-width: 1023px) {
       align-items: flex;
       align-items: flex-start;
    }
`

const TestimonialImage = styled.div`
    height: 7.4rem;
    width: 6rem;
    min-width: 6rem;
    overflow: hidden;
    border-radius: 10px;
    @media (max-width: 1023px) {
        height: 4.4rem;
        width: 3.5rem;
        min-width: 3.5rem;
     }
`

const Name = styled.h3`
    font-size: 1.5rem;
    margin-left: 2rem;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-left: 1.5rem;
     }
`

const Role = styled.p`
    font-size: 0.75rem;
    margin-left: 2rem;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 0.7rem;
        margin-left: 1.5rem;
     }
`

const Testimonial = styled.p`
    font-size: 1rem;
    margin-left: 2rem;
    font-weight: 500;
    margin-top: 0.5rem;
    @media (max-width: 1023px) {
        width: 95%;
        margin-top: 1rem;
        margin-left: 0;
        font-size: 0.9rem;
     }
`

const Button = styled.a`
    padding: 0rem 3.5rem 0rem 3.5rem;
    background-color: #0D0E16;
    color: white;
    border-radius: 15px;
    font-weight: 700;
    height: 3.5rem;
    display: flex;
    align-items: center;
    @media (max-width: 1023px) {
        margin-top: 2rem;
        font-size: 0.9em;
     }
`

const CalendarIcon = styled.div`
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1.4rem;
`

const Description = styled.p`
    width: 100%;
    font-weight: 500;
    @media (max-width: 1023px) {
        text-align: center;
        margin-top: 1rem;
     }
`