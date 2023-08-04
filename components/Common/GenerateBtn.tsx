import React from 'react';
import styled from 'styled-components';
import planBackground from "../../public/images/planBackground.png";

const GenerateBtn = styled.button`
    width: 17rem;
    height: 2.8rem;
    margin-top: 1rem;
    border: solid 3px transparent;
    border-radius: 15px;
    align-items: center;
    background: black;
    color: white;
    display: flex;
    font-size: 1rem;
    font-weight: 700;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    @media (min-width: 1023px) {
      &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
    }
  }
  @media (max-width: 1023px) {
    background-color: #04040A;
}
`

export default GenerateBtn;
