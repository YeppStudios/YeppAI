import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const animationVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring" }, x: 0 },
    hidden: { opacity: 0, scale: 0.8, x: -200}
  };
  
export default function ScalingElement(props: { children: any }) {

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);

    return(
        <motion.div ref={ref} variants={animationVariants} animate={controls} initial="hidden">
            {props.children}
        </motion.div>
    )
}