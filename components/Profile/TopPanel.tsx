import styled from "styled-components";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import api from "@/pages/api";
import dynamic from "next/dynamic";
const ReferralModal = dynamic(() => import("../Modals/InformationalModals/ReferralModal"));
const UpgradeSubscription = dynamic(() => import("../Modals/InformationalModals/UpgradeSubscription"));
const SubscriptionModal = dynamic(() => import("../Modals/InformationalModals/SubscriptionModal"));
import { BsChevronExpand, BsTrash } from "react-icons/bs";
import Centered from "../Centered";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { selectedUserState } from "@/store/userSlice";
import { Menu, Transition } from '@headlessui/react'
import { BsDoorClosed } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { setSelectedUser } from "@/store/userSlice";
import { setSelectedWorkspaceCompany } from "@/store/workspaceCompany";
import { setSelectedPlan } from "@/store/planSlice";
import { Fragment } from 'react'
import DeleteAccount from "../Modals/DeletingModals/DeleteAccount";

interface Background {
    image: any;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  

const TopPanel = (props: {stats: any}) => {

    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
    const [openReferralModal, setOpenReferralModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const router = useRouter();
    const user = useSelector(selectedUserState);

    const dispatch = useDispatch();
    
    const logout = () => {
        router.push("/");
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem("profiles");
        localStorage.removeItem("plan_name");
        localStorage.removeItem("plan");
        localStorage.removeItem("workspace");
        localStorage.removeItem("profile");
        localStorage.removeItem("username");
        localStorage.removeItem("onboarding_step");
        dispatch(setSelectedUser({}));
        dispatch(setSelectedWorkspaceCompany({}));
        dispatch(setSelectedPlan({}));
        Cookies.remove("token");
        Cookies.remove("user_id");
        Cookies.remove("username");
      }
    
      useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
          }
      }, []);

    return (
        <Centered>
        <Panel>
            {user &&
            <div style={{width: "100%", height: "100%"}}>
            {openSubscriptionModal && user.plan ? <SubscriptionModal onClose={() => setOpenSubscriptionModal(false)} /> : openSubscriptionModal && <UpgradeSubscription onClose={() => setOpenSubscriptionModal(false)} />}
            {openReferralModal && <ReferralModal showDescription={true} onClose={() => setOpenReferralModal(false)} />}
            {openDeleteModal && <DeleteAccount onClose={() => setOpenDeleteModal(false)}/>}  
            {openUpgradeModal && <UpgradeSubscription onClose={() => setOpenUpgradeModal(false)} />}
            <HeaderButtons>
                {user.plan ?
                 <SubscriptionButton onClick={() => setOpenSubscriptionModal(true)}>Subskrypcja</SubscriptionButton>
                 :
                 <SubscriptionButton onClick={() => setOpenUpgradeModal(true)}>Subskrypcja</SubscriptionButton>
                }
                <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-10 justify-center text-sm font-semibold text-gray-900 focus:outline-none">
                    <MoreIcon>
                      <SlOptionsVertical style={{ color: "black", width: "100%" }} />
                    </MoreIcon>
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
                            onClick={() => logout()}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'group w-full flex items-center px-4 py-2 text-sm'
                            )}
                          >
                            <BsDoorClosed
                              className="mr-3 h-6 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Wyloguj mnie
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setOpenDeleteModal(true)}
                            className={classNames(
                              active ? 'bg-red-100 text-red-900' : 'text-red-500',
                              'group w-full flex items-center px-4 py-2 text-sm'
                            )}
                          >
                            <BsTrash className="mr-3 h-5 w-5 text-red-400 group-hover:text-gray-500" aria-hidden="true" />
                            Usuń konto
                          </button>
                        )}
                      </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </HeaderButtons>
            <WelcomeText>Cześć, {user.name}
                {/* <SwitchContent onClick={(e) => e.stopPropagation()}>
                    <SwitchIcon onClick={() => props.openProfiles()}>
                        <BsChevronExpand style={{width: "100%", height: "auto"}}/>
                    </SwitchIcon>{props.showProfiles && 
                    <DropdownContainer>
                        <ProfilesList direction="down" profiles={props.profiles} user={user}/>
                    </DropdownContainer>}
                </SwitchContent> */}
            </WelcomeText>
            <TopText><ShareLink onClick={() => setOpenReferralModal(true)}><b>Poleć Asystenta znajomemu i zgarnijcie po 30 000ml elixiru!</b></ShareLink></TopText>
            {/* <StatsContainer>
                <Stat>
                    <StatIcon image={socialMediaIcon}>
                    </StatIcon>
                    <div>
                        <GenerationNumber>{props.stats.totalPosts}</GenerationNumber>
                        {mobile ?
                            <GenerationNumberDescription>Postów</GenerationNumberDescription>
                            :
                            <GenerationNumberDescription>Wygenerowanych postów</GenerationNumberDescription>
                        }

                    </div>
                </Stat>
                <Stat>
                    <StatIcon image={mailIcon}>
                    </StatIcon>
                    <div>
                        <GenerationNumber>{props.stats.totalEmails}</GenerationNumber>
                        {mobile ?
                            <GenerationNumberDescription>Maili</GenerationNumberDescription>
                            :
                            <GenerationNumberDescription>Wygenerowanych maili</GenerationNumberDescription>
                        }
                    </div>
                </Stat>
                <Stat>
                    <StatIcon image={ideaIcon}> 
                    </StatIcon>
                    <div>
                        <GenerationNumber>{props.stats.totalIdeas}</GenerationNumber>
                        {mobile ?
                            <GenerationNumberDescription>Pomysłów</GenerationNumberDescription>
                            :
                            <GenerationNumberDescription>Wygenerowanych pomysłów</GenerationNumberDescription>
                        }
                    </div>
                </Stat>
            </StatsContainer> */}
            </div>
            }
        </Panel>
        </Centered>
    )
}

