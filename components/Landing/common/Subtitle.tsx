import styled from "styled-components";

const Subtitle = (props: {children: any}) => {
    return (
        <Title>
            {props.children}
        </Title>
    )
}


export default Subtitle;


const Title = styled.h1`
    color: rgb(31 41 55);
    font-size: 4vw;
    line-height: 1.25;
    font-family: 'Satoshi', sans-serif;
    font-weight: 500;
    text-align: center;
    width: 65%;
    @media (max-width: 1023px) {
        margin-top: 0;
        line-height: auto;
        font-size: 2rem;
        line-height: 1.3;
        width: 90vw;
        text-align: center;
    }
`