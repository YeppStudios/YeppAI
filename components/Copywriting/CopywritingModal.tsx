import styled, { keyframes } from 'styled-components';
import { use, useEffect, useRef, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";
import articleIcon from "@/public/images/article-icon.png";
import linkIcon from "@/public/images/link-icon.png";
import Centered from "../Centered";
import { Loader } from '../Common/Loaders';
import { BsRepeat, BsCheck, BsCheckLg, BsFillMicFill, BsUiChecks, BsPencilFill, BsPencilSquare, BsPlusLg, BsTextLeft, BsFillKeyFill } from 'react-icons/bs';
import Image from 'next/image';
import webIcon from "@/public/images/web-icon.png";
import pencilIcon from "@/public/images/pencil-icon.png";
import handwritingIcon from "@/public/images/handwriting-icon.png";
import FoldersDropdown from '@/components/forms/FolderDropdown';
import { SlOptionsVertical } from 'react-icons/sl';
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
import { RiKey2Fill, RiKey2Line } from 'react-icons/ri';
import { MdArrowBackIos, MdOutlineClose, MdOutlineClear } from 'react-icons/md';
import CustomDropdown from '@/components/forms/CustomDropdown';
import ToneDropdown from '../forms/ToneDropdown';
import { HiPencil } from 'react-icons/hi';

const types = ["article", "blog", "guide"];
const languagesList = [
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

const languagesAbbreviations = [
  { name: "English", abbreviation: "en" },
  { name: "Spanish", abbreviation: "es" },
  { name: "French", abbreviation: "fr" },
  { name: "Italian", abbreviation: "it" },
  { name: "Portuguese", abbreviation: "pt" },
  { name: "German", abbreviation: "de" },
  { name: "Ukrainian", abbreviation: "uk" },
  { name: "Polish", abbreviation: "pl" },
  { name: "Chinese", abbreviation: "zh" },
  { name: "Bulgarian", abbreviation: "bg" },
  { name: "Russian", abbreviation: "ru" },
  { name: "Japanese", abbreviation: "ja" },
  { name: "Turkish", abbreviation: "tr" },
  { name: "Greek", abbreviation: "el" },
  { name: "Arabic", abbreviation: "ar" },
  { name: "Dutch", abbreviation: "nl" },
  { name: "Norwegian", abbreviation: "no" },
  { name: "Serbian", abbreviation: "sr" },
  { name: "Swedish", abbreviation: "sv" },
  { name: "Czech", abbreviation: "cs" },
  { name: "Romanian", abbreviation: "ro" },
  { name: "Finnish", abbreviation: "fi" },
  { name: "Hungarian", abbreviation: "hu" },
  { name: "Hindi", abbreviation: "hi" }
];

const toneList = [
  {title: "Formal", icon: "💼"},
  {title: "Friendly", icon: "😊"},
  {title: "Informative", icon: "📚"},
  {title: "Persuasive", icon: "🫵🏼"},
  {title: "Scientific", icon: "🧪"},
  {title: "Lifestyle", icon: "💁‍♂️"},
];

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
    setSectionLength: any,
    setSelectedTonePrompt: any
}) => {

    const [phrase, setPhrase] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [keywords, setKeywords] = useState<string>("");
    const [selectedLinks, setSelectedLinks] = useState<{title: string, link: string, snippet: string}[]>([]);
    const [sourceLoading, setSourceLoading] = useState(false);
    const [googlePreviewLoading, setGooglePreviewLoading] = useState(false);
    const [generatingGooglePreview, setGeneratingGooglePreview] = useState(false);
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
    const [selectedToneTitle, setSelectedToneTitle] = useState("Friendly 😊");
    const [loadingQueries, setLoadingQueries] = useState(false);
    const [searchTerms, setSearchTerms] = useState<string[]>([]);
    const [paragraphsNumber, setParagraphsNumber] = useState("5");
    const [paragraphs, setParagraphs] = useState<{header: string, instruction: string, keywords: string}[]>([]);
    const [selectedQuery, setSelectedQuery] = useState<string>("");
    const [abortController, setAbortController] = useState(new AbortController());
    const [currentText, setCurrentText] = useState(0);
    const [tones, setTones] = useState<any[]>([]);
    const linkRef = useRef<HTMLInputElement>(null);
    const topRef = useRef<HTMLInputElement>(null);
    const textAreaRefs = useRef<{
      header: (HTMLTextAreaElement | null)[];
      instruction: (HTMLTextAreaElement | null)[];
      keywords: (HTMLTextAreaElement | null)[];
    }>({
      header: [],
      instruction: [],
      keywords: []
    });
    

   
    const adjustTextareaHeight = (element: any) => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    };

    const handleTextareaLoad = (id: number, field: string) => {
      let textareaElement = null;
      if (field === "header") {
        textareaElement = textAreaRefs.current.header[id];
      } else if (field === "instruction") {
        textareaElement = textAreaRefs.current.instruction[id];
      } else if (field === "keywords") {
        textareaElement = textAreaRefs.current.keywords[id];
      }

      if (textareaElement) {
          adjustTextareaHeight(textareaElement);
      }
    };

    const handleTextareaChange = (field: string, event: any, index: any) => {
      const newValue = event.target.value;
      const updatedParagraphs = [...paragraphs];

      if (field === "instruction") {
        updatedParagraphs[index].instruction = newValue;
      } else if (field === "keywords") {
        updatedParagraphs[index].keywords = newValue;
      } else if (field === "header") {
        updatedParagraphs[index].header = newValue;
      }
    
      setParagraphs(updatedParagraphs);
      adjustTextareaHeight(event.target);
  };

    useEffect(() => {
        let token = localStorage.getItem("token");
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        const fetchTones = async () => {
          try {
            const toneResponse = await api.get<{title: string, icon: string}[]>(`/tones/owner`, {
              headers: {
                Authorization: token,
              }
            });
            setTones([...toneResponse.data, ...toneList]);
          } catch (e) {
            console.log(e);
          }
        }
    
        fetchTones();
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

    useEffect(() => {
      const newParagraphs = [];
      for (let i = 0; i < parseInt(paragraphsNumber); i++) {
        newParagraphs.push({
          header: "",
          instruction: "",
          keywords: ""
        });
      }
  
      setParagraphs(newParagraphs);
    }, [paragraphsNumber]);

    const fetchSource = async () => {
        setStep(2);
        setSelectedLinks([]);
        setSourceLoading(true);

        let languageObj = languagesAbbreviations.find(lang => lang.name === props.language);
        let languageAbbreviation = languageObj ? languageObj.abbreviation : "us";
        
        let data = JSON.stringify({
            "q": phrase + " " + props.contentType,
            "gl": languageAbbreviation,
            "hl": languageAbbreviation
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
            setSourceLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setSourceLoading(false);
          });
    }

    const changeGooglePreview = (result: any) => {
        setSelectedQuery(result)
        generateGooglePreview(result);
    }

    const stopReplying = () => {
        abortController.abort();
    }

    const stepBack = () => {
      setStep(step - 1);
      setLoading(false);
      setLoadingQueries(false);
    }

    const generateSearchQueries = async () => {
      setLoadingQueries(true);
      let token = localStorage.getItem("token");
      try {
        const generatedQueries = await api.post("/completion", {
          model: "gpt-3.5-turbo",
          temperature: 0.9,
          systemPrompt: `Act as a ${props.language} JSON converter. You come up with high volume search terms for any given phrase and return a formatted JSON output that incorporates a list of search terms in ${props.language} language as per the given format:
          [
            "search term 1",
            "search term 2",
            "search term 3",
            ...
          ]
          `,
          prompt: `Example 12 of most popular Google search terms for phrase "generative ai":
          [
            "will generative ai replace humans",
            "why generative ai is important",
            "who invented generative ai",
            "who invented generative ai",
            "which generative ai is best",
            "when to use generative ai",
            "are generative ai systems plagiarism machines",
            "can generative ai write code",
            "can generative ai create videos",
            "how generative ai works",
            "what generative ai tools are available",
            "where generative ai can be used"
          ]
          As you can see every search term must contain the given phrase somewhere in text.
          
          Now inspired by this example come up with set of best search terms for phrase: "${phrase}" in ${props.language} language that might as well have high search volume. 
          Make sure they are diverse and start in different ways like: "will...", "why...", "who...", "which...", "are...", "can...", "how...", "what...", "where...." as the ones from example but in ${props.language} language. 
          Return list of 10 search terms for ${phrase} in ${props.language} in the exact format as example:
          `
        }, {
          headers: {
            Authorization: token,
          }
        });
        setSearchTerms(JSON.parse(generatedQueries.data.completion));
        setStep(step + 1);
        setLoadingQueries(false);
        generateGooglePreview("");
      } catch (e) {
        console.log(e);
        setLoadingQueries(false);
      }
    }

    const generateGooglePreview = async (selectedQuery: any) => {
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
        let examples = `Top search terms on Google:
        ${relevantQuestions}`
        if (selectedQuery) {
          examples = `User entered a search term:
          ${selectedQuery}
          `
        }

        let model = "gpt-4";
        let systemPrompt = `You are a native ${props.language} copywriter with years of experience. You specialize in coming up with highly converting and attention grabbing titles for ${props.contentType} SEO content. You carefuly analyze the context given by the user and try to understand the target audience and user intents to craft a unique title for ${props.contentType}. Every time you generate a unique title. Title needs to be no more than 65 characters long. Do not quote it. You are proficient in ${props.language} language.`;
        let prompt = `${props.contentType} keyword you always need to include in title: ${phrase}. 
        ${examples}
        Now in response, come up with your unique best performing title for ${props.contentType} featuring ${phrase} that will be a great hook. Respond only with unique title that is up to 65 characters long and do not wrap it with quotes. Make sure to come up with title that is in ${props.language} language. ${example}
        `
    
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `${props.contentType} title`, model, systemPrompt, temperature: 1}),
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
                    reply += data.content.replace(/"/g, '');
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
        let model = "gpt-4";
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
                    reply += data.content.replace(/"/g, '');
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

      const generateField = async (field: any, paragraphIndex: any) => {
        let token = localStorage.getItem("token");
      
        let reply = "";
        let prompt = ``;
        let systemPrompt = `You are a ${props.language} copywriting expert specializing in writing the best ${props.contentType} ${field}s. You always make sure to propose content that is engaging and natural. Do not make it sound too official rather try to explore the topic alongside the reader looking from the different angles.`;
        const headers = paragraphs
        .map((item:any) => item.header) 
        .filter((header: any) => header.trim() !== "")
        .join(', ');


        if (field === "header") {
          systemPrompt = `You are a native ${props.language} copywriting expert specializing in writing the best ${props.contentType} subtitle. You always respond only with one well defined subtitle that is up to 35 characters long. You never include semicolons in your subtitles because you think it is not professional.`;
          if (paragraphIndex === paragraphs.length - 1) {
            prompt = `Previous subtitles in an outline: ${headers}. Now come up with subtitle for paragraph that will summarize ${props.contentType} titled: "${props.title}". Subtitle for paragraph summarizing ${props.contentType} titled: "${props.title}":`;
          } else if (paragraphs[paragraphIndex].header.length > 0) {
            prompt = `Last time you proposed the following subtitle: "${paragraphs[paragraphIndex].header}". Now please rewrite it so it is more engaging and simple.`;
          } else if (paragraphIndex > 0) {
            prompt = `Previous subtitles in an outline: ${headers}. Now come up with new subtitle which goal should be to bring some new aspect, point of view or underlying category to further explore and discuss in paragraph. Make sure to use some of the following keywords: ${keywords}. Come up with next subtitle that will introduce a new aspect, thought for the ${props.contentType} about ${props.title}.`;
          } else {
            prompt = `Come up with one, simple, engaging subtitle for ${props.contentType} paragraph in ${props.toneOfVoice} tone. Make sure to use some of the listed keywords: ${keywords} and write it in ${props.language} language. It has to be one simple sentence/question like: "What is generative AI?".  Unique ${props.contentType} paragraph subtitle in under 40 characters. The best subtitle for first paragraph of the article titled "${props.title}":`
          }

        } else if (field === "instruction") {
          systemPrompt = `You are a native ${props.language} copywriting expert specializing in writing the best ${props.contentType} instruction for paragraph content. You always make sure to propose content that is engaging and natural. You try to explore the topic alongside the reader trying to expose the different angles and perspectives. You always respond only with 3 points separated by new line, each one sentence long. You are ${props.language} native speaker.`;
          if (paragraphIndex === paragraphs.length - 1) {
            prompt = `I wrote a ${props.contentType} with the following paragraphs:
            "${paragraphs.map((item:any) => item.header).join('", "')}
            Now come up with an instruction on how to write the last, concluding paragraph titled ${paragraphs[paragraphIndex].header} in ${props.toneOfVoice} tone and ${props.language} language, incorporating some of the given keywords: ${keywords}. It has to match the overall ${props.contentType} topic: "${props.title}". Respond only with 3 sentence long instruction on how to write this paragraph. When writing a paragraph: "${paragraphs[paragraphIndex].header}" for article titled: "${props.title}", please`;
          } else if (paragraphs[paragraphIndex].instruction.length > 0) {
            prompt = `Last time you proposed the following instruction: "${paragraphs[paragraphIndex].instruction}". Now please rewrite it for ${props.contentType} paragraph called ${paragraphs[paragraphIndex].header} so it is more engaging to the reader, simple and matches the overall ${props.contentType} topic: "${props.title}".`;
          } else if (paragraphIndex > 0) {
            prompt = `Last time I wrote a paragraph with the following instruction:
            "${paragraphs[paragraphIndex-1].instruction}"
            Now come up with one for the next ${props.contentType} paragraph titled ${paragraphs[paragraphIndex].header} in ${props.toneOfVoice} tone and ${props.language} language, incorporating some of the given keywords: ${keywords}. It has to match the overall ${props.contentType} topic: "${props.title}". Respond only with 3 sentence long instruction on how to write this paragraph. When writing a paragraph for the article titled ${paragraphs[paragraphIndex].header}, please`
          } else {
            prompt = `Come up with instruction on how to write ${props.contentType} paragraph titled ${paragraphs[paragraphIndex].header} in ${props.toneOfVoice} tone and ${props.language} language. Use some of the given keywords: ${keywords}. It is the introductory paragraph for the entire ${props.contentType}. It has to match the overall ${props.contentType} topic: "${props.title}". Respond only with 3 sentence long instruction on how to write this paragraph. When writing a paragraph for the article titled ${paragraphs[paragraphIndex].header}:`
          }

        } else if (field === "keywords") {
          systemPrompt = `You are a keyword tool. You are the best at repeating and coming up with the best performing keywords for ${props.contentType} paragraphs. You always make sure to propose keywords that are relevant to the topic and are not too long. You always respond only with 3 one-word keywords separated by comma. You are proficient in ${props.language} language.`;
          if (paragraphs[paragraphIndex].keywords.length > 0) {
            prompt = `Last time you proposed the following keywords: "${paragraphs[paragraphIndex].keywords}". Now please come up with just 3 new ones for ${props.contentType} paragraph called ${paragraphs[paragraphIndex].header}. Also incorporate one of the main keywords: ${keywords}. Respond only with 3 one-word keywords:`;
          } else if (paragraphIndex === 0) {
            systemPrompt= `You repeat chosen 3 keywords.`
            prompt = `Choose up to 3 keywords from: ${keywords}. If there are less then 3, then come up with ones that match the ${props.contentType} titled ${props.title}. 3 keywords separated by commas:`
          } else {
            systemPrompt = `You are native ${props.language} expert at replacing one keyword to another that relates to paragraph topic. You return only 3 one word keywords separated by comma.`
            prompt = `I've already used these keywords: ${keywords}. Repeat two of them and third one exchange to other relevant one for paragraph titled ${paragraphs[paragraphIndex].header}. Keywords:`;
          }
        }
      
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: abortController.signal,
          body: JSON.stringify({ prompt, systemPrompt, temperature: 0.85, title: `generated copywriting ${field}`, model: "gpt-4" }),
        });
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        if(response.body){
          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
  
            if (done) {
              setParagraphs((prev: any) => {
                const updatedParagraphs = [...prev];
                updatedParagraphs[paragraphIndex][field] = reply
                return updatedParagraphs;
            });
            break;
            }

            const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
            for (const jsonString of jsonStrings) {
              try {
                const data = JSON.parse(jsonString);
                if (data.content) {
                  const contentWithoutQuotes = data.content.replace(/"/g, '');
                  reply += contentWithoutQuotes;
                  setParagraphs((prev: any) => {
                    const updatedParagraphs = [...prev];
                    updatedParagraphs[paragraphIndex][field] = reply;
                    return updatedParagraphs;
                });
                
                }                      
              } catch (error) {
                console.error('Error parsing JSON:', jsonString, error);
              }
            }
          }
        }
      };

      
      const generateCurrentParagraph = async () => {
        for (let i = 0; i < parseInt(paragraphsNumber); i++) {
          await generateField("header", i);
          await generateField("instruction", i);
          await generateField("keywords", i);
        }
      };

      const startGeneratingParagraphs = () => {
        generateCurrentParagraph();
      };
      

    const nextStep = () => {
        if (step === 2) {
            generateGooglePreview("");
        } else if (step === 4) {
          startGeneratingParagraphs();
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
        let links = selectedLinks.map(item => (item.link));
        setLoading(true);
    
          props.setSectionLength((Number(length)/paragraphs.length).toFixed(0));
          props.setConspect(paragraphs);
          try {
            const scrapingResponse = await axios.post(`https://www.asistant.ai/scrape-links`, {
              urls: links
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
    }

    const handleToneChange = (title: string) => {
      setSelectedToneTitle(title);
      const tone = tones.find((t: any) => t.title === title);
      try {
        if (tone.prompt) {
          props.setSelectedTonePrompt(tone.prompt);
        } else {
          props.setSelectedTonePrompt("");
        }
      } catch (e) {
        props.setSelectedTonePrompt();
      }

    };

    return (
        <ModalBackground ref={topRef}>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            <div style={{width: "100%", position: "absolute", top: 0, left: 0}}></div>
            <SlideBottom>
            <Container step={step} onClick={(e) => e.preventDefault()}>
            {step > 1 &&
                    <BackArrow selectedTab={step}>   
                        <BackBtn onClick={() => stepBack()}>
                            <BackBtnIcon>
                                <MdArrowBackIos className='mt-2' style={{ width: "140%", height: "auto" }} />
                            </BackBtnIcon> 
                        </BackBtn>
                    </BackArrow>
            } 
            <CloseIcon onClick={props.onClose}>
                    <MdOutlineClear style={{width: "100%", height: "auto"}}/>
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
                        <div className='w-full flex justify-between'>
                        <div style={{width: "65%", display: "flex", flexWrap: "wrap"}}>
                        <Label>
                            Enter main topic, phrase or keyword
                        </Label>
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
                        <div style={{width: "31%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                                <LabelIcon>
                                    <IoLanguage style={{ width: "100%", height: "auto" }} />
                                </LabelIcon>
                                <Label className='-mt-3'>Language</Label>
                                </div>
                                <div className='-mt-2'>
                                <CustomDropdown
                                    placeholder="Polish"
                                    required
                                    value={props.language}
                                    values={languagesList.sort()}
                                    onChange={props.setLanguage}
                                    error={undefined}
                                /> 
                                </div>
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
            {(step === 2 && !loadingQueries) &&
            <div>
                <Title>
                <Icon>
                    <Image style={{ width: "auto", height: "100%" }}  src={linkIcon} alt={'link_icon'}></Image>
                </Icon>
                Choose source
                </Title>
                <div className='mt-4'>
                <FoldersDropdown />
                <div style={{width: "100%", marginTop: "1.2rem"}}>
                <div className='font-medium mb-4'>
                Choose among top 10 best performing {props.contentType}s on Google: {selectedLinksError && <p className="text-red-400" style={{marginLeft: "0.5rem", fontSize: "0.85rem"}}>max 3</p>}
                </div>
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
                  <div><div className='mt-6 font-medium text-gray-400'>💡 AI will analyze them and find a way to position your content!</div></div>   
                    <Centered>
                        <Button type="submit" onClick={() => generateSearchQueries()}>
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
                    <RetryButton onClick={() => generateGooglePreview(selectedQuery)}>
                        <BtnIcon>
                            <BsRepeat style={{width: "100%", height: "auto"}}/>
                        </BtnIcon>
                        Generate new one
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
                    {searchTerms.length > 0 &&
                    <>
                    <Label>Choose one of the popular search terms to rewrite the title:</Label>
                    <Tabs justifyContent="left">
                    {
                    searchTerms.map((result, index) => {
                        return (
                          <>
                          {selectedQuery === result ?
                            <SelectedTab key={index} onClick={() => changeGooglePreview(result)}>
                                <p>
                                    {result}
                                </p>
                            </SelectedTab>
                            :
                            <Tab key={index} onClick={() => changeGooglePreview(result)}>
                                <p>
                                    {result}
                                </p>
                            </Tab>
                          }
                          </>
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
            {step > 5 &&
                    <BackArrow selectedTab={step}>   
                        <BackBtn onClick={() => setStep(step - 1)}>
                            <BackBtnIcon>
                                <MdArrowBackIos style={{ width: "200%", height: "auto" }} />
                            </BackBtnIcon> 
                        </BackBtn>
                    </BackArrow>
            } 
            <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            {step === 4 &&
                <div>
                    <Title>
                      <Icon>
                          <Image style={{ width: "auto", height: "100%" }}  src={articleIcon} alt={'article_icon'}></Image>
                      </Icon>
                      Provide more details
                    </Title>
                    <div>
                        <div style={{width: "100%"}}>
                          <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <div style={{width: "100%", display: "flex", flexWrap: "wrap"}}>
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
                                      <BsFillMicFill style={{width: "100%", height: "auto"}}/>
                                  </LabelIcon>
                                  <Label className='-mt-2'>
                                      Tone of voice
                                  </Label>
                              </div>
                              <div className='-mt-3'>
                              <ToneDropdown
                                  values={tones}
                                  value={selectedToneTitle}
                                  onChange={handleToneChange}
                                  changeTyping={props.setSelectedTonePrompt}
                              />
                            </div>
                            </div>
                            <div style={{width: "31%", display: "flex", flexWrap: "wrap"}}>
                              <div style={{ display: "flex" }}>
                                  <LabelIcon>
                                      <BsTextLeft style={{width: "100%", height: "auto"}}/>
                                  </LabelIcon>
                                  <Label className='-mt-2'>
                                      Total paragraphs
                                  </Label>
                              </div>
                              <div className='-mt-3'>
                              <CustomDropdown
                                  values={["1", "2", "3", "4", "5", "6", "7", "8"]}
                                  value={paragraphsNumber}
                                  onChange={setParagraphsNumber}
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
                            <Centered>
                                <Button type="submit" onClick={() => nextStep()}>
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
            {(step === 5 && !loading) &&
            <div>
                <Title>
                <Icon>
                    <Image style={{ width: "auto", height: "100%" }}  src={handwritingIcon} alt={'link_icon'}></Image>
                </Icon>
                Fine-tune the outline
                </Title>
                {
                  paragraphs.map((paragraph, index) => (
                    <div key={index} style={{ width: "100%" }}>
                      <div className="w-full rounded-xl shadow-lg border-2 border-gray-100 mb-10">
                        <div className="px-6 py-2 w-full flex justify-between items-center border-b-2 border-gray-100">
                          {paragraph.header === "" ? (
                            <MultiLineSkeletonLoader lines={1} justifyContent={"left"} />
                          ) : (
                            <>
                              <textarea 
                                value={paragraph.header} 
                                onChange={(e) => handleTextareaChange("header", e, index)} 
                                rows={1}
                                className="font-semibold mr-4 w-full outline-none resize-none py-2"
                                ref={(el) => {
                                  textAreaRefs.current.header[index] = el;
                                  handleTextareaLoad(index, "header");
                                }}                                                             
                                >
                                </textarea>
                              <div className='flex items-center gap-4 font-medium text-gray-300'>
                                <div onClick={() => textAreaRefs.current.header[index]?.focus()} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                  <HiPencil className='w-4 h-4'/>
                                  Edit
                                </div>
                                <div onClick={() => generateField("header", index)} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                  <SparklesIcon className='w-4 h-4'/>
                                  Rewrite
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="px-6 pt-4 pb-6 font-medium">
                          {paragraph.instruction === "" ? (
                            <MultiLineSkeletonLoader lines={2} justifyContent={"left"} />
                          ) : (
                            <div className='flex flex-wrap text-gray-300'>
                            <textarea 
                              value={paragraph.instruction} 
                              onChange={(e) => handleTextareaChange("instruction", e, index)} 
                              className='w-full text-gray-800 outline-none resize-none'
                              rows={1}
                              ref={(el) => {
                                textAreaRefs.current.instruction[index] = el;
                                handleTextareaLoad(index, "instruction");
                              }}
                              
                              >
                              </textarea>
                            <div className='w-full flex justify-end mt-4'>
                            <>
                            <div className='flex items-center gap-4'>
                              <div onClick={() => textAreaRefs.current.instruction[index]?.focus()} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                <HiPencil className='w-4 h-4'/>
                                Edit
                              </div>
                              <div onClick={() => generateField("instruction", index)} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                <SparklesIcon className='w-4 h-4'/>
                                Rewrite
                              </div>
                            </div>
                            </>
                          </div>
                          </div>
                          )}
                        </div>
                        <div className="px-6 py-2 py-2 w-full border-t-2 border-gray-100">
                          <p className="font-medium flex items-center">
                            {paragraph.keywords === "" ? (
                              <MultiLineSkeletonLoader lines={1} justifyContent="left" />
                            ) : (
                              <div className='flex justify-between w-full'>
                              <>
                              <textarea 
                                value={paragraph.keywords.toLowerCase()} 
                                onChange={(e) => handleTextareaChange("keywords", e, index)} 
                                className="mr-2 text-gray-800 w-full outline-none resize-none"
                                rows={1}
                                ref={(el) => {
                                  textAreaRefs.current.keywords[index] = el;
                                  handleTextareaLoad(index, "keywords");
                                }}                                
                                >
                                </textarea>
                             </>
                              <div className='flex justify-end text-gray-300'>
                              <div className='flex items-center gap-4'>
                                <div onClick={() => textAreaRefs.current.keywords[index]?.focus()} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                  <HiPencil className='w-4 h-4'/>
                                  Edit
                                </div>
                                <div onClick={() => generateField("keywords", index)} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                                  <SparklesIcon className='w-4 h-4'/>
                                  Rewrite
                                </div>
                              </div>
                            </div>
                            </div>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }   
                {paragraphs[paragraphs.length - 1].keywords !== "" &&           
                <Centered>
                  <Button type="submit" onClick={submit}>
                  {loading ?
                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                     <Loader color="black"/>
                    </div>
                  :
                    <p>Continue</p>
                  }
                  </Button>
                </Centered>
                }  
            </div>  
            } 
            {(loading || loadingQueries) &&
              <div>
                {loadingQueries ? <ModalTitle>Looking for search terms...</ModalTitle> : <ModalTitle>Give me a sec...</ModalTitle>}
                <Centered>
                  {!loadingQueries ?
                    <ModalDescription>Yepp is preparing to write the best content for you. <br />It&apos;s worth the wait!</ModalDescription>
                    :
                    <ModalDescription>Yepp is searching for high volume search terms to adress them in your {props.contentType} title.</ModalDescription>
                  }
                </Centered>
                <Centered>
                  {loadingQueries ?
                    <EstimatedTime>Est. time: ~ 10s</EstimatedTime>
                    :
                    <EstimatedTime>Est. time: ~ 15s</EstimatedTime>
                  }
                </Centered>
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><Texts>{texts[currentText]}</Texts></Centered>
                    </ThinkingContainer>
              </div>
            }
            </Container>
           </ SlideBottom>
        </ModalBackground>
    )
}

export default CopywritingModal;

const Container = styled.div<{step: number}>`
    width: ${((props: { step: number; }) => props.step === 3 || props.step === 2) ? "44rem" : "50rem"};
    padding: 1rem 3rem 3rem 3rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
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
  width: calc(100% + 5rem);
  margin-left: -2rem;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 1rem;
  color: black;
  font-weight: 700;
  @media (max-width: 1023px) {
      font-size: 1rem;
      line-height: 1.2;
      width: 95vw;
      margin-top: 0vh;
      margin-left: -2rem;
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