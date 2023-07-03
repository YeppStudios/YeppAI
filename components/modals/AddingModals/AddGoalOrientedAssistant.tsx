import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Centered from "../../Centered";
import bookIcon from "@/public/images/bookIcon.png";
import openedBookIcon from "@/public/images/openedBookIcon.png";
import behaviorIcon from "@/public/images/behaviorIcon.png";
import Image from "next/image";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { FileUploader } from 'react-drag-drop-files';
import { BsFillFolderFill, BsImage, BsPlusLg, BsXLg } from "react-icons/bs";
import api from "@/pages/api";
import { BlueLoader, Loader } from "../../Common/Loaders";
import Dropdown from "../../forms/Dropdown";
import SlideBottom from "../../Animated/SlideBottom";
import { head, set } from "lodash";
import { useRouter } from "next/router";
import TextArea from "../../forms/TextArea";
import TypingAnimation from "../common/TypingAnimation";
import ColorfulText from "../../Common/ColorfulText";
import Space from "../../Docs/common/Space";

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
const unknownAnswerOptions = ["Doradza jak znaleźć odpowiedź", "Przyznaje otwarcie, że nie wie", "Bazuje na własnej wiedzy", "Zaleca kontakt z infolinią", "Wymyśla odpowiedź"];
const languagesList = ["Polski", "Angielski", "Hiszpański", "Francuski", "Włoski", "Niemiecki", "Chiński", "Bułgarski", "Rosyjski", "Ukraiński"];

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

