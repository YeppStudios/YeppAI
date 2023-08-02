import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import thinArrow from "../../public/images/thinArrow.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const RightFeature = (props: {
  text: string;
  gif: string;
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
      {!mobile && (
        <GifContainer>
          <Image
            src={props.gif}
            width={700}
            height={400}
            style={{ borderRadius: "25px" }}
            alt={"gif"}
          />
        </GifContainer>
      )}
      <SlideBottom>
        <div>
          <FeatureTitle>{props.title}</FeatureTitle>
          <FeatureDescription color={props.color}>
            {!mobile && props.text}
            <div className="mt-6">
              {props.bulletpoints.map((item, index, array) => {
                return (
                  <p key={item}>
                    <span aria-hidden="true" className="mr-3">&rarr;</span> {item}
                    {index !== array.length - 1 && mobile ? "," : ""}
                  </p>
                );
              })}
            </div>
          </FeatureDescription>
          {!mobile && (
          <Button href="/assets?registration=true&trial=true" color={props.color} className="">
            <BtnText>Try now</BtnText>
          </Button>
          )}
        </div>
      </SlideBottom>
      {mobile && (
        <>
          <GifContainer>
            <Image
              src={props.gif}
              width={400}
              height={200}
              style={{ borderRadius: "20px" }}
              alt={"gif"}
            />
          </GifContainer>
          <Button href="/assets?registration=true&trial=true" color={props.color} className="">
            <BtnText>Try now</BtnText>
          </Button>
        </>
      )}
    </FeatureContainer>
  );
};

export default RightFeature;

const FeatureContainer = styled.div<{ color: string }>`
  width: 100vw;
  height: auto;
  padding: 0vh 7vw 0vh 7vw;
  margin-top: 14rem;
  color: ${(props) => props.color};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 120px;
  grid-template-areas: ". .";
  align-items: center;
  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    padding: 5vh 0 10vh 0;
    margin-top: 0;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  font-family: "Satoshi", sans-serif;
  font-weight: 700;
  line-height: 1.3;
  @media (max-width: 1023px) {
    font-size: 2rem;
    width: 100%;
    line-height: 1.2;
    text-align: center;
  }
`;

const FeatureDescription = styled.p<{ color: string }>`
  margin-top: 1.5vh;
  font-size: 1.25rem;
  font-weight: 400;
  color: ${(props) => (props.color === "white" ? "#D1D6E2" : "black")};

  @media (min-width: 1023px) {
    ul {
      list-style-type: disc;
      padding-left: 20px;
    }
  }

  @media (max-width: 1023px) {
    width: 95vw;
    text-align: center;
    margin-top: 2.5vh;
    font-size: 1.2rem;
  }
`;

const GifContainer = styled.div`
  overflow: visible;
  max-height: 90vh;
  width: 40rem;
  border-radius: 25px;
  border: 7px solid black;
  box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.3);
  @media (max-width: 1023px) {
    margin-top: 2rem;
    margin-left: 0;
    width: 95vw;
    border: 4px solid black;
  }
`;

const Button = styled.a`
  color: white;
  padding: 0.55rem 0 0.55rem 0;
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
    inset -2px -2px 4px #fafbff, 2px 2px 6px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  align-items: center;
  background: black;
  width: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-top: 2rem;
  align-items: center;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    transform: scale(0.96);
    box-shadow: none;
  }
  @media (max-width: 1023px) {
    width: 80vw;
    margin-top: 2rem;
    justify-content: center;
  }
`;

const BtnText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  font-family: "Lato", sans-serif;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`;
