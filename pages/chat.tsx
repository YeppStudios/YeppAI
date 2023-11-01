import React, {useEffect, useRef, useState} from "react";
import PageTemplate from "@/components/Common/PageTemplate";
import styled from "styled-components";
import profileIcon from "../public/images/profile_image.png";
import assistantIcon from "../public/images/assistant_profile.png";
import sendIcon from "../public/images/send.png";
import Image from "next/image";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import ConversationSidebar from "@/components/Chat/ConversationSidebar";
import api from "@/pages/api";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { BsPencilSquare, BsCheckLg, BsPlus, BsSearch, BsFilePdf, BsFillPauseFill, BsTextLeft, BsCollection } from "react-icons/bs";
import { selectConversationState, setSelectedConversation } from "../store/conversationSlice";
import { useSelector, useDispatch } from "react-redux";
import { BlueLoader } from "@/components/Common/Loaders";
import ConversationIntro from "../components/Chat/ConversationIntro";
import Message from "@/components/Animated/Message";
import { useRouter } from "next/router";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import backIcon from "../public/images/backArrow.png";
import BackBtnText from "@/components/Common/BackBtnText";
import whiteLogo from "../public/images/logo_white.png";
import Head from "next/head";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import axios from "axios";
import { selectAssistantState, setSelectedAssistant } from "../store/assistantSlice";
import SlideBottom from "@/components/Animated/SlideBottom";
import dynamic from "next/dynamic";
import ThinkingMessage from "@/components/Animated/ThinkingMessage";
import OnboardingModal from "@/components/Modals/OnboardingModals/FeatureOnboarding";
const FirstPage = dynamic(() => import("@/components/Chat/FirstPage"));

interface Message {
  conversation: any; sender: string; text: string; timestamp: Date; contextDocs: Array<any>;
}

