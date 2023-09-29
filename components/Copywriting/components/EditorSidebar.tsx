import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import TextArea from "@/components/forms/TextArea";
import { BsCheckLg, BsFillLightbulbFill, BsFillMicFill, BsFillPlayFill, BsPencilFill, BsStars } from "react-icons/bs";
import Input from "@/components/forms/Input";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import Dropdown from "@/components/forms/Dropdown";
import { FaRuler } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { Switch } from "@headlessui/react";
import { RiKey2Fill } from "react-icons/ri";
import Label from "@/components/Common/Label";
import Space from "@/components/Docs/common/Space";
import api from "@/pages/api";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import axios from "axios";
import { selectFoldersState } from '@/store/selectedFoldersSlice'
import { useSelector } from 'react-redux'
import { TbPlayerStopFilled } from "react-icons/tb";
import CustomDropdown from "@/components/forms/CustomDropdown";

const lengths = ["Short", "Medium", "Long", "Very Long"];
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

interface Document {
    owner: string,
    title: string,
    category: string,
    timestamp: string,
    ownerEmail: string,
    vectorId: string
  }
  interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[] | [],
    updatedAt: string,
    _id:  string,
    workspace: string,
  }
  

const EditorSidebar = (props: {
    description: string, 
    title: string, 
    setTitle: any, 
    setDescription: any, 
    editor: any, 
    embeddedVectorIds: any, 
    abortController: any, 
    setAbortController: any,
    generating: boolean,
    setGenerating: any,
    toneOfVoice: string,
    setToneOfVoice: any,
}) => {
    const [googlePreviewLoading, setGooglePreviewLoading] = useState(true);
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showEditDescription, setShowEditDescription] = useState(false);
    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState("");
    const [length, setLength] = useState("Long");
    const [language, setLanguage] = useState("English");
    const [toneToggle, setToneToggle] = useState(true);
    const [keywordsToggle, setKeywordsToggle] = useState(true);
    const [keywords, setKeywords] = useState("");
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    let selectedFolders: Folder[] = useSelector(selectFoldersState);

    const stopReplying = () => {
        props.abortController.abort();
        props.setGenerating(false);
        setLoading(false);
      }
      
    useEffect(() => {
        if (!props.description) {
            props.setDescription("Example content description for Google preview")
        }
        if (!props.title) {
            props.setTitle("New Content Title")
        }
        
        setTimeout(() => {
        setGooglePreviewLoading(false);
        }, 500);
    }, []);

    const saveTitle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowEditTitle(false);
    }

    const saveDescription = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowEditDescription(false);
    }

    const composeCompletion = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        props.setAbortController(newAbortController);
        if (loading || props.generating) {
          stopReplying();
          return;
        }
        props.editor.commands.focus()
        const { from, to } = props.editor.state.selection;
        let initialPosition = from;
        const text = props.editor.getText();
        if (text.length > 0) {
            props.editor.chain().insertContent("\n\n").run();
        }
        setLoading(true);
        setTopic("");
        setKeywords("");
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
    
        let reply = "";
        let context = "";
        let companyDataIds = [];
        let allDocuments = selectedFolders.reduce((acc: Document[], folder: Folder) => {
          return acc.concat(folder.documents || []);
        }, [] as Document[]);
        
        if (allDocuments.length > 0) {
          try {
            const vectorIdsResponse = await api.post("/getPineconeIds", {documents: allDocuments}, {
              headers: {
                Authorization: token
              }
            });
            companyDataIds = vectorIdsResponse.data;
          } catch (e) {
            console.log(e);
          }
        }
        
        // Combine companyDataIds and embeddedVectorIds
        let combinedIds = [...companyDataIds, ...props.embeddedVectorIds];
        
        // Check if combined array is not empty
        if (combinedIds.length > 0) {
          try {
            const chunks = await axios.post(
              "https://www.asistant.ai/query",
              {
                "queries": [
                  {
                    "query": topic + "" + keywords,
                    "filter": {
                      "document_id": combinedIds  // Use combined array here
                    },
                    "top_k": 2
                  }
                ]
              },
              {
                headers: {
                  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                }
              }
            );
        
            chunks.data.results[0].results.forEach((item: { text: string; }) => {
              context += item.text + " ";
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Combined ID array is empty. Not sending query.");
        }
    
        let previousTextPrompt = "";
        let tonePrompt = "";
        let keywordsPrompt = "";
        let lengthPrompt = "Please make it very long- around 1000 words, detailed, packed with informations and very comprehensive.";
        let prompt = "";
        let contextPrompt = "";
        if (text.length > 2) {
            previousTextPrompt = `So far I have written: "${text.slice(-800)}" `;
        }
        if (props.toneOfVoice && toneToggle) {
            tonePrompt = `Please write it in ${props.toneOfVoice} tone of voice. `;
        }
        if (keywords && keywordsToggle) {
            keywordsPrompt = `Please remember to seamlessly include the following keywords: ${keywords} `;
        }
        if (length === "Długi") {
            lengthPrompt = "Please write it in between 600-800 words. ";
        } else if (length === "Średni") {
            lengthPrompt = "Please write it in around 400 words. ";
        } else if (length === "Krótki") {
            lengthPrompt = "Please write it in around 150 words. ";
        }

        if (context.length > 0) {
            contextPrompt = `Additional context that might be relevant:
            ${context} 
            `
        }

        if (topic.length > 0) {
            prompt = `${previousTextPrompt}Now please do this task: ${topic}. Make sure to write it in ${language} language. ${tonePrompt}${keywordsPrompt}${lengthPrompt}
            ${contextPrompt}
        `;
        } else if (text.length > 0) {
            prompt = `So far I have written: "${text.slice(-800)}" ${tonePrompt}${keywordsPrompt}Now please analyze what I have written and seamlessly continue my writing in human-like way that is insightful and engaging for the reader. Don't repeat what I have already written, but rather just refer to it while making new points. Make sure to write it in ${language} language. ${lengthPrompt}${contextPrompt}
            `;
        } else {
            prompt = "Please write a greeting and ask what you can do for me."
        }
        let systemPrompt = `You are a professional copywriter with years of experience and you specialize in writing easily to understand best performing SEO conetnt. You write like a professional human copywriter and you make the content sound natural and emphatic. You always respond in ${language} language. You fluently write content in ${language} language and before writing anything you always make sure its syntax sound human-like and grammar is correct. You are always factual and you write engaging and valuable content. If user asks you anything else you respond that you only can write best performing SEO content.`;
        let model = "gpt-4-32k";
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: "Generated SEO content", model, systemPrompt}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if(response.body){
            props.setGenerating(true);
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                props.setGenerating(false);
                const conversationBottom = document.getElementById("conversation-bottom");
                if(conversationBottom){
                    conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
                }
                if (props.editor) {
                    if (text.length > 0) {
                        props.editor.commands.setTextSelection({
                            from: from + 2,
                            to: from + reply.length + 2,
                          });
                    } else {
                        props.editor.commands.setTextSelection({
                            from: from,
                            to: from + reply.length,
                        });
                    }

                  }
                break;
              }
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setLoading(false);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    props.editor.view.dispatch(
                        props.editor.view.state.tr.insertText(data.content, initialPosition)
                    );
                    initialPosition += data.content.length;
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setLoading(false);
          } else {
            console.log(e);
            setLoading(false);
          }
        } finally {
          props.abortController.abort();
        }
      }
    
    return (
        <SidbarContainer>
            {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
            <Sidebar className="border-stone-200">
            <div className='w-full rounded-3xl'>
                <div>
                        {googlePreviewLoading ?
                        <MultiLineSkeletonLoader lines={3} justifyContent={'left'} />
                        :
                        <>
                        <form onSubmit={(e) => saveTitle(e)} className='text-[#180EA4] font-medium text-xl leading-snug'>
                            {showEditTitle ?
                            <div className="flex items-center">
                                <Input padding="0.75rem" height='2.8rem' value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
                                <SaveBtn onClick={() => setShowEditTitle(false)}><BsCheckLg style={{width: "100%"}}/></SaveBtn>  
                            </div>
                            :
                            <>
                            {(props.title || googlePreviewLoading) && props.title.substring(0, 60)}{props.title.length > 60 && <>...</>}
                            <EditButton onClick={() => setShowEditTitle(true)}><BsPencilFill style={{width: "100%"}}/></EditButton>      
                            </>
                            }
                        </form>
                        <form onSubmit={(e) => saveDescription(e)} className='text-[#606367] font-medium mt-1'>
                            {(props.description) && 
                            <div>
                                {showEditDescription ?
                                <div className="flex items-center">
                                    <Input padding="0.75rem" height='2.8em' value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                                    <SaveBtn onClick={() => setShowEditDescription(false)}><BsCheckLg style={{width: "100%"}}/></SaveBtn>    
                                </div>
                                :
                                <>
                                <span className='text-[#717579] font-normal'>{moment().format('DD MMMM YYYY')}</span> - 
                                <div style={{display: "inline"}}>{props.description.substring(0, 62)}{props.description.length > 59 && <>...</>}</div>
                                <EditButton onClick={() => setShowEditDescription(true)}><BsPencilFill style={{width: "100%"}}/></EditButton>   
                                </>
                                }
                            </div> 
                            }
                        </form>
                        </>
                        }
                    </div>
                    <Space margin="1.5rem" />
                    <FoldersDropdown />
                    <OptionContainer>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex" }}>
                        <LabelIcon>
                            <BsFillLightbulbFill style={{ width: "100%", height: "auto" }} />
                        </LabelIcon>
                        <Label>What to write?</Label>
                        </div>
                    </div>
                        <TextArea 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)} 
                            height="5.8rem" 
                            padding="0.75rem"
                            placeholder="Write an intro for..."
                        />
                    </OptionContainer>
                    <div className="flex justify-between">
                    <div style={{width: "48%"}}>
                    <OptionContainer>
                        <div style={{display: "flex"}}>
                            <LabelIcon>
                                <IoLanguage style={{width: "100%", height: "auto"}}/>
                            </LabelIcon>
                            <Label>
                                Language
                            </Label>
                        </div>
                        <CustomDropdown
                            width="100%"
                            id="name"
                            type="text"
                            placeholder="3"
                            required
                            value={language}
                            values={languages.sort()}
                            onChange={setLanguage}
                            error={undefined}
                        />
                    </OptionContainer>  
                    </div>    
                    <div style={{width: "48%"}}>
                    <OptionContainer>
                        <div style={{display: "flex"}}>
                            <LabelIcon>
                                <FaRuler style={{width: "100%", height: "auto"}}/>
                            </LabelIcon>
                            <Label>
                                Length
                            </Label>
                        </div>
                        <Dropdown
                            width="100%"
                            id="name"
                            type="text"
                            placeholder="3"
                            required
                            value={length}
                            values={lengths}
                            onChange={setLength}
                            error={undefined}
                        />
                    </OptionContainer>
                    </div>
                </div>
                    <OptionContainer>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex" }}>
                            <LabelIcon>
                                <BsFillMicFill style={{width: "100%", height: "auto"}}/>
                            </LabelIcon>
                            <Label>
                                Tone of voice
                            </Label>
                        </div>
                        <Switch
                            checked={toneToggle}
                            onChange={setToneToggle}
                            style={{ boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)", marginTop: "-0.7rem"}}
                            className={`${
                            toneToggle ? 'bg-green-400' : 'border-2 border-gray-200'
                            } relative inline-flex items-center h-5 rounded-full w-11 transition-colors focus:outline-none`}
                        >
                            <span className="sr-only">Toggle Tone</span>
                            <span
                            className={`${
                                toneToggle ? 'translate-x-6' : 'translate-x-0 border-2 border-gray-200'
                            } inline-block w-5 h-5 transform bg-white border rounded-full transition-transform`}
                            />
                        </Switch>
                        </div>
                        <Input 
                            value={props.toneOfVoice} 
                            padding="0.75rem"
                            onChange={(e) => props.setToneOfVoice(e.target.value)} 
                            height="2.8rem" 
                            placeholder="Scientific, Elon Musk etc."
                        />
                    </OptionContainer>
                    <OptionContainer>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex" }}>
                            <LabelIcon>
                                <RiKey2Fill style={{width: "100%", height: "auto"}}/>
                            </LabelIcon>
                            <Label>
                                Keywords
                            </Label>
                        </div>
                        <Switch
                            checked={keywordsToggle}
                            onChange={setKeywordsToggle}
                            style={{ boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)", marginTop: "-0.7rem"}}
                            className={`${
                            keywordsToggle ? 'bg-green-400' : 'border-2 border-gray-200'
                            } relative inline-flex items-center h-5 rounded-full w-11 transition-colors focus:outline-none`}
                        >
                            <span className="sr-only">Toggle Keywords</span>
                            <span
                            className={`${
                                keywordsToggle ? 'translate-x-6' : 'translate-x-0 border-2 border-gray-200'
                            } inline-block w-5 h-5 transform bg-white border rounded-full transition-transform`}
                            />
                        </Switch>
                        </div>
                        <Input 
                            value={keywords} 
                            onChange={(e) => setKeywords(e.target.value)} 
                            height="2.8rem" 
                            padding="0.75rem"
                            placeholder="ai, marketing..."
                        />
                    </OptionContainer>
                </div>
                {props.editor &&
                <>
                {!props.generating ?
                <GenerateButton id="generate-editor-btn" onClick={() => composeCompletion()}>
                {loading ?
                    <TypingAnimation  colorful={false}/>
                    :
                    <>
                    <div style={{width: "1.5rem", height: "1.5rem", marginRight: "0.75rem"}}>
                        {props.editor.getText().length > 0 ?
                        <BsFillPlayFill style={{width: "100%", height: "auto"}} />
                        :
                        <BsStars style={{width: "100%", height: "auto"}}/>
                        }
                    </div>
                    {props.editor.getText().length > 0 ?
                        <p>
                            Continue
                        </p>
                        :
                        <p>
                            Generate cotent
                        </p>
                    }


                    </>             
                }
                </GenerateButton>
                :
                <GenerateButton id="stop-editor-btn" onClick={() => stopReplying()}>
                    <div style={{width: "1.5rem", height: "1.5rem", marginRight: "0.75rem"}}>
                        {props.editor.getText().length > 0 ?
                        <TbPlayerStopFilled style={{width: "100%", height: "auto"}} />
                        :
                        <BsStars style={{width: "100%", height: "auto"}}/>
                        }
                    </div>
                    <p>Stop</p>
                </GenerateButton>
                }
                </>
                }
            </Sidebar>
        </SidbarContainer>
    )
}


