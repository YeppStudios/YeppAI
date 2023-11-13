import styled from "styled-components";

const BlueButton = (props: { children: any, onClick: any }) => {
    return <TestButton id="trial-btn" onClick={props.onClick}>{props.children}</TestButton>;
};

export default BlueButton;

const TestButton = styled.button`
    font-size: 1rem;
    padding: 2vh 10vw 2vh 10vw;
    border: solid 3px transparent;
    border-radius: 15px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-size: 120%;
    background-position-x: -1rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 500;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (min-width: 1023px) {
      margin-top: 4vh;
      font-size: 1rem;
      padding: 1vh 2vw 1vh 2vw;
    }
`