const Chat = () => {

  const [userInput, setUserInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Array<Message>>();
  const [assistantThinking, setAssistantThinking] = useState(false);
  const [conversationsRendered, setConversationsRendered] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const selectedConversation = useSelector(selectConversationState);
  const selectedAssistant = useSelector(selectAssistantState);
  const [editConversationName, setEditConversationName] = useState(false);
  const [fetchingDocuments, setFetchingDocuments] = useState(false);
  const [embeddedDocuments, setEmbeddedDocuments] = useState<Array<string>>([]);
  const [contextDocuments, setContextDocuments] = useState<any[]>();
  const [newTitle, setNewTitle] = useState('');
  const [showIntro, setShowIntro] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [userElixir, setUserElixir] = useState(0);
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [searchingInfo, setSearchingInfo] = useState("Searching relevant documents...");
  const [SearchEmoji, setSearchEmoji] = useState(() => BsSearch);
  const [abortController, setAbortController] = useState(new AbortController());
  const [openOnboarding, setOpenOnboarding] = useState(false);

  const dispatch = useDispatch();
  useAutosizeTextArea(textAreaRef.current, userInput);

  const fetchUserElixir = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const elixirResponse = await api.get(`/balance/${userId}`, {
        headers: {
            authorization: token
        },
    });

    setUserElixir(elixirResponse.data.balance)
  }

  useEffect(() => {
      if(window.innerWidth <= 1023){
          setMobile(true);
      }
    fetchUserElixir();
  }, [selectedAssistant]);

  useEffect(() => {
      createConversation(false);
  }, [selectedAssistant]);

  useEffect(() => {
    openConversation();
  }, [selectedConversation]);


  useEffect(() => {
    fetchUserElixir();
  }, [replying]);

  useEffect(() => {
    const onboarding = localStorage.getItem("onboarding");
    if (onboarding) {
      if (!onboarding.includes("chat") && onboarding.length > 0) {
        setOpenOnboarding(true);
      }
    }
  }, [])

  const closeOnboarding = () => {
    setOpenOnboarding(false);
    const prevOnboardingState = localStorage.getItem("onboarding");
    const updatedOnboardingState = prevOnboardingState + " chat";
    localStorage.setItem("onboarding", updatedOnboardingState);
  }

  const stopReplying = () => {
    abortController.abort();
  }

  const createConversation = async (btnClick: boolean) => {
    const token = localStorage.getItem("token");
    setPageLoading(true);
    if (selectedAssistant._id.length > 0){
      try {
        const latest = await api.get(`/latest-conversation/${selectedAssistant._id}`, { 
          headers: {
            authorization: token
          }
        })
        if(latest.data.latestConversation){
          let messagesData = {data: {messages: []}}
  
            messagesData = await api.get(`/messages/${ latest.data.latestConversation._id}`, {
              headers: {
                authorization: token
              }
            })
  
          // if(messagesData.data.messages.length !== 0){
            if (btnClick) {
            const { data } = await api.post(`/createConversation`, { assistant_id: selectedAssistant._id }, {
              headers: {
                authorization: token
              },
            });
            dispatch(setSelectedConversation(data.conversation));
            openLatestConversation();
            setConversationsRendered(true);
          } else {
            dispatch(setSelectedConversation(latest.data.latestConversation));
            setConversationsRendered(true);
          }
        } 
        setPageLoading(false);
      } catch (e) {
        const { data } = await api.post(`/createConversation`, { assistant_id: selectedAssistant._id }, {
          headers: {
            authorization: token
          },
        });
        dispatch(setSelectedConversation(data.conversation));
        openLatestConversation();
        setConversationsRendered(true);
      }
    }
  };

  const openConversation = async () => {
    const token = localStorage.getItem("token");
    setPageLoading(true);
    if (selectedAssistant) {
    try {

        let messagesData = {data: {messages: []}}

        if(selectedConversation._id){

          messagesData = await api.get(`/messages/${selectedConversation._id}`, {
            headers: {
              authorization: token
            }
          })

        }

        if(messagesData.data.messages.length > 0){
          setShowIntro(false);
        } else {
          setShowIntro(true);
        }
        setMessages(messagesData.data.messages);
        setConversationsRendered(true);

        //scroll to bottom
        const conversationBottom = document.getElementById("conversation-bottom");
        if(conversationBottom){
          conversationBottom.scrollIntoView({behavior: 'smooth', block: 'start'});//scroll to the bottom
        }
      
      setPageLoading(false);

    } catch (e) {
      console.log(e);
      setPageLoading(false);
    }

    }
  }

  const openLatestConversation = async () => {
    const token = localStorage.getItem("token");
    setPageLoading(true);
    if (selectedAssistant) {
    try {
      const { data } = await api.get(`/latest-conversation/${selectedAssistant._id}`, { 
        headers: {
          authorization: token
        }
      })
      if(data.latestConversation){

        let messagesData = {data: {messages: []}}

          messagesData = await api.get(`/messages/${ data.latestConversation._id}`, {
            headers: {
              authorization: token
            }
          })
          dispatch(setSelectedConversation( data.latestConversation ));

        if(messagesData.data.messages.length > 0){
          setShowIntro(false);
        } else {
          setShowIntro(true);
        }
        setMessages(messagesData.data.messages);
        setConversationsRendered(true);

        //scroll to bottom
        const conversationBottom = document.getElementById("conversation-bottom");
        if(conversationBottom){
          conversationBottom.scrollIntoView({behavior: 'smooth', block: 'start'}); //scroll to the bottom
        }

      } else {
        setShowIntro(true);
        createConversation(false)
      }
      
      setPageLoading(false);

    } catch (e) {
      console.log(e);
      setPageLoading(false);
    }
  }
  }

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (assistantThinking || replying){
      stopReplying();
    }
    if(assistantThinking || !userInput || replying) {
      return;
    }

    setAssistantThinking(true);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

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

    let text = "";
    let input = userInput;
    let browsing = false;
    setShowIntro(false);
    setUserInput('');
    let context = "";
    setReply('');
    setContextDocuments([]);
    setReplying(true);

    const userMessage = {
      conversation: selectedConversation,
      sender: "user",
      text: userInput,
      timestamp: new Date(),
      contextDocs: []
    }

    if (messages) {
      setMessages([...messages, userMessage]);
    } else {
      setMessages([userMessage])
    }

    try {
      const response = await fetch(`https://asystentai.herokuapp.com/sendMessage/${selectedConversation._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
        signal: newAbortController.signal,
        body: JSON.stringify({text: input, system: selectedAssistant.prompt, context, contextDocs: [], browsing}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.body) {
        const reader = response.body.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                if (!fetchingDocuments && !(input.startsWith("[%") || input.startsWith("[f") || input.startsWith(`"[`))) {
                    const responseMessage = {
                        conversation: selectedConversation,
                        sender: "assistant",
                        text: text,
                        timestamp: new Date(),
                        contextDocs: []
                    };
                    if (messages) {
                        setMessages([...messages, userMessage, responseMessage]);
                    }
                    setReplying(false);
                }
                break;
            }
    
            const decodedValue = new TextDecoder().decode(value);
            const dataStrings = decodedValue.split('data: ');
    
            for (const dataString of dataStrings) {
              if (dataString.trim() === 'null' || dataString.includes('event: DONE')) {
                continue;
              }
                if (text.length > 2) {
                  if (text.startsWith("[%") || text.startsWith("[f") || text.startsWith(`"[`)) {
                      setFetchingDocuments(true);
                      setSearchEmoji(() => BsSearch);
                      sendMessageWithEmbedding(userMessage);
                      return;
                  } else {
                      setAssistantThinking(false);
                      setReply(text);
                  }
              }
                text += dataString;
            }
        }
    }

    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        const responseMessage = {
          conversation: selectedConversation,
          sender: "assistant",
          text: text,
          timestamp: new Date(),
          contextDocs: []
        }

        if(messages) {
          setMessages([...messages, userMessage, responseMessage]);
        }
        setReplying(false);
        setAssistantThinking(false);
        setReplying(false);
      } else {
        console.log(e);
        setAssistantThinking(false);
        setReplying(false);
      }
    } finally {
      abortController.abort();
    }
  }

  const sendMessageWithEmbedding = async (userMessage: any) => {
    let token = localStorage.getItem("token");
    let workspace = localStorage.getItem("workspace");
    let userId = localStorage.getItem("user_id");

    const newAbortController = new AbortController();
    setAbortController(newAbortController);

    if (assistantThinking || replying){
      stopReplying();
    }

    setReplying(true);
    
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

    if (fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      setReplying(false);
      return;
    }

    let text = "";
    let context = "";
    let contextDocs = [];
    setReply('');

    const lastSixMessages = messages?.slice(-6);
    const messageStrings = lastSixMessages?.map(message => `${message.sender}: ${message.text}`).join('\n');
    const conversationString = `${messageStrings}\nuser: ${userInput}`;
    const vectorIdsResponse = await api.post("/getPineconeIds", {documents: selectedAssistant.documents}, {
      headers: {
        Authorization: token
      }
    });

    setSearchingInfo("Searching relevant documents...")
    const generatedQuery = await api.post("/completion", {
      model: "gpt-3.5-turbo",
      temperature: 0,
      systemPrompt: `You are a profound listener specializing in turning conversation with final user query into one complete question that will be understandable by embedding semantic search engine. You respond with only transformed user query.
      `,
      prompt: `
      examples: 
      user: I want to see the latest sales report.  Transformed query: latest sales report
      user: Określ także co unikatowego możemy zrobić aby GTM okazał się sukcesem. Transformed query: Czym zajmuje się Mastercard
      user: What can we do to increase sales? Transformed query: What is Yepp AI offering?

      Here is the conversation context so far:
      ${conversationString}
      If it is necessarry rewrite and simplify the last user query in a way that is short and understandable for semantic search engine based on the conversation context.

      Reply only with transformed user query for my conversation:
      `
    }, {
      headers: {
        Authorization: token,
      }
    });
    
    setSearchingInfo("Retrieving first results...")
    const initial_embedding_result = await api.post('/get-single-embedding', {prompt: generatedQuery.data.completion, document_ids: vectorIdsResponse.data}, {
      headers: {
        Authorization: token
      }
    });

    setSearchEmoji(() => BsCollection)
    setSearchingInfo("Searching more relevant data...")
    const context_response = await api.post('/completion-MSQT', {initial_prompt: generatedQuery.data.completion, embedding_result: initial_embedding_result.data.context, document_ids: vectorIdsResponse.data}, {
      headers: {
        Authorization: token
      }
    });

    context = context_response.data.context;
    // try {
    //   const chunks = await axios.post(
    //     "https://www.asistant.ai/query",
    //     {
    //       "queries": [
    //         {
    //           "query": userMessage.text,
    //           "filter": {
    //             "document_id": vectorIdsResponse.data
    //           },
    //           "top_k": 3
    //         }
    //       ]
    //     },
    //     {
    //       headers: {
    //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
    //       }
    //     }
    //   );

    // chunks.data.results[0].results.forEach((item: { text: string; }) => {
    //   context += item.text + " ";
    // });
    setSearchEmoji(() => BsTextLeft);
    setSearchingInfo("Summarizing everything...")
    setEmbeddedDocuments(context_response.data.fetched_doc_ids);
    const documentIds = context_response.data.fetched_doc_ids;
    const uniqueDocumentIds = documentIds.filter((id: any, index: any) => {
      return documentIds.indexOf(id) === index;
    });
    const fetchedDocuments = await api.post(`/documents-by-vector-ids`, {
        vectorIds: uniqueDocumentIds
    }, 
    {
      headers: {
        Authorization: token
      }
    });
    contextDocs = fetchedDocuments.data.documents.map((doc: { title: any; }) => doc.title);
    setContextDocuments(fetchedDocuments.data.documents);
    if (!contextDocs) {
      setFetchingDocuments(false);
    }

    try {
      const response = await fetch(`https://asystentai.herokuapp.com/sendMessage/${selectedConversation._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
        signal: newAbortController.signal,
        body: JSON.stringify({text: userMessage.text, system: selectedAssistant.noEmbedPrompt, context: context, contextDocs: contextDocs}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.body) {
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setSearchingInfo("Searching relevant documents...")
            const responseMessage = {
              conversation: selectedConversation,
              sender: "assistant",
              text: text,
              timestamp: new Date(),
              contextDocs: contextDocs
            };
            setFetchingDocuments(false);
            if (messages) {
              setMessages([...messages, userMessage, responseMessage]);
            }
            setReplying(false);
            break;
          }
    
          const decodedValue = new TextDecoder().decode(value);
          const dataStrings = decodedValue.split('data: ');
    
          setAssistantThinking(false);
          for (const dataString of dataStrings) {
            if (dataString.trim() === 'null' || dataString.includes('event: DONE')) {
              // This is the end of the stream or a control message. Ignore it.
              continue;
            }
            text += dataString;
            setReply(text);
          }
        }
      }
    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        const responseMessage = {
          conversation: selectedConversation,
          sender: "assistant",
          text: text,
          timestamp: new Date(),
          contextDocs: []
        }

        if (messages) {
          setMessages([...messages, userMessage, responseMessage]);
        }
        setReplying(false);
        setAssistantThinking(false);
        setReplying(false);
      } else {
        console.log(e);
        setAssistantThinking(false);
        setReplying(false);
      }
    } finally {
      abortController.abort();
    }
  }


  useEffect(() => {
    const conversationBottom = document.getElementById("conversation-bottom");
    if  (conversationBottom){
        conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
    }
  }, [messages]);

  const renderMessages = () => {
    const fetchedMessages = messages?.map((message) => {
      if(message.sender === "user"){
        return (
          <>
          {mobile ?
          <UserMessageContainer key={`${message.timestamp}`}>
              <div style={{width: "100vw", display: "flex", justifyContent: "flex-end"}}>
              <ProfileIcon background={profileIcon} />
              </div>
              <Message assistant={false} marginLeft="1.5rem">
                {message.text}
              </Message>
          </UserMessageContainer>    
          :
          <UserMessageContainer key={`${message.timestamp}`}>
              <Message assistant={false} marginLeft="1.5rem">
                {message.text}
              </Message>
              <ProfileIcon background={profileIcon} />
          </UserMessageContainer>     
          }
          </>

        )
      } else {
        return (
          <>
          {mobile ?
          <AssistantMessageContainer key={`${message.timestamp}`}>
            <div style={{width: "100vw", display: "flex", justifyContent: "flex-start"}}>
              <ProfileIcon background={assistantIcon} />
            </div>
                <Message assistant={true} marginLeft="1.5rem">
                  {message.text}
                </Message>
          </AssistantMessageContainer>
          :
          <AssistantMessageContainer key={`${message.timestamp}`}>
              <ProfileIcon background={assistantIcon} />
              {message.contextDocs.length > 0 &&
                message.contextDocs.map(document => (
                  <div style={{display: "inline-block"}} key={document}>
                    <SlideBottom>
                  <FetchingContainer>
                    <FetchingIcon><BsFilePdf style={{width: "100%", height: "auto"}}/></FetchingIcon>
                    {document}
                  </FetchingContainer>
                  </SlideBottom>
                  </div>
                ))
              }
              {(message.contextDocs.length) > 0 ?
              <div style={{width: "100%", display: 'flex'}}>
              <Message assistant={true} marginLeft="3rem">
                {message.text}
              </Message>
              </div>
              :
              <Message assistant={true} marginLeft="1.5rem">
                {message.text}
              </Message>
              }
          </AssistantMessageContainer>
          }
          </>
        )
      }
    })

    return(
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
        {fetchedMessages}
      </div>
    )
  }

  const editTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { data } = await api.patch(`/updateConversationTitle`, {_id: selectedConversation._id, title: newTitle}, {
      headers: {
        authorization: token
      }
    })
    dispatch(setSelectedConversation(data));
    setEditConversationName(false);
  }

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setUserInput(val);
  };

  const openNameEditing = () => {
    document.getElementById("edit-input")?.focus();
    setEditConversationName(true)
  }

  function submitOnEnter(event: any) {
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            sendMessage(newEvent);
        }

        event.preventDefault();
    }
  }

    return (
      <div onClick={() => setEditConversationName(false)}>
      <Head>
          <title>Chat with your data | Yepp AI</title>
          <meta name = "theme-color" content = "#FFFFFF" />
          <meta name="description" content="Chat with files, videos and websites using AI." />
      </Head>
      {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
      <PageTemplate userProfiles={[]}>
      {openOnboarding && <OnboardingModal onClose={closeOnboarding} title="Chat with your data" description="Once you have uploaded your assets you can chat with them by defining your AI. See how:" videoUrl="https://www.youtube.com/embed/tyWfMGJBO5c"/>}
      {(mobile && page === 2) &&
        <div style={{width: "100%", paddingTop: "1rem", position: "absolute"}}>   
            <BackBtn onClick={() => setPage(1)}>
                <BackBtnIcon>
                    <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                </BackBtnIcon> 
                 <BackBtnText>Back</BackBtnText>
            </BackBtn>
          </div>
        }
        {(mobile && page === 2) && <AddContainer><button onClick={() => createConversation(true)} style={{width: "4vh", height: "4vh", color: "black"}}><BsPlus style={{height: "130%", width: "auto"}} /></button></AddContainer>}
        {page === 1 ?
        <FirstPage nextPage={() => setPage(2)}></FirstPage>
        :
        <PageContent>
          <ConversationContainer>
            <ConversationHeaderContainer>
            {!mobile &&
            <BackBtn onClick={() => setPage(1)}>
                <BackBtnIcon>
                    <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                </BackBtnIcon> 
            </BackBtn>
            }
            {!mobile ? selectedAssistant ? <PageTitle>{selectedAssistant.name}</PageTitle> : <PageTitle>Yepp AI</PageTitle> : <div></div>}
            {mobile &&  <LogoContainer onClick={() => router.push("/")}><Image style={{ width: "auto", height: "100%" }}  src={whiteLogo} alt={'logo'}></Image></LogoContainer> }
            {(selectedConversation && !mobile) && 
              <ConversationTitleContainer onClick={(e) => e.stopPropagation()}>
                {editConversationName ?
                  <form onSubmit={(e) => editTitle(e)} style={{display: "flex", alignItems: "center"}}>
                    <EditNameInput 
                      id="edit-input" 
                      defaultValue={`${selectedConversation.title}`} 
                      placeholder={`${selectedConversation.title}`} 
                      onChange={(e) => setNewTitle(e.target.value)}
                      autoFocus
                    />
                    <EditButton><BsCheckLg/></EditButton>
                  </form>
                  :
                  <div style={{display: "flex", alignItems: "center"}}>
                    {!mobile && <ConversationTitle>{selectedConversation.title}</ConversationTitle>}
                    <PencilImageContainer>
                      <BsPencilSquare style={{marginLeft: "0.5rem"}} onClick={() => openNameEditing()}/> 
                    </PencilImageContainer>
                  </div>
                }
              </ConversationTitleContainer>
            }
            </ConversationHeaderContainer>
            
              {pageLoading ?
              <ConversationContent>
                <div  className="w-full h-full flex justify-center items-center">
                <BlueLoader />
                </div>
              </ConversationContent>
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
                    {mobile ?
                        <div style={{width: "100vw"}}>
                          <ProfileIcon background={assistantIcon} />
                        </div>
                        :
                        <ProfileIcon background={assistantIcon} />             
                    }
                        {fetchingDocuments && 
                          <div style={{ width: 'calc(100% - 1.8rem)'}}>
                            {(contextDocuments && contextDocuments?.length > 0) ?
                              contextDocuments.map(document => (
                                <div style={{display: "inline-block"}} key={document.vectorId}>
                                  <SlideBottom>
                                <FetchingContainer>
                                  <FetchingIcon><BsFilePdf style={{width: "100%", height: "auto"}}/></FetchingIcon>
                                  {document.title}
                                </FetchingContainer>
                                </SlideBottom>
                                </div>
                              ))
                              :
                              <div style={{display: "inline-block"}}>
                                <SlideBottom>
                                  <FetchingContainer>
                                  <FetchingIcon>
                                    <SearchEmoji style={{ width: "100%", height: "auto" }} />
                                  </FetchingIcon>
                                    {searchingInfo}
                                  </FetchingContainer>
                                  </SlideBottom>
                                </div>
                            }
                        </div>
                        }
                        {assistantThinking ?
                          <>
                          {fetchingDocuments ?
                          <ThinkingMessage assistant={true} marginLeft="3rem"></ThinkingMessage>  
                          :
                          <ThinkingMessage assistant={true} marginLeft="1.5rem"></ThinkingMessage>  
                          }   
                         </>
                        :
                        <>
                        {fetchingDocuments ?
                        <Message assistant={true} marginLeft="3rem">
                          {reply}
                        </Message>   
                        :
                        <Message assistant={true} marginLeft="1.5rem">
                          {reply}
                        </Message>
                        }
                        </>         
                        }

                  </AssistantMessageContainer>                
                }

                <div style={{marginTop: "4rem"}} id="conversation-bottom"></div>           
                </ConversationContent>  
              }
            {/* <div className="w-full px-12 pb-1 flex z-10"><div className="py-2 border border-gray-100 px-6 bg-white rounded-2xl cursor-pointer shadow-md font-medium text-black hover:scale-95 hover:shadow-none transition">Extra Context Mode</div></div> */}
            <InputContainer onSubmit={(e) => sendMessage(e)}>
                <Input         
                  id="text"
                  onChange={handleChange}
                  onKeyDown={submitOnEnter}
                  ref={textAreaRef}
                  rows={1}
                  value={userInput} 
                  placeholder="Chat with AI..."
                />
                <SendButton className="send-message-btn">
                  {assistantThinking ?
                  <TypingAnimation colorful={false}/>
                  :
                  <>
                  {replying ?
                  <SendIcon><BsFillPauseFill style={{height: "100%"}} /></SendIcon>
                  :
                  <SendIcon>
                    <Image style={{ width: "100%", height: "auto" }} src={sendIcon} alt={'sendIcon'}></Image> 
                  </SendIcon>
                  }
                  </>
                }
                </SendButton>
            </InputContainer>
          </ConversationContainer>
          <ConversationSidebar createConversation={() => createConversation(true)} render={conversationsRendered}/>
        </PageContent>
        }
      </PageTemplate>
      </div>
    )
  };

export default Chat;

const ConversationHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  @media (max-width: 1023px) {
      display: none;
}
`
const ConversationTitleContainer = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0,  0.55);
  cursor: pointer;
`

const PageTitle = styled.div`
  font-size: 1.7rem;
  text-align: left;
  color: black;
  font-weight: 600;
  margin-left: 2rem;
`
const ConversationTitle = styled.p`
  font-size: 1rem;
  text-align: left;
  font-weight: 500;
  margin-left: 1rem;
`

const EditNameInput = styled.input`
  font-size: 1rem;
  width: auto;
  background-color: #0D0E16;
  padding: 0.3rem 0.75rem 0.3rem 0.5rem;
  box-shadow: inset 5px 5px 10px rgba(15, 27, 40, 0.23), inset -5px -5px 10px #FAFBFF;
  border: 2px solid #E5E8F0;
  background-color: transparent;
  border-radius: 10px;
  color: black;
  font-weight: 500;
  outline: none;
  border: none;
  margin-left: 1rem;
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
    max-width: 25vw;
  }
`

const EditButton = styled.button`
    width: 3rem;
    height: 1.5rem;
    border-radius: 10px;
    border: none;
    margin-left: 1rem;
    background-color: #0D0E16;
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.9);
    }