export default EditorSidebar;

const SidbarContainer = styled.div`
    width: 25rem;
    height: calc(100vh - 1.5rem);
`

const Sidebar = styled.div`
    width: 25rem;
    height: calc(100vh - 1.5rem);
    padding: 1.5rem 1.5rem 2rem 1.5rem;
    position: fixed;
    top: 0.75rem;
    border-bottom-left-radius: 25px;
    border-top-left-radius: 25px;
    background-color: white;
    margin-left: 1rem;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;

    @media(max-height: 760px) {
        position: absolute;
        height: 47rem;
    }
`

const EditButton = styled.button`
    width: 1rem;
    margin-left: 0.5rem;
    color: black;
`

const SaveBtn = styled.button`
    height: 2.6rem;
    margin-top: 0.1rem;
    margin-left: 0.3rem;
    border: solid 3px transparent;
    font-weight: 700;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -0.4rem;
    color: white;
    width: 3rem;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
`

const LabelIcon = styled.div`
width: 1rem;
height: 1rem;
margin-right: 0.5rem;
margin-left: 0.25rem;
color: black;
`


const OptionContainer = styled.div`
margin-top: 2.75vh;
`

const GenerateButton = styled.button`
height: 3.4rem;
width: 100%;
text-align: center;
border-radius: 20px;
transition: all 0.4s ease;
border: solid 3px transparent;
font-weight: 700;
box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
background-origin: border-box;
background-clip: padding-box, border-box;
align-items: center;
background: linear-gradient(40deg, #6578F8, #64B5FF);
background-size: 120%;
background-position-x: -1rem;
display: flex;
align-items: center;
justify-content: center;
&:hover {
  transform: scale(0.95);
}
`
