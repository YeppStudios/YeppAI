import styled from "styled-components";
import mobileBackground from "../../../public/images/mobileOnboardingBackground.png";
import mediumMobileBackground from "../../../public/images/mediumMobileBackground.png";

interface Background {
    image: any,
    mediumImage: any
  }

const Background = (props: {image: any}) => {
    return (
        <PageBackground image={mobileBackground} mediumImage={mediumMobileBackground}/>
    )
}

export default Background;

const PageBackground = styled.div<Background>`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    height: 100%;
    z-index: 0;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    @media (min-width: 580px) {
        background-image: url(${props => props.mediumImage.src});
    }
    @media (min-width: 1023px) {
        display: none;
    }

`
