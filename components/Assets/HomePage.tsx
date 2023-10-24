import styled from "styled-components";
import Title from "../Common/Title";
import dynamic from "next/dynamic";
import ColorfulText from "../Common/ColorfulText";
import { BsFillPencilFill, BsFolderSymlinkFill, BsFillLaptopFill, BsYoutube, BsFolder, BsTrash } from "react-icons/bs";
import { Fragment, Key, use, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "@/pages/api";
import { BlueLoader } from "../Common/Loaders";
import { useRouter } from "next/router";
const AddFolder = dynamic(() => import("../Modals/AddingModals/AddFolder"));
const AddWrittenContent = dynamic(() => import("../Modals/AddingModals/AddWrittenContent"));
const FilesNumberLimit = dynamic(() => import("../Modals/LimitModals/FilesNumberLimit"));
const AddDocument = dynamic(() => import("../Modals/AddingModals/AddDocument"));
const AddAudio = dynamic(() => import("../Modals/AddingModals/AddAudio"));
const FilesSpaceLimit = dynamic(() => import("../Modals/LimitModals/FilesSpaceLimit"));
import Chart from "../Common/Chart";
import { selectedUserState } from "@/store/userSlice";
import { selectedPlanState } from "@/store/planSlice";
import { setSelectedFolder } from "@/store/openedFolderSlice";
import { HiPlusSm } from "react-icons/hi";
import { Menu, Transition } from '@headlessui/react'
import { SlOptionsVertical } from "react-icons/sl";
import DeleteFolderModal from "../Modals/DeletingModals/DeleteFolderModal";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";
import FoldersNumberLimit from "../Modals/LimitModals/FoldersNumberLimit";
import SortButton from "../Common/SortButton";
import Image from "next/image";
import folderIcon from "../../public/images/folderIcon.webp";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

interface Assistant {
    _id: string;
    name: string;
    documents: Array<any>;
    prompt: string;
    description: string,
    image: string,
    folders: Array<any>,
    category: string,
    companyName: string,
    aboutCompany: string,
    exampleContent: string,
}

interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[],
    updatedAt: string,
    _id: string,
  }

