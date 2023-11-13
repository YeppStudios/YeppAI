import styled from "styled-components";

const UnderlineButton = (props: { children: any, onClick: any }) => {
    return <Underline id="trial-btn" onClick={props.onClick}>{props.children}</Underline>;
};

export default UnderlineButton;

const Underline = styled.button`
    font-size: 1rem;
    padding: 2vh 5vw 2vh 5vw;
    border-bottom: solid 2px #6597FA;
    align-items: center;
    color: rgb(31 41 55);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-weight: 500;
    @media (min-width: 1023px) {
      margin-top: 4vh;
      font-size: 1rem;
      padding: 1vh 0vw 1vh 0vw;
      &:hover {
        box-shadow: none;
        padding: 0.75vh 0vh 0.75vh 0vh;
      }
    }
`
