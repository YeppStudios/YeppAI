import styled from "styled-components";

const Section = (props: {children: any}) => {
    return (
        <SectionContainer>
            {props.children}
        </SectionContainer>
    )
}

export default Section;

const SectionContainer = styled.div`
    margin-top: 20vh;
    @media (max-width: 1023px) {
        margin-top: 16vh;
        width: 100%:
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
`