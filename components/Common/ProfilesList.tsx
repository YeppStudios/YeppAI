import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Key, useEffect, useState } from "react";
import api from "@/pages/api";
import { BsCheckLg, BsPencil, BsPlusLg } from "react-icons/bs";
import Image from "next/image";
import { Buffer } from 'buffer';
import { useRouter } from "next/router";
import LimitModal from "../Modals/LimitModals/LimitModal";


const downAnimation = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring" }, height: "auto", y: 0},
    hidden: { opacity: 0, scale: 0.8,  height: "0rem", y: -30}
  };

    const upAnimation = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring" }, height: "auto", y: 0},
    hidden: { opacity: 0, scale: 0.8,  height: "0rem", y: 30}
  };
  
interface Background {
    image: any
}

const ProfilesList = (props: {direction: string, profiles: any, user: any}) => {

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState({name: ""});
    const [updateProfile, setUpdateProfile] = useState("");
    const [openLimitModal, setOpenLimitModal] = useState(false);

    const controls = useAnimation();
    const [ref, inView] = useInView();
    const router = useRouter();

    useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);

      useEffect(() => {
          try {
            const profile = localStorage.getItem("profile");
            if(profile){
              setSelectedProfile(JSON.parse(profile));
            }
          } catch (e) {
              console.log(e)
          }

      }, [])

      const selectProfile = (profile: any) => {
        localStorage.setItem("profile", JSON.stringify(profile));
        setSelectedProfile(profile);
        router.reload();
      }

      const editProfile = (profile: any) => {
        setUpdateProfile(profile._id);
        setOpenProfileModal(true);
      }

      const openModal = () => {
          const planName = localStorage.getItem("plan_name");
          let maxProfiles = 1;
          if(planName === "Assistant"){
              maxProfiles = 5;
          } else if (planName === "Expert") {
            maxProfiles = 1000;
          }
          if(props.profiles.length >= maxProfiles){
              setOpenLimitModal(true);
          } else {
              setOpenProfileModal(true);
          }
      }

    const renderProfiles = () => {
        const fetchedProfiles = props.profiles.map((profile: { name: string; image: any, _id: string }) => {
            return (
                <>
                {selectedProfile.name === profile.name ?
                    <ProfileContainer key={profile.name} onClick={() => selectProfile(profile) }>
                        <div style={{display: "flex", maxWidth: "85%", overflow: "hidden"}}><ProfileIcon image={profile.image}></ProfileIcon>{profile.name}</div>
                        <TickIcon><BsCheckLg style={{width: "100%", height: "100%"}}/></TickIcon>
                    </ProfileContainer>
                    :
                    <ProfileContainer key={profile.name} onClick={() => selectProfile(profile)}>
                         <div style={{display: "flex", maxWidth: "95%", overflow: "hidden"}}><ProfileIcon image={profile.image}></ProfileIcon>{profile.name}</div>
                         <div onClick={(e) => e.stopPropagation()}><EditBtn onClick={() => editProfile(profile)}><BsPencil style={{width: "100%", height: "100%"}}/></EditBtn></div>
                    </ProfileContainer>
                }
                </>

            )
        })
        return (
            <div>
                {fetchedProfiles}
            </div>
        )
    }

    return (
            <div>
            {openLimitModal && <LimitModal onClose={() => setOpenLimitModal(false)} />}
            {props.direction === "up" ?
                <Container ref={ref} variants={upAnimation} animate={controls} initial="hidden">
                    {props.profiles.length > 0 &&
                        renderProfiles()
                    }
                    <AddButton onClick={() => openModal()}><PlusIcon><BsPlusLg style={{width: "100%", height: "auto"}}/></PlusIcon>Nowy profil</AddButton>
                </Container>
            :
                <Container ref={ref} variants={downAnimation} animate={controls} initial="hidden">
                    {props.profiles.length > 0 &&
                    renderProfiles()
                    }
                    <AddButton onClick={() => openModal()}><PlusIcon><BsPlusLg style={{width: "100%", height: "auto"}}/></PlusIcon>Nowy profil</AddButton>
                </Container>
            }
            </div>

    )

}

export default ProfilesList;

const EditBtn = styled.div`
    width: 2vh;
    height: 2vh;
    margin-right: 0.2vw;
    display: none;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.2);
    }
`

const Container = styled(motion.div)`
    width: 14rem;
    height: auto;
    border-radius: 20px;
    background: #141418;
    box-shadow: 5px 5px 10px rgba(22, 27, 29, 0.23), -5px -5px 10px #FAFBFF;
    font-size: 2vh;
    font-weight: 400;
`

const AddButton = styled.div`
    width: 100%;
    padding: 1.5vh 2vh 1.5vh 2vh;
    border-radius: 10px;
    cursor: pointer;
    background: #141418;
    border-top: 1px solid #211D2D;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #211D2D;
    }
`

const PlusIcon = styled.div`
    width: 2.4vh;
    height: 2.4vh;
    margin-right: 1.2rem;
    margin-left: 0.3rem;
`

const ProfileContainer = styled.div`
    width: 100%;
    padding: 1.5vh 2vh 1.5vh 2vh;
    border-radius: 10px;
    background: #141418;
    cursor: pointer;
    border-top: 1px solid #211D2D;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
        background-color: #211D2D;
    }
    &:hover ${EditBtn} {
        display: block;
    }
    @media (max-width: 1023px) {
        background: #000000;
    }
`

const ProfileIcon = styled.div<Background>`
    width: 3vh;
    height: 3vh;
    min-width: 3vh;
    border-radius: 5px;
    margin-right: 1.2rem;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const TickIcon = styled.div`
    width: 2vh;
    height: 2vh;
    margin-right: 0.2vw;
`
