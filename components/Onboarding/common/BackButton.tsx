import styled from "styled-components";
import Image from "next/image";
import backIcon from "../../../public/images/backArrow.png";
import whiteBackIcon from "../../../public/images/whiteBackIcon.png";
import { useEffect, useState } from "react";

const BackButton = (props: {back: any}) => {

    const [mobile, setMobile] = useState(true);

    useEffect(() => {
      if(window.innerWidth >= 1023){
        setMobile(false);
      }
    }, [])
    
    return (
        <Button onClick={props.back}>
            <BackBtnIcon>
                {mobile ?
                    <Image style={{ width: "100%", height: "auto" }}  src={whiteBackIcon} alt={'logo'}></Image> 
                    :
                    <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                }

            </BackBtnIcon>             
            Wróć
        </Button>
    )
}

export default BackButton;

const Button = styled.button`
    color: black;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    cursor: pointer;
    position: absolute;
    z-index: 100;
    margin-top: 3rem;
    left: 3rem;
    display: flex;
    align-items: center;
    @media (max-width: 1023px) {
        height: 1rem;
        margin-top: 0;
        top: 2vh;
        left: 5vw;
        color: white;
      }

`

const BackBtnIcon = styled.div`
    width: 0.5rem;
    height: auto;    
    margin-right: 0.7rem;
`;