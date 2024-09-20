import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { BsFillGiftFill, BsPersonCircle } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, CalendarDaysIcon, GiftIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ScaleIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import {solutions} from "../../solutions";


const platform = [
    { name: 'What is Yepp', description: 'Learn more on what Yepp is all about', href: '/platform/what-is-yepp', icon: BuildingOffice2Icon },
    { name: 'Trust', description: 'More on how do we keep our partners safe', href: '/platform/trust', icon: ShieldCheckIcon },
    { name: 'FAQ', description: 'Answers to the most common questions', href: '/platform/faq', icon: QuestionMarkCircleIcon }
  ]


const blogs = [
  { name: 'Latest SEO Game-Changer', description: 'Unpack the Latest SEO Game-Changer from Google.', href: 'https://www.linkedin.com/pulse/unpack-latest-seo-game-changer-yeppai-lrnuc/?trackingId=uibjLxwMSsWhS7E2YCbQDA%3D%3D', imageUrl: "https://media.licdn.com/dms/image/D5612AQHOWtjMvFcUfQ/article-cover_image-shrink_423_752/0/1699516148285?e=1704931200&v=beta&t=9V3XxuO8GwJcsEO2Sb-JXL14Q8AUoMhP1UvXcmdDyGM", time: "08 Nov 2023" },
  { name: 'Future of Marketing', description: 'Hyper-Personalization in marketing with Fine-Tuned LLMs.', href: 'https://medium.com/@wiktor_gawel/future-of-marketing-9064ae3f6a53', imageUrl: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*70PIhty3qk0Bu6GaqTSPaA.png", time: "06 Nov 2023" },

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
                    <a href="https://www.yeppstudios.com"><NavLink>Consultations</NavLink></a>
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
                                {platform.map((item) => (
                                    <div key={item.name} className="group cursor-pointer relative flex gap-x-6 rounded-lg p-4 hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-500 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <Link href={item.href} className="font-semibold">
                                        {item.name}
                                        <span className="absolute inset-0" />
                                        </Link>
                                        <p className="mt-1 text-left font-normal">{item.description}</p>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-[#F6F6FB]">
                                    <a
                                    href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD"
                                    className="flex items-center hover:text-blue-500 justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-[#F2F2FB] hover:text-black"
                                    >
                                        Get an offer
                                    </a>
                                    <Link
                                    href="/demo"
                                    className="flex items-center hover:text-blue-500 justify-center gap-x-2.5 p-3 font-medium text-gray-500 hover:bg-[#F2F2FB] hover:text-black"
                                    >
                                    <CalendarDaysIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                                        Talk to expert
                                    </Link>
                                </div>
                            </div>
                            </Popover.Panel>
                            </div>
                        </Transition>
                    </Popover>
                    </NavLink>
                <NavLink onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
                    <Popover>
                    <Popover.Button className="inline-flex items-center gap-x-1 leading-6 text-gray-800 outline-none">
                        <span>Solutions</span>
                        <ChevronDownIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </Popover.Button>
                    <Transition
                            show={solutionsOpen}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 -translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 -translate-y-1"
                        >
                    <div className="absolute z-10 left-1/2 pt-4 w-screen max-w-max -translate-x-1/2">
                    <Popover.Panel className="flex cursor-auto px-4 bg-white text-left flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg border-2 border-[#F6F6FB]">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
                        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
                        <div>
                            <div className="flow-root">
                            <div className="-my-2">
                            {solutions.slice(0, 6).map((item) => (
                                <div key={item.title} className="group cursor-pointer items-center relative flex gap-x-2 px-2 py-1 rounded-lg hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg text-gray-500 hover:text-black">
                                        <item.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <Link href={`solution/${item.query}`} as={`/solution/${item.query}`} className="font-semibold">
                                            {item.title}
                                            <span className="absolute inset-0" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            </div>
                            </div>
                        </div>
                        <div>
                            <div className="flow-root">
                            <div className="-my-2">
                            {solutions.slice(6, 11).map((item) => (
                                <div key={item.title} className="group cursor-pointer items-center relative flex gap-x-2 px-2 py-1 rounded-lg hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg text-gray-500 hover:text-black">
                                        <item.icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <Link href={`solution/${item.query}`} as={`/solution/${item.query}`} className="font-semibold">
                                            {item.title}
                                            <span className="absolute inset-0" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            <div className="group cursor-pointer items-center relative flex gap-x-2 px-2 py-1 rounded-lg hover:bg-[#F6F6FB]">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg text-gray-500 hover:text-black">
                                        <CommandLineIcon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 group-hover:scale-105" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <Link href={"/custom-solution"} className="font-semibold">
                                            Custom Solution
                                            <span className="absolute inset-0" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                        <h3 className="sr-only">Recent posts</h3>
                        {blogs.map((post) => (
                            <article
                            key={post.name}
                            className="relative group cursor-pointer isolate hover:scale-95 transition flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                            >
                            <div className="relative flex-none">
                                <Image
                                className="aspect-[2/1] w-full rounded-lg object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
                                src={post.imageUrl}
                                alt=""
                                width={1200}
                                height={800}
                                />
                            </div>
                            <div>
                                <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                                <a href={post.href}>
                                    <span className="absolute inset-0" />
                                    {post.name}
                                </a>
                                </h4>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
                                <div className="flex items-center justify-between gap-x-4">
                                <time className="text-sm leading-6 text-gray-400">

                                </time>
                                <div
                                    className="relative z-10 mt-4 rounded-full bg-gray-50 px-3 py-1.5 text-xs text-gray-400"
                                >
                                    {post.time}
                                </div>
                                </div>
                            </div>
                            </article>
                        ))}
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
                    {!(mobile && !isFixed) && <TestButton className='trial-btn' href="https://www.useminerva.com/onboarding/asst_kLacMlvm6kyD5MRfYAu6mWTD">Get an offer</TestButton>}
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

const TestButton = styled.a`
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