import { useRouter } from 'next/router';
import styled from 'styled-components';
import Image from 'next/image';
import logoImage from "../../public/images/logo_black.png";
import { BsFillFilePersonFill, BsPencilFill, BsFillChatTextFill, BsFillFileTextFill, BsFillArchiveFill } from "react-icons/bs";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import SlideBottom from '../Animated/SlideBottom';
import lock from "../../public/images/lock.png";
import Centered from '../Centered';
import AddTeammate from '../Modals/AddingModals/AddTeammate';
import { selectedUserState, } from "../../store/userSlice";
import { selectedPlanState } from '@/store/planSlice';
import { useSelector } from 'react-redux';
import UpgradeSubscription from '../Modals/InformationalModals/UpgradeSubscription';
import { FaSearch } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { motion, useAnimation } from 'framer-motion';


const plans = [
{name: "Assistant", 
  tabs: [  
    {title: "Marketing", icon:  <BsPencilFill style={{height: "100%", width: "auto"}}/>, path: "/marketing", id: "navbar-content-creator"},
    {title: "Copywriting", icon:  <BsFillFileTextFill style={{height: "100%", width: "auto"}}/>, path: "/copywriting", id: "navbar-editor-ai"},
    {title: "Chat", icon:  <BsFillChatTextFill style={{height: "100%", width: "auto"}}/>, path: "/chat", id: "navbar-chat"},
    // {title: "Wyszukiwarka", icon:  <FaSearch style={{height: "100%", width: "auto"}}/>, path: "/prompts", id: "navbar-prompts"},
    // {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>, path: "/ideacreator", id: "navbar-idea-creator"},
  ],
  id: "63f0e7ed75de0ef12bb8c487"
},
{name: "Assistant Basic", 
tabs: [  
  {title: "Marketing", icon:  <BsPencilFill style={{height: "100%", width: "auto"}}/>, path: "/marketing", id: "navbar-content-creator"},
  {title: "Copywriting", icon:  <BsFillFileTextFill style={{height: "100%", width: "auto"}}/>, path: "/copywriting", id: "navbar-editor-ai", locked: true},
  {title: "Chat", icon:  <BsFillChatTextFill style={{height: "100%", width: "auto"}}/>, path: "/chat", id: "navbar-chat", locked: true},
  // {title: "Wyszukiwarka", icon:  <FaSearch style={{height: "100%", width: "auto"}}/>, path: "/prompts", id: "navbar-prompts", locked: true},
  // {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>, path: "/ideacreator", id: "navbar-idea-creator"},
],
id: "647895cf404e31bfe8753398"
},
{name: "Assistant Pro", 
tabs: [  
  {title: "Marketing", icon:  <BsPencilFill style={{height: "100%", width: "auto"}}/>, path: "/marketing", id: "navbar-content-creator"},
  {title: "Copywriting", icon:  <BsFillFileTextFill style={{height: "100%", width: "auto"}}/>, path: "/copywriting", id: "navbar-editor-ai"},
  {title: "Chat", icon:  <BsFillChatTextFill style={{height: "100%", width: "auto"}}/>, path: "/chat", id: "navbar-chat"},
  // {title: "Wyszukiwarka", icon:  <FaSearch style={{height: "100%", width: "auto"}}/>, path: "/prompts", id: "navbar-prompts", locked: true},
  // {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>, path: "/ideacreator", id: "navbar-idea-creator"},
],
id: "6478970a404e31bfe87533a0"
},
{name: "Assistant Business", 
  tabs: [  
    {title: "Marketing", icon:  <BsPencilFill style={{height: "100%", width: "auto"}}/>, path: "/marketing", id: "navbar-content-creator"},
    {title: "Copywriting", icon:  <BsFillFileTextFill style={{height: "100%", width: "auto"}}/>, path: "/copywriting", id: "navbar-editor-ai"},
    {title: "Chat", icon:  <BsFillChatTextFill style={{height: "100%", width: "auto"}}/>, path: "/chat", id: "navbar-chat"},
    // {title: "Wyszukiwarka", icon:  <FaSearch style={{height: "100%", width: "auto"}}/>, path: "/prompts", id: "navbar-prompts"},
    // {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>, path: "/ideacreator", id: "navbar-idea-creator"},
  ],
  id: "6444d4394ab2cf9819e5b5f4"
}
]