const AddAssistant = (props: {onClose: any, setAssistants: any, assistantToEdit: Assistant | undefined, openNewFolder: any}) => {

    const [selectedTab, setSelectedTab] = useState(1);
    const [role, setRole] = useState("");
    const [imageError, setImageError] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [image, setImage] = useState<File>();
    const [selectedFolders, setSelectedFolders] = useState<Array<string>>(); 
    const [selectedChores, setSelectedChores] = useState<Array<string>>([]); 
    const [selectedTriggers, setSelectedTriggers] = useState<Array<string>>([]); 
    const [folders, setFolders] = useState<Array<Folder>>([]);
    const [foldersLoading, setFoldersLoading] = useState(false);
    const [openNewChore, setOpenNewChore] = useState(false);
    const [openNewTrigger, setOpenNewTrigger] = useState(false);
    const [tabInput, setTabInput] = useState("");
    const [exampleText, setExampleText] = useState("");
    const [exampleLengthError, setExampleLengthError] = useState(false);
    const [language, setLanguage] = useState("Polski");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [businessSector, setBusinessSector] = useState("");
    const [currentText, setCurrentText] = useState(0);
    const [chores, setChores] = useState(["odpowiadać na pytania", "rozwiązywać problemy klientów", "wymyślać pomysły na posty", "tłumaczyć na Polski", "pisać treści marketingowe", "się zmotywować", "zrozumieć potrzeby klienta"])
    const [triggers, setTriggers] = useState(["zapyta o napisanie treści", "poprosi o poradę", "zapyta o firmę", "poprosi o motywację", "poprosi o dodatkowe informacje", "zapyta o regulamin"])

    const router = useRouter();
    const choreRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLInputElement>(null);

    const texts = [
        `Skanuję treści...`,
        "Analizuję zawartość...",
        "Czytam wszystkie treści...",
        "Pobieram kontekst...",
        "Przyswajam wiedzę...",
        "Rozpoczynam naukę...",
        "Zapamiętuję nazwę zasobów...",
        "Kategoryzuję informacje...",
        "Zapamiętuję wyniki...",
        "Daj mi chwilę...",
        "Powtarzam proces...",
      ];

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
            const { name, companyName, exampleContent, aboutCompany, image, description, folders } = props.assistantToEdit;
            setName(name);
            setCompany(companyName);
            setRole(description);
            setBusinessSector(aboutCompany);
            setSelectedFolders(folders);
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
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("user_id");
                try {
                    if (workspace && workspace !== "undefined" && workspace !== "null") {
                        const { data } = await api.get(`/folders/${workspace}`, {
                          headers: {
                            Authorization: `${token}`,
                          },
                        });
                        setFolders(data);
                        setFoldersLoading(false);
                      } else {
                        const { data } = await api.get(`/folders/owner/${userId}`, {
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
        if (openNewChore) {
          choreRef.current?.focus();
        }
    }, [openNewChore]);

    useEffect(() => {
        if (openNewTrigger) {
          triggerRef.current?.focus();
        }
    }, [openNewTrigger]);

    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
        setImageError(false);
    };

    const modalClick = (e: any) => {
        e.stopPropagation();
        if (openNewChore) {
            setOpenNewChore(false);
        }
        if (openNewTrigger) {
            setOpenNewTrigger(false);
        }
      };

    const handleFolderClick = (folderId: string) => {
        setSelectedFolders((prevSelectedFolders) => {
          if (!prevSelectedFolders) {
            return [folderId];
          }
          
          return [...prevSelectedFolders, folderId];
        });
      };

    const handleChoreClick = (chore: string) => {
        setSelectedChores((prevSelectedChores) => {
          if (!prevSelectedChores) {
            return [chore];
          }
          
          return [...prevSelectedChores, chore];
        });
    };

    const handleTriggerClick = (trigger: string) => {
        setSelectedTriggers((prevSelectedTriggers) => {
          if (!prevSelectedTriggers) {
            return [trigger];
          }
          
          return [...prevSelectedTriggers, trigger];
        });
    };

    const handleAddChore = (e: any) => {
        e.preventDefault();
        setChores((prevChores) => {
            if (!prevChores) {
              return [tabInput];
            }
            return [...prevChores, tabInput];
        });
        setSelectedChores((prevSelectedChores) => {
          if (!prevSelectedChores) {
            return [tabInput];
          }
          return [...prevSelectedChores, tabInput];
        });
        setTabInput("")
        setOpenNewChore(false);
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
        let imageURL = "";
        let description = "";
        let category = "";
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        setLoading(true);

        let tone = "";
        if (exampleText) {
        if (exampleText.length > 100 && exampleText.length < 2000) {
            try {
                const toneCompletion = await api.post("/completion", {
                    prompt: `Text to analyze: "${exampleText}". This tone is`,
                    model: "gpt-4",
                    temperature: 0,
                    systemPrompt: "You are professionally analysing tone of voice of the given text by completing last sentence imperatively in second-person narrative. You are very specific in expressing what the tone of voice used in text is and you carefully analyze it. You NEVER describe what the text is about, its content or anything else about its content. You recognise ONLY the tone, style and target audience. Make this description of tone and style up to 50 words long. Reply in Polish."
                },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                tone = "Twój ton wypowiedzi jest " + toneCompletion.data.completion;
            } catch (e) {
                console.log(e);
            }
        }
        }

        let choresMessage = "";
        let triggersMessage = "";
        if (selectedChores.length > 0) {
            const choresToString = selectedChores.join(', ');
            choresMessage = "You are always eager to help user " + choresToString + ". ";
        }
        if (selectedTriggers.length > 0) {
            const triggersToString = selectedTriggers
            .map(trigger => `-whenever user ${trigger}, you always reply only exactly: "[%fetch_info%]".\n`)
            .join('\n');
            triggersMessage = `Rules you always obey: \n` + triggersToString;
        }

        prompt = `People call you ${name}. Your native language is ${language} and you always respond in a way that is grammatically correct. When you are not sure about the answer just admit you don't know. Whenever user gives you some context while replying take into account only things relevant to the user query and don't mention that the user gave you the context. You behave and have knowledge like ${role}. ${tone} ${choresMessage} \n${triggersMessage}`;
        noEmbedPrompt = `People call you ${name}. Your native language is ${language} and you always respond in a way that is grammatically correct. You behave and have knowledge like ${role}. ${tone} ${choresMessage}`
        imageURL = "https://asystentai.infura-ipfs.io/ipfs/QmRRfqpJDMDWZ9ZoJcct2GU24v2cy3JNkRdhEAohatg7na";
        category = "general"
        try {
            const documentsResponse = await api.post('/folders/documents', {folderIds: selectedFolders}, {
                headers: {
                    Authorization: token
            }});
            if(image) {
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
                    description: role,
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
                const workspace = localStorage.getItem("workspace");
                if (workspace && workspace !== "undefined" && workspace !== "null") {
                    const { data } = await api.get(`/workspace-company/${workspace}`, {
                        headers: {
                        authorization: token
                        }
                    });
                    const createdAssistant = await api.post("/create-assistant", {
                        owner: data.company[0]._id,
                        name: name,
                        companyName: company,
                        aboutCompany: businessSector,
                        prompt,
                        documents: documentsResponse.data,
                        folders: selectedFolders,
                        description: role,
                        exampleContent: exampleText,
                        category,
                        image: imageURL,
                        noEmbedPrompt
                    }, 
                    {
                        headers: {
                            Authorization: token
                        }
                    });
                    setLoading(false);
                    props.onClose();
                    props.setAssistants((prevAssistants: any) => [...prevAssistants, createdAssistant.data.assistant]);
                } else {
                    let userId = localStorage.getItem("user_id");
                    const createdAssistant = await api.post("/create-assistant", {
                        owner: userId,
                        name: name,
                        companyName: "",
                        aboutCompany: "",
                        prompt,
                        documents: documentsResponse.data,
                        folders: selectedFolders,
                        description: role,
                        exampleContent: exampleText,
                        category,
                        image: imageURL,
                        noEmbedPrompt
                    }, 
                    {
                        headers: {
                            Authorization: token
                        }
                    });
                    setLoading(false);
                    props.onClose();
                    props.setAssistants((prevAssistants: any) => [...prevAssistants, createdAssistant.data.assistant]);
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
                <Centered>
                    {props.assistantToEdit ?
                        <ModalTitle>Zaktualizuj Asystenta AI</ModalTitle>
                        :
                        <ModalTitle>Stwórz Swojego Asystenta AI</ModalTitle>
                    }

                </Centered>
                <Space margin="2.5rem 0 0 0"/>
                <Tabs justifyContent="space-evenly">
                    {selectedTab === 1 ? 
                    <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={bookIcon} alt={'Icon'}></Image></TabIcon>Ogólne</SelectedMainTab> 
                    :
                    <MainTab onClick={() => setSelectedTab(1)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={bookIcon} alt={'Icon'}></Image></TabIcon>Ogólne</MainTab>
                    } 
                    {selectedTab === 2 ? 
                    <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={openedBookIcon} alt={'Icon'}></Image></TabIcon>Wiedza</SelectedMainTab>
                    :
                    <MainTab onClick={() => setSelectedTab(2)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={openedBookIcon} alt={'Icon'}></Image></TabIcon>Wiedza</MainTab>
                    }
                    {selectedTab === 3 ? 
                    <SelectedMainTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={behaviorIcon} alt={'Icon'}></Image></TabIcon>Zachowanie</SelectedMainTab>
                    :
                    <MainTab onClick={() => setSelectedTab(3)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={behaviorIcon} alt={'Icon'}></Image></TabIcon>Zachowanie</MainTab>
                    }
                </Tabs>
                {selectedTab === 1 &&
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem"}}>
                    <div style={{width: "48%"}}>
                        <Label>Asystent ma nazywać się...</Label>
                        <Input type="text" placeholder="Marketer Michał" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                <div style={{width: "48%", display: "flex", flexWrap: "wrap"}}>
                    <Label>Domyślny język Asystenta to...</Label>
                    <Dropdown
                        type="text"
                        placeholder="Polski"
                        required
                        value={language}
                        values={languagesList}
                        onChange={setLanguage}
                        error={undefined}
                    /> 
                </div>
                <Label>Asystent ma być jak...</Label>
                <Input type="text" placeholder="profesjonalny marketer i copywriter z wieloletnim doświadczeniem" value={role} onChange={(e) => setRole(e.target.value)}/>
                <Label>Dodaj zdjęcie profilowe <p style={{color: "#777777", marginLeft: "0.5rem", fontSize: "0.85rem"}}>(opcjonalne)</p></Label>
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
                    <Centered>
                        <ContinueBtn onClick={() => setSelectedTab(2)}>
                                Kontynuuj
                        </ContinueBtn>
                    </Centered>
                </div>
                }
                {selectedTab === 2 &&
                <div>
                <Label>Wybierz foldery z których Asystent ma czerpać wiedzę...</Label>
                <Tabs justifyContent="left">
                    {!foldersLoading ? (
                        folders.length > 0 ? 
                        folders.map((folder) => {
                        if (selectedFolders?.includes(folder._id)) {
                            return (
                            <SelectedFolder onClick={() => setSelectedFolders(selectedFolders.filter((id) => id !== folder._id))} key={folder._id}>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <FolderTitle style={{ color: "black" }}>
                                    <FolderIcon>
                                    <BsFillFolderFill style={{ height: "auto", width: "100%" }} />
                                    </FolderIcon>
                                    {folder.title}
                                </FolderTitle>
                                </div>
                            </SelectedFolder>
                            )
                        } else {
                            return (
                            <Folder onClick={() => handleFolderClick(folder._id)} key={folder._id}>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                <FolderTitle style={{ color: "black" }}>
                                    <FolderIcon>
                                    <BsFillFolderFill style={{ height: "auto", width: "100%" }} />
                                    </FolderIcon>
                                    {folder.title}
                                </FolderTitle>
                                </div>
                            </Folder>
                            );
                        }
                        })
                        :
                        <div style={{display: "flex", width: "100%", marginTop: "0.25rem", justifyContent: "flex-start"}}>
                            <AddFolderBtn onClick={() => props.openNewFolder()}><ColorfulText><b>+ Stwórz folder z wiedzą</b></ColorfulText></AddFolderBtn>
                        </div>
                    ) : (
                    <div style={{ marginTop: "3vh", width: "100%", display: "flex", justifyContent: "center" }}>
                            <BlueLoader />
                    </div>
                    )}
                </Tabs>
                <Label>Przykład stylu w jakim ma pisać...<p style={{color: "#777777", marginLeft: "0.5rem", fontSize: "0.85rem"}}>(opcjonalne)</p></Label>
                <TextArea
                    id="about-field"
                    height= "10rem"
                    padding="0.5rem"
                    placeholder="Wklej lub napisz przykładową treść, która jak najlepiej odda styl komunikacji Twojej firmy."
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
                <Centered>
                    <ContinueBtn onClick={() => setSelectedTab(3)}>
                            Kontynuuj
                    </ContinueBtn>
                </Centered>
                </div>
                }
                {selectedTab === 3 &&
                <div>
                {/* <Label>Asystent ma być...</Label>
                <Tabs justifyContent="left">
                    {selectedCharacter === 1 ? 
                    <SelectedTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={artist} alt={'Icon'}></Image></TabIcon>Kreatywny</SelectedTab> 
                    :
                    <Tab onClick={() => setSelectedCharacter(1)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={artist} alt={'Icon'}></Image></TabIcon>Kreatywny</Tab>
                    } 
                    {selectedCharacter === 2 ? 
                    <SelectedTab><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={detective} alt={'Icon'}></Image></TabIcon>Rzeczowy</SelectedTab>
                    :
                    <Tab onClick={() => setSelectedCharacter(2)}><TabIcon><Image style={{ width: "100%", height: "auto" }}  src={detective} alt={'Icon'}></Image></TabIcon>Rzeczowy</Tab>
                    }
                </Tabs> */}     
                <Label>Asystent ma pomagać mi...</Label>         
                <Tabs justifyContent="left">
                    {chores.map((chore) => {
                        if (selectedChores?.includes(chore)) {
                            return (
                            <SelectedTab onClick={() => setSelectedChores(selectedChores.filter((selectedChore) => selectedChore !== chore))} key={chore}>
                                {chore}
                            </SelectedTab>
                            )
                        } else {
                            return (
                            <Tab onClick={() => handleChoreClick(chore)} key={chore}>
                                {chore}
                            </Tab>
                            );
                        }
                        })}
                        {openNewChore ? 
                            <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => handleAddChore(e)}><TabInput ref={choreRef} type="text" value={tabInput} onChange={(e) => setTabInput(e.target.value)}/></form> 
                            : 
                            <div onClick={(e) => e.stopPropagation()} >
                                <AddTab onClick={() => setOpenNewChore(true)}><BsPlusLg style={{width: "auto", height: "60%"}}/></AddTab>
                            </div>
                        }
                </Tabs>
                <Label>Asystent ma bazować na wyuczonej wiedzy gdy...</Label>    
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
                <Centered>
                    {props.assistantToEdit ?
                     <ContinueBtn onClick={createAssistant}>
                        {loading ?
                        <Loader color="white" />
                        :
                        <p>Zaktualizuj Asystenta</p>
                        }
                    </ContinueBtn>        
                    :
                    <ContinueBtn onClick={createAssistant}>
                        {loading ?
                        <Loader color="white" />
                        :
                        <p>+ Dodaj Asystenta</p>
                        }
                    </ContinueBtn>           
                    }

                </Centered>
                </div>
                }
                </div>
                :
                <div>
                <ModalTitle>Trwa proces nauki</ModalTitle>
                <Centered>
                    <ModalDescription>Asystent- jak i każdy nowy pomocnik musi się najpierw wszystkiego nauczyć.</ModalDescription>
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
    width: 52vw;
    border-radius: 25px;
    background: white;
    padding: 3rem 6rem 3rem 6rem;
    border: 2px solid #E5E8F0;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    margin-top: 4rem;
    margin-bottom: 15rem;
    cursor: auto;

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
    @media (max-width: 768px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
`

const ModalTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
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
    padding: 0.75rem 1.75rem 0.75rem 1.75rem;
    font-weight: 500;
    margin: 0 0.5rem 0 0.5rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    border-radius: 12px;
    cursor: pointer;
`

const SelectedMainTab = styled.div`
    padding: 0.65rem 1.75rem 0.65rem 1.75rem;
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
    background-color: #0D0E16;
    color: white;
`

const AssistantTab = styled.div`
    padding: 2rem 1.5vw 2.5rem 1.5vw;
    width: 10vw;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 1rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        background: #E3E6F1;
    }
`

const SelectedAssistantTab = styled.div`
    padding: 2rem 1.5rem 2.5rem 1.5rem;
    font-weight: 700;
    width: 16vw;
    height: 14.5rem;
    margin: 0 0.5rem 0.5rem 0rem;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 1rem;
    border: solid 3px transparent;
    overflow: hidden;
    border-radius: 12px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    cursor: pointer;
    transition: all 0.4s ease;
`

const AddTab = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    width: 2.5rem;
    color: #CFD5E8;
    border: dashed 2px #CFD5E8;
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

const AssistantIcon = styled.div<Background>`
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.5rem;
    border-radius: 10px;
    overflow: hidden;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const AssistantDescription = styled.p`
    margin-top: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
`

const Label = styled.p`
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 0.7rem;
    align-items: center;
    display: flex;
    font-weight: 500;
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
  border: solid 2px #ECEEF2;
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
    width: 72vw;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;

const Pfp = styled.div<Background>`
    width: 6rem;
    height: 6rem;
    margin-right: 1.25rem;
    overflow: hidden;
    border-radius: 20px;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const AddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 6rem;
    height: 6rem;
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
    top: 5.2rem;
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

const FolderIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.1rem;
    color: black;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease;
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
`

const SelectedFolder = styled.div`
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: solid 3px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: 2px 2px 6px rgba(22, 27, 29, 0.23), -1px -1px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    padding: 0.2rem 2rem 0.2rem 2rem;
    cursor: pointer;
    margin: 0.7rem 0.4rem 0rem 0.4rem;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const FolderTitle = styled.p`
    margin-left: 0rem;
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        margin-top: 3rem;
        padding: 0rem 5rem 0rem 5rem;
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
    background-color: #EEF1F3; 
    border: 2px solid #E5E8F0;
    padding: 0.5rem 2rem 0.5rem 2rem; 
    border-radius: 12px; 
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.10);
    transition: all 0.4s ease;  
    &:hover {
        transform: scale(0.97);
        box-shadow: none;
    }
`