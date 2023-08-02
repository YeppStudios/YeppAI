import React from "react";
import Navbar from "@/components/Landing/Navbar";
import Head from "next/head";
import styled from "styled-components";
import placeholderImg from "@/public/images/blueAbstractBg.png";
import Image from "next/image";
import { BsFillGiftFill } from "react-icons/bs";

const SolutionPage = () => {
  return (
    <PageContent>
      <Head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Possibly to chabge */}
        <meta
          name="description"
          content="Platforma AI do marketingu. Wykorzystaj firmowe dane, które już posiadasz przez własne AI."
        />
        <title>Yepp AI | Solution</title>
      </Head>
      <Navbar />
      <div className="h-[100vh] relative">
        <div className="h-[85vh] relative">
          <Image src={placeholderImg} alt="chat with your data image" fill />
        </div>
        {/* Adjust shadow and font weight */}
        <div className="absolute inset-x-0 bottom-0 h-[25%] bg-white z-20 flex flex-col gap-12 px-12 pt-12 shadow-[0px_-40px_40px_50px_#fff] shadow-white">
          <div className="flex w-full justify-between ">
            <h2 className=" text-6xl">Chat with your data</h2>
            <div className="flex gap-8 h-12">
              <TestButton className="start-free-trial-landing">
                <BsFillGiftFill />
                <TestText>Start free trial</TestText>
              </TestButton>
              <button className="bg-white border-2 border-black rounded-xl px-12 py-1">
                Request the pricing
              </button>
            </div>
          </div>
          <p className="text-xl pl-2">
            Unleash the full potential of AI and chat with your data.
          </p>
        </div>
      </div>
    </PageContent>
  );
};

const PageContent = styled.div`
  width: 100vw;
  position: relative;
  height: 100%;
`;

const TestText = styled.p`
  margin-left: 1vw;
  @media (max-width: 1023px) {
    margin-left: 3vw;
  }
`;

const TestButton = styled.button`
  padding: 0.75rem 2.7rem 0.75rem 2.7rem;
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
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Satoshi", sans-serif;
  font-weight: 700;
  &:hover {
    box-shadow: none;
    transform: scale(0.95);
  }
  @media (max-width: 1023px) {
    padding: 1.3vh 7vw 1.3vh 7vw;
    font-size: 0.9rem;
  }
`;
export default SolutionPage;