const animationVariants = {
  visible: {
    transition: { duration: 0.35, type: "spring" },
    height: "70vh"
  },
  hidden: { height: "3.75rem" },
};

const NavigationBar = () => {
  
  const router = useRouter();
  const { pathname } = router;
  const [mobile, setMobile] = useState(false);
  const [openReferralModal, setOpenReferralModal] = useState(false);
  const [openAddTeammateModal, setOpenAddTeammateModal] = useState(false);
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const user = useSelector(selectedUserState);
  const [openMobile, setOpenMobile] = useState(false);
  const plan = useSelector(selectedPlanState)
  const [isHovered, setIsHovered] = useState(false);

  const controls = useAnimation();
  
  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
  }, [user]);

  const handleLockedClick = () => {
    setIsHovered(false);
    setOpenSubscriptionModal(true);
  }

  const handleOpenMobileMenu = () => {
    setOpenMobile(prevOpenMobile => !prevOpenMobile);
}

  const memoizedNavigationTabs = useMemo(() => {
    let fetchedTabs: any[] = [];

    if (user && plan) {
      if (!plan._id || plan._id === "647c3294ff40f15b5f6796bf") {
        fetchedTabs = plans.find((plan) => plan.name === "Assistant Business")?.tabs || [];
      } else if (plan._id === "6444d4394ab2cf9819e5b5f4") {
        fetchedTabs = plans.find((plan) => plan.name === "Assistant Business")?.tabs || [];
      } else if (plan._id === "63f0e7d075de0ef12bb8c484" || plan._id === "63f0e6968e1b9d507c38a749" || plan._id === "63f0e7ed75de0ef12bb8c487") {
        fetchedTabs = plans.find((plan) => plan.name === "Assistant")?.tabs || [];
      } else if (plan._id === "647895cf404e31bfe8753398") {
        fetchedTabs = plans.find((plan) => plan.name === "Assistant Basic")?.tabs || [];
      } else if (plan._id === "6478970a404e31bfe87533a0") {
        fetchedTabs = plans.find((plan) => plan.name === "Assistant Pro")?.tabs || [];
      }
    }
    return (
      <Navigation>
        {mobile ? 
        <MobileTopNavbar>
          <Link href="/">
              <LogoContainer>
                  <Image style={{ width: "auto", height: "100%" }}  src={logoImage} alt={'logo'}></Image> 
              </LogoContainer> 
          </Link>
          <HiMenu onClick={handleOpenMobileMenu} style={{width: "2.4rem", height: "2.4rem", color: "black"}}/>
        </MobileTopNavbar>
        :
        <>
          <Centered>
            <Link href="/">
            <LogoContainer>
              <Image style={{ width: "auto", height: "100%" }}  src={logoImage} alt={'logo'}></Image> 
            </LogoContainer> 
            </Link>
          </Centered>
        </>
        }
        {fetchedTabs.map((tab) => (
          <div id={tab.id} key={tab.id}>
            {!(tab.path.includes(pathname)) ? (
              mobile ?
              <>
              {tab.locked ?
                <SlideBottom>
                  <NavigationTab hover={isHovered} title={tab.title} onClick={handleLockedClick}>
                    <Locked><Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image> </Locked>
                    <NavigationIcon>{tab.icon}</NavigationIcon>
                    <NavigationText>{tab.title}</NavigationText>
                  </NavigationTab>
                </SlideBottom>
                :
                <SlideBottom>
                  <NavigationTab hover={isHovered} title={tab.title} onClick={() => router.push(`${tab.path}`)}>
                    <NavigationIcon>{tab.icon}</NavigationIcon>
                    <NavigationText>{tab.title}</NavigationText>
                  </NavigationTab>
                </SlideBottom>
              }
              </>
              :
              <>
              {tab.locked ?
                <NavigationTab hover={isHovered} title={tab.title} onClick={handleLockedClick}>
                  <Locked>{!isHovered && <Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image>}</Locked>
                  <NavigationIcon>{tab.icon}</NavigationIcon>
                  {isHovered && <NavigationText>{tab.title}</NavigationText>}
                </NavigationTab>
                :
                <NavigationTab hover={isHovered} title={tab.title} onClick={() => router.push(`${tab.path}`)}>
                  <NavigationIcon>{tab.icon}</NavigationIcon>
                  {isHovered && <NavigationText>{tab.title}</NavigationText>}
                </NavigationTab>
              }
              </>
            ) : (
              mobile ?
              <SlideBottom>
                <SelectedNavigationTab hovered={isHovered}>
                  <SelectedNavigationIcon>{tab.icon}</SelectedNavigationIcon>
                  <SelectedNavigationText>{tab.title}</SelectedNavigationText>
                </SelectedNavigationTab>
              </SlideBottom>
              :
              <SelectedNavigationTab hovered={isHovered}>
                <SelectedNavigationIcon>{tab.icon}</SelectedNavigationIcon>
                {isHovered && <NavigationText>{tab.title}</NavigationText>}
              </SelectedNavigationTab>
            )}
          </div>
        ))}
      </Navigation>
    );
  }, [user, mobile, pathname, router, isHovered]);



  return (
      <>
      {openAddTeammateModal && <AddTeammate onClose={() => setOpenAddTeammateModal(false)} />}
      {openSubscriptionModal && <UpgradeSubscription onClose={() => setOpenSubscriptionModal(false)} />}
      {mobile &&
      <Navbar 
        variants={animationVariants}
        animate={openMobile ? "visible" : "hidden"}
        initial="hidden"
        layout="position"
        style={{ willChange: "transform" }}
      >
        {memoizedNavigationTabs}
        <ProfileContainer id="profile-tab">
            {!(pathname.includes("assets")) ? 
              <CustomAIContainer>
              {plan._id === "647895cf404e31bfe8753398" ?
                <NavigationTab hover={isHovered} title="Resources" onClick={handleLockedClick}>
                  <NavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></NavigationIcon>
                    <NavigationText>Resources</NavigationText>
                    <Locked><Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image> </Locked>
                </NavigationTab>
              :
                <NavigationTab hover={isHovered} title="Resources" onClick={() => router.push(`/assets`)}>
                  <NavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></NavigationIcon>
                    <NavigationText>Resources</NavigationText>
                </NavigationTab>
                }
              </CustomAIContainer>
              :
              <CustomAIContainer>
              <SelectedNavigationTab hovered={isHovered}>
                <SelectedNavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></SelectedNavigationIcon>
                {plan._id !== "647895cf404e31bfe8753398" && 
                 <NavigationText>Resources</NavigationText>
                }
                {plan._id === "647895cf404e31bfe8753398" &&
                        <Locked><Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image> </Locked>
                  }
              </SelectedNavigationTab>
              </CustomAIContainer>
            }
          <NameContainer hover={isHovered}  onClick={(e) => router.push("/profile")}>
            <FakeProfile>
              <BsFillFilePersonFill style={{height: "100%", width: "auto"}}/>
            </FakeProfile> 
            <PersonName>{user.name}</PersonName>
          </NameContainer>
        </ProfileContainer>
  
      </Navbar>
      }
      {!mobile &&
          <Navbar 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
          >
            {memoizedNavigationTabs}
            <ProfileContainer id="profile-tab">
                {!(pathname.includes("assets")) ? 
                  <CustomAIContainer>
                  {plan._id === "647895cf404e31bfe8753398" ? 
                  <NavigationTab hover={isHovered} title="Resources" onClick={handleLockedClick}>
                    <NavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></NavigationIcon>
                      {isHovered && <NavigationText>Resources</NavigationText>}
                      <Locked>{!isHovered && <Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image>} </Locked>
                  </NavigationTab>
                  :
                  <NavigationTab hover={isHovered} title="Resources" onClick={() => router.push(`/assets`)}>
                    <NavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></NavigationIcon>
                      {isHovered && <NavigationText>Resources</NavigationText>}
                  </NavigationTab>
                  }
                  </CustomAIContainer>
                  :
                  <CustomAIContainer>
                  <SelectedNavigationTab hovered={isHovered}>
                    <SelectedNavigationIcon><BsFillArchiveFill style={{height: "100%", width: "auto"}}/></SelectedNavigationIcon>
                    {plan._id !== "647895cf404e31bfe8753398" && 
                      isHovered && <NavigationText>Resources</NavigationText>
                    }
                    {plan._id === "647895cf404e31bfe8753398" &&
                      <Locked>{!isHovered && <Image style={{ width: "auto", height: "70%" }}  src={lock} alt={'locked'}></Image>} </Locked>
                    }
                  </SelectedNavigationTab>
                  </CustomAIContainer>
                }
              <NameContainer hover={isHovered}  onClick={(e) => router.push("/profile")}>
                <FakeProfile>
                  <BsFillFilePersonFill style={{height: "100%", width: "auto"}}/>
                </FakeProfile> 
              {mobile ?
                <PersonName>{user.name}</PersonName>
                :
                <>
                {isHovered && <PersonName>{user.name}</PersonName>}
                </>
              }
              </NameContainer>
            </ProfileContainer>
      
          </Navbar>
      }
      </>
    );

};

