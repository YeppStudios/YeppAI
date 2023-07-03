import styled from "styled-components";
import { selectAssistantState } from "../../store/assistantSlice";
import { useSelector } from "react-redux";

const ConversationIntro = () => {

    const selectedAssistant = useSelector(selectAssistantState);

    return (
        <IntroContainer>
            <IntroTitle>{selectedAssistant.name}</IntroTitle>
            <IntroDescription>
                {selectedAssistant.description}
            </IntroDescription>
        </IntroContainer>
    )
}

export default ConversationIntro;

const IntroContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: black;
`

const IntroTitle = styled.div`
    text-align: center;
    font-size: 2rem;
    width: 100%;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
`

const IntroDescription = styled.div`
    margin-top: 1.2rem;
    text-align: center;
    width: 65%;
    color: rgba(0,0,0, 0.75);
    font-weight: 500;
    line-height: 1.5rem;
    @media (max-width: 1023px) {
        width: 100%;
        font-size: 1.75vh;
        margin-top: 1rem;
    }
`