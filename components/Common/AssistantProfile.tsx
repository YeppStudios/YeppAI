import { BsChevronExpand, BsPersonFillAdd, BsInfoCircleFill, BsChevronRight } from "react-icons/bs";
import styled from "styled-components";
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Centered from "../Centered";
import api from "@/pages/api";
import AddAssistantModal from "../Modals/AddingModals/AddAssistantModal";
import DeleteAssistantModal from "../Modals/DeletingModals/DeleteAssistantModal";
import AboutAssistant from "../Modals/InformationalModals/AboutAssistant";
import { selectedMarketingAssistantState, setSelectedMarketingAssistant, defaultMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AssistantsLimit from "../Modals/LimitModals/AssistantsLimit";
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
  
const AssistantProfile = (props: {category: string}) => {

    const [openAddAssistant, setOpenAddAssistant] = useState(false);
    const [openDeleteAssistant, setOpenDeleteAssistant] = useState(false);
    const [openAboutAssistant, setOpenAboutAssistant] = useState(false);
    const [assistantToDelete, setAssistantToDelete] = useState<Assistant>();
    const selectedMarketingAssistant = useSelector(selectedMarketingAssistantState);
    const defaultAssistant = useSelector(defaultMarketingAssistantState);
    const [assistantsLimit, setAssistantsLimit] = useState(false);
    const [assistants, setAssistants] = useState<any>([]);
    const plan = useSelector(selectedPlanState);
    const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const [key, setKey] = useState(Math.random())

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAssistants = async () => {
        const token = localStorage.getItem("token");
        const workspace = localStorage.getItem("workspace");
        const userId = localStorage.getItem("user_id");
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

            const marketingAssistants = assistantsResponse?.data.assistants.filter(
              (assistant: { category: string; }) => assistant.category === props.category
            );

            marketingAssistants.unshift(defaultAssistant);
  
            setAssistants(marketingAssistants);
          
        } catch (e) {
            console.log(e);
        }
      }
        fetchAssistants();
    }, [defaultAssistant, props.category, workspaceCompany._id, selectedMarketingAssistant])

    useEffect(() => {
        setKey(Math.random());
    }, [selectedMarketingAssistant])

    const handleDeleteAssistant = () => {
        if (assistantToDelete) {
          setAssistants((prevAssistants: any[]) =>
            prevAssistants.filter((assistant: { _id: string; }) => assistant._id !== assistantToDelete._id)
          );
        }
        dispatch(setSelectedMarketingAssistant(defaultAssistant));
    };

    const handleOpenAboutAssistant = (assistant: Assistant) => {
        setAssistantToDelete(assistant);
        setOpenAboutAssistant(true);
    }

    const handleOpenAddAssistant = () => {
      if (assistants.length >= plan.maxAssistants + 1) {
        setAssistantsLimit(true);
      } else {
        setOpenAddAssistant(true);
      }
    }
    

    return (
        <div>
        {openAddAssistant && <AddAssistantModal onClose={() => setOpenAddAssistant(false)} setAssistants={setAssistants} assistantToEdit={undefined} openNewFolder={() => router.push("/assets")} category="marketing"/>}
        {openDeleteAssistant && <DeleteAssistantModal onClose={() => setOpenDeleteAssistant(false)} assistant={assistantToDelete} deleteAssistantState={handleDeleteAssistant}/>}
        {openAboutAssistant && <AboutAssistant onClose={() => setOpenAboutAssistant(false)} assistant={selectedMarketingAssistant} deleteAssistant={() => setOpenDeleteAssistant(true)}/>}
        {assistantsLimit && <AssistantsLimit onClose={() => setAssistantsLimit(false)} />} 
        <AssistantContainer>
            <Popover className="relative w-full" key={key}>
            <Popover.Button className="outline-none w-full">
            <Container>
                <div style={{height: "100%", display: "flex"}}>
                <AssistantIcon background={selectedMarketingAssistant.image}></AssistantIcon>
                <NameAndRole>
                    <AssistantName>{selectedMarketingAssistant.name}</AssistantName>
                    <AssistantRole>{selectedMarketingAssistant.category}</AssistantRole>
                </NameAndRole>
                </div>
                <ChangeIcon>
                    <BsChevronExpand style={{width: "100%", height: "auto"}} />
                </ChangeIcon>
            </Container>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 mt-2 lg:mt-5 flex w-full lg:w-screen max-w-max -translate-x-1/2 z-10 lg:px-4">
                <div className="w-screen max-w-md flex-auto max-h-64 lg:max-h-96 overflow-y-scroll no-scrollbar rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-slate-900/5">
                  <div className="p-4 pb-16">
                    {assistants.length > 0 ?
                    assistants.map((assistant: any) => (
                      <div onClick={() => dispatch(setSelectedMarketingAssistant(assistant))} key={assistant.name} className="group cursor-pointer relative flex gap-x-6 rounded-lg pt-4 pb-4 lg:p-4 hover:bg-slate-50 items-center justify-between">
                        <div className="flex gap-x-6 group relative">
                        <div className="mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white">
                            <AssistantIcon background={assistant.image}></AssistantIcon>
                        </div>
                        <div className="">
                          <p className="font-semibold text-lg text-slate-900">
                            {assistant.name}
                          </p>
                          <p className="lg:text-sm text-xs text-slate-700">
                            {assistant.description}
                          </p>
                        </div>
                        </div>
                        <div style={{height: "100%", display: "flex", alignItems: "center"}}>
                        <BsChevronRight style={{width: "1rem", height: "1rem", color: "black"}}/>
                        </div>
                      </div>
                    ))
                    :
                    <Centered>
                        {props.category === "marketing" &&
                        <NoAssistantsInfo>Nie masz więcej marketerów. Dodaj nowych, a pojawią tutaj.</NoAssistantsInfo>
                        }
                        {props.category === "capywriting" &&
                        <NoAssistantsInfo>Nie masz więcej copywriterów. Dodaj nowych, a pojawią tutaj.</NoAssistantsInfo>
                        }
                    </Centered>
                    }
                  </div>
                  <div className="absolute bottom-0 w-full lg:w-screen max-w-md rounded-b-3xl grid grid-cols-2 divide-x divide-slate-900/5 bg-slate-50">
                    <button
                        onClick={() => handleOpenAboutAssistant(selectedMarketingAssistant)}
                        className="flex items-center text-xs lg:text-base justify-center rounded-b-3xl gap-x-2.5 p-3 font-semibold text-slate-900 hover:bg-slate-100"
                      >
                        <BsInfoCircleFill className="h-4 w-4 mr-2 flex-none text-slate-400" aria-hidden="true" />
                        O Asystencie 
                      </button>
                      <button
                        onClick={handleOpenAddAssistant}
                        className="flex items-center justify-center text-xs lg:text-base rounded-b-3xl gap-x-2.5 p-3 font-semibold text-slate-900 hover:bg-slate-100"
                      >
                        <BsPersonFillAdd className="h-4 w-4 mr-2 flex-none text-slate-400" aria-hidden="true" />
                        Dodaj
                      </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          </AssistantContainer>
          </div>
    )
}

