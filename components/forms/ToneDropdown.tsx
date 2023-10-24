import {
    Fragment,
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactFragment,
    ReactPortal,
    SetStateAction,
    useEffect,
    useState,
  } from "react";
  import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
  import { Combobox } from "@headlessui/react";
import Image from "next/image";
  
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  
  export default function ToneDropdown({ values, value, onChange }: any) {
    const [selected, setSelected] = useState("");
  
    const handleChange = (value: SetStateAction<string>) => {
      setSelected(value);
      if (onChange) {
        onChange(value);
      }
    };

  
    useEffect(() => {
      setSelected(value);
    }, [value]);
  
    const filteredValues =
    selected === ""
      ? values
      : values.filter((tone: any) => {
          return tone.title.toLowerCase().includes(selected.toLowerCase());
        });
  
    const findToneByTitle = (title: string) => {
        return values.find((tone: any) => tone.title === title);
    };
  
    return (
        <Combobox as="div" value={selected} onChange={handleChange}>
        <div className="relative">
            <Combobox.Input
            style={{
                fontWeight: "500",
                height: "auto",
                boxShadow:
                "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
            }}
            className="appearance-none border-2 flex text-black items-center pl-3 block w-full h-full pr-10 relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Friendly..."
            displayValue={() => {
                const selectedTone = findToneByTitle(selected);
                if (selectedTone && !selectedTone.icon.startsWith('http')) {
                return `${selected} ${selectedTone.icon}`;
                }
                return selected;
            }}
            />
          <Combobox.Button
            onClick={() => setSelected("")}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          >
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
  
          {filteredValues.length > 0 && (
        <Combobox.Options
          style={{ boxShadow: "5px 5px 10px rgba(15, 27, 40, 0.23)" }}
          className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border-2 bg-white py-1 text-sm focus:outline-none sm:text-sm`}
        >
          {filteredValues.map((tone: any) => (
            <Combobox.Option
              key={tone.title}
              value={tone.title}
              className={({ active }: any) =>
                `relative hover:bg-gray-200 cursor-pointer rounded-lg text-black select-none py-2 pl-4 pr-4 ${
                  active ? "" : "text-black"
                }`
              }
            >
              {({ active, selected }) => (
                <>
                  <div className="flex items-center">  {/* Flexbox Container */}
                    {tone.icon && (
                      <span className="mr-2">
                        {tone.icon.startsWith('http') ? (
                          <Image src={tone.icon} alt={tone.title} width={20} height={20} className="rounded-md" />
                        ) : (
                          tone.icon
                        )}
                      </span>
                    )}
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {tone.title}
                    </span>
                  </div>
                  {selected && (
                    <span
                      className={classNames(
                        "absolute inset-y-0 right-0 flex items-center pr-4",
                        active ? "text-white" : "text-indigo-600"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
        </div>
      </Combobox>
    );
  }
