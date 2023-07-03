import React from 'react';
import styled from 'styled-components';

interface InputContainerProps {
    width: string;
}

const InputContainer = styled.div<InputContainerProps>`
    width: ${props => props.width};
    padding: 0rem 1vh 0 1vh;
    margin-bottom: 2.4vh;
`
export default InputContainer