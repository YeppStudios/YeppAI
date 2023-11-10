import styled from "styled-components";

const Section = (props: {children: any}) => {
    return (
        <GraySection>
            {props.children}
        </GraySection>
    )
}

export default Section;

const GraySection = styled.div`
    padding: 12vh 0 14vh 0;
    width: 100%;
    background: #F2F2FB;
    @media (max-width: 1023px) {
        width: 100%:
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 8vh 0 10vh 0;
    }
`