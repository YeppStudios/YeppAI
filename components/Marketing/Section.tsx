import styled from "styled-components";
import Image from "next/image";
import SlideBottom from "../Animated/SlideBottom";

const Section = ({ image, title, description }: any) => {
  return (
    <SlideBottom>
      <SectionContainer>
        <SectionIcon>
          <Image
            style={{ width: "100%", height: "auto" }}
            width={27}
            height={27}
            src={image}
            alt={"icon"}
          ></Image>
        </SectionIcon>
        <SectionTitle>{title}</SectionTitle>
        <SectionText>{description}</SectionText>
      </SectionContainer>
    </SlideBottom>
  );
};

export default Section;

const SectionContainer = styled.div`
  width: calc(100% - 1.4rem);
  height: 13rem;
  background: white;
  margin: 1.4rem 0rem 1.4rem 0.75rem;
  border: 2px solid #eaedf5;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
  padding: 1.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: 1px 1px 5px rgba(15, 27, 40, 0.05);
  }
  @media (max-width: 1023px) {
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;

const SectionIcon = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  position: relative;
  overflow: visible;
  border-radius: 10px;
`;

const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-family: "Satoshi", sans-serif;
  font-weight: 600;
  margin-top: 1rem;
  color: black;
`;
const SectionText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.2rem;
  font-family: "Satoshi", sans-serif;
  width: 90%;
  color: black;
  @media (max-width: 1023px) {
    width: 95%;
  }
`;
