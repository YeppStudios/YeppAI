import styled, { keyframes } from "styled-components";
import fuelIcon from "../../public/images/fuel.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import api from "@/pages/api";
import TextLoader from "@/components/Common/TextLoader";
import RegularTextContainer from "./contentContainers/RegularTextContainer";
import IdeasContainer from "./contentContainers/IdeasContainer";
import AddElixir from "../Modals/AddingModals/AddElixir";
import MultiLineSkeletonLoader from "./MultilineSkeletonLoader";
import Centered from "../Centered";
import ReminderModal from "../Modals/InformationalModals/ReminderModal";
import NoElixir from "../Modals/LimitModals/NoElixir";
import FeedbackPopover from "./FeedbackPopover";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import sendIcon from "../../public/images/send.png";
import { useRouter } from "next/router";
import { BsBodyText, BsTextCenter } from "react-icons/bs";
import axios from "axios";
import { defaultMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { selectedUserState } from "@/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import SlideBottom from "../Animated/SlideBottom";
import { selectFoldersState } from '@/store/selectedFoldersSlice'

interface WidthProp {
    width: string;
  }
interface Message {
    sender: string; text: string;
}

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

const ResultsContainer = (
  props: {
    initialPrompt: string | undefined, 
    resultsType: string, 
    trigger: number, 
    count: number, 
    stopLoading: any,
    query: any,
    about: string,
    template: any
  }) => {

    const [content, setContent] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [openElixirModal, setOpenElixirModal] = useState(false);
    const [messageLoading, setMessageLoading] = useState(false);
    const user = useSelector(selectedUserState);
    const [generationCost, setGenerationCost] = useState(0);
    const [elixirWidth, setElixirWidth] = useState<string>("0");
    const [openElixirReminder, setOpenElixirReminder] = useState(false);
    const [workspace, setWorkspace] = useState<any>({})
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [isSSEComplete, setIsSSEComplete] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<Array<Message>>([]);
    let selectedFolders: Folder[] = useSelector(selectFoldersState);
    const [replying, setReplying] = useState(false);
    const selectedMarketingAssistant = useSelector(defaultMarketingAssistantState);

    const router = useRouter();

    function estimateTokens(text: any) {
        const tokenRegex = /[\p{L}\p{N}]+|[^ \t\p{L}\p{N}]/ug;
        let tokens = 0;
        let match;
        while ((match = tokenRegex.exec(text)) !== null) {
          tokens += 1;
        }
        return tokens;
    }
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextArea(textAreaRef.current, prompt);

    useEffect(() => {
      const userWorkspace = localStorage.getItem("workspace");
      setWorkspace(userWorkspace);
      const fetchSavedContent = async () => {
        try {
        if (props.query.contentId) {
          try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const { data } =await api.get(`/getContentPiece/${props.query.contentId}`, {
              headers: {
                authorization: token,
              },
            });
            const responseMessageObject = {
              sender: "assistant",
              text: data.text,
            }
            setMessages([{sender: "user", text: ""}, responseMessageObject]);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
        }
      } catch (e) {
        console.log(e);
      }
      }
      fetchSavedContent();
    }, []);

    useEffect(() => {
        const getElixirUsage = async () => {
          const userId = localStorage.getItem("user_id");
          const token = localStorage.getItem("token");

          if(user.plan){
            const planResponse = await api.get(`/${userId}/planInfo`);
            setElixirWidth((planResponse.data.percentage*100).toString());
          } else if(user.tokenBalance) {
            let percentage = (user.tokenBalance/25);
            if (user.accountType === "company") {
              percentage = user.tokenBalance/75;
            }
            let elixir = Number(percentage) > 100 ? 100 : Number(percentage) < 0 ? 0 : percentage;
            setElixirWidth((elixir).toString());
          }
        } 
        getElixirUsage();
      }, [isSSEComplete, user]);


    const generateInitialResponse = async () => {
        if(loading){
            return;
        }
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        let fetchedUser: any;
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

        if(fetchedUser.tokenBalance <= 0) {
            setOpenNoElixirModal(true);
            setLoading(false);
          return;
        }

        let promptToSend = '';
        let context = "";
        let reply = '';
        let model ="gpt-4"
        let previousMessage = '';
      if (content) {
        previousMessage = `Last time I wrote: "${content}". Now please generate new, unique content different than the one written previously following these guidelines: 
        `
      }
      if (prompt) {
          promptToSend = previousMessage + prompt;
      } else {
          promptToSend = previousMessage + props.initialPrompt!;
      }
      setContent('');
        setReplying(true);
        setLoading(true);
        setMessages([]);
        setIsSSEComplete(false);
        const abortController = new AbortController();
        const signal = abortController.signal;
        setIsSSEComplete(false);

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
        
            const chunks = await axios.post(
              "https://www.asistant.ai/query",
              {
                "queries": [
                  {
                    "query": props.about,
                    "filter": {
                      "document_id": vectorIdsResponse.data
                    },
                    "top_k": 2
                  }
                ]
              },
              {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                }
              }
            );          
      
          chunks.data.results[0].results.forEach((item: { text: string; }) => {
            context += item.text + " ";
          });
          promptToSend = "Analyze additional context: " + context + ". Now, understanding the context, but without relying too much on it, please " + promptToSend;
          // setEmbeddedDocuments(chunks.data.results[0].results);
          } catch (e) {
          }
        }
        console.log(promptToSend)
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: signal,
              body: JSON.stringify({prompt: promptToSend, temperature: 0.9, title: props.template.title, model, systemPrompt: selectedMarketingAssistant.noEmbedPrompt}),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            if(response.body){
              const reader = response.body.getReader();
              while (true) {
                const { done, value } = await reader.read();
      
                if (done) {
                  setIsSSEComplete(true);
                  setReplying(false);
                  props.stopLoading();
                  setContent(reply);
                  const responseMessageObject = {
                    sender: "assistant",
                    text: reply,
                  }
                  const promptObject = {
                    sender: "user",
                    text: promptToSend,
                  }
                  setMessages([...[], promptObject, responseMessageObject]);
                  setGenerationCost(estimateTokens(`${promptToSend} ${reply}`))
                  if(props.resultsType.includes("post")){
                    await api.post(`/user/${userId}/addPosts`, {postsToAdd: props.count}, {
                        headers: {
                          authorization: token
                        },
                    });
                  } else if(props.resultsType === "ideas") {
                    await api.post(`/user/${userId}/addIdeas`, {ideasToAdd: props.count}, {
                        headers: {
                          authorization: token
                        },
                    });
                  }
                  break;
                }
        
                const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
                setLoading(false);
                for (const jsonString of jsonStrings) {
                  try {
                    const data = JSON.parse(jsonString);
                    if (data.content) {
                      const contentWithoutQuotes = data.content.replace(/"/g, '');
                      setContent((prevMessage) => prevMessage + contentWithoutQuotes);
                      reply += contentWithoutQuotes;
                    }
                  } catch (error) {
                    console.error('Error parsing JSON:', jsonString, error);
                  }
                }
              }
            }
          } catch (e) {
            console.log(e);
            setLoading(false);
          } finally {
            abortController.abort();
          }
    }

    const sendMessage = async () => {
      if(replying || !prompt) {
        return;
      }
      setMessageLoading(true);
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("user_id");
      let workspace = localStorage.getItem("workspace");
      let fetchedUser: any;
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
      if(fetchedUser.tokenBalance <= 0) {
          setOpenNoElixirModal(true);
          setLoading(false);
        return;
      }
      const userInput = prompt;
      const abortController = new AbortController();
      const signal = abortController.signal;
      localStorage.removeItem("defaultText");
      let text = '';
      let context = "";
      let promptToSend = prompt;
      let  model = "gpt-4"
      setIsSSEComplete(false);
      setPrompt('');
      setContent('');
      const userMessageObject = {
        sender: "user",
        text: userInput,
     }
     setMessages([...messages, userMessageObject]);
     
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
    
        const chunks = await axios.post(
          "https://www.asistant.ai/query",
          {
            "queries": [
              {
                "query": props.about,
                "filter": {
                  "document_id": vectorIdsResponse.data
                },
                "top_k": 2
              }
            ]
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
            }
          }
        );                  
  
      chunks.data.results[0].results.forEach((item: { text: string; }) => {
        context += item.text + " ";
      });
      promptToSend = "Task for you: " + promptToSend + " In this task I indicate to my previous message. Additionally, here is the context which you might use if it you find it helpful: " + context + " If inside of the given context you find information that might not be relevant to the given task, then don't use it in response.";
      // setEmbeddedDocuments(chunks.data.results[0].results);
      } catch (e) {
      }
    }
        const latestMessages = messages.slice(-2);
        const conversationContext = [  { role: "system", content: selectedMarketingAssistant.noEmbedPrompt },  ...latestMessages.map((message) => {    
            return {role: message.sender,  content: message.text,};
        }), { role: "user", content: promptToSend },];

      try {
        const response = await fetch('https://asystentai.herokuapp.com/messageAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: signal,
          body: JSON.stringify({conversationContext, model}),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        if(response.body){
          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
  
            if (done) {
              const responseMessageObject = {
                sender: "assistant",
                text: text,
              }
              if(messages){
                setMessages([...messages, userMessageObject, responseMessageObject]);
              }
              setIsSSEComplete(true);
              setReplying(false);
              break;
            }
    
            const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
            setMessageLoading(false);
            setReplying(true);
            for (const jsonString of jsonStrings) {
              try {
                const data = JSON.parse(jsonString);
    
                if (data.content) {
                  const contentWithoutQuotes = data.content.replace(/"/g, '');
                  setContent((prevMessage) => prevMessage + contentWithoutQuotes);
                  text += contentWithoutQuotes;
                }
              } catch (error) {
                console.error('Error parsing JSON:', jsonString, error);
              }
            }
          }
        }
  
      } catch (e) {
        console.log(e);
        props.stopLoading();
        setReplying(false);
      } finally {
        abortController.abort();
      }
    }

    useEffect(() => {
      if(props.initialPrompt){
          generateInitialResponse();
      }
    }, [props.initialPrompt, props.trigger])
  

    function submitOnEnter(event: any) {
      if (event.which === 13 && !event.shiftKey) {
          if (!event.repeat) {
              sendMessage();
          }
          event.preventDefault();
      }
    }
    
    const renderMessages = () => {
      const fetchedMessages = messages?.map((message, messageIndex) => {

        if (messageIndex != 0) {
        if(message.sender === "user") {
          return (
            <SlideBottom key={`${message.text}`}>
              <UserMessageContainer>
                  <UserMessage>{message.text}</UserMessage>
              </UserMessageContainer>
            </SlideBottom>
          )
        } else {
          return (
            <>
            {props.resultsType === "ideas" ?
            <IdeasContainer ideaProps={props.initialPrompt} text={message.text} isSSEComplete={true}/>
            :
            <RegularTextContainer template={props.template} user={user} text={message.text} prompt={props.initialPrompt} category={props.resultsType} query={props.query} isSSEComplete={true}/>
            }
            </>
          )
        }
      }
      })
  
      return(
        <>
          {fetchedMessages}
        </>
      )
    }

    return (
        <MainContainer isTemplate={props.template ? true : false}>
        {openElixirReminder && <ReminderModal onClose={() => setOpenElixirReminder(false)} elixirWidth={elixirWidth}/>}
        {openElixirModal && <AddElixir user={user} onClose={() => setOpenElixirModal(false)} />}
        {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
        <ElixirHeader>
                <GenerationCost>

                </GenerationCost>
                {(workspace === "undefined") &&
                <div style={{display: "flex", alignItems: "center"}}>
                    <FuelBar>
                        <Fuel width={elixirWidth}></Fuel>
                    </FuelBar>
                    <FuelIcon onClick={() => setOpenElixirModal(true)}>
                        <Image style={{ width: "auto", height: "100%" }}  src={fuelIcon} alt={'logo'}></Image> 
                    </FuelIcon>
                </div>
                }
          </ElixirHeader>
        <Container>
            {(loading) ? 
                <div style={{width: "100%", height: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                    <TypingAnimationContainer>
                        <MultiLineSkeletonLoader lines={5} justifyContent="center"/>
                        <LoadingTextsContainer>
                            <TextLoader />
                        </LoadingTextsContainer>
                    </TypingAnimationContainer>
                </div>
                :
                <>
                {((!content?.length || content.length === 0) && messages.length === 0) ?
                    <>
                        <EmptyResultsContainer>
                            <Centered>
                            <EmptyResultsIcon>
                                <BsTextCenter style={{ width: "auto", height: "100%" }} /> 
                            </EmptyResultsIcon>
                            </Centered>
                            <EmptyResultsMessage>Fill out the form and AI will generate tailored conetnt for you!</EmptyResultsMessage>
                        </EmptyResultsContainer>
                    </>
                    :
                    <>
                        {messages.length !== 0 &&
                          renderMessages()                 
                        }
                        {(messages.length === 0 && content) &&
                            <>
                              {((props.resultsType === "ideas" || props.resultsType === "hashtags") && user) ?
                                <IdeasContainer ideaProps={props.initialPrompt} text={content} isSSEComplete={isSSEComplete}/>
                                :
                                <RegularTextContainer template={props.template} user={user} text={content} prompt={props.initialPrompt} query={props.query} category={props.resultsType} isSSEComplete={isSSEComplete}/>
                              }
                            </>   
                        }
                        {(!replying && !messageLoading && messages.length !== 0 && props.template) && 
                        <UserPromptContainer>
                            <PromptInput 
                                placeholder="Further prompts..."                   
                                onKeyDown={submitOnEnter}
                                ref={textAreaRef}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <SendBtnContainer>
                                <AskBtn onClick={sendMessage}>
                                <SendIcon>
                                    <Image style={{ width: "100%", height: "100%" }} src={sendIcon} alt={'sendIcon'}></Image> 
                                </SendIcon>
                                </AskBtn>
                            </SendBtnContainer>
                        </UserPromptContainer>
                        }
                        {(messages.length !== 0 && replying && content) &&
                            <>
                              {(props.resultsType === "ideas" && user) ?
                                <IdeasContainer ideaProps={props.initialPrompt} text={content} isSSEComplete={isSSEComplete}/>
                                :
                                <RegularTextContainer template={props.template} user={user} text={content} prompt={props.initialPrompt} category={props.resultsType} query={props.query} isSSEComplete={isSSEComplete}/>
                              }
                            </>   
                        }
                        {(messageLoading && !replying) &&
                            <div style={{width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                              <TypingAnimationContainer>
                                  <MultiLineSkeletonLoader lines={5} justifyContent="center"/>
                                  <LoadingTextsContainer>
                                    <TextLoader />
                                  </LoadingTextsContainer>
                              </TypingAnimationContainer>
                            </div>
                        }
                    </>
                } 
                </>
            }
            <ConversationBottom id="conversation-bottom"></ConversationBottom>  
        </Container>  
        <FeedbackPopover />
        </MainContainer>
    )
}

export default ResultsContainer;

const MainContainer = styled.div<{isTemplate: boolean}>`
  width: ${props => props.isTemplate ? "100%" : "50%"};
  position: ${props => props.isTemplate ? "relative" : "absolute"};
  left: ${props => props.isTemplate ? "0" : "25%"};
  min-height: 90vh;
  z-index: 1; 
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
  border: 2px solid #E5E8F0;
  border-radius: 25px;
  background-color: white;
  @media (max-width: 1023px) {
    background-color: white;
    width: 100%;
    margin-left: 0;
    margin-top: 1.2rem;
  }
`

const Container = styled.div`
  margin-top: 0vh;
  width: 100%;
  overflow-y: scroll;
  padding: 1rem 3.5vh 1rem 3.5vh;
  -ms-overflow-style: none;
  -webkit-scrollbar-width: none;
  align-items: center;
  -webkit-mask: 
  linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
  linear-gradient(to bottom, black 94%, transparent) bottom/100% 50%,
  linear-gradient(to left  , black, transparent) left  /100% 0%,
  linear-gradient(to right , black, transparent) right /100% 0%;
  -webkit-mask-repeat:no-repeat;
  @media (max-width: 1023px) {
    max-height: none;
    overflow-y: auto;
    padding: 0rem 1rem 0 1rem;
  }
  &::-webkit-scrollbar {
    display: none;
}
`

const GenerationCost = styled.div`
    text-align: left;
    font-size: 0.7em;
    color: black;
    @media (max-width: 1023px) {
        margin-top: 0rem;
    }
`

const ElixirHeader = styled.div`
    width: 100%;
    display: flex; 
    justify-content: space-between;
    padding: 1rem 1.5rem 0 2rem;
    align-items: center;
    @media (max-width: 1023px) {
        padding: 1rem 0.6rem 0 0.6rem;
    }
`

const pulse = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const FuelBar = styled.div`
  width: 12rem;
  height: 0.75rem;
  border-radius: 15px;
  box-shadow: inset 2px 2px 4px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  margin-left: 2rem;
  @media (max-width: 1023px) {
    width: 8rem;
}
`

const Fuel = styled.div<WidthProp>`
  width: ${props => props.width}%;
  height: 0.75rem;
  border-radius: 15px;
  background: linear-gradient(40deg, #6578F8, #64B5FF, #6578F8);
  background-size: 200% 100%;
  animation: ${pulse} 8s linear infinite;
`

const FuelIcon = styled.button`
  width: 2.2rem;
  height: 2rem;
  position: relative;
  margin-left: 1rem;
`

const EmptyResultsContainer = styled.div`
    margin-top: 10rem;
    color: black;
    width: 100%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 1023px) {
        margin-top: 4rem;
        margin-bottom: 2rem;
        width: 100%;
    }
`
const EmptyResultsMessage = styled.p`
    margin-top: 2rem;
    width: 70%;
`
const EmptyResultsIcon = styled.p`
    width: 3rem;
    height: 3rem;
`

const TypingAnimationContainer = styled.div`
    display: flex; 
    width: 75%;
    flex-wrap: wrap; 
    margin-top: 8vh;
    justify-content: center;
    @media (max-width: 1023px) {
        height: 25vh;
        margin-top: 8vh;
      }
`

const LoadingTextsContainer = styled.div`
    height: 13vh; 
    display: flex; 
    margin-top: 4rem;
    flex-wrap: wrap; 
    justify-content: center;
    @media (max-width: 1023px) {
        padding: 15vh 0 25vh 0;
      }
`

const ConversationBottom = styled.div`
    margin-top: 0.7rem;
    @media (max-width: 1023px) {
        margin-top: 5rem;
    }
`
const PromptInput = styled.textarea`
    box-shadow: inset 3px 3px 7px rgba(22, 27, 29, 0.23), inset -3px -3px 7px #FAFBFF;
    margin-top: 0.5rem;
    border: 2px solid #E5E8F0;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    resize: none;
    color: black;
    font-weight: 500;
    border-radius: 15px;
    padding: 1.4vh 1vw 1.4vh 1vw;
    ::placeholder,
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #A7ACBC;
      font-weight: 500;
    }
    :-ms-input-placeholder {
       color: #A7ACBC;
       font-weight: 200;
       font-style: italic;
    }
    @media (max-width: 1023px) {
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
    }
`

const UserPromptContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`

const AskBtn = styled.button`
    padding: 0.75vh 2vw 0.75vh 2vw;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.3rem;
    margin-top: 2vh;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.45);
      }
    @media (max-width: 1023px) {
      padding: 1vh 3vw 1vh 3vw;
    }
`

const SendIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.2rem;
`

const UserMessageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        padding: 0rem 0rem 1rem 0rem;
    }
`

const UserMessage = styled.div`
    padding: 0.75rem 1rem 0.75rem 1rem;
    font-size: 1rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    margin: 1.4rem 0rem 1.4rem 0rem;
    color: black;
    font-weight: 500;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    resize: none;
    border-radius: 15px;
    margin-top: 0.5rem;
    padding: 1.6vh 1.2vw 1.6vh 1.2vw;
    @media (max-width: 1023px) {
        width: auto;
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
        margin-top: 0.2rem
        font-size: auto;
    }
`

const SendBtnContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1023px) {
    justify-content: flex-end;
  }
`