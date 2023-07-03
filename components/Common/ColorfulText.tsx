import styled from "styled-components";

const Text = (props: {children: any}) => {
    return (
        <ColorfulText>{props.children}</ColorfulText>
    )
}

export default Text;

const ColorfulText = styled.span`
color: transparent;
background-image: linear-gradient(-70deg, #6578F8, #64B5FF);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
`