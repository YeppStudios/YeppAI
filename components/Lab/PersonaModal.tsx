import SlideBottom from "@/components/Animated/SlideBottom";
import TextArea from "@/components/forms/TextArea";
import { useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { BsArrowRepeat, BsBriefcase, BsCash, BsDashLg, BsGenderAmbiguous, BsGeo, BsHeart, BsHourglass, BsImage, BsPause, BsPauseBtn, BsPlusLg, BsTextParagraph, BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FileUploader } from 'react-drag-drop-files';
import { create } from "ipfs-http-client";
import { Center } from "@mantine/core";
import Centered from "@/components/Centered";
import Space from "@/components/Docs/common/Space";
import Label from "@/components/Common/Label";
import persona from "@/public/images/persona.png";
import Image from "next/image";
import CustomDropdown from "@/components/forms/CustomDropdown";
import api from "@/pages/api";
import Dropdown from "@/components/forms/Dropdown";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import InvisibleInput from "@/components/forms/InvisibleInput";
import { useRouter } from "next/router";
import { Loader } from "@/components/Common/Loaders";
import ReactMarkdown from 'react-markdown';

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

interface Background {
    image: any
}

const traits = [
        {title: "age", icon: BsHourglass, value: "50"},
        {title: "status", icon: BsHeart, value: ""},
        {title: "income", icon: BsCash, value: ""},
        {title: "location", icon: BsGeo, value: ""},
        {title: "gender", icon: BsGenderAmbiguous, value: ""},
        {title: "description", icon: BsTextParagraph, value: "sdfadsf"},
]

const competition = [
    {title: "Jasper", favicon: "https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b86e6acc31077_Favicon.png", description: "dsfsdga"},
]

const markets = [
    "Global",
    "Europe",
    "United States",
    "Asia",
    "South America",
    "Africa",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "China",
    "Japan",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Poland",
    "Singapore"
]

const businessModels = ["B2B", "B2C", "B2B2C", "B2G", "P2P", "C2B"];

const PersonaModal = (props: {onClose: any, currentModal: any}) => {
    const [personaDescription, setPersonaDescription] = useState("");
    const [step, setStep] = useState("");
    const [image, setImage] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [links, setLinks] = useState<string[]>([""]);
    const [userLink, setUserLink] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [market, setMarket] = useState("United States");
    const [businessModel, setBusinessModel] = useState("B2B");
    const [personaLoading, setPersonaLoading] = useState(false);
    const [currentText, setCurrentText] = useState(0);
    const [editableDescription, setEditableDescription] = useState(false);
    const [personaGeneralInfo, setPersonaGeneralInfo] = useState<any>();
    const [abortController, setAbortController] = useState<any>();
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [processingPrompt, setProcessingPrompt] = useState(false);
    const [competitionLoading, setCompetitionLoading] = useState(true);
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const router = useRouter();

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
        if (props.currentModal === "persona-description") {
            setStep("description");
        } else if (props.currentModal === "persona-form") {
            setStep("form");
        }
    }, [props.currentModal]);

    const texts = [
        "Analyzing the value proposition...",
        "Learning more about the market...",
        "Saving persona in correct format...",
        "Analysing provided information...",
        "Reading...",
        "Thinking...",
        "Categorizing info...",
        "Memorizing the results...",
        "Give me a sec...",
        "Give me some more time to learn...",
        "It's taking me a while to read it, please wait...",
        "Trust me it's worth the wait...",
      ];  
  
      useEffect(() => {
        if (personaLoading) {
          const intervalId = setInterval(() => {
            setCurrentText((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 5000);
          return () => clearInterval(intervalId);
        }
  
      }, [personaLoading, texts.length]);

    const isValidURL = (string: string) => {
        const res = string.match(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        );
        return res !== null;
    };

    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const handleAddLink = () => {
        if (links[links.length - 1] && isValidURL(links[links.length - 1])) {
          setLinks([...links, ""]);
        }
      };
      
      const handleRemoveLink = (indexToRemove: number) => {
        if (links.length > 1) {
          setLinks(links.filter((_, index) => index !== indexToRemove));
        }
      };

      const stopReplying = () => {
        abortController.abort();
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
        let systemPrompt = `You are a marketer with years of experience. You specialize in coming up with detailed marketing persona descriptions. You carefuly analyze the context given by the user and try to understand the target audience as well as product. 
        Every time you generate a unique description. Your descriptions are no more than 150 words long. You always reply only with persona description.`;
        let prompt = `Come up with detailed persona description for my persona object: ${personaJSON.fullName}- ${personaJSON.age} year old, ${personaJSON.status} ${personaJSON.occupation} who lives in ${personaJSON.location} and earns ${personaJSON.income}. 
        But first closely analyze my business offer and product to generate a realistic ${personaJSON.fullName} description that would be a perfect fit for us. 
        About our product/service: ${about}. We are targetting the ${market} market and our target audience are ${targetAudience}. Our business model is ${businessModel}.
        Follow this process when crafting description: Once you understand the context, come up with bio describing persona's role in the company, his/her life purpose, interests and hobbies that best match the perfect persona for us. Make sure that these are well aligned with typical ${personaJSON.ocupation} day-to-day desires and struggles.
        Then come up with persona needs and painpoints that ${personaJSON.fullName} has along with desires and goals related to our product/service. At the end describe why ${personaJSON.fullName} is motivated to buy our product/service. Make it sound objective and realistic.
        Objective persona description that is in under 150 words long: 
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
    
          if(response.body){
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
      
    const generatePersona = async () => {
        setPersonaLoading(true);
        try {
            const generalJSONCompletion = await api.post("/completion", {
                prompt: `Please closely analyze my business offer and product to generate a realistic persona that would be a perfect fit for it. 
                About product/service: ${about}. We are targetting the ${market} market and our target audience are ${targetAudience}. Our business model is ${businessModel}.
                While generating persona focus on the occupation part by asking yourself who would most likely buy it and who should be the end user. Always consider that we are ${businessModel}.
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
            setStep("persona");
            // if (links.length > 0) {
            // const scrapingResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/scrape-links`, {
            //     urls: [links[0]]
            //   }, {
            //     headers: {
            //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
            //     }
            //   });
            // }
        } catch (e) {
            console.log(e);
        }
    }


    const handleTraitInputChange = (e: any, traitTitle: string) => {
        const updatedValue = e.target.value;
        setPersonaGeneralInfo((prevState: any) => ({
            ...prevState,
            [traitTitle]: updatedValue
        }));
    };

    const savePersona = async () => {
        setSaving(true);
        let imageURL = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&size=128&background=cbd5e1&color=ffffff`;
        if (personaGeneralInfo) {
           imageURL = `https://ui-avatars.com/api/?name=${personaGeneralInfo.fullName.split(' ').join('+')}&size=128&background=cbd5e1&color=ffffff`;
        }
        if(image) {
            const subdomain = 'https://asystentai.infura-ipfs.io';
            const ipfsImage = await client.add({ content: image });
            imageURL = `${subdomain}/ipfs/${ipfsImage.path}`;
        }
        try {
            await api.post("/save-persona", {
                title: name || personaGeneralInfo.fullName,
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
            router.reload();
        } catch (e) {
            console.log(e);
            setSaving(false);
        }
    }

    return (
        <ModalBackground>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            <div>
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {personaLoading ?
                    <div>
                        <ModalTitle>Give me a sec...</ModalTitle>
                        <Centered>
                            <ModalDescription>AI is analyzing the content to come up with an ideal persona. <br />It&apos;s worth the wait!</ModalDescription>
                        </Centered>
                        <ThinkingContainer>
                            <Centered><TypingAnimation colorful={true} /></Centered>
                            <Centered><Texts>{texts[currentText]}</Texts></Centered>
                        </ThinkingContainer>
                </div>
                :
                <div>
                {step === "form" &&
                <div>
                    <ModalTitle>
                        Provide more details
                    </ModalTitle>
                    <Centered>
                    <div className="flex flex-wrap">
                    <div className="flex flex-wrap w-full lg:px-6 px-2">
                    <div className="flex items-between justify-between w-full">
                    <div className="flex w-[48%] items-center mb-2 flex-wrap">
                    <div className="flex items-between justify-between w-full">
                        <Label>Market</Label>
                    </div>
                        <CustomDropdown 
                        placeholder="United States"
                        value={market}
                        values={markets}
                        onChange={setMarket}
                        />
                    </div>
                    <div className="flex w-[48%] items-center mb-2 flex-wrap">
                    <div className="flex items-between justify-between w-full">
                        <Label>Business model</Label>
                    </div>
                        <CustomDropdown 
                        placeholder="B2B"
                        value={businessModel}
                        values={businessModels}
                        onChange={setBusinessModel}
                        />
                    </div>
                    </div>
                    <div className="flex items-center justify-between w-full mt-4"><Label>What is your product/service about?</Label><div><WordCounter>{about.length} / 350</WordCounter></div></div>
                    <TextArea 
                        placeholder="Generative AI platform where you can upload your data and effortlessly generate factual marketing content"
                        padding="1rem"
                        height="5.2rem"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-wrap w-full lg:px-6 px-2 mt-4 justify-between">
                    <div className="flex w-[100%] items-center mb-2 flex-wrap">
                    <div className="flex items-between justify-between w-full">
                        <Label>Target audience</Label>
                    </div>
                        <Input 
                        placeholder="marketing agencies looking for AI tools"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="flex flex-wrap w-full lg:px-6 px-2 mt-6">
                    <div className="flex items-between justify-between w-full">
                    <Label>Your landing page (optional)</Label>
                    </div>
                    <div className="flex w-full items-center mb-2">
                        <Input 
                        placeholder="https://..."
                        value={userLink}
                        onChange={(e) => setUserLink(e.target.value)}
                        />
                    </div>
                    </div>
                    {/* <div className="flex flex-wrap w-full px-6 mt-6">
                    <div className="flex items-between justify-between w-full">
                    <Label>Who is your competition? (optional)</Label>
                    </div>

                    {links.map((link, index) => (
                    <div key={index} className="flex w-full items-center mb-2">
                        <Input 
                        placeholder="https://..."
                        value={link}
                        onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[index] = e.target.value;
                            setLinks(newLinks);
                        }}
                        />

                        {index !== links.length - 1 && (
                        <LinkBtn onClick={() => handleRemoveLink(index)}>
                            <BsDashLg style={{width: "auto", height: "60%"}}/>
                        </LinkBtn>
                        )}

                        {index === links.length - 1 && (
                        <LinkBtn onClick={handleAddLink}>
                            <BsPlusLg style={{width: "auto", height: "60%"}}/>
                        </LinkBtn>
                        )}
                    </div>
                    ))}
                    </div> */}
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => generatePersona()}>
                        <p>Continue</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                {(step === "persona" && personaGeneralInfo) &&
                <SlideBottom>
                <div className="pb-8">
                    <ModalTitle>
                        Persona outline
                    </ModalTitle>
                    <Centered>
                        <div className="lg:px-6 w-full">
                        <PersonaContainer>
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
                                                <div className="ml-1 mt-4 font-medium px-2"><TextArea ref={textAreaRef} value={personaDescription} height="auto" padding="0.75rem" onChange={(e) => setPersonaDescription(e.target.value)}/></div>
                                                :
                                                <p className="ml-1 mt-4 font-medium px-4 whitespace-pre-wrap will-change-transform"><ReactMarkdown>{personaDescription}</ReactMarkdown></p>
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
                        {/* {personaGeneralInfo &&
                        <div className="mt-6">
                            <div>Why {personaGeneralInfo.occupation}?</div>
                        </div>
                        } */}
                        <WordCounter>{personaDescription.length} / 1500</WordCounter>
                        <div className="mt-4 px-2">
                        <ContinueBtn onClick={() => savePersona()}>
                            {saving ?
                            <Loader color="white" />
                            :
                            <p>Save</p>
                            }
                        </ContinueBtn>  
                        </div>
                        </PersonaContainer>
                        {/* {(personaGeneralInfo && links.length > 0) &&
                        <div className="mt-10 mx-2">
                        <h2 className="text-lg font-medium">How does it compare to your competition?</h2>
                        {!competitionLoading ?
                        competition.map((competitor, index) => (
                            <div key={index} className="mt-6">
                                <div className="flex items-center">
                                    <div className="rounded-full">
                                        <Image width={300} height={300} alt={`${competitor.title}`} src={competitor.favicon} style={{width: "2.5rem", height: "2.5rem"}}/>
                                    </div>
                                    <div className="ml-4 font-medium text-lg">
                                        {competitor.title}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    {competitor.description}
                                </div>
                            </div>
                        ))
                        :
                        <div className="mt-4 w-full">
                            <MultiLineSkeletonLoader lines={5} justifyContent={"left"} />
                        </div>
                        }
                        </div>
                        } */}
                        </div>
                    </Centered>
                </div>
                </SlideBottom>
                }
                {step === "description" &&
                <div>
                    <ModalTitle>
                        Describe your persona
                    </ModalTitle>
                    <div className="lg:px-6">
                    <TextArea 
                        placeholder="Describe your ideal persona..."
                        padding="1rem"
                        height="30rem"
                        value={personaDescription}
                        onChange={(e) => setPersonaDescription(e.target.value)}
                    />
                    <WordCounter>{personaDescription.length} / 1000</WordCounter>
                    </div>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => setStep("save")}>
                        <p>Continue</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                {step === "save" &&
                <div>
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
                    <Input type="text" placeholder="Name your persona" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => savePersona()}>
                        {saving ?
                        <Loader color="white" />
                        :
                        <p>Save</p>
                        }
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                </div>
                }
            </Container>
            </div>
        </ModalBackground>
    )
}

export default PersonaModal;

const ModalBackground = styled.div`
width: 100%;
overflow-y: auto;
min-height: 100vh;
max-height: 100vh;
position: fixed;
padding: 3rem 0rem 8rem 0rem;
flex-wrap: wrap;
backdrop-filter: blur(10px);
z-index: 100;
top: 0;
transform: will-change;
left: 0;
display: flex;
justify-content: center;
cursor: pointer;
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
    padding: 1.5rem 0rem 6rem 0rem;
    overflow-x: hidden;
}
`

const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 0rem 0rem;
    background: white;
    will-change: transform;
    position: relative;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 4vh 2vw 4vh 2vw;
        box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
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

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 8rem 2rem 8rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`
const WordCounter = styled.p`
    text-align: right;
    margin-right: 0.5rem;
    color: #A0AEC0;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
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

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: inset 1px 1px 5px rgba(22, 27, 29, 0.2), inset -1px -1px 5px #FAFBFF;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    width: 100%;
    margin-bottom: 0;
    padding: 0.6rem;
}
`;

const PersonaContainer = styled.div`
    width: 100%;
    padding: 1rem 1.2rem 1.5rem 1.2rem;
    border-radius: 25px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 150, 0.1);
`

const LinkBtn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    min-width: 2.75rem;
    margin-left: 1rem;
    color: black;
    border: solid 2px #e5e5e5;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: double 2px transparent;
        background-image: linear-gradient(white, white, white),
          radial-gradient(circle at top left, #6578f8, #64b5ff);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        transform: scale(0.95);
        color: black;
    }
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

const ModalDescription = styled.p`
    width: 85%;
    text-align: center;
    margin-top: 0.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
`
const EstimatedTime = styled.p`
    margin-top: 1vh;
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #798094;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const ThinkingContainer = styled.div`
    margin-top: 1rem;
    padding-bottom: 3.5rem;
`;

const Texts = styled.div`
  color: black; 
  width: 75%;
  margin-top: 1.2rem; 
  font-weight: 500;
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;