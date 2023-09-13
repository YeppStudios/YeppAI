import styled, { keyframes } from 'styled-components';
import { use, useEffect, useRef, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import articleIcon from "@/public/images/article-icon.png";
import linkIcon from "@/public/images/link-icon.png";
import Centered from "../Centered";
import { Loader } from '../Common/Loaders';
import { BsArrowRepeat, BsCheck, BsCheckLg, BsChevronLeft, BsEye, BsFillLightbulbFill, BsFillMicFill, BsUiChecks, BsPencilFill, BsPencilSquare, BsPlusLg, BsXLg } from 'react-icons/bs';
import Image from 'next/image';
import webIcon from "@/public/images/web-icon.png";
import pencilIcon from "@/public/images/pencil-icon.png";
import handwritingIcon from "@/public/images/handwriting-icon.png";
import FoldersDropdown from '@/components/forms/FolderDropdown';
import { SlOptionsVertical } from 'react-icons/sl';
import TextArea from '@/components/forms/TextArea';
import { SparklesIcon } from '@heroicons/react/20/solid';
import BackBtn from '@/components/Common/BackBtn';
import BackBtnIcon from '@/components/Common/BackBtnIcon';
import api from '@/pages/api';
import axios from 'axios';
import MultiLineSkeletonLoader from '@/components/Common/MultilineSkeletonLoader';
import { TbWorld } from "react-icons/tb";
import moment from 'moment';
import Dropdown from '@/components/forms/Dropdown';
import NoElixir from '../Modals/LimitModals/NoElixir';
import ModalTitle from '../Modals/common/ModalTitle';
import TypingAnimation from '../Modals/common/TypingAnimation';
import { FaRuler } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { RiKey2Fill } from 'react-icons/ri';
import { MdTitle } from 'react-icons/md';
import CustomDropdown from '@/components/forms/CustomDropdown';

const types = ["article", "blog", "guide", "ranking"];
const languagesList = ["Polish", "English", "Spanish", "French", "Italian", "Ukrainian", "German", "Chinese", "Bulgarian", "Russian"];
const tones = ["Formal", "Friendly", "Informative", "Persuasive", "Scientific", "Lifestyle"];

const CopywritingModal = (props: {
    onClose: any, 
    onSuccess: any,
    conspect: string,
    setConspect: any,
    title: string,
    setTitle: any,
    description: string,
    setDescription: any,
    embeddedVectorIds: string[],
    setEmbeddedVectorIds: any,
    contentType: string,
    setContentType: any,
    language: string,
    setLanguage: any,
    toneOfVoice: string,
    setToneOfVoice: any,
    setSectionLength: any
}) => {

    const [phrase, setPhrase] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [keywords, setKeywords] = useState<string>("");
    const [selectedLinks, setSelectedLinks] = useState<{title: string, link: string, snippet: string}[]>([]);
    const [sourceLoading, setSourceLoading] = useState(false);
    const [headersLoading, setHeadersLoading] = useState(false);
    const [googlePreviewLoading, setGooglePreviewLoading] = useState(false);
    const [generatingGooglePreview, setGeneratingGooglePreview] = useState(false);
    const [generatingOutline, setGeneratingOutline] = useState(false);
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showEditDescription, setShowEditDescription] = useState(false);
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [selectedLinksError, setSelectedLinksError] = useState(false);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [length, setLength] = useState("5000");
    const [peopleAlsoAsk, setPeopleAlsoAsk] = useState<{question: string, snippet: string, title: string}[]>([]);
    const [tabInput, setTabInput] = useState<string>("");
    const [conspectText, setConspectText] = useState<string>("");
    const [openNewLink, setOpenNewLink] = useState(false);
    const [abortController, setAbortController] = useState(new AbortController());
    const [currentText, setCurrentText] = useState(0);
    const linkRef = useRef<HTMLInputElement>(null);
    const topRef = useRef<HTMLInputElement>(null);
    const conspectTextAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = 'static';
          };
    }, []);

    const texts = [
      "Checking out the conspect...",
      "Remembering the conspect...",
      "Saving conspect in correct format...",
      `Scanning websites...`,
      "Analysing chosen sources...",
      "Verifying sources...",
      "Reading...",
      "Learning content...",
      "Categorizing info...",
      "Memorizing the results...",
      "Give me a sec...",
      "Give me some more time to learn...",
      "It's taking me a while to read it, please wait...",
      "Trust me it's worth it...",
      "Reading next source...",
    ];  

    useEffect(() => {
      if (loading) {
        const intervalId = setInterval(() => {
          setCurrentText((prevIndex) =>
            prevIndex === texts.length - 1 ? 0 : prevIndex + 1
          );
        }, 5000);
        return () => clearInterval(intervalId);
      }

    }, [loading, texts.length]);

    const fetchSource = async () => {
        setStep(2);
        setSelectedLinks([]);
        setSourceLoading(true);
        let data = JSON.stringify({
            "q": phrase + " " + props.contentType,
            "gl": "us",
            "hl": "us"
          });
      
          let config = {
            method: 'post',
            url: 'https://google.serper.dev/search',
            headers: { 
              'X-API-KEY': process.env.NEXT_PUBLIC_SERP_API_KEY, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios(config)
          .then((response) => {
            setSearchResults(response.data.organic);
            if(response.data.peopleAlsoAsk){
                setPeopleAlsoAsk(response.data.peopleAlsoAsk)
            }
            setSourceLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setSourceLoading(false);
          });
    }

    const changeGooglePreview = (result: any) => {
        props.setTitle(result.question);
        props.setDescription(result.snippet);
    }

    const stopReplying = () => {
        abortController.abort();
    }

    const generateGooglePreview = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        setGooglePreviewLoading(true);
        setGeneratingGooglePreview(true);
        setShowEditDescription(false);
        setShowEditTitle(false);
        props.setTitle("");
        props.setDescription("");
        if (generatingGooglePreview) {
          stopReplying();
          return;
        }
    
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

        //get random headers and snippets from selected links
        function randomizeArray(arr: any[]) {
            return arr.sort(() => Math.random() - 0.5).slice(0, 2);
        }
        let selected = randomizeArray(selectedLinks.map(item => ({title: item.title, snippet: item.snippet})));
        let questionsAndSnippets = randomizeArray(peopleAlsoAsk.map(item => ({question: item.question, snippet: item.snippet})));
        let example = ""
        if (props.contentType === "ranking") {
          example = "I want it to be similar to: Top 10 best SEO tools in 2021 you can't miss";
        }
        let relevantQuestions = "";
        if (props.contentType !== "ranking") {
          relevantQuestions = `
          People also ask:
          ${questionsAndSnippets.map(item => `Question: ${item.question}\n ${item.snippet}\n`).join("")}
          `
        }

        let model = "gpt-4-32k";
        let systemPrompt = `You are a copywriter with years of experience. You specialize in coming up with highly converting and attention grabbing titles for ${props.contentType} SEO content in ${props.toneOfVoice} tone. You carefuly analyze the context given by the user and try to understand the target audience and user intents to craft a unique title for ${props.contentType}. Every time you generate a unique title. Title needs to be no more than 65 characters long. Do not quote it. You are proficient in ${props.language} language.`;
        let prompt = `${props.contentType} keyword: ${phrase}. 
        Top ${props.contentType}s on Google:
        ${selected.map(item => `Title: ${item.title}\n ${item.snippet}\n`).join("")}
        ${relevantQuestions}
        Choose only one keywords that fits best the Google title: ${keywords}.
        Now based on this data, generate the best performing title for ${props.contentType} about ${phrase}. Respond only with unique title that is up to 65 characters long and do not wrap it with quotes. Make sure to come up with title that is in ${props.language} language. ${example}
        `
    
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `${props.contentType} title`, model, systemPrompt}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if(response.body){
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                props.setTitle(reply);
                generateGoogleDescription(reply);
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setGooglePreviewLoading(false);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    props.setTitle(reply);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setGeneratingGooglePreview(false);
          } else {
            console.log(e);
            setGeneratingGooglePreview(false);
          }
        } finally {
          abortController.abort();
        }
      }

      const generateGoogleDescription = async (title: string) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        setDescriptionLoading(true);
        if (generatingGooglePreview) {
          stopReplying();
          return;
        }
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
        let exclusions = "";
        if (props.language === "Polish") {
          exclusions = `Instead of "zanurz się" use "zobacz jak", "sprawdź", "przekonaj się" or "poznaj" whatever suits best. Use human-like Polish language.`
        }

        let reply = "";
        let model = "gpt-4-32k";
        let systemPrompt = `You are a copywriter with years of experience. You specialize in coming up with highly converting and attention grabbing Google descriptions for ${props.contentType} SEO content. You carefuly analyze the context given by the user and try to understand the target audience and user intents to craft a unique description for ${props.contentType}. Every time you generate a unique description. Description needs to be no more than 155 characters long. You are proficient in ${props.language} language. You never put descrption in quotes and write it in ${props.toneOfVoice} tone of voice.`;
        let prompt = `For ${props.contentType} titled: ${title}. 
        Come up with the best performing description for ${props.contentType} about ${phrase} in ${props.toneOfVoice} tone of voice. My keywords: ${keywords}. Choose only ones that fit best for description. Respond only with description that is up to 150 characters long. Make sure to come up with title that is in ${props.language} language. ${exclusions}
        `

        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `${props.contentType} description`, model, systemPrompt, temperature: 0.7}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if(response.body){
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setGeneratingGooglePreview(false);
                props.setDescription(reply)
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setDescriptionLoading(false);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    props.setDescription(reply);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
    
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setGeneratingGooglePreview(false);
          } else {
            console.log(e);
            setGeneratingGooglePreview(false);
          }
        } finally {
          abortController.abort();
        }
      }

      const generateOutline = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        if (generatingOutline) {
          return;
        }
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        setHeadersLoading(true);
        setGeneratingOutline(true);
        props.setConspect('');
    
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

        //get random headers and snippets from selected links
        function randomizeArray(arr: any[]) {
            return arr.sort(() => Math.random() - 0.5).slice(0, 2);
        }
        let selected = randomizeArray(selectedLinks.map(item => ({title: item.title, snippet: item.snippet})));
        let questionsAndSnippets = randomizeArray(peopleAlsoAsk.map(item => ({question: item.question, snippet: item.snippet})));
        let form = ""
        if (props.contentType === "ranking") {
          form = "Make it in a form of a ranking list with introduction and summary.";
        }
        let model = "gpt-4-32k";
        let systemPrompt = `You are a professional copywriter. You professionally craft unique outlines of articles that are insightful, informative, and easy to read from the information user provides. You always start with introduction section and end with summary/conclusion one, but naming them more creatively then just "Introduction" and "Conclusion". You are proficient in ${props.language} language and you always make sure that everything you write has correct ${props.language} syntax and grammar. You always come up with intriguing and attention grabbing header titles that encourage reader to read the section.`;
        let prompt = `Craft an outline for ${props.contentType} titled "${props.title}"- ${props.description}. Write it in ${props.toneOfVoice} style.
        Also you can get some inspiration from:
        Top ${props.contentType}s on Google:
        ${selected.map(item => `Title: ${item.title}\n ${item.snippet}\n`).join("")}
        People also ask:
        ${questionsAndSnippets.map(item => `Question: ${item.question}\n ${item.snippet}\n`).join("")}
        Based on title of my ${props.contentType} and description, craft 4/6 unique outline of parahraph headers, brief instructions to write them and keywords. Make sure to use my keywords: ${keywords} and come up with other relevant ones. Remember to check whether the outline is grammarly correct and in ${props.language} language. ${form} Make it in format of:
        Header: Header title
        Instruction: Instruction on how to write this paragraph
        Keywords: Keyword1, Keyword2, Keyword3

        Header: Header title
        Instruction: Instruction on how to write this paragraph
        Keywords: Keyword1, Keyword2, Keyword3
        ...
        `
    
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `Outline generated- ${props.contentType} `, model, systemPrompt, temperature: 0.9}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if(response.body){
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setGeneratingOutline(false);
                setConspectText(reply)
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setHeadersLoading(false);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    setConspectText(reply);
                    if (conspectTextAreaRef.current) {
                      conspectTextAreaRef.current.scrollTop = conspectTextAreaRef.current.scrollHeight;
                    }
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
    
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setGeneratingOutline(false);
            setHeadersLoading(false);
          } else {
            console.log(e);
            setHeadersLoading(false);
            setGeneratingGooglePreview(false);
          }
        } finally {
          abortController.abort();
        }
      }

    const nextStep = () => {
        if (step === 2) {
            generateGooglePreview();
        } else if (step === 3) {
            generateOutline();
        }
        setStep(step + 1);
        if (topRef.current){
            topRef.current.scrollTop = 0;
        }
    }
    

    useEffect(() => {
        if (openNewLink) {
          linkRef.current?.focus();
        }
    }, [openNewLink]);

    const handleLinkSelect = (linkObject: {title: string, link: string, snippet: string}) => {
        let isAlreadySelected = selectedLinks.some(link => link.link === linkObject.link);
    
        if (isAlreadySelected) {
            setSelectedLinksError(false);
            setSelectedLinks(selectedLinks.filter((selectedLink) => selectedLink.link !== linkObject.link));
        } else {
          if (selectedLinks.length >= 3) {
            setSelectedLinksError(true);
            return;
          }
          setSelectedLinks([...selectedLinks, linkObject]);
        }
    }    
    
    const handleAddLink = (e: any) => {
        e.preventDefault();
        setSelectedLinks((prevSelectedLinks) => {
          return [...prevSelectedLinks, {
            title: tabInput,
            link: tabInput,
            snippet: ""
          }];
        });
        setSearchResults((prevSelectedLinks) => {
          return [...prevSelectedLinks, {
            title: tabInput,
            link: tabInput,
            snippet: ""
          }];
        });
        setTabInput("")
        setOpenNewLink(false);
    };

    const submit = async () => {
      if(!conspectText) {
        return;
      }

        let links = selectedLinks.map(item => (item.link));
        setLoading(true);
        try {
          let token = localStorage.getItem("token");
          const conspectCompletion = await api.post("/completion-function", {
            prompt: `${conspectText} JSON array:`,
            model: "gpt-3.5-turbo-0613",
            temperature: 0,
            systemPrompt: `Act as a JSON converter. From list of titles, instructions and keywords of paragraphs return a formatted JSON output that incorporates a list of article section headers, instructions, and keywords as per the given format. You just copy paste the headers, instructions and keywords without changing the content into the JSON format that is exactly like one below. You always respond only with the correct JSON format trying to understand what user wanted to be a header, what a description and what keywords. If there seem to be only headers respond leave description field empty and vice versa. Make sure that the formatting of the final JSON output is correct and adheres exactly to the same format as the one mentioned below:
            [
              {
                "header": "header",
                "instruction": "instruction for writing this section.",
                "keywords": ["keyword1", "keyword2", "keyword3"]
              },
              {
                "header": "header",
                "instruction": "instruction for writing this section.",
                "keywords": ["keyword1", "keyword2", "keyword3"]
              },
              ...
            ]
            `,
            function_definition: {
              "name": "extract_outline_paragraphs",
              "description": "group the outline into an array of objects with header, instruction and keywords.",
              "parameters": {
                  "type": "object",
                  "properties": {
                      "header": {
                          "type": "string",
                          "description": "the paragraph header",
                      },
                      "instruction": {
                        "type": "string", 
                        "description": "instruction on how to write the paragraph",
                      },
                      "keywords": {
                          "type": "string",
                          "description": "keywords to use when writing the paragraph",
                      },
                  },
                  "required": ["header", "instruction", "keywords"],
              },
          }
        },
        {
            headers: {
                Authorization: `${token}`,
            },
        });
          const completionJSON = JSON.parse(conspectCompletion.data.function.arguments);
          console.log(completionJSON);
          console.log(conspectCompletion.data.function.arguments);
          props.setSectionLength((Number(length)/completionJSON.length).toFixed(0))
          props.setConspect(completionJSON);
          try {
            const scrapingResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/scrape-links`, {
              urls: [links[0]]
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
              }
            });
            props.setEmbeddedVectorIds(scrapingResponse.data.ids)
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
          localStorage.setItem("generateIntro", "true");
          props.onSuccess();
        } catch (e) {
            setLoading(false);
            console.log(e);
        }

    }


    return (
        <ModalBackground ref={topRef}>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            <div style={{width: "100%", position: "absolute", top: 0, left: 0}}></div>
            <SlideBottom>
            <Container step={step} onClick={(e) => e.preventDefault()}>
            {step > 1 &&
                    <BackArrow selectedTab={step}>   
                        <BackBtn onClick={() => setStep(step - 1)}>
                            <BackBtnIcon>
                                <BsChevronLeft style={{ width: "200%", height: "auto" }} />
                            </BackBtnIcon> 
                        </BackBtn>
                    </BackArrow>
            } 
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            {step === 1 &&
                <div>
                    <Title>
                      <Icon>
                          <Image style={{ width: "auto", height: "100%" }}  src={articleIcon} alt={'article_icon'}></Image>
                      </Icon>
                      What do you want to write?
                    </Title>
                    <div>
                        <div style={{width: "100%"}}>
                          <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                          <div style={{width: "49%", display: "flex", flexWrap: "wrap"}}>
                            <div style={{ display: "flex" }}>
                                <LabelIcon>
                                    <MdTitle style={{ width: "100%", height: "auto" }} />
                                </LabelIcon>
                                <Label>Topic</Label>
                              </div>
                              <Input
                                  id="copywriting-keyword"
                                  type="text"
                                  placeholder="Generative AI"
                                  value={phrase}
                                  onChange={(e) => setPhrase(e.target.value)}
                                  required
                                  autoComplete="off"
                              />
                            </div>
                            <div style={{width: "49%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                                <LabelIcon>
                                    <RiKey2Fill style={{ width: "100%", height: "auto" }} />
                                </LabelIcon>
                                <Label>Keywords</Label>
                              </div>
                              <Input
                                  id="copywriting-keyword"
                                  type="text"
                                  placeholder="ai, marketing, generative ai"
                                  value={keywords}
                                  onChange={(e) => setKeywords(e.target.value)}
                                  required
                                  autoComplete="off"
                              />
                            </div>
                            </div>
                            <div style={{display: "flex", justifyContent: "space-between", marginTop: "1.5rem"}}>
                            <div style={{width: "31%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                                <LabelIcon>
                                    <IoLanguage style={{ width: "100%", height: "auto" }} />
                                </LabelIcon>
                                <Label>Language</Label>
                                </div>
                                <Dropdown
                                    placeholder="Polski"
                                    required
                                    value={props.language}
                                    values={languagesList}
                                    onChange={props.setLanguage}
                                    error={undefined}
                                /> 
                            </div>
                            <div style={{width: "31%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                                  <LabelIcon>
                                      <BsFillMicFill style={{width: "100%", height: "auto"}}/>
                                  </LabelIcon>
                                  <Label className='-mt-2'>
                                      Tone of voice
                                  </Label>
                              </div>
                              <div className='-mt-3'>
                              <CustomDropdown
                                id="tones"
                                type="text"
                                placeholder="Friendly"
                                required
                                value={props.toneOfVoice}
                                values={tones}
                                onChange={props.setToneOfVoice}
                            />
                            </div>
                            </div>
                            <div style={{width: "31%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                              <LabelIcon>
                                  <FaRuler style={{ width: "100%", height: "auto" }} />
                              </LabelIcon>
                              <Label>Total characters</Label>
                              </div>
                                <Input
                                    type="number"
                                    placeholder="750"
                                    required
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    min={100}
                                    max={2000}
                                /> 
                            </div>
                            </div>
                            <div className='mt-4'>
                                <Label>
                                    Choose the content type...
                                </Label>
                                <Tabs justifyContent="left">
                                {types.map((type) => {
                                    if (props.contentType === type) {
                                    return (
                                        <SelectedTab onClick={() => props.setContentType(null)} key={type}>
                                        {type}
                                        </SelectedTab>
                                    )
                                    } else {
                                    return (
                                        <Tab onClick={() => props.setContentType(type)} key={type}>
                                        {type}
                                        </Tab>
                                    );
                                    }
                                })}
                            </Tabs>
                            </div>
                            <Centered>
                                <Button type="submit" onClick={fetchSource}>
                                    {loading ?
                                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Loader color="black"/>
                                    </div>
                                    :
                                    <p>Continue</p>
                                    }
                                </Button>
                            </Centered>
                        </div>
                    </div> 
                    <Centered>
                    <SkipBtn onClick={props.onSuccess}>
                        Skip
                    </SkipBtn>
                    </Centered>
                </div>   
            }      
            {step === 2 &&
            <div>
                <Title>
                <Icon>
                    <Image style={{ width: "auto", height: "100%" }}  src={linkIcon} alt={'link_icon'}></Image>
                </Icon>
                Choose source
                </Title>
                <div className='mt-4'>
                <FoldersDropdown />
                <div style={{width: "100%", marginTop: "2rem"}}>
                <Label>
                Choose among top 10 {props.contentType}s on Google...{selectedLinksError && <p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>max 3</p>}
                </Label>
                {sourceLoading ?
                    <MultiLineSkeletonLoader lines={3} justifyContent={'left'} />
                    :
                    searchResults.map((result, index) => {
                        const displayedTitle = result.title.length > 62 ? `${result.title.substring(0, 62)}...` : result.title;
                        let isSelected = selectedLinks.some(link => link.link === result.link);
                    
                        if (isSelected) {
                            return (
                                <div key={index} className='flex items-center justify-between'>
                                <SelectedTab onClick={() => handleLinkSelect({title: displayedTitle, link: result.link, snippet: result.snippet})}>
                                    <p>
                                        {displayedTitle}
                                    </p>
                                </SelectedTab>
                                <a className='w-6' href={result.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <TbWorld style={{width: "100%", height: "auto"}}/>
                                </a>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='flex items-center justify-between'>
                                <Tab onClick={() => handleLinkSelect({title: displayedTitle, link: result.link, snippet: result.snippet})}>
                                    <p>
                                        {displayedTitle}
                                    </p>
                                </Tab>
                                <a className='w-6' href={result.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <TbWorld style={{width: "100%", height: "auto"}}/>
                                </a>
                                </div>
                            )
                        }
                    })
                }
                {openNewLink ? 
                    <form onClick={(e) => e.stopPropagation()} onSubmit={handleAddLink}>
                        <TabInput ref={linkRef} type="text" value={tabInput} onChange={(e) => setTabInput(e.target.value)} onSubmit={((e) => handleAddLink(e))}/>
                    </form> 
                    : 
                    <div onClick={(e) => e.stopPropagation()} >
                        <AddTab onClick={() => setOpenNewLink(true)}><BsPlusLg style={{width: "auto", height: "60%"}}/></AddTab>
                    </div>
                }                
                    <Centered>
                        <Button type="submit" onClick={nextStep}>
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                                :
                                <p>Continue</p>
                            }
                        </Button>
                    </Centered>
                    </div>
                </div> 
                <Centered>
                </Centered>
            </div>   
            }   
            {step === 3 &&
            <div>
                <Title>
                <Icon>
                    <Image style={{ width: "auto", height: "100%" }}  src={pencilIcon} alt={'link_icon'}></Image>
                </Icon>
                Choose header & description
                </Title>
                <div>
                <div>
                <div className='flex' onClick={(e) => e.stopPropagation()}>
                    <RetryButton onClick={generateGooglePreview}>
                        <BtnIcon>
                            <BsArrowRepeat style={{width: "100%", height: "auto"}}/>
                        </BtnIcon>
                        Generate new ones
                    </RetryButton>
                </div>
                <div style={{boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.25)"}} className='w-full mt-2 mb-8 px-6 pt-4 pb-6 rounded-3xl'>
                        <div className='w-full flex text-black items-center mb-1'>
                            <BtnIcon>
                                <Image src={webIcon} alt='favicon' />
                            </BtnIcon>
                            <div className='ml-2'>
                                <p className='text-sm font-medium'>yourwebsite.com</p>
                                <p className='text-xs -mt-0.5 text-[#4E5156]'>yourwebsite.com &gt; article &gt; your-article-ti..</p>
                            </div>
                            <div className='flex '>
                            <div className='h-4 mt-5 ml-2'>
                                <SlOptionsVertical style={{ color: "black", height: "70%" }} />
                            </div>
                            </div>
                        </div>
                        {googlePreviewLoading ?
                        <MultiLineSkeletonLoader lines={3} justifyContent={'left'} />
                        :
                        <>
                        <div className='text-[#180EA4] font-medium text-xl leading-snug'>
                            {showEditTitle ?
                            <div className="flex items-start">
                                <Input height='2.8rem' value={props.title} onChange={(e) => props.setTitle(e.target.value)} />
                                <SaveBtn onClick={() => setShowEditTitle(false)}><BsCheckLg style={{width: "100%"}}/></SaveBtn>  
                            </div>
                            :
                            <>
                            {(props.title || googlePreviewLoading) && props.title}
                            {!generatingGooglePreview && <EditButton onClick={() => setShowEditTitle(true)}><BsPencilFill style={{width: "100%"}}/></EditButton> }
                            </>
                            }
                        </div>
                        {descriptionLoading ?
                        <MultiLineSkeletonLoader lines={1} justifyContent={'left'} />
                        :
                        <div className='text-[#606367] font-medium mt-1'>
                            {(props.description) && 
                            <div>
                                {showEditDescription ?
                                <div className="flex items-start">
                                    <Input height='2.8em' value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                                    <SaveBtn onClick={() => setShowEditDescription(false)}><BsCheckLg style={{width: "100%"}}/></SaveBtn>    
                                </div>
                                :
                                <>
                                <span className='text-[#717579] font-normal'>{moment().format('DD MMMM YYYY')}</span>-  
                                {props.description.substring(0, 155)}
                                {!generatingGooglePreview && <EditButton onClick={() => setShowEditDescription(true)}><BsPencilFill style={{width: "100%"}}/></EditButton>   }
                                </>
                                }
                            </div> 
                            }
                        </div>
                        }
                        </>
                        }

                    </div>
                    {peopleAlsoAsk.length > 0 &&
                    <>
                    <Label>People also ask:</Label>
                    <Tabs justifyContent="left">
                    {
                    peopleAlsoAsk.map((result, index) => {
                        return (
                            <Tab key={index} onClick={() => changeGooglePreview(result)}>
                                <p>
                                    {result.question}
                                </p>
                            </Tab>
                        )
                    })
                    }
                    </Tabs>
                    </>
                    }
                        <Centered>
                            <Button type="submit" onClick={nextStep}>
                                {loading ?
                                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        <Loader color="black"/>
                                    </div>
                                    :
                                    <p>Continue</p>
                                }
                            </Button>
                        </Centered>
                    </div>
                </div> 
                <Centered>
                </Centered>
            </div>   
            }   
            {step === 4 &&
            <>
            {loading ?
              <div>
                <ModalTitle>Give me a sec...</ModalTitle>
                <Centered>
                    <ModalDescription>Yepp is preparing to write the best content for you. <br />It&apos;s worth the wait!</ModalDescription>
                </Centered>
                <Centered>
                    <EstimatedTime>Est. time: ~ 1.5 mins</EstimatedTime>
                </Centered>
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><Texts>{texts[currentText]}</Texts></Centered>
                    </ThinkingContainer>
              </div>
            :
            <div>
                <Title>
                <Icon>
                    <Image style={{ width: "auto", height: "100%" }}  src={handwritingIcon} alt={'link_icon'}></Image>
                </Icon>
                Fine-tune the outline
                </Title>
                <Form autoComplete="off" onSubmit={(e) => submit()}>
                {headersLoading ?
                <MultiLineSkeletonLoader lines={4} justifyContent={'left'} />
                :
                <div style={{width: "100%"}}>
                <div className='flex'>
                <RetryButton onClick={generateOutline}>
                    <BtnIcon>
                        <BsArrowRepeat style={{width: "100%", height: "auto"}}/>
                    </BtnIcon>
                    Propose a new one
                </RetryButton>
                </div>
                <TextArea
                    ref={conspectTextAreaRef}
                    id="headers-input"
                    height= "26rem"
                    padding="1.25rem"
                    placeholder="Write down headers for each section with instructions on how to write them."
                    value={conspectText}
                    onChange={(e) => setConspectText(e.target.value)}
                    required
                />
                    <Centered>
                      {!generatingOutline &&
                        <Button type="submit" onClick={() => submit()}>
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                                :
                                <div className='flex items-center justify-center'>
                                    <BtnIcon>
                                        <SparklesIcon />
                                    </BtnIcon>
                                    <p>Generate the {props.contentType}</p>
                                </div>
                            }
                        </Button>
                        }
                    </Centered>
                </div>
                }

                </Form> 
            </div>  
            }
            </> 
            } 
            </Container>
           </ SlideBottom>
        </ModalBackground>
    )
}

export default CopywritingModal;

const Container = styled.div<{step: number}>`
    width: ${((props: { step: number; }) => props.step === 3 || props.step === 2) ? "44rem" : "50rem"};
    padding: 1rem 4.5rem 3rem 4.5rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 5vw 5vh 5vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
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
    padding: 3rem 0 10rem 0;
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

const LabelIcon = styled.div`
width: 1rem;
height: 1rem;
margin-right: 0.4rem;
margin-left: 0.25rem;
margin-top: 0.1rem;
color: black;
`


const ModalDescription = styled.p`
    width: 80%;
    text-align: center;
    margin-top: 0.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
`

const Form = styled.form`
    margin-top: 3vh;
    width: 100%;
`
const Title = styled.h1`
  margin-bottom: 2.2rem;
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
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

const Label = styled.div`
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  color: black;
  margin-bottom: 0.5rem;
  align-items: center;
  @media (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  height: 3rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 3px 3px 10px rgba(22, 27, 29, 0.23), inset -3px -3px 10px #FAFBFF;
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
    margin-bottom: 0.8rem;
    padding: 0.6rem;
    height: auto;
}
`;

const Button = styled.button`
  display: block;
  width: 22vw;
  height: 3rem;
  margin-top: 2rem;
  color: black;
  font-size: 1.1rem;
  border: solid 3px transparent;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  font-weight: 700;
  border-radius: 15px;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    box-shadow: none;
    translateX: 10px;
    box-shadow: 0 2px 2px 1px rgb(0, 0, 0, 0.1);
}
  box-shadow: 0 4px 4px 1px rgb(0, 0, 0, 0.2);
  @media (max-width: 1023px) {
    margin-top: 3vh;
    width: 65vw;
    }
`;

const EstimatedTime = styled.p`
    margin-top: 1vh;
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #798094;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const Icon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  @media (max-width: 1023px) {
    margin-bottom: 0rem;
  }
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
        width: 1rem;
        height: 1rem;
    }
`

const Tab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    color: black;
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
    color: black;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    border: solid 3px transparent;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    color: black;
    font-weight: 700;
`

const AddTab = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    height: 2.5rem;
    width: 2.5rem;
    color: black;
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
    color: black;
    align-items: center;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
`

const Tabs = styled.div<{justifyContent: string}>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: ${props => props.justifyContent};
`

const SkipBtn = styled.button`
    margin-top: 1rem;
    color: #798094;
    font-weight: 700;
`

const RetryButton = styled.button`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    color: black;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const BtnIcon = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
`

const BackArrow = styled.button<{selectedTab: any}>`
    background: transparent;
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 0rem;
        left: 0rem;
    }
`

const EditButton = styled.button`
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
    color: black;
`

const SaveBtn = styled.button`
    height: 2.8rem;
    border: solid 3px transparent;
    font-weight: 700;
    margin-left: 0.4rem;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -0.5rem;
    color: white;
    width: 4rem;
    justify-content: center;
    border-radius: 12px;
    align-items: center;
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