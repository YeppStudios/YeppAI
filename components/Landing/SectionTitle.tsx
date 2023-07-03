import styled from "styled-components";
import Centered from "../Centered";

const SectionTitle = (props: {children: any}) => {
    return (
        <Centered>
            <Text>{props.children}</Text>
        </Centered>
    )
}

export default SectionTitle;

const Text = styled.h1`
        text-align: center;
        font-size: 7vh;
        line-height: 8vh;
        width: 75vw;
        font-family: 'Satoshi' , sans-serif;
        font-weight: 700;
        color: black;
        @media (max-width: 1023px) {
        margin-top: 3vh;
        line-height: 9vw;
        font-size: 8vw;
        width: 95vw;
    }
`