`

const PencilImageContainer = styled.div`
  &:hover {
    color: black;
    box-shadow: 4px 4px 25px rgba(0, 0, 0, 0.15);
  }
`

const PageContent = styled.div`
height: calc(100vh - 1.5rem);
display: flex;
width: 100%;
position: relative;
border-radius: 25px;
@media (max-width: 1023px) {
  width: 100%;
  height: calc(100svh - 4.5rem);
  margin-top: 0;
  align-items: flex-start;
  padding: 0;
  padding-bottom: 0;
  box-shadow: none;
  box-shadow: none;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
`
const ConversationContainer = styled.div`
  flex: 1;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 0rem 1rem;
  background-color: white;
  border-radius: 25px;
  margin-right: 0.75rem;
  border: 2px solid #E5E8F0;
  height: 100%;
  @media (max-width: 1023px) {
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    width: 100vw;
    overflow-x: visible;
    box-shadow: none;
    margin-right: 0rem;
    border: none;
    margin-left: 0;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`

const ConversationContent = styled.div`
    flex: 1;
    height: auto;
    width: 100%;
    padding: 2rem 0 4rem 0;
    margin-bottom: -3rem;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 85%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
 
    mask: 
    linear-gradient(to top,    black 94%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 85%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    mask-repeat:no-repeat;
    &::-webkit-scrollbar {
      display: none;
  }
  @media (max-width: 1023px) {
    padding: 2rem 0 2rem 0;
    max-width: 100vw;
    overflow-x: visible;
}
`

const InputContainer = styled.form`
    width: 100%;
    height: 5rem;
    align-items: end;
    display: flex;
    padding-bottom: 1.5rem;
    justify-content: center;
    @media (max-width: 1023px) {
      height: 4rem;
      padding-bottom: 0.5rem;
  }
`

const Input = styled.textarea`
    width: 85%;
    max-height: 10rem;
    padding: 0.5rem 0.7rem 0.7rem 0.7rem;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 15px;
    background-color: white;
    box-shadow: inset -3px -3px 5px rgba(15, 27, 40, 0.13);
    -webkit-box-shadow: inset 0px 0px 6px rgba(15, 27, 40, 0.13);
    border: 2px solid #F1F1F1;
    background-color: #fff;
    outline: none;
    resize: none;
    color: black;
    z-index: 1;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: #A4A9B7;
      font-weight: 400;
      font-style: italic;
    }
    :-ms-input-placeholder {
       color: #A4A9B7;
       font-weight: 400;
       font-style: italic;
    }
    @media (max-width: 1023px) {
      background: white;
    }
`

const SendIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SendButton = styled.button`
    width: 2.7rem;
    height: 2.7rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120% 120%;
    background-position-x: -0.3rem;
    background-position-y: -0.3rem;
    transition: all 0.4s ease;
    z-index: 1;
    cursor: pointer;
    &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
      margin-left: 1rem;
  }

`
const UserMessageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 2rem 2rem 0.5rem 2rem;
    align-self: end;
    @media (max-width: 1023px) {
      padding: 1rem 0rem 0.5rem 0rem;
      flex-wrap: wrap;
  }
`

const ProfileIcon = styled.div<{background: any}>`
    width: 1.7rem;
    height: 1.7rem; 
    border-radius: 8px;
    display: flex;
    background-image: url(${props => props.background.src});
    background-size: cover;
    background-position: center;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 0 25px 1px rgba(0, 0, 0, 0.15);
    border: none;
    @media (max-width: 1023px) {
      width: 1.75rem;
      height: 1.75rem; 
    }
`

const AssistantMessageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 0.5rem 2rem;
    @media (max-width: 1023px) {
      padding: 1rem 0rem 0.5rem 0rem;
  }
`

const LogoContainer = styled.div`
  width: 100%;
  cursor: pointer;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.2vh;
`

const AddContainer = styled.div`
  width: 100%;
  height: 4vh;
  justify-content: flex-end;
  display: flex;
  margin-top: 0.5rem;
  padding-right: 1.25rem;
  z-index: 1;
  color: black;
  position: absolute;
  @media (max-width: 1023px) {
    padding-right: 2rem;
  }
`

const FetchingContainer = styled.div`
  padding: 0.5rem 2rem 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  margin-right: -0.5rem;
  margin-left: 1.2rem;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  color: black;
  font-weight: 500;
  @media (max-width: 1023px) {
    margin-left: 0.2rem;
    margin-top: 0.4rem;
    border-top-left-radius: 0;
}
`

const FetchingIcon = styled.div`
  width: 1rem;
  margin-right: 0.75rem;
`