export default NavigationBar;


const Navbar = styled(motion.div)`
  position: fixed;
  height: calc(100vh - 1.5rem);
  width: 4rem;
  margin-top: 0.75rem;
  overflow: hidden;
  padding: 1rem 0rem 0 0rem;
  align-items: center;
  top: 0;
  left: 0;
  border: 2px solid #EAEDF5;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 5px rgba(15, 27, 40, 0.2), 0px -20px 20px #EEF1FA;
  background: white;
  z-index: 16;
  flex-direction: column;
  transition: all 0.4s ease;
  @media (min-width: 1023px) {
    &:hover {
      width: 17rem;
      align-items: flex-start;
      padding: 1rem 1.2rem 0 1.2rem;
    }
  }
  @media (max-width: 1023px) {
    width: 100vw;
    transition: all 0.4s ease;
    background: white;
    align-items: flex-start;
    box-shadow: none;
    box-shadow: 0 4px 10px 0 rgba(31, 38, 135, 0.15);
    border-top: none;
    margin-top: 0;
    margin-left: 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    padding: 0.5rem 1rem 0 1rem;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
}
`

const MobileTopNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  min-width: 1.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  margin-right: 0;
  position: relative;
  @media (max-width: 1023px) {
    width: 2rem;
    height: 2rem;
    margin-left: 0rem;
    margin-bottom: 0;
    margin-right: 0;
}
`

const Navigation = styled.div`
  padding: 0rem;
  width: 100%;
  @media (max-width: 1023px) {
    display: block;
    &::-webkit-scrollbar {
      display: none;
  }
  }
