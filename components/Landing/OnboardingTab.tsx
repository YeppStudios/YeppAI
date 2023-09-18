import Image from "next/image"
import ColorfulText from "../Common/ColorfulText"
import Label from "../Common/Label"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BsFillPlayFill } from "react-icons/bs"
import Centered from "../Centered"
import SlideBottom from "../Animated/SlideBottom"
import { Loader } from "../Common/Loaders"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
  
const OnboardingTab = () => {

    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const router =  useRouter();
    const [linkError, setLinkError] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1023) { 
            setMobile(true);
          }
          const updateWindowSize = () => {
            setMobile(window.innerWidth < 1023);
          };
          window.addEventListener("resize", updateWindowSize);
    }, []);

    useEffect(() => {
        setLinkError(false);
    }, [link]);

    const openOnboarding = (e: any) => {
        setLoading(true);
        e.preventDefault();
        setLinkError(false);
        try {
            let url = new URL(link);
          } catch (_) {
            setLinkError(true);
            setLoading(false);
            return;  
          }
        if (link) {
            window.location.href = `/onboarding?url=${link}&trial=true`;

        }
    }
    return (
        <div className="lg:px-[8rem] px-[0.5rem]">
            <div className="w-full bg-[#F6F6FB] rounded-3xl py-12 pb-16 lg:pb-16 px-5 lg:px-16 lg:py-16 lg:px-20 flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="flex flex-col justify-center">
                    <h1 style={{lineHeight: "1.25"}} className="text-[1.85rem] lg:text-5xl font-bold text-center lg:text-left"><ColorfulText>Check out</ColorfulText> what Yepp can do for you</h1>
                    <p className="lg:mt-8 mt-4 text-xl lg:text-2xl font-medium w-full lg:w-5/6 text-center lg:text-left">Just paste the link and Yepp will generate fresh ideas to get you started!</p>
                </div>
                <SlideBottom>
                <div className="w-full flex justify-end">
                <div className="flex w-full lg:w-5/6 h-full flex-wrap mt-8 lg:mt-0 justify-center bg-white rounded-3xl shadow-lg py-8 lg:py-12 px-5 lg:px-12">
                    <Centered><Image src="/videos/web-file.gif" width="20" height="20" className="w-10 h-10 mb-2" alt="web"/></Centered>
                    <Centered><Label>link your page</Label></Centered>
                    <form className="w-full" onSubmit={(e) => openOnboarding(e)}>
                        <input value={link} onChange={(e) => setLink(e.target.value)} className={classNames(linkError ? "border-red-400 " : "border-blue-400 ", "border border-2 w-full mb-6 mt-2 rounded-3xl px-4 py-2 outline-none font-medium")} placeholder="https://www..." />
                        {mobile ?
                        <Centered>
                            <BlueBtn onClick={(e) => openOnboarding(e)}>
                                {!loading ?
                                <>
                                    <BsFillPlayFill className="mr-2"/>
                                    Get started
                                </>
                                :
                                <Loader color="white"/>
                                }
                            </BlueBtn>
                        </Centered>
                        :
                        <BlueBtn onClick={(e) => openOnboarding(e)}>
                            {!loading ?
                                <>
                                    <BsFillPlayFill className="mr-2"/>
                                    Get started
                                </>
                                :
                                <Loader color="white"/>
                            }
                        </BlueBtn>
                        }
                    </form>
                </div>
                </div>
                </SlideBottom>
            </div>
        </div>
    )
}

export default OnboardingTab;


const BlueBtn = styled.div`
    padding: 0.65rem 1.25rem 0.65rem 1.25rem;
    width: 100%;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    }
`