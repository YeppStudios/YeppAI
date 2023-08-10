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
            title: "Welcome on board!",
            message: 'Time to learn more about AI!',
            color: 'black',
      
            styles: (theme: any) => ({
              root: {
                border: "none",
      
              },
            })
          })
          setEmail('');
        } catch (e) {
          console.log(e)
          showNotification({
            id: 'error',
            disallowClose: true,
            autoClose: 5000,
            title: "Something went wrong...",
            message: 'Contact us: hello@asystent.ai',
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
                <Accordion openedAccordion={openedAccordion} index={1} onClick={() => setOpenedAccordion(1)} question="Is the uploaded content safe?" answer={"Yes, as a SaaS platform we do not store the files you upload. We only use them to create an embedding for the AI Assistant based on a vector database, to which only you have access from your account."} backgroundColor="rgba(0, 141, 255, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={2} onClick={() => setOpenedAccordion(2)} question="What is elixir?" answer={"Elixir is used for generating content. It is consumed by AI to generate content and understand your questions."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={3} onClick={() => setOpenedAccordion(3)} question="Can I cancel my subscription?" answer={"Subscription renews every month starting from the purchase date and can be canceled at any time so that payment will not be collected for the next month."} backgroundColor="rgba(0, 141, 255, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={4} onClick={() => setOpenedAccordion(4)} question="Doesn't it generate the same content for everyone?" answer={"No. Yepp is creative and generates unique and tailored content for each query."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
            </div>
            <ContactContainer>
                <Title fontSize={"6vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize="4vh" mobileTextAlign="center"><b className="font-900">Learn more.</b></Title>
                <Description>Stay up to date with latest AI trends and learn how to make use of our latest features.</Description>
                <SignupLabel>Join our <b>AI newsletter!</b></SignupLabel>
                <Form onSubmit={subscribe}>
                    <NewsletterInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="mail@gmail.com"/>
                    <SignupButton id="newsletter-signup-btn">
                    {loading ?
                      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <Loader color="white" />
                      </div>
                      :
                       success ?
                      <BsCheckLg style={{fontSize: "1.5em"}} className="text-green-400"/>
                      :
                      <p>Join now</p>
                    }
                    </SignupButton>
                </Form>
                <Description className="justify-center lg:justify-start">or</Description>
                <a href="https://calendly.com/yeppai/yepp-introduction-call">
                <div className="flex items-center"><b className="cursor-pointer">Book a free demo</b>
                </div>
                </a>
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
    padding-left: 8vw;
    grid-template-areas:
      ". ."; 
      @media (max-width: 1023px) {
        display: flex;
        padding-left: 0;
        flex-wrap: wrap;
        width: 90vw;
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
    border: solid 3px transparent;
    border-radius: 25px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
      inset -2px -2px 4px #fafbff, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578f8, #64b5ff);
    background-size: 120%;
    background-position-x: -1rem;
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

const LearnMoreArrow = styled.div`
    height: 1vh;
    margin-left: 1.5vw;
    cursor: pointer;
`