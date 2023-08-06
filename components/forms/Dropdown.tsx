import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsChevronDown, BsCheck2 } from "react-icons/bs";
import styled from 'styled-components';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function Dropdown({values, value, onChange, placeholder}: any) {
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
          <Listbox.Button style={{fontWeight: "500", height: "auto", boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23)"}} className={"appearance-none border-2 flex text-black bg-transparent items-center pl-3 block w-full h-full pr-10 relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"}>
            <span className="block truncate text-left">{selected ? selected : <div className='text-black'>{value ?  value : <p className='text-gray-400'>{placeholder}</p>}</div>}</span>
            <span className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options style={{"boxShadow": "5px 5px 10px rgba(15, 27, 40, 0.23)"}} className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border-2 bg-white py-1 text-sm focus:outline-none sm:text-sm`}>
              {values.map((value: any, valueIdx: Key | null | undefined) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }: any) =>
                    `relative hover:bg-gray-200 cursor-pointer rounded-lg text-black select-none py-2 pl-4 pr-4 ${
                      active ? '' : 'text-black'
                    }`
                  }
                  value={value}
                >
                  {({ selected }: any) => (
                    <>
                      <span
                        className={`block truncate text-black ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value}
                      </span>
                      {selected ? (
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