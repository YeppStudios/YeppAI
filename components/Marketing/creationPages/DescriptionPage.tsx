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
import api from "@/pages/api";
import PersonaDropdown from "@/components/forms/PersonaDropdown";
import CustomDropdown from "@/components/forms/CustomDropdown";
interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const styles = ["Professional 💼", "Friendly 😊", "Concise 📃", "Persuasive 🫵🏼", "Motivational 📈"];
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
const googleTypes = ["Blog", "Landing page", "Product", "Article", "Ranking"]

const SocialMediaCreationPage = ({back, query, template}: any) => {

    const [style, setStyle] = useState("Professinal 💼");
    const [product, setProduct] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [language, setLanguage] = useState("English");
    const [pros, setPros] = useState("");
    const [keywords, setKeywords] = useState("");
    const [type, setType] = useState("Product");
    const [examplesNumber, setExamplesNumber] = useState(3);
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState<string>();
    const [formLoading, setFormLoading] = useState(true);
    const userPlan = useSelector(selectedPlanState);
    const [preprompt, setPrePrompt] = useState<string>();
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
        if (template.title === "Meta Description" || template.title === "Google Ads Description") {
            setPrompt(`${personaText} Craft ${examplesNumber} unique ${template.title}s for ${type.toLowerCase()} called ${product}- ${productDescription}.
            Once you have a draft make sure that it is strictly compliant with Google guidelines and encourages users to engage with the ${type.toLowerCase()}. 
            Next conduct proper market research, and start by understanding your target audience of ${targetAudience}, their demographics, and interests. 
            Once you have a deep understanding of the audience, come up with compelling and catchy ${template.title.toLowerCase()} that will grab their attention and entice them to click. 
            Make sure to include clear value proposition and call-to-action to drive conversions. 
            Avoid making false promises and ensure that the ${template.title.toLowerCase()} accurately reflects the ${type.toLowerCase()}. 
            Based on previous steps come up with description that is no more than 150 characters long. Write it correctly in ${language} language.
            PS. You NEVER use emojis as you think there is no place for them in ${type.toLowerCase()}.`)
        } else {
            setPrompt(`${personaText} Craft a compelling ${style} tone of voice product description in ${language} language that will entice users to purchase a ${product}. 
            Begin by getting a thorough understanding of ${product} product considering ${productDescription}. Think of what separates it from other similar products on the market. 
            After that, focus on the unique selling points for the ${targetAudience} and get started on creating a persuasive copy that caters to their interests and needs. 
            Remember to keep the content informative, engaging and exciting without the use of any emojis. Your description should be long enough to educate users about the product and build excitement, 
            but also brief and straight to the point, highlighting its key features and benefits in a way that convinces the user that ${product} is the best choice for them. 
            Once you have a draft go through it and make sure there are no spelling or grammar mistakes and that it is written in ${language} language.`)
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
                        {(template.title === "Google Ads Description" || template.title === "Meta Description") &&
                        <InputContainer width="50%">
                            <Label>
                                Page Type
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
                        }
                        <InputContainer width="50%">
                            <Label>
                                {type === "Product" ? `${type} name` : `${type} title`}
                            </Label>
                            <Input
                                height= "2.8rem"
                                padding="0.4rem"
                                placeholder="iPhone 14 pro"
                                required
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            />
                        </InputContainer>
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
                        <InputContainer width={template.title === "Product Description" ? "50%" : "100%"}>
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
                                {type} description
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "5rem"
                                padding="0.5rem"
                                placeholder={`Brief description of the ${type.toLowerCase()}...`}
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Keywords (optional)
                            </Label>
                            <Input
                                id="about-field"
                                height= "2.8rem"
                                padding="0.5rem"
                                placeholder="marketing, ai, generative ai, revolution..."
                                value={pros}
                                onChange={(e) => setPros(e.target.value)}
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
            about={product + " " + productDescription} 
            template={template} 
            initialPrompt={prompt} 
            resultsType={query.type} 
            query={query} 
            count={1} 
            stopLoading={() => setLoading(false)}
            language={language}
            />
        </PageContent>
    )
}

export default SocialMediaCreationPage;

