import Image, { StaticImageData } from "next/image";
import React, { FC, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface PlacementType {
  icon: string | StaticImageData;
  name: string;
}

interface PlacementDropdownProps {
  placements: PlacementType[];
}

export const PlacementDropdown: FC<PlacementDropdownProps> = ({
  placements,
}) => {
  const [currentCategory, setCurrentCategory] = useState<PlacementType>(
    placements[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const otherCategories = placements.filter(
    (placement) => placement.name !== currentCategory.name
  );

  const handleChangePlacement = (placement: PlacementType) => {
    setCurrentCategory(placement);
    setIsDropdownOpen(false);
  };
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className="flex justify-between items-center border border-slate-300 shadow-xl py-2 px-[1.5vw] rounded-2xl w-full  h-full relative"
      onClick={() => setIsDropdownOpen((prev) => !prev)}
      ref={dropdownRef}
    >
      <div className="flex gap-4">
        <div className="w-6 h-6 relative">
          <Image src={currentCategory.icon} fill alt="icon" />
        </div>
        <span>{currentCategory.name}</span>
      </div>
      {isDropdownOpen ? <BsChevronUp /> : <BsChevronDown />}
      {isDropdownOpen && (
        <DropdownContainer>
          {otherCategories.map((placement) => (
            <div
              key={placement.name}
              className="flex gap-4 py-2 px-6"
              onClick={() => handleChangePlacement(placement)}
            >
              <div className="w-6 h-6 relative">
                <Image src={placement.icon} fill alt="icon" />
              </div>
              <span>{placement.name}</span>
            </div>
          ))}
        </DropdownContainer>
      )}
    </div>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(203 213 225);
  position: absolute;
  top: 2.5rem;
  z-index: 1000;
  width: 100%;
  background-color: white;
  left: 0;
  max-height: 15rem;
  overflow-y: scroll;
`;
