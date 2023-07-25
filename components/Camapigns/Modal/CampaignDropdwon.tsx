import React, { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

interface categoryDropdwonProps {
  name: string;
  icon: string;
}

interface DropdownProps {
  category: categoryDropdwonProps;
  values: categoryDropdwonProps[];
}

export const CampaignDropdown = () => {
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

  const exampleArray = ["123", "456", "789"];

  return (
    <div className="w-full  relative">
      <div
        onClick={() => setIsCategoryOpen((prev) => !prev)}
        className="flex justify-between rounded-full  items-center "
      >
        Example
        {isCategoryOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {isCategoryOpen && (
        <div className="bg-blue-300  absolute top-8 p-2  w-full z-20">
          {exampleArray.map((item) => {
            return (
              <div
                key={item}
                onClick={() => toggleCategory(item)}
                className="flex justify-between items-center"
              >
                <span>{item}</span>
                {chosenCategories.includes(item) && <TiTick />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
