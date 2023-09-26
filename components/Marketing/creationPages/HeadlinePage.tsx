import styled from "styled-components";
import backIcon from "../../../public/images/backArrow.png";
import Image from "next/image";
import magicalWand from "../../../public/images/magical_wand.png";
import { FormEvent, useEffect, useState } from "react";
import Dropdown from "../../forms/Dropdown";
import ResultsContainer from "../../Common/ResultsContainer";
import PageContent from "@/components/Common/PageContent";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import BackBtnText from "@/components/Common/BackBtnText";
import FormContainer from "@/components/Common/FormContainer";
import Form from "@/components/Common/Form";
import InputContainer from "@/components/Common/InputContainer";
import Label from "@/components/Common/Label";
import TextArea from "@/components/forms/TextArea";
import GenerateBtn from "@/components/Common/GenerateBtn";
import BtnIcon from "@/components/Common/BtnIcon";
import { BsStars } from "react-icons/bs";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import Input from "@/components/forms/Input";
import PersonaDropdown from "@/components/forms/PersonaDropdown";
import api from "@/pages/api";
import CustomDropdown from "@/components/forms/CustomDropdown";
interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const languages = [
    "English",
    "Spanish",
    "French",
    "Italian",
    "Portuguese",
    "German",
    "Ukrainian",
    "Polish",
    "Chinese",
    "Bulgarian",
    "Russian",
    "Japanese",
    "Turkish",
    "Greek",
    "Arabic",
    "Dutch",
    "Norwegian",
    "Serbian",
    "Swedish",
    "Czech",
    "Romanian",
    "Finnish",
    "Hungarian",
    "Hindi"
  ];
const count = [1, 3, 5]
const types = ["Product", "Service", "Event", "Feature"]
const googleTypes = ["Blog", "Landing page", "Product", "Article", "Ranking"]

