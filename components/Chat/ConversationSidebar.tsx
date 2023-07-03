import styled from "styled-components";
import { BsFillChatTextFill, BsChevronDown, BsFillTrashFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { selectConversationState, setSelectedConversation } from "../../store/conversationSlice";
import { useSelector, useDispatch } from "react-redux";
import { HiPlusSm } from "react-icons/hi";
import FeedbackPopover from "../Common/FeedbackPopover";
import Centered from "../Centered";
import { selectAssistantState, setSelectedAssistant } from "../../store/assistantSlice";

interface Conversation {
    assistant: string;
    _id: String,
    user: any,
    startTime: String
    messages: Array<any>,
    lastUpdated: String,
    title: String
  }

const ConversationSidebar = ({createConversation}: any) => {

    const [conversations, setConversations] = useState<Array<Conversation>>()
    const selectedConversation = useSelector(selectConversationState);
    const selectedAssistant = useSelector(selectAssistantState);

    const dispatch = useDispatch();

    const fetchConversations = async () => {
        const token = localStorage.getItem("token");
        if (selectedAssistant._id) {
            try {
                const { data } = await api.get(`/getConversations/${selectedAssistant._id}`, {
                  headers: {
                    authorization: token
                  }
                })
                setConversations(data.conversations);
              } catch (e) {
                  console.log(e)
              }
        }
    }

    useEffect(() => {
        fetchConversations()
    }, [selectedConversation, selectedAssistant])

    const openConversation = (e: any, conversation: any) => {
        e.stopPropagation();
        dispatch(setSelectedConversation(conversation))
    }

    const handleBinContainerClick = async (e: any, conversation: any) => {
        e.stopPropagation();
        const token = localStorage.getItem("token");
        try {
            await api.delete(`/deleteConversation/${conversation._id}`, {
                headers: {
                  authorization: token
                }
            });
            fetchConversations();
            window.location.reload();
        } catch (e) {
            console.log(e)
        }

        
      };

    const renderConversations = () => {
        const fetchedConversations = conversations?.map((conversation) => {
            if(selectedAssistant._id !== "644d511929430f833c5ea281"){
            if(conversation.assistant){
                if (conversation.assistant === selectedAssistant._id) {
                    return (
                        <SavedConversation 
                            onClick={(e) => openConversation(e, conversation)}
                            key={`${conversation._id}`}
                        >
                            {selectedConversation._id === conversation._id ?
                             <SavedConversationIconBg >
                                <BsFillChatTextFill style={{color: "black"}} />
                            </SavedConversationIconBg>
                            :     
                            <SavedConversationIconBg>
                                <BsFillChatTextFill style={{color: "#8D929A"}} />
                            </SavedConversationIconBg>   
                            }
        
                            <div style={{display: "flex", flexWrap: "wrap"}} >
                                {selectedConversation._id === conversation._id ?
                                    <ConversationTitle style={{color: "black"}}>{conversation.title}</ConversationTitle>
                                    :
                                    <ConversationTitle style={{color: "#8D929A"}}>{conversation.title}</ConversationTitle>
                                }
                                <ConversationDate>{conversation.lastUpdated}</ConversationDate>
                                <FadeRight></FadeRight>
                            </div>
                            <div onClick={(e) => handleBinContainerClick(e, conversation)} style={{height: "100%"}}>
                                <BinContainer>
                                    <BsFillTrashFill style={{color: "black", width: "100%"}} />
                                </BinContainer>
                            </div>
                        </SavedConversation>
                    )
                }
            }
            } else {
                if (conversation.assistant === selectedAssistant._id || !conversation.assistant) {
                    return (
                        <SavedConversation 
                            onClick={(e) => openConversation(e, conversation)}
                            key={`${conversation._id}`}
                        >
                            {selectedConversation._id === conversation._id ?
                             <SavedConversationIconBg >
                                <BsFillChatTextFill style={{color: "black"}} />
                            </SavedConversationIconBg>
                            :     
                            <SavedConversationIconBg>
                                <BsFillChatTextFill style={{color: "#8D929A"}} />
                            </SavedConversationIconBg>   
                            }
        
                            <div style={{display: "flex", flexWrap: "wrap"}} >
                                {selectedConversation._id === conversation._id ?
                                    <ConversationTitle style={{color: "black"}}>{conversation.title}</ConversationTitle>
                                    :
                                    <ConversationTitle style={{color: "#8D929A"}}>{conversation.title}</ConversationTitle>
                                }
                                <ConversationDate>{conversation.lastUpdated}</ConversationDate>
                                <FadeRight></FadeRight>
                            </div>
                            <div onClick={(e) => handleBinContainerClick(e, conversation)} style={{height: "100%"}}>
                                <BinContainer>
                                    <BsFillTrashFill style={{color: "black", width: "100%"}} />
                                </BinContainer>
                            </div>
                        </SavedConversation>
                    )
                }
            }
        })

        return (
            <SavedConversationsList>
                {fetchedConversations}
            </SavedConversationsList>
        )
    }

    return (
        <SidebarContainer>
            <div style={{width: "100%"}}>
            <Centered>
                <NewConversationBtn onClick={() => createConversation()}><HiPlusSm style={{width: "auto", height: "60%"}} /><ButtonText>New Conversation</ButtonText></NewConversationBtn>
            </Centered>
            <ConversationsHeaderContainer>
                <ConversationsHeader>Conversations</ConversationsHeader>
                <BsChevronDown />
            </ConversationsHeaderContainer>
            {/* <InputContainer>
                <SearchInput placeholder="Szukaj..."></SearchInput>
            </InputContainer> */}
            {renderConversations()}
            <FeedbackPopover />
            </div>
        </SidebarContainer>
    )
}

export default ConversationSidebar;

const SidebarContainer = styled.div`
  position: relative;
  width: 18rem;
  height: 100%;
  padding: 1.5rem 1rem 2rem 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  align-items: center;
  background: white;
  border: 2px solid #E5E8F0;
  border-radius: 25px;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.23), -2px -2px 10px #FAFBFF;
  @media (max-width: 1023px) {
    display: none;
}
`

const ConversationsHeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.4rem 0 0.4rem;
    align-items: center;
    margin-top: 0.5rem;
`

const ConversationsHeader = styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    color: black;
`

const InputContainer = styled.div`
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
`

const SearchInput = styled.input`
    width: 100%;
    border-radius: 10px;
    background-color: #10121A;
    border: none;
    padding: 0.6rem;
    font-size: 1rem;
    outline: 1px solid #1A1B27;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #6F7890;
    }
    :-ms-input-placeholder {
    color: #6F7890;
    }
`

const SavedConversationsList = styled.div`
    padding: 0.75rem 0.2rem 1rem 0.2rem;
    width: 100%;
    flex: 1;
    max-height: 65vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
 
    mask: 
        linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
        linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
        linear-gradient(to left  , black, transparent) left  /100% 0%,
        linear-gradient(to right , black, transparent) right /100% 0%;
    mask-repeat:no-repeat;
    background-color: transparent;
    @media (max-width: 768px) {
      height: 80vw;
      padding: 4vw 2vw 6vw 2vw;
      margin-top: 3vw;
      width: 90vw;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`
const BinContainer = styled.div`
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 1rem;
    cursor: pointer;
    display: none;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.1);
    }
`

const SavedConversation = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: grid; 
    grid-template-columns: 0.2fr 1.6fr 0.2fr; 
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23), -2px -2px 4px #FAFBFF;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border: 2px solid #E5E8F0;
    border-radius: 15px;
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    cursor: pointer;
    grid-template-areas: 
      ". . ."; 
    margin: 0.75rem 0 0.75rem 0;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    &:hover ${BinContainer} {
        display: flex;
    }
`

const SavedConversationIconBg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
`


const ConversationTitle = styled.p`
    margin-left: 1rem;
    font-weight: 500;
    width: 100%;
    white-space: nowrap;
    font-size: 0.8rem;
`

const ConversationDate = styled.p`
    margin-left: 1rem;
    font-weight: 500;
    font-size: 0.7rem;
    color: #6F7890;
    margin-top: -0.2rem;
`

const FadeRight = styled.div`
    position: absolute;
    right: 1.5rem;
    width: 3rem;
    height: 100%;
    background: transparent;
`

const NewConversationBtn = styled.button`
    width: 95%;
    height: 2.75rem;
    font-size: 1rem;
    font-weight: 500;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
`

const ButtonText = styled.p`
    margin-left: 0.7vw;
`