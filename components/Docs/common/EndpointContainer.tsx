import styled from "styled-components"

const EndpointContainer = (props: {children: any}) => {
    return (
        <div>
            <Container>
                {props.children}
            </Container>
        </div>
    )

}

export default EndpointContainer;

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    grid-template-rows: 1fr;
    gap: 0px 4rem;
    grid-auto-flow: row;
    grid-template-areas:
      ". .";
    width: 100%;
    padding: 2.5rem 0 2.5rem 0;
    border-bottom: 4px solid rgba(232, 236, 246, 1);;
`