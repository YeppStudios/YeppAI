import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import BackBtn from "../Common/BackBtn";
import BackBtnIcon from "../Common/BackBtnIcon";
import BackBtnText from "../Common/BackBtnText";
import Image from "next/image";
import backIcon from "../../public/images/backArrow.png";
import sendIcon from "../../public/images/send.png";
import assistantIcon from "../../public/images/assistant_profile.png";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import api from "@/pages/api";
import TypingAnimation from "../Modals/common/TypingAnimation";
import ReminderModal from "../Modals/InformationalModals/ReminderModal";
import AddElixir from "../Modals/AddingModals/AddElixir";
import fuelIcon from "../../public/images/fuel.png";
import NoElixir from "../Modals/LimitModals/NoElixir";
import FeedbackPopover from "../Common/FeedbackPopover";
import { selectAssistantState } from "../../store/assistantSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectedUserState } from "@/store/userSlice";
import FoldersDropdown from "../forms/FolderDropdown";
import { selectFoldersState } from '@/store/selectedFoldersSlice'
import { defaultAssistantState } from "../../store/assistantSlice";
interface Message {
    sender: string; text: string;
}

interface WidthProp {
  width: string;
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

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: "100%" }
};

const ChatSidebar = (props: { open: boolean, onClose: any, user: any, selectedPrompt: any, assistants: any, setAssistants: any }) => {

  const controls = useAnimation();
  const [prompt, setPrompt] = useState("");
  const [assistantThinking, setAssistantThinking] = useState(false);
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState('');
  const [workspace, setWorkspace] = useState<any>({});
  const [elixirWidth, setElixirWidth] = useState<string>("0");
  const [openElixirReminder, setOpenElixirReminder] = useState(false);
  const [openElixirModal, setOpenElixirModal] = useState(false);
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const selectedAssistant = useSelector(selectAssistantState);
  const defaultAssistant = useSelector(defaultAssistantState);
  const user = useSelector(selectedUserState);
  let selectedFolders: Folder[] = useSelector(selectFoldersState);

  useEffect(() => {
    const updateElixirUsage = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      setWorkspace(localStorage.getItem("workspace"));
      if(user){
        if(user.plan && user._id){
          const planResponse = await api.get(`/${user._id}/planInfo`);
          setElixirWidth((planResponse.data.percentage*100).toString());
        } else if(user.tokenBalance){
          let percentage = (user.tokenBalance/25);
          if ( user.accountType === "company") {
            percentage = (user.tokenBalance/75);
          }
          let elixir = Number(percentage) > 100 ? 100 : Number(percentage) < 0 ? 0 : percentage;
          setElixirWidth((elixir).toString());
      }
      }
    } 
    updateElixirUsage();
  }, [replying, user])

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
  }, []);

  useEffect(() => {
      if(messages.length === 0){
          setPrompt(props.selectedPrompt)
      }
  }, [messages.length, props.selectedPrompt])


  //open and close sidebar
  useEffect(() => {
    controls.start(props.open ? "open" : "closed");
  }, [controls, props.open]);


  useEffect(() => {
    const conversationBottom = document.getElementById("conversation-bottom");
    if(conversationBottom){
        conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }, [messages, reply]);


  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, prompt);

  const sendMessage = async () => {
    const userInput = prompt;
    let token = localStorage.getItem("token");
    let workspace = localStorage.getItem("workspace");
    let userId = localStorage.getItem("user_id");

    const abortController = new AbortController();
    const signal = abortController.signal;

    setReplying(true);

    if(assistantThinking || !prompt) {
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
      setReplying(false);
      return;
    }

    let text = '';
    let promptToSend = prompt;
    let context = '';
    localStorage.removeItem("defaultText");
    setPrompt('');
    setReply('');
    setAssistantThinking(true);
    
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
                      "query": promptToSend,
                      "filter": {
                        "document_id": vectorIdsResponse.data
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
            promptToSend = "Context which might help you answer: " + context + " Task for you: " + promptToSend;
            // setEmbeddedDocuments(chunks.data.results[0].results);
            } catch (e) {
            }
          }


    //getting latest messages for the context
    const latestMessages = messages.slice(-4);
    const conversationContext = [  { role: "system", content: defaultAssistant.noEmbedPrompt },  ...latestMessages.map((message) => {    
        return {role: message.sender,  content: message.text,};
    }), { role: "user", content: promptToSend },];

    try {
      const response = await fetch('https://asystentai.herokuapp.com/messageAI', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
        signal: signal,
        body: JSON.stringify({conversationContext, model: "gpt-4"}),
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
            setReplying(false);
            const conversationBottom = document.getElementById("conversation-bottom");
            if(conversationBottom){
              conversationBottom.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
            break;
          }
  
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          setAssistantThinking(false);
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
  
              if (data.content) {
                setReply((prevMessage) => prevMessage + data.content);
                text += data.content;
              }
            } catch (error) {
              console.error('Error parsing JSON:', jsonString, error);
            }
          }
        }
      }

    } catch (e) {
      console.log(e);
      setAssistantThinking(false);
      setReplying(false);
    } finally {
      abortController.abort();
    }
  }

  const renderMessages = () => {
    const fetchedMessages = messages?.map((message) => {
      if(message.sender === "user"){
        return (
          <UserMessageContainer key={`${message.text}`}>
              <UserMessage>{message.text}</UserMessage>
          </UserMessageContainer>
        )
      } else {
        return (
          <AssistantMessageContainer key={`${message.text}`}>
                <NameContainer>
                    <ProfileIcon>
                        <Image style={{ width: "100%", height: "auto" }} src={assistantIcon} alt={'profile'}></Image> 
                    </ProfileIcon>
                    <p>Asystent</p>
                </NameContainer>
                <AssistantMessage dangerouslySetInnerHTML={{__html: message.text.replace(/\n/g, '<br />')}} />
          </AssistantMessageContainer>
        )
      }
    })

    return(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
        {fetchedMessages}
      </div>
    )
  }

  function submitOnEnter(event: any) {
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat) {
            sendMessage();
        }
        event.preventDefault();
    }
  }

  const closeSidebar = () => {
    props.onClose();
    setMessages([]);
  }

  return (
      <div>
        {openElixirReminder && <ReminderModal onClose={() => setOpenElixirReminder(false)} elixirWidth={elixirWidth}/>}
        {openElixirModal && <AddElixir onClose={() => setOpenElixirModal(false)} />}
        {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
        <Sidebar variants={sidebarVariants} animate={controls} initial="closed" onClick={(e) => e.stopPropagation()}>
                <BackBtn onClick={() => closeSidebar()}>
                    <BackBtnIcon>
                        <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                    </BackBtnIcon> 
                    <BackBtnText>Back</BackBtnText>
                </BackBtn>
                <ElixirHeader>
                  <div className="w-8/12">
                  <FoldersDropdown />
                  </div>
                </ElixirHeader>
                <Conversation>
                    {renderMessages()}
                    {!replying ? 
                    <UserPromptContainer>
                        <NameContainer>
                            <p>Your prompt</p>
                        </NameContainer>
                        <PromptInput 
                            placeholder="Type a prompt..."                   
                            onKeyDown={submitOnEnter}
                            ref={textAreaRef}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                       <SendBtnContainer>
                            <AskBtn className="generate-prompt-btn" onClick={sendMessage}>
                            <SendIcon>
                                <Image style={{ width: "100%", height: "100%" }} src={sendIcon} alt={'sendIcon'}></Image> 
                            </SendIcon>
                            </AskBtn>
                        </SendBtnContainer>
                    </UserPromptContainer>
                    :
                    <AssistantMessageContainer>
                    <NameContainer>
                        <ProfileIcon>
                            <Image style={{ width: "100%", height: "auto" }} src={assistantIcon} alt={'profile'}></Image> 
                        </ProfileIcon>
                        <p>Assistant</p>
                    </NameContainer>
                    {assistantThinking ?
                        <AssistantMessage style={{width: "auto"}}><TypingAnimation  colorful={true}/></AssistantMessage>
                        :
                        <AssistantMessage style={{width: "auto"}}><p>{reply}</p></AssistantMessage>
                    }

                    </AssistantMessageContainer>
                    }
                    <ConversationBottom id="conversation-bottom"></ConversationBottom>     
                </Conversation>
                  {props.open &&
                    <FeedbackPopover />
                  }
        </Sidebar>

      </div>

  )
};

