import React from "react";
import styled from "styled-components";

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: black;
  font-weight: 500;
  margin: 0rem 0 0 0rem;
  z-index: 2;
  position: absolute;
  @media (max-width: 1023px) {
    margin: 0rem 0 0 0.7rem;
    position: absolute;
    top: 1rem;
    left: 0.7rem;
  }
`;

export default BackBtn;
