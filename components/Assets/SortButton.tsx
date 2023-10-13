import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const publishingOptions = [
    'Latest',
    'A-Z'
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example(props: {setSortType: any, sortType: string}) {

  return (
    <Listbox value={props.sortType} onChange={props.setSortType}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change sort</Listbox.Label>
          <div className="relative">
              <Listbox.Button className="inline-flex border border-gray-100 rounded-xl items-center bg-white p-2 focus:outline-none flex items-center gap-4 shadow-md hover:shadow-sm px-4 pl-6">
                <span className="sr-only">Change sort</span>
                <p className="text-sm font-semibold text-black">{props.sortType}</p>
                <ChevronDownIcon className="h-5 w-5 text-black" aria-hidden="true" />
              </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-white text-black' : 'text-gray-900',
                        'select-none p-4 text-sm cursor-pointer hover:bg-slate-50'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold text-blue-500' : 'font-medium'}>{option}</p>
                          {selected ? (
                            <span className={active ? 'text-blue-500' : 'text-blue-500'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>

                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
