import styled from "styled-components";
import SlideBottom from "../Animated/SlideBottom";
import { useEffect, useState } from "react";
import Centered from "../Centered";
import { MdOutlineClose } from "react-icons/md";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";
import { useSelector } from "react-redux";
import api from "@/pages/api";
import { BiImage } from "react-icons/bi";
import MultiLineSkeletonLoader from "./MultilineSkeletonLoader";
import { useRouter } from "next/router";
const ProfilesList = (props: {onClose: any}) => {

    const [profileTitle, setProfileTitle] = useState<any>();
    const [profileImage, setProfileImage] = useState<any>();
    const [profiles, setProfiles] = useState<any>();
    const [profilesLoading, setProfilesLoading] = useState(true);

    const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const router = useRouter();

    useEffect(() => {
        setProfileTitle(localStorage.getItem("profile_title"));
        setProfileImage(localStorage.getItem("profile_icon"));
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
                setProfiles(data);
                setProfilesLoading(false);
              }
            } catch (error) {
              console.error(error);
            }
          };
          fetchProfiles();
    }, []);

    const changeProfile = (profile: any) => {
        localStorage.setItem("profile_id", profile._id);
        localStorage.setItem("profile_title", profile.title);
        localStorage.setItem("profile_icon", profile.imageUrl);
        router.reload();
    }
    
    return (
        <div className="w-[100vw] h-[100svh] fixed" onClick={props.onClose}>
            <ListContaier onClick={(e) => e.stopPropagation()}>
                <CloseCircle onClick={props.onClose}>
                <CloseIcon>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                </CloseCircle>
                <div className="w-full flex">
                    {profileImage && <Icon bg={profileImage} />}
                    <div>
                    {profileTitle && <h2 className="cursor-pointer text-black font-semibold text-xl w-full ml-5 mt-1">{profileTitle}</h2>}
                    {workspaceCompany && <h2 className="text-blue-500 text-sm w-full font-medium cursor-pointer hover:text-blue-700 ml-5">View profile</h2>}
                    </div>
                </div>
                <div className="bg-[#F6F6FB] shadow-inner mt-8 rounded-2xl w-full px-4 pt-2 pb-3">
                    {profilesLoading ?
                    <MultiLineSkeletonLoader lines={4} justifyContent="left"/>
                    :
                    profiles && profiles.map((profile: any, idx: any) => (
                        <SlideBottom key={idx}>
                        <Profile onClick={() => changeProfile(profile)}>
                            {profile.imageUrl ? <ProfileListIcon bg={profile.imageUrl} /> :<div className="rounded-full cursor-pointer w-[2.2rem] h-[2.2rem] shadow flex items-center justify-center text-gray-300"><BiImage className="w-5 h-5" /></div>}
                            <p className="font-medium ml-4">{profile.title}</p>
                        </Profile>
                        </SlideBottom>
                    )
                    )
                    }
                </div>
                <Centered><p className="mt-6 text-gray-300 text-sm cursor-pointer hover:text-blue-500 font-medium" onClick={() => router.push("/profiles")}>Back profile choice panel</p></Centered>
            </ListContaier>
        </div>
    )
}


export default ProfilesList;


const ListContaier = styled.div`
    position: fixed;
    right: 0.75rem;
    bottom: 5.5rem;
    background-color: white;
    border: 2px solid #F6F6FB;
    border-top-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.12);
    width: 22rem;
    height: auto;
    max-height: 80svh;
    padding: 1.2rem 1.2rem 1.5rem 1.2rem;
    z-index: 20;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`

const Icon = styled.div<{bg: string}>`
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    width: 3.5rem;
    height: 3.5rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    cursor: pointer;
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
        width: 1rem;
        height: 1rem;
    }
`

const CloseCircle = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #F6F6FB;
    }
`

const Profile = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    color: black;
    align-items: center;
    background: white;
    border-radius: 15px;
    box-shadow: 3px 3px 9px rgba(15, 27, 40, 0.12);
    cursor: pointer;
    padding: 0.75rem 1.25rem 0.75rem 1.25rem;
    margin: 0.65rem 0 0.65rem 0;
    transition: all 0.3s ease;
    border: 2px solid #F6F6FB;
    &:hover {
        box-shadow: none;
        transform: scale(0.98);
    }
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const ProfileListIcon = styled.div<{bg: string}>`
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    width: 2rem;
    height: 2rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
`