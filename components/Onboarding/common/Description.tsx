import styled from "styled-components";

const Description = (props: {children: any}) => {
    return (
        <DescriptionText>
            {props.children}
        </DescriptionText>
    )
}

export default Description;


const DescriptionText = styled.p`
    color: #717EA6;
    font-size: 2.2vh;
    width: 55vw;
    text-align: center;
    margin-top: 1.5rem;
    z-index: 1;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 3vw;
        width: 80vw;
        display: none;
    }
`