import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "@/components/Common/NavigationBar";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCommand, BsChevronRight } from "react-icons/bs";
import { BiBookAlt } from "react-icons/bi";
import placeholderIcon from "@/public/images/actIcon.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import TextArea from "@/components/forms/TextArea";
import { ProfileCard } from "@/components/Lab/ProfileCard";
import LinkedInIcon from "@/public/images/linkedin-color.png";
import FacebookIcon from "@/public/images/facebook-color.png";
import { IoRefreshOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { CampaignDropdown } from "@/components/Camapigns/Modal/CampaignDropdwon";

interface ProfileProps {
  id: number;
  icon: StaticImageData;
  name: string;
  type: string;
  baseText: string;
  description: string;
}

const LabPage = () => {
  const socialMediaArray = [
    {
      name: "Linkedin Post",
      icon: LinkedInIcon,
    },
    {
      name: "Facebook post",
      icon: FacebookIcon,
    },
    {
      name: "Linkedin 1",
      icon: LinkedInIcon,
    },
    {
      name: "Facebook 1",
      icon: FacebookIcon,
    },
    {
      name: "Linkedin 2",
      icon: LinkedInIcon,
    },
    {
      name: "Facebook 2",
      icon: FacebookIcon,
    },
  ];

  const profileData: ProfileProps[] = [
    {
      id: 1,
      name: "Amanda",
      icon: placeholderIcon,
      type: "Persona",
      baseText:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam ad odio totam tenetur laborum accusamus ratione sunt velit libero quo eum maxime magni molestias quasi, recusandae deserunt veritatis in a cumque facere deleniti repellendus voluptatum, sed cum. Exercitationem, dolor enim.",
      description:
        "Here will be editable, detailed description of your tone of voice or persona",
    },
    {
      id: 2,
      name: "Yepp AI",
      icon: placeholderIcon,
      type: "Tone of voice",
      baseText:
        "222222 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam ad odio totam tenetur laborum accusamus ratione sunt velit libero quo eum maxime magni molestias quasi, recusandae deserunt veritatis in a cumque facere deleniti repellendus voluptatum, sed cum. Exercitationem, dolor enim.",
      description:
        "22222 Here will be editable, detailed description of your tone of voice or persona ",
    },
  ];

  const [currentProfile, setCurrentProfile] = useState<ProfileProps>();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [filteredProfiles, setFilteredProfiles] =
    useState<ProfileProps[]>(profileData);
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);
  const [openedCategory, setOpenedCategory] = useState<string>("");
  const [allChosenCategories, setAllChosenCategories] = useState<string[]>([]);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsSmallDevice(window.innerWidth < 1230);
    };

    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  useEffect(() => {
    const filtered = profileData.filter((profile) =>
      profile.name.toLowerCase().includes(searchPhrase.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [profileData, searchPhrase]);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        baseText: event.target.value,
      };
      setCurrentProfile(updatedProfile);
    }
  };

  return (
    <Page className="flex flex-col gap-4">
      <NavigationBar />
      <PageContainer
        className=" items-center h-full flex w-full text-black "
        style={{ height: "100%" }}
      >
        <div className="flex justify-between gap-4  w-full items-center">
          <div className="flex lg:gap-4 gap-1 items-center">
            <LabTitle className="text-2xl">Tone of voice Lab</LabTitle>
            <div className="flex items-center justify-center py-2 lg:px-6 rounded-2xl lg:bg-slate-100">
              <GradientText className="text-center lg:text-md text-xs uppercase">
                Beta
              </GradientText>
            </div>
          </div>
          <BlueButton style={{ padding: "0.5rem 3.5vw 0.5rem 3.5vw" }}>
            <span className="flex items-center gap-[1vw]">
              + <span> Create new </span>
            </span>
          </BlueButton>
        </div>
        <div></div>
      </PageContainer>
      <div className="flex lg:flex-row flex-col gap-4">
        <PageContainer
          className="lg:w-[20%] w-full gap-8 flex flex-col justify-between text-black lg:h-auto h-[100vh]"
          style={{ padding: "1.5rem" }}
        >
          <div className="flex flex-col gap-8 w-full">
            <InputContainer className="flex gap-2 items-center">
              <AiOutlineSearch className="w-6 h-6 fill-black" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent w-full"
                onChange={(e) => setSearchPhrase(e.target.value)}
              />
              {!isSmallDevice && (
                <div className="flex items-center gap-[1vw]">
                  <BsCommand className="w-4 h-4 fill-black" />
                  <span>F</span>
                </div>
              )}
            </InputContainer>
            <div className="w-full flex flex-col gap-4">
              {filteredProfiles.map((profile) => {
                const isProfileActicve = currentProfile?.id === profile.id;
                return (
                  <div
                    className={`flex border  w-full justify-between rounded-2xl p-2 ${
                      isProfileActicve ? "bg-slate-300" : ""
                    }`}
                    onClick={() => setCurrentProfile(profile)}
                    key={profile.id}
                  >
                    <ProfileCard
                      type={profile.type}
                      name={profile.name}
                      icon={profile.icon}
                    />
                    {isProfileActicve && (
                      <div className="flex items-center">
                        <BsChevronRight className="lg:h-[1.5vw] lg:w-[1.5vw] h-[4vw] w-[4vw]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <BlueButton>
              <span className="text-center items-center flex gap-2">
                + {!isSmallDevice && <Text>Create New</Text>}
              </span>
            </BlueButton>
          </div>
        </PageContainer>
        <PageContainer
          style={{ padding: "1.5rem 2vw 1.5rem 2vw" }}
          className="lg:w-[40%] w-full flex flex-col gap-8 justify-between lg:h-auto h-[100vh]  text-black "
        >
          <div className="flex w-full flex-col gap-8 h-full">
            <div className="flex gap-4 items-center w-full">
              <BiBookAlt className="w-8 h-8" />
              <h3 style={{ fontWeight: 800 }}>Base</h3>
            </div>
            <TextArea
              padding="1rem"
              height="100%"
              value={currentProfile ? currentProfile.baseText : ""}
              disabled={!currentProfile}
              onChange={handleTextAreaChange}
              className="overflow-scroll"
            />
          </div>
          <div>
            <BlueButton className="flex gap-4 items-center">
              <FaGraduationCap className="h-6 w-6" />
              <span> Teach AI </span>
            </BlueButton>
          </div>
        </PageContainer>
        <PageContainer
          style={{ padding: "1.5rem 2vw 1.5rem 2vw" }}
          className="lg:w-[40%] w-full text-black lg:h-auto h-full overflow-scroll"
        >
          {currentProfile && (
            <div className="flex flex-col ">
              <div className="flex justify-between items-center lg:pb-[1vw] pb-4">
                <ProfileCard
                  type={currentProfile.type}
                  icon={currentProfile.icon}
                  name={currentProfile.name}
                />
                <div className="flex gap-4 h-full ">
                  <button className="flex items-center  justify-center py-2 px-[2.5vw]  rounded-2xl bg-slate-100">
                    <GradientText style={{ fontSize: "1rem" }}>
                      Try now
                    </GradientText>
                  </button>
                  <button
                    className="flex items-center  justify-center py-2 px-[2vw] lg:px-6 rounded-2xl bg-slate-100"
                    style={{ fontWeight: 600 }}
                  >
                    ? About
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[0.8vw]">
                <span
                  style={{ fontWeight: 500 }}
                >{`${currentProfile.name} description`}</span>
                <TextArea
                  padding="1rem"
                  height="10rem"
                  value={currentProfile.description}
                  className="overflow-scroll"
                />
                <BlueButton
                  className="self-end"
                  style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                >
                  Save
                </BlueButton>
              </div>
              <div className="flex flex-col gap-[0.8vw]">
                <h4
                  className="w-full border-b border-slate-200 pb-2"
                  style={{ fontWeight: 600 }}
                >
                  Example output
                </h4>
                <div
                  className={`flex ${
                    isSmallDevice && "  flex-col"
                  } flex-row justify-between items-center `}
                >
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%]"
                    } flex flex-col gap-2 w-[47%]`}
                  >
                    <span style={{ fontWeight: 500 }}>Placement</span>
                    <CampaignDropdown
                      values={socialMediaArray}
                      category={socialMediaArray[0]}
                      openedCategory={openedCategory}
                      setOpenedCategory={setOpenedCategory}
                      setAllChosenCategories={setAllChosenCategories}
                    />
                  </div>
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%]"
                    } flex flex-col gap-2 w-[47%]`}
                  >
                    <span style={{ fontWeight: 500 }}>About</span>
                    <div className="pl-2">
                      <InputContainer>
                        <input type="text" className="w-full" />
                      </InputContainer>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center justify-center">
                <div className="flex gap-4 h-full flex-col p-6 shadow-2xl mt-[4rem] rounded-2xl border-2  border-[#ECEEF2]">
                  <div
                    className={`flex items-center w-full ${
                      !isSmallDevice && "justify-between"
                    }`}
                  >
                    <div className="flex gap-4  items-center w-full">
                      <div className="relative w-8 h-8 rounded-xl overflow-hidden">
                        <Image
                          src={socialMediaArray[0].icon}
                          fill
                          alt="social media icon"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <GeneratedTextTitle>
                          {socialMediaArray[0].name}
                        </GeneratedTextTitle>
                        <GeneratedTextDate>07.07.2023</GeneratedTextDate>
                      </div>
                    </div>
                    <button className="flex px-[1.5vw] gap-4 items-center  py-1 bg-slate-200 rounded-2xl">
                      <IoRefreshOutline className="w-4 h-4" />
                      <Text style={{ fontWeight: 500 }}>Rewrite</Text>
                    </button>
                  </div>
                  <GeneratedTextContainer>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eum sequi animi ex exercitationem est deleniti quasi nemo
                      accusantium natus doloremque consectetur, omnis excepturi
                      harum nesciunt iusto laboriosam rerum esse nobis sint ea
                      provident? Rem nobis ullam officia neque eius! Officia?
                    </p>
                  </GeneratedTextContainer>
                </div>
              </div>
            </div>
          )}
        </PageContainer>
      </div>
    </Page>
  );
};

const LabTitle = styled.h2`
  font-weight: 700;
  @media (max-width: 1023px) {
    font-size: large;
  }
`;

const Text = styled.p`
  font-size: 0.9rem;
`;

const GeneratedTextContainer = styled.div`
  display: flex;
  overflow-y: scroll;
`;

const GradientText = styled.span`
  font-weight: 600;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  @media (max-width: 1023px) {
    font-size: 0.5rem;
  }
`;

const GeneratedTextTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const GeneratedTextDate = styled.span`
  font-size: 0.8rem;
  color: rgb(148 163 184);
`;

const ButtonText = styled.span`
  font-size: 1vw;
`;

const BlueButton = styled.button`
  display: flex;
  gap: 1rem;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  /* padding: 0.5rem 5vw 0.5rem 5vw; */
  padding: 0.5rem 3.5vw 0.5rem 3.5vw;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  @media (max-width: 1023px) {
    flex: 1;
    max-width: 16rem;
    padding: 0.5rem 4rem 0.5rem 4rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 0.2rem 1rem 0.2rem 1rem;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background-color: white;
  box-shadow: inset 1px 1px 5px rgba(15, 27, 40, 0.2),
    inset -1px -1px 4px #fafbff;
  border: solid 2px #eceef2;
  color: black;
  font-weight: 500;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #a7acbc;
    font-weight: 200;
  }
  :-ms-input-placeholder {
    color: #a7acbc;
    font-weight: 200;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0.75rem 1rem 0.75rem 5rem;
  height: auto;
  background-color: #eef1fa;
  color: white;
  position: absolute;
  @media (max-width: 1023px) {
    padding: 4.5rem 0.5rem 0.5rem 0.5rem;
    min-height: 100vh;
  }
`;

const PageContainer = styled.div`
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  height: calc(100vh - 9rem);

  @media (max-width: 1023px) {
    height: 100vh;
    padding: 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;

export default LabPage;
