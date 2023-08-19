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
  _id: string
}


const Assets = () => {

  const selectedFolder = useSelector(selectFolderState);
  const dispatch = useDispatch();
  const [openedFolder, setOpenedFolder] = useState<Folder>();
  const [mobile, setMobile] = useState(false);
  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [foldersLoading, setFoldersLoading] = useState(true);
  const [openOnboarding, setOpenOnboarding] = useState(false);
  const workspaceCompany = useSelector(selectedWorkspaceCompanyState);

  const router = useRouter();

  const handleOnboardingClose = () => {
    dispatch(setSelectedFolder({documents: []}))
    setOpenOnboarding(false);
    router.reload();
    localStorage.setItem("onboarding_step", "2");
  }

  useEffect(() => {
    dispatch(setSelectedFolder({documents: []}))
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const workspace = localStorage.getItem("workspace");
    const userId = localStorage.getItem("user_id");
    const onboarding = localStorage.getItem("onboarding_step");
    const fetchFolders = async () => {
      try {
        if (onboarding === "1") {
          setOpenOnboarding(true);
        }
        if (workspaceCompany._id) {
          const { data } = await api.get(`/folders/${workspaceCompany.workspace}`, {
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
  }, [dispatch, workspaceCompany]);

  useEffect(() => {
    setOpenedFolder(selectedFolder);
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
              <DataPage back={() => dispatch(setSelectedFolder({documents: []}))} folders={folders} openedFolder={openedFolder} setFolders={setFolders}/>
              :
              <HomePage folders={folders} setFolders={setFolders} loading={foldersLoading}/> 
          }
          {(openedFolder?.title && !mobile) && <FoldersSidebar foldersLoading={foldersLoading} folders={folders} setFolders={setFolders}/>}
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