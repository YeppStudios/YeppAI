import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";

export default function Dropdown({values, value, onChange, error}: any) {
  const [selected, setSelected] = useState<any>();
  const handleChange = (value: SetStateAction<string>) => {
    onChange(values[Number(value)]);
  };

  return (
      <Listbox value={selected} onChange={handleChange}>
        <DropdownContainer >
          <Listbox.Button style={{fontWeight: "500",   boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF"}} className={"appearance-none border-2 flex text-black items-center pl-3 block w-full h-full pr-10 relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"}>
            <span className="block truncate text-left">{selected ? selected.title : <div className='text-black'>{value.title}</div>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 2xl:pr-4">
              <BsChevronDown
                className={error ? "h-5 w-5 text-red-300" :"h-4 w-4 2xl:h-6 2xl:w-6 text-black arrowicon"}
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
            <Listbox.Options style={{"boxShadow": "5px 5px 10px rgba(15, 27, 40, 0.23)"}} className={`absolute z-50 mt-1 w-full rounded-xl border-2 bg-white py-1 text-sm focus:outline-none sm:text-sm`}>
              {values.map((value: any, valueIdx: Key | null | undefined) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }: any) =>
                    `relative hover:bg-gray-200 cursor-pointer rounded-lg text-black select-none py-2 pl-4 pr-4 ${
                      active ? '' : 'text-black'
                    }`
                  }
                  value={valueIdx}
                >
                  {({ selected }: any) => (
                    <>
                      <span
                        className={`block truncate text-black ${
                          selected.title ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value.title}
                      </span>
                      {selected.title ? (
                        <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-black">
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