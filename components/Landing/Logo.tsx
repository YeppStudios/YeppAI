import styled from "styled-components";
import Image from "next/image";
import blackLogo from "../../public/images/logo_black.png";
import whiteLogo from "../../public/images/logo_white.png";
import { useRouter } from "next/router";

interface ColorProp {
  color: string
}

const Logo = (props: {color: string}) => {

  const router = useRouter();

    return (
      <Container>
        <LogoContainer onClick={() => router.push("/")}>
        {(props.color === "white" || props.color === "#ffffff") ?
            <Image style={{ width: "auto", height: "100%" }}  src={whiteLogo} alt={'logo'}></Image> 
            :
            <Image style={{ width: "auto", height: "100%" }}  src={blackLogo} alt={'logo'}></Image> 
          }
        </LogoContainer>
        
        <AppName color={props.color}>Asystent AI</AppName>
      </Container>
    )
}

export default Logo;

const Container = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  top: 5vh;
  z-index: 5;
`

const LogoContainer = styled.div`
  width: 4vh;
  cursor: pointer;
  height: 4vh;
  @media (max-width: 1023px) {
    position: relative;
    display: flex;
    width: 5vh;
    height: 5vh;
    justify-content: center;
    margin-top: 0rem;
    right: 0rem;
  }
`

const AppName = styled.p<ColorProp>`
  color: ${props => props.color || 'black'};;
  font-size: 3.2vh;
  margin-left: 1vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  @media (max-width: 1023px) {
    margin-left: 3vw;
  }
`