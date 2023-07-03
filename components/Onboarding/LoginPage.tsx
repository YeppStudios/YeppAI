import styled from "styled-components";
import LoginModal from "../Modals/OnboardingModals/LoginModal"
import meshBackground from "../../public/images/mediumMobileBackground.png";
import mediumMobileBackground from "../../public/images/mediumMobileBackground.png";
import Logo from "./common/Logo";
import Centered from "../Centered";
import { useEffect, useState } from "react";

interface Background {
    image: any,
    mobileImage: any
  }


const LoginPage = (props: {nextStep: any}) => {

    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, []);

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            {!mobile && 
                <Centered>
                    <Logo color="black"/>
                </Centered>
            }
        <Background image={meshBackground} mobileImage={mediumMobileBackground}></Background>
            <LoginModal onClose={props.nextStep} registration={true}/>
        </div>
    )
}

export default LoginPage;

const Background = styled.div<Background>`
    display: block;
    position: absolute;
    top: -2rem;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    height: 100%;
    z-index: 0;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    @media (max-width: 580px) {
        background-image: url(${props => props.mobileImage.src});
    }

`