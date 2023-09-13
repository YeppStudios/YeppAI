import SlideBottom from "@/components/Animated/SlideBottom";
import { IoChevronBackSharp } from "react-icons/io5";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Centered from "@/components/Centered";
import styled from "styled-components";
import { useEffect, useState } from "react";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import CircleSkeletonLoader from "@/components/Common/CircleSkeletonLoader";
import PersonaModal from "@/components/Modals/OnboardingModals/PersonaModal";
import { BsBoxArrowInDown } from "react-icons/bs";
import api from "./api";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { useRouter } from "next/router";
import axios from "axios";

const Onboarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [processingPrompt, setProcessingPrompt] = useState(false);
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [personaDescription, setPersonaDescription] = useState("");
    const [personGeneralInfo, setPersonaGeneralInfo] = useState({});
    const [editableDescription, setEditableDescription] = useState(false);
    const [abortController, setAbortController] = useState<any>();
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [websiteFavicon, setWebsiteFavicon] = useState("");
    const [websiteTitle, setWebsiteTitle] = useState("");
    const [websiteDescription, setWebsiteDescription] = useState("");
    const [step, setStep] = useState(2);
    
    const router = useRouter();
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
        let systemPrompt = ``;
        let prompt = ``

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
                setPersonaDescription(reply)
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

      const stepBack = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
      }

    return (
        <div className="w-full lg;h-[100vh] lg:grid lg;grid-cols-2 pb-20 lg:pb-0">
            
            <div className="text-white text-3xl py-16 px-10 lg:px-0 lg:py-0 mb-12 lg:mb-0 w-full h-full bg-black bg-gradient-to-r to-[#64D0FF] from-[#6578F8] flex items-center justify-center">
                <div className="absolute top-4 left-4">
                    <IoChevronBackSharp className="text-2xl" onClick={() => stepBack()}/>
                </div>
                {step === 0 && <><div className="w-full flex flex-wrap justify-center"><div className="w-full flex items-end text-center gap-2 justify-center">{texts[currentIndex]}<TypingAnimation colorful={false} /></div><p className="opacity-60 text-white text-lg mt-8">Est. time: 1.5 min</p></div></>}
                {step === 1 && <>Confirm the company name & description</>}
                {step === 2 && <Centered>Save your persona & generate content</Centered>}
            </div>
            <div className="w-full h-full flex justify-center items-center lg:px-36">
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
                        <Centered><Image src={websiteFavicon} width={200} height={200} className="w-12 h-12" alt="logo" /></Centered>
                        <div className="text-4xl font-bold mt-4 w-full text-center">{websiteTitle}</div>
                        <div className="text-lg font-medium mt-4 w-full text-center">{websiteDescription}
                        </div>
                        <BlueBtn onClick={() => setStep(2)}>Generate persona</BlueBtn>
                    </div>
                </SlideBottom>
                }
                {step === 2 &&
                <SlideBottom>
                    <PersonaModal step={step} personaGeneralInfo={personGeneralInfo} setPersonaGeneralInfo={setPersonaGeneralInfo} generatePersonaDescription={generatePersonaDescription} processingPrompt={processingPrompt} editableDescription={editableDescription} />
                </SlideBottom>
                }
            </div>
        </div>
    )
}

export default Onboarding;

const BlueBtn = styled.div`
    width: 100%;
    height: 3.5rem;
    margin-top: 3rem;
    margin-left: 1.4rem;
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