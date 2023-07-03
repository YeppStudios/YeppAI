import styled from "styled-components";
import backIcon from "../../public/images/backArrow.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { BsFillGearFill, BsTrash, BsYoutube } from "react-icons/bs";
import { BsFolderSymlinkFill, BsFillPencilFill, BsFillLaptopFill } from "react-icons/bs";
import { BlueLoader } from "../Common/Loaders";
import Centered from "../Centered";
import { selectFolderState, setSelectedFolder } from "../../store/openedFolderSlice";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector, useDispatch } from "react-redux";
import AddDocument from "../Modals/AddingModals/AddDocument";
import DeleteAsset from "../Modals/DeletingModals/DeleteDocModal";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import AddWrittenContent from "../Modals/AddingModals/AddWrittenContent";
import AddAudio from "../Modals/AddingModals/AddAudio";
import FilesNumberLimit from "../Modals/LimitModals/FilesNumberLimit";
import FilesSpaceLimit from "../Modals/LimitModals/FilesSpaceLimit";
import { useRouter } from "next/router";
import SecondOnboardingStep from "../Modals/OnboardingModals/SecondOnboardingStep";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
interface Document {
    owner: string,
    title: string,
    category: string,
    timestamp: string,
    ownerEmail: string,
    vectorId: string
}

interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[],
    updatedAt: string
}

