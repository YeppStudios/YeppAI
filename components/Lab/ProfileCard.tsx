import React, { FC } from "react";
import { BsChevronRight } from "react-icons/bs";
import Image, { StaticImageData } from "next/image";
import styled from "styled-components";

interface ProfileCardProps {
  icon: StaticImageData;
  name: string;
  type: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ icon, name, type }) => {
  return (
    <div className="flex lg:gap-[1vw] gap-4 items-center">
      <div className="rounded-full overflow-hidden lg:h-[3vw] lg:w-[3vw] h-[10vw]  w-[10vw] relative">
        <Image src={icon} fill alt="profile's icon" />
      </div>
      <div className="flex flex-col">
        <NameText>{name}</NameText>
        <TypeText className="text-slate-400 ">{type}</TypeText>
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
  @media (max-width: 1023px) {
    font-size: large;
  }
  font-size: min(1.2vw, 1.2rem);
  font-weight: 600;
`;
