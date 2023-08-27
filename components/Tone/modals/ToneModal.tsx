import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import TextArea from "@/components/forms/TextArea";
import api from "@/pages/api";
import { useEffect, useRef, useState } from "react";
import { BsBack, BsImage, BsSearch, BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import Label from "@/components/Common/Label";
import { defaultMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { useSelector } from "react-redux";
import Input from "@/components/forms/Input";
import Image from "next/image";
import { IoChevronBack, IoRefreshOutline } from "react-icons/io5";
import ToneDropdown from "@/components/Tone/modals/ToneDropdown";
import { BlueLoader, Loader } from "@/components/Common/Loaders";
import Centered from "@/components/Centered";
import moment from 'moment';
import { FileUploader } from 'react-drag-drop-files';
import SlideBottom from "@/components/Animated/SlideBottom";
import { create } from "ipfs-http-client";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import Space from "@/components/Docs/common/Space";
import {useRouter} from "next/router";

interface TemplateProps {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: any[];
  icon: string;
  query: string;
  prompt: string;
}

interface Background {
  image: any
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
const fileTypes = ["JPG", "PNG", "JPEG"];

  
const ToneModal = (props: {onClose: any}) => {


    const [exampleText, setExampleText] = useState("");
    const [abortController, setAbortController] = useState(new AbortController());
    const [testTextLoading, setTestTextLoading] = useState(false);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [templates, setTemplates] = useState<TemplateProps[]>([]);
    const [about, setAbout] = useState("");
    const [length, setLength] = useState<any>(250);
    const [language, setLanguage] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateProps>();
    const [step, setStep] = useState(0);
    const [image, setImage] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState<any>();
    const [testText, setTestText] = useState("");
    const [title, setTitle] = useState("");
    const [saving, setSaving] = useState(false);
    const [exampleOutputJSON, setExampleOutputJSON] = useState<any>();
    const selectedMarketingAssistant = useSelector(defaultMarketingAssistantState);

    const router = useRouter();

    useEffect(() => {
        const fetchTemplates = async () => {
          const { data } = await api.get("/templates");
          if (data) {
            setTemplates(data);
            setSelectedTemplate(data[0])
          } else {
            console.log("wrong fetch");
          }
        };
        fetchTemplates();
      }, []);

    const stopReplying = () => {
        abortController.abort();
    }

    const handleFile = (image: File) => {
      setImage(image);
      setPreviewUrl(URL.createObjectURL(image));
    };
    
    const analyzeTone = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      const workspace = localStorage.getItem("workspace");
      if (exampleText.length > 1000) {
        return;
      }
      setTestTextLoading(true);
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
      if (fetchedUser.tokenBalance <= 0) {
        setOpenNoElixirModal(true);
        return;
      }

      const exampleResponse = await api.post("/completion", {
        prompt: `Please analyze this text to figure out its main objective, target audience, tone of voice, content type and the use of emojis and punctuation: "${exampleText}". Also extract specifically what is it about: some product, event or just a trip? Name it in "about" field. Now, return a valid JSON object in the given JSON format:
        {
          "about": "new iPhone 15",
          "language": "English",
          "mainObjective": "make old iPhone users buy new one",
          "targetAudience": "old iPhone users",
          "useEmojis": "yes"
        }
        Return JSON object with observations from the analyzed text:
        `,
        systemPrompt: `Act as a JSON converter. After analyzing the text user quotes you return a formatted JSON output that describes it in the given JSON object: 
        {
          "about": "new iPhone",
          "language": "Polish",
          "mainObjective": "make old iPhone users buy new one",
          "targetAudience": "old iPhone users",
          "useEmojis": "yes"
        }
          `,
        model: "gpt-3.5-turbo",
        temperature: 0
    },
    {
        headers: {
            Authorization: `${token}`,
        },
    });

    const exampleJSON = JSON.parse(exampleResponse.data.completion);
    setExampleOutputJSON(exampleJSON);
    setLanguage(exampleJSON.language);
    setAbout(exampleJSON.about);
    generateExampleOutput(exampleJSON)
    }


    const generateExampleOutput = async (exampleJSON: any) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        if (testTextLoading) {
          stopReplying();
          return;
        }
        setTestText("");
        setTestTextLoading(true);
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

        let exampleOutputOutlines = exampleJSON;
        let exampleLanguage = exampleOutputOutlines.language;
        let exampleAbout = exampleOutputOutlines.about;

        if (exampleOutputJSON) {
          exampleOutputOutlines = exampleOutputJSON;
        }
        if (language != exampleLanguage) {
          exampleLanguage = language;
        }
        if (about != exampleAbout) {
          exampleAbout = about;
        }

        let reply = "";
        let model = "gpt-4";
        let prompt = `Analyze this example text to understand and remember the tone of voice, use of emojis, punctuation and how the text addresses the target audience:
        "${exampleText}"
        The content of quoted text doesn't matter, your only job is to remember the writing style of the author to use it for writing ${selectedTemplate?.title}.
        Now that you are inspired by the tone of voice please write ${selectedTemplate?.title} about ${exampleAbout} in ${exampleLanguage} language. Don't try to exactly copy the structure, but just mimic the tone. Follow the extracted tone of voice and style of an example text. Return the ${selectedTemplate?.title} content in ${exampleLanguage} that is no longer than ${length} characters:`;
        let systemPrompt = `You are a ${exampleLanguage} native marketer. ${selectedMarketingAssistant.noEmbedPrompt}`;
        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `Lab ${selectedTemplate} example`, model, systemPrompt, temperature: 0.95}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if (response.body){
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setTestText(reply)
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setTestTextLoading(false);
              setStep(1);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    const contentWithoutQuotes = data.content.replace(/"/g, '');
                    reply += contentWithoutQuotes;
                    setTestText(reply);
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
    
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setTestTextLoading(false);
          } else {
            console.log(e);
            setTestTextLoading(false);
          }
        } finally {
          abortController.abort();
        }
      }

      const saveTone = async () => {
        if (!exampleText) {
          return
        }
        setSaving(true);
        try {
          await api.post("/save-tone", {
            title,
            icon: previewUrl,
            prompt: `Analyze this example text to understand and remember the tone of voice, use of emojis, punctuation and how the text addresses the target audience:
            "${exampleText}"
            The content of quoted text doesn't matter, your only job is to remember the writing style of the author to use it for writing it.
            Now that you are inspired by the tone of voice`,
            workspace: localStorage.getItem("workspace"),
          }, 
          {
            headers: {
              authorization: localStorage.getItem("token")
            }
          }
          )
          setSaving(false);
          router.reload();
        } catch (e) {
          console.log(e);
          setSaving(false);
        }
      }

    return (
        <ModalBackground>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            <SlideBottom>
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
                 <div className={classNames(exampleText.length > 1000 ? 'text-[#FF6459]' : 'text-[#A0AEC0]', 'flex items-center justify-end w-full')}><WordCounter>{exampleText.length} / 1000</WordCounter></div>
                </div>
                <ButtonContainer>
                <ContinueBtn onClick={() => analyzeTone()}>
                  {testTextLoading ?
                    <Loader color="white" />
                    :
                    <div className="w-full flex justify-center items-center">
                      <BsSearch className="mr-4"/>
                      <p>Analyze text</p>
                    </div>
                  }
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
                  <div className="flex items-center">
                  <IoChevronBack className="mr-4" onClick={() =>  setStep(0)}/>
                    Test your AI tone
                  </div>
                </ModalTitle>
                <div className="px-4">

                <div className="flex flex-col gap-[0.8vw]">
                <div className={`flex  justify-between items-center`}>
                  <div className="flex flex-col gap-2 w-full w-[48%]">
                    <Label>Language</Label>
                    <Input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full" height="2.7rem" padding="0.5rem" placeholder="English" />
                  </div>
                  <div className="flex flex-col gap-2 w-full w-[48%]">
                    <Label>Placement</Label>
                    <ToneDropdown
                    value={selectedTemplate}
                    values={templates}
                    onChange={setSelectedTemplate}
                    placeholder="Select placement"
                  />
                  </div>
                </div>
                <div className={`flex  justify-between items-center mt-2`}>
                  <div className="flex flex-col gap-2 w-[48%]">
                  <Label>About</Label>
                    <Input type="text" value={about} onChange={(e) => setAbout(e.target.value)} className="w-full" height="2.7rem" padding="0.5rem" placeholder="About..." />
                  </div>
                  <div className="flex flex-col gap-2 w-full w-[48%]">
                    <Label>Length (chars)</Label>
                    <Input type="text" value={length} onChange={(e) => setLength(e.target.value)} className="w-full" height="2.7rem" padding="0.5rem" placeholder="100" />
                  </div>
                </div>
              </div>
              {selectedTemplate ?
              <div className="h-full flex items-center justify-center mb-8 w-full">
                <div className="flex gap-4 w-full flex-col p-6 shadow-md mt-[2vw] rounded-2xl border-2  border-[#ECEEF2]">
                  <div
                    className={`flex w-full`}
                  >
                    <div className="flex gap-4 items-center w-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={selectedTemplate.icon}
                          height={40} width={40}
                          alt="social media icon"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col">
                        <GeneratedTextTitle>
                          {selectedTemplate.title}
                        </GeneratedTextTitle>
                        <GeneratedTextDate>{moment().format('DD MMMM YYYY')}</GeneratedTextDate>
                      </div>
                    </div>
                    <button onClick={() => generateExampleOutput(exampleOutputJSON)} className="flex px-[2vw] gap-4 items-center h-10 bg-[#EFF1F5] rounded-2xl hover:scale-95">
                      <IoRefreshOutline className="w-4 h-4" />
                      <Text style={{ fontWeight: 500 }}>Rewrite</Text>
                    </button>
                  </div>
                  {!testTextLoading ?
                    <p className="font-medium">
                    <GeneratedExample>{testText}</GeneratedExample>
                    </p>
                    :
                    <MultiLineSkeletonLoader lines={3} justifyContent="left" />
                  }
                </div>
              </div>
              :
              <div className="pt-8 pb-6">
                <Centered><BlueLoader /></Centered>
              </div>
              }
              <ButtonContainer>
                <ContinueBtn onClick={() => setStep(2)}>
                    <p>Continue</p>
                </ContinueBtn>  
              </ButtonContainer>
              </div>
            </Container>
            }
            {step === 2  &&
              <Container>
                    <ModalTitle>
                        Save your persona
                    </ModalTitle>
                    <Centered>
                    <div className="flex flex-wrap justify-center w-8/12">
                    <FileUploader hoverTitle="Drop here" handleChange={handleFile} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                            {previewUrl || image ?
                                <SelectedAddPfp image={previewUrl}></SelectedAddPfp>  
                                :
                                <AddPfp image={previewUrl}>
                                    <div>
                                    <Centered><BsImage style={{width: "2rem", height: "2rem"}}/></Centered>
                                    <p className="w-full text-center mt-2">optional</p>
                                    </div>
                                </AddPfp>      
                            }
                    </FileUploader>
                    <Input type="text" className="w-full" height="2.7rem" padding="0.5rem" placeholder="Title your tone" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => saveTone()}>
                        {saving ?
                        <Loader color="white" />
                        :
                        <p>Save</p>
                        }
                    </ContinueBtn>  
                    </ButtonContainer>
              </Container>
            } 
            </SlideBottom>
        </ModalBackground>
    )
}

