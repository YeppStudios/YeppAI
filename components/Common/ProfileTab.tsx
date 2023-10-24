import { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileTab = (props: {onClick: any}) => {

    const [profileTitle, setProfileTitle] = useState<any>();
    const [profileImage, setProfileImage] = useState<any>();

    useEffect(() => {
        setProfileTitle(localStorage.getItem("profile_title"));
        setProfileImage(localStorage.getItem("profile_icon"));
    }, []);

    
    return (
        <Tab onClick={() => props.onClick()}>
            {profileImage && <Icon bg={profileImage} />}
            <h1 className="text-black font-medium text-lg">{profileTitle}</h1>
        </Tab>
    )
}


export default ProfileTab;


const Icon = styled.div<{bg: string}>`
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 50%;
`


const Tab = styled.div`
    position: fixed;
    background-color: white;
    z-index: 20;
    right: 0.75rem;
    cursor: pointer;
    bottom: 0.75rem; 
    border: 2px solid #F6F6FB;
    border-radius: 0.75rem;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.12);
    padding: 0.85rem 2rem 0.85rem 2rem;
    display: flex;
    transition: all 0.3s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.98);
    }
`