export default TopPanel;

const Panel = styled.div`
    width: 100%;
    padding: 2vh 2vw 3vh 2vw;
    border-radius: 20px;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #E5E8F0;
    @media (max-width: 1023px) {
        width: 97%;
        padding: 2vh 5vw 3.5vh 5vw;
        margin-top: 0vh;
        height: auto;
    }
`

const Content = styled.div`

`

const HeaderButtons = styled.div`
    display: flex;
    position: absolute;
    right: 3vw;
    top: 2vh;
    align-items: center;
    color: black;
    justify-content: space-between;
    font-weight: 500;
    font-size: 2vh;
    @media (max-width: 1023px) {
        top: 0;
        right: 0;
        width: 100%;
        position: relative;
    }
`

const TopText = styled.div`
    color: #596073;
    font-size: 1rem;
    margin-top: 0.5rem;
    @media (max-width: 1023px) {
        max-width: 85%;
        margin-top: 0.25rem;
        font-size: 2vh;
    }
`

const WelcomeText = styled.h1`
    font-size: 5vh;
    margin-top: 0vh;
    color: black;
    font-weight: 600;
    display: flex;
    align-items: center;
    @media (max-width: 1023px) {
        margin-top: 0.75rem;
        font-size: 2rem;
    }
`

const CompanyName = styled.p`
    color: #596073;
    font-size: 2vh;
    margin-left: 0.2vw;
    @media (max-width: 1023px) {
        font-size: 2.5vh;
        margin-top: -0.5vh;
    }
`

const StatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.4vh 7vw 1.4vh 0vw;
    color: black;
    align-items: center;
    @media (max-width: 1023px) {
        padding: 2vh 10vw 2vh 0vw;
    }
`

const Stat = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1023px) {
        margin-right: 1.7rem;
    }
`

const StatIcon = styled.div<Background>`
    position: relative;
    width: 5.5vh;
    height: 5.5vh;
    overflow: hidden;
    margin-right: 2vw;
    z-index: 0;
    border-radius: 10px;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 1023px) {
        margin-right: 0.7rem;
    }
`

const GenerationNumber = styled.p`
    font-size: 3.5vh;
    font-weight: 600;
    @media (max-width: 1023px) {
        font-size: 3vh;
    }
`

const GenerationNumberDescription = styled.p`
    color: #596073;
    font-size: 1.7vh;
    margin-top: -0.5vh;
`

const SubscriptionButton = styled.button`
    padding: 0.4vh 2vw 0.4vh 2vw;
    margin-left: 2.5vw;
    border: solid 3px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: black;
    font-size: 2vh;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        color: white;
        background-size: 120%;
        background-position-x: -1rem;
    }
    @media (max-width: 1023px) {
        margin-left: 0;
        padding: 1vh 4vw 1vh 4vw;
    }
`

const ShareLink = styled.button`
    background: -webkit-linear-gradient(45deg, #6578F8, #64B5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: left;
`

const SwitchIcon = styled.div`
    width: 3.5vh;
    height: 3.5vh;
    margin-left: 1rem;
    cursor: pointer;
`

const SwitchContent = styled.div`
    position: relative;
    display: inline-block;
`

const DropdownContainer = styled.div`
    position: absolute;
    padding: 1vh 0 0 2vh;
    z-index: 100;
    color: white;
    @media (max-width: 1023px) {
        left: -34vw;
        top: 4vh;
    }
`

const ProfileIcon = styled.div<Background>`
  width: 1.2rem;
  height: 1.2rem;
  min-width: 1.2rem;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 0.7rem;
  margin-left: 0.1rem;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: 1023px) {
    margin-right: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
  }
`

const MoreIcon = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1.5rem;
    cursor: pointer;
    @media (max-width: 1023px) {
        margin-left: 1rem;
      }
`