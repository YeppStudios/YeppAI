import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { BsFillGiftFill, BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, CalendarDaysIcon, GiftIcon } from '@heroicons/react/20/solid'
import {
  FolderArrowDownIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline'
import ColorfulText from "../Common/ColorfulText";

const solutions = [
  { name: 'Marketing Templates', description: 'Generate insightful content on niche topics', href: '/solution/marketing-templates', icon: ClipboardDocumentListIcon },
  { name: 'Copywriting', description: 'Craft highly personalized written pieces', href: '/solution/copywriting', icon: DocumentTextIcon },
  { name: 'Chat With Your Data', description: "AI assistant that knows you & your clients", href: '/solution/chat', icon: ChatBubbleBottomCenterTextIcon },
  { name: 'Content Campaigns', description: 'Content campaigns for all placements at once', href: '/solution/campaigns', icon: MegaphoneIcon },
  { name: 'Assets Upload', description: 'Teach AI about your client or any niche topic', href: '/solution/assets-upload', icon: FolderArrowDownIcon },
]


const Navbar = () =>{

    const [mobile, setMobile] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [solutionsOpen, setSolutionsOpen] = useState(false)
    const [solutionsMounted, setSolutionsMounted] = useState(false);
    const [platformOpen, setPlatformOpen] = useState(false)
    const [platformMounted, setPlatformMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setPlatformMounted(true);
        setSolutionsMounted(true);
        if (window.innerWidth > 1023) { 
            setMobile(false);
          }
          const updateWindowSize = () => {
            setMobile(window.innerWidth < 1023);
          };
          window.addEventListener("resize", updateWindowSize);
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
                    <Link href="/about-partnership"><NavLink>Why Yepp AI?</NavLink></Link>
                    <NavLink onMouseEnter={() => setPlatformOpen(true)} onMouseLeave={() => setPlatformOpen(false)}>
                    <Popover className="relative">
                    <Popover.Button className="inline-flex items-center gap-x-1 leading-6 text-gray-800 outline-none">
                        <span>Platform</span>
                        <ChevronDownIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </Popover.Button>
                        <Transition
                            show={platformOpen}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <div className="absolute z-10 left-1/2 pt-4 w-screen max-w-max -translate-x-1/2">
                            <Popover.Panel className="flex px-4">
                            <div className="w-screen max-w-md text-left flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg border-2 border-[#F6F6FB]">
                                <div className="p-4">
                                {solutions.map((item) => (
                                    <div key={item.name} className="group cursor-pointer relative flex gap-x-6 rounded-lg p-4 hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-500 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-left font-normal">{item.description}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-[#F6F6FB]">
                                    <button
                                    onClick={() => router.push("/register?registration=true&company=true&trial=true")}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-[#F2F2FB] hover:text-black"
                                    >
                                    <GiftIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Get a demo
                                    </button>
                                    <a
                                    href="https://calendly.com/yeppai/yepp-introduction-call"
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-[#F2F2FB] hover:text-black"
                                    >
                                    <CalendarDaysIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Talk to expert
                                    </a>
                                </div>
                            </div>
                            </Popover.Panel>
                            </div>
                        </Transition>
                    </Popover>
                    </NavLink>
                <NavLink onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
                    <Popover className="relative">
                    <Popover.Button className="inline-flex items-center gap-x-1 leading-6 text-gray-800 outline-none">
                        <span>Solutions</span>
                        <ChevronDownIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </Popover.Button>
                        <Transition
                            show={solutionsOpen}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <div className="absolute z-10 left-1/2 pt-4 w-screen max-w-max -translate-x-1/2">
                            <Popover.Panel className="flex px-4">
                            <div className="w-screen max-w-md text-left flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg border-2 border-[#F6F6FB]">
                                <div className="p-4">
                                {solutions.map((item) => (
                                    <div key={item.name} className="group cursor-pointer relative flex gap-x-6 rounded-lg p-4 hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-500 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-left font-normal">{item.description}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-[#F6F6FB]">
                                <button
                                    onClick={() => router.push("/register?registration=true&company=true&trial=true")}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-gray-100 hover:text-black"
                                    >
                                    <GiftIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Get a demo
                                    </button>
                                    <a
                                    href="https://calendly.com/yeppai/yepp-introduction-call"
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-gray-100 hover:text-black"
                                    >
                                    <CalendarDaysIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Talk to expert
                                    </a>
                                </div>
                            </div>
                            </Popover.Panel>
                            </div>
                        </Transition>
                    </Popover>
                    </NavLink>
                    <Link href="/pricing"><NavLink id="pricing-btn">Pricing</NavLink></Link>
                </Container>
                <Container>
                    <LoginButton className="login-btn-landing" onClick={() => router.push("/assets")}>Sign in<BsPersonCircle /></LoginButton>
                    {!(mobile && !isFixed) && <TestButton className='trial-btn' onClick={() => router.push("/register?registration=true&trial=true")}>Get a demo</TestButton>}
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
    margin-top: 0rem;
    z-index: 40;
    backdrop-filter: blur(5px);
    background-color: ${({isFixed}) => !isFixed ? "transparent" : "rgba(246, 246, 252, 0.95)"};
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

const TestButton = styled.button`
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-size: 120%;
    background-position-x: -1rem;
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
    }
    @media (max-width: 1023px) {
        padding: 1.3vh 7vw 1.3vh 7vw;
        font-size: 0.9rem;
    }
    
`

const LoginButton = styled.button`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    gap: 0.75vw;
    margin-right: 3.5vw;
    border: solid 3px transparent;
    align-items: center;
    transition: all 0.3s ease;
    color: black;
    font-weight: 500;
    @media (max-width: 1023px) {
        padding: 1.5vh 20vw 1.5vh 20vw;
        font-size: 2.4vh;
        display: none;
    }
`

const NavLink = styled.button`
    color: rgb(31 41 55);
    font-size: 1rem;
    margin-left: 3.5vw;
    font-weight: 500;
    @media (max-width: 1023px) {
        display: none;
    }
`


const LogoContainer = styled.div`
  width: 2rem;
  cursor: pointer;
  height: 2rem;
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
  font-size: 1.75rem;
  margin-left: 0.5vw;
  margin-right: 2vw;
  font-family: 'Satoshi' , sans-serif;
  font-weight: 700;
  @media (max-width: 1023px) {
    display: none;
}
`