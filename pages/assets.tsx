import PageTemplate from "@/components/Common/PageTemplate";
import React, { FormEvent, use, useEffect, useState } from "react";
import FoldersSidebar from "@/components/Assets/FoldersSidebar";
import styled from "styled-components";
import dynamic from "next/dynamic";
const HomePage = dynamic(() => import("@/components/Assets/HomePage"));
const DataPage = dynamic(() => import("@/components/Assets/DataPage"));
import { selectFolderState, setSelectedFolder } from "../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "./api";
import OnboardingModal from "@/components/Modals/OnboardingModals/InitialOnboardingModal";
import { useRouter } from "next/router";
import Head from "next/head";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";

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
  documents: Document[] | [],
  updatedAt: string,
  parentFolder: Folder,
  isSubfolder?: boolean,
  normalizedTimestamp?: string
}

const Assets = () => {

  const selectedFolder = useSelector(selectFolderState);
  const dispatch = useDispatch();
  const [openedFolder, setOpenedFolder] = useState<Folder | null>();
  const [mobile, setMobile] = useState(false);
  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [openOnboarding, setOpenOnboarding] = useState(false);
  const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
  const [lineage, setLineage] = useState<Folder[]>([]);

  const router = useRouter();

  const handleOnboardingClose = () => {
    dispatch(setSelectedFolder({documents: []}))
    setOpenOnboarding(false);
    router.reload();
    const prevOnboardingState = localStorage.getItem("onboarding");
    const updatedOnboardingState = prevOnboardingState + " assets";
    localStorage.setItem("onboarding", updatedOnboardingState);
  }

  useEffect(() => {
    if (selectedFolder) {
      setOpenedFolder(selectedFolder as Folder);
    }
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const  workspace= localStorage.getItem("workspace");
    const userId = localStorage.getItem("user_id");
    const onboarding = localStorage.getItem("onboarding");
    const fetchFolders = async () => {
      try {
        if (onboarding) {
          if (onboarding.length > 0 && !onboarding?.includes("assets")) {
            setOpenOnboarding(true);
          }
        }
        if (workspace) {
          const { data } = await api.get(`/folders/${workspace}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setFolders(data);
          setFoldersLoading(false);
        } else {
          const { data } = await api.get(`/folders/owner/${userId}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setFolders(data);
          setFoldersLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFolders();
  }, [workspaceCompany, selectedFolder]);

  useEffect(() => {
    if (selectedFolder) {
      setOpenedFolder(selectedFolder as Folder);
    }
  }, [selectedFolder]);


    return (
      <>
      <Head>
          <title>Assets | Yepp AI</title>
          <meta name = "theme-color" content = "#FFFFFF" />
          <meta name="description" content="Teach AI knowlege tailored specifically for your needs." />
      </Head>
      <PageTemplate userProfiles={[]} >
          {openOnboarding && <OnboardingModal onClose={() => handleOnboardingClose()}/>}
          <PageContent>
          {openedFolder?.title ?
              <DataPage back={() => dispatch(setSelectedFolder({documents: []}))} folders={folders} openedFolder={openedFolder} setLineage={setLineage} lineage={lineage} setFolders={setFolders}/>
              :
              <HomePage folders={folders} setFolders={setFolders} loading={foldersLoading}/> 
          }
          {(openedFolder?.title && !mobile) && <FoldersSidebar foldersLoading={foldersLoading} folders={folders} setFolders={setFolders} lineage={lineage}/>}
          </PageContent>
      </PageTemplate>
      </>
    )
}

export default Assets;


const PageContent = styled.div`
display: flex;
position: relative;
width: 100%;
height: calc(100vh - 1.5rem);
border-radius: 25px;
@media (max-width: 1023px) {
  width: 100%;
  height: 100svh;
  margin-top: 0;
  align-items: flex-start;
  padding: 0;
  padding-bottom: 0;
  overflow: visible;
  height: auto;
  box-shadow: none;
  box-shadow: none;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
`