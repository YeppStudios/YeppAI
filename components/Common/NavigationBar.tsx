import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import logoImage from "../../public/images/logo.png";
import {
  BsFillFilePersonFill,
  BsPencilFill,
  BsFillChatTextFill,
  BsFillFileTextFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SlideBottom from "../Animated/SlideBottom";
import lock from "../../public/images/lock.png";
import Centered from "../Centered";
import AddTeammate from "../Modals/AddingModals/AddTeammate";
import { selectedUserState } from "../../store/userSlice";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import UpgradeSubscription from "../Modals/InformationalModals/UpgradeSubscription";
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { motion, useAnimation } from "framer-motion";
import ColorfulText from "./ColorfulText";
import { MdCampaign } from "react-icons/md";

const tabs = [
  {
    title: "Marketing",
    icon: <BsPencilFill style={{ height: "100%", width: "auto" }} />,
    path: "/marketing",
    id: "navbar-content-creator",
  },
  {
    title: "Copywriting",
    icon: <BsFillFileTextFill style={{ height: "100%", width: "auto" }} />,
    path: "/copywriting",
    id: "navbar-editor-ai",
  },
  {
    title: "Chat",
    icon: <BsFillChatTextFill style={{ height: "100%", width: "auto" }} />,
    path: "/chat",
    id: "navbar-chat",
  },
  {
    title: "Prompts",
    icon: <FaSearch style={{ height: "100%", width: "auto" }} />,
    path: "/prompts",
    id: "navbar-prompts",
  },
  // {
  //   title: "Campaigns",
  //   icon: <MdCampaign style={{ height: "100%", width: "auto" }} />,
  //   path: "/campaign",
  //   id: "navbar-campaign",
  // },

  // {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>, path: "/ideacreator", id: "navbar-idea-creator"},
];

const animationVariants = {
  visible: {
    transition: { duration: 0.35, type: "spring" },
    height: "85vh",
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
  const plan = useSelector(selectedPlanState);
  const [isHovered, setIsHovered] = useState(false);
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (window.innerWidth <= 1023) {
      setMobile(true);
    }
    setCountry(localStorage.getItem("country") || "");
  }, [user]);

  const handleTabClick = (path: string) => {
    if (path === "/copywriting" && mobile) {
      alert("For now copywriting is available only for desktop devices.");
    } else if (path === "/prompts" && country !== "Poland") {
      alert(
        "We will launch Prompts tab ASAP! It will help you in things like writing the best sales copy, writing converting cold emails, determining target audience and much more."
      );
    } else {
      router.push(`${path}`);
    }
  };

  const handleOpenMobileMenu = () => {
    setOpenMobile((prevOpenMobile) => !prevOpenMobile);
  };

  const memoizedNavigationTabs = useMemo(() => {
    return (
      <Navigation>
        {mobile ? (
          <MobileTopNavbar>
            <Link href="/">
              <LogoContainer background={logoImage}></LogoContainer>
            </Link>
            <HiMenu
              onClick={handleOpenMobileMenu}
              style={{ width: "2.4rem", height: "2.4rem", color: "black" }}
            />
          </MobileTopNavbar>
        ) : (
          <>
            <Centered>
              <Link href="/">
                <LogoContainer background={logoImage}></LogoContainer>
              </Link>
            </Centered>
          </>
        )}
        {tabs.map((tab) => (
          <div id={tab.id} key={tab.id}>
            {!(tab.path.includes(pathname) && pathname !== "/") ? (
              mobile ? (
                <>
                  <SlideBottom>
                    <NavigationTab
                      country={country}
                      hover={isHovered}
                      title={tab.title}
                      onClick={() => handleTabClick(tab.path)}
                    >
                      <NavigationIcon>{tab.icon}</NavigationIcon>
                      <NavigationText>{tab.title}</NavigationText>
                      {(tab.title === "Prompts" && country !== "Poland") && (
                        <ComingSoon>
                          <ColorfulText>
                            <b>Coming soon</b>
                          </ColorfulText>
                        </ComingSoon>
                      )}
                    </NavigationTab>
                  </SlideBottom>
                </>
              ) : (
                <>
                  <NavigationTab
                    country={country}
                    hover={isHovered}
                    title={tab.title}
                    onClick={() => handleTabClick(tab.path)}
                  >
                    <NavigationIcon>{tab.icon}</NavigationIcon>
                    {isHovered && <NavigationText>{tab.title}</NavigationText>}
                    {(tab.title === "Prompts" && country !== "Poland") && isHovered && (
                      <ComingSoon>
                        <ColorfulText>
                          <b>Coming soon</b>
                        </ColorfulText>
                      </ComingSoon>
                    )}
                  </NavigationTab>
                </>
              )
            ) : mobile ? (
              <SlideBottom>
                <SelectedNavigationTab hovered={isHovered}>
                  <SelectedNavigationIcon>{tab.icon}</SelectedNavigationIcon>
                  <SelectedNavigationText>{tab.title}</SelectedNavigationText>
                </SelectedNavigationTab>
              </SlideBottom>
            ) : (
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
      {openAddTeammateModal && (
        <AddTeammate onClose={() => setOpenAddTeammateModal(false)} />
      )}
      {openSubscriptionModal && (
        <UpgradeSubscription
          onClose={() => setOpenSubscriptionModal(false)}
          closeable={true}
          purchase={true}
        />
      )}
      {mobile && (
        <Navbar
          variants={animationVariants}
          animate={openMobile ? "visible" : "hidden"}
          initial="hidden"
          layout="position"
          style={{ willChange: "transform" }}
        >
          {memoizedNavigationTabs}
          <ProfileContainer id="profile-tab">
            {!pathname.includes("assets") ? (
              <CustomAIContainer>
                <NavigationTab
                  country={country}
                  hover={isHovered}
                  title="Assets"
                  onClick={() => router.push(`/assets`)}
                >
                  <NavigationIcon>
                    <BsFillArchiveFill
                      style={{ height: "100%", width: "auto" }}
                    />
                  </NavigationIcon>
                  <NavigationText>Assets</NavigationText>
                </NavigationTab>
              </CustomAIContainer>
            ) : (
              <CustomAIContainer>
                <SelectedNavigationTab hovered={isHovered}>
                  <SelectedNavigationIcon>
                    <BsFillArchiveFill
                      style={{ height: "100%", width: "auto" }}
                    />
                  </SelectedNavigationIcon>
                  {plan._id !== "647895cf404e31bfe8753398" && (
                    <NavigationText>Assets</NavigationText>
                  )}
                </SelectedNavigationTab>
              </CustomAIContainer>
            )}
            <NameContainer
              hover={isHovered}
              onClick={(e) => router.push("/profile")}
            >
              <FakeProfile>
                <BsFillFilePersonFill
                  style={{ height: "100%", width: "auto" }}
                />
              </FakeProfile>
              <PersonName>{user.name}</PersonName>
            </NameContainer>
          </ProfileContainer>
        </Navbar>
      )}
      {!mobile && (
        <Navbar
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {memoizedNavigationTabs}
          <ProfileContainer id="profile-tab">
            {!pathname.includes("assets") && pathname !== "/" ? (
              <CustomAIContainer>
                <NavigationTab
                  country={country}
                  hover={isHovered}
                  title="Assets"
                  onClick={() => router.push(`/assets`)}
                >
                  <NavigationIcon>
                    <BsFillArchiveFill
                      style={{ height: "100%", width: "auto" }}
                    />
                  </NavigationIcon>
                  {isHovered && <NavigationText>Assets</NavigationText>}
                </NavigationTab>
              </CustomAIContainer>
            ) : (
              <CustomAIContainer>
                <SelectedNavigationTab hovered={isHovered}>
                  <SelectedNavigationIcon>
                    <BsFillArchiveFill
                      style={{ height: "100%", width: "auto" }}
                    />
                  </SelectedNavigationIcon>
                  {isHovered && <NavigationText>Assets</NavigationText>}
                </SelectedNavigationTab>
              </CustomAIContainer>
            )}
            <NameContainer
              hover={isHovered}
              onClick={(e) => router.push("/profile")}
            >
              <FakeProfile>
                <BsFillFilePersonFill
                  style={{ height: "100%", width: "auto" }}
                />
              </FakeProfile>
              {mobile ? (
                <PersonName>{user.name}</PersonName>
              ) : (
                <>{isHovered && <PersonName>{user.name}</PersonName>}</>
              )}
            </NameContainer>
          </ProfileContainer>
        </Navbar>
      )}
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
  border: 2px solid #eaedf5;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 2px 2px 5px rgba(15, 27, 40, 0.2), 0px -20px 20px #eef1fa;
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
`;

const MobileTopNavbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div<{ background: any }>`
  width: 1.5rem;
  height: 2rem;
  overflow: visible;
  margin-bottom: 1rem;
  cursor: pointer;
  margin-right: 0;
  background-image: url(${(props) => props.background.src});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
  @media (max-width: 1023px) {
    width: 2.3rem;
    height: 2.3rem;
    margin-left: 0rem;
    margin-bottom: 0;
    margin-right: 0;
  }
`;

const Navigation = styled.div`
  padding: 0rem;
  width: 100%;
  @media (max-width: 1023px) {
    display: block;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NavigationTab = styled.div<{ title: string; hover: boolean, country: string }>`
  padding: 0rem 1.2rem 0rem 1.2rem;
  margin-top: 1rem;
  position: relative;
  display: flex;
  height: 2.75rem;
  align-items: center;
  justify-content: ${(props) => (props.hover ? "flex-start" : "center")};
  color: black;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  color: ${(props) => ((props.title === "Prompts" && props.country !== "Poland") ? "#DCDCDC" : "black")};
  border-radius: 10px;
  width: 100%;
  transition: all 0.15s ease;
  @media (min-width: 1023px) {
    &:hover {
      background-color: #f3f7fa;
    }
  }
  @media (max-width: 1023px) {
    margin-top: 3vh;
    height: auto;
    border: 2px solid #e9eff6;
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    border-radius: 12px;
    color: ${(props) =>
      props.title === "Copywriting" || (props.title === "Prompts" && props.country !== "Poland")
        ? "#DCDCDC"
        : "black"};
    box-shadow: ${(props) =>
      props.title === "Copywriting" || (props.title === "Prompts" && props.country !== "Poland")
        ? "none"
        : "3px 3px 5px rgba(22, 27, 29, 0.23), -3px -3px 5px #FAFBFF"};
    justify-content: flex-start;
    transition: all 0.4s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: none;
    }
  }
`;

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
`;

const NavigationIcon = styled.div`
  position: relative;
  width: 1rem;
  height: 1rem;
  @media (max-width: 1023px) {
    width: 1.2rem;
    height: 1.2rem;
    background: -webkit-linear-gradient(45deg, #f7a097, #e497ff, #7ec5ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavigationText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1rem;
  @media (max-width: 1023px) {
    font-size: 1.2rem;
    margin-left: 1rem;
    z-index: 1;
  }
`;

const SelectedNavigationText = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-left: 1rem;
  @media (max-width: 1023px) {
    font-size: 1.2rem;
    margin-left: 1rem;
`;

const SelectedNavigationTab = styled.div<{ hovered: boolean }>`
  width: 100%;
  padding: 0.7rem 1.2rem 0.7rem 1.2rem;
  box-shadow: inset 3px 3px 5px rgba(22, 27, 29, 0.23),
    inset -3px -3px 5px #fafbff;
  display: flex;
  color: black;
  white-space: nowrap;
  margin-top: 1rem;
  align-items: center;
  border: double 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(white, white, white),
    radial-gradient(circle at top left, #6578f8, #64b5ff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  display: flex;
  @media (min-width: 1023px) {
    padding: ${(props) =>
      props.hovered
        ? "0.7rem 1.2rem 0.7rem 1.2rem"
        : "0.7rem 0.8rem 0.7rem 0.8rem"};
    margin-left: ${(props) => (props.hovered ? "0rem" : "0.35rem")};
    width: ${(props) => (props.hovered ? "100%" : "80%")};
  }
  @media (max-width: 1023px) {
    margin-top: 2vh;
    background-color: transparent;
    border-radius: 12px;
    padding: 0.75rem 1.5rem 0.75rem 1.5rem;
    justify-content: flex-start;
  }
`;

const SelectedNavigationIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: black;
  @media (max-width: 1023px) {
    width: 1.2rem;
    height: 1.2rem;
    background: -webkit-linear-gradient(45deg, #f7a097, #e497ff, #7ec5ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: black;
  }
`;

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
`;

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
`;

const SwitchIcon = styled.div`
  width: 1.7vh;
  height: 1.7vh;
  margin-left: 0.4rem;
  cursor: pointer;
  display: none;
`;

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
`;

const DropdownContainer = styled.div`
  position: absolute;
  z-index: 100;
  padding: 1vh 0 0 2vh;
  bottom: 12vh;
  left: 2rem;
`;
const FreeElixirBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
    inset -2px -2px 4px #fafbff, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  white-space: nowrap;
  color: white;
  font-weight: 500;
  width: 100%;
  padding: 0.3rem 1.2rem 0.3rem 1.2rem;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  background-size: 110%;
  background-position-x: -1rem;
  margin-right: 1.5rem;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
      inset -2px -2px 4px #fafbff;
  }
`;

const CustomAIContainer = styled.div`
  width: 100%;
`;

const NameContainer = styled.div<{ hover: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1rem;
  @media (min-width: 1023px) {
    border-top: solid 2px rgba(220, 220, 220, 0.25);
    margin-left: ${(props) => (props.hover ? "1rem" : "0")};
    padding: 1rem 0 0.5rem 0;
    justify-content: ${(props) => (props.hover ? "flex-start" : "center")};
  }
  @media (max-width: 1023px) {
    margin-top: 1.5rem;
    justify-content: center;
    width: 100%;
  }
`;

const ComingSoon = styled.div`
  font-size: 0.8rem;
  margin-left: 1rem;
`;
