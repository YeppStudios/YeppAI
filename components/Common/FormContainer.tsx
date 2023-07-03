import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    width: 37vw;
    min-height: 90vh;
    padding: 3rem 2rem 2rem 0;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
    align-items: flex-start;
    justify-content: center;
    @media (max-width: 1023px) {
        width: 100%;
        padding: 0;
        min-height: auto;
        align-items: flex-start;
    }
`

export default FormContainer;
