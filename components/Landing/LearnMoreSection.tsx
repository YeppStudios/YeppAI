import { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../Common/Title";
import Accordion from "./Accordion";
import UnderlineButton from "./common/UnderlineButton";

const LearnMoreSection = () => {

    const [openedAccordion, setOpenedAccordion] = useState(1);
    const [mobile, setMobile] = useState(true);

   
    useEffect(() => {
      if (window.innerWidth > 1023) { 
        setMobile(false);
      }
      const updateWindowSize = () => {
        setMobile(window.innerWidth < 1023);
      };
      window.addEventListener("resize", updateWindowSize);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }, []);

    
    return (
        <Section>
            <div style={{width: "100%"}}>
                <Accordion openedAccordion={openedAccordion} index={1} onClick={() => setOpenedAccordion(1)} question="Is the uploaded content safe?" answer={"Yes, as a SaaS platform we do not store the files you upload. We only use them to create an embedding for the AI Assistant based on a vector database, to which only you have access from your account."} backgroundColor="#F2F2FB"/>
                <Accordion openedAccordion={openedAccordion} index={2} onClick={() => setOpenedAccordion(2)} question="What is elixir?" answer={"Elixir is used for generating content. It is consumed by AI to generate content and understand your questions."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
                <Accordion openedAccordion={openedAccordion} index={3} onClick={() => setOpenedAccordion(3)} question="Can I cancel my subscription?" answer={"Subscription renews every month starting from the purchase date and can be canceled at any time so that payment will not be collected for the next month."} backgroundColor="#F2F2FB"/>
                <Accordion openedAccordion={openedAccordion} index={4} onClick={() => setOpenedAccordion(4)} question="Doesn't it generate the same content for everyone?" answer={"No. Yepp is creative and generates unique and tailored content for each query."} backgroundColor="rgba(101, 120, 248, 0.1)"/>
            </div>
            {!mobile &&
            <ContactContainer>
                <Title fontSize={"6vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize="4vh" mobileTextAlign="center"><b className="font-bold text-gray-800">Learn more.</b></Title>
                <Description>Still want to learn more about our platform and security? Contact our experts to learn more!</Description>
                <UnderlineButton onClick={undefined}>Talk with an expert</UnderlineButton>
            </ContactContainer>
            }
        </Section>
    )
}

export default LearnMoreSection;

const Section = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1.2fr 0.8fr; 
    grid-template-rows: 1fr; 
    padding: 6rem;
    gap: 0px 0px; 
    grid-template-areas:
      ". ."; 
      @media (max-width: 1023px) {
        display: flex;
        padding: 0 5vw 0 5vw;
        flex-wrap: wrap;
        width: 100vw;
      }
`

const Description = styled.p`
    color: rgb(31 41 55);
    font-size: 2vh;
    width: 31vw;
    text-align: left;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 2vh;
        width: 100%;
        padding: 0 1rem 0 1rem;
    }
`



const ContactContainer = styled.div`
@media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10vh;
}


`