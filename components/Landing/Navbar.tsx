import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { BsFillGiftFill } from "react-icons/bs";
import { useEffect, useInsertionEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
  { name: 'Marketing Templates', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Copywriting', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Chat with data', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
  { name: 'Marketing Campaigns', description: 'Effortlessly genrate content for the entire campaign', href: '#', icon: SquaresPlusIcon },
  { name: 'Uploading content', description: 'Teach AI about your client or any niche topic', href: '#', icon: ArrowPathIcon },
]

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Schedule a demo', href: '#', icon: PhoneIcon },
]

const Navbar = (props: {onNewsletterClick: any}) =>{

    const [mobile, setMobile] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();
    const { pathname } = router;
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }
        const handleScroll = () => {
            const nav = document.getElementById('navbar');
            if(mobile){
                if (window.scrollY < 16) {
                    setIsFixed(false);
                } else if (window.scrollY > nav!.offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            } else {
                if (window.scrollY < 1) {
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
                    <Link href="/"><AppName>Yepp AI</AppName></Link>
                </Container>
                <Container>
                <NavLink onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                    <Popover className="relative">
                        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-black outline-none">
                            <span>Solutions</span>
                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </Popover.Button>
                        <Transition
                            show={isOpen}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute left-1/2 mt-4 z-10 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                {solutions.map((item) => (
                                    <div key={item.name} className="group cursor-pointer relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-500 group-hover:text-black group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold text-gray-900">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                    >
                                    <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    {item.name}
                                    </a>
                                ))}
                                </div>
                            </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                    </NavLink>
                    {pathname.includes("assistant") ?
                        <Link href="/pricing?type=individual"><NavLink>Pricing</NavLink></Link>
                        :
                        <Link href="/pricing?type=business"><NavLink>Pricing</NavLink></Link>
                    }
                    {/* <Link href="/docs/getting-started"><NavLink>Dokumentacja</NavLink></Link> */}
                    <LoginButton className="login-btn-landing" onClick={() => router.push("/assets")}>Log in</LoginButton>
                    {(mobile && !loading && isFixed) &&
                        <TestButton className='trial-btn' onClick={() => router.push("/register?registration=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
                    }
                    {!mobile &&
                        <TestButton className='trial-btn' onClick={() => router.push("/register?registration=true&trial=true")}><BsFillGiftFill /><TestText>Start free trial</TestText></TestButton>
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
    margin-top: 0};
    z-index: 100;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: ${({ isFixed }) => isFixed ? "0 6px 20px 0 rgba(50, 58, 58, 0.15);" : "none"};
    left: 0;
    justify-content: center;
    @media (max-width: 1023px) {
        justify-content: center;
        padding: 0vh 5vw 0.2vh 5vw;
        margin-left: ${({ isFixed }) => isFixed ? "0" : "0vw"};
        margin-top: ${({ isFixed }) => isFixed ? "0" : "0rem"};
        height: 4.2rem;
        border: none;
    }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Nav = styled.div<NavContainerProps>`
    width: 85vw;
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

const TestButton = styled.button`
    padding: 0.55rem 2.7rem 0.55rem 2.7rem;
    border: solid 3px transparent;
    border-radius: 15px;
    background-color: black;
    color: white;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi' , sans-serif;
    font-weight: 500;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 5px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
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
    padding: 0.55rem 2.4rem 0.55rem 2.4rem;
    border: solid 3px transparent;
    display: flex;
    border-radius: 15px;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: rgba(101, 120, 248, 0.1);
    align-items: center;
    background-size: 120%;
    background-position-x: -0.5rem;
    transition: all 0.3s ease;
    color: black;
    font-weight: 500;
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
    font-weight: 500;
    text-align: left;
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
