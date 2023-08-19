import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import api from '@/pages/api';
import facebookIcon from "../../public/images/facebook-color.png";
import instagramIcon from "../../public/images/instagram-color.png";
import linkedinIcon from "../../public/images/linkedin-color.png";
import twitterIcon from "../../public/images/twitter-color.png";
import konspektIcon from "../../public/images/konspekt-icon.png";
import articleIcon from "../../public/images/article-icon.png";
import newsletterIcon from "../../public/images/newsletter-icon.png";
import documentIcon from "../../public/images/document-icon.png";
import emailIcon from "../../public/images/email-icon.png";
import amazonLogo from "../../public/images/amazon-logo.png";
import allegroLogo from "../../public/images/allegro-logo.png";
import googleLogo from "../../public/images/google-logo.png";
import { BlueLoader } from '../Common/Loaders';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DeleteDoc from '../Modals/DeletingModals/DeleteDocModal';
import { useSelector } from "react-redux";
import { selectedUserState } from "@/store/userSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
      
const getContentTypeIcon = (contentType: string) => {
  switch (contentType) {
    case "Facebook-post":
      return facebookIcon;
    case "Instagram-post":
      return instagramIcon;
    case "Twitter-post":
      return twitterIcon;
    case "LinkedIn-post":
      return linkedinIcon;
    case "google-ads":
      return googleLogo;
    case "newsletter":
      return newsletterIcon;
    case "email":
        return emailIcon;
    case "newsletter-conspect":
      return konspektIcon;
    case "article-conspect":
      return konspektIcon;
    case "article-section":
      return articleIcon;
    case "amazon":
      return amazonLogo;
    case "allegro":
      return allegroLogo;
    case "document":
      return documentIcon;
    default:
      return articleIcon;
  }
};

