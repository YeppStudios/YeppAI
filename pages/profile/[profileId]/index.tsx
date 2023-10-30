import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectedProfileState } from "@/store/selectedProfileSlice";
import PageTemplate from "@/components/Common/PageTemplate";
import ProfileNavbar from "@/components/Profiles/ProfileNavbar";
import Assets from "@/components/Profiles/Assets";
import styled from "styled-components";
import Tones from "@/components/Profiles/Tones";
import Personas from "@/components/Profiles/Personas";
import { useState } from "react";
import Competition from "@/components/Profiles/Competition";

const Profile = () => {

    return (
        <PageTemplate>
            <ProfileNavbar />
            <MainContainer>
            <div>
            <Assets />
            </div>
            <div>
            <Tones />
            <div className="mt-4"></div>
            <Personas />
            <div className="mt-4"></div>
            <Competition />
            </div>

            </MainContainer>
        </PageTemplate>
    )
}


export default Profile;


const MainContainer = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 20px; 
    grid-template-areas: 
      ". ."; 
    padding: 1rem 0rem 3rem 0rem;
    @media (max-width: 1023px) {
    padding: 0vh 0 2vh 0vw;
    width: 100vw;
    }
`