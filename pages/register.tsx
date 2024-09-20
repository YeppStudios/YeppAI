import LoginModal from "@/components/Modals/OnboardingModals/LoginModal"
import styled from "styled-components";
import background from "@/public/images/login-background.png";
import mobileBg from "@/public/images/stripe_background.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../public/images/logo.png";
import { useEffect, useState } from "react";
import RegisterModal from "@/components/Modals/OnboardingModals/RegisterModal";


const Register = () => {

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    } 
  }, [])

  const router = useRouter();

    return (
        <div>
                <Container>
                    <LogoContainer onClick={() => router.push("/")}>
                        <Image style={{ width: "auto", height: "100%" }}  src={logo} alt={'logo'}></Image> 
                    </LogoContainer>
                    <Link href="/"><AppName>Yepp AI</AppName></Link>
                </Container>
            <Background>
                {mobile ?
                <Image src={mobileBg} alt={'background'} style={{width: "100%", height: "100%"}}></Image>
                :
                <Image src={background} alt={'background'} style={{width: "100%", height: "100%"}}></Image>
                }
            </Background>
            <RegisterModal />
        </div>
    )
}


export default Register;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
    position: fixed;
    top: 1rem;
    right: 1.5rem;
    z-index: 100;
    width: 100vw;
`


const LogoContainer = styled.div`
  width: 2.5rem;
  cursor: pointer;
  height: 2.5rem;
  @media (max-width: 1023px) {
    position: relative;
    display: none;
    width: 2.7rem;
    height: 2.7rem;
    justify-content: center;
    right: 0rem;
  }
`

const AppName = styled.p`
  color: black;
  font-size: 2.5rem;
  margin-left: 1vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  @media (max-width: 1023px) {
    display: none;
}
`
