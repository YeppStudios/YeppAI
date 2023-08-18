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
import { CampaignDropdown } from "@/components/Camapigns/Modal/CampaignDropdwon";
import LinkedInIcon from "@/public/images/linkedin-color.png";
import FacebookIcon from "@/public/images/facebook-color.png";

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
        "22222 Here will be editable, detailed description of your tone of voice or persona",
    },
  ];

  const [currentProfile, setCurrentProfile] = useState<ProfileProps>();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filteredProfiles, setFilteredProfiles] =
    useState<ProfileProps[]>(profileData);
  const [openedCategory, setOpenedCategory] = useState<string>("");
  const [allChosenCategories, setAllChosenCategories] = useState<string[]>([]);

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
      <PageContainer className=" items-center h-full flex w-full text-black">
        <div className="flex justify-between  w-full items-center">
          <div className="flex gap-4 items-center">
            <h2 className="text-2xl">Tone of voice Lab</h2>
            <div className="flex items-center justify-center py-2 px-6 rounded-2xl bg-slate-100">
              <span className="text-center text-md uppercase">Beta</span>
            </div>
          </div>
          <button>Create new</button>
        </div>
        <div></div>
      </PageContainer>
      <div className="flex gap-4">
        <PageContainer
          className="w-[25%]  gap-8 flex flex-col text-black"
          style={{ padding: "1.5rem" }}
        >
          <InputContainer className="flex gap-2 items-center">
            <AiOutlineSearch className="w-6 h-6 fill-black" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-full"
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <BsCommand className="w-4 h-4 fill-black" />
              <span>F</span>
            </div>
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
                      <BsChevronRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </PageContainer>
        <PageContainer className="w-[40%] flex flex-col gap-8  text-black ">
          <div className="flex gap-8 items-center w-full">
            <BiBookAlt className="w-8 h-8" />
            <h3>Base</h3>
          </div>
          <TextArea
            padding="1rem"
            height="100%"
            value={currentProfile ? currentProfile.baseText : ""}
            disabled={!currentProfile}
            onChange={handleTextAreaChange}
          />
        </PageContainer>
        <PageContainer className="w-[40%] text-black">
          {currentProfile && (
            <div className="flex flex-col gap-8">
              <div className="flex justify-between">
                <ProfileCard
                  type={currentProfile.type}
                  icon={currentProfile.icon}
                  name={currentProfile.name}
                />
                <div className="flex gap-4">
                  <button>Try now</button>
                  <button>? About</button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span>{`${currentProfile.name} type`}</span>
                <TextArea
                  padding="1rem"
                  height="100%"
                  value={currentProfile.description}
                />
                <button className="self-end">Save</button>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="w-full border-b border-slate-200 pb-2">
                  Example output
                </h4>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 w-[45%]">
                    <span>Placement</span>
                    <CampaignDropdown
                      category={socialMediaArray[0]}
                      values={socialMediaArray}
                      openedCategory={openedCategory}
                      setOpenedCategory={setOpenedCategory}
                      setAllChosenCategories={setAllChosenCategories}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[50%]">
                    <span>About</span>
                    <InputContainer>
                      <input type="text" />
                    </InputContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageContainer>
      </div>
    </Page>
  );
};

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
    padding: 4.5rem 0rem 0rem 0rem;
    min-height: 100svh;
  }
`;

const PageContainer = styled.div`
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;

export default LabPage;
