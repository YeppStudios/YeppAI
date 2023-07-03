import React from 'react';
import styled from 'styled-components';


interface TextAreaProps {
    height: string;
    padding: string;
}

const TextArea = styled.textarea<TextAreaProps>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => props.padding};;
  resize: none;
  height: ${props => props.height};
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  background-color: white;
  box-shadow: inset 1px 1px 5px rgba(15, 27, 40, 0.2), inset -1px -1px 4px #FAFBFF;
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

export default TextArea;