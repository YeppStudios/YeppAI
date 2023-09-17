import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import Link from "next/link";
import { useRouter } from "next/router";
import Centered from "../Centered";

const RightFeature = (props: {
  text: string;
  gif: string;
  title: string;
  bulletpoints: any[];
  color: string;
  link: string;
}) => {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth >= 1023) {
      setMobile(false);
    }
  }, []);

  const router = useRouter();

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
        <div className="flex w-full items-center justify-center flex-col lg:items-start lg:justify-start ">
          <FeatureTitle>{props.title}</FeatureTitle>
          <FeatureDescription color={props.color}>
            {!mobile && props.text}
            {!mobile && (
              <ul className="mt-6">
                {props.bulletpoints.map((item, index, array) => {
                  return (
                    <li key={item}>
                      {item}
                      {index !== array.length - 1 && mobile ? "," : ""}
                    </li>
                  );
                })}
              </ul>
            )}
          </FeatureDescription>
          {!mobile && (
            <Link href="/register?registration=true&company=true&trial=true">
              <Button color={props.color} className="trial-btn-feature">
                <BtnText>Try now</BtnText>
              </Button>
            </Link>
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
              style={{ borderRadius: "20px", width: "100%" }}
              alt={"gif"}
            />
          </GifContainer>
          <Link href="/register?registration=true&company=true&trial=true">
            <Button color={props.color} className="">
              <BtnText>Try now</BtnText>
            </Button>
          </Link>
        </>
      )}
        <Centered><LearnMoreLink onClick={() => router.push(`${props.link}`)}>Learn more <span aria-hidden="true">&rarr;</span></LearnMoreLink></Centered>
    </FeatureContainer>
  );
};

export default RightFeature;

const FeatureContainer = styled.div<{ color: string }>`
  padding-right: 5vw;
  width: 100vw;
  height: auto;
  margin-top: 14rem;
  color: ${(props) => props.color};
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
  align-items: center;
  grid-column-gap: 2rem;
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
  font-size: 2.5vw;
  font-family: "Satoshi", sans-serif;
  font-weight: 900;
  line-height: 1.2;
  text-align: start;
  @media (max-width: 1023px) {
    font-size: 2rem;
    width: 95%;
    margin-top: 2.5%;
    text-align: center;
  }
`;

const FeatureDescription = styled.p<{ color: string }>`
  display: none;
  margin-top: 1.5vh;
  font-size: 1.25rem;
  font-weight: 500;
  color: ${(props) => (props.color === "white" ? "#D1D6E2" : "black")};

  @media (min-width: 1023px) {
    display: block;
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
  margin-left: 5vw;
  max-height: 90vh;
  width: 40rem;
  border-radius: 25px;
  border: 3px solid black;
  box-shadow: 0 6px 32px 0 rgba(31, 38, 135, 0.3);
  @media (max-width: 1023px) {
    margin-top: 2rem;
    margin-left: 0;
    border: 3px solid black;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const Button = styled.div`
  color: white;
  padding: 1.75vh 0 1.75vh 0;
  border: solid 3px transparent;
  border-radius: 25px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
    inset -2px -2px 4px #fafbff, 2px 2px 6px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  align-items: center;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  background-size: 120%;
  background-position-x: -1rem;
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

const LearnMoreLink = styled.div`
  align-text: center;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 2.5vh;
  @media (min-width: 1023px) {
    display: none;
  }
`;