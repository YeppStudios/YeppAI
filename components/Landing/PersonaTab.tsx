import Image from "next/image"
import ColorfulText from "../Common/ColorfulText"
import personaImage from "@/public/images/personaImg.png"
import Label from "../Common/Label"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { BsFillPlayFill } from "react-icons/bs"
import Centered from "../Centered"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
  

const PersonaTab = () => {

    const [link, setLink] = useState("");
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
        e.preventDefault();
        setLinkError(false);
        try {
            let url = new URL(link);
          } catch (_) {
            setLinkError(true);
            return;  
          }
        if (link) {
            window.location.href = `/onboarding?url=${link}&trial=true`;
        }
    }
    return (
        <div className="lg:px-[8rem] px-[0.7rem]">
            <div className="w-full bg-[#F2F4FA] rounded-3xl py-12 px-8 lg:py-20 lg:px-16 flex flex-wrap lg:grid lg:grid-cols-2 lg:gap-10">
                <div className="flex flex-col justify-center">
                    <h1 className="text-[1.65rem] lg:text-5xl font-bold leading-tight text-center lg:text-left">Get started with your ideal persona <ColorfulText>for free</ColorfulText></h1>
                    <p className="mt-8 text-lg lg:text-xl font-medium w-full lg:w-5/6 text-center lg:text-left">Paste the link and AI will generate the persona to get you started!</p>
                    <div className="mt-10">
                    {mobile ?
                        <Centered><div className="flex items-center"><Label>Link your landing page</Label>{linkError && <p className="text-red-400 ml-4 font-medium text-sm">enter valid url</p>}</div></Centered>
                        :
                        <div className="flex items-center"><Label>Link your landing page</Label>{linkError && <p className="text-red-400 ml-4 font-medium text-sm">enter valid url</p>}</div>
                    }
                    <form className="flex gap-4 flex-wrap lg:flex-nowrap" onSubmit={(e) => openOnboarding(e)}>
                        <input value={link} onChange={(e) => setLink(e.target.value)} className={classNames(linkError ? "border-red-400 " : "border-blue-400 ", "lg:w-2/3 border border-2 w-full rounded-3xl px-4 py-2 outline-none font-medium")} placeholder="https://www..." />
                        {mobile ?
                        <Centered><BlueBtn onClick={(e) => openOnboarding(e)}><BsFillPlayFill className="mr-2"/>Get started now</BlueBtn></Centered>
                        :
                        <BlueBtn onClick={(e) => openOnboarding(e)}><BsFillPlayFill className="mr-2"/>Get started now</BlueBtn>
                        }
                    </form>
                    </div>
                </div>
                <div className="flex w-full h-full lg:justify-end">
                    <Image src={personaImage} width={600} height={400} className="lg:w-5/6 w-full mt-6 lg:mt-0" alt="persona image" />
                </div>
            </div>
        </div>
    )
}

export default PersonaTab;


const BlueBtn = styled.div`
    padding: 0.7rem 1.25rem 0.7rem 1.25rem;
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
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
      box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    }
`