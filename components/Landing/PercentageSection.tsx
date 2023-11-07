import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import growthIcon from "../../public/images/percentage_arrow.png";

const PercentageSection = () => {
    const [mobile, setMobile] = useState(true);
    const [counter, setCounter] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Adjust this value as needed
    });

    useEffect(() => {
        if (window.innerWidth > 1023) { 
            setMobile(false);
        }
        const updateWindowSize = () => {
            setMobile(window.innerWidth < 1023);
        };
        window.addEventListener("resize", updateWindowSize);
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';

        return () => {
            window.removeEventListener("resize", updateWindowSize);
        }
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        if (inView) {
            const startCounter = () => {
                setCounter((prev) => {
                    const newValue = prev + 0.5; // Adjust the increment value as needed
                    if (newValue < 27) {
                        animationFrameId = requestAnimationFrame(startCounter);
                    }
                    return newValue > 27 ? 27 : newValue; // Ensure it doesn't exceed 27
                });
            };
            startCounter();
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [inView]);

    return (
        <DemoContainer className="w-full bg-white py-12 lg:py-14 px-12 lg:px-24 flex justify-between mb-20">
            <div className="w-[5rem] flex justify-end lg:mt-0 absolute right-0 top-0">
                <Image src={growthIcon} alt="growth icon" className="lg:w-full w-1/4" />
            </div>
            <div className="w-full rounded-xl relative" ref={ref}>
                <div className="flex flex-wrap lg:flex-nowrap justify-between items-center mt-6">
                    <div className="lg:w-1/2 w-full flex flex-wrap items-center">
                    {!mobile &&
                    <p className="text-gray-800 mb-2">
                        Create and drive more traffic
                    </p>
                    }
                    <p className="text-[3vw] leading-tight font-medium flex lg:w-10/12 items-end"> 
                        Yepp AI helps businesses attract 27% more clients.
                    </p>
                    </div>
                    <div className="h-full flex flex-col-reverse lg:flex-col lg:flex-wrap w-full lg:w-1/2">
                        <motion.p 
                            className="lg:text-[10rem] text-5xl text-right flex lg:block text-gray-800 lg:mt-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: inView ? 1 : 0 }}
                            transition={{ duration: 1 }}
                        >
                            {counter.toFixed(0)}%
                        </motion.p>
                    </div>
                </div>
            </div>
        </DemoContainer>
    )
}

export default PercentageSection;

const DemoContainer = styled.div`
    box-shadow: 0px 0px 20px rgba(0, 0, 100, 0.15);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    @media (max-width: 1023px) {
        flex-direction: column-reverse;
    }
`
