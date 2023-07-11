import styled from "styled-components";
import Centered from "../Centered";

const HeroText = (props: {children: any}) => {
    return (
        <Text>{props.children}</Text>
    )
}

export default HeroText;

const Text = styled.h1`
    color: black;
    font-size: 5vw;
    line-height: 10vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 900;
    text-align: center;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 0;
        line-height: auto;
        font-size: 1.9rem;
        line-height: 1.3;
        width: 95vw;
        text-align: center;
    }
`