import styled from "styled-components";
import LoginModal from "../components/Modals/OnboardingModals/LoginModal"
import meshBackground from "../public/images/mediumMobileBackground.png";
import mediumMobileBackground from "../public/images/mediumMobileBackground.png";
import Logo from "../components/Onboarding/common/Logo";
import Centered from "../components/Centered";
import { useEffect, useState } from "react";
import BusinessSignupModal from "@/components/Modals/OnboardingModals/BusinessSignupModal";
import { useRouter } from "next/router";

interface Background {
    image: any,
    mobileImage: any
  }


const RegisterPage = (props: {nextStep: any}) => {

    const [mobile, setMobile] = useState(true);
    const [openBusinessSignup, setOpenBusinessSignup] = useState(false);
    
    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, []);

    const router = useRouter();

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            {!mobile && 
                <Centered>
                    <Logo color="black"/>
                </Centered>
            }
        <Background image={meshBackground} mobileImage={mediumMobileBackground}></Background>
        <BusinessSignupModal  onClose={() => setOpenBusinessSignup(false)} />
        </div>
    )
}

export default RegisterPage;

const Background = styled.div<Background>`
    display: block;
    position: absolute;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    height: 100%;
    z-index: 0;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 580px) {
        background-image: url(${props => props.mobileImage.src});
    }

`

