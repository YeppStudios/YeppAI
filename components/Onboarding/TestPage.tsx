import styled from "styled-components";
import Image from "next/image";
import Centered from "../Centered";
import SlideBottom from "../Animated/SlideBottom";
import Title from "./common/Title";
import Logo from "./common/Logo";
import Description from "./common/Description";
import BackButton from "./common/BackButton";
import BottomTimeline from "./common/BottomTimeline";
import SkipButton from "./common/SkipButton";
import ContinueButton from "./common/ContinueButton";
import { useEffect, useRef, useState } from "react";
import profileIcon from "../../public/images/profile_image.png";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import api from "@/pages/api";
import assistantIcon from "../../public/images/assistant_profile.png";
import { BlueLoader } from "@/components/Common/Loaders";
import ConversationIntro from "../Chat/ConversationIntro";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import sendIcon from "../../public/images/send.png";
import lightMeshBackground from "../../public/images/lightMeshBackground2.png";
import mobileMeshBackground from "../../public/images/mobileMeshBackground2.png";
import meshBackground from "../../public/images/meshBackground4.png";
import mobileBackground from "../../public/images/mobileOnboardingBackground.png";
import PageBackground from "./common/PageBackground";
import NoElixirTestModal from "../Modals/LimitModals/NoElixirTestModal";
import { useRouter } from "next/router";
import Link from "next/link";

interface Message {
    sender: string; text: string;
  }
  interface Background {
    image: any,
    mobileImage: any
  }

