import styled from "styled-components"
import FoldersDropdown from "../forms/FolderDropdown";
import { useEffect, useState, Fragment } from "react";
import { BsFillArchiveFill, BsPencil, BsPencilFill, BsPersonFillAdd, BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import api from "@/pages/api";
import documentIcon from "../../public/images/document-icon.png";
import Image from "next/image";
import { BlueLoader } from "../Common/Loaders";
import Centered from "../Centered";
import AddAssistantModal from "../Modals/AddingModals/AddAssistantModal";
import { Menu, Transition } from '@headlessui/react';
import { SlOptionsVertical } from "react-icons/sl";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


const FirstPage = (props: {nextPage: any, openModal: any}) => {

    const [openAddAssistant, setOpenAddAssistant] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [savedContent, setSavedContent] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        if(window.innerWidth <= 1023){
          setMobile(true);
        }
        const token = localStorage.getItem("token");
        const fetchSavedContent = async () => {
          setLoading(true);
          try {
            const fetchedContent = await api.get(`/getUserSeoContent`, {
              headers: {
                authorization: token,
              },
            });
            setSavedContent(fetchedContent.data);
            setLoading(false);
          } catch (e) {
            console.log(e)
          }
        }
        fetchSavedContent();
      }, []);
    
      const handleOpenDocument = (id: string) => {
        router.push(`/copywriting?contentId=${id}`);
        props.nextPage();
      }

      const handleDeleteDocument = async (id: string) => {
        const token = localStorage.getItem("token");
        setLoading(true)
        try {
          await api.delete(`/deleteSeoContent/${id}`, {
            headers: {
              authorization: token,
            },
          });
          const documentContent = savedContent.filter((content: { _id: string; }) => content._id !== id);
          setSavedContent(documentContent);
          setLoading(false);
        } catch (e) {
          console.log(e)
        }
      }

      const renderContent = () => {
        const renderedContent = savedContent.map((content, index) => {
                return (
                    <tr key={content._id} onClick={() => handleOpenDocument(content._id)} >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Image src={documentIcon} className="flex-none w-8 h-8" alt={"icon"} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-base text-slate-700">{content.title}</td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-base text-slate-700 lg:table-cell">{content.timestamp}</td>
                    <td className="hidden whitespace-nowrap px-3 py-4 text-base text-slate-700 lg:table-cell">{content.savedBy}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleOpenDocument(content._id)} className="text-blue-600 hover:text-blue-900 font-semibold">
                        Open
                        </button>
                    </td>
                    <td onClick={(e) => e.stopPropagation()} className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                        <Menu.Button className="inline-flex w-full justify-center text-sm font-semibold text-gray-900 focus:outline-none">
                            <OptionsIcon>
                            <SlOptionsVertical style={{ color: "black", width: "100%" }} />
                            </OptionsIcon>
                        </Menu.Button>
                        </div>

                        <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                        <Menu.Items className="absolute right-0 z-20 mt-2 py-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={() => handleDeleteDocument(content._id)}
                                    className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'group w-full flex items-center px-4 py-2 text-sm'
                                    )}
                                >
                                    <BsTrash className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    Delete
                                </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                        </Transition>
                    </Menu>
                    </td>
                    </tr>
                )
        })
        return (
            <tbody className="divide-y divide-gray-200 bg-white">
                {renderedContent}
            </tbody>
        )
      }
      
    return (
        <PageContainer>
            {openAddAssistant && <AddAssistantModal onClose={() => setOpenAddAssistant(false)} setAssistants={console.log("")} assistantToEdit={undefined} openNewFolder={() => router.push("/assets")} category="copywriting"/>}
            <Header>
            <div>
            <PageTitle>Copywriter AI</PageTitle>
            <PageDescription>Unleash the potential of AI in copywriting.</PageDescription>
            </div>
            <ActionContaienr>
                <ActionBtn onClick={() => router.push("/assets")}>
                <BsFillArchiveFill style={{width: "auto", height: "35%"}}/>
                </ActionBtn>
                <WriteBtn onClick={() => props.openModal()}>
                    <BsPencilFill style={{width: "auto", height: "35%"}}/>
                    <BtnText>New content</BtnText>
                </WriteBtn>
            </ActionContaienr>
            </Header>
            <Centered>
            <div style={{width: "100%"}}>
            <div className="mt-6 lg:mt-12 flow-root">
                <div className="-mx-4 -my-2 overflow-visible sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-visible shadow ring-1 ring-black ring-opacity-5 sm:rounded-2xl">
                    {loading ?
                      <div className="flex justify-center items-center w-full h-64">
                          <BlueLoader />
                      </div>
                    :
                    <>
                    <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Title
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Last updated
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Email
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Open</span>
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        {savedContent.length > 0 &&
                        renderContent()
                        }
                    </table>
                    {savedContent.length === 0 &&
                        <>
                            <div className="flex justify-center items-center w-full h-64 text-slate-700 text-xl">
                                You have no content yet. Click on the button above to craft your first content with AI.
                            </div>
                        </>
                    }                    
                    </>
                    }
                    </div>
                </div>
                </div>
            </div>
            </div>
            </Centered>
        </PageContainer>
    )
}

export default FirstPage;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  border: 2px solid #EAEDF5;
 width: 100%;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  } 
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`

const PageTitle = styled.h1`
  color: black;
  font-size: 2.4rem;
  font-weight: 700;
  width: 100%;
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`
const PageDescription = styled.p`
  color: black;
  font-size: 1.2rem;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`
const MasonryColumn = styled.div`
  background-clip: padding-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  @media (max-width: 1023px) {
    display: flex;
    padding-left: 1.5rem;
    padding: 1rem 1rem 2rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    margin-top: 1rem;
    flex-wrap: wrap;
  }
`


const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
  }
`

const ActionBtn = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    margin-left: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border: 2px solid #EAEDF5;
    border-radius: 15px;
    box-shadow: 0px 2px 5px rgba(15, 27, 40, 0.1);
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0.75rem;
      margin-top: 1rem;
    }
`

const WriteBtn = styled.div`
    width: 15rem;
    height: 3.5rem;
    margin-left: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      margin-top: 1rem;
      flex: 1;
    }
`

const BtnText = styled.p`
    margin-left: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
`

const OptionsIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
`