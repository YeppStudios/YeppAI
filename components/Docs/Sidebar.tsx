import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  DocumentTextIcon,
  SwatchIcon,
  HomeIcon,
  WindowIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { BsFillFilePersonFill} from "react-icons/bs";
import logoImage from "../../public/images/logo_black.png";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

const navigation = [
  // { name: 'Strona Główna', link: '/', mobileLink: "/", icon: HomeIcon, current: false },
  // { name: 'Panel Aplikacji', link: '/assets', mobileLink: "/chat", icon: WindowIcon, current: false },
  // { name: 'Dokumentacja', link: '/docs', mobileLink: "/docs", icon: DocumentTextIcon, current: false },
  // { name: 'Oferta', link: '/pricing?type=business', mobileLink: "/pricing?type=business", icon: SwatchIcon, current: false },
]
const tutorial = [
  { name: 'Create Conversation', id: "create-conversation", initial: 'C' },
  { name: 'Get Conversation', id: "get-conversation", initial: 'G' },
  { name: 'Send message', id: "send-message", initial: 'S' },
  { name: 'Send message (stream)', id: "send-message-stream", initial: 'S' },
]

const api: any[] = [
    // { id: 1, name: 'Dokumentacja', tab: "api-documentation", initial: 'D' },
    // { id: 2, name: 'Tutorial', tab: "tutorial", initial: 'T' }
  ]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar(props: { loggedIn: boolean, username: string, tab: string | undefined }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [path, setPath] = useState("");
  const [selectedTab, setSelectedTab] = useState("getting-started");


  const smoothScroll = (id: string) => {
    const conversationBottom = document.getElementById(id);
    if(conversationBottom){
      conversationBottom.scrollIntoView({behavior: 'smooth', block: 'start'}); //scroll to the bottom
    }
    setSelectedTab(id);
  }

    const router = useRouter();

    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, []);

    useEffect(() => {
        if (props.tab) {
            setSelectedTab(props.tab);
        }
        console.log(props.tab)
    }, [props.tab]);

    useEffect(() => {
        setPath(router.pathname)
    }, [router.pathname]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        {/* <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {mobile ?
                                <Link
                                  href={item.mobileLink}
                                  className={classNames(
                                    path === ""
                                      ? 'bg-gray-50 text-blue-600'
                                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      path === "" ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                                :
                                <Link
                                    href={item.link}
                                    className={classNames(
                                    path === ""
                                        ? 'bg-gray-50 text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )}
                                >
                                    <item.icon
                                    className={classNames(
                                        path === "" ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                        'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                                }
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">API Documentation</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {api.map((apiTab) => (
                            <li key={apiTab.name}>
                                <Link
                                href={`/docs/${apiTab.tab}`}
                                className={classNames(
                                    selectedTab === apiTab.tab
                                    ? 'bg-gray-50 text-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                >
                                <span
                                    className={classNames(
                                    selectedTab === apiTab.tab
                                        ? 'text-blue-600 border-blue-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600',
                                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                >
                                    {apiTab.initial}
                                </span>
                                <span className="truncate">{apiTab.name}</span>
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Dashboard guide</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {tutorial.map((tutorial) => (
                              <li key={tutorial.name}>
                                <button
                                  onClick={() => smoothScroll(tutorial.id)}
                                  className={classNames(
                                    selectedTab === tutorial.id
                                      ? 'bg-gray-50 text-blue-600'
                                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      selectedTab === tutorial.id
                                        ? 'text-blue-600 border-blue-600'
                                        : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {tutorial.initial}
                                  </span>
                                  <span className="truncate">{tutorial.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Link href={"/"} className="h-8 w-auto">
                <Image style={{ width: "auto", height: "100%" }}  src={logoImage} alt={'logo'}></Image> 
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {/* <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {mobile ?
                        <Link
                          href={item.mobileLink}
                          className={classNames(
                            path === ""
                              ? 'bg-gray-50 text-blue-600'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                            path === "" ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                        :
                        <Link
                            href={item.link}
                            className={classNames(
                            path === ""
                                ? 'bg-gray-50 text-blue-600'
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                        >
                            <item.icon
                            className={classNames(
                                path === "" ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                        }
                      </li>
                    ))}
                  </ul>
                </li> */}
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">API Documentation</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {tutorial.map((tutorial) => (
                      <li key={tutorial.name}>
                        <button
                          onClick={() => smoothScroll(tutorial.id)}
                          className={classNames(
                            selectedTab === tutorial.id
                              ? 'bg-gray-50 text-blue-600'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              selectedTab === tutorial.id
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {tutorial.initial}
                          </span>
                          <span className="truncate">{tutorial.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Dashboard Guide</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {api.map((apiTab) => (
                      <li key={apiTab.name}>
                        <Link
                          href={`/docs/${apiTab.tab}`}
                          className={classNames(
                            selectedTab === apiTab.tab
                              ? 'bg-gray-50 text-blue-600'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span
                            className={classNames(
                              selectedTab === apiTab.tab
                                ? 'text-blue-600 border-blue-600'
                                : 'text-gray-400 border-gray-200 group-hover:border-blue-600 group-hover:text-blue-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                            )}
                          >
                            {apiTab.initial}
                          </span>
                          <span className="truncate">{apiTab.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <Link
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <div className="h-6 w-6">
                        <BsFillFilePersonFill style={{height: "100%", width: "auto"}}/>
                    </div>
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{props.username}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
          <Link href="#">
            <span className="sr-only">Your profile</span>
          </Link>
        </div>
      </div>
    </>
  )
}
