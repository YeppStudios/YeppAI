import styled from "styled-components";
import backIcon from "../../../public/images/backArrow.png";
import Image from "next/image";
import magicalWand from "../../../public/images/magical_wand.png";
import { FormEvent, useEffect, useState } from "react";
import Dropdown from "../../forms/Dropdown";
import ResultsContainer from "../../Common/ResultsContainer";
import PageContent from "../../Common/PageContent";
import FormContainer from "../../Common/FormContainer";
import BackBtn from "../../Common/BackBtn";
import GenerateBtn from "../../Common/GenerateBtn";
import Form from "../../Common/Form";
import Label from "../../Common/Label";
import InputContainer from "../../Common/InputContainer";
import TextArea from "../../forms/TextArea";
import BackBtnText from "../../Common/BackBtnText";
import BackBtnIcon from "../../Common/BackBtnIcon";
import BtnIcon from "../../Common/BtnIcon";
import { BsStars } from "react-icons/bs";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import api from "@/pages/api";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import Input from "@/components/forms/Input";
import CustomDropdown from "@/components/forms/CustomDropdown";
import PersonaDropdown from "@/components/forms/PersonaDropdown";

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

const FrameworkCreationPage = ({back, query, template}: any) => {

    const [about, setAbout] = useState("");
    const [language, setLanguage] = useState("English");
    const [targetAudience, setTargetAudience] = useState("");
    const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState<string>();
    const [preprompt, setPrePrompt] = useState<string>();
    const userPlan = useSelector(selectedPlanState);
    const [key, setKey] = useState(0);
    const [title, setTitle] = useState('');
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [mobile, setMobile] = useState(false);
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
        setPrompt("");
        setLoading(true);
        const personaText = selectedPersonaPrompt ? selectedPersonaPrompt : "";
        if (template.title === "BAB Framework") {
            setPrompt(`${personaText} Develop a Before-After bridge framework analysis that showcases how your ${name}- ${about} can benefit its customers. Start by identifying and describing the "before" state or situation - what are the current problems, challenges, and limitations that ${targetAudience} face in their day to day operations? Then, paint a clear picture of the "after" state, highlighting the benefits, capabilities, and improvements that ${name} brings to the table. Be detailed, precise, and articulate in your descriptions, explaining how specific features and functionalities of the platform alleviate pain points and enhance marketing performance. Lastly, provide comprehensive conclusion on how ${name} can have real impact on everyday life of ${targetAudience} and solve their problems. Make sure to write it in ${language} language.`)
        }
        if (template.title === "PAS Framework") {
            setPrompt(`${personaText} Act as a professional copywriter. Utilize the PAS (Problem-Agitate-Solve) formula to develop a comprehensive analysis of your ${name} product - ${about}. Begin by identifying the problem your product solves and address the pain points that customers may have before using it. 

            Next, dig deep into the problems that ${targetAudience} faces and highlight the anxiety that can arise as a result of their lack of success. Use this opportunity to demonstrate how ${name} can help alleviate these problems by showing how it addresses those pain points. 
            
            Finally, present solutions by showing how ${name} is the answer to those problems. Highlight its superior features, reliability, ease of use, and other core benefits that set it apart from other similar products on the market. Through your PAS analysis, seek to position ${name} as a must-have product for any ${targetAudience}. Make sure to write it in ${language} language.`)
        }
        if (template.title === "AIDA Framework") {
            setPrompt(`${personaText} Act as a professional marketer. Conduct an AIDA (Attention, Interest, Desire, Action) analysis for ${name}, your ${about}, which target audience are ${targetAudience}. To start, analyze each stage of the AIDA model, beginning with Attention. Come up with creative ideas on how to grab your target customers' attention. Once the customer is hooked, focus on creating interest by highlighting the benefits and features of the ${name}, emphasizing how it solves the ${targetAudience} pain points and problems. Next, create a desire by using persuasive language and promoting how ${name} can make a notable difference for ${targetAudience}. And lastly, devise a strategy that encourages the customer to take the necessary action(s). This includes providing clear calls to action, demonstrating the product's or company's usability and results, and building trust with potential customers. Make sure to write it in ${language} language.`)
        }
        setTitle(template.title)
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
                                Company / product name
                            </Label>
                            <Input
                                id="name"
                                height= "2.6rem"
                                padding="0.5rem"
                                placeholder="Yepp AI"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <Label>
                                Language
                            </Label>
                            <CustomDropdown
                                id="languages"
                                type="text"
                                placeholder="English"
                                required
                                value={language}
                                values={languages.sort()}
                                onChange={setLanguage}
                                error={undefined}
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Company / product description
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "8rem"
                                padding="0.5rem"
                                placeholder="with this intuitive SaaS you will generate tailored marketing content."
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Target audience / persona
                            </Label>
                            <PersonaDropdown
                                values={personas}
                                value={targetAudience}
                                onChange={handlePersonaChange}
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
            about={name + " " + about} 
            template={template} 
            initialPrompt={prompt} 
            resultsType={query.type} 
            query={query} 
            count={1} 
            stopLoading={() => setLoading(false)}
            />
        </PageContent>
    )
}

export default FrameworkCreationPage;