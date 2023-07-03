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
    font-size: 7vh;
    line-height: 8.5vh;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 0;
        line-height: 12vw;
        font-size: 10vw;
        width: 95vw;
        text-align: center;
    }
`