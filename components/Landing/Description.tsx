import styled from "styled-components";

interface Description {
    maxWidth: string,
    fontSize: string
  }

const Description = (props: {children: any}) => {
    return (
        <DescriptionText fontSize="2.5vh" maxWidth="60vw">
            {props.children}
        </DescriptionText>
    )
}

export default Description;


const DescriptionText = styled.p<Description>`
    color: #000000;
    font-size: ${props => props.fontSize || '2,5vh'};
    width: ${props => props.maxWidth || '70vw'};
    text-align: center;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 3vw;
        width: 80vw;
        display: none;
    }
`