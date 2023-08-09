import Centered from "@/components/Centered";
import PageTemplate from "@/components/Common/PageTemplate"
import styled from "styled-components";
import Image from "next/image";
import CampaignSidebar from "@/components/Marketing/Campaigns/CampaignSidebar";
import { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronUp } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { TbAdjustmentsHorizontal, TbReload } from "react-icons/tb";
import { CiRedo } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import api from "@/pages/api";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import BackBtnText from "@/components/Common/BackBtnText";
import backIcon from "../../../public/images/backArrow.png";
import { BlueLoader } from "@/components/Common/Loaders";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import NoElixirModal from "@/components/Modals/LimitModals/NoElixir";
import axios from "axios";
import { selectedMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";

const breakpointColumnsObj = {
    default: 4,
    2000: 3,
    1250: 2,
    770: 1,
};

interface TemplateProps {
    data: {
        _id: string;
        title: string;
        description: string;
        category: string;
        author: string;
        likes: any[];
        icon: string;
        query: string;
        prompt: string;
        documents: string[];
        about: string;
    }
    text: string;
}

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
}

const Campaign = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [templates, setTemplates] = useState<TemplateProps[]>([]);
    const [loadingTemplates, setLoadingTemplates] = useState([""]);
    const [renderQueue, setRenderQueue] = useState<any[]>([]);
    const [campaign, setCampaign] = useState<any>({});
    const [pageLoading, setPageLoading] = useState(true);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const router = useRouter();
    const [text, setText] = useState("");
    const selectedMarketingAssistant = useSelector(selectedMarketingAssistantState);
    const { campaignId } = router.query;
    const textAreaRefs = useRef<any>({});
    const [rendering,  setRendering] = useState(false);
    
    const adjustTextareaHeight = (element: any) => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
  };
  
  const handleTextareaLoad = (id: string) => {
      const textareaElement = textAreaRefs.current[id];
      if (textareaElement) {
          adjustTextareaHeight(textareaElement);
      }
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    adjustTextareaHeight(event.target);
  };

    const toggleTemplateExpansion = (title: string, _id: string) => {
        setExpandedCategories((prevExpanded) =>
          prevExpanded.includes(title)
            ? prevExpanded.filter((c) => c !== title)
            : [...prevExpanded, title]
        );
        setLoadingTemplates((prevExpanded) =>
        prevExpanded.includes(_id)
          ? prevExpanded.filter((c) => c !== _id)
          : [...prevExpanded, _id]
        );
      };
    
      useEffect(() => {
        const fetchTemplates = async () => {
            const { data } = await api.get(`/campaign/${campaignId}`, {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            });
            const templateTitles = data.templates.map((template: any) => template.data.title);
            const emptyTextTemplates = data.templates.filter((template: any) => !template.text);
            const emptyTemplateIds = emptyTextTemplates.map((template: any) => template.data._id);
            setTemplates(data.templates);
            setLoadingTemplates(emptyTemplateIds);
            setExpandedCategories(templateTitles);
            if (emptyTextTemplates.length > 0) {
              setRenderQueue(emptyTextTemplates);
            }
            setCampaign(data);
            setPageLoading(false);
        }
        if (campaignId) {
            fetchTemplates();
        }
    }, [campaignId]);


    useEffect(() => {
      const renderContent = async () => {
        let template = renderQueue[0];
        if (template.data.title && campaign) {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("user_id");
          const workspace = localStorage.getItem("workspace");
          let fetchedUser: any;
          if (rendering) {
            return;
          }
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
  
          if(fetchedUser.tokenBalance <= 0) {
              setOpenNoElixirModal(true);
            return;
          }
  
          let useEmojis = ""
          if (template.data.title.includes("Video") || template.data.title.includes("Google") || template.data.title.includes("Meta") || template.data.title === "Press Release" || template.data.title === "Product Description" || !campaign.useEmojis) {
            useEmojis = "Do not use emojis."
          } else if (campaign.useEmojis) {
            useEmojis = "Use emojis appropriately, but not too many."
          }
  
          const abortController = new AbortController();
          const signal = abortController.signal;
          setRendering(true);
          let promptToSend = '';
          let context = "";
          let reply = '';
          let model ="gpt-4"
          promptToSend = `Objectives for the ${template.data.title}:
          ${template.data.title} needs to be about ${campaign.about},
          keywords: ${campaign.keywords},
          language: ${campaign.language},
          main objective: ${campaign.objective},
          target audience: ${campaign.targetAudience},
          tone of voice: ${campaign.toneOfVoice},
          type: ${campaign.type}
          use of emojis: ${useEmojis}
          ` + template.data.prompt;
  
          let allDocuments = template.data.documents;
          if (allDocuments) {
              try {
                const vectorIdsResponse = await api.post("/getPineconeIds", {documents: allDocuments}, {
                  headers: {
                    Authorization: token
                  }
                });
            
                const chunks = await axios.post(
                  "https://whale-app-p64f5.ondigitalocean.app/query",
                  {
                    "queries": [
                      {
                        "query": template.data.about,
                        "filter": {
                          "document_id": vectorIdsResponse.data
                        },
                        "top_k": 2
                      }
                    ]
                  },
                  {
                    headers: {
                      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                    }
                  }
                );          
          
              chunks.data.results[0].results.forEach((item: { text: string; }) => {
                context += item.text + " ";
              });
              promptToSend = `${promptToSend} Extra context that might help you: "${context}"`;
              // setEmbeddedDocuments(chunks.data.results[0].results);
              } catch (e) {
              }
            }
  
            try {
              const response = await fetch('http://localhost:3004/askAI', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                signal: signal,
                body: JSON.stringify({prompt: promptToSend, temperature: 1, title: template.data.title, model, systemPrompt: selectedMarketingAssistant.noEmbedPrompt}),
              });
        
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              if(response.body){
                const reader = response.body.getReader();
                while (true) {
                  const { done, value } = await reader.read();
        
                  if (done) {
                    setRendering(false);
                    setText("");
                    setRenderQueue(prevQueue =>
                      prevQueue.filter(t => t.data._id !== template.data._id)
                    );
                    setTemplates(prevTemplates => 
                      prevTemplates.map(t => 
                        t.data._id === template.data._id ? {...t, text: reply} : t
                      )
                    );
                    await api.patch(`/campaign/${campaignId}/template/${template.data._id}`, {text: reply}, {
                      headers: {
                        authorization: token
                    }})
                    break;
                  }
                  const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
                  setLoadingTemplates(prevTemplates => 
                    prevTemplates.filter(id => id !== template.data._id)
                  );
                  setExpandedCategories(prevCategories => 
                      [...prevCategories, template.data.title]
                  );
                  for (const jsonString of jsonStrings) {
                    try {
                      const data = JSON.parse(jsonString);
                      if (data.content) {
                        const contentWithoutQuotes = data.content.replace(/"/g, '');
                        setText((prevMessage) => prevMessage + contentWithoutQuotes);
                        reply += contentWithoutQuotes;
                      }                      
                    } catch (error) {
                      console.error('Error parsing JSON:', jsonString, error);
                    }
                  }
                }
              }
            } catch (e) {
              console.log(e);
              setLoadingTemplates(prevTemplates => 
                prevTemplates.filter(id => id !== template.data._id)
              );
              setExpandedCategories(prevCategories => 
                  [...prevCategories, template.data.title]
              );
            } finally {
              abortController.abort();
            }
        }
      }

      if (renderQueue.length > 0) {
        renderContent();
      }
    }, [renderQueue])

    const rewrite = async (template: TemplateProps) => {
      if (!rendering) {
        setRendering(true);
        setLoadingTemplates(prevTemplates => [...prevTemplates, template.data._id]);
        setRenderQueue(prevQueue => [template, ...prevQueue]);

        if (template.data.title && campaign) {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("user_id");
          const workspace = localStorage.getItem("workspace");
          let fetchedUser: any;
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
            return;
          }
  
          let useEmojis = ""
          if (template.data.title.includes("Video") || template.data.title.includes("Google") || template.data.title.includes("Meta") || template.data.title === "Press Release" || template.data.title === "Product Description" || !campaign.useEmojis) {
            useEmojis = "Do not use emojis."
          } else if (campaign.useEmojis) {
            useEmojis = "Use emojis appropriately, but not too many."
          }
  
          const abortController = new AbortController();
          const signal = abortController.signal;
          let promptToSend = '';
          let context = "";
          let reply = '';
          let model ="gpt-4"
          promptToSend = `Objectives for the ${template.data.title}:
          ${template.data.title} needs to be about ${campaign.about},
          keywords: ${campaign.keywords},
          language: ${campaign.language},
          main objective: ${campaign.objective},
          target audience: ${campaign.targetAudience},
          tone of voice: ${campaign.toneOfVoice},
          type: ${campaign.type}
          ` + template.data.prompt;
  
          let allDocuments = template.data.documents;
          if (allDocuments) {
              try {
                const vectorIdsResponse = await api.post("/getPineconeIds", {documents: allDocuments}, {
                  headers: {
                    Authorization: token
                  }
                });
            
                const chunks = await axios.post(
                  "https://whale-app-p64f5.ondigitalocean.app/query",
                  {
                    "queries": [
                      {
                        "query": template.data.about,
                        "filter": {
                          "document_id": vectorIdsResponse.data
                        },
                        "top_k": 2
                      }
                    ]
                  },
                  {
                    headers: {
                      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
                    }
                  }
                );          
          
              chunks.data.results[0].results.forEach((item: { text: string; }) => {
                context += item.text + " ";
              });
              promptToSend = `${promptToSend} Extra context that might help you: "${context}"`;
              // setEmbeddedDocuments(chunks.data.results[0].results);
              } catch (e) {
              }
            }

            try {
              const response = await fetch('http://localhost:3004/askAI', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
                signal: signal,
                body: JSON.stringify({prompt: promptToSend, temperature: 1, title: template.data.title, model, systemPrompt: selectedMarketingAssistant.noEmbedPrompt}),
              });
        
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              if(response.body){
                const reader = response.body.getReader();
                while (true) {
                  const { done, value } = await reader.read();
        
                  if (done) {
                    setRendering(false);
                    setText("");
                    setRenderQueue(prevQueue =>
                      prevQueue.filter(t => t.data._id !== template.data._id)
                    );
                    setTemplates(prevTemplates => 
                      prevTemplates.map(t => 
                        t.data._id === template.data._id ? {...t, text: reply} : t
                      )
                    );
                    setExpandedCategories(prevCategories => 
                      [...prevCategories, template.data.title]
                  );
                    await api.patch(`/campaign/${campaignId}/template/${template.data._id}`, {text: reply}, {
                      headers: {
                        authorization: token
                    }})
                    break;
                  }
                  const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
                  setLoadingTemplates(prevTemplates => 
                    prevTemplates.filter(id => id !== template.data._id)
                  );
                  setExpandedCategories(prevCategories => 
                      [...prevCategories, template.data.title]
                  );
                  for (const jsonString of jsonStrings) {
                    try {
                      const data = JSON.parse(jsonString);
                      if (data.content) {
                        const contentWithoutQuotes = data.content.replace(/"/g, '');
                        setText((prevMessage) => prevMessage + contentWithoutQuotes);
                        reply += contentWithoutQuotes;
                      }
                      
                    } catch (error) {
                      console.error('Error parsing JSON:', jsonString, error);
                    }
                  }
                }
              }
            } catch (e) {
              console.log(e);
              setLoadingTemplates(prevTemplates => 
                prevTemplates.filter(id => id !== template.data._id)
              );
              setExpandedCategories(prevCategories => 
                  [...prevCategories, template.data.title]
              );
            } finally {
              abortController.abort();
            }
        }
      }
      
    }


    const handleCopy = (textToCopy: string) => {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showNotification({
            id: 'subscribed',
            disallowClose: true,
            autoClose: 5000,
            title: "Text copied!",
            message: 'You can now paste it wherever you want.',
            color: 'black',
      
            styles: (theme: any) => ({
              root: {
                border: "none",
      
              },
            })
          })
        })
        .catch(err => {
          showNotification({
            id: 'error',
            disallowClose: true,
            autoClose: 5000,
            title: "Something went wrong...",
            message: 'Contact us: hello@asystent.ai',
            color: 'red',
      
            styles: (theme: any) => ({
              root: {
                border: "none",
      
              },
            })
          })
          console.error(err);
        });
    };

    

    return (
        <div>
            {openNoElixirModal && <NoElixirModal onClose={() => setOpenNoElixirModal(false)} />}
            <PageTemplate>
            <PageContainer>
                <CampaignSidebar open={openSidebar} setOpen={setOpenSidebar} campaign={campaign}/>
                <Header>
                    <div className="w-full flex items-center justify-between relative">
                    <BackBtn onClick={() => router.push("/marketing")}>
                        <BackBtnIcon>
                            <Image
                            style={{ width: "100%", height: "auto" }}
                            src={backIcon}
                            alt={"logo"}
                            ></Image>
                        </BackBtnIcon>
                        <BackBtnText>Back</BackBtnText>
                    </BackBtn>
                    <div></div>
                    <div className="text-black flex lg:flex-row flex-col">
                        <button
                        className={`h-4 text-black font-bold border-2 border-[#eaedf5] rounded-xl ml-2 mt-1 md:mt-2 sm:px-8 px-4 py-5 flex items-center justify-between  lg:gap-6 gap-2 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300 shadow-lg`}
                        onClick={() => setOpenSidebar(true)}
                        >
                        <div>
                            <TbAdjustmentsHorizontal className="h-6 w-6" />
                        </div>
                        <span>Campaign settings</span>
                        </button>
                    </div>
                    </div>
                </Header>
                <Centered>
                    <SectionsContainer
                    className="my-masonry-grid w-full"
                    breakpointCols={breakpointColumnsObj}
                    >
                    {pageLoading ?
                    <div className="w-[100vw] lg:w-[80vw] mt-14 flex justify-center">
                        <BlueLoader />
                    </div>
                    :
                    templates.map((template) => {
                        const isCategoryExpanded = expandedCategories.includes(
                            template.data.title
                        );
                        const isTemplateLoading = loadingTemplates.includes(
                            template.data._id
                        );
                        return (
                            <div
                            style={{boxShadow: "0px 4px 10px rgba(15, 27, 40, 0.15)"}}
                            className={classNames((expandedCategories.includes(template.data.title) || loadingTemplates.includes(template.data._id)) ? "" : "hover:scale-95 hover:shadow-none duration-300", `h-auto text-black font-bold border-2 border-[#eaedf5] rounded-2xl mt-[1rem] mx-[0.5rem] px-8 py-4 flex flex-col items-center bg-white justify-between gap-2 hover:cursor-pointer`)}
                            key={template.data._id}
                            onClick={() => toggleTemplateExpansion(template.data.title, template.data._id)}
                            >
                            <div className="flex justify-between w-full">
                                <div className="flex gap-2 items-center">
                                <Image
                                    src={template.data.icon}
                                    height={22}
                                    width={22}
                                    alt={`${template.data.category}'s icon`}
                                />
                                <span className="ml-2">{template.data.title}</span>
                                </div>
                                <div className="flex items-center">
                                {(isCategoryExpanded) ? (
                                    <BsChevronUp />
                                ) : (
                                    <BsChevronDown />
                                )}
                                </div>
                            </div>
                                <div onClick={(e) => e.stopPropagation()} className="cursor-auto flex flex-col items-stretch w-full">
                                {(isCategoryExpanded && isTemplateLoading) && 
                                    <div className="mb-6 mt-4">
                                     <MultiLineSkeletonLoader lines={5} justifyContent={"left"} />
                                    </div>
                                }
                                {(isCategoryExpanded && !isTemplateLoading) &&
                                <>
                                {(renderQueue[0] && template.data.title === renderQueue[0].data.title) ?
                                <div>
                                    <div className="pb-4 -mt-4">
                                    <PostContentForm className="font-medium" 
                                        value={text}
                                        onChange={handleTextareaChange}
                                        ref={(el) => {
                                          textAreaRefs.current[template.data._id] = el;
                                          handleTextareaLoad(template.data._id);
                                      }}
                                    />
                                    </div>
                                    <div className="border w-full border-[#eaedf5]" />
                                    <div onClick={(e) => e.stopPropagation()} className="flex w-full justify-between items-center pt-4">
                                        {renderQueue.length === 0 ?
                                          <button onClick={() => rewrite(template)} className="flex gap-2 items-center text-gray-500 hover:text-gray-900 hover:scale-95 transition ease-in">
                                          <TbReload className="w-6 h-6" />
                                          <span>Rewrite</span>
                                          </button>
                                          :
                                          <div></div>
                                        }
                                        <button onClick={() => handleCopy(text)} className="flex gap-4 items-center text-gray-500 hover:text-gray-900 hover:scale-95 transition ease-in">
                                        <MdContentCopy className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                :
                                <div>
                                  <div className="pb-4 -mt-4">
                                      <PostContentForm className="font-medium" 
                                        value={template.text}
                                        onChange={handleTextareaChange}
                                        ref={(el) => {
                                          textAreaRefs.current[template.data._id] = el;
                                          handleTextareaLoad(template.data._id);
                                      }}
                                      />
                                  </div>
                                  <div className="border w-full border-[#eaedf5]" />
                                  <div onClick={(e) => e.stopPropagation()} className="flex w-full justify-between items-center pt-4">
                                      {renderQueue.length === 0 ?
                                          <button onClick={() => rewrite(template)} className="flex gap-2 items-center text-gray-500 hover:text-gray-900 hover:scale-95 transition ease-in">
                                            <TbReload className="w-6 h-6" />
                                            <span>Rewrite</span>
                                          </button>
                                          :
                                          <div></div>
                                        }
                                      <button  onClick={() => handleCopy(template.text)} className="flex gap-4 items-center text-gray-500 hover:text-gray-900 hover:scale-95 transition ease-in">
                                      <MdContentCopy className="h-6 w-6" />
                                      </button>
                                  </div>
                              </div>
                                } 
                                </>
                                }
                                </div>
                            </div>
                        );
                        })}
                    </SectionsContainer>
                </Centered>
                </PageContainer>
            </PageTemplate>
        </div>
    )
}

export default Campaign;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  color: black;
  border-bottom: 2px solid #eaedf5;
  padding-bottom: 2rem;
  @media (max-width: 1023px) {
    display: flex;
    padding: 1rem 1rem 1.5rem 1rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  width: 100%;
  border-radius: 25px;
  padding: 0.5rem 2rem 1.5rem 2rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
  border-radius: 20px;
  background: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;


const SectionsContainer = styled(Masonry)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 1rem;
  @media (max-width: 1023px) {
    padding: 1rem 0 1rem 0;
  }
`;

const PostContentForm = styled.textarea`
    margin-top: 3vh;
    width: 100%;
    font-size: 1rem;
    border-radius: 10px;
    background-color: transparent;
    color: black;
    font-weight: 500;
    height: auto;
    border: none;
    outline: none;
    resize: none;
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
`