export default function SavedContentSidebar(props: {setOpen: any, open: boolean, setTemplate: any}) {

  const [savedContent, setSavedContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [contentToDelete, setContentToDelete] = useState("");
  const [mobile, setMobile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Templates")
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [campaignToDelete, setCampaignToDelete] = useState<any>("");
  const [openDeleteCampaign, setOpenDeleteCampaign] = useState(false);
  const user = useSelector(selectedUserState);

  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 1023) {
      setMobile(true);
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    const workspace = localStorage.getItem("workspace");
    const fetchSavedContent = async () => {
      setLoading(true);
      try {
        let fetchedUser = user;
        if (workspace && workspace !== "null" && workspace !== "undefined") {
          const {data} = await api.get(`/workspace-company/${workspace}`, {
            headers: {
              authorization: localStorage.getItem("token"),
            }
          });
          fetchedUser = data.company;
        }
        const fetchedCampaigns = await api.get("campaignsByOwner", {
          headers: {
            authorization: token
          }
        })
        const fetchedContent = await api.get(`/getUserSavedContent`, {
          headers: {
            authorization: token,
          },
        });
        setSavedContent(fetchedContent.data);
        setCampaigns(fetchedCampaigns.data);
        setLoading(false);
      } catch (e) {
        console.log(e)
      }
    }
    fetchSavedContent();
  }, [props.open])

  const handleOpenContent = (content: any) => {
    if (content.query) {
      props.setTemplate(content);
      router.push(`/marketing?page=${content.query}&type=${content.title.split(" ")[0]}&contentId=${content._id}`)
    } else {
      router.push(`/marketing?page=post&type=Facebook&contentId=${content._id}`)
    }
    props.setOpen();
  }

  const openDeleteContentModal = (content: any) => {
    setContentToDelete(content);
    setOpenDeleteContent(true);
  }

  const openDeleteCampaignModal = (campaign: any) => {
    setCampaignToDelete(campaign);
    setOpenDeleteCampaign(true);
  }

  const renderContent = () => {
    const renderedContent = savedContent.map((content) => {
      if (content.category !== "document") { // Only process items that are not documents
        return (
          <div key={"content-" + content.text.slice(0, 20)}>
          <div onClick={() => handleOpenContent(content)}>
          <div className="group cursor-pointer relative flex items-center px-5 py-6">
            <div className="-m-1 block flex-1 p-1">
              <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
              <div className="relative flex min-w-0 flex-1 items-center">
                {content.icon ?
                  <Image src={content.icon} width={20} height={20} className="flex-none w-10 h-10" alt={"icon"} />
                  :
                  <Image src={getContentTypeIcon(content.category)} className="flex-none w-10 h-10" alt={"icon"} />
                }
                <div className="ml-4 truncate">
                  <p className="truncate text-md font-medium text-gray-900">{mobile ? content.text.slice(0, 20) : content.text.slice(0, 40)}...</p>
                  <p className="truncate text-smtext-gray-500">{content.timestamp}</p>
                </div>
              </div>
            </div>
            <Menu onClick={(e) => e.stopPropagation()} as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
              <Menu.Button  onClick={(e) => e.stopPropagation()} className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="sr-only">Open options menu</span>
                <span className="flex h-full w-full items-center justify-center rounded-full">
                  <EllipsisVerticalIcon
                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => openDeleteContentModal(content)}
                          className={classNames(
                            active ? 'bg-red-50 text-red-700' : 'text-red-500',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Delete
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          </div>
          </div>
        )
      }
    })

    return (
      <div>
        {renderedContent}
      </div>
    )
}


const renderCampaigns = () => {
  const renderedCampaigns = campaigns.map((campaign) => {
      return (
        <div key={"campaign-" + campaign.title.slice(0, 20)}>
        <div onClick={() => router.push(`/campaign/${campaign._id}`)}>
        <div className="group cursor-pointer relative flex items-center px-5 py-6">
          <div className="-m-1 block flex-1 p-1">
            <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
            <div className="relative flex min-w-0 flex-1 items-center">
              <Image src={getContentTypeIcon("document")} className="flex-none w-10 h-10" alt={"icon"} />
              <div className="ml-4 truncate">
                <p className="truncate text-md font-medium text-gray-900">{mobile ? campaign.title.slice(0, 20) : campaign.title.slice(0, 40)}</p>
              </div>
            </div>
          </div>
          <Menu onClick={(e) => e.stopPropagation()} as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
            <Menu.Button  onClick={(e) => e.stopPropagation()} className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="sr-only">Open options menu</span>
              <span className="flex h-full w-full items-center justify-center rounded-full">
                <EllipsisVerticalIcon
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => openDeleteCampaignModal(campaign)}
                        className={classNames(
                          active ? 'bg-red-50 text-red-700' : 'text-red-500',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        Delete
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        </div>
        </div>
      )
  })

  return (
    <div>
      {renderedCampaigns}
    </div>
  )
}




  
  return (
    <>
    {openDeleteContent && <DeleteDoc onClose={() => setOpenDeleteContent(false)} assetType="saved" document={contentToDelete} deleteDocumentState={() => props.setOpen} />}
    {openDeleteCampaign && <DeleteDoc onClose={() => setOpenDeleteCampaign(false)} assetType="campaign" document={campaignToDelete} deleteDocumentState={() => props.setOpen} />}
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="z-20" onClose={props.setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 z-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <div style={{boxShadow: "2px 2px 10px rgba(15, 27, 40, 0.25)"}} className="flex h-full flex-col overflow-y-scroll bg-white">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">Saved content</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500"
                            onClick={props.setOpen}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200">
                      <div className="px-6">
                        <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
                            <div
                              onClick={() => setSelectedTab("Templates")}
                              className={classNames(
                                selectedTab === "Templates"
                                  ? 'border-blue-500 text-blue-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 px-1 pb-4 cursor-pointer text-sm font-medium'
                              )}
                            >
                              Templates
                            </div>
                            <div
                              onClick={() => setSelectedTab("Campaigns")}
                              className={classNames(
                                selectedTab === "Campaigns"
                                  ? 'border-blue-500 text-blue-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 cursor-pointer px-1 pb-4 text-sm font-medium'
                              )}
                            >
                              Campaigns
                            </div>
                        </nav>
                      </div>
                    </div>
                    <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                      {loading ?
                      <div className='mt-16 w-full flex justify-center'><BlueLoader /></div>
                      :
                      <>
                        {selectedTab === "Campaigns" ?
                        renderCampaigns()
                        :
                        renderContent()
                        }
                      </>
                      }
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}
