import styled from "styled-components";
import Image from "next/image";
import Centered from "../Centered";
import Title from "./common/Title";
import Logo from "./common/Logo";
import BackButton from "./common/BackButton";
import tickIcon from "../../public/images/tickIcon.png";
import { useEffect, useState } from "react";
import SlideBottomView from "../Animated/SlideBottomView";
import PlansSection from "../Landing/PlansSection";
import Link from "next/link";


const PlanPage = (props: {children: any, back: object}) => {

    const [mobile, setMobile] = useState(true);

    useEffect(() => {
        if(window.innerWidth >= 1023){
          setMobile(false);
        }
      }, [])
      
      

    return (
        <div style={{overflow: "hidden", color: "white"}}>
            <BackButton back={props.back}/>
            <Centered>
                <Logo color="black"/>
            </Centered>
            <Centered>
                <Title>
                    Zatrudnij Asystenta
                </Title>
            </Centered>
            <Centered>
                <Description>
                    Zoptymalizuj swój biznes zatrudniając asystenta, który pomoże Ci w działaniach marketingowych i nie tylko!
                </Description>
            </Centered>
            <Plans>
                <PlansSection /> 
            </Plans>
            <Centered>
            <Link href="/">
                <LearnMore>
                    Dowiedz się więcej...
                </LearnMore> 
            </Link>
            </Centered>
            <div style={{marginTop: "4vh", marginBottom: "4vh"}}>
            <Centered>
                {props.children}
            </Centered>   
            </div>
        </div>
    )
}

export default PlanPage;

const Plans = styled.div`
    width: 100%;
    padding: 0 10vw 0 10vw;
    @media (max-width: 1023px) {
        padding: 0 5vw 0 5vw;

    }
`

const LearnMore = styled.button`
    color: black;
    margin-top: 8vh;
    font-size: 2.5vh;
    text-align: center;
    width: 100%;
    @media (max-width: 1023px) {
        color: black;
        margin-top: 4vh;
        font-size: 4vw;

    }
`

const Description = styled.p`
    color: #717EA6;
    font-size: 2.2vh;
    width: 50vw;
    text-align: center;
    margin-top: 1.5rem;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 4vw;
        color: #8B93B8;
        width: 90vw;
    }
`