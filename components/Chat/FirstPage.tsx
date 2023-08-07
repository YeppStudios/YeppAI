import styled from "styled-components"
import { useEffect, useState } from "react";
import { BsChatTextFill, BsFillArchiveFill, BsFillInfoCircleFill, BsFillPencilFill, BsPencil, BsPencilFill, BsPersonFillAdd, BsPlusCircleDotted } from "react-icons/bs";
import { useRouter } from "next/router";
import api from "@/pages/api";
import { BlueLoader } from "../Common/Loaders";
import SlideBottom from "../Animated/SlideBottom";
import Centered from "../Centered";
import { FaPlus } from "react-icons/fa";
import { setSelectedAssistant, defaultAssistantState } from "@/store/assistantSlice";
import { selectedPlanState } from "@/store/planSlice";
import { useDispatch, useSelector } from "react-redux";
import AboutAssistant from "../Modals/InformationalModals/AboutAssistant";
import AddAssistantModal from "../Modals/AddingModals/AddAssistantModal";
import AssistantsLimit from "../Modals/LimitModals/AssistantsLimit";
import DeleteAssistantModal from "../Modals/DeletingModals/DeleteAssistantModal";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";

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

const FirstPage = (props: {nextPage: any}) => {

    const [assistants, setAssistants] = useState<Array<Assistant>>([]);
    const [loading, setLoading] = useState(false);
    const plan = useSelector(selectedPlanState);
    const [openAddAssistant, setOpenAddAssistant] = useState(false);
    const [assistantToDelete, setAssistantToDelete] = useState<Assistant>();
    const [assistantToEdit, setAssistantToEdit] = useState<Assistant>();
    const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
    const [openAboutAssistant, setOpenAboutAssistant] = useState(false);
    const [assistantsLimit, setAssistantsLimit] = useState(false);
    const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const defaultAssistant = useSelector(defaultAssistantState);

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
    
        const fetchAssistants = async () => {
        const workspace = localStorage.getItem("workspace");
        let assistantsResponse;
        setLoading(true);
        try {
            if (workspace === "undefined" || !workspace || workspace === "null") {
                assistantsResponse = await api.get(`/getUserAssistants/${userId}`, {
                    headers: {
                      authorization: token
                    }
                })
            } else if (workspaceCompany._id) {
                const {data} = await api.get(`/workspace-company/${workspace}`, {
                    headers: {
                      authorization: token
                    }
                  });
                assistantsResponse = await api.get(`/getUserAssistants/${data.company._id}`, {
                    headers: {
                      authorization: token
                    }
                })
            }
            setLoading(false);
            
            // Filter the assistants before setting state.
            const chatAssistants = assistantsResponse?.data.assistants.filter((assistant: { category: string; }) => assistant.category === "chat");
            chatAssistants.unshift(defaultAssistant);
            setAssistants(chatAssistants);
            
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }
        fetchAssistants();
    }, [defaultAssistant, workspaceCompany])
    

    const handleOpenAssistant = (assistant: Assistant) => {
        props.nextPage();
        dispatch(setSelectedAssistant(assistant));
    }

    const handleOpenAboutAssistant = (assistant: Assistant) => {
        setAssistantToEdit(assistant);
        setAssistantToDelete(assistant);
        setOpenAboutAssistant(true);
    }

    const handleDeleteAssistant = () => {
        if (assistantToDelete) {
          setAssistants((prevAssistants: any[]) =>
            prevAssistants.filter((assistant: { _id: string; }) => assistant._id !== assistantToDelete._id)
          );
        }
    };


    const handleOpenAddAssistant = () => {
        if (assistants.length >= plan.maxAssistants) {
            setAssistantsLimit(true);
        } else {
            setOpenAddAssistant(true);
        }
    }

    return (
        <PageContainer>
            {openAddAssistant && <AddAssistantModal onClose={() => setOpenAddAssistant(false)} setAssistants={setAssistants} assistantToEdit={undefined} openNewFolder={() => router.push("/assets")} category="chat"/>}
            {openDeleteAssistant && <DeleteAssistantModal onClose={() => setOpenDeleteAssistant(false)} assistant={assistantToDelete} deleteAssistantState={handleDeleteAssistant}/>}
            {openAboutAssistant && <AboutAssistant onClose={() => setOpenAboutAssistant(false)} assistant={assistantToEdit} deleteAssistant={() => setOpenDeleteAssistant(true)}/>}
            {assistantsLimit && <AssistantsLimit onClose={() => setAssistantsLimit(false)} />} 
            <Header>
            <div>
                <PageTitle>Chat AI</PageTitle>
                <PageDescription>Unleash the full potential of AI by creating your own AI assistants.</PageDescription>
            </div>
            <ActionContaienr>
                <ActionBtn onClick={() => router.push("/assets")}>
                <BsFillArchiveFill style={{width: "auto", height: "35%"}}/>
                </ActionBtn>
                <BlueBtn onClick={handleOpenAddAssistant}>
                    <FaPlus style={{width: "auto", height: "35%"}}/>
                    <BtnText>New Chat</BtnText>
                </BlueBtn>
            </ActionContaienr>
            </Header>
            <Assistants>
                {!loading ?
                    assistants?.map((assistant, index) => (
                    <SlideBottom key={assistant._id}>
                        <Assistant onClick={() => handleOpenAssistant(assistant)}>
                            <InfoIconContainer onClick={(e) => e.stopPropagation()}>
                            <InfoIcon onClick={() => handleOpenAboutAssistant(assistant)}>
                                <BsFillInfoCircleFill style={{ width: "95%", height: "auto" }} /> 
                            </InfoIcon>
                            </InfoIconContainer>
                            <Centered>
                                <AssistantIcon background={assistant.image}></AssistantIcon>
                            </Centered>
                            <Centered>
                                <AssistantTitle>{assistant.name}</AssistantTitle>
                            </Centered>
                            <Centered>
                                <AssistantRole>{assistant.category}</AssistantRole>
                            </Centered>
                            <Centered>
                            </Centered>
                            <Centered>
                                <AssistantDescription>{assistant.description}</AssistantDescription>
                            </Centered>
                        </Assistant>
                    </SlideBottom>
                    ))
                :
                    <LoaderContainer><BlueLoader /></LoaderContainer>
                }
                <SlideBottom>
                    <AddAssistant  onClick={handleOpenAddAssistant}>
                        <div style={{width: "100%"}}>
                        <Centered>
                            <AddAssistantIcon>
                                <BsPlusCircleDotted style={{ width: "95%", height: "auto" }} /> 
                            </AddAssistantIcon>
                        </Centered>
                        <Centered>
                            <AddAssistantTitle>New Chat</AddAssistantTitle>
                        </Centered>
                        </div>
                    </AddAssistant>
                </SlideBottom>
            </Assistants>           
        </PageContainer>
    )
}

