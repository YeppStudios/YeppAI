import styled from "styled-components"

const GradientText = (props: {children: any}) => {
    return (
        <Text>
            {props.children}
        </Text>
    )
}

export default GradientText;

const Text = styled.span`
    background: -webkit-linear-gradient(-35deg, #4032c6, #00A3FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`