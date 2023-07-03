import styled from 'styled-components';

const ModalTitle = (props: any) => {
    return(
        <Title>
            {props.children}
        </Title>
    )
}

export default ModalTitle;

const Title = styled.div`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2vh;
    color: black;
    font-weight: 600;
    @media only screen and (min-width: 1023px) {
        font-size: 2.4rem;
        margin-bottom: 1vh;
    }
`