import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const SkipButton = () => {
    const router = useRouter();


    return (
        <Button onClick={() => router.push("/onboarding?step=5")} >         
            Pomiń
        </Button>
    )
}

export default SkipButton;

const Button = styled.button`
    color: #6C6C6C;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    position: fixed;
    bottom: 2rem;
    right: 3rem;
    display: flex;
    align-items: center;
    @media (max-width: 1023px) {
        height: 1rem;
        top: 2vh;
        right: 5vw;
        color: white;
    }
`
