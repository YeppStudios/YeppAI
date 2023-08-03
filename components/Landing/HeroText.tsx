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
    font-size: 3.75rem;
    line-height: 1.25;
    font-family: 'SanFrancisco', sans-serif;
    font-weight: 500;
    text-align: center;
    margin-top: 2vh;
    max-width: 68vw;
    @media (max-width: 1023px) {
        margin-top: 0;
        line-height: auto;
        font-size: 1.75rem;
        line-height: 1.3;
        width: 95vw;
        text-align: center;
    }
`