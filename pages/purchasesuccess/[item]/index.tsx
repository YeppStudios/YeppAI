import styled from "styled-components";
import bg from "../../../public/images/mediumMobileBackground.png";
import SlideBottom from "@/components/Animated/SlideBottom";
import { FiCheckCircle } from "react-icons/fi";
import Centered from "@/components/Centered";
import Link from "next/link";

interface Background {
    image: any
  }

const SuccessPage = () => {
    return (
        <Background image={bg}>
            <SlideBottom>
            <Container>
                <Centered>
                    <CheckIcon><FiCheckCircle style={{width: "100%", height: "auto"}}/></CheckIcon>
                </Centered>
                <SuccessTitle>Dziękujemy za zakup</SuccessTitle>
                <Centered>
                    <SubscriptionDescription>Już wkrótce odezwiemy się ze szczegółami wdrożenia.</SubscriptionDescription>
                </Centered>
                <Link href="/"><HomeBtn>Strona główna</HomeBtn></Link>
            </Container>
            </SlideBottom>
        </Background>
    )
}

export default SuccessPage;

const Background = styled.div<Background>`
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh
    height: 100vh;
    padding-bottom: 4rem;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

`

const Container = styled.div`
    width: 40vw;
    margin-top: 20vh;
    padding: 4rem 0 4rem 0;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    border-radius: 25px;
    text-align: center;
    @media (max-width: 1023px) {
        width: 90vw;
        margin-top: 10vh;
        padding: 4rem 0 4rem 0;
    }
`

const SuccessTitle = styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
    margin-top: 1rem;
    @media (max-width: 1023px) {
        font-size: 1.5rem;
    }
`

const CheckIcon = styled.div`
    width: 4rem;
    height: 4rem;
    @media (max-width: 1023px) {
        margin-top: 0rem;
        width: 3rem;
        height: 3rem;
    }
`

const SubscriptionDescription = styled.p`
    margin-top: 1rem;
    font-size: 1.2rem;
    width: 60%;
    font-weight: 500;
    @media (max-width: 1023px) {
        width: 75%;
        font-size: 1rem;
    }
`

const HomeBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  color: white;
  font-weight: 500;
  margin-top: 2rem;
  padding: 0.5rem 5rem 0.5rem 5rem;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 110%;
  background-position-x: -1rem;
  transition: all 0.4s ease;
  @media (max-width: 1023px) {
    padding: 0.5rem 3rem 0.5rem 3rem;
}
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  }
`