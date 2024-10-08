import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Centered from "../../Centered";
import bookIcon from "@/public/images/bookIcon.png";
import openedBookIcon from "@/public/images/openedBookIcon.png";
import behaviorIcon from "../../../public/images/behaviourIcon.png";
import Image from "next/image";
import { create } from "ipfs-http-client";
import { FileUploader } from 'react-drag-drop-files';
import { BsImage, BsPlusLg, BsXLg } from "react-icons/bs";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import SlideBottom from "../../Animated/SlideBottom";
import { useRouter } from "next/router";
import TextArea from "../../forms/TextArea";
import TypingAnimation from "../common/TypingAnimation";
import { setSelectedMarketingAssistant } from "@/store/marketingAssistantSlice";
import { setSelectedCopywritingAssistant } from "@/store/copywritingAssistantSlice";
import elixirIcon from "../../../public/images/elixir.png";
import CustomDropdown from "@/components/forms/CustomDropdown";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import { selectFoldersState } from "@/store/selectedFoldersSlice";
import { useDispatch, useSelector } from "react-redux";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
const fileTypes = ["JPG", "PNG", "HEIC", "JPEG"];
const languages = [
    "English",
    "Spanish",
    "French",
    "Italian",
    "Portuguese",
    "German",
    "Ukrainian",
    "Polish",
    "Chinese",
    "Bulgarian",
    "Russian",
    "Japanese",
    "Turkish",
    "Greek",
    "Arabic",
    "Dutch",
    "Norwegian",
    "Serbian",
    "Swedish",
    "Czech",
    "Romanian",
    "Finnish",
    "Hungarian",
    "Hindi"
  ];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


interface Background {
    image: any
}

interface Folder {
    _id: string;
    title: string;
    owner: string;
}

interface Assistant {
    _id: string;
    name: string;
    documents: Array<any>;
    prompt: string;
    description: string,
    image: string,
    folders: Array<any>,
    category: string,
    companyName: string,
    aboutCompany: string,
    exampleContent: string,
}