export default ChatSidebar;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 50vw;
  box-shadow: -5px -5px 10px rgba(15, 27, 40, 0.23);
  background-color: white;
  padding: 2rem 0 0 1.4rem;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  z-index: 16;
  @media (max-width: 1023px) {
    width: 100vw;
  }
`;

const Conversation = styled.div`
    margin-top: 7vh;
    width: 100%;
    height: 90vh;
    overflow-y: scroll;
    padding: 1rem 2rem 7rem 1rem;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 94%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
`

const PromptInput = styled.textarea`
    width: 100%;
    outline: none;
    box-sizing: border-box;
    resize: none;
    border-radius: 15px;
    background-color: white;
    box-shadow: inset 3px 3px 5px rgba(15, 27, 40, 0.23), inset -3px -3px 5px #FAFBFF;
    border: 2px solid #E5E8F0;
    padding: 1.7vh 1vw 2vh 1vw;
    font-weight: 500;
    color: black;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #A7ACBC;
      font-weight: 200;
      font-style: italic;
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

const ProfileIcon = styled.div`
    width: 1.75rem;
    height: 1.75rem; 
    margin-right: 0.5rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.15);
    border: none;
    @media (max-width: 1023px) {
      width: 1.75rem;
      height: 1.75rem; 
    }
`