export default FirstPage;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  border: 2px solid #EAEDF5;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
  width: 100%;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    position: relative;
    overflow-x: hidden;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
`

const PageTitle = styled.h1`
  color: black;
  font-size: 2.4rem;
  font-weight: 700;
  width: 100%;
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`
const PageDescription = styled.p`
  color: black;
  font-size: 1.2rem;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  background-color: white;
  border-bottom: 2px solid #EAEDF5;
  @media (max-width: 1023px) {
    display: flex;
    padding-left: 1.5rem;
    padding: 1rem 1rem 2rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    margin-top: 1rem;
    flex-wrap: wrap;
  }
`



const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
  }
`


const ActionBtn = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    margin-left: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border: 2px solid #EAEDF5;
    border-radius: 15px;
    box-shadow: 0px 2px 5px rgba(15, 27, 40, 0.1);
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0.75rem;
      margin-top: 1rem;
    }
`

const BlueBtn = styled.div`
    width: 14rem;
    height: 3.5rem;
    margin-left: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      margin-top: 1rem;
    }
`

const BtnText = styled.p`
    margin-left: 1rem;
    font-size: 1rem;
    font-weight: 600;
`

const Assistants = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        justify-content: center;
    }
`

const Assistant = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 17rem;
    height: 17rem;
    position: relative;
    color: black;
    overflow: hidden;
    background-color: white;
    border: 2px solid #EAEDF5;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    text-align: center;
    margin: 0.75rem 0.6rem 0.75rem 0.6rem;
    padding: 2rem 1rem 3rem 1rem;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        box-shadow: 1px 1px 5px rgba(15, 27, 40, 0.05);
    }
    @media(max-width: 1023px) {
        width: 95vw;
        margin: 0;
        margin-top: 1rem;
    }
`

const AddAssistantTitle = styled.p`
    font-weight: 500;
    font-size: 1.5rem;
    color: #CFD5E8;
    margin-top: 1rem;
`

const AddAssistantIcon = styled.div`
    width: 4rem;
    margin: 0rem 1.2rem 0rem 1.2rem;
    color: #CFD5E8;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        color: black;
    }
`

const AddAssistant = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 17rem;
    height: 17rem;
    color: black;
    border: dashed 3px #CFD5E8;
    text-align: center;
    margin: 0.75rem 0.6rem 0.75rem 0.6rem;
    border-radius: 20px;
    padding: 2rem 1rem 2rem 1rem;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px black;
        transform: scale(0.95);
    }
    &:hover ${AddAssistantIcon} {
        color: black;
    }
    &:hover ${AddAssistantTitle} {
        color: transparent;
        background-image: linear-gradient(-70deg, #6578F8, #64B5FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    @media(max-width: 1023px) {
        width: 95vw;
        margin: 0;
        margin-top: 1rem;
    }
`


const AssistantIcon = styled.div<{background: any}>`
    height: 3.5rem;
    width: 3.5rem;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const AssistantTitle = styled.p`
    font-weight: 700;
    font-size: 1.5rem;
    white-space: nowrap;
`

const InfoIconContainer = styled.div`
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
`

const InfoIcon = styled.div`
    width: 1.4rem;
    position: absolute;
    top: 1rem;
    right: 0rem;
    margin: 0rem 1.2rem 0rem 1.2rem;
    color: #CFD5E8;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        color: black;
        transform: scale(1.1);
    }
`


const AssistantDescription = styled.p`
    font-weight: 500;
    width: 90%;
    margin-top: 0.5rem;
    font-size: 0.9rem;
`
const AssistantRole = styled.p`
    font-weight: 500;
    width: 90%;
    color: black;
    font-size: 1rem;
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
`

const LoaderContainer = styled.div`
    width: 18rem; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    @media(max-width: 1023px) {
        width: 100%;
        padding: 1rem 0rem 1rem 0rem;
    }
`