import styled from "styled-components";
import { BsFillChatTextFill, BsChevronDown, BsFillTrashFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import api from "@/pages/api";
import { useEffect, useState } from "react";
import { selectAssistantState, setSelectedAssistant } from "../../store/assistantSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";

interface Assistant {
  _id: string;
  name: string;
  documents: Array<any>;
  prompt: string;
}

const defaultAssistant =   {
    _id: "644d511929430f833c5ea281",
    name: "Asystent AI",
    description: "Systemowy Asystent AI z wiedzą o marketingu i copywritingu",
    category: "marketing",
    prompt: "Nazywasz się: Asystent AI. Jesteś profesjonalnym marketingowcem i copywriterem z wieloletnim doświadczeniem. Pomagasz użytkownikowi we wszelkich działaniach marketingowych jak tworzeniu treści, strategii oraz analizy dotychczasowych działań. Zawsze jesteś uprzejmy i pozytywnie nastawiony.",
    noEmbedPrompt: "`Nazywasz się Asystent AI. Jesteś profesjonalnym marketingowcem i copywriterem z wieloletnim doświadczeniem. Pomagasz użytkownikowi we wszelkich działaniach marketingowych jak tworzeniu treści, strategii oraz analizy dotychczasowych działań. Zawsze jesteś uprzejmy i pozytywnie nastawiony.",
    folders: [],
    documents: []
}

const browsingAssistant =   {
    _id: "64587d01393e208ab509d3c9",
    name: "Asystent Browsing",
    description: "Asystent AI z dostępem do internetu",
    category: "general",
    prompt: `Nazywasz się Analityk AI. Jesteś profesjonalnym analitykiem konkurencji z wieloletnim doświadczeniem i ekspertyzą. Wiesz doskonale na jakie rzeczy należy zwracać uwagę przy analizie konkurencji. Potrafisz profesjonalnie porównywać oferty dwóch firm i ich produkty. Jesteś rzeczowy i opierasz się wyłącznie na wiedzy dostarczonej przez użytkownika w kontekście.`,
    noEmbedPrompt: "Nazywasz się: Asystent AI. Jesteś profesjonalnym marketingowcem i copywriterem z wieloletnim doświadczeniem. Pomagasz użytkownikowi we wszelkich działaniach marketingowych jak tworzeniu treści, strategii, analizy dotychczasowych działań oraz wyszukiwaniu danych z kontekstu. Zawsze jesteś uprzejmy i pozytywnie nastawiony.",
    folders: [],
    documents: []
}

const AssistantsSidebar = () => {

  const selectedAssistant = useSelector(selectAssistantState);
  const [assistants, setAssistants] = useState<Array<Assistant>>();
  const [userIdState, setUserIdState] = useState<string>("");
  const workspaceCompany = useSelector(selectedWorkspaceCompanyState);

  const dispatch = useDispatch();

  const fetchAssistants = async () => {
    const token = localStorage.getItem("token");
    const workspace = localStorage.getItem("workspace");
    const userId = localStorage.getItem("user_id");

    if (userId) {
        setUserIdState(userId);
    }

    let assistantsResponse;
    try {
        if (workspace === "undefined" || !workspace || workspace === "null") {
            assistantsResponse = await api.get(`/getUserAssistants/${userId}`, {
                headers: {
                  authorization: token
                }
            })
        } else {
            assistantsResponse = await api.get(`/getUserAssistants/${workspaceCompany._id}`, {
                headers: {
                  authorization: token
                }
            })
        }
        setAssistants(assistantsResponse?.data.assistants);
        if (assistantsResponse?.data.assistants.length === 0 || !selectedAssistant.name) {
            dispatch(setSelectedAssistant(defaultAssistant))
        }
    } catch (e) {
        console.log(e)
    }

    }

    useEffect(() => {
        fetchAssistants()
    }, [workspaceCompany]);

const renderAssistants = () => {
  const fetchedAssistants = assistants?.map((assistant) => {
      return (
        <div key={assistant._id}>
        {selectedAssistant._id === assistant._id ? 
        <SelectedAssistant  onClick={() => dispatch(setSelectedAssistant(assistant))}>
        <div style={{display: "flex", flexWrap: "wrap"}} >
              <AssistantTitle style={{color: "black"}}>{assistant.name}</AssistantTitle>
            <FadeRight></FadeRight>
        </div>
        {/* <div style={{height: "100%"}}>
            <OptionsIcon>
                <SlOptionsVertical style={{color: "black", width: "100%"}} />
            </OptionsIcon>
        </div> */}
      </SelectedAssistant>
      :
      <Assistant onClick={() =>dispatch(setSelectedAssistant(assistant))}>
      <div style={{display: "flex", flexWrap: "wrap"}} >
            <AssistantTitle style={{color: "black"}}>{assistant.name}</AssistantTitle>
          <FadeRight></FadeRight>
      </div>
      {/* <div style={{height: "100%"}}>
          <OptionsIcon>
              <SlOptionsVertical style={{color: "black", width: "100%"}} />
          </OptionsIcon>
      </div> */}
    </Assistant>
      }
      </div>
      )
  })

  return (
      <div>
          {fetchedAssistants}
      </div>
  )
}


    return (
        <SidebarContainer>
            <div style={{width: "100%"}}>
            <AssistantsHeaderContainer>
            <SidebarHeader>Asystenci</SidebarHeader>
                <BsChevronDown />
                <SidebarDescription>Oto lista Asystentów, którzy pomogą Ci w pracy:</SidebarDescription>
            </AssistantsHeaderContainer>
            {/* <InputContainer>
                <SearchInput placeholder="Szukaj..."></SearchInput>
            </InputContainer> */}
            <AssistantsList>
              {selectedAssistant._id === defaultAssistant._id ?
                <SelectedAssistant onClick={() =>dispatch(setSelectedAssistant(defaultAssistant))}>
                  <div style={{display: "flex", flexWrap: "wrap"}} >
                        <AssistantTitle style={{color: "black"}}>Asystent AI</AssistantTitle>

                      <FadeRight></FadeRight>
                  </div>
                  {/* <div style={{height: "100%"}}>
                      <OptionsIcon>
                          <SlOptionsVertical style={{color: "black", width: "100%"}} />
                      </OptionsIcon>
                  </div> */}
              </SelectedAssistant>              
              :
              <Assistant onClick={() =>dispatch(setSelectedAssistant(defaultAssistant))}>
                <div style={{display: "flex", flexWrap: "wrap"}} >
                      <AssistantTitle style={{color: "black"}}>Asystent AI</AssistantTitle>

                    <FadeRight></FadeRight>
                </div>
                {/* <div style={{height: "100%"}}>
                    <OptionsIcon>
                        <SlOptionsVertical style={{color: "black", width: "100%"}} />
                    </OptionsIcon>
                </div> */}
            </Assistant>         
              }
              {userIdState === "645b59bff4d21eaba374d561" &&
              <div>
              {selectedAssistant._id === browsingAssistant._id ?
                <SelectedAssistant onClick={() =>dispatch(setSelectedAssistant(browsingAssistant))}>
                <div style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}} >
                        <AssistantTitle style={{color: "black"}}>{browsingAssistant.name}</AssistantTitle><BetaTab>Beta</BetaTab>

                      <FadeRight></FadeRight>
                  </div>
                  {/* <div style={{height: "100%"}}>
                      <OptionsIcon>
                          <SlOptionsVertical style={{color: "black", width: "100%"}} />
                      </OptionsIcon>
                  </div> */}
              </SelectedAssistant>              
              :
              <Assistant onClick={() =>dispatch(setSelectedAssistant(browsingAssistant))}>
                <div style={{display: "flex", flexWrap: "nowrap", alignItems: "center"}} >
                      <AssistantTitle style={{color: "black"}}>{browsingAssistant.name}</AssistantTitle><BetaTab>Beta</BetaTab>

                    <FadeRight></FadeRight>
                </div>
                {/* <div style={{height: "100%"}}>
                    <OptionsIcon>
                        <SlOptionsVertical style={{color: "black", width: "100%"}} />
                    </OptionsIcon>
                </div> */}
            </Assistant>  
            }
            </div>       
              }
            {renderAssistants()}
            </AssistantsList>
            </div>
            {/* <Centered>
              <NewConversationBtn><HiPlusSm style={{width: "auto", height: "60%"}} /><ButtonText>Nowy Asystent</ButtonText></NewConversationBtn>
            </Centered> */}
        </SidebarContainer>
    )
}