const SocialMediaCreationPage = ({back, query, template}: any) => {

    const [targetAudience, setTargetAudience] = useState("");
    const [language, setLanguage] = useState("English");
    const [type, setType] = useState("Product");
    const [about, setAbout] = useState("");
    const [examplesNumber, setExamplesNumber] = useState(3);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState<string>();
    const userPlan = useSelector(selectedPlanState);
    const [preprompt, setPrePrompt] = useState<string>();
    const [keywords, setKeywords] = useState("");
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [key, setKey] = useState(0);
    const [title, setTitle] = useState('');
    const [mobile, setMobile] = useState(false);
    const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");
    const [personas, setPersonas] = useState<any[]>([]);

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setMobile(true);
        }
        if (localStorage.getItem("country") === "Poland") {
            setLanguage("Polish");
        }
        let token = localStorage.getItem("token");
        const fetchPersona = async () => {
            try {
              const personaResponse = await api.get<{title: string, icon: string}[]>(`/personas/owner`, {
                headers: {
                  Authorization: token,
                }
              });
              setPersonas(personaResponse.data);
            } catch (e) {
              console.log(e);
            }
          }
      
          fetchPersona();
    }, [])

    const generateContent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKey((prevKey) => prevKey + 1);
        setLoading(true);
        const personaText = selectedPersonaPrompt ? selectedPersonaPrompt : "";
        let length = "28"
        if (template.title === "Facebook Ad Headline") {
            length = "38";
        } else if (template.title === "Google Ads Headlines") {
            length = "28"
        } else if (template.title === "Video Title" || template.title === "Meta Title") {
            length = "60"
        } else if (template.title === "Twitter Ad Headline" || template.title === "LinkedIn Ad Headline") {
            length = "65"
        }

        let keywordsPrompt = "";
        if (keywords) {
            keywordsPrompt = `Firstly please closely analyze these keywords and include some only if they really fit in: ${keywords}.`
        }

        setPrompt(`${personaText} Act as a professional ${language} ${template.title} copywriter. 
        Your end goal is to create exactly ${examplesNumber} unique ${template.title} for "${about}". ${keywordsPrompt}
        Next ensure that each header is less than exactly ${length} characters long- not even a single character more and and is written in ${language} language. 
        Next off make sure it is strictly compliant with ${template.title} guidelines and encourages users to engage with the ${type.toLowerCase()}. 
        Then conduct proper market research, and start by understanding your target audience of ${targetAudience}, their demographics, and interests. 
        Once you have a deep understanding of the audience, come up with ${examplesNumber} compelling and catchy headlines that will grab their attention and entice them to click. 
        Avoid making false promises and ensure that the header accurately reflect what ${type.toLowerCase()} has to offer. 
        You NEVER use emojis as you think there is no place for them in ${template.title}.`)
    }
    
    const handlePersonaChange = (title: string) => {
        setTargetAudience(title);
        try {
            const persona = personas.find((p: any) => p.title === title);
            if (persona.prompt) {
              setSelectedPersonaPrompt(persona.prompt);
            } else {
              setSelectedPersonaPrompt("");
            }
          } catch (e) {
            console.log(e);
          }
      };


    return (
        <PageContent>
            {openNoElixirModal && <NoElixir  onClose={() => setOpenNoElixirModal(false)} />}
            {!mobile &&  
                <BackBtn onClick={back}>
                    <BackBtnIcon>
                        <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                    </BackBtnIcon> 
                    <BackBtnText>Back</BackBtnText>
                </BackBtn>
            }
            {template &&
                <FormContainer>
                {mobile &&
                    <BackBtn onClick={back}>
                        <BackBtnIcon>
                            <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                        </BackBtnIcon> 
                        <BackBtnText>Back</BackBtnText>
                    </BackBtn>
                    }
                    <div>
                    <Form onSubmit={(e) => generateContent(e)}>
                        {(userPlan && userPlan._id !== "647895cf404e31bfe8753398") &&
                        <InputContainer width="100%">
                            <FoldersDropdown />
                        </InputContainer>
                        }
                        <InputContainer width="50%">
                            <Label>
                                Number of examples
                            </Label>
                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="1"
                                required
                                value={examplesNumber}
                                values={count}
                                onChange={setExamplesNumber}
                                error={undefined}
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <Label>
                                Language
                            </Label>
                            <CustomDropdown
                                id="name"
                                type="text"
                                placeholder="English"
                                required
                                value={language}
                                values={languages.sort()}
                                onChange={setLanguage}
                                error={undefined}
                            />
                        </InputContainer>
                        {(template.title === "Google Ads Headlines" || template.title === "Meta Title") ?
                        <InputContainer width="50%">
                            <Label>
                                Type
                            </Label>
                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="Product"
                                required
                                value={type}
                                values={googleTypes}
                                onChange={setType}
                                error={undefined}
                            />
                        </InputContainer>
                        :
                        <InputContainer width="50%">
                            <Label>
                                What is it about?
                            </Label>
                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="Product"
                                required
                                value={type}
                                values={types}
                                onChange={setType}
                                error={undefined}
                            />
                        </InputContainer>
                        }
                        <InputContainer width="50%">
                            <Label>
                                Target audience / persona
                            </Label>
                            <PersonaDropdown
                                values={personas}
                                value={targetAudience}
                                onChange={handlePersonaChange}
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                About {type}...
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "4.2rem"
                                padding="0.5rem"
                                placeholder="Paste the content or describe what you want to generate the headline for..."
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Keywords (optional)
                            </Label>
                            <Input
                                id="keywords-field"
                                height= "2.6rem"
                                padding="0.5rem"
                                placeholder="marketing, ai, generative ai"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </InputContainer>
                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                        <GenerateBtn className="generate-content-btn">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.2rem"}}>
                                    <TypingAnimation  colorful={false}/>
                                </div>
                                :
                                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                    <BtnIcon>
                                        <BsStars style={{width: "100%", height: "auto"}}/>
                                    </BtnIcon>
                                    Generate content
                                </div>
                                }
                            </GenerateBtn>
                        </div>
                    </Form>
                    </div>
                </FormContainer>
                }
            <ResultsContainer 
            trigger={key} 
            about={about} 
            initialPrompt={prompt} 
            resultsType={query.type} 
            query={query}
            count={1} 
            template={template} 
            stopLoading={() => setLoading(false)}
            />
        </PageContent>
    )
}

export default SocialMediaCreationPage;