const AskBtn = styled.button`
    padding: 0.75vh 3vw 0.75vh 3vw;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    font-weight: 500;
    align-items: center;
    margin-top: 2vh;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
      }
`

const SendIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.2rem;
`

const AssistantMessage = styled.div`
    font-size: 1rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    width: 100%;
    outline: none;
    color: black;
    font-weight: 500;
    box-sizing: border-box;
    resize: none;
    border-radius: 15px;
    padding: 1.8vh 1.2vw 1.8vh 1.2vw;
    white-space: pre-wrap;
    @media (max-width: 1023px) {
        max-width: 100%;
        width: auto;
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
        font-size: auto;
        margin-top: 0.2rem;
    }
`
const AssistantMessageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0rem 0rem 1rem 0rem;
    @media (max-width: 1023px) {
        padding: 0rem 0rem 1rem 0rem;
    }
`
const UserMessage = styled.div`
    font-size: 1rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    border: 2px solid #E5E8F0;
    color: black;
    font-weight: 500;
    width: 100%;
    outline: none;
    box-sizing: border-box;
    resize: none;
    border-radius: 15px;
    padding: 1.6vh 1.2vw 1.6vh 1.2vw;
    @media (max-width: 1023px) {
        width: auto;
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
        margin-top: 0.2rem
        font-size: auto;
    }
`
const UserMessageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0rem 0rem 1rem 0rem;
    @media (max-width: 1023px) {
        padding: 0rem 0rem 1rem 0rem;
    }
`

const NameContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: cetner;
    margin-bottom: 0.5rem;
    padding-left: 0.2rem;
    margin-top: 0.4rem;
    color: black;
    font-weight: 500;
`

const ConversationBottom = styled.div`
    margin-top: 0.7rem;
    @media (max-width: 1023px) {
        margin-top: 5rem;
    }
`

const ElixirHeader = styled.div`
    display: flex; 
    position: absolute;
    top: 1rem;
    right: 0rem;
    width: 100%;
    justify-content: flex-end;
    padding: 0 1.5rem 0 2rem;
    align-items: center;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
        top: 0.7rem;
    }
`

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

const pulse = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;


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

const SendBtnContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 1023px) {
    justify-content: flex-end;
  }
`