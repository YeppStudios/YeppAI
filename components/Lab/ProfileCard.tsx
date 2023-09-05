import React, { FC } from "react";
import { BsChevronRight, BsMicFill, BsPerson } from "react-icons/bs";
import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import { IoPerson } from "react-icons/io5";

interface ProfileCardProps {
  icon: StaticImageData;
  name: string;
  type: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ icon, name, type }) => {
  return (
    <div className="flex lg:gap-[1vw] gap-4 items-center ml-2 py-1">
      <div className="rounded-full overflow-hidden lg:h-[2.8vw] lg:w-[2.8vw] h-[10vw]  w-[10vw] relative">
        <Image src={icon} fill alt="profile's icon" />
      </div>
      <div className="flex flex-col">
        <NameText>{name}</NameText>
        {type === "persona" ?
        <div className="flex text-slate-300 text-sm items-center"><IoPerson /><TypeText className="ml-1">{type}</TypeText></div>
        :
        <div className="flex text-slate-300 text-sm items-center"><BsMicFill /><TypeText className="ml-1">{type}</TypeText></div>
        }

      </div>
    </div>
  );
};

const TypeText = styled.span`
  @media (max-width: 1023px) {
    font-size: small;
  }
  font-size: min(0.9vw, 0.8rem);
`;
const NameText = styled.h4`
  white-space: nowrap;
  @media (max-width: 1023px) {
    font-size: large;
  }
  font-size: min(1.05vw, 1.2rem);
  font-weight: 600;
`;
