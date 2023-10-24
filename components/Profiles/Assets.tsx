import styled from "styled-components";
import Title from "../Common/Title";
import dynamic from "next/dynamic";
import ColorfulText from "../Common/ColorfulText";
import { BsFillPencilFill, BsFolderSymlinkFill, BsFillLaptopFill, BsYoutube, BsFolder, BsTrash } from "react-icons/bs";
import { Fragment, Key, use, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import api from "@/pages/api";
import { BlueLoader } from "../Common/Loaders";
import { useRouter } from "next/router";
const AddFolder = dynamic(() => import("../Modals/AddingModals/AddFolder"));
const AddWrittenContent = dynamic(() => import("../Modals/AddingModals/AddWrittenContent"));
const FilesNumberLimit = dynamic(() => import("../Modals/LimitModals/FilesNumberLimit"));
const AddDocument = dynamic(() => import("../Modals/AddingModals/AddDocument"));
const AddAudio = dynamic(() => import("../Modals/AddingModals/AddAudio"));
const FilesSpaceLimit = dynamic(() => import("../Modals/LimitModals/FilesSpaceLimit"));
import { selectedProfileState } from "@/store/selectedProfileSlice";
import { setSelectedFolder } from "@/store/openedFolderSlice";
import { HiPlusSm } from "react-icons/hi";
import { Menu, Transition } from '@headlessui/react'
import { SlOptionsVertical } from "react-icons/sl";
import DeleteFolderModal from "../Modals/DeletingModals/DeleteFolderModal";
import folderIcon from "../../public/images/folderIcon.webp";
import fileIcon from "../../public/images/fileIcon.png";
import DeleteAsset from "../Modals/DeletingModals/DeleteDocModal";
import SortButton from "../Common/SortButton";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import EditFolder from "../Modals/AddingModals/EditFolder";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  interface Document {
    _id: string,
    owner: any,
    title: string,
    category: string,
    timestamp: string,
    ownerEmail: string,
    vectorId: string,
    isDocument?: boolean,
    normalizedTimestamp?: string
}

interface Folder {
    _id: string,
    owner: any,
    title: string,
    ownerEmail: string,
    category: string,
    documents: Document[],
    updatedAt: string,
    parentFolder: Folder | null,
    isSubfolder?: boolean,
    normalizedTimestamp?: string
}

  type CombinedItemType = Document | Folder;
const Assets = () => {

    const [openDocumentLimit, setOpenDocumentLimit] = useState(false);
    const [openNewFolder, setOpenNewFolder] = useState(false);
    const [openSpaceLimit, setOpenSpaceLimit] = useState(false);
    const [addAudio, setAddAudio] = useState(false);
    const [addDocument, setAddDocument] = useState("");
    const [openWriteContent, setOpenWriteContent] = useState(false);
    const [openDeleteFolder, setOpenDeleteFolder] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<Folder | undefined>(undefined);
    const [mobile, setMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("Latest");
    const [filteredFolders, setFilteredFolders] = useState<Array<Folder>>([]);
    const [folders, setFolders] = useState<Array<Folder>>([]);
    const [loading, setLoading] = useState(true);
    const [parentFolder, setParentFolder] = useState<Folder | undefined>(undefined);
    const [documents, setDocuments] = useState<Document[]>([]); 
    const [itemToDelete, setItemToDelete] = useState<any>();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteAsset, setOpenDeleteAsset] = useState(false);
    const [chosenFolder, setChosenFolder] = useState<Folder | undefined>(undefined);
    const [profileId, setProfileId] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const fetchDocumentsAndFolders = async () => {
        try {
            setLoading(true);
            if (profileId) {
                const profileResponse = await api.get(`/getProfile/${profileId}`, { 
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                });
                setFolders(profileResponse.data.subfolders);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        setProfileId(localStorage.getItem("profile_id"));
    }, []);

    useEffect(() => {
        dispatch(setSelectedFolder({documents: []}))
        if(window.innerWidth <= 1023){
          setMobile(true);
        }
        fetchDocumentsAndFolders();
      }, [profileId]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredFolders(folders);
            return;
        } else {
            const result = folders.filter((folder: any) =>
            folder.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFolders(result);
        }
    }, [searchTerm, folders]);

    useEffect(() => {
        if (folders) {
          sortFolders(folders, sortType);
        }
    }, [folders, sortType]);

    const editFolder = (folder: any) => {
        setChosenFolder(folder);
        setOpenEditModal(true);
    }

    const openDeleteModal = (item: any) => {
        setItemToDelete(item);
        setOpenDeleteAsset(true);
    }

    const handleDeleteItem = () => {
        if (itemToDelete) {
            if (itemToDelete.vectorId) {
                setDocuments((prevDocuments) =>
                    prevDocuments.filter((doc) => doc.vectorId !== itemToDelete.vectorId)
                );
            } else if (itemToDelete._id) {
                setFolders((prevSubfolders) =>
                    prevSubfolders.filter((folder) => folder._id !== itemToDelete._id)
                );
            }
        }
    };
    
    const openDeleteFolderPopup = (folder: any) => {
        setFolderToDelete(folder);
        setOpenDeleteFolder(true);
    }

    const handleDocumentsLimit = () => {
        setAddDocument("");
        setAddAudio(false);
        setOpenWriteContent(false);
        setOpenDocumentLimit(true);
    };

    const handleSpaceLimit = () => {
        setAddDocument("");
        setAddAudio(false);
        setOpenWriteContent(false);
        setOpenSpaceLimit(true);
    };

    const handleDeleteFolder = () => {
        if (folderToDelete) {
            setFolders((prevFolders: Folder[]) =>
                prevFolders.filter((folder) => folder._id !== folderToDelete._id)
            );
            
        }
    };

    const handleItemClick = (item: any) => {
        if ('isSubfolder' in item) {
            dispatch(setSelectedFolder(item))
            router.push(`/assets`);
        }
    }

      
    const renderItems = (): JSX.Element[] | null => {
        if (!profileId) {
            return null;
        }
    
        const combinedItems: CombinedItemType[] = [
            ...documents.map(doc => ({...doc, isDocument: true, normalizedTimestamp: doc.timestamp})), 
            ...folders.map(folder => ({...folder, isSubfolder: true, normalizedTimestamp: folder.updatedAt}))
        ];
    
        combinedItems.sort((a, b) => new Date(b.normalizedTimestamp!).getTime() - new Date(a.normalizedTimestamp!).getTime());
        return combinedItems.map((item, idx) => {
            return (
                <tr key={'isDocument' in item ? item.vectorId : item._id} onClick={() => handleItemClick(item)} className={classNames('isDocument' in item ? "" : "hover:bg-slate-50 cursor-pointer", "")}>
                    <td className=" py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {'isDocument' in item ? <Image src={fileIcon} alt="folder-icon" className="w-7"/> : <Image src={folderIcon} alt="folder-icon" className="w-8"/>}
                    </td>
                    <td className="lg:w-48 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {item.title}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell gap-2">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full border-2 border-white bg-slate-200 w-8 h-8 flex justify-center items-center shadow-sm relative -ml-3">
                                <p className="font-medium text-white">{item.owner.name.substring(0, 1)}</p>
                            </div>
                            <p className="font-medium">{item.owner.name}</p>
                        </div>
                    </td>
                    <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6" onClick={(e) => e.stopPropagation()}>
                    {'isDocument' in item ?
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
                        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={() => openDeleteModal(item)}
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
                        :
                        <>
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
                            <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                    onClick={() => editFolder(item)}
                                        className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group w-full flex items-center px-4 py-2 text-sm'
                                        )}
                                    >
                                        <PencilSquareIcon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                        />
                                        Rename
                                    </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                    <button
                                        onClick={() => openDeleteFolderPopup(item)}
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
                    </>
                    }
                    </td>
                </tr>
            );
        });
    }
    
    
  function sortFolders(folders: Folder[], sortType: string) {
    if (sortType === 'A-Z') {
        setFilteredFolders([...folders].sort((a, b) => a.title.localeCompare(b.title)));
    } else {
      setFilteredFolders([...folders].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    }
  }
  

    return (
        <MainContainer>
            {openNewFolder && <AddFolder onClose={() => setOpenNewFolder(false)} setFolders={setFolders} folderLimit={() => console.log("")} folders={folders} parentFolder={undefined}/>}
            {openDeleteFolder && <DeleteFolderModal onClose={() => setOpenDeleteFolder(false)} folder={folderToDelete} deleteFolderState={handleDeleteFolder} />}
            {openDeleteAsset && <DeleteAsset onClose={() => setOpenDeleteAsset(false)} assetType="document" document={itemToDelete} deleteDocumentState={handleDeleteItem}/> }
            {addDocument && <AddDocument onClose={() => setAddDocument("")} setDocuments={setDocuments} documentType={addDocument} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={folders} setFolders={setFolders}/>}
            {addAudio && <AddAudio onClose={() => setAddAudio(false)} setDocuments={setDocuments} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={folders} setFolders={setFolders} />}
            {openWriteContent && <AddWrittenContent onClose={() => setOpenWriteContent(false)} setDocuments={setDocuments} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={folders} setFolders={setFolders}/>}
            {openDocumentLimit && <FilesNumberLimit onClose={() => setOpenDocumentLimit(false)}/>}
            {openEditModal && <EditFolder folder={chosenFolder} onClose={() => setOpenEditModal(false)} onSuccess={() => fetchDocumentsAndFolders()}/>}
            {openSpaceLimit && <FilesSpaceLimit onClose={() => setOpenSpaceLimit(false)}/>}
            <ContentContainer>
            <UploadOptionsContainer>
            <Option id="upload-write" onClick={() => setOpenWriteContent(true)}>
                <OptionIcon><BsFillPencilFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                <OptionTitle>Write content</OptionTitle>
                <OptionDescription>Write or copy paste content for AI to learn</OptionDescription>
             </Option>
            <Option id="upload-files" onClick={() => setAddDocument("file")}>
                <OptionIcon><BsFolderSymlinkFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                <OptionTitle>Upload files</OptionTitle>
                <OptionDescription>Upload TXT, DOCX, PPTX, CSV or PDF files for AI to learn from</OptionDescription>
                </Option>
            <Option id="upload-website" onClick={() => setAddDocument("website")}>
                <OptionIcon><BsFillLaptopFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                    <OptionTitle>Scrape a website</OptionTitle>
                    <OptionDescription>Scrape content from a web page for AI to learn from</OptionDescription>
            </Option>
            <Option id="upload-audio" onClick={() => setAddAudio(true)}>
                <OptionIcon><BsYoutube style={{width: "100%", height: "auto"}} /></OptionIcon>
                <OptionTitle>Upload YouTube video</OptionTitle>
                <OptionDescription>Upload a YouTube video for AI to learn from</OptionDescription>
            </Option>
            </UploadOptionsContainer>
            </ContentContainer>
            <SubheaderContainer>
                <div>
                    <Subtitle>Folders</Subtitle>
                </div>
                <div className="flex gap-4">
                <input 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{boxShadow: "inset -1px -1px 7px rgba(15, 27, 40, 0.1), inset 1px 1px 5px rgba(15, 27, 40, 0.1)"}} 
                    placeholder="search..." 
                    className="rounded-xl text-black pl-3 font-normal outline-none py-1"
                />
                <AddBtn onClick={() => setOpenNewFolder(true)}>
                    <HiPlusSm style={{ width: "auto", height: "60%" }} />
                    <ButtonText>New folder</ButtonText>
                </AddBtn>
                </div>
            </SubheaderContainer>
            <div className="pb-20 lg:pb-8 w-full">
            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div style={{boxShadow: "0px 0px 7px rgba(15, 27, 40, 0.12)"}} className="rounded-2xl">
                    <table className="w-full divide-y divide-gray-300">
                    <thead className="border-b-2 border-gray-50">
                        <tr>
                            <th scope="col" className="py-2.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            </th>
                            <th scope="col" className="hidden lg:table-cell px-3 py-2.5 text-left text-sm font-semibold text-gray-900">
                            Title
                            </th>
                            <th scope="col" className="hidden px-3 py-2.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Created by
                            </th>
                            <th scope="col" className="hidden absolute lg:flex relative lg:w-full py-2.5 gap-4 lg:pl-3 lg:pr-4 justify-between lg:justify-end">
                                <SortButton setSortType={setSortType} sortType={sortType} />
                            </th>
                        </tr>
                        </thead>
                        {filteredFolders.length > 0 &&
                        renderItems()
                        }
                    </table>
                    {folders.length === 0 &&
                        <>
                        {loading ?
                            <div className="flex justify-center items-center w-full h-36">
                                <BlueLoader />
                            </div>
                            :
                            <div className="flex justify-center items-center w-full h-36 text-slate-700 text-center lg:text-base">
                                You don&apos;t have any folders yet. <br /> Upload some resources to create one!
                            </div>
                        }
                        </>
                    }
                    {(folders.length > 0 && filteredFolders.length === 0) &&
                     <div className="flex justify-center items-center w-full h-36 text-slate-700 text-xl">
                        No folder matches your criteria
                    </div>
                    }
                    </div>
                </div>
                </div>
            </div>
            </div>
        </MainContainer>
    )

}


export default Assets;

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 2px solid #F6F6FB;
    padding: 1.5rem 2.5rem 1.5em 2.5rem;
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const Option = styled.div`
    width: calc(50% - 0.5rem);
    border: solid 3px transparent;
    border-radius: 25px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    padding: 1.5rem 1.7rem 1.5rem 1.7rem;
    margin-bottom: 1rem;
    color: black;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
        width: 100%;
    }
`


const OptionIcon = styled.div`
    width: 1.75rem;
    margin-bottom: 0.5rem;
`

const OptionTitle = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
`

const OptionDescription = styled.div`
    width: 90%;
    font-size: 0.85rem;
    font-weight: 500;
`

const UploadOptionsContainer = styled.div`
    margin-top: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const ContentContainer = styled.div`
    width: 100%;
    border-radius: 25px;

`

const Subtitle = styled.h2`
    font-weight: 700;
    font-size: 1.4rem;
    color: black;
    display: flex;
    align-items: center;
`

const SubheaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0 0rem 0;
`

const AddBtn = styled.button`
    width: 12rem;
    height: 2.75rem;
    font-size: 1rem;
    font-weight: 500;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
        width: 11rem;
    }
`

const ButtonText = styled.p`
    margin-left: 0.7vw;
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