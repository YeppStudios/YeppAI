import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const animationVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, type: "spring", stiffness: 100, damping: 10 },
    x: 0,
  },
  hidden: { opacity: 0.8, scale: 0.9, x: 80 },
};

export default function ScalingElement(props: { children: any }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      animate={controls}
      initial="hidden"
      layout="position"
      style={{ willChange: "transform" }}
    >
      {props.children}
    </motion.div>
  );
}
