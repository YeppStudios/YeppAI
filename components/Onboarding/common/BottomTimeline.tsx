import styled from "styled-components";

const BottomTimeline = (props: {children: any}) => {
    return (
        <TimelineContainer>
            {props.children}
        </TimelineContainer>
    )
}

export default BottomTimeline;

const TimelineContainer = styled.div`
    position: absolute;
    bottom: 1rem;
    width: 100%;
`
