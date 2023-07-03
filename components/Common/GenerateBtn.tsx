import React from 'react';
import styled from 'styled-components';
import planBackground from "../../public/images/planBackground.png";

const GenerateBtn = styled.button`
    width: 17rem;
    height: 2.8rem;
    margin-top: 1rem;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    color: white;
    display: flex;
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (min-width: 1023px) {
      &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
  }
  @media (max-width: 1023px) {
    background-color: #04040A;
}
`

export default GenerateBtn;
