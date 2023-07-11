import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const ModalBackground = ({onClose, children, closeable}: any) => {
    const router = useRouter();
    const path = router.pathname;
    const handleBgClick = () => {
        if(closeable){
            onClose();
        }
    }
    useEffect(() => {
        // disable scrolling on body
        document.body.style.overflow = 'hidden';
        // enable scrolling when component is unmounted
        console.log(path);
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <>
            <BlurBackground onClick={() => handleBgClick()} path={path}>
                {children}
            </BlurBackground>
        </>
    )
}

export default ModalBackground;

const BlurBackground = styled.div<{path: string}>`
    width: 100vw;
    height: 100%;
    position: fixed;
    backdrop-filter: ${props => props.path.includes("/register") ? "blur(0px)" : "blur(10px)"}};
    background-color: ${props => props.path.includes("/register") ? "rgba(0,0,0,0)" : "rgba(195, 202, 227, 0.3)"}};
    z-index: 101;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media (max-width: 768px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
`