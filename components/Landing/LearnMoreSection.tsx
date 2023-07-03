import { useState } from "react";
import styled from "styled-components";
import Title from "../Common/Title";
import Accordion from "./Accordion";
import { showNotification } from '@mantine/notifications';
import { Loader } from "../Common/Loaders";
import { BsCheckLg } from "react-icons/bs";
import api from "@/pages/api";

const LearnMoreSection = () => {

    const [openedAccordion, setOpenedAccordion] = useState(1);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
          await api.post("/save-contact", {email});
          setLoading(false);
          setSuccess(true);
          setEmail("");
          showNotification({
            id: 'subscribed',
            disallowClose: true,
            autoClose: 5000,
            title: "Witaj na pokładzie!",
            message: 'Czas dowiedzieć się więcej o AI!',
            color: 'white',
      
            styles: (theme: any) => ({
              root: {
                backgroundColor: "#04040A",
                border: "none",
      
              },
      
              title: { color: "white" },
              description: { color: "white" },
            })
          })
          setEmail('');
        } catch (e) {
          console.log(e)
          showNotification({
            id: 'error',
            disallowClose: true,
            autoClose: 5000,
            title: "Coś poszło nie tak",
            message: 'Podczas zapisywania twojego maila wystąpił problem. Proszę skontaktuj się z nami: hello@asystent.ai',
            color: 'red',
      
            styles: (theme: any) => ({
              root: {
                backgroundColor: "#04040A",
                border: "none",
      
              },
      
              title: { color: "white" },
              description: { color: "white" },
            })
          })
          setLoading(false)
        }
      }

      
    return (
        <Section>
            <div style={{width: "100%"}}>
                <Accordion openedAccordion={openedAccordion} index={1} onClick={() => setOpenedAccordion(1)} question="Czy wgrane przeze mnie dane są bezpieczne?" answer={"Tak, jako platforma SaaS nie przechowujemy wgranych przez Ciebie plików. Używamy ich jedynie w celu stworzenia embeddingu dla Asystenta AI opartego na wektorowej bazie danych, do której tylko ty masz dostęp z poziomu swojego konta."} backgroundColor="rgba(0, 141, 255, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={2} onClick={() => setOpenedAccordion(2)} question="Co to jest elixir kreatywności?" answer={"Elixir kreatywności jest niezbędny do generowania treści. Pobierany jest za to, co Asystent napisze, twoje pytania i w przypadku chatu za dwie poprzednie wiadomości, dzięki którym Asystent zna kontekst."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={3} onClick={() => setOpenedAccordion(3)} question="Jak długi jest okres wypowiedzenia?" answer={"Subskrypcja jest płatna co miesiąc zaczynając od dnia zakupu i można ją anulować w każdym momencie tak, że za następny miesiąc płatność nie będzie już pobrana."} backgroundColor="rgba(0, 141, 255, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={4} onClick={() => setOpenedAccordion(4)} question="Czy każdy otrzymuje te same treści?" answer={"Nie. Asystent jest kreatywny i za każdym zapytaniem generuje unikatowe treści."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
            </div>
            <ContactContainer>
                <Title fontSize={"6vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize="4vh" mobileTextAlign="center">Dowiedz się więcej.</Title>
                <Description>Poszerzaj wiedzę odnośnie sztucznej inteligencji oraz dowiedz się jak najefektywniej zarządzać Twoim Asystentem AI.</Description>
                <SignupLabel>Zapisz się do <b>newslettera o AI!</b></SignupLabel>
                <Form onSubmit={subscribe}>
                    <NewsletterInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="twojmail@gmail.com"/>
                    <SignupButton id="newsletter-signup-btn">
                    {loading ?
                      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <Loader color="white" />
                      </div>
                      :
                       success ?
                      <BsCheckLg style={{fontSize: "1.5em"}} className="text-green-400"/>
                      :
                      <p>Zapisz się</p>
                    }
                    </SignupButton>
                </Form>
                <Description>lub</Description>
                <Description>Napisz do nas na <b>hello@asystent.ai</b></Description>
            </ContactContainer>
        </Section>
    )
}

export default LearnMoreSection;

const Section = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1.2fr 0.8fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas:
      ". ."; 
      @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
      }
`

const Description = styled.p`
    color: #000000;
    font-size: 2vh;
    width: 31vw;
    text-align: left;
    font-weight: 500;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 2vh;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
`


const FaqContainer = styled.div`

`

const ContactContainer = styled.div`
@media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10vh;
}


`

const SignupLabel = styled.p`
    color: black;
    margin-top: 3vh;
`

const NewsletterInput = styled.input`
    border-radius: 20px;
    width: 20vw;
    font-size: 2vh;
    padding: 1.5vh 1vw 1.5vh 1vw;
    margin-top: 1vh;
    background-color: transparent;
    border: 2px solid #DFDFDF;
    color: black;
    outline: none;
    @media (max-width: 1023px) {
        width: 80vw;
        padding: 1.5vh 2vh 1.5vh 2vh;
      }
`

const Form = styled.form`
      display: flex;
      alignItems: center;
      @media (max-width: 1023px) {
          flex-wrap: wrap;
          justify-content: center;
      }
`

const SignupButton = styled.button`
    padding: 0 1.5vw 0 1.5vw;
    height: 6.5vh;
    margin-left: 1.5vw;
    background-color: #0D0E16;
    border-radius: 20px;
    margin-top: 1vh;
    font-weight: 700;
    width: 9vw;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    @media (max-width: 1023px) {
        padding: 0 4vh 0 4vh;
        margin-top: 1.5vh;
        height: 7vh;
        width: 70%;
        font-size: 2vh;
    }
`