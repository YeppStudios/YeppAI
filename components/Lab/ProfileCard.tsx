import React, { FC } from "react";
import { BsChevronRight } from "react-icons/bs";
import Image, { StaticImageData } from "next/image";

interface ProfileCardProps {
  icon: StaticImageData;
  name: string;
  type: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ icon, name, type }) => {
  return (
    <div className="flex gap-8">
      <div className="rounded-full overflow-hidden">
        <Image src={icon} width={50} height={50} alt="profile's icon" />
      </div>
      <div className="flex flex-col">
        <h4>{name}</h4>
        <span>{type}</span>
      </div>
    </div>
  );
};
