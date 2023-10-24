import styled from "styled-components";
import UsersList from "../Common/UsersList";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";

const ProfileNavbar = () => {

    const [profileTitle, setProfileTitle] = useState<any>();
    const [profileImage, setProfileImage] = useState<any>();

    useEffect(() => {
        setProfileTitle(localStorage.getItem("profile_title"));
        setProfileImage(localStorage.getItem("profile_icon"));
    }, []);

    return (
        <MainContainer>
            <TitleAndImageWrapper>
                {profileImage &&
                    <ImageBackground src={profileImage} />
                }
                <h1 className="text-black font-semibold text-2xl">{profileTitle}</h1>
            </TitleAndImageWrapper>
            <div className="flex items-center">
                <UsersList />
                <BsThreeDotsVertical className="ml-4 text-black h-5 w-5" />
            </div>
        </MainContainer>
    )
    
}


export default ProfileNavbar;

const MainContainer = styled.div`
    width: 100%;
    height: auto;
    overflow-y: scroll;
    background: white;
    position: relative;
    border-radius: 25px;
    border: 2px solid #F6F6FB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13), -7px -7px 10px #FAFBFF;
    padding: 1.2rem 2.5em 1.2rem 2.5rem;
    @media (max-width: 1023px) {
        padding: 0;
    }
`

const BackBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: black;
    font-weight: 500;
    z-index: 10;
`
const BackBtnIcon = styled.div`
    width: 0.6rem;
`

const BackBtnText = styled.p`
    color: black;
    font-weight: 500;
    margin-left: 1rem;
`


const ImageBackground = styled.div<{src: any}>`
    background-image : url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 1rem;
`

const TitleAndImageWrapper = styled.div`
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
`;