import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiBookAlt } from "react-icons/bi";
import placeholderIcon from "@/public/images/actIcon.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import TextArea from "@/components/forms/TextArea";
import { ProfileCard } from "@/components/Lab/ProfileCard";
import { IoRefreshOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import ChoiceModal from "@/components/Lab/ChoiceModal";
import ToneModal from "@/components/Lab/ToneModal";
import PersonaModal from "@/components/Lab/PersonaModal";
import PageTemplate from "@/components/Common/PageTemplate";
import Input from "@/components/forms/Input";
import moment from "moment";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import { RiArrowRightSLine } from "react-icons/ri";
import ToneDropdown from "@/components/Lab/ToneDropdown";
import api from "./api";
import Label from "@/components/Common/Label";
import { BlueLoader, Loader } from "@/components/Common/Loaders";
import { defaultMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { useSelector } from "react-redux";
import { Menu, Transition } from '@headlessui/react'
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import { SlOptionsVertical } from "react-icons/sl";
import { Fragment } from 'react'
import { BsTrash } from "react-icons/bs";
import DeleteDoc from "@/components/Modals/DeletingModals/DeleteDocModal";
import { useRouter } from "next/router";
import { set } from "lodash";

interface ProfileProps {
  _id: string;
  icon: StaticImageData;
  title: string;
  type: string;
  prompt: string;
  base_text: string;
  description: string;
}

interface TemplateProps {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: any[];
  icon: string;
  query: string;
  prompt: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const LabPage = () => {

  const [currentSample, setCurrentSample] = useState<ProfileProps>();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileProps[]>();
  const [isSmallDevice, setIsSmallDevice] = useState<boolean>(false);
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateProps>();
  const [openModal, setOpenModal] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [testTextLoading, setTestTextLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("English");
  const [length, setLength] = useState<string>("250");
  const [about, setAbout] = useState<string>("");
  const [list, setList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [abortController, setAbortController] = useState(new AbortController());
  const [testText, setTestText] = useState<string>("");
  const [openNoElixirModal, setOpenNoElixirModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [baseText, setBaseText] = useState<string>("");

  const router = useRouter();
  const selectedMarketingAssistant = useSelector(defaultMarketingAssistantState);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const updateWindowSize = () => {
      setIsSmallDevice(window.innerWidth < 1325);
    };
    window.addEventListener("resize", updateWindowSize);
    
    const fetchTemplates = async () => {
      const { data } = await api.get("/templates");
      if (data) {
        setTemplates(data);
        setSelectedTemplate(data[0])
      } else {
        console.log("wrong fetch");
      }
    };


    const fetchList = async () => {
      try {
        const toneResponse = await api.get(`/tones/owner` ,{
          headers: {
            Authorization: token,
          }
        });
        const personaResponse = await api.get(`/personas/owner` ,{
          headers: {
            Authorization: token,
          }
        });
  
        // Add a 'type' field to each object in the tones and personas arrays
        const tonesWithType = toneResponse.data.map((tone: any) => ({ ...tone, type: 'tone of voice' }));
        const personasWithType = personaResponse.data.map((persona: any) => ({ ...persona, type: 'persona' }));

        // Combine the two arrays
        const combinedArray = [...tonesWithType, ...personasWithType];

        // Sort the combined array by the timestamp field
        combinedArray.sort((a, b) => {
            if (a.timestamp < b.timestamp) return -1;
            if (a.timestamp > b.timestamp) return 1;
            return 0;
        });
        setList(combinedArray);
        if (combinedArray.length > 0) {
          setCurrentSample(combinedArray[0]);
          setBaseText(combinedArray[0].base_text);
        }
        setLoadingList(false);
      } catch (e) {
        console.log(e);
      }

    }
    fetchTemplates();
    fetchList();
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };

  }, []);

  const stopReplying = () => {
    abortController.abort();
  }

  const analyzeTone = async () => {
    if (currentSample) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    if (!baseText) {
      return;
    }
    setTestTextLoading(true);
    let fetchedUser = null;
    if (workspace && workspace !== "null" && workspace !== "undefined") {
      const {data} = await api.get(`/workspace-company/${workspace}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data.company;
    } else {
      const {data} = await api.get(`/users/${userId}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data;
    }
    //make sure user has elixir
    if (fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      return;
    }

    const exampleResponse = await api.post("/completion-function", {
      prompt: `Please analyze this text to figure out its main objective, target audience, tone of voice, content type and the use of emojis and punctuation: "${baseText}". Also extract specifically what is it about: some product, event or just a trip? Name it in "about" field.
      `,
      systemPrompt: `Act as a JSON converter. After analyzing the text user quotes you return a formatted JSON output that describes it in the given JSON object. Only use the functions you have been provided with.
        `,
      model: "gpt-4-0613",
      temperature: 0,
      function_definition: {
        "name": "extract_tone",
        "description": "Extract the tone of voice characteristics from the given text",
        "parameters": {
            "type": "object",
            "properties": {
                "about": {
                    "type": "string",
                    "description": "the product/service, eg. new iPhone 15",
                },
                "language": {
                  "type": "string", 
                  "description": "the language of the text, eg. English",
                },
                "mainObjective": {
                    "type": "string",
                    "description": "the main objective of the text, eg. make old iPhone users buy new one",
                },
                "targetAudience": {
                    "type": "string",
                    "description": "the target audience of the text, eg. old iPhone users",
                },
                "useEmojis": {
                    "type": "string",
                    "description": "the use of emojis in the text, eg. yes",
                }
            },
            "required": ["about", "language", "mainObjective", "targetAudience", "useEmojis"],
        },
    }
  },
  {
      headers: {
          Authorization: `${token}`,
      },
  });

  const exampleJSON = JSON.parse(exampleResponse.data.function.arguments);
  setLanguage(exampleJSON.language);
  setAbout(exampleJSON.about);
  generateExampleOutput(exampleJSON);

  try {
    if (currentSample.type === "persona") {
      await api.put(`/persona/${currentSample._id}`, {
        base_text: baseText,
      }, 
      {
        headers: {
          Authorization: `${token}`,
        }
      })
    } else {
      await api.put(`/tone/${currentSample._id}`, {
        base_text: baseText,
      }, 
      {
        headers: {
          Authorization: `${token}`,
        }
      })
    }

  } catch (e) {
    console.log(e);
  }
} 
}

  const generateExampleOutput = async (exampleJSON: any) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    if (testTextLoading) {
      stopReplying();
      return;
    }
    setTestText("");
    setTestTextLoading(true);
    let fetchedUser = null;
    if (workspace && workspace !== "null" && workspace !== "undefined") {
      const {data} = await api.get(`/workspace-company/${workspace}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data.company;
    } else {
      const {data} = await api.get(`/users/${userId}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data;
    }
    //make sure user has elixir
    if(fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      return;
    }

    let exampleOutputOutlines = exampleJSON;
    let exampleLanguage = exampleOutputOutlines.language;
    let exampleAbout = exampleOutputOutlines.about;


    if (!exampleLanguage) {
      exampleLanguage = language;
    }
    if (!exampleAbout) {
      exampleAbout = about;
    }

    let reply = "";
    let model = "gpt-4";
    let prompt = `${currentSample?.prompt} write unique ${selectedTemplate?.title} about ${exampleAbout} in ${exampleLanguage} language in this exact style. Mimic the tone to look 1:1 as if it was written by the author of the quoted text. Return the ${selectedTemplate?.title} content in ${exampleLanguage} that is no longer than ${length} characters and uses learned tone of voice:`;
    let systemPrompt = `You are a ${exampleLanguage} native marketer. ${selectedMarketingAssistant.noEmbedPrompt}`;
    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: `Lab ${selectedTemplate} example`, model, systemPrompt, temperature: 0.95}),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.body){
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setTestText(reply)
            break;
          }
  
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          setTestTextLoading(false);
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                const contentWithoutQuotes = data.content.replace(/"/g, '');
                reply += contentWithoutQuotes;
                setTestText(reply);
              }
            } catch (error) {
              console.error('Error parsing JSON:', jsonString, error);
            }
          }
        }
      }

    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        setTestTextLoading(false);
      } else {
        console.log(e);
        setTestTextLoading(false);
      }
    } finally {
      abortController.abort();
    }
  }


  const openChoiceModal = () => {
    setOpenModal(true);
    setCurrentModal("choice");
  }

  const deleteSample = () => {
    if (currentSample) {
      router.reload();
    }
  }

  const openSample = (profile: any) => {
    setCurrentSample(profile);
    setBaseText(profile.base_text);
    setTestText("");
  }

  return (
    <PageTemplate>
      {(currentModal === "choice" && openModal) &&
          <ChoiceModal onClose={() => setOpenModal(false)} setNextModal={setCurrentModal}/>
      }
      {(currentModal === "tone" && openModal) && 
          <ToneModal onClose={() => setOpenModal(false)} />
      }
      {((currentModal === "persona-form" || currentModal === "persona-description") && openModal) && 
          <PersonaModal onClose={() => setOpenModal(false)} currentModal={currentModal}/>
      }
      {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
      {(openDeleteModal && currentSample) && <DeleteDoc onClose={() => setOpenDeleteModal(false)} assetType={currentSample?.type} document={currentSample} deleteDocumentState={deleteSample} />}
      <PageContainer
        className=" items-center h-full flex w-full text-black "
        style={{ height: "100%" }}
      >
        <div className="flex justify-between w-full items-center">
          <div className="flex lg:gap-2 gap-1 items-center">
            <PageTitle>AI Behavior Lab</PageTitle>
            <div className="flex items-center justify-center py-2 lg:px-5 rounded-2xl lg:bg-slate-100">
              <GradientText className="text-center lg:text-md text-xs uppercase">
                Beta
              </GradientText>
            </div>
          </div>
          <BlueBtn onClick={openChoiceModal} style={{ padding: "0.5rem 3.5vw 0.5rem 3.5vw" }}>
            <span className="flex items-center gap-[1vw]">
              + <span> Create new </span>
            </span>
          </BlueBtn>
        </div>
        <div></div>
      </PageContainer>
      <div className="flex lg:flex-row flex-col gap-4">
        <PageContainer
          className="lg:w-[20%] w-full gap-4 mt-3 flex flex-col justify-between text-black lg:h-auto h-[100vh]"
          style={{ padding: "1.5rem" }}
        >
          <div className="flex flex-col w-full">
            <Input height="2.8rem" value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} padding="0.65rem" placeholder="Search..."/>
            {loadingList ?
            <div className="mt-12 flex justify-center">
              <BlueLoader />
            </div>
            :
            <>
            {list.length === 0 ?
            <div className="mt-10 w-full justify-center flex text-slate-300">
              <p>You have no samples...</p>
            </div>
            :
            <List>
              {list.map((profile) => {
                const isProfileActicve = currentSample?._id === profile._id;
                return (
                  <div
                    className={`flex w-full justify-between rounded-2xl mt-3 p-2 cursor-pointer ${
                      isProfileActicve ? "bg-[#F4F7FB]" : ""
                    }`}
                    onClick={() => openSample(profile)}
                    key={profile.id}
                  >
                    <ProfileCard
                      type={profile.type}
                      name={profile.title}
                      icon={profile.icon}
                    />
                    {isProfileActicve && (
                      <div className="flex items-center">
                        <RiArrowRightSLine className="lg:h-[1.5vw] lg:w-[1.5vw] h-[3vw] w-[3vw] mr-2 text-slate-300" />
                      </div>
                    )}
                  </div>
                );
              })}
            </List>
            }
            </>
            }
          </div>
          <div>
            <BlueBtn height="3rem" onClick={openChoiceModal} >
              <span className="text-center items-center flex">
                + {!isSmallDevice && <p className="ml-2">Create New</p>}
              </span>
            </BlueBtn>
          </div>
        </PageContainer>
        <PageContainer
          style={{ padding: "1.5rem 2vw 1.5rem 2vw" }}
          className="lg:w-[40%] w-full flex flex-col gap-8 mt-3 justify-between lg:h-auto h-[100vh]  text-black "
        >
          {currentSample ?
          <>
          <div className="flex w-full flex-col gap-4 h-full">
            <div className="flex items-center w-full">
              <BiBookAlt className="w-6 h-6 mr-2" />
              <h3 className="font-bold text-xl mr-2">Base</h3>
              <p className="text-sm text-slate-300">- Edit it to update how the AI will respond</p>
            </div>
            <TextArea
              padding="1rem"
              height="100%"
              value={baseText}
              disabled={!currentSample}
              onChange={(e) => setBaseText(e.target.value)}
              className="overflow-scroll"
            
            />
          </div>
          <div>
            <BlueBtn onClick={() => analyzeTone()} height="3rem">
              {testTextLoading ?
              <Loader color="white" />
              :
              <span> Update {currentSample.type} </span>
              }

            </BlueBtn>
          </div>
          </>
          :
          <>
          {loadingList ?
            <div className="mt-12 flex justify-center h-full items-center">
              <BlueLoader />
            </div>
            :
            <div className="h-full flex items-center flex-wrap">
              <div className="flex flex-wrap w-full justify-center gap-10">
              <h3 className="font-bold text-2xl text-center mr-2 px-8">Create a new profile or tone of voice to get started!</h3>
              <BlueBtn height="3rem" onClick={openChoiceModal} >
                <span className="text-center items-center flex">
                  + {!isSmallDevice && <p className="ml-2">Create New</p>}
                </span>
              </BlueBtn>
              </div>
            </div>
          }
          </>
        }
        </PageContainer>
        <PageContainer
          style={{ padding: "1.5rem 2vw 1.5rem 2vw" }}
          className="lg:w-[40%] w-full text-black mt-3 lg:h-auto h-full overflow-scroll"
        >
          {currentSample ? (
            <div className="flex flex-col ">
              <div className="flex justify-between items-center lg:pb-[1vw] pb-4">
                <ProfileCard
                  type={currentSample.type}
                  icon={currentSample.icon}
                  name={currentSample.title}
                />
                <div className="flex h-full items-center">
                  <button className="flex items-center  justify-center py-2 px-[2vw]  rounded-2xl bg-[#EFF1F5]">
                    <GradientText style={{ fontSize: "1rem" }}>
                      Try now
                    </GradientText>
                  </button>
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
                                onClick={() => setOpenDeleteModal(true)}
                                className={classNames(
                                  active ? 'bg-red-100 text-red-900' : 'text-red-500',
                                  'group w-full flex items-center px-4 py-2 text-sm'
                                )}
                              >
                                <BsTrash className="mr-3 h-5 w-5 text-red-400 group-hover:text-gray-500" aria-hidden="true" />
                                Delete {currentSample.title}
                              </button>
                            )}
                          </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex flex-col gap-[1vw] mt-4">
                <h4
                  className="w-full border-b-2 border-slate-100 pb-2"
                  style={{ fontWeight: 600 }}
                >
                  Example output
                </h4>
                <div
                  className={`flex ${
                    isSmallDevice && "flex-col"
                  } flex-row justify-between items-center `}
                >
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%] self-start"
                    } flex flex-col w-[48%]`}
                  >
                    <Label>Placement</Label>
                    <ToneDropdown
                      value={selectedTemplate}
                      values={templates}
                      onChange={setSelectedTemplate}
                      placeholder="Select placement"
                    />
                  </div>
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%] self-start"
                    } flex flex-col w-[48%]`}
                  >
                    <Label>About</Label>
                    <Input height="2.8rem" value={about} onChange={(e) => setAbout(e.target.value)} padding="0.65rem" placeholder="Example topic..." />
                  </div>
                </div>
                <div
                  className={`flex ${
                    isSmallDevice && "flex-col"
                  } flex-row justify-between items-center `}
                >
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%] self-start"
                    } flex flex-col w-[48%]`}
                  >
                    <Label>Language</Label>
                    <Input height="2.8rem" value={language} onChange={(e) => setLanguage(e.target.value)} padding="0.65rem" placeholder="Example topic..." />
                  </div>
                  <div
                    className={` ${
                      isSmallDevice && "w-[80%] self-start"
                    } flex flex-col w-[48%]`}
                  >
                    <Label>Length (chars)</Label>
                    <Input height="2.8rem" value={length} onChange={(e) => setLength(e.target.value)} padding="0.65rem" placeholder="Example topic..." />
                  </div>
                </div>
              </div>
              {selectedTemplate &&
              <div className="h-full flex items-center justify-center mb-8 w-full">
                <div className="flex gap-4 w-full flex-col p-6 shadow-md mt-[2vw] rounded-2xl border-2  border-[#ECEEF2]">
                  <div
                    className={`flex w-full`}
                  >
                    <div className="flex gap-4 items-center w-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={selectedTemplate.icon}
                          height={40} width={40}
                          alt="social media icon"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <GeneratedTextTitle>
                          {selectedTemplate.title}
                        </GeneratedTextTitle>
                        <GeneratedTextDate>{moment().format('DD MMMM YYYY')}</GeneratedTextDate>
                      </div>
                    </div>
                    <button onClick={() => generateExampleOutput({})} className="flex px-[2vw] gap-4 items-center h-10 bg-[#EFF1F5] rounded-2xl hover:scale-95">
                      <IoRefreshOutline className="w-4 h-4" />
                      <Text>Rewrite</Text>
                    </button>
                  </div>
                  {!testTextLoading ?
                    <p className="font-medium">
                    {testText.length > 0 ? <GeneratedExample>{testText}</GeneratedExample> : <div className="flex justify-center mt-8 text-slate-300 mb-8">No example output yet...</div>}

                    </p>
                    :
                    <MultiLineSkeletonLoader lines={3} justifyContent="left" />
                  }
                </div>
              </div>
              }
            </div>
          )
          :
          <div className="h-full flex items-center flex-wrap">
            <div className="flex flex-wrap w-full justify-center gap-10">
            <h3 className="font-medium text-xl text-slate-300">No tone or persona selected</h3>
            </div>
          </div>
          }
        </PageContainer>
      </div>
    </PageTemplate>
  );
};

export default LabPage;

const PageTitle = styled.h1`
  color: black;
  font-size: 2.2rem;
  font-weight: 700;
  width: 100%;
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`;
const Text = styled.p`
  font-size: 0.9rem;
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
  color: rgb(210 210 210);
