import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import ModalBackground from "@/components/Modals/common/ModalBackground";
import TextArea from "@/components/forms/TextArea";
import api from "@/pages/api";
import { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import Label from "@/components/Common/Label";
import { CampaignDropdown } from "@/components/Camapigns/Modal/CampaignDropdwon";
import Input from "@/components/forms/Input";
import Image from "next/image";
import { IoRefreshOutline } from "react-icons/io5";

interface TemplateProps {
    _id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    likes: any[];
    icon: string;
    query: string;
  }

  
const ToneModal = (props: {onClose: any}) => {

    const [toneDescription, setToneDescription] = useState("");
    const [exampleText, setExampleText] = useState("");
    const [abortController, setAbortController] = useState(new AbortController());
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [templates, setTemplates] = useState<TemplateProps[]>([]);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [openedCategory, setOpenedCategory] = useState("");
    const [templateCategories, setTemplateCategories] = useState([]);
    const [step, setStep] = useState(1);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textAreaRef) {
            if(textAreaRef.current){
                textAreaRef.current.style.height = "0px";
                const scrollHeight = textAreaRef.current.scrollHeight;
                textAreaRef.current.style.height = scrollHeight + "px";
            }
        }
    }, [toneDescription, descriptionLoading]);

    useEffect(() => {
        const fetchTemplates = async () => {
          const { data } = await api.get("/templates");
          if (data) {
            setTemplates(data);
          } else {
            console.log("wrong fetch");
          }
        };
        fetchTemplates();
      }, []);

      const filterDropdownValues = (category: string) => {
        const templatesInCategory = templates.filter(
          (template) => template.category === category
        );
        const dropdownValues = templatesInCategory.map((template) => ({
          name: template.title,
          icon: template.icon,
        }));
    
        return dropdownValues;
      };

    const stopReplying = () => {
        abortController.abort();
    }
    
    const analyzeTone = async (title: string) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        if (descriptionLoading) {
          stopReplying();
          return;
        }
        setDescriptionLoading(true);
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
        let model = "gpt-4";
        let systemPrompt = `You are professionally analysing tone of voice of the given text by completing last sentence imperatively in second-person narrative. You are very specific in expressing what the tone of voice used in text is and you carefully analyze it. You NEVER describe what the text is about, its content or anything else about its content. You recognise ONLY the tone, style and target audience.`;
        let prompt = `Text to analyze and deduct the style and tone of voice: "${exampleText}". 
        The tone of voice used in this text is 
        `

        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `Tone of voice analysis`, model, systemPrompt, temperature: 0.4}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if (response.body){
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setDescriptionLoading(false);
                setToneDescription(reply)
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    setToneDescription(reply);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
    
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setDescriptionLoading(false);
          } else {
            console.log(e);
            setDescriptionLoading(false);
          }
        } finally {
          abortController.abort();
        }
      }

    return (
        <ModalBackground onClose={props.onClose} closeable={true}>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            {step === 0 &&
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <ModalTitle>
                    Teach AI your tone of voice
                </ModalTitle>
                <div className="px-4">
                <TextArea 
                    placeholder="Paste text you want AI to extract the tone from..."
                    padding="1rem"
                    height="30rem"
                    value={exampleText}
                    onChange={(e: any) => setExampleText(e.target.value)}
                />
                </div>
                <ButtonContainer>
                <ContinueBtn>
                    <p>+ Add Assistant</p>
                </ContinueBtn>  
                </ButtonContainer>
            </Container>
            }
            {step === 1 &&
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <ModalTitle>
                    Teach AI your tone of voice
                </ModalTitle>
                <div className="px-4">
                <div className="flex items-center justify-between w-full mt-0"><Label>AI tone of voice description</Label></div>
                    {descriptionLoading ?
                    <p>{toneDescription}</p>
                    :
                    <TextArea ref={textAreaRef} placeholder="AI description of your tone of voice" value={toneDescription} height="auto" padding="0.75rem" onChange={(e) => setToneDescription(e.target.value)}/>
                    }
                                  <div className="flex flex-col gap-[0.8vw]">
                <h4
                  className="w-full border-b border-slate-200 pb-2"
                  style={{ fontWeight: 600 }}
                >
                  Example output
                </h4>
                <div className={`flex  justify-between items-center `}>
                  <div className="flex flex-col gap-2 w-full max-w-[15rem]">
                    <span style={{ fontWeight: 500 }}>Placement</span>
                    <CampaignDropdown
                    category={openedCategory}
                    values={templates}
                    openedCategory={openedCategory}
                    setOpenedCategory={setOpenedCategory}
                    setAllChosenCategories={setSelectedTemplates}
                  />
                  </div>
                  <div className="flex flex-col gap-2 w-[18vw]">
                    <Input type="text" className="w-full" height="2.7rem" padding="0.5rem" />
                    <div className="pl-2">
                        <Input type="text" className="w-full" height="2rem" padding="0.5rem" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex items-center justify-center">
                <div className="flex gap-4 h-56 flex-col p-6 shadow-2xl mt-[2vw] rounded-2xl border-2  border-[#ECEEF2]">
                  <div
                    className={`flex items-center w-full`}
                  >
                    <div className="flex gap-4  items-center w-full">
                      <div className="relative w-8 h-8 rounded-xl overflow-hidden">
                        <Image
                          src={selectedTemplates[0].icon}
                          fill
                          alt="social media icon"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <GeneratedTextTitle>
                          {socialMediaArray[0].name}
                        </GeneratedTextTitle>
                        <GeneratedTextDate>07.07.2023</GeneratedTextDate>
                      </div>
                    </div>
                    <button className="flex px-[1.5vw] gap-4 items-center  py-1 bg-slate-200 rounded-2xl">
                      <IoRefreshOutline className="w-4 h-4" />
                      <Text style={{ fontWeight: 500 }}>Rewrite</Text>
                    </button>
                  </div>
                  <GeneratedTextContainer>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eum sequi animi ex exercitationem est deleniti quasi nemo
                      accusantium natus doloremque consectetur, omnis excepturi
                      harum nesciunt iusto laboriosam rerum esse nobis sint ea
                      provident? Rem nobis ullam officia neque eius! Officia?
                    </p>
                  </GeneratedTextContainer>
                </div>
              </div>
                </div>
            </Container>
            }
        </ModalBackground>
    )
}

export default ToneModal;

const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 0rem 0rem;
    background: white;
    position: relative;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
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

const ModalTitle = styled.h1`
    margin-bottom: 2rem;
    font-size: 1.2rem;
    width: 100%;
    margin-left: 0rem;
    padding-left: 1.5rem;
    border-bottom: 1px solid #E5E8F0;
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

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        width: 100%;
        height: 3rem;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        background-size: 110%;
        background-position-x: -1rem;
        transition: all 0.4s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 7rem 2rem 7rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`