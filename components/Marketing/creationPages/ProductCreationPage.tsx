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
interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const styles = ["Professional 💼", "Friendly 😊", "Concise 📃", "Persuasive 🫵🏼", "Motivational 📈"];
const languages = [ "English", "Spanish", "French", "Italian", "German", "Ukrainian", "Polish", "Chinese", "Bulgarian", "Russian"];
const count = [1, 3, 5]

const SocialMediaCreationPage = ({back, query}: any) => {

    const [style, setStyle] = useState("Professinal 💼");
    const [product, setProduct] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [language, setLanguage] = useState("English");
    const [pros, setPros] = useState("");
    const [keywords, setKeywords] = useState("");
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

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setMobile(true);
        }
    }, [])

    const generateContent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKey((prevKey) => prevKey + 1);
        setLoading(true);
        if (query.type.includes("google-ads")) {
            setPrompt(`You are a Google Ads professional copywriter. Your task is to create ${examplesNumber} unique Google Ads for a product named ${productName}- ${productDescription}. The Ads headers should be up to 30-characters long, and the descriptions should be up to 90-characters long, all written in ${language} language. The Ads created must be strictly compliant with Google Ads guidelines and should encourage users to engage with the product or service. Conduct proper market research, and start by understanding your target audience of ${targetAudience}, their demographics, and interests. Once you have a deep understanding of the audience, come up with compelling and catchy headlines that grab their attention and entice them to click. Write crispy descriptions that provide a clear value proposition and call-to-action to drive conversions. Avoid making false promises and ensure that the Ads accurately reflect the product capabilities or services offered. You NEVER use emojis as you think there is no place for them in google ad.`)
            setTitle(`Generated descripion- ${productName}`)
        } else {
            setPrompt(`CAct as a Copywriter. Craft a compelling ${style} tone of voice product description in ${language} language that will entice users to purchase a ${product}. Begin by getting a thorough understanding of ${pros} of the product, and what separates it from other similar products on the market. After that, focus on the unique selling points for the ${query.type} target audience and get started on creating a persuasive copy that caters to their interests and needs. Remember to keep the content informative, engaging and exciting without the use of any emojis. Your description should be long enough to educate users about the product and build excitement, but also brief and straight to the point, highlighting its key features and benefits in a way that convinces the user that this ${product} is the best choice for them. Once you have a draft go through it and make sure there are no spelling or grammar mistakes and that it is written in ${language} language.`)
            setTitle(`Generated descripion ${product}`)
        }

    }
    
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
                        {query.type !== "google-ads" &&
                        <InputContainer width="100%">
                            <Label>
                                What to describe
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
                        }
                        {query.type === "google-ads" &&
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
                        }
                        <InputContainer width="50%">
                            <Label>
                                Language
                            </Label>
                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="English"
                                required
                                value={language}
                                values={languages}
                                onChange={setLanguage}
                                error={undefined}
                            />
                        </InputContainer>
                        {query.type === "google-ads" &&
                        <InputContainer width="100%">
                            <Label>
                                Product name
                            </Label>
                            <Input
                                height= "2.8rem"
                                padding="0.4rem"
                                placeholder="iPhone 14 pro"
                                required
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </InputContainer>
                        }
                        {query.type === "google-ads" &&
                        <InputContainer width="100%">
                            <Label>
                                Product description (optional)
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "5rem"
                                padding="0.5rem"
                                placeholder="Always-on display, dynamic island, 120Hz..."
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            />
                        </InputContainer>
                        }
                        {query.type !== "google-ads" &&
                        <InputContainer width="100%">
                            <Label>
                                Key features / specs
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "6rem"
                                padding="0.5rem"
                                placeholder="Always-on display, dynamic island, 120Hz..."
                                value={pros}
                                onChange={(e) => setPros(e.target.value)}
                                required
                            />
                        </InputContainer>
                        }
                        {query.type === "google-ads" &&
                        <InputContainer width="100%">
                            <Label>
                                Target audience
                            </Label>
                            <Input
                                id="target-adience-field"
                                height= "2.6rem"
                                padding="0.5rem"
                                placeholder="young developers"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                required
                            />
                        </InputContainer>
                        }
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
            <ResultsContainer trigger={key} about={"O" + product + " " + productName + "firmy" + " " + productDescription} initialPrompt={prompt} resultsType={query.type} query={query} preprompt={preprompt} title={title} count={1} stopLoading={() => setLoading(false)}/>
        </PageContent>
    )
}

export default SocialMediaCreationPage;

