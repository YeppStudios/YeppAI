import React, { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

interface categoryDropdwonProps {
  name: string;
  icon: string;
}

interface DropdownProps {
  category: categoryDropdwonProps;
  values: categoryDropdwonProps[];
}

export const CampaignDropdown: FC<DropdownProps> = ({ category, values }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [chosenCategories, setChosenCategories] = useState<string[]>([""]);

  const toggleCategory = (value: string) => {
    if (chosenCategories.includes(value)) {
      // If the value is already in the array, remove it
      setChosenCategories((prev) => prev.filter((item) => item !== value));
    } else {
      // If the value is not in the array, add it
      setChosenCategories((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    console.log(chosenCategories);
  }, [chosenCategories]);

  return (
    <div className="w-full  relative">
      <div
        onClick={() => setIsCategoryOpen((prev) => !prev)}
        className="flex justify-between rounded-full  items-center "
      >
        <div className="flex w-full justify-between items-center px-2">
          <div>
            <Image src={category.icon} alt="icon" width={22} height={22} />
          </div>
          {category.name}
        </div>
        {isCategoryOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {isCategoryOpen && (
        <div
          style={{
            boxShadow:
              "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
          }}
          className=" bg-white border border-gray-300  rounded-2xl  absolute top-8 p-2  w-full z-20"
        >
          {values.map((item, id) => {
            return (
              <div
                key={id}
                onClick={() => toggleCategory(item.name)}
                className="flex justify-between items-center p-2"
              >
                <div>
                  <Image src={item.icon} alt="icon" height={20} width={20} />
                </div>
                <span className="text-center">{item.name}</span>
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
