import styled from "styled-components"
import footerBanner from "../../public/images/verticalBanner.png";
import facebookIcon from "../../public/images/facebook_white_icon.png";
import instagramIcon from "../../public/images/instagram_white_icon.png";
import ytIcon from "../../public/images/yt.png";
import twitterIcon from "../../public/images/twitter_white_icon.png";
import logo from "../../public/images/logo_long.png";
import logoMobile from "../../public/images/logo_white.png";
import Image from "next/image";
import getConfig from 'next/config';
import Centered from "../Centered";
import ColorfulText from "../Common/ColorfulText";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
interface Container {
    image: any
}


const Footer = () => {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if(window.innerWidth <= 1023){
          setMobile(true);
        }
      }, []);
    

    return (
        <Container>
            <BannerContainer background={footerBanner}>
                <div>
                <Centered><BannerTitle>Stwórz swoje pierwsze AI już dziś!</BannerTitle></Centered>
                <Centered><Description>Odbierz darmowe 7500 elixiru na start</Description></Centered>
                <Centered><TestBtn onClick={() => router.push("/assets?registration=true")}><BtnText>Przetestuj</BtnText><ColorfulText>za darmo</ColorfulText></TestBtn></Centered>

                <Centered><Note>Bez zobowiązań i podawania karty</Note></Centered>
                </div>
            </BannerContainer>
            <MainText>Przyłącz się do rewolucji!</MainText>
            <SocialMediaContainer>
                    <SocialMediaIcon href="https://www.facebook.com/profile.php?id=100089968959771">
                        <Image style={{ width: "auto", height: "100%" }}  src={facebookIcon} alt={'facebook'}></Image> 
                    </SocialMediaIcon>
                <SocialMediaIcon href="https://www.instagram.com/asystentai/">
                    <Image style={{ width: "auto", height: "100%" }}  src={instagramIcon} alt={'instagram'}></Image> 
                </SocialMediaIcon>
                <SocialMediaIcon href="https://twitter.com/asistantai">
                    <Image style={{ width: "auto", height: "100%" }}  src={twitterIcon} alt={'twitter'}></Image> 
                </SocialMediaIcon>
                <SocialMediaIcon href="https://www.youtube.com/channel/UC1HTRDibKGtHGs_JkMGcjZg">
                    <Image style={{ width: "auto", height: "100%" }}  src={ytIcon} alt={'youtube'}></Image> 
                </SocialMediaIcon>
            </SocialMediaContainer>
            <Centered>
                <Email>lub skontaktuj się z nami pod: hello@asystent.ai</Email>
            </Centered>
            <BottomContainer>
                <LeftBottomItems>
                    <Logo>
                        <Image style={{ width: "auto", height: "100%" }}  src={logo} alt={'logo'}></Image> 
                    </Logo>
                    <LogoMobile>
                        <Image style={{ width: "auto", height: "100%" }}  src={logoMobile} alt={'logo'}></Image> 
                    </LogoMobile>
                <BottomLink href={"/Regulamin_AsystentAI.pdf"} download>Regulamin I Polityka Prywatności</BottomLink>
                </LeftBottomItems>
                <Copyright>@2023 Yepp All Rights Reserved.</Copyright>
            </BottomContainer>
        </Container>
    )
}

export default Footer;

const Container = styled.div`
    margin-top: 62vh;
    padding: 10vh 8vw 10vh 8vw;
    height: 60vh;
    position: relative;
    background-color: #0D0E16;
    width: 100vw;
    margin-left: -8vw;
    background-color: #0D0E16;
    color: white;
    @media (max-width: 1023px) {
        padding: 10vh 5vw 15vh 5vw;
        margin-left: -5vw;
        margin-top: 35vh;
        height: 65vh;
      }
`

const MainText = styled.div`
    width: 100%;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    font-size: 2.5vh;
    text-align: center;
    margin-top: 12vh;
`

const SocialMediaContainer = styled.div`    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4vh;
`

const SocialMediaIcon = styled.a`
    width: 5.5vh;
    height: 5.5vh;
    margin: 0 3vw 0 3vw;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.9);
    }
    @media (max-width: 1023px) {
        margin: 0 5vw 0 5vw;
      }
`

const BottomContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    margin-left: -8vw;
    padding: 3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1023px) {
        width: 100%;
        margin-left: -5vw;
        padding: 3vh 0 3vh 0;
        flex-wrap: wrap;
      }
`

const Logo = styled.div`
    width: 15vw;
    height: 7vh;
    margin: 0 2vw 0 2vw;
    @media (max-width: 1023px) {
        display: none;
      }
`

const LogoMobile = styled.div`
    width: 100%;
    height: 6vh;
    margin: 0 6vw 3vh 6vw;
    display: flex;
    justify-content: center;
    @media (min-width: 1023px) {
        display: none;
      }
`
const LeftBottomItems = styled.div`
      display: flex;
      align-items: center;
      @media (max-width: 1023px) {
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
      }
`

const BottomLink = styled.a`
    color: #A1A1A1;
    margin: 0 2vw 0 2vw;
    font-size: 1.7vh;
    @media (max-width: 1023px) {
        font-size: 1.5vh;
        margin: 0 1vw 0 1vw;
      }
` 

const Copyright = styled.p`
    color: #A1A1A1;
    margin: 0 2vw 0 2vw;
    font-size: 1.7vh;
    @media (max-width: 1023px) {
        font-size: 1.5vh;
        margin: 3vh 1vw 0 1vw;
        width: 100%;
        text-align: center;
      }
` 
const Email = styled.div`
      margin-top: 4vh;
      font-size: 2vh;
      text-align: center;
      @media (max-width: 1023px) {
          margin-bottom: 4vh;
      }
`

const BannerContainer = styled.div<{background: any}>`
      height: auto;
      left: 15rem;
      width: calc(100% - 30rem);
      padding: 3rem 4rem 3rem 4rem;
      background-color: #ffffff;
      position: absolute;
      justify-content: center;
      margin-top: -56vh;
      display: flex;
      align-items: center;
      border-radius: 20px;
      box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.3);
      background-image: url(${props => props.background.src});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      @media (max-width: 1023px) {
        width: calc(100% - 2rem);
        height: auto;
        padding: 2.2rem 1rem 2.2rem 1rem;
        margin-top: -34vh;
        left: 1rem;
    }
`

const BannerTitle = styled.h2`
      text-align: center;
      font-size: 4.5rem;
      font-weight: 900;
      width: 90%;
      text-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
      line-height: 1.2;
      @media (max-width: 1023px) {
        font-size: 2rem;
    }
`

const TestBtn = styled.button`
    font-size: 1.5rem;
    margin-top: 2rem;
    width: 25rem;
    height: 4rem;
    justify-content: center;
    box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.3);
    display: flex;
    align-items: center;
    background: #0D0E16;
    color: white;
    transition: all 0.3s ease;
    border-radius: 15px;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        width: 15rem;
        height: 3rem;
        font-size: 1rem;
        margin-top: 1rem;
    }
`

const Note = styled.p`
    font-weight: 500;
    margin-top: 0.5rem;
    text-align: center;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
    @media (max-width: 1023px) {
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }
`

const Description = styled.p`
    font-size: 1.5rem;
    margin-top: 2rem;
    font-weight: 500;
    text-align: center;
    text-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
    @media (max-width: 1023px) {
        font-size: 1rem;
        margin-top: 1rem;
    }
`
const BtnText = styled.p`
    margin-right: 0.5em;
`