import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { BsFillGiftFill } from "react-icons/bs";
import { useEffect, useInsertionEffect, useState } from "react";
import Link from "next/link";
import ColorfulText from "../Common/ColorfulText";

const Navbar = () =>{

    const [mobile, setMobile] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const router = useRouter();
    const { pathname } = router;
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const nav = document.getElementById('navbar');
            if(mobile){
                if (window.pageYOffset < 429) {
                    setIsFixed(false);
                } else if (window.pageYOffset > nav!.offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            } else {
                if (window.pageYOffset < 186) {
                    setIsFixed(false);
                } else if (window.pageYOffset > nav!.offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
        <NavContainer isFixed={isFixed} id="navbar">
            <Nav isFixed={isFixed}>
                <Container>
                    <LogoContainer onClick={() => router.push("/")}>
                        <Image style={{ width: "auto", height: "100%" }}  src={logo} alt={'logo'}></Image> 
                    </LogoContainer>
                    <Link href="/"><AppName>Yepp AI</AppName></Link>
                </Container>
                <Container>
                    {pathname.includes("assistant") ?
                            <Link href="/pricing?type=individual"><NavLink>Pricing</NavLink></Link>
                            :
                            <Link href="/pricing?type=business"><NavLink>Pricing</NavLink></Link>
                    }
                    <Link href="/"><NavLink>Homepage</NavLink></Link>
                    <ColorfulText><Link href="/marketing"><NavLink>Dashboard</NavLink></Link></ColorfulText>
                </Container>
            </Nav>
        </NavContainer>
        {isFixed &&
        <FakeNavbar></FakeNavbar>
        }
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
    position: ${({ isFixed }) => isFixed ? "fixed" : "static"};
    top: 0rem;
    height: 5rem;
    margin-left: ${({ isFixed }) => isFixed ? "0" : "-8vw"};
    margin-top: ${({ isFixed }) => isFixed ? "0" : "2rem"};
    z-index: 100;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.65);
    border-bottom: 1.5px solid #E2E6F1;
    left: 0;
    justify-content: center;
    @media (max-width: 1023px) {
        justify-content: center;
        padding: 0vh 5vw 0vh 5vw;
        margin-left: ${({ isFixed }) => isFixed ? "0" : "-5vw"};
        height: 4rem;
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


const NavLink = styled.button`
    color: black;
    font-size: 0.9rem;
    margin-left: 4vw;
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
