import styled from "styled-components";

const ContinueButton = (props: {text: string}) => {
    return (
        <Button>
            {props.text}
        </Button>
    )
}

export default ContinueButton;

const Button = styled.button`
    font-size: 2vh;
    padding: 0.8vw 6vw 0.8vw 6vw;
    background: #141418;
    transition: all 0.3s ease;
    z-index: 100;
    border-radius: 15px;
    margin-top: 4.5vh;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        padding: 1.5vh 20vw 1.5vh 20vw;
        font-size: 2.4vh;
        font-family: 'Satoshi' , sans-serif;
        font-weight: 700;
        background: #04040A;
    }
`