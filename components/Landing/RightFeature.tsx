import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import thinArrow from "../../public/images/thinArrow.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const RightFeature = (props: {
  text: string;
  gif: any;
  title: string;
  bulletpoints: any[];
  color: string;
}) => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1023) {
      setMobile(false);
    }
  }, []);

  return (
    <FeatureContainer color={props.color}>
        <ImageContainer>
          <Image
            src={props.gif}
            width={700}
            height={400}
            style={{width: "100%", borderRadius: "25px"}}
            alt={"image"}
          />
        </ImageContainer>
      <div style={{borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px"}} className="bg-black text-white w-[85vw] lg:w-[60vw] left-0 p-10 lg:p-24 lg:pt-20 pb-36 lg:pl-[25vw] ml-[15vw] lg:ml-[40vw]">
        <SlideBottom><FeatureTitle>{props.title}</FeatureTitle></SlideBottom>
          <SlideBottom>
            <FeatureDescription color={props.color}>
            {props.text}
            </FeatureDescription>
          </SlideBottom>
          <FeatureDescription color={props.color}>
            <a href="#" style={{textDecoration: "underline"}}>Learn more</a>
          </FeatureDescription>
        </div>
    </FeatureContainer>
  );
};

export default RightFeature;

const FeatureContainer = styled.div<{color: string }>`
  width: 100vw;
  height: auto;
  padding: 0vh 0vw 10vh 0vw;
  margin-top: 14rem;
  color: ${(props) => props.color};
  display: flex;
  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    padding: 5vh 0 10vh 0;
    margin-top: 0;
    margin-bottom: 10vh;
  }
  @media (max-width: 600px) {
    margin-bottom: 24vh;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 4vw;
  font-family: "Satoshi", sans-serif;
  font-weight: 700;
  max-width: 30vw;
  line-height: 1.2;
  @media (max-width: 1023px) {
    font-size: 4.5vw;
    max-width: 14rem;
    line-height: 1.2;
    margin-left: 40vw;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
    margin-left: 0vw;
  }
`;

const FeatureDescription = styled.p<{ color: string }>`
  margin-top: 3rem;
  font-size: 1.25rem;
  font-weight: 400;
  max-width: 20vw;
  color: #989898;
  @media (min-width: 1023px) {
    ul {
      list-style-type: disc;
      padding-left: 20px;
    }
  }

  @media (max-width: 1023px) {
    max-width: 14rem;
    margin-top: 2.5vh;
    font-size: 1rem;
    margin-left: 40vw;
  }
  @media (max-width: 600px) {
    margin-left: 0vw;
  }
`;


const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  width: 50vw;
  margin-left: 10vw;
  margin-top: 12rem;
  border: 6px solid #000000;
  border-radius: 25px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.35);
  @media (min-width: 1680px) {
    width: 35vw;
    margin-left:  20vw;
  }
  @media (max-width: 1023px) {
    margin-top: 20vh;
    margin-right: 0;
    width: 55%;
  }
  @media (max-width: 600px) {
    margin-top: 20rem;
    width: 85%;
  }
`;

