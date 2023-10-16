import { BsChevronDown, BsFolder, BsTrash } from "react-icons/bs";
import styled from "styled-components";
import { SlOptionsVertical } from "react-icons/sl";
import Centered from "../Centered";
import { HiPlusSm } from "react-icons/hi";
import { useEffect, useState } from "react";
import { BlueLoader, Loader } from "../Common/Loaders";
import AddFolder from "../Modals/AddingModals/AddFolder";
import { selectFolderState, setSelectedFolder } from "../../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  PencilSquareIcon,
} from '@heroicons/react/20/solid'
import FoldersNumberLimit from "../Modals/LimitModals/FoldersNumberLimit";
import DeleteFolderModal from "../Modals/DeletingModals/DeleteFolderModal";

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
  updatedAt: string,
  _id: string,
  parentFolder: any | null,
}

const FoldersSidebar = (props: {foldersLoading: boolean, folders: Array<Folder>, setFolders: any, lineage: Folder[]}) => {

    const [openNewFolder, setOpenNewFolder] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState<Folder | undefined>(undefined);
    const [openDeleteFolder, setOpenDeleteFolder] = useState(false);
    const [openFolderLimit, setOpenFolderLimit] = useState(false);
    const selectedFolder = useSelector(selectFolderState);

    const dispatch = useDispatch();

    const isFolderInLineage = (folder: Folder): boolean => {
      return props.lineage.some(f => f._id === folder._id);
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

    const handleFolderLimit = () => {
      setOpenFolderLimit(true);
    };
  
    return (
      <SidebarContainer>
        {openDeleteFolder && <DeleteFolderModal onClose={() => setOpenDeleteFolder(false)} folder={folderToDelete} deleteFolderState={handleDeleteFolder} />}
        {openNewFolder && <AddFolder onClose={() => setOpenNewFolder(false)} setFolders={props.setFolders} folders={props.folders} folderLimit={handleFolderLimit} parentFolder={undefined} />}
        {openFolderLimit && <FoldersNumberLimit onClose={() => setOpenFolderLimit(false)}/>}
        <FoldersHeaderContainer>
          <SidebarHeader>Folders</SidebarHeader>
          <SidebarDescription>
            Folders with resources for AI to reference.
          </SidebarDescription>
        </FoldersHeaderContainer>
        <FoldersList>
          {!props.foldersLoading ?
          props.folders.map((folder) => (
            (folder._id === selectedFolder._id || isFolderInLineage(folder)) ?
            <SelectedFolder onClick={() => dispatch(setSelectedFolder(folder))} key={folder._id}>
              <div style={{ display: "flex"}}>
                <FolderIcon>
                    <BsFolder style={{ height: "auto", width: "100%" }} />
                </FolderIcon>
                <FolderTitle style={{ color: "black" }}>
                  {folder.title}
                </FolderTitle>
                <FadeRight></FadeRight>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
              <Menu as="div" className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
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
                          onClick={() => dispatch(setSelectedFolder(folder))}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'group w-full flex items-center px-4 py-2 text-sm'
                            )}
                          >
                            <PencilSquareIcon
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
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
              </div>
            </SelectedFolder>
            :
            <Folder onClick={() => dispatch(setSelectedFolder(folder))} key={folder._id}>
            <div style={{ display: "flex" }}>
            <FolderIcon>
                  <BsFolder style={{ height: "auto", width: "100%" }} />
                </FolderIcon>
              <FolderTitle style={{ color: "black" }}>
                {folder.title}
              </FolderTitle>
              <FadeRight></FadeRight>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
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
                  <Menu.Items className="absolute right-0 z-50 mt-2 py-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={() => dispatch(setSelectedFolder(folder))}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'group w-full flex items-center px-4 py-2 text-sm'
                            )}
                          >
                            <PencilSquareIcon
                              className="mr-3 h-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
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
              </div>
              </Folder>
          ))
        :
        <Centered>
            <div style={{marginTop: "20vh"}}><BlueLoader /></div>
        </Centered>
        }
        </FoldersList>
        <Centered>
          <AddBtn onClick={() => setOpenNewFolder(true)}>
            <HiPlusSm style={{ width: "auto", height: "60%" }} />
            <ButtonText>New folder</ButtonText>
          </AddBtn>
        </Centered>
      </SidebarContainer>
    );
  };
  
  export default FoldersSidebar;

const SidebarContainer = styled.div`
    position: fixed;
    right: 1rem;
    width: 17rem;
    height: calc(100vh - 1.5rem);
    padding: 1.5rem 1.2rem 2rem 1.2rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 0px 0px 8px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #EAEDF5;
`

const FoldersHeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0rem 0.4rem 1rem 0.4rem;
    align-items: center;
    border-bottom: 2px #E2E5EE solid;
`

const SidebarHeader = styled.h2`
    font-weight: 700;
    font-size: 2rem;
    color: black;
`

const SidebarDescription = styled.p`
    font-weight: 500;
    font-size: 1rem;
    color: black;
    width: 90%;
    color: #4B5563;
    margin-top: 0.2rem;
`

const FoldersList = styled.div`
    padding: 0rem 0.2rem 1rem 0.2rem;
    width: 100%;
    flex: 1;
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: visible;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
 
    mask: 
        linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
        linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
        linear-gradient(to left  , black, transparent) left  /100% 0%,
        linear-gradient(to right , black, transparent) right /100% 0%;
    mask-repeat:no-repeat;
    background-color: transparent;
    @media (max-width: 768px) {
      height: 80vw;
      padding: 4vw 2vw 6vw 2vw;
      margin-top: 3vw;
      width: 90vw;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`

const Folder = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #ECECEC;
    box-shadow: 2px 2px 3px rgba(22, 27, 29, 0.13);
    padding: 0.2rem 0.75rem 0.2rem 0.75rem;
    border-radius: 15px;
    cursor: pointer;
    margin: 0.7rem 0 1rem 0;
    align-items: center;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
    }
`

const SelectedFolder = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 2px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    padding: 0.2rem 0.75rem 0.2rem 1rem;
    cursor: pointer;
    margin: 0.7rem 0 1rem 0;
    align-items: center;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
    }
`

const FolderTitle = styled.p`
    margin-left: 0rem;
    font-weight: 600;
    max-width: 8rem;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
`

const FadeRight = styled.div`
    position: absolute;
    right: 1.5rem;
    width: 3rem;
    height: 100%;
    background: transparent;
`

const OptionsIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.1);
    }
`

const FolderIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.3rem;
    color: black;
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
`
const AddBtn = styled.button`
    width: 95%;
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
`

const ButtonText = styled.p`
    margin-left: 0.7vw;
`