import React from 'react';
import styled from 'styled-components';


interface InputProps {
    height: string;
    padding: string;
}

const Input = styled.input<InputProps>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => props.padding};;
  resize: none;
  height: ${props => props.height};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  box-shadow: inset 1px 1px 6px rgba(15, 27, 40, 0.2);
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 200;
  }
  :-ms-input-placeholder {
     color: #A7ACBC;
     font-weight: 200;

  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Input;