const TestAssistant = (props: {children: any, back: object}) => {

    const [userInput, setUserInput] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [assistantThinking, setAssistantThinking] = useState(false);
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showIntro, setShowIntro] = useState(false);
    const [mobile, setMobile] = useState(true);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [replying, setReplying] = useState(false);

    const router = useRouter();
    useAutosizeTextArea(textAreaRef.current, userInput);
  
    useEffect(() => {
        if(window.innerWidth >= 1023){
            setMobile(false);
        }

        const conversationBottom = document.getElementById("conversation-bottom");

        if(conversationBottom){
            conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
        const text = localStorage.getItem("defaultText");
        if(text){
            setUserInput(text);
        }
    }, []) 
  
    const sendMessage = async (e: any) => {
      e.preventDefault();
      setShowIntro(false);
      let token = localStorage.getItem("token");
      localStorage.removeItem("defaultText");
      const abortController = new AbortController();
      const signal = abortController.signal;
      setUserInput('');
      let text = '';
      setReplying(true);

      if(assistantThinking || !userInput) {
        return;
      }
      
      setAssistantThinking(true);
      
      const userMessageObject = {
        sender: "user",
        text: userInput,
     }
     setMessages([...messages, userMessageObject]);
        
      //getting latest messages for the context
      const latestMessages = messages.slice(-4);
      const conversationContext = [  { role: "system", content: "Jesteś pomocnym asystentem." },  ...latestMessages.map((message) => {    
          return {role: message.sender,  content: message.text,};
      }), { role: "user", content: userInput },];

      try {
        const response = await fetch('https://asystentai.herokuapp.com/testMessageAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: signal,
          body: JSON.stringify({conversationContext, test: true}),
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
              setResponseMessage('')
              const conversationBottom = document.getElementById("conversation-bottom");
              if(conversationBottom){
                conversationBottom.scrollIntoView({behavior: 'smooth', block: 'start'});//scroll to the bottom
              }
              setReplying(false);
              break;
            }
    
            const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
            setAssistantThinking(false);
            for (const jsonString of jsonStrings) {
              try {
                const data = JSON.parse(jsonString);
    
                if (data.content) {
                  setResponseMessage((prevMessage) => prevMessage + data.content);
                  text += data.content;
                }
              } catch (error) {
                console.error('Error parsing JSON:', jsonString, error);
              }
            }
          }
        }
        // setGenerationCost(data.tokens);
  
      } catch (e) {
        console.log(e);
        setAssistantThinking(false);
        setReplying(false);
      } finally {
        abortController.abort();
      }
    }

    useEffect(() => {
        const conversationBottom = document.getElementById("conversation-bottom");
        if(conversationBottom){
            conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
      }, [messages, responseMessage]);

    function submitOnEnter(event: any) {
        if (event.which === 13 && !event.shiftKey) {
            if (!event.repeat) {
                const newEvent = new Event("submit", {cancelable: true});
                sendMessage(newEvent);
            }
    
            event.preventDefault();
        }
    }

    useEffect(() => {
        const assistantMessageObject = {
            sender: "assistant",
            text: "Cześć! W czym mogę Ci pomóc?",
        }
        setMessages([assistantMessageObject]);
    }, []);

    useEffect(() => {
      const conversationBottom = document.getElementById("conversation-bottom");
      if(conversationBottom){
          conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
      }
    }, [messages, responseMessage]);

  
    const renderMessages = () => {
      const fetchedMessages = messages?.map((message) => {
        if(message.sender === "user"){
          return (
            <UserMessageContainer key={`${message.text}`}>
                <UserMessage>{message.text}</UserMessage>
                <ProfileIcon>
                  <Image style={{ width: "100%", height: "auto" }} src={profileIcon} alt={'user'}></Image> 
                </ProfileIcon>
            </UserMessageContainer>
          )
        } else {
          return (
            <AssistantMessageContainer key={`${message.text}`}>
                  <ProfileIcon>
                    <Image style={{ width: "100%", height: "auto" }} src={assistantIcon} alt={'profile'}></Image> 
                  </ProfileIcon>
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
  
  
    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = evt.target?.value;
      setUserInput(val);
    };
  

    return (
        <div style={{overflow: "hidden", color: "white"}}>
            {openNoElixirModal && <NoElixirTestModal onClose={() => setOpenNoElixirModal(false)} onSubmit={() => router.push("/onboarding?step=5")}/>}
            <PageBackground image={mobileBackground}/>
            <BackButton back={props.back}/>
            <Centered>
                {mobile ? <Logo color="#ffffff" /> : <Logo color="black" />}
            </Centered>
            <Centered>
            {mobile ? <Title><h1 style={{color: "white"}}>Zacznij konwersację</h1></Title> : <Title>Zacznij konwersację</Title>}
            </Centered>
            <Centered>
                <Description>
                    Zadaj Asystentowi pytanie które cię nurtuje czy też zleć mu napisanie posta marketingowego. Ogranicza Cię tylko Twoja wyobraźnia!
                </Description>
            </Centered>
                <Centered>
                <ConversationBackground image={meshBackground} mobileImage={mobileMeshBackground}>
                <SlideBottom>
                <ConversationContainer image={lightMeshBackground} mobileImage={mobileMeshBackground}>
                    {pageLoading ?
                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <BlueLoader />
                    </div>
                    :
                    <ConversationContent>
                        {showIntro &&
                        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <ConversationIntro />
                        </div>
                        }
                        {renderMessages()}
                        {replying && 
                        <AssistantMessageContainer>
                            <ProfileIcon>
                                <Image style={{ width: "100%", height: "auto" }} src={assistantIcon} alt={'profile'}></Image> 
                            </ProfileIcon>
                            <AssistantMessage>
                                {!responseMessage ?
                                    <TypingAnimation  colorful={true}/>
                                    :
                                    responseMessage
                                }

                            </AssistantMessage>
                        </AssistantMessageContainer>
                        }
                        <div style={{marginTop: "0.75rem"}} id="conversation-bottom"></div>           
                        </ConversationContent>  
                    }
                    <InputContainer onSubmit={(e) => sendMessage(e)}>
                        <Input         
                        id="usermsg"
                        onKeyDown={submitOnEnter}
                        onChange={handleChange}
                        ref={textAreaRef}
                        rows={1}
                        value={userInput} 
                        placeholder="Napisz wiadomość..."
                        />
                        <SendButton>
                        <SendIcon>
                            <Image style={{ width: "100%", height: "auto" }} src={sendIcon} alt={'sendIcon'}></Image> 
                        </SendIcon>
                        </SendButton>
                    </InputContainer>
                </ConversationContainer>
                </SlideBottom>
                </ConversationBackground>
                </Centered>
            <Centered>
                <Link href="/onboarding/?step=5">
                    <ContinueButton text="Sprawdź Ofertę"/>
                </Link>
            </Centered>
            <BottomTimeline>
                <Centered>
                    {props.children}
                </Centered>
            </BottomTimeline>
            <SkipButton />
        </div>
    )
}

export default TestAssistant;


const ConversationBackground = styled.div<Background>`
    width: 100%;
    display: flex;
    justify-content: center;
    &:before {
        content: "";
        position: absolute;
        width: 110vw;
        height: 80vh;
        margin-top: -10vh;
        z-index: 0;
        background-image: url(${props => props.image.src});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        @media (max-width: 1023px) {
            margin-top: -20vh;
            z-index: 0;
            height: 60vh;
            background-image: url(${props => props.mobileImage.src});
        }
    }
`
const ConversationContainer = styled.div<Background>`
    width: 65vw;
    height: 49vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    margin: 1.4rem 0rem 1.4rem 1.4rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    margin-top: 5vh;
    border-radius: 15px;
    padding: 1.2rem;
    padding-bottom: 2rem;
    @media (max-width: 1023px) {
        box-shadow: none;
        margin-top: 1vh;
        width: 97vw;
        height: 45vh;
        background: transparent;
    }
`

const ConversationContent = styled.div`
    flex: 1;
    height: auto;
    width: 100%;
    padding: 2rem 0 1rem 0;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 94%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
 
    mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 94%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    mask-repeat:no-repeat;
    background-color: transparent;
    &::-webkit-scrollbar {
      display: none;
  }
`



const InputContainer = styled.form`
    width: 100%;
    height: auto;
    align-items: center;
    display: flex;
    justify-content: center;
    @media (max-width: 1023px) {
        align-items: flex-end;
    }
`

const Input = styled.textarea`
    width: 85%;
    max-height: 10rem;
    padding: 0.7rem;
    font-size: 1rem;
    border-radius: 10px;
    background: #F1F1F1;
    border: 2px solid #ECECEC;
    box-shadow: inset 2px 4px 4px 1px rgb(0, 0, 0, 0.2);
    color: black;
    outline: none;
    resize: none;
    z-index: 1;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #6F7890;
    }
    :-ms-input-placeholder {
    color: #6F7890;
    }
    @media (max-width: 1023px) {
        max-height: 16vh;
    }
`

const SendIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.2rem;
`

const SendButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10px;
    border: none;
    margin-left: 2rem;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        margin-left: 2vw;
        width: 2.8rem;
        height: 2.8rem;
    }

`
const UserMessageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 2rem 2rem 0.5rem 2rem;
    align-self: end;
    @media (max-width: 1023px) {
        padding: 2rem 0rem 0.5rem 0rem;
    }
`

const ProfileIcon = styled.div`
    width: 2rem;
    height: 2rem; 
    border-radius: 8px;
    overflow: hidden;
    border: none;

`

const UserMessage = styled.div`
    padding: 0.75rem 1rem 0.75rem 1rem;
    font-size: 0.85rem;
    max-width: 84%;
    background: white;
    font-weight: 500;
    color: black;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.35);
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-right: 1.5rem;
    line-height: 1.5rem;
    @media (max-width: 1023px) {
        max-width: 90%;
        width: auto;
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
        font-size: 3.5vw;
        margin-right: 3.2vw;
        margin-top: 0.2rem
    }
`

const AssistantMessageContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 2rem 0rem 0.5rem 2rem;
    @media (max-width: 1023px) {
        padding: 2rem 2rem 0.5rem 0rem;
    }
`

const AssistantMessage = styled.div`
    padding: 0.9rem;
    font-size: 0.85rem;
    margin: 0;
    max-width: 84%;
    font-weight: 500;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.25);
    background: #000000;
    border-top-right-radius: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    margin-left: 1.5rem;
    line-height: 1.5rem;
    white-space: pre-wrap;
    @media (max-width: 1023px) {
        max-width: 85%;
        width: auto;
        padding: 2.5vw 3.5vw 2.5vw 3.5vw;
        font-size: 3.5vw;
        margin-left: 3.2vw;
        margin-top: 0.2rem;
    }
`