`

const NavigationTab = styled.div<{ title: string, hover: boolean }>`
  padding: 0rem 1.2rem 0rem 1.2rem;
  margin-top: 1rem;
  position: relative;
  display: flex;
  height: 2.75rem;
  align-items: center;
  justify-content: ${props => props.hover ? "flex-start" : "center"};
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  width: 100%;
  transition: all 0.15s ease;
  @media (min-width: 1023px) {
    &:hover {
      background-color: #F3F7FA;
    }
  }
  @media (max-width: 1023px) {
    margin-top: 3vh;
    height: auto;
    border: 2px solid #E9EFF6;
    display: ${props => props.title === "Copywriting" ? "none" : "flex"};
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    border-radius: 12px;
    box-shadow: 3px 3px 5px rgba(22, 27, 29, 0.23), -3px -3px 5px #FAFBFF;
    justify-content: flex-start;
    transition: all 0.4s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: none;
    }
  }
`

const Locked = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: flex-start;
  padding-left: 1.75rem;
  padding-top: 0.5rem;
  align-items: flex-end;
  color: black;
  z-index: 1;
  @media (max-width: 1023px) {
    padding-left: 0.75rem;
    padding-top: 0.75rem;
  }
`


const NavigationIcon = styled.div`
  position: relative;
  width: 1rem;
  height: 1rem;
  color: black;
  @media (max-width: 1023px) {
    width: 1.2rem;
    height: 1.2rem;
    background: -webkit-linear-gradient(45deg, #F7A097, #E497FF, #7EC5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: black;
  }
`

