import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import meshBackground from "../../public/images/mediumMobileBackground.png";
import mediumMobileBackground from "../../public/images/mediumMobileBackground.png";
import TypingAnimation from "../Modals/common/TypingAnimation";

interface Background {
    image: any,
    mobileImage: any
  }


export default function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            url !== router.asPath;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            setLoading(true);
          }
          const handleComplete = (url:string) => {
            url === router.asPath
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
            setLoading(false);
          };

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    
    return  (
    <div>
        {loading &&
                <BlurBackground image={meshBackground} mobileImage={mediumMobileBackground}>
                    <TypingAnimation colorful={true}></TypingAnimation>
                </BlurBackground>
        }
    </div>
    );
}

const spinAnimation = keyframes`
100% {
    transform: rotate(1turn);
 }
`

const BlurBackground = styled.div<Background>`
    width: 100%;
    height: 100%;
    position: fixed;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 101;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const Spinner = styled.div`
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: radial-gradient(farthest-side,#6D8AFC 94%,#0000) top/9px 9px no-repeat,
            conic-gradient(#0000 30%,#6D8AFC);
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
        animation: ${spinAnimation} 1s infinite linear;
`