const Home = (props: {folders: any, setFolders: any, loading: boolean}) => {

    const user = useSelector(selectedUserState);
    const plan = useSelector(selectedPlanState);
    const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const [assistants, setAssistants] = useState<Array<Assistant>>([]);
    const [openDocumentLimit, setOpenDocumentLimit] = useState(false);
    const [openNewFolder, setOpenNewFolder] = useState(false);
    const [openSpaceLimit, setOpenSpaceLimit] = useState(false);
    const [documentsCount, setDocumentsCount] = useState(0);
    const [assistantsCount, setAssistantsCount] = useState(0);
    const [openFolderLimit, setOpenFolderLimit] = useState(false);
    const [createdFolders, setCreatedFolders] = useState(0);
    const [addAudio, setAddAudio] = useState(false);
    const [addDocument, setAddDocument] = useState("");
    const [openWriteContent, setOpenWriteContent] = useState(false);
    const [openDeleteFolder, setOpenDeleteFolder] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<Folder | undefined>(undefined);
    const [uploadedBytes, setUploadedBytes] = useState(0);
    const [mobile, setMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("Latest");
    const [filteredFolders, setFilteredFolders] = useState(props.folders);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        if (user._id) {
            let userId = user._id;
    
            const fetchStats = async () => {
                if (workspaceCompany._id) { 
                    userId = workspaceCompany._id;
                } else {
                    userId = user._id;
                }
                const documentsResponse = await api.get(`/user/${userId}/uploadStats`, {
                    headers: {
                      authorization: token
                    }
                });
                setDocumentsCount(documentsResponse.data.documentCount);
                setUploadedBytes(documentsResponse.data.uploadedBytes);
                setCreatedFolders(documentsResponse.data.folderCount);
            }
            fetchStats();
        }

    }, [workspaceCompany, user, props.folders])

    useEffect(() => {
        if (props.folders) {
          sortFolders(props.folders, sortType);
        }
    }, [props.folders, sortType]);

    useEffect(() => {
        setAssistantsCount(assistants.length);
    }, [assistants])

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredFolders(props.folders);
            return;
        } else {
            const result = props.folders.filter((folder: any) =>
            folder.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setFilteredFolders(result);
        }
    }, [searchTerm, props.folders]);

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

    const handleFolderLimit = () => {
        setAddDocument("");
        setAddAudio(false);
        setOpenWriteContent(false);
        setOpenFolderLimit(true);
    };

    const openDeletePopup = (folder: Folder) => {
        setFolderToDelete(folder);
        setOpenDeleteFolder(true);
    }

    const handleDeleteFolder = () => {
        if (folderToDelete) {
          props.setFolders((prevFolder: any[]) =>
            prevFolder.filter((folder) => folder._id !== folderToDelete._id)
          );
        }
    };

  const renderFolders = () => {
    const renderedContent = filteredFolders.map((folder: any, idx: Key | null | undefined) => {
            let dateObject = new Date(folder.updatedAt);
            var options: Intl.DateTimeFormatOptions = { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              };
            const date = dateObject.toLocaleDateString("en-US", options);
    
            return (
                <tr key={idx}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <Image src={folderIcon} alt="folder-icon" className="w-8"/>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-base text-black">{folder.title}</td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-base text-black lg:table-cell">{date}</td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-base text-black lg:table-cell">{folder.ownerEmail}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-black text-sm font-medium sm:pr-6">
                <button onClick={() => dispatch(setSelectedFolder(folder))} className="mr-4 text-500 text-blue-500 hover:text-blue-800">Open folder</button>
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
                                onClick={() => openDeletePopup(folder)}
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
    
  function sortFolders(folders: Folder[], sortType: string) {
    if (sortType === 'A-Z') {
        setFilteredFolders([...folders].sort((a, b) => a.title.localeCompare(b.title)));
    } else {
      setFilteredFolders([...folders].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
    }
  }
  

    return (
        <MainContainer>
            {openNewFolder && <AddFolder onClose={() => setOpenNewFolder(false)} setFolders={props.setFolders} folderLimit={handleFolderLimit} folders={props.folders} parentFolder={null}/>}
            {addDocument && <AddDocument onClose={() => setAddDocument("")} setDocuments={console.log("")} setFolders={props.setFolders} folders={props.folders} documentType={addDocument} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={handleFolderLimit}/>}
            {addAudio && <AddAudio onClose={() => setAddAudio(false)} setDocuments={console.log("")} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folders={props.folders} setFolders={props.setFolders} folderLimit={handleFolderLimit}/>}
            {openWriteContent && <AddWrittenContent onClose={() => setOpenWriteContent(false)} setDocuments={console.log("")} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folders={props.folders} setFolders={props.setFolders} folderLimit={handleFolderLimit}/>}
            {openDocumentLimit && <FilesNumberLimit onClose={() => setOpenDocumentLimit(false)}/>}
            {openSpaceLimit && <FilesSpaceLimit onClose={() => setOpenSpaceLimit(false)}/>}
            {openFolderLimit && <FoldersNumberLimit onClose={() => setOpenFolderLimit(false)}/>}
            {openDeleteFolder && <DeleteFolderModal onClose={() => setOpenDeleteFolder(false)} folder={folderToDelete} deleteFolderState={handleDeleteFolder} />}
            <HeaderContainer>
                <div>
                    <Title fontSize={"2.4rem"} width={"auto"} textAlign={"left"} color={"black"} mobileFontSize={"2rem"} mobileTextAlign={"left"}>Your <ColorfulText>Assets</ColorfulText></Title>
                    <Description>Assets for AI to reference while generating content.</Description>
                </div>
                {plan._id &&
                <TopBtnsContainer>
                {(plan && user.name) && 
                <UsageContainer>
                <ChartContainer>
                    <Chart title="Folders" textInside={`${createdFolders} / ${plan.maxFolders}`}  data={[createdFolders, plan.maxFolders - createdFolders]} plan={plan}/>
                </ChartContainer>
                <UsageTextContainer>
                    <UsageTitle>Folders</UsageTitle>
                    {(plan._id === "6444d4394ab2cf9819e5b5f4" || plan._id === "64ad0d250e40385f299bceea" || plan._id === "647c3294ff40f15b5f6796bf") ? 
                    <Usage>{`${createdFolders} / ∞`}</Usage>
                    :
                    <Usage>{`${createdFolders} / ${plan.maxFiles}`}</Usage>
                    }
                </UsageTextContainer>
                </UsageContainer>
                }
                {(plan && user.name) && 
                <UsageContainer>
                <ChartContainer>
                    <Chart title="Assets" textInside={`${documentsCount} / ${plan.maxFiles}`}  data={[documentsCount, plan.maxFiles - documentsCount]} plan={plan}/>
                </ChartContainer>
                <UsageTextContainer>
                    <UsageTitle>Assets</UsageTitle>
                    {(plan._id === "6444d4394ab2cf9819e5b5f4" || plan._id === "64ad0d250e40385f299bceea" || plan._id === "647c3294ff40f15b5f6796bf") ? 
                    <Usage>{`${documentsCount} / ∞`}</Usage>
                    :
                    <Usage>{`${documentsCount} / ${plan.maxFiles}`}</Usage>
                    }
                </UsageTextContainer>
                </UsageContainer>
                }
                {(plan && user.name) && 
                <UsageContainer>
                <ChartContainer>
                    <Chart title="Uploaded MB" textInside={`${(uploadedBytes/(1024*1024)).toFixed(1)} / ${plan.maxUploadedBytes/(1024*1024)}`}  data={[user.uploadedBytes/(1024*1024), plan.maxUploadedBytes/(1024*1024) - user.uploadedBytes/(1024*1024)]} plan={plan}/>
                </ChartContainer>
                <UsageTextContainer>
                    <UsageTitle>Storage (MB)</UsageTitle>
                    {(plan._id === "6444d4394ab2cf9819e5b5f4" || plan._id === "64ad0d250e40385f299bceea" || plan._id === "647c3294ff40f15b5f6796bf") ? 
                    <Usage>{`${(uploadedBytes/(1024*1024)).toFixed(1)} / ∞`}</Usage>
                    :
                    <Usage>{`${(uploadedBytes/(1024*1024)).toFixed(1)} / ${plan.maxUploadedBytes/(1024*1024)}`}</Usage>
                    }
                </UsageTextContainer>
                </UsageContainer>
                }
                </TopBtnsContainer>
                }
            </HeaderContainer>
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
                    {!mobile && <SectionDescription>Folders with uploaded assets for AI to reference.</SectionDescription>}
                </div>
                <AddBtn onClick={() => setOpenNewFolder(true)}>
                    <HiPlusSm style={{ width: "auto", height: "60%" }} />
                    <ButtonText>New folder</ButtonText>
                </AddBtn>
            </SubheaderContainer>
            <div className="pb-20 lg:pb-8 w-full">
            <div className="mt-6 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="shadow ring-1 ring-black ring-opacity-5 rounded-2xl">
                    <table className="w-full divide-y divide-gray-300">
                    <thead className="">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            </th>
                            <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Title
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Created
                            </th>
                            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                            Created By
                            </th>
                            <th scope="col" className="hidden lg:flex relative lg:w-full py-3.5 gap-4 lg:pl-3 lg:pr-4 justify-between lg:justify-end">
                                <input 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    style={{boxShadow: "inset -1px -1px 8px rgba(15, 27, 40, 0.1), inset 1px 1px 5px rgba(15, 27, 40, 0.1)"}} 
                                    placeholder="search..." 
                                    className="rounded-xl border-2 border-gray-100 text-black pl-3 font-normal outline-none py-1"
                                />
                                <SortButton setSortType={setSortType} sortType={sortType} />
                            </th>
                        </tr>
                        </thead>
                        {filteredFolders.length > 0 &&
                        renderFolders()
                        }
                    </table>
                    {props.folders.length === 0 &&
                        <>
                        {props.loading ?
                            <div className="flex justify-center items-center w-full h-36">
                                <BlueLoader />
                            </div>
                            :
                            <div className="flex justify-center items-center w-full h-36 text-slate-700 text-center lg:text-xl">
                                You don&apos;t have any folders yet. Upload some resources to create one!
                            </div>
                        }
                        </>
                    }
                    {(props.folders.length > 0 && filteredFolders.length === 0) &&
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


export default Home;

const MainContainer = styled.div`
    width: 100%;
    height: auto;
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13), -7px -7px 10px #FAFBFF;
    border: 1.5px solid #EAEDF5;
    overflow-y: scroll;
    padding: 1.5rem 2.5rem 3.5em 2.5rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const Description = styled.p`
    font-weight: 500;
    font-size: 1.2rem;
    color: black;
    margin-top: 0.2rem;
    color: #4B5563;
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 2rem;
    @media (max-width: 1023px) {
        padding-bottom: 1rem;
    }
`

const TopBtnsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`


const ChartContainer = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    margin-left: 0.5rem;
    @media (max-width: 1023px) {
        width: 0rem;
        height: 3.5rem;
        margin-right: 0.5rem;
        margin-left: 0;
    }
`

const UsageContainer = styled.div`
    display: grid;
    grid-template-columns: 0.75fr 1.15fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    margin-left: 1.5rem;
    grid-auto-flow: row;
    grid-template-areas:
      ". .";
    align-items: center;
    justify-content: right;
    @media (max-width: 1023px) {
        margin-left: 0;
        grid-template-columns: 0fr 2fr;
    }
`
const UsageTextContainer = styled.div`
    margin-left: 0.75rem;
    @media (max-width: 1023px) {
        margin-left: 0;
        font-weight: 700;
    }
`

const UsageTitle = styled.p`
    font-size: 1rem;
    font-weight: 500; 
    color: black;
    @media (max-width: 1023px) {
        font-size: 1rem;
        margin-right: 1.5rem;
        margin-top: 1rem;
    }
`

const Usage = styled.p`
    color: black;
`

const Option = styled.div`
    width: calc(25% - 0.5rem);
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
    width: 2rem;
    margin-bottom: 1rem;
`

const OptionTitle = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
`

const OptionDescription = styled.div`
    width: 100%;
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

const SectionDescription = styled.p`
    margin-top: 0.25rem;
    color: #4B5563;
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`

const SubheaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0 0rem 0;
`

const AddBtn = styled.button`
    width: 14rem;
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