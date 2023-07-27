import React, { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import SlideBottom from "@/components/Animated/SlideBottom";

interface categoryDropdwonProps {
  name: string;
  icon: string;
}

interface DropdownProps {
  category: categoryDropdwonProps;
  values: categoryDropdwonProps[];
  openedCategory: string;
  setOpenedCategory: any;
  setAllChosenCategories: any;
}

export const CampaignDropdown: FC<DropdownProps> = ({ category, values, openedCategory, setOpenedCategory, setAllChosenCategories }) => {
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);

  const toggleCategory = (value: string) => {
    if (chosenCategories.includes(value)) {
      // If the value is already in the array, remove it
      setChosenCategories((prev) => prev.filter((item) => item !== value));
      setAllChosenCategories((prev: any) => prev.filter((item: any) => item !== value));
    } else {
      // If the value is not in the array, add it
      setChosenCategories((prev) => [...prev, value]);
      setAllChosenCategories((prev: any) => [...prev, value]);
    }
  };

  const dropdownClick = () => {
    if (openedCategory === category.name) {
      setOpenedCategory("");
    } else {
      setOpenedCategory(category.name);
    }
  }

  return (
    <div
    style={{
      fontWeight: "500",
      height: "auto",
      boxShadow:
        "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
    }}
    className={
      "cursor-pointer appearance-none border-2 flex bg-white text-black items-center m-2 h-full pr-4 relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"
    }
  >
      <div
        onClick={dropdownClick}
        className="flex justify-between w-full items-center"
      >
        <div className="flex w-full gap-4 items-center px-2 ml-2">
          <div>
            <Image src={category.icon} alt="icon" width={22} height={22} />
          </div>
          {category.name}
          {chosenCategories.length > 0 &&<div className="w-5 h-5 rounded-full bg-slate-200 flex justify-center items-center text-xs text-slate-500">{chosenCategories.length}</div>}
        </div>
        {category.name === openedCategory ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {category.name === openedCategory && (
        <div
          style={{
            boxShadow:
              "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
          }}
          className="bg-white border-2 border-gray-200 max-h-48 overflow-scroll rounded-xl z-20 absolute top-12 p-2  w-full"
        >
          {values.map((item, id) => {
            return (
              <div
                key={id}
                onClick={() => toggleCategory(item.name)}
                className="flex bg-white gap-2 items-center p-2 z-100 hover:bg-gray-100 rounded-xl cursor-pointer"
              >
                <div>
                  <Image className="rounded-md" src={item.icon} alt="icon" height={20} width={20} />
                </div>
                <span className="text-left">{item.name}</span>
                <div className="w-4 h-4">
                  {chosenCategories.includes(item.name) && <TiTick />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
