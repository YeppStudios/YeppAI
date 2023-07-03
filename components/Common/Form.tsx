import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    width: 30rem;
    height: auto;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    padding: 2rem 1.5rem 3rem 1.5rem;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    @media (max-width: 1023px) {
        width: 100%;
        margin-top: 0vh;
        padding: 3.5rem 1.1rem 3rem 1.1rem;
    }
`

export default Form;
