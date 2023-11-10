import styled from "styled-components";

const MiniTitle = (props: { children: any }) => {
    return <Title>{props.children}</Title>;
};

export default MiniTitle;

const Title = styled.button`
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
    text-align: center;
    padding: 1rem 4rem 1rem 4rem;
    border-radius: 25px;
    color: rgb(31, 41, 55);
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`
