import React, { FormEvent, Key, use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { selectFolderState, setSelectedFolder } from "../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import api from "./api";
import { useRouter } from "next/router";
import Head from "next/head";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";
import { setSelectedProfile } from "@/store/selectedProfileSlice";
import { motion, useAnimation } from 'framer-motion';
import SlideBottom from "@/components/Animated/SlideBottom";
import background from "../public/images/gradient_background.png";
import { BiImageAdd } from "react-icons/bi";
import UsersList from "../components/Common/UsersList";
import ColorfulText from "@/components/Common/ColorfulText";
import Centered from "@/components/Centered";
import AddProfile from "@/components/Modals/AddingModals/AddProfile";
import { BsPlus } from "react-icons/bs";
import { BlueLoader } from "@/components/Common/Loaders";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";


interface Document {
  _id: string,
  owner: string,
  title: string,
  category: string,
  timestamp: string,
  ownerEmail: string,
  vectorId: string,
  isDocument?: boolean,
  normalizedTimestamp?: string
}

interface Profile {
  _id: string,
  owner: string,
  title: string,
  ownerEmail: string,
  category: string,
  documents: Document[] | [],
  updatedAt: string,
  parentFolder: Profile,
  isSubfolder?: boolean,
  normalizedTimestamp?: string,
  imageUrl: string
}

const ChooseProfiles = () => {

  const dispatch = useDispatch();
  const [openNewProfile, setOpenNewProfile] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setSelectedFolder({documents: []}))
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const  workspace= localStorage.getItem("workspace");
    const fetchProfiles = async () => {
      try {
        if (workspace) {
          const { data } = await api.get(`/getProfiles`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setFilteredProfiles(data);
          setProfilesLoading(false);
        } else {
            setOpenLoginModal(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfiles();
  }, []);


  const handleDescriptionEdit = (e: any, profile: Profile) => {
    e.stopPropagation();
    dispatch(setSelectedProfile(profile));
    setOpenNewProfile(true);
    }

  const handleOpenNewProfile = () => {
    dispatch(setSelectedProfile(null));
    setOpenNewProfile(true);
  }

  const handleOpenProfile = (profile: Profile) => {
    dispatch(setSelectedProfile(profile));
    localStorage.setItem("profile_id", profile._id);
    localStorage.setItem("profile_title", profile.title);
    localStorage.setItem("profile_icon", profile.imageUrl);
    router.push(`/profile/${profile._id}`);
  }


  const renderProfiles = () => {
    const renderedContent = filteredProfiles.map((profile: any, idx: Key | null | undefined) => {
    
            return (
                <SlideBottom key={idx}>
                <ProfileContainer onClick={() => handleOpenProfile(profile)} className="py-4 w-1/5 text-black rounded-2xl shadow-lg relative border-2 border-gray-50 overflow-hidden">
                    <h3 className="text-2xl font-semibold cursor-pointer">{profile.title}</h3>
                    <div onClick={(e) => handleDescriptionEdit(e, profile)} className="rounded-full absolute cursor-pointer -top-1 -right-1 p-3 shadow-lg text-gray-300 hover:text-gray-800 hover:shadow-none">
                        {profile.imageUrl ?
                        <ImageBackground src={profile.imageUrl} />
                        :
                        <BiImageAdd className="w-7 h-7" />
                        }
                    </div>
                    {profile.description ?
                        <p className="text-gray-700 font-medium mt-3 w-9/12 h-12 overflow-hidden">{profile.description}</p>
                    :
                        <p onClick={(e) => handleDescriptionEdit(e, profile)} className="text-gray-300 cursor-pointer font-medium mt-3 w-9/12 h-12 overflow-hidden hover:text-gray-700">+ Add description to profile</p>
                    }
                    <div className="flex justify-between items-center mt-4">
                        <UsersList />
                        <button className="bg-transparent cursor-pointer hover:scale-95 transition"><ColorfulText><b>Open</b></ColorfulText></button>
                    </div>
                </ProfileContainer>
                </SlideBottom>
            )
    })
    return  (
        <Centered>
        <Profiles>
            {renderedContent}
            <SlideBottom>
                    <NewProfile  onClick={() => handleOpenNewProfile()}>
                        <div style={{width: "100%"}}>
                        <Centered>
                            <Circle>
                                <BsPlus style={{ width: "80%", height: "80%" }} /> 
                            </Circle>
                        </Centered>
                        <Centered>
                            <AddProfileTitle>New Profile</AddProfileTitle>
                        </Centered>
                        </div>
                    </NewProfile>
            </SlideBottom>
        </Profiles>
        </Centered>
    )
  }


    return (
      <>
      <Head>
          <title>Profiles | Yepp AI</title>
          <meta name = "theme-color" content = "#FFFFFF" />
          <meta name="description" content="Teach AI knowlege tailored specifically for your & your client's needs." />
      </Head>
      {openLoginModal && <LoginModal onClose={() => router.reload()} registration={false}/>}
      {openNewProfile && <AddProfile onClose={() => setOpenNewProfile(false)} setProfiles={setFilteredProfiles} />}
      <Background bg={background} ref={containerRef}>
        <div className="w-full">
            <Centered><h1 className="text-5xl font-semibold mb-20">Choose your client profile</h1></Centered>
            {profilesLoading ?
            <div className="w-full flex justify-center items-center py-12"><BlueLoader /></div>
            :
            renderProfiles()
            }
        </div>
      </Background>
      </>
    )


}

export default ChooseProfiles;

const Background = styled.div<{bg: any}>`
    background-image : url(${(props) => props.bg.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    padding-bottom: 10rem;
    display: flex;
    justify-content: center;
    padding-top: 8rem;
    flex-wrap: wrap;
    overflow-y: scroll;
    -ms-overflow-style: none;
    -webkit-scrollbar-width: none;
`

const Profiles = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (max-width: 1023px) {
    width: 100vw;
  }
`;

const ProfileContainer = styled.div`
  width: 18rem;
  height: 12.5rem;
  background: white;
  position: relative;
  margin: 1.4rem 0.75rem 1.4rem 0.75rem;
  border: 2px solid #eaedf5;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(15, 27, 40, 0.15);
  padding: 1.75rem 2rem 1.75rem 2rem;
  cursor: auto;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(0.97);
    box-shadow: 1px 1px 5px rgba(15, 27, 40, 0.05);
    border: 2px solid white;
  }
  @media (max-width: 1023px) {
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;


const ImageBackground = styled.div<{src: any}>`
  background-image : url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
`


const AddProfileTitle = styled.p`
    font-weight: 500;
    font-size: 1.2rem;
    color: #CFD5E8;
    margin-top: 1rem;
`

const Circle = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #CFD5E8;
    border: 2px dashed #CFD5E8;
    border-radius: 50%;
`

const NewProfile = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 18rem;
    height: 12.5rem;
    color: black;
    border: dashed 3px #CFD5E8;
    text-align: center;
    margin: 0.75rem 0.6rem 0.75rem 0.6rem;
    border-radius: 20px;
    padding: 2rem 1rem 2rem 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px rgba(0, 0, 0, 0.7);
        transform: scale(0.95);
    }
    &:hover ${Circle} {
        color: rgba(0, 0, 0, 0.7);
        border: 2px dashed rgba(0, 0, 0, 0.7);
    }
    &:hover ${AddProfileTitle} {
        color: transparent;
        background-image: linear-gradient(-70deg, #6578F8, #64B5FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    @media(max-width: 1023px) {
        width: 95vw;
        margin: 0;
        margin-top: 1rem;
    }
`