export default AssistantsSidebar;

const SidebarContainer = styled.div`
  position: relative;
  width: 17rem;
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

const AssistantsHeaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0rem 0.4rem 0 0.4rem;
    align-items: center;
    padding-bottom: 1rem;
    flex-wrap: wrap;
    border-bottom: 2px #E2E5EE solid;
`

const SidebarHeader = styled.h2`
    font-weight: 700;
    font-size: 1.7rem;
    color: black;
`

const SidebarDescription = styled.p`
    font-weight: 500;
    font-size: 0.85rem;
    color: black;
    margin-top: 0.25rem;
    width: 90%;
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

const AssistantsList = styled.div`
    padding: 0.5rem 0.2rem 1rem 0.2rem;
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
const OptionsIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.1);
    }
`

const SelectedAssistant = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0.75rem 0.2rem 0.75rem;
    border: solid 2px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    cursor: pointer;
    margin: 0.75rem 0 0.75rem 0;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const Assistant = styled.div`
    width: 100%;
    height: 3rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23), -2px -2px 4px #FAFBFF;
    padding: 0.2rem 0.75rem 0.2rem 0.75rem;
    border: 2px solid #E5E8F0;
    border-radius: 15px;
    cursor: pointer;
    margin: 0.75rem 0 0.75rem 0;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const AssistantTitle = styled.p`
    margin-left: 0rem;
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    font-size: 0.8rem;
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
    margin-top: 0.5rem;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
`

const ButtonText = styled.p`
    margin-left: 0.7vw;
`

const BetaTab = styled.div`
    padding: 0.2rem 0.75rem 0.2rem 0.75rem;
    color: black;
    background-color: black;
    margin-left: 0.7rem;
    font-size: 0.7rem;
    border-radius: 7px;
    background-color: #D3DCF5;
`