import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { BsFillGiftFill } from "react-icons/bs";
import { useEffect, useInsertionEffect, useState } from "react";
import Link from "next/link";

const Navbar = (props: {onNewsletterClick: any}) =>{

    const [mobile, setMobile] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();
    const { pathname } = router;
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }
        const handleScroll = () => {
            const nav = document.getElementById('navbar');
            if(mobile){
                if (window.scrollY < 24) {
                    setIsFixed(false);
                } else if (window.scrollY > nav!.offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            } else {
                if (window.scrollY < 24) {
                    setIsFixed(false);
                } else {
                    setIsFixed(true);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        setLoading(false);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [mobile]);


    return (
        <div>
        <NavContainer isFixed={isFixed} id="navbar">
            <Nav isFixed={isFixed}>
                <Container>
                    <LogoContainer onClick={() => router.push("/")}>
                        <Image style={{ width: "auto", height: "100%" }}  src={logo} alt={'logo'}></Image> 
                    </LogoContainer>
                    <Link href="/"><AppName>Yepp.ai</AppName></Link>
                </Container>
                <Container>
                    {pathname.includes("assistant") ?
                        <Link href="/pricing?type=individual"><NavLink>Pricing</NavLink></Link>
                        :
                        <Link href="/pricing?type=business"><NavLink>Pricing</NavLink></Link>
                    }
                    {/* <Link href="/docs/getting-started"><NavLink>Dokumentacja</NavLink></Link> */}
                    <LoginButton className="login-btn-landing" onClick={() => router.push("/assets")}>Log in</LoginButton>
                    {(mobile && !loading && isFixed) &&
                        <TestButton className='start-free-trial-landing' onClick={() => router.push("/register?registration=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                    }
                    {!mobile &&
                        <TestButton className='start-free-trial-landing' onClick={() => router.push("/register?registration=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                    }
                </Container>
            </Nav>
        </NavContainer>
        </div>
    )
}

export default Navbar;

interface NavContainerProps {
    isFixed: boolean;
}

const NavContainer = styled.div<NavContainerProps>`
    width: 100vw;
    display: flex;
    align-items: center;
    position: ${({ isFixed }) => isFixed ? "fixed" : "absolute"};
    top: 0rem;
    height: 6rem;
    margin-left: ${({ isFixed }) => isFixed ? "0" : "-8vw"};
    margin-top: ${({ isFixed }) => isFixed ? "0" : "1.5rem"};
    z-index: 100;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: ${({ isFixed }) => isFixed ? "0 6px 32px 0 rgba(31, 38, 135, 0.3);" : "none"};
    left: 0;
    justify-content: center;
    @media (max-width: 1023px) {
        justify-content: center;
        padding: 0vh 5vw 0.2vh 5vw;
        margin-left: ${({ isFixed }) => isFixed ? "0" : "0vw"};
        margin-top: ${({ isFixed }) => isFixed ? "0" : "2rem"};
        height: 4.2rem;
        border: none;
    }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Nav = styled.div<NavContainerProps>`
    width: 84vw;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0rem;
    z-index: 100;
    left: 0;
    justify-content: space-between;
    @media (max-width: 1023px) {
        padding: 0;
        width: 100vw;
        justify-content: ${({ isFixed }) => isFixed ? "space-between" : "center"};
    }
`

const FakeNavbar = styled.div`
    position: relative; 
    width: 100%; 
    height: 7rem;
    @media (max-width: 1023px) {
        height: 6rem;
    }
`

const TestButton = styled.button`
    padding: 0.75rem 2.7rem 0.75rem 2.7rem;
    border: solid 3px transparent;
    border-radius: 25px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 700;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        padding: 1.3vh 7vw 1.3vh 7vw;
        font-size: 0.9rem;
    }
    
`

const TestText = styled.p`
    margin-left: 1vw;
    @media (max-width: 1023px) {
        margin-left: 3vw;
    }
`
const LoginButton = styled.button`
    font-size: 0.9rem;
    margin-right: 2vw;
    padding: 0.75rem 2rem 0.75rem 2rem;
    background: #F0F3F8;
    transition: all 0.3s ease;
    border-radius: 15px;
    border: none;
    color: black;
    font-weight: 700;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        padding: 1.5vh 20vw 1.5vh 20vw;
        font-size: 2.4vh;
        display: none;
    }
`

const NavLink = styled.button`
    color: black;
    font-size: 0.9rem;
    margin-right: 3.5vw;
    font-weight: 600;
    @media (max-width: 1023px) {
        display: none;
    }
`


const LogoContainer = styled.div`
  width: 2.5rem;
  cursor: pointer;
  height: 2.5rem;
  @media (max-width: 1023px) {
    position: relative;
    display: flex;
    width: 2.7rem;
    height: 2.7rem;
    justify-content: center;
    right: 0rem;
  }
`

const AppName = styled.p`
  color: black;
  font-size: 2.5rem;
  margin-left: 1vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  @media (max-width: 1023px) {
    display: none;
}
`
