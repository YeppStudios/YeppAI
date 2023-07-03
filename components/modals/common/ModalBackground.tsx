import { useEffect } from "react";
import styled from "styled-components";

const ModalBackground = ({onClose, children, closeable}: any) => {
    const handleBgClick = () => {
        if(closeable){
            onClose();
        }
    }
    useEffect(() => {
        // disable scrolling on body
        document.body.style.overflow = 'hidden';
        // enable scrolling when component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <>
            <BlurBackground onClick={() => handleBgClick()}>
                {children}
            </BlurBackground>
        </>
    )
}

export default ModalBackground;

const BlurBackground = styled.div`
    width: 100vw;
    height: 100%;
    position: fixed;
    backdrop-filter: blur(7px);
    background-color: rgba(195, 202, 227, 0.3);
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