import LoginModal from "@/components/Modals/OnboardingModals/LoginModal"
import styled from "styled-components";
import background from "@/public/images/login-background.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../public/images/logo.png";


const Register = () => {

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
                <Image src={background} alt={'background'} style={{width: "100%", height: "100%"}}></Image>
            </Background>
            <LoginModal onClose={() => router.push("/assets")} registration={false} />
        </div>
    )
}


export default Register;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
`

const Container = styled.div`
  display: flex;
  align-items: center;
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    z-index: 100;
    width: 100vw;
`


const LogoContainer = styled.div`
  width: 2.5rem;
  cursor: pointer;
  height: 2.5rem;
  @media (max-width: 1023px) {
    position: relative;
    display: flex;
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
