import styled from "styled-components";
import Title from "../Common/Title";
import LearnMore from "./LearnMore";

interface CustomColor {
    color: string
}

const PlansHeader = (props: {color: string, children: any, text: string}) => {
    return (
        <Container>
            <Title fontSize={"6vh"} width={"100%"} textAlign={"left"} color={props.color} mobileFontSize={"5vh"} mobileTextAlign={"center"}><span style={{lineHeight: "6.5vh"}}>{props.children}</span></Title>
            <DescriptionContainer>
              <Description color={props.color}>
                {props.text}
              </Description>
              {props.color !== "white" && 
                <LearnMoreContainer>
                    <LearnMore color={props.color} />
                </LearnMoreContainer>
              }
            </DescriptionContainer>
        </Container>
    )
}

export default PlansHeader;



const Container = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    align-items: center;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
    }
`

const DescriptionContainer = styled.div`
    margin-left: 5vw;
    display: flex;
    flex-wrap: wrap;
    font-weight: 500;
    justify-content: end;
    @media (max-width: 1023px) {
        margin-left: 0vw;
    }
`

const Description = styled.p<CustomColor>`
    color: ${props => props.color || '#000000'};
    font-size: 2vh;
    width: 31vw;
    text-align: left;
    margin-top: 2vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        text-align: center;
        font-size: 2vh;
        width: 100%;
    }
`

const LearnMoreContainer = styled.div`
    width: 31vw;
    @media (max-width: 1023px) {
        width: 100%;
    }
`