import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import styled from 'styled-components';

export default function Dropdown({values, value, onChange, error}: any) {
  const [selected, setSelected] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleChange = (value: SetStateAction<string>) => {
    setSelected(value)
      if (onChange) {
        onChange(value);
      }
  };


  // const rotateArrow = () => {
  //   const arrow = document.querySelector<HTMLElement>('.arrowicon')!;
  //   if(expanded){
  //     setExpanded(false);
  //     arrow.style.transform = 'rotate(0deg)';
  //   }else{
  //     setExpanded(true);
  //     arrow.style.transform = 'rotate(180deg)';
  //   }
  // }

  return (
      <Listbox value={selected} onChange={handleChange}>
        <DropdownContainer >
          <Listbox.Button style={{ boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)"}} className={"appearance-none shadow-inner flex items-center pl-3 block w-full h-full pr-10 relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"}>
            <span className="block truncate text-left">{selected ? selected : <div className='text-[#FFFFFF]'>{value}</div>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 2xl:pr-4">
              <BsChevronDown
                className={error ? "h-5 w-5 text-red-300" :"h-4 w-4 2xl:h-6 2xl:w-6 text-[#FFFFFF] arrowicon"}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options style={{ boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)"}} className={`absolute backdrop-blur-lg z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl py-1 text-sm focus:outline-none sm:text-sm`}>
              {values.map((value: any, valueIdx: Key | null | undefined) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }: any) =>
                    `relative cursor-pointer rounded-lg select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-white bg-opacity-10' : 'text-white'
                    }`
                  }
                  value={value}
                >
                  {({ selected }: any) => (
                    <>
                      <span
                        className={`block truncate text-white ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-white">
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </DropdownContainer>
      </Listbox>
  )
}

const DropdownContainer = styled.div`
 position: relative;
 width: 100%;
 height: 100%;
`