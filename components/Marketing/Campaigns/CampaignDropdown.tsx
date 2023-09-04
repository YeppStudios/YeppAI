import React, { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import SlideBottom from "@/components/Animated/SlideBottom";

interface categoryDropdwonProps {
  name: string;
  icon: string;
}
interface valueProps {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: any[];
  icon: string;
  query: string;
  prompt: string;
}

interface DropdownProps {
  category: categoryDropdwonProps;
  values: valueProps[];
  openedCategory: string;
  setOpenedCategory: any;
  chosenTemplates: valueProps[];
  setChosenTemplates: any;
}

export const CampaignDropdown: FC<DropdownProps> = ({ category, values, openedCategory, setOpenedCategory, setChosenTemplates, chosenTemplates }) => {

  const [chosenDropdownTemplates, setChosenDropdownTemplates] = useState<valueProps[]>([]);


  const toggleTemplate = (value: valueProps) => {
    if (chosenDropdownTemplates.some(template => template.title === value.title)) {
      setChosenTemplates((prev: valueProps[]) => prev.filter((item: valueProps) => item._id !== value._id));
      setChosenDropdownTemplates((prev: valueProps[]) => prev.filter((item: valueProps) => item._id !== value._id));
    } else {
      setChosenTemplates((prev: valueProps[]) => [...prev, value]);
      setChosenDropdownTemplates((prev: valueProps[]) => [...prev, value]);
    }
  };  

  useEffect(() => {
    const filteredTemplates = chosenTemplates.filter((template: valueProps) => 
      values.some(value => value.title === template.title)
    );
    setChosenDropdownTemplates(filteredTemplates);
  }, [chosenTemplates, values]);

  

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
        "2px 2px 5px rgba(15, 27, 40, 0.23)",
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
          {chosenDropdownTemplates.length > 0 && (
            <div className="w-5 h-5 rounded-full bg-slate-200 flex justify-center items-center text-xs text-slate-500">
              {chosenDropdownTemplates.length}
            </div>
          )}
        </div>
        {category.name === openedCategory ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {category.name === openedCategory && (
        <div
          style={{
            boxShadow:
              "2px 2px 5px rgba(15, 27, 40, 0.23)",
          }}
          className="bg-white border-2 border-gray-200 max-h-48 overflow-scroll rounded-xl z-20 absolute top-12 p-2  w-full"
        >
          {values.map((item, id) => {
            return (
              <div
                key={id}
                onClick={() => toggleTemplate(item)}
                className="flex bg-white gap-2 items-center whitespace-nowrap p-2 z-100 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                <div>
                  <Image className="rounded-md min-w-[20px]" src={item.icon} alt="icon" height={20} width={20} />
                </div>
                <span className="text-left">{item.title}</span>
                <div className="w-4 h-4">
                  {chosenDropdownTemplates.some(template => template.title === item.title) && <TiTick />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
