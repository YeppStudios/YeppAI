import SlideBottom from "@/components/Animated/SlideBottom";
import { IoChevronBackSharp } from "react-icons/io5";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Centered from "@/components/Centered";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import CircleSkeletonLoader from "@/components/Common/CircleSkeletonLoader";
import { create } from "ipfs-http-client";
import { BsArrowRepeat, BsCash, BsGenderAmbiguous, BsGeo, BsHeart, BsHourglass, BsImage, BsPause, BsTextParagraph } from "react-icons/bs";
import api from "./api";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { useRouter } from "next/router";
import axios from "axios";
import InvisibleInput from "@/components/forms/InvisibleInput";
import ReactMarkdown from "react-markdown";
import TextArea from "@/components/forms/TextArea";
import { FileUploader } from "react-drag-drop-files";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import { Loader } from "@mantine/core";
import Space from "@/components/Docs/common/Space";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";
import UpgradeSubscription from "@/components/Modals/InformationalModals/UpgradeSubscription";

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
const fileTypes = ["JPG", "PNG", "HEIC", "JPEG"];
const traits = [
  {title: "age", icon: BsHourglass, value: "50"},
  {title: "status", icon: BsHeart, value: ""},
  {title: "income", icon: BsCash, value: ""},
  {title: "location", icon: BsGeo, value: ""},
  {title: "gender", icon: BsGenderAmbiguous, value: ""},
  {title: "description", icon: BsTextParagraph, value: ""},
]

const Onboarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [processingPrompt, setProcessingPrompt] = useState(false);
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [personaDescription, setPersonaDescription] = useState("");
    const [personaGeneralInfo, setPersonaGeneralInfo] = useState<any>();
    const [editableDescription, setEditableDescription] = useState(false);
    const [abortController, setAbortController] = useState<any>();
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [personaLoading, setPersonaLoading] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [image, setImage] = useState<File>();
    const [websiteFavicon, setWebsiteFavicon] = useState("");
    const [websiteTitle, setWebsiteTitle] = useState("");
    const [websiteDescription, setWebsiteDescription] = useState("");
    const [step, setStep] = useState(0);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [openPlans, setOpenPlans] = useState(false);
    const router = useRouter();
    const [openRegistration, setOpenRegistration] = useState(false);
    const { url } = router.query;
    
    const texts = [
        "Reading website",
        "Analyzing content",
        "Loading context",
        "Learning",
        "Remembering data",
        `Give me a sec`,
        "Categorizing information",
        "Just a moment",
        "Repeating the process",
    ];


    useEffect(() => {
      if (textAreaRef) {
          if(textAreaRef.current){
              textAreaRef.current.style.height = "0px";
              const scrollHeight = textAreaRef.current.scrollHeight;
              textAreaRef.current.style.height = scrollHeight + "px";
          }
      }
    }, [personaDescription, editableDescription]);


    useEffect(() => {
      if (window.innerWidth < 1023) { 
          setMobile(true);
        }
        const updateWindowSize = () => {
          setMobile(window.innerWidth < 1023);
        };
        window.addEventListener("resize", updateWindowSize);
    }, []);

    useEffect(() => {
        if (url) {
            setStep(0);
            const scrapeWebsite = async () => {
            const scrapingResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/scrape-links`, {
                urls: [url]
              }, {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                }
            });

            setWebsiteFavicon(scrapingResponse.data.favicons[0]);
            setWebsiteTitle(scrapingResponse.data.titles[0]);
            try {
                const companyNameCompletion = await api.post("/completion-function", {
                    prompt: `Analyse this website title and figure out the company name. 
                    website title: "${scrapingResponse.data.titles[0]}"
                    If there is no company name in website title just return the most representative part of the title.
                    
                    Website text for you to analyse and come up with brief 200 character long description:
                    "${scrapingResponse.data.text.substring(0,400)}"
                    
                    Company name/most representative part of the title and description as a JSON:`,
                    model: "gpt-4-0613",
                    temperature: 0,
                    systemPrompt: `You are an expert in extracting the company name and brief description out of the website title and content. You do this by understanding the context and analysing text. If there is no company name in website title just return the most representative part of the title. You always return the company name or most representative part along with the description only. You return them as JSON object.
                    `,
                    function_definition: {
                      "name": "extract_name_and_description",
                      "description": "Extract the company/service name and come up with brief description based on website title and content.",
                      "parameters": {
                          "type": "object",
                          "properties": {
                              "name": {
                                  "type": "string",
                                  "description": "Company/service most representative name",
                              },
                              "description": {
                                "type": "string", 
                                "description": "150 character long description of the company/service",
                              },
                          },
                          "required": ["name", "description"],
                      },
                  }
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                const completionJSON = JSON.parse(companyNameCompletion.data.function.arguments);
                setWebsiteTitle(completionJSON.name);
                setWebsiteDescription(completionJSON.description);
            } catch (e) {
                console.log(e);
            }
            setStep(1);
        }
        scrapeWebsite();
        }
    }, [url])

    const stopReplying = () => {
        abortController.abort();
    }

      useEffect(() => {
        if (step === 0) {
          const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 4100);
          return () => clearInterval(intervalId);
        }
      }, [step, texts.length]);

      
      const generatePersona = async () => {
        setPersonaLoading(true);
        setStep(2);
        try {
            const generalJSONCompletion = await api.post("/completion", {
                prompt: `Please closely analyze my business offer and product to generate a realistic persona that would be a perfect fit for it. 
                It is called ${websiteTitle}. About product/service: ${websiteDescription}. 
                While generating persona focus on the occupation part by asking yourself who would most likely buy it and who should be the end user.
                The persona should be a valid JSON object that represents it. Always come up with the unique name for the persona and do not call it John Smith. The JSON object should be formatted as follows:
                {
                    "fullName": "Example Name",
                    "age": 50,
                    "occupation": "Global Accounting SaaS CEO",
                    "status": "married",
                    "income": "$10,000,000/year",
                    "location": "San Francisco, CA",
                    "gender": "male"
                }
                Valid JSON object with perfect, unique and original persona for my product/service: 
                `,
                model: "gpt-3.5-turbo",
                temperature: 0.95,
                systemPrompt: `You are a valid JSON generator. You specialize in analyzing text the user has written in order to come up with marketing persona. 
                Once you have a specific persona that will best match the user product/service description you return only a valid JSON object that represents it. The JSON object should be formatted as follows:
                  {
                    "fullName": "Example Name",
                    "age": 50,
                    "occupation": "Global Accounting SaaS CEO",
                    "status": "married",
                    "income": "$10,000,000/year",
                    "location": "San Francisco, CA",
                    "gender": "male"
                  }
                `
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            const personaJSON = JSON.parse(generalJSONCompletion.data.completion);
            setPersonaGeneralInfo(personaJSON);
            generatePersonaDescription(personaJSON);
            setPreviewUrl(`https://ui-avatars.com/api/?background=random&name=${personaJSON.fullName.split(' ').join('+')}&size=128&background=cbd5e1&color=ffffff`)
            setPersonaLoading(false);
            setStep(3);
        } catch (e) {
            console.log(e);
        }
    }

      const generatePersonaDescription = async (personaJSON: any) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const workspace = localStorage.getItem("workspace");
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        if (descriptionLoading) {
          stopReplying();
          return;
        }
        setProcessingPrompt(true);
        setEditableDescription(false);
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
        let model = "gpt-3.5-turbo";
        let systemPrompt = `You are a professional Yepp AI consultant and sales guy. Yepp AI is a platform that allows companies/marketing agencies to upload data about their business`;
        let prompt = `
        `

        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `Generated persona`, model, systemPrompt, temperature: 1}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if(response.body) {
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                setEditableDescription(true);
                setDescriptionLoading(false);
                setPersonaDescription(reply);
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setProcessingPrompt(false);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    reply += data.content;
                    setPersonaDescription(reply);
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
            stopReplying();
        }
      }

      const savePersona = async () => {
        let imageURL = `https://ui-avatars.com/api/?name=${personaGeneralInfo.fullName.split(' ').join('+')}&size=128&background=cbd5e1&color=ffffff`;
        if(image) {
            const subdomain = 'https://asystentai.infura-ipfs.io';
            const ipfsImage = await client.add({ content: image });
            imageURL = `${subdomain}/ipfs/${ipfsImage.path}`;
        }
        try {
            await api.post("/save-persona", {
                title: personaGeneralInfo.fullName,
                icon: imageURL,
                prompt: `The content should be interesing for our persona: ${personaDescription}. 
                Do not address this persona directly as it is our imagined persona that will help you better understand the needs and painpoints of our target audience. Now that you understand the persona, please`,
                workspace: localStorage.getItem("workspace"),
                base_text: personaDescription
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            }
            )
            setSaving(false);
            setOpenPlans(true);
        } catch (e) {
            console.log(e);
            setSaving(false);
        }
    }

      const stepBack = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
      }

      const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const handleTraitInputChange = (e: any, traitTitle: string) => {
      const updatedValue = e.target.value;
      setPersonaGeneralInfo((prevState: any) => ({
          ...prevState,
          [traitTitle]: updatedValue
      }));
    };

    return (
        <div className="w-full lg:h-[100vh] lg:grid lg:grid-cols-2 pb-20 lg:pb-0">
          {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
          {openRegistration && <LoginModal onClose={() => setOpenRegistration(false)} registration={true} />}
          {openPlans && <Centered><UpgradeSubscription purchase={false} onClose={() => setOpenPlans(false)} closeable={true} landing={false} /></Centered>}
            <div className="text-white text-2xl lg:text-3xl py-16 px-10 lg:px-0 lg:py-0 mb-12 lg:mb-0 w-full h-full bg-black bg-gradient-to-r to-[#64D0FF] from-[#6578F8] flex items-center justify-center">
                {step !== 0 &&
                <div className="absolute top-4 left-4">
                    <IoChevronBackSharp className="text-2xl" onClick={() => stepBack()}/>
                </div>
                }
                {step === 0 && 
                <>
                  <div className="w-full flex flex-wrap justify-center">
                    <div className="w-full flex flex-wrap lg:flex-nowrap items-end text-center gap-2 justify-center">{texts[currentIndex]}
                    {mobile ?
                      <div className="w-full mt-4"><Centered><TypingAnimation colorful={false} /></Centered></div>
                      :
                      <TypingAnimation colorful={false} />
                    }
                    </div>
                    <p className="opacity-60 text-white text-lg mt-8">Est. time: 30s</p>
                  </div>
                </>
                }
                {step === 1 && <>Confirm the company name & description</>}
                {step === 2 && <Centered>Analyzing content to generate buyer persona</Centered>}
                {step === 3 && <Centered>Save your persona & generate content</Centered>}
            </div>
            <ContentSide step={step}>
                {step === 0 &&
                <div className="w-10/12 lg:w-full border border-gray-100 px-12 py-14 shadow-xl rounded-2xl border-slate-200 flex justify-center flex-wrap">
                    <CircleSkeletonLoader justifyContent="center" width="4rem" height="4rem" />
                    <MultiLineSkeletonLoader lines={1} justifyContent={"center"}/>
                    <div className="mt-4 w-full"><MultiLineSkeletonLoader lines={3} justifyContent={"center"}/></div>
                </div>
                }
                {step === 1 &&
                <SlideBottom>
                    <div className="w-full border border-gray-100 px-12 py-20 shadow-xl rounded-2xl border-slate-200 flex justify-center flex-wrap">
                        <Centered><Image src={websiteFavicon} width={200} height={200} className="w-12 h-12" alt="favicon" /></Centered>
                        <div className="text-4xl font-bold mt-4 w-full text-center">{websiteTitle}</div>
                        <div className="text-lg font-medium mt-4 w-full text-center">{websiteDescription}
                        </div>
                        <BlueBtn onClick={() => generatePersona()}>Generate persona</BlueBtn>
                    </div>
                </SlideBottom>
                }
                {step === 2 &&
                <div className="w-10/12 lg:w-full border border-gray-100 px-12 py-14 shadow-xl rounded-2xl border-slate-200 flex justify-center flex-wrap">
                    <CircleSkeletonLoader justifyContent="center" width="4rem" height="4rem" />
                    <MultiLineSkeletonLoader lines={1} justifyContent={"center"}/>
                    <div className="mt-4 w-full"><MultiLineSkeletonLoader lines={3} justifyContent={"center"}/></div>
                </div>
                }
                {step === 3 &&
                <SlideBottom>
                <div className="w-11/12 lg:w-full border border-gray-100 px-8 py-10 shadow-xl rounded-2xl border-slate-200 flex flex-wrap mb-20">
                          <div className="flex items-center">
                            <FileUploader hoverTitle="Drop here" handleChange={handleFile} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                                <ProfileContainer>
                                    {previewUrl &&
                                            <PersonaProfile background={previewUrl}/>
                                    }
                                    <HoverIcon />
                                </ProfileContainer>
                            </FileUploader>
                                <div className="ml-4">
                                    <p className="font-bold text-2xl">{personaGeneralInfo.fullName}</p>
                                    <InvisibleInput value={personaGeneralInfo.occupation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTraitInputChange(e, "occupation")}/>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap">
                            {traits.map((trait, index) => (
                                <>
                                    {trait.title === "description" ?
                                        <div className="mb-4 w-full mt-4">
                                            <div className="w-full flex items-end justify-between">
                                                <div className="flex items-center">
                                                    <trait.icon style={{ marginRight: '10px' }} />
                                                    <span className="font-medium">{trait.title}: </span>
                                                </div>
                                                <div>
                                                    {descriptionLoading ?
                                                    <RetryButton onClick={() => generatePersonaDescription(personaGeneralInfo)}>
                                                        <BtnIcon>
                                                            <BsPause style={{ width: "100%", height: "auto" }} />
                                                        </BtnIcon>
                                                        Pause
                                                    </RetryButton>
                                                    :
                                                    <RetryButton onClick={() => generatePersonaDescription(personaGeneralInfo)}>
                                                        <BtnIcon>
                                                            <BsArrowRepeat style={{ width: "100%", height: "auto" }} />
                                                        </BtnIcon>
                                                        Rewrite
                                                    </RetryButton>
                                                    }
                                                </div>
                                            </div>
                                            {processingPrompt ?
                                            <div className="ml-1 mt-4 font-medium px-2">
                                                <MultiLineSkeletonLoader lines={3} justifyContent={"left"} />
                                            </div>
                                            :
                                            <>
                                            {editableDescription ?
                                                <div className="ml-1 mt-4 font-medium"><TextArea ref={textAreaRef} value={personaDescription} height="auto" padding="0.75rem" onChange={(e) => setPersonaDescription(e.target.value)}/></div>
                                                :
                                                <p className="ml-1 mt-4 font-medium px-2 whitespace-pre-wrap will-change-transform"><ReactMarkdown>{personaDescription}</ReactMarkdown></p>
                                            }
                                            </>
                                            }

                                        </div>
                                        :
                                        <div className="flex items-center mr-4 mb-4">
                                            <trait.icon style={{ marginRight: '10px' }} />
                                            <span className="font-medium mr-2">{trait.title}: </span>
                                            {/* Render value from personaGeneralInfo for the respective trait */}
                                            <InvisibleInput value={personaGeneralInfo[trait.title] || ''} onChange={(e: any) => handleTraitInputChange(e, trait.title)}></InvisibleInput>
                                        </div>
                                    }
                                </>
                            ))}
                            </div>
                        <div className="px-2"><WordCounter>{personaDescription.length} / 1500</WordCounter></div>
                        <div className="mt-4 px-2 w-full flex justify-center">
                        <ContinueBtn onClick={() => setOpenRegistration(true)}>
                            {saving ?
                            <Loader color="white" />
                            :
                            <p>Save & generate content</p>
                            }
                        </ContinueBtn>  
                        </div>
                </div>
                </SlideBottom>
                }
            </ContentSide>
        </div>
    )
}