export default ToneModal;


const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    padding-top: 3rem;
    padding-bottom: 5rem;
    left: 0;
    top: 0;
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
    @media (max-width: 1023px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100vw;
        overflow-x: hidden;
    }
`
const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 2.5rem 0rem;
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
    padding: 0 7rem 0rem 7rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`

const Text = styled.p`
  font-size: 0.9rem;
`;


const GeneratedTextTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const GeneratedTextDate = styled.span`
  font-size: 0.8rem;
  color: rgb(148 163 184);
`;

const GeneratedExample = styled.p`
  margin-top: 0.5rem;
  width: 100%;
  font-size: 1rem;
  border-radius: 10px;
  background-color: transparent;
  color: black;
  border: none;
  outline: none;
  resize: none;
  font-weight: 500;
  z-index: 1;
  @media (max-width: 1023px) {
      margin-top: 4vh;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  color: #6F7890;
  }
  :-ms-input-placeholder {
  color: #6F7890;
  }
  &::-webkit-scrollbar {
      display: none;
  }
  white-space: pre-wrap;
  will-change: transform;
`

const WordCounter = styled.p`
    text-align: right;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
`

const SelectedAddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 7rem;
    height: 7rem;
    margin-bottom: 1.5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: -4px 4px 0px rgba(101, 120, 248, 1), 4px -4px 0px rgba(100, 181, 255, 1);
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        color: black;
    }
`
const AddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 7rem;
    height: 7rem;
    margin-bottom: 1.5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: dashed 3px #CFD5E8;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px black;
        transform: scale(0.95);
        color: black;
    }
`