import styled from "styled-components";

interface Description {
    width: string,
    fontSize: string,
    textAlign: string
    marginTop: string
  }

const Description = (props: {children: any, fontSize: string, width: string, textAlign: string, marginTop: string}) => {
    return (
        <DescriptionText fontSize={props.fontSize} width={props.width} textAlign={props.textAlign} marginTop={props.marginTop}>
            {props.children}
        </DescriptionText>
    )
}

export default Description;


const DescriptionText = styled.p<Description>`
    color: #000000;
    font-size: ${props => props.fontSize || '2.5vh'};
    width: ${props => props.width || 'auto'};
    text-align: ${props => props.textAlign || 'center'};;
    margin-top: ${props => props.marginTop || '2vh'};;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 3vw;
        width: 80vw;
        display: none;
    }
`