export default Onboarding;

const BlueBtn = styled.div`
    width: 100%;
    height: 3.2rem;
    margin-top: 3rem;
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
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
      box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      margin-top: 1rem;
    }
`

const WordCounter = styled.p`
    text-align: right;
    color: #A0AEC0;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
`

const ModalTitle = styled.h1`
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    margin-left: 0rem;
    padding-left: 2rem;
    border-bottom: 1px solid #E5E8F0;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.2rem;
        line-height: 1.2;
        width: 95vw;
        margin-top: 0;
        padding-left: 1rem;
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



const PersonaContainer = styled.div`
    width: 100%;
    padding: 1rem 1.2rem 1.5rem 1.2rem;
    border-radius: 25px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 150, 0.1);
`

const PersonaProfile = styled.div<{background: any}>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const HoverIcon = styled(BsImage)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 1.2rem;
    height: 1.2rem;
    color: #000;  // Color of the icon. Adjust as needed.
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease; 
`;

const ProfileContainer = styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover ${PersonaProfile} {
        opacity: 0.7;
    }

    &:hover ${HoverIcon} {
        opacity: 1;
    }
`;

const RetryButton = styled.button`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    color: black;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const BtnIcon = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
`

const ContentSide = styled.div<{step?: number}>`
width: 100%;
height: 100vh;
display: ${props => props.step === 3 ? "block" : "flex"};
overflow-y: scroll;
-ms-overflow-style: none;
scrollbar-width: none;
-webkit-mask: 
linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
linear-gradient(to left  , black, transparent) left  /100% 0%,
linear-gradient(to right , black, transparent) right /100% 0%;
-webkit-mask-repeat:no-repeat;
justify-content: center;
align-items: center; 
padding: ${props => props.step === 3  ? "6rem 7rem 6rem 7rem" : "0rem 7rem 0rem 7rem"};
@media (max-width: 1023px) {
  margin-left: 0;
  margin-right: 0rem;
  margin-top: 1rem;
  height: auto; 
  padding: ${props => props.step === 3  ? "3rem 0rem 3rem 0rem" : "0rem 0rem 0rem 0rem"};
}
`