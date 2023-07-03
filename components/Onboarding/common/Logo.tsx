import styled from "styled-components";
import Image from "next/image";
import blackLogo from "../../../public/images/logo_black.png";
import whiteLogo from "../../../public/images/logo_white.png";
import { useRouter } from "next/router";

const Logo = (props: {color: string}) => {

  const router = useRouter();

    return (
        <LogoContainer onClick={() => router.push("/")}>
            {(props.color === "white" || props.color === "#ffffff") ?
                        <Image style={{ width: "auto", height: "100%" }}  src={whiteLogo} alt={'logo'}></Image> 
                        :
                        <Image style={{ width: "auto", height: "100%" }}  src={blackLogo} alt={'logo'}></Image> 
            }
        </LogoContainer>
    )
}

export default Logo;

const LogoContainer = styled.div`
  margin-top: 2rem;
  width: 3rem;
  position: absolute;
  cursor: pointer;
  right: 3rem;
  height: 3rem;
  z-index: 1000;
  @media (max-width: 1023px) {
    position: relative;
    display: flex;
    width: 7vh;
    height: 7vh;
    justify-content: center;
    margin-top: 1rem;
    right: 0rem;
  }
`