`;


const BlueBtn = styled.div<{ height?: string }>`
    width: 14rem;
    height: ${props => props.height ? props.height : "3rem"}};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      margin-top: 1rem;
    }
`

const PageContainer = styled.div`
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.2rem 2rem 1.2rem 2rem;
  height: calc(100vh - 8.5rem);
  font-weight: 500;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
      display: none;
  }
  -webkit-mask: 
  linear-gradient(to top,    black 97%, transparent) top   /100% 51%,
  linear-gradient(to bottom, black 97%, transparent) bottom/100% 50%,
  linear-gradient(to left  , black, transparent) left  /100% 0%,
  linear-gradient(to right , black, transparent) right /100% 0%;
  -webkit-mask-repeat:no-repeat;
  @media (max-width: 1023px) {
    height: 100vh;
    padding: 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;

const List = styled.div`
  width: 100%;
  margin-top: 1rem;
  max-height: 63vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 2rem;
  &::-webkit-scrollbar {
    display: none;
  } 
    -webkit-mask: 
    linear-gradient(to top,    black 95%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 95%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
     
`


const GeneratedExample = styled.p`
  margin-top: 0.5rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 10px;
  background-color: transparent;
  color: black;
  border: none;
  outline: none;
  resize: none;
  font-weight: 500;
  z-index: 1;
  @media (max-width: 1023px) {
      margin-top: 4vh;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  color: #6F7890;
  }
  :-ms-input-placeholder {
  color: #6F7890;
  }
  &::-webkit-scrollbar {
      display: none;
  }
  white-space: pre-wrap;
  will-change: transform;
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