const DataPage = (props: {back: any, openedFolder: Folder | undefined, folders: Folder[], setFolders: any}) => {

    const [loading, setLoading] = useState(false);
    const selectedFolder = useSelector(selectFolderState);
    const [addDocument, setAddDocument] = useState("");
    const [openDeleteAsset, setOpenDeleteAsset] = useState(false);
    const [openWriteContent, setOpenWriteContent] = useState(false);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [documentToDelete, setDocumentToDelete] = useState<Document>();
    const [openDocumentLimit, setOpenDocumentLimit] = useState(false);
    const [openSpaceLimit, setOpenSpaceLimit] = useState(false);
    const [addAudio, setAddAudio] = useState(false);
    const [openOnboarding, setOpenOnboarding] = useState(false);
    const plan = useSelector(selectedPlanState);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const folder = await api.get(`/getFolder/${selectedFolder._id}`, { 
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            setDocuments(folder.data.documents);
            let onboardingSetp = localStorage.getItem("onboarding_step");
            if (onboardingSetp === "2" && folder.data.documents.length === 1) {
                setOpenOnboarding(true);
                localStorage.setItem("onboarding_step", "");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, [selectedFolder]);

    const openDeleteModal = (document: Document) => {
        setDocumentToDelete(document);
        setOpenDeleteAsset(true);
    }

    const handleDeleteDocument = () => {
        if (documentToDelete) {
          setDocuments((prevDocuments) =>
            prevDocuments.filter((doc) => doc.vectorId !== documentToDelete.vectorId)
          );
        }
      };

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

      
    const renderDocuments = () => {
        let renderedDocuments;
        if (selectedFolder.title !== "" ) {
            if (documents.length !== 0) {
                renderedDocuments = documents.map((document, documentIdx) => {

                    const date = new Date(document.timestamp);
                    const formattedDate = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${(date.getMonth() + 1) < 10 ? "0" : ""}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
        
                    return (
                        <tr key={document.title} className={documentIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                            <td className="max-w-xs lg:max-w-sm overflow-hidden lg:w-64 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {document.title}
                            </td>
                            <td className="hidden py-4 text-sm text-gray-500 lg:table-cell"><div className="py-1.5 px-2 text-green-600 bg-green-100 w-28 rounded-xl flex justify-center">Zapamiętany</div></td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{formattedDate}</td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{document.ownerEmail}</td>
                            <td className="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button onClick={() => openDeleteModal(document)} className="text-red-400 hover:text-red-700">
                                Usuń<span className="sr-only">, {document.title}</span>
                            </button>
                            </td>
                        </tr>
                    )
                });
            }
        }


        return (
            <tbody className="bg-white">
                {renderedDocuments}
            </tbody>
        )
    }

    return (
        <MainContainer>
            {openDeleteAsset && <DeleteAsset onClose={() => setOpenDeleteAsset(false)} assetType="document" document={documentToDelete} deleteDocumentState={handleDeleteDocument}/> }
            {addDocument && <AddDocument onClose={() => setAddDocument("")} setDocuments={setDocuments} documentType={addDocument} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={props.folders} setFolders={props.setFolders}/>}
            {addAudio && <AddAudio onClose={() => setAddAudio(false)} setDocuments={setDocuments} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={props.folders} setFolders={props.setFolders} />}
            {openWriteContent && <AddWrittenContent onClose={() => setOpenWriteContent(false)} setDocuments={setDocuments} documentsLimit={handleDocumentsLimit} spaceLimit={handleSpaceLimit} folderLimit={() => console.log("")} folders={props.folders} setFolders={props.setFolders}/>}
            {openDocumentLimit && <FilesNumberLimit onClose={() => setOpenDocumentLimit(false)}/>}
            {openSpaceLimit && <FilesSpaceLimit onClose={() => setOpenSpaceLimit(false)}/>}
            {openOnboarding && <SecondOnboardingStep onClose={() => setOpenOnboarding(false)}/>}
                <Header>   
                <BackBtn onClick={props.back}>
                    <BackBtnIcon>
                        <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                    </BackBtnIcon> 
                    <BackBtnText>Back</BackBtnText>
                </BackBtn>
                <div style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}}>
                {selectedFolder &&
                    <HeaderTitle>{selectedFolder.title}</HeaderTitle>
                }
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                    <Menu.Button className="inline-flex w-10 justify-center text-sm font-semibold text-gray-900 focus:outline-none">
                        <OptionsIcon>
                            <BsFillGearFill style={{ color: "black", width: "100%" }} />
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
                        {/* <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                                )}
                            >
                                <PencilSquareIcon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                                Edytuj
                            </a>
                            )}
                        </Menu.Item> */}
                        <Menu.Item>
                            {({ active }) => (
                            <a
                                href="#"
                                className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'group flex items-center px-4 py-2 text-sm'
                                )}
                            >
                                <BsTrash className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                Delete
                            </a>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                    </Transition>
                </Menu>
                </div>
                </Header>
                <ContentContainer>
                    <Subtitle>Add assets to the folder</Subtitle>
                    <SectionDescription>Upload and group the assets for AI to learn from.</SectionDescription>
                    <UploadOptionsContainer>
                    <Option id="upload-write" onClick={() => setOpenWriteContent(true)}>
                        <OptionIcon><BsFillPencilFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                        <OptionTitle>Write content</OptionTitle>
                        <OptionDescription>Write or copy paste content</OptionDescription>
                    </Option>
                    {plan &&
                        <>
                        <Option id="upload-file" onClick={() => setAddDocument("file")}>
                            <OptionIcon><BsFolderSymlinkFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                            <OptionTitle>Upload a file</OptionTitle>
                            <OptionDescription>Upload TXT, DOCX, PPTX or PDF file</OptionDescription>
                        </Option>
                        <Option id="upload-website" onClick={() => setAddDocument("website")}>
                            <OptionIcon><BsFillLaptopFill style={{width: "100%", height: "auto"}} /></OptionIcon>
                            <OptionTitle>Scrape a website</OptionTitle>
                            <OptionDescription>Scrape content from a web page</OptionDescription>
                        </Option>
                        <Option id="upload-audio" onClick={() => setAddAudio(true)}>
                            <OptionIcon><BsYoutube style={{width: "100%", height: "auto"}} /></OptionIcon>
                            <OptionTitle>Upload YT Video</OptionTitle>
                            <OptionDescription>Upload a clip for AI to watch</OptionDescription>
                        </Option>
                        </>
                    }
                </UploadOptionsContainer>
                <Container>
                    <SavedDocsHeader>
                    <div>
                    <Subtitle>Saved assets</Subtitle>
                    <SectionDescription>Here you can find all your uploaded assets.</SectionDescription>
                    </div>
                    </SavedDocsHeader>
                    <div className="mt-8 flow-root pb-20 lg:pb-8">
                        {loading ?
                            <Centered>
                                <div className="mt-4"><BlueLoader /></div>
                            </Centered>
                        :
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-2xl">
                            {documents.length > 0 ?
                             <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-slate-50">
                                 <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                        Uploaded on
                                    </th>
                                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                        Uploaded by
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    </th>
                                 </tr>
                             </thead>
                             {renderDocuments()}
                             </table>                    
                            :
                            <NoDocsContainer>
                                You don&apos;t have any documents yet. Upload some!
                            </NoDocsContainer>                          
                            }
                            </div>
                        </div>
                        </div>
                        }
                    </div>
                </Container>
                </ContentContainer>
        </MainContainer>
    )

}


export default DataPage;


const MainContainer = styled.div`
    width: 100%;
    height: auto;
    overflow-y: scroll;
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13), -7px -7px 10px #FAFBFF;
    border: 1.5px solid #EAEDF5;
    padding: 1.5rem 20em 1.5rem 2.5rem;
    @media (max-width: 1023px) {
        padding: 0;
    }
`

const BackBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`
const BackBtnIcon = styled.div`
    width: 0.6rem;
`

const BackBtnText = styled.p`
    color: black;
    font-weight: 500;
    margin-left: 0.7rem;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 0.75rem;
    justify-content: space-between;
    border-bottom: 2px solid #E5E8F0;
    @media (max-width: 1023px) {
        padding: 0.75rem 1rem 0.75rem 1.5rem;
    }
`

const HeaderTitle = styled.h2`
    font-size: 1.5rem;
    color: black;
    font-weight: 700;
`

const OptionsIcon = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    cursor: pointer;
    transition: all 0.4s ease;
`

const Subtitle = styled.h2`
    font-weight: 700;
    font-size: 1.25rem;
    color: black;
    display: flex;
    align-items: center;
    margin-top: 1.25rem;
`
const ContentContainer = styled.div`
    width: 100%;
    padding: 1rem;
`

const SectionDescription = styled.p`
    margin-top: 0.25rem;
    color: #4B5563;
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
    }
`

const UploadOptionsContainer = styled.div`
    margin-top: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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

const DisabledOption = styled.div`
    position: relative;
    width: calc(25% - 0.5rem);
    border: solid 3px #E5E8F0;
    border-radius: 25px;
    padding: 1.5rem 1.7rem 1.5rem 1.7rem;
    margin-bottom: 1rem;
    color: #E5E8F0;
    transition: all 0.4s ease;
    cursor: pointer;

    &:after {
        font-weight: 700;
        content: "+ Ulepsz Plan";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        color: transparent;
        background-image: linear-gradient(-70deg, #6578F8, #64B5FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        transition: all 0.4s ease;
    }
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
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
const Container = styled.div`
    margin-top: 2rem;
`

const SavedDocsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NoDocsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 4rem;
    color: #4B5563;
    text-align: center;
`