const NavigationText= styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1rem;
  color: black;
  @media (max-width: 1023px) {
    color: black;
    font-size: 1.2rem;
    margin-left: 1rem;
    z-index: 1;
  }
`

const SelectedNavigationText= styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 1rem;
  color: black;
  @media (max-width: 1023px) {
    color: black;
    font-size: 1.2rem;
    margin-left: 1rem;
`

const SelectedNavigationTab = styled.div<{hovered: boolean}>`
  width: 100%;
  padding: 0.7rem 1.2rem 0.7rem 1.2rem;
  box-shadow: inset 3px 3px 5px rgba(22, 27, 29, 0.23), inset -3px -3px 5px #FAFBFF;
  display: flex;
  white-space: nowrap;
  margin-top: 1rem;
  align-items: center;
  border: double 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  display: flex;
  @media (min-width: 1023px) {
    padding: ${props => props.hovered ? "0.7rem 1.2rem 0.7rem 1.2rem" : "0.7rem 0.8rem 0.7rem 0.8rem"};
    margin-left: ${props => props.hovered ? "0rem" : "0.35rem"};
    width: ${props => props.hovered ? "100%" : "80%"};
  }
  @media (max-width: 1023px) {
    margin-top: 2vh;
    background-color: transparent;
    border-radius: 12px;
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    justify-content: flex-start;
  }
`

const SelectedNavigationIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: black;
  @media (max-width: 1023px) {
    width: 1.2rem;
    height: 1.2rem;
    background: -webkit-linear-gradient(45deg, #F7A097, #E497FF, #7EC5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: black;
  }
`

const ProfileContainer = styled.div`
  padding: 1rem 0 1rem 0;
  width: 100%;
  @media (max-width: 1023px) {
    display: flex;
    border-top: solid 2px rgba(220, 220, 220, 0.25);
    z-index: 1;
    flex-wrap: wrap;
    padding: 0rem 0 1.5rem 0;
    margin-top: 1rem;
    postion: absolute;
    bottom: 0;
    left: 0;
    background-color: white;
  }
`

const FakeProfile = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  cursor: pointer;
  color: black;
  @media (max-width: 1023px) {
    margin-right: 1.25rem;
    width: 2rem;
    height: 2rem;
  }
`

const SwitchIcon = styled.div`
    width: 1.7vh;
    height: 1.7vh;
    margin-left: 0.4rem;
    cursor: pointer;
    display: none;
`

const PersonName = styled.div`
  font-weight: 600;
  color: black;
  display: flex;
  margin-left: 0.7rem;
  margin-right: 0.5rem;
  align-items: center;
  cursor: pointer;
  &:hover ${SwitchIcon} {
    display: block;
  }
  @media (max-width: 1023px) {
    margin-right: 2rem;
    margin-left: 0rem;
    font-size: 1.2rem;
  }
`

const DropdownContainer = styled.div`
    position: absolute;
    z-index: 100;
    padding: 1vh 0 0 2vh;
    bottom: 12vh;
    left: 2rem;
`
const FreeElixirBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  white-space: nowrap;
  color: white;
  font-weight: 500;
  width: 100%;
  padding: 0.3rem 1.2rem 0.3rem 1.2rem;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 110%;
  background-position-x: -1rem;
  margin-right: 1.5rem;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  }
`

const CustomAIContainer = styled.div`
  width: 100%;
`

const NameContainer = styled.div<{hover: boolean}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;
  @media (min-width: 1023px) {
    border-top: solid 2px rgba(220, 220, 220, 0.25);
    margin-left: ${props => props.hover ? '1rem' : '0'};
    padding: 1rem 0 0.5rem 0;
    justify-content: ${props => props.hover ? 'flex-start' : 'center'};
  }
  @media (max-width: 1023px) {
    margin-top: 1.5rem;
    justify-content: center;
    width: 100%;
  }
`