const AddAssistant = (props: {onClose: any, setAssistants: any, assistantToEdit: Assistant | undefined, openNewFolder: any, category: string}) => {

    const [selectedTab, setSelectedTab] = useState(1);
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [image, setImage] = useState<File>();
    const selectedFolders = useSelector(selectFoldersState);
    const [folders, setFolders] = useState<Array<Folder>>([]);
    const [foldersLoading, setFoldersLoading] = useState(false);
    const [openTabInput, setOpenTabInput] = useState(false);
    const [tabInput, setTabInput] = useState("");
    const [exampleText, setExampleText] = useState("");
    const [exampleLengthError, setExampleLengthError] = useState(false);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [triggersError, setTriggersError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [companyError, setCompanyError] = useState(false);
    const [businessSector, setBusinessSector] = useState("");
    const [currentText, setCurrentText] = useState(0);
    const [language, setLanguage] = useState("English");
    const [firstPersonNarrative, setFirstPersonNarrative] = useState(true);
    const [foldersError, setFoldersError] = useState(false);
    const [triggers, setTriggers] = useState(["asks about the product", "asks for advice", "asks anything related to the company", "asks for more information", "asks about the privacy policy"])
    const [selectedTriggers, setSelectedTriggers] = useState<Array<string>>([]); 
    const [selectedTriggersError, setSelectedTriggersError] = useState(false);
    const [openNewTrigger, setOpenNewTrigger] = useState(false);
    const [role, setRole] = useState("");
    const [isCreative, setIsCreative] = useState(false);
    
    const router = useRouter();
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLInputElement>(null);

    const texts = [
        "Analyzing content...",
        `Give me a sec...`,
        "Loading context...",
        "Learning...",
        "Saving files...",
        "Categorizing information...",
        "Just a moment...",
        "Repeating the process...",
      ];

          //loading texts
    useEffect(() => {
        if (loading) {
          const intervalId = setInterval(() => {
            setCurrentText((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 2500);
          return () => clearInterval(intervalId);
        }
      }, [loading, texts.length]);


    useEffect(() => {
        if (exampleText) {
            if (exampleText.length > 2000) {
                setExampleLengthError(true);
            } else if (0 < exampleText.length && exampleText.length <= 100){
                setExampleLengthError(true);
            } else {
                setExampleLengthError(false);
            }
        }
 
    }, [exampleText]);

    useEffect(() => {
        if (props.assistantToEdit) {
            const { name, companyName, exampleContent, aboutCompany, image, category, folders } = props.assistantToEdit;
            setName(name);
            setCompany(companyName);
            setBusinessSector(aboutCompany);
            if (exampleContent) {
                setExampleText(exampleContent);
            }
            setPreviewUrl(image);
        }
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
        };
    }, []);

    useEffect(() => {
        if (selectedTab === 2) {
            const fetchFolders = async () => {
                setFoldersLoading(true);
                const workspace = localStorage.getItem("workspace");
                try {
                  const token = localStorage.getItem("token");
                  if (workspace && workspace !== "undefined" && workspace !== "null") {
                    console.log(workspace);
                  const { data } = await api.get(`/folders/${workspace}`, {
                    headers: {
                      Authorization: `${token}`,
                    },
                  });
                  setFolders(data);
                  setFoldersLoading(false);
                  } else {
                    const { data } = await api.get(`/folders/owner/${localStorage.getItem('user_id')}`, {
                      headers: {
                        Authorization: `${token}`,
                      },
                    });
                    setFolders(data);
                    setFoldersLoading(false);
                  }
                } catch (error) {
                  console.error(error);
                  setFoldersLoading(false);
                }
              };
            fetchFolders();
        }
      }, [selectedTab]);

    useEffect(() => {
        if (openTabInput) {
          inputRef.current?.focus();
        }
    }, [openTabInput]);

    useEffect(() => {
        if (name) {
            setNameError(false);
        }
    }, [name]);

    useEffect(() => {
        if (company) {
            setCompanyError(false);
        }
    }, [company]);

    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const modalClick = (e: any) => {
        e.stopPropagation();
        if (openTabInput) {
            setOpenTabInput(false);
        }
    };

      useEffect(() => {
        if (openNewTrigger) {
          triggerRef.current?.focus();
        }
    }, [openNewTrigger]);

    const handleTriggerClick = (trigger: string) => {
        setTriggersError(false);
        if (selectedTriggers.length === 3) {
            setSelectedTriggersError(true);
            return;
        } else {
            setSelectedTriggersError(false);
        }
        setSelectedTriggers((prevSelectedTriggers) => {
          if (!prevSelectedTriggers) {
            return [trigger];
          }
          
          return [...prevSelectedTriggers, trigger];
        });
    };

    const handleAddTrigger = (e: any) => {
        e.preventDefault();
        setTriggers((prevTriggers) => {
            if (!prevTriggers) {
              return [tabInput];
            }
            return [...prevTriggers, tabInput];
        });
        setSelectedTriggers((prevSelectedTriggers) => {
          if (!prevSelectedTriggers) {
            return [tabInput];
          }
          return [...prevSelectedTriggers, tabInput];
        });
        setTabInput("")
        setOpenNewTrigger(false);
    };
    

    const createAssistant = async () => {
        let prompt = "";
        let noEmbedPrompt = "";
        let imageURL = "https://asystentai.infura-ipfs.io/ipfs/QmU1GBfsi37qBij3EA4JohC58mC4uyyX4qpV9eHtMDQogy";
        let description = "";
        let category = "";
        let tone = "";
        let customPrompt = "";
        const token = localStorage.getItem("token");
        setLoading(true);

        if (!selectedFolders) {
            setFoldersError(true);
            setLoading(false);
            setSelectedTab(2);
            return;
        }

        if (selectedTriggers.length === 0) {
            setTriggersError(true);
            setLoading(false);
            return;
        }

        if (!name) {
            setSelectedTab(1);
            setNameError(true);
            setLoading(false);
            return;
        }

        if (!company) {
            setSelectedTab(1);
            setCompanyError(true);
            setLoading(false);
            return;
        }

        if (exampleText) {
        if (exampleText.length > 100 && exampleText.length < 2000) {
            try {
                const toneCompletion = await api.post("/completion", {
                    prompt: `Text to analyze: "${exampleText}". Return a detailed description of tone of voice in under 100 words and style used in analyzed text: `,
                    model: "gpt-4-turbo",
                    temperature: 0,
                    systemPrompt: "You are professionally analyzing tone of voice of the quoted text by completing last sentence imperatively in second-person narrative. You are very specific in expressing what tone of voice is used in text and you carefully analyze it. You NEVER describe what the text is about and don't refer to anything else about its content. You recognise ONLY the tone, style and target audience to write in similar tone in the future."
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                tone = "Your tone of voice is " + toneCompletion.data.completion;
            } catch (e) {
                console.log(e);
            }
        }
        }

        let triggersMessage = "";
        if (selectedTriggers.length > 0) {
            triggersMessage = selectedTriggers
            .map(trigger => `-If user ${trigger}, you always reply only exactly with: "[%fetch_info%]".\n`)
            .join('\n');
            const translationResponse = await api.post("/completion", {
                prompt: `Translate these bullet points to English as accurately as possible: "${triggersMessage}". Translation:`,
                systemPrompt: "You are a professional translator from any language and a mix of languages to English. You always respond only with exact translation and nothing else.",
                model: "gpt-4-turbo",
                temperature: 0
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            });
            triggersMessage = translationResponse.data.completion;
        }

        let roleMessage = "";
        let firstPersonPrompt = ""
        if (role) {
            roleMessage = `You are a ${role}.`;
        }

        if (company && businessSector) {
            customPrompt = `${roleMessage} You work for a company called ${company} which is a ${businessSector}.` 
        }

        if (role || businessSector) {
            const translationResponse = await api.post("/completion", {
                prompt: `Translate the quoted text to English as accurately as possible: "${customPrompt}". Translation: `,
                systemPrompt: "You are a professional translator from any language and a mix of languages to English. You always respond only with exact translation nothing else.",
                model: "gpt-4-turbo",
                temperature: 0
            },
            {
                headers: {
                    Authorization: `${token}`,
                },
            });
            customPrompt = translationResponse.data.completion;
        }

        if (firstPersonNarrative) {
            firstPersonPrompt = `If user writes anything about ${company} company or something related to it you always respond in first person narrative as you are a part of this company.`;
        }

        category = props.category;

        let interpretationStrategy = "You use extra context only as inspiration and it is not limiting your capabilities to create.";
        if (!isCreative) {
            interpretationStrategy = "Base your response solely on the provided context and not on your prior knowledge."
        }

        prompt = `People call you ${name}. You are ${language} native speaker. Although you can also reply in whatever language user texts you. ${customPrompt} On top of that you are a superb at marketing. You are helpful, polite and always positive. You always help user and do exactly what he/she is asking for. You are a great friend and listener and you follow user demands.
            Rules you always obey:
            - If user writes anything that may be related to the ${company} company, you always respond only exactly with: "[%fetch_info%]".
            - If user writes about something that is or may be within the scope of ${company}'s copmany activities, you always respond only exactly with: "[%fetch_info%]".
            - If user writes about something that belongs to the industry of ${company}, you always respond only exactly with: "[%fetch_info%]".
            ${triggersMessage}`;

        noEmbedPrompt = `People call you ${name} and you are ${language} native speaker.  Although you can also reply in whatever language user texts you. ${customPrompt} ${firstPersonPrompt} You help user by providing insightful and creative answers based on inspiration from context provided by the user. You are helpful, polite and always positive. You always help user and do exactly what he/she is asking for. You are a great friend and listener, fulfilling whatever user asks for. ${tone} ${interpretationStrategy}`
        imageURL = "https://asystentai.infura-ipfs.io/ipfs/QmPQbzyLqe32TM9v2JYCLqk5E5oucEp818BuJtBFh7pNjP";
        description = `${isCreative ? "Creative" : "Factual"} AI based on the uploaded knowledge.`

        const folderIds = selectedFolders.map(folder => folder._id);
        
        try {
            const documentsResponse = await api.post('/folders/documents', {folderIds: folderIds}, {
                headers: {
                    Authorization: token
                }
            });
            if  (image) {
                const subdomain = 'https://asystentai.infura-ipfs.io';
                const ipfsImage = await client.add({ content: image });
                imageURL = `${subdomain}/ipfs/${ipfsImage.path}`;
            }

            if (props.assistantToEdit) {
                await api.patch(`/update-assistant/${props.assistantToEdit._id}`, {
                    name: name,
                    companyName: company,
                    aboutCompany: businessSector,
                    prompt,
                    documents: documentsResponse.data,
                    folders: selectedFolders,
                    exampleContent: exampleText,
                    description,
                    category,
                    image: imageURL,
                    noEmbedPrompt
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                setLoading(false);
                props.onClose();
                router.reload();
            } else {
                let profileId = localStorage.getItem("profile_id");
                const createdAssistant = await api.post("/create-assistant", {
                    owner: localStorage.getItem("user_id"),
                    name: name,
                    companyName: company,
                    aboutCompany: businessSector,
                    prompt,
                    documents: documentsResponse.data,
                    folders: selectedFolders,
                    description,
                    exampleContent: exampleText,
                    category,
                    image: imageURL,
                    noEmbedPrompt,
                    profile: profileId || null,
                    workspace: localStorage.getItem("workspace") || null
                }, 
                {
                    headers: {
                        Authorization: token
                    }
                });
                setLoading(false);
                props.onClose();
                props.setAssistants((prevAssistants: any) => [...prevAssistants, createdAssistant.data.assistant]);
                if (category === "marketing") {
                    dispatch(setSelectedMarketingAssistant(createdAssistant.data.assistant));
                } else if (category === "copywriting") {
                    dispatch(setSelectedCopywritingAssistant(createdAssistant.data.assistant));
                }
            }

        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };


    return (
        <ModalBackground onClick={props.onClose}>
            <SlideBottom>
            <Modal onClick={(e) => modalClick(e)}>
                <CloseIcon onClick={props.onClose}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {!loading ? 
                <div>
                    {props.assistantToEdit ?
                        <ModalTitle>Update AI Assistant</ModalTitle>
                        :
                        <>
                            <ModalTitle>Create Your AI</ModalTitle>
                        </>
                    }
                <Tabs justifyContent="space-evenly">
                    {selectedTab === 1 ? 
                    <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={bookIcon} alt={'Icon'}></Image></TabIcon>About</SelectedMainTab> 
                    :
                    <MainTab onClick={() => setSelectedTab(1)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={bookIcon} alt={'Icon'}></Image></TabIcon>About</MainTab>
                    } 
                    {selectedTab === 2 ? 
                    <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={openedBookIcon} alt={'Icon'}></Image></TabIcon>Assets</SelectedMainTab>
                    :
                    <MainTab onClick={() => setSelectedTab(2)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={openedBookIcon} alt={'Icon'}></Image></TabIcon>Assets</MainTab>
                    }
                    {props.category === "chat" &&
                    <>
                        {selectedTab === 3 ? 
                        <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={behaviorIcon} alt={'Icon'}></Image></TabIcon>Behavior</SelectedMainTab>
                        :
                        <MainTab onClick={() => setSelectedTab(3)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={behaviorIcon} alt={'Icon'}></Image></TabIcon>Behavior</MainTab>
                        }
                    </>
                    }
                </Tabs>
                {selectedTab === 1 &&
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem"}}>
                    <HalfInputContainer>
                    <Label><div className="flex justify-between w-full items-end"><p>Assistant Name</p>
                        {nameError ? 
                        <p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>name the Assistant</p> 
                        : 
                        <div className={classNames(name.length > 18 ? "text-red-400" : "text-stone-400", "font-normal mr-2 text-sm")}>{name.length}/18</div>}</div>
                        </Label>
                        <Input type="text" placeholder="Assistant Michael" value={name} onChange={(e) => setName(e.target.value)}/>
                    </HalfInputContainer>
                    <HalfInputContainer>
                        <Label>Company Name{companyError && <p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>enter your company name</p>}</Label>
                        <Input type="text" placeholder="Yepp" value={company} onChange={(e) => setCompany(e.target.value)}/>
                    </HalfInputContainer>
                <Label>This company is...</Label>
                    <Input type="text" placeholder="a platform for generating marketing content..." value={businessSector} onChange={(e) => setBusinessSector(e.target.value)}/> 
                <Label>Profile picture <p style={{color: "#777777", marginLeft: "0.5rem", fontSize: "0.85rem"}}>(optional)</p></Label>
                    <Tabs justifyContent="left">
                        <FileUploader hoverTitle="Drop here" handleChange={handleFile} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                            {previewUrl || image ?
                                <SelectedAddPfp image={previewUrl}></SelectedAddPfp>  
                                :
                                <AddPfp image={previewUrl}>
                                    <BsImage style={{width: "2rem", height: "2rem"}}/>
                                </AddPfp>      
                            }
                        </FileUploader>
                    </Tabs>
                    <ButtonContainer>
                    <Centered>
                        <ContinueBtn onClick={() => setSelectedTab(2)}>
                                Continue
                        </ContinueBtn>
                    </Centered>
                    </ButtonContainer>
                </div>
                }
                {selectedTab === 2 &&
                <div>
                {!foldersError ? <Label>Choose folders for AI to reference...</Label> : <Label className="text-red-400">Choose folders for AI to reference... </Label>}
                <FoldersDropdown />
                <Label>Teach AI your brand voice...<p style={{color: "#777777", marginLeft: "0.5rem", fontSize: "0.85rem"}}>(optional)</p></Label>
                <TextArea
                    id="about-field"
                    height= "10rem"
                    padding="0.5rem"
                    placeholder="Copy paste some conent that will best represent the company's brand voice."
                    value={exampleText}
                    onChange={(e) => setExampleText(e.target.value)}
                    required
                />
                <ContentLengthContainer>
                    {exampleText &&
                    exampleLengthError ?
                        <p style={{color: "#FF6060", fontSize: "2vh", fontWeight: "400"}}>{exampleText.length}/2000</p>
                        :
                        <p style={{fontSize: "2vh", fontWeight: "400"}}>{exampleText.length}/2000</p>
                    }
                </ContentLengthContainer>
                <ButtonContainer>
                <Centered>
                    <ContinueBtn onClick={() => setSelectedTab(3)}>
                            Continue
                    </ContinueBtn>
                </Centered>
                </ButtonContainer>
                </div>
                }
                {selectedTab === 3 &&
                <div>
                <Label>Act as...<p style={{color: "#777777", marginLeft: "0.5rem", fontSize: "0.85rem"}}>(optional)</p></Label>
                <Input type="text" placeholder="professional and cheerful person from customer service" value={role} onChange={(e) => setRole(e.target.value)}/>
                {selectedTriggersError ? 
                <Label>Use extra resources when user...<p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>max 3</p></Label>
                :
                <Label>Use extra resources when user...{triggersError && <p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>at least 1</p>}</Label>
                }
                <Tabs justifyContent="left">
                    {triggers.map((trigger) => {
                        if (selectedTriggers?.includes(trigger)) {
                            return (
                            <SelectedTab onClick={() => setSelectedTriggers(selectedTriggers.filter((selectedTrigger) => selectedTrigger !== trigger))} key={trigger}>
                                {trigger}
                            </SelectedTab>
                            )
                        } else {
                            return (
                            <Tab onClick={() => handleTriggerClick(trigger)} key={trigger}>
                                {trigger}
                            </Tab>
                            );
                        }
                        })}
                        {openNewTrigger ? 
                            <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleAddTrigger(e)}><TabInput ref={triggerRef} type="text" value={tabInput} onChange={(e) => setTabInput(e.target.value)}/></form> 
                            : 
                            <div onClick={(e) => e.stopPropagation()} >
                                <AddTab onClick={() => setOpenNewTrigger(true)}><BsPlusLg style={{width: "auto", height: "60%"}}/></AddTab>
                            </div>
                        }
                </Tabs>
                <div className="flex justify-between flex-wrap lg:flex-nowrap">
                    <div className="lg:w-[49%] w-full">
                        <Label>Use first person narrative?</Label>
                        <div className="flex">
                            {firstPersonNarrative ? <SelectedTab>Yes</SelectedTab> : <Tab onClick={() => setFirstPersonNarrative(true)}>Yes</Tab>}
                            {firstPersonNarrative ? <Tab onClick={() => setFirstPersonNarrative(false)}>No</Tab> : <SelectedTab>No</SelectedTab>}
                        </div>
                    </div>
                    <div className="lg:w-[49%] w-full">
                        <Label>How should resources be interpreted?</Label>
                        <div className="flex">
                            {isCreative ? <SelectedTab>Creatively</SelectedTab> : <Tab onClick={() => setIsCreative(true)}>Creatively</Tab>}
                            {isCreative ? <Tab onClick={() => setIsCreative(false)}>Factually</Tab> : <SelectedTab>Factually</SelectedTab>}
                        </div>
                    </div>
                </div>
                <div style={{width: "48%", display: "flex", flexWrap: "wrap"}}>
                    <Label>By default speak...</Label>
                    <CustomDropdown
                        type="text"
                        placeholder="Polski"
                        required
                        value={language}
                        values={languages.sort()}
                        onChange={setLanguage}
                        error={undefined}
                    /> 
                </div>
                <Centered>
                    {props.assistantToEdit ?
                    <ButtonContainer>
                     <ContinueBtn onClick={createAssistant}>
                        {loading ?
                        <Loader color="white" />
                        :
                        <p>Update Assistant</p>
                        }
                    </ContinueBtn>     
                    </ButtonContainer>   
                    :
                    <ButtonContainer>
                    <PriceContaienr>Total: <div style={{display: "flex", marginLeft: "0.5rem"}}> 1000ml <ElixirIcon><Image style={{ width: "auto", height: "100%" }}  src={elixirIcon} alt={'elixir_icon'}></Image></ElixirIcon></div></PriceContaienr>
                    <ContinueBtn onClick={createAssistant}>
                        {loading ?
                        <Loader color="white" />
                        :
                        <>
                        <p>+ Add Assistant</p>
                        </>
                        }
                    </ContinueBtn>  
                    </ButtonContainer>         
                    }

                </Centered>
                </div>
                }
                </div>
                :
                <div>
                <ModalTitle>Defining Assistant...</ModalTitle>
                <Centered>
                    <ModalDescription>AI assistant - like all of us, has to learn all that is new.</ModalDescription>
                </Centered>
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><Texts>{texts[currentText]}</Texts></Centered>
                    </ThinkingContainer>
                </div>
                }
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}

export default AddAssistant;

const Modal = styled.div`
    width: 54vw;
    border-radius: 25px;
    background: white;
    padding: 1.4rem 6rem 3rem 6rem;
    border: 2px solid #F2F2FB;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    margin-top: 2rem;
    margin-bottom: 7rem;
    position: relative;
    cursor: auto;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 2rem 2rem 3rem 2rem;
    }
`

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    overflow: scroll;
        &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: black;
    @media (max-width: 1023px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100vw;
        overflow-x: hidden;
    }
`

const ModalTitle = styled.h1`
    margin-bottom: 2.2rem;
    font-size: 1.2rem;
    width: 53.7vw;
    margin-left: -6rem;
    padding-left: 3rem;
    border-bottom: 3px solid #F2F2FB;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.7rem;
        line-height: 1.2;
        width: 95vw;
        margin-top: 2vh;
    }
`

const ModalDescription = styled.p`
    width: 80%;
    text-align: center;
    margin-top: 0.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
`

const Tabs = styled.div<{justifyContent: string}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.justifyContent};
`

const MainTab = styled.div`
    padding: 0.75rem 2rem 0.75rem 2rem;
    font-weight: 500;
    margin: 0 0.5rem 0 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    border-radius: 12px;
    cursor: pointer;
    background-color: #F3F7FA;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
        margin: 0;
        background-color: transparent;
        margin-bottom: 0.4rem;
        padding: 0.55rem 2rem 0.55rem 2rem;
    }
`

const SelectedMainTab = styled.div`
    padding: 0.75rem 3rem 0.75rem 3rem; 
    font-weight: 500;
    margin: 0 0.5rem 0 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    background: #EEF1F8;
    border: solid 3px transparent;
    overflow: hidden;
    border-radius: 12px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
        padding: 0.55rem 2rem 0.55rem 2rem;
        margin: 0;
        margin-bottom: 0.4rem;
    }
`

const HalfInputContainer = styled.div`
    width: 48%;
    @media (max-width: 1023px) {
        width: 100%;
    }
`

const Tab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const SelectedTab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    border: solid 3px transparent;
    overflow: hidden;
    border-radius: 12px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`


const AddTab = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
    color: black;
    border: dashed 2px black;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 2px black;
        transform: scale(0.95);
        color: black;
    }
`

const TabInput = styled.input`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    width: 15rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
`

const TabIcon = styled.div`
    width: 1.4rem;
    margin-right: 0.75rem;
`

const Label = styled.p`
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 0.7rem;
    align-items: center;
    display: flex;
    font-weight: 500;
    @media (max-width: 1023px) {
        margin-top: 1.5rem;
    }
`

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: transparent;
  border: solid 2px #F2F2FB;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: inset 1px 1px 5px rgba(22, 27, 29, 0.2), inset -1px -1px 5px #FAFBFF;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    width: 100%;
    margin-bottom: 0;
    padding: 0.6rem;
}
`;

const AddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: dashed 3px #CFD5E8;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px black;
        transform: scale(0.95);
        color: black;
    }
`

const SelectedPfp = styled.div<Background>`
    width: 4rem;
    height: 4rem;
    margin-right: 1.25rem;
    overflow: hidden;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    box-shadow: -4px 4px 0px rgba(101, 120, 248, 1), 4px -4px 0px rgba(100, 181, 255, 1);
`

const SelectedAddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: -4px 4px 0px rgba(101, 120, 248, 1), 4px -4px 0px rgba(100, 181, 255, 1);
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        color: black;
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: 1rem;
    }
`

const Folder = styled.div`
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23), -1px -1px 4px #FAFBFF;
    padding: 0.2rem 2rem 0.2rem 2rem;
    border: 2px solid #E5E8F0;
    border-radius: 15px;
    cursor: pointer;
    margin: 0.7rem 0.35rem 0 0.35rem;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        padding: 0.2rem 1rem 0.2rem 1rem;
    }
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        width: 100%;
        height: 3rem;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        background-size: 110%;
        background-position-x: -1rem;
        transition: all 0.4s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
    }
`

const ContentLengthContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5vh;
    margin-top: 1vh;
    color: #798094;

`

const ThinkingContainer = styled.div`
    margin-top: 1rem;
`;

const Texts = styled.div`
  color: black; 
  width: 75%;
  margin-top: 1.2rem; 
  font-weight: 500;
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;

const AddFolderBtn = styled.button`
    background-color: #F3F7FA; 
    border: 2px solid #E5E8F0;
    padding: 0.5rem 2rem 0.5rem 2rem; 
    border-radius: 12px; 
    box-shadow: 0px 3px 8px 2px rgba(0, 0, 0, 0.10);
    transition: all 0.4s ease;  
    &:hover {
        transform: scale(0.97);
        box-shadow: none;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 7rem 0 7rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 3rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`

const PriceContaienr = styled.div`
    width: 100%;
    display: flex;  
    justify-content: center;
    margin-bottom: 1rem;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 500;
`

const ElixirIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.5rem;
`