export default AssistantProfile;


const Container = styled.div`
    width: 100%;
    height: 5.5rem;
    padding: 0.8rem 1.25rem 0.8rem 1.25rem;
    color: black;
    border: 2px solid #EAEDF5;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    justify-content: space-between;
    background-color: white;
    display: flex; 
    text-align: left;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    @media (max-width: 1023px) {
      height: auto;
      margin-top: 1rem;
      width: 82vw;
      height: 4.5rem;
      padding: 0.6rem 0.9rem 0.6rem 0.9rem;
    }
`

const AssistantIcon = styled.div<{background: any}>`
    height: 100%;
    width: 3.5rem;
    border-radius: 12px;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 1023px) {
      height: 3rem;
      width: 3rem;
    }
`

const AssistantName = styled.h2`
    font-size: 1.5rem;
    white-space: nowrap;
    font-weight: 700;
    @media (max-width: 1023px) {
      font-size: 1rem;
    }
`

const AssistantRole = styled.h3`
    margin-top: -0.25rem;
    @media (max-width: 1023px) {
      font-size: 0.75rem;
    }
`

const NameAndRole = styled.div`
    margin-left: 2rem;
    @media (max-width: 1023px) {
      margin-left: 1rem;
    }
`

const ChangeIcon = styled.div`
    width: 1.75rem;
    margin-left: 4rem;
    display: flex;
    justify-content: center;    
    align-items: center;
`

const AssistantContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const NoAssistantsInfo = styled.h2`
    font-size: 1rem;
    font-weight: 500;
    color: #A0AEC0;
    text-align: center;
    width: 70%;
    padding: 1rem;
`