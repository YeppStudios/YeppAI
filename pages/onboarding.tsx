import { IoChevronBackSharp } from "react-icons/io5";
import Centered from "@/components/Centered";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import { BsArrowRightShort, BsFillArchiveFill, BsFillChatTextFill, BsFillFileTextFill, BsFillGrid3X3GapFill, BsFillMortarboardFill, BsImage, BsPencilFill } from "react-icons/bs";
import api from "./api";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { useRouter } from "next/router";
import axios from "axios";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";
import UpgradeSubscription from "@/components/Modals/InformationalModals/UpgradeSubscription";
import { TypeAnimation } from "react-type-animation";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import SlideBottom from "@/components/Animated/SlideBottom";
import ColorfulText from "@/components/Common/ColorfulText";
import Head from "next/head";

const features = [
  {id: 0, title: "Marketing feature", description: "allows user to generate shorter content like posts, bios, ads, video scripts, emails, enhance text, marketing frameworks like PAS, AIDA etc.", icon: <BsPencilFill className="text-base mr-4" />},
  {id: 1, title: "Campaigns feature", description: "allows user to generate entire campaigns about the topic for different placements all at once",  icon: <BsFillGrid3X3GapFill className="text-base mr-4" />},
  {id: 2, title: "Copywriting feature", description: "based on your uploaded assets and results scraped from google Yepp generates longer content like articles, blogs, rankings etc.", icon: <BsFillFileTextFill className="text-base mr-4" />},
  {id: 3, title: "Chat feature", description: "you can talk to your uploaded data (from PDFs, CSV, PPTX, TXT, YouTube and even websites) and use it creatively to come up with ideas, smart search your files, chat with your data and many other things.", icon: <BsFillChatTextFill className="text-base mr-4" />},
  {id: 4, title: "Tone of voice lab", description: "user by uploading a sample of your writing can train AI to write in given tone of voice and use it throughout the platform. It also allows you to generate your ideal buyer persona based on the form that you need to fill out in order to write more targeted content throughout our platform.", icon: <BsFillMortarboardFill className="text-base mr-4" />},
  {id: 5, title: "Assets", description: "is where companies can upload their/their client's data like websites, pdfs, pptx, docx, csv, txt and YouTube video files.", icon: <BsFillArchiveFill className="text-base mr-4" />},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Onboarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [abortController, setAbortController] = useState<any>();
    const [websiteFavicon, setWebsiteFavicon] = useState("");
    const [scraping, setScraping] = useState(true);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [loadingSection, setLoadingSection] = useState<Number>();
    const [renderedFeatures, setRenderedFeatures] = useState<any[]>([]);
    const [websiteTitle, setWebsiteTitle] = useState("");
    const [websiteText, setWebsiteText] = useState("");
    const [sectionRendering, setSectionRendering] = useState(false);
    const [websiteDescription, setWebsiteDescription] = useState("");
    const [openPlans, setOpenPlans] = useState(false);
    const [generationEnded, setGenerationEnded] = useState(false);
    const router = useRouter();
    const [openRegistration, setOpenRegistration] = useState(false);
    const { url } = router.query;
    const [delayed, setDelayed] = useState(false);
    const [secondDelayed, setSecondDelayed] = useState(false);

    useEffect(() => {
      if (!scraping) {
        const timer = setTimeout(() => {
          setDelayed(true);
          const secondTimer = setTimeout(() => {
            setSecondDelayed(true);
          }, 500); // Second delay in milliseconds
    
          const thirdTimer = setTimeout(() => {
            generateNextSection();
          }, 2500);

          return () => {
            clearTimeout(secondTimer);
            clearTimeout(thirdTimer);
          };
        }, 1500); // First delay in milliseconds
    
        return () => clearTimeout(timer);
      }

    }, [scraping]);

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
      setRenderedFeatures([]);
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
          setScraping(true);
            const scrapeWebsite = async () => {
            const scrapingResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/scrape-links`, {
                urls: [url]
              }, {
                headers: {
                  'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                }
            });
            console.log("scraped", scrapingResponse.data)
            setWebsiteFavicon(scrapingResponse.data.favicons[0]);
            setWebsiteText(scrapingResponse.data.text);
            setWebsiteTitle(scrapingResponse.data.titles[0]);
            try {
                const companyNameCompletion = await api.post("/completion-function", {
                    prompt: `Analyse this website title and figure out the company name. 
                    website title: "${scrapingResponse.data.titles[0]}"
                    If there is no company name in website title just return the most representative part of the title.
                    
                    Website text for you to analyse and come up with brief 200 character long description:
                    "${scrapingResponse.data.text.substring(0,600)}"
                    
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
                setScraping(false);
            } catch (e) {
                console.log(e);
                setScraping(false);
            }
        }
        scrapeWebsite();
        }
    }, [url])

    const stopReplying = () => {
        abortController.abort();
    }

      useEffect(() => {
        if (scraping) {
          const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 4100);
          return () => clearInterval(intervalId);
        }
      }, [scraping, texts.length]);
      

      const renderFeatures = () => {
        return Object.keys(renderedFeatures).map((key: string) => {
          const feature = features.find(feature => feature.id === Number(key));
          if (feature) {
            return (
              <div key={key} className="w-full">
              <SlideBottom>
                <div className="w-full pt-4 shadow-lg rounded-2xl border-gray-100 mb-6">
                  <div className="border-b-2 border-gray-100 pb-2 pl-5 mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      {feature.icon}
                      {feature.title}
                    </div>
                    <div onClick={() => setOpenRegistration(true)} className="mr-4 font-medium text-sm">
                      <ColorfulText>Try Now</ColorfulText>
                    </div>
                  </div>
                  <p className="px-5 pb-5">
                    {renderedFeatures[feature.id]}
                  </p>
                </div>
              </SlideBottom>
              </div>
            );
          }
          return null;
        });
      };
      
      const generateNextSection = async (index = 0) => {
        if (index >= features.length) {
          setSectionRendering(false);
          setGenerationEnded(true);
          return;
        }
        if (sectionRendering) {
          stopReplying();
          return;
        }
        const response = await api.post('/login', { email: process.env.NEXT_PUBLIC_ADMIN_EMAIL, password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD });
        const token = response.data.token;
        const userId = response.data.user._id
        const newAbortController = new AbortController();
        setAbortController(newAbortController);
        setSectionRendering(true);
        setLoadingSection(renderedFeatures.length);
        const feature = features[index];
        let fetchedUser = null;
        const {data} = await api.get(`/users/${userId}`, {
          headers: {
            authorization: token
          }
        });
        fetchedUser = data;
        //make sure user has elixir
        if(fetchedUser.tokenBalance <= 0) {
          setOpenNoElixirModal(true);
          return;
        }

        let reply = "";
        let model = "gpt-4-32k";
        let systemPrompt = `You are a cheerful and helpful marketing platform called Yepp AI. You allow companies/marketing agencies to upload data about their business in order to generate high-converting, factual marketing content that drives trafic.`;
        let prompt = `Hello, we are ${websiteTitle}-${websiteDescription}. Could you tell us how can we best use and benefit from using Yepp AI?  Analyze content of our website and understand it thoroughly to best advise us. Our website content: "${websiteText.substring(0, 1000)}". From now on please write in our website's content language like native person awould in a natural, informal way so we can understand it.
        Now that you understand ${websiteTitle} business and language, please come up with an idea on how we can use your ${feature.title}- ${feature.description} to improve our business marketing and not only. Based on understanding what your feature does, come up with some unique ideas tailored for ${websiteTitle} needs. Jump straight into the exciting use cases and don't greet us, we want only valuable advice.
        Introduce the ideal use cases using your ${feature.title} in just under 75 words in our website's language:
        `

        try {
            const response = await fetch('https://asystentai.herokuapp.com/askAI', {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
              signal: newAbortController.signal,
              body: JSON.stringify({prompt, title: `Generated use case idea`, model, systemPrompt, temperature: 0.95}),
            });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          if (response.body) {
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                generateNextSection(index + 1);
                setSectionRendering(false);
                break;
              }
      
              const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
              setLoadingSection(-1);
              for (const jsonString of jsonStrings) {
                try {
                  const data = JSON.parse(jsonString);
                  if (data.content) {
                    const contentWithoutQuotes = data.content.replace(/"/g, '');
                    setRenderedFeatures(prevTexts => ({
                        ...prevTexts,
                        [feature.id]: prevTexts[feature.id] ? prevTexts[feature.id] + contentWithoutQuotes : contentWithoutQuotes
                    }));
                    reply += contentWithoutQuotes;
                  }
                } catch (error) {
                  console.error('Error parsing JSON:', jsonString, error);
                }
              }
            }
          }
        } catch (e: any) {
          if (e.message === "Fetch is aborted") {
            setSectionRendering(false);
          } else {
            console.log(e);
            setSectionRendering(false);
          }
        } finally {
            stopReplying();
        }
      }


    return (
        <div className="w-full lg:h-[100vh] lg:grid lg:grid-cols-2 pb-20 lg:pb-0">
        <Head>
          <title>Onboaring | Yepp AI</title>
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Learn how Yepp AI can help you generate high-converting marketing content."
          />
        </Head>
          {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
          {openRegistration && <LoginModal onClose={() => setOpenRegistration(false)} registration={true} />}
          {openPlans && <Centered><UpgradeSubscription purchase={false} onClose={() => setOpenPlans(false)} closeable={true} landing={false} /></Centered>}
            <div className={classNames(scraping ? "py-16 h-full px-10" : "lg:py-16 py-4 lg:h-full px-4 lg:px-10", "sticky lg:relative top-0 z-40 text-white text-2xl lg:text-3xl lg:px-0 lg:py-0 mb-6 lg:mb-12 lg:mb-0 w-full bg-black bg-gradient-to-r to-[#64D0FF] from-[#6578F8] flex items-center justify-center")}>
                <div className="absolute top-4 left-4">
                    <IoChevronBackSharp className="text-2xl" onClick={() => router.push("/")}/>
                </div>
                <>
                  <div className="w-full flex flex-wrap justify-center">
                    {scraping &&
                    <div className="w-full flex font-medium lg:font-normal flex-wrap lg:flex-nowrap items-end text-center gap-2 justify-center">{texts[currentIndex]}
                    {mobile ?
                      <div className="w-full mt-4"><Centered><TypingAnimation colorful={false} /></Centered></div>
                      :
                      <TypingAnimation colorful={false} />
                    }
                    </div>
                    }
                    {scraping && <p className="opacity-60 text-white text-lg mt-8">Est. time: 30s</p>}
                    {!scraping && <div className="w-full"><SlideBottom><ContinueBtn onClick={() => setOpenRegistration(true)} className="lg:mt-8">Continue <BsArrowRightShort className="ml-2 w-6 h-6"/></ContinueBtn></SlideBottom></div>}
                  </div>
                </>
            </div>
            <ContentSide>
              <div className="w-full flex justify-center mb-4">
              <SlideBottom>
              <div className="rounded-xl shadow-xl w-12 h-12 flex justify-center items-center border border-gray-100">
                <Image src={logo} alt="yepp" width={50} height={50} className="w-6 h-6" />
              </div>
              </SlideBottom>
              </div>
              <div className="w-full">
                <SlideBottom> 
                <div className="w-full lg:w-full border font-medium border-slate-100 px-4 lg:px-8 py-4 shadow-xl rounded-bl-2xl rounded-br-2xl rounded-tr-xl border-slate-100 flex justify-center flex-wrap mb-28">
                  {scraping ?
                  <div className="mb-2 w-full">
                    <MultiLineSkeletonLoader lines={3} justifyContent={"left"} />
                  </div>
                  :
                  <div className="w-full flex items-center flex-wrap">
                    <div className="mr-4">
                    <TypeAnimation
                      sequence={[
                        "Hey! I've just scanned your website:",
                      ]}
                      speed={80}
                      cursor={false}
                      repeat={0}
                    />
                    </div>
                    {delayed && 
                    <SlideBottom>
                      <div className="py-2 px-6 shadow-lg border-slate-100 lg:border-slate-200 rounded-xl text-bold text-black flex items-center">
                      <Image src={websiteFavicon} alt="website favicon" width={20} height={20} className="w-5 h-5 mr-4" />
                      {websiteTitle}
                      </div>
                    </SlideBottom>}
                    {secondDelayed && (
                      <div className="w-full mt-2 mb-4">
                      <TypeAnimation
                        sequence={[
                          "After analyzing its content I have a couple ideas on how I could help you:",
                        ]}
                        speed={80}
                        cursor={false}
                        repeat={0}
                      />
                      </div>
                    )}
                    {renderFeatures()}
                    {generationEnded && <div className="w-full flex font-medium mt-8 mb-10"><SlideBottom>Got a question? <a target="_blank" rel="noreferrer" href="https://calendly.com/yeppai/yepp-introduction-call"><ColorfulText><b className="ml-2">Schedule a demo</b></ColorfulText></a></SlideBottom></div>}
                  </div>
                  }
                </div>
                </SlideBottom>
              </div>
            </ContentSide>
        </div>
    )
}

export default Onboarding;


const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: black;
        font-weight: 500;
        width: 60%;
        height: 3rem;
        background: white;
        margin-left: 20%;
        background-size: 110%;
        box-shadow: 2px 2px 24px rgba(0, 0, 0, 0.2);
        background-position-x: -1rem;
        transition: all 0.4s ease-in-out;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          transform: scale(0.97);
          box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
        }
        @media (max-width: 1023px) {
          width: 55%;
          margin-left: 45%;
          font-size: 1rem;
        }
`

const ContentSide = styled.div<{step?: number}>`
  width: 100%;
  height: 100vh;
  padding: 2rem 4rem 1rem 1.5rem;
  display: grid;
  grid-template-columns: 0.2fr 1.8fr; 
  grid-template-rows: 1fr; 
  gap: 0px 10px; 
  grid-template-areas: 
    ". ."; 
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
  @media (max-width: 1023px) {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0;
    margin-right: 0rem;
    height: auto; 
    padding: 0rem 0.7rem 1rem 0.7rem;
    -webkit-mask: 
    linear-gradient(to top,    black 100%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 100%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
  }
`