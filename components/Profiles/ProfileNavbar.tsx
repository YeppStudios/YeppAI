import styled from "styled-components";
import UsersList from "../Common/UsersList";
import { BsTrash } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import classNames from "classnames";
import DeleteProfileModal from "../Modals/DeletingModals/DeleteProfileModal";

const ProfileNavbar = () => {

    const [profileTitle, setProfileTitle] = useState<any>();
    const [profileImage, setProfileImage] = useState<any>();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        setProfileTitle(localStorage.getItem("profile_title"));
        setProfileImage(localStorage.getItem("profile_icon"));
    }, []);

    return (
        <MainContainer>
            {openDeleteModal && <DeleteProfileModal onClose={() => setOpenDeleteModal(false)} />}
            <TitleAndImageWrapper>
                {profileImage &&
                    <ImageBackground src={profileImage} />
                }
                <h1 className="text-black font-semibold text-2xl">{profileTitle}</h1>
            </TitleAndImageWrapper>
            <div className="flex items-center">
                <UsersList />
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
                        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    onClick={() => setOpenDeleteModal(true)}
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
        </MainContainer>
    )
    
}


export default ProfileNavbar;

const MainContainer = styled.div`
    width: 100%;
    height: auto;
    overflow-y: visible;
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

const OptionsIcon = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    cursor: pointer;
    transition: all 0.4s ease;
`