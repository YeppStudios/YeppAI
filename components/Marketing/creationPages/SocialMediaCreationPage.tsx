import styled from "styled-components";
import backIcon from "../../../public/images/backArrow.png";
import Image from "next/image";
import magicalWand from "../../../public/images/magical_wand.png";
import { FormEvent, use, useEffect, useState } from "react";
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


interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const contentLength = ["Short", "Medium", "Long"];
const postTypes = ["Educational", "Informative", "Advertisement", "Lifestyle"];
const tones = ["Formal 💼", "Friendly 😊", "Informative 📃", "Persuasive 🫵🏼", "Motivational 📈"];
const languages = [ "English", "Spanish", "French", "Italian", "German", "Ukrainian", "Polish", "Chinese", "Bulgarian", "Russian"];
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1F300}-\u{1F5FF}]/gu;

const SocialMediaCreationPage = ({back, query}: any) => {

    const [completionLength, setCompletionLength] = useState("Medium");
    const [postType, setPostType] = useState("Advertisement");
    const [tone, setTone] = useState("Friendly 😊");
    const [about, setAbout] = useState("");
    const [language, setLanguage] = useState("English");
    const [targetAudience, setTargetAudience] = useState("");
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [prompt, setPrompt] = useState<string>();
    const [preprompt, setPrePrompt] = useState<string>();
    const userPlan = useSelector(selectedPlanState);
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
        setPrompt("");
        setLoading(true);
        let replyLength = "in around 60 words"
        if(completionLength === "Short") {
            replyLength = "in around 25 words"
        } else if (completionLength === "Long") {
            replyLength = "in around 125 words"
        } else if (completionLength === "Very long") {
            replyLength = "that is minimum 200 words long"
        }
        if (query.type === "Twitter") {
            replyLength = "in around 90 characters"
            if(completionLength === "Short") {
                replyLength = "in around 50 characters"
            } else if (completionLength === "Long") {
                replyLength = "in around 150 characters"
            } else if (completionLength === "Very long") {
                replyLength = "in around 250 characters"
            }
        }

        let useEmojis= "Adjust the use emojis appropriately to the tone"
        if (tone.includes("Formal")) {
            useEmojis = "Do not use emojis"
        }

        setPrompt(`You are an experienced social media content creator. Write exactly 1 unique ${postType} post on ${query.type} about ${about} ${replyLength}. Make sure to write it in ${tone.replace(emojiRegex, '')} tone of voice. ${useEmojis} The post should draw attention of ${targetAudience} and should sound totally natural and casual as if it was written by human. Don't address the target audience directly, but rather speak within their interests. Make sure everything you write is in ${language} language. Appropriately adjust content to the audience group.`)
        setTitle(`Generated post- ${query.type}`)
    }

    return (
        <PageContent>
            {!mobile &&  
                <BackBtn onClick={back}>
                    <BackBtnIcon>
                        <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                    </BackBtnIcon> 
                    <BackBtnText>Back</BackBtnText>
                </BackBtn>
            }
                {query.type && 
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
                                Content length
                            </Label>                        
                            <Dropdown
                                width="100%"
                                id="name"
                                type="text"
                                placeholder="100 words"
                                required
                                value={completionLength}
                                values={contentLength}
                                onChange={setCompletionLength}
                                error={undefined}
                            />
                        </InputContainer>              
                        <InputContainer width="50%">
                            {query.type === "Twitter" ?
                            <Label>
                                Tweet type
                            </Label>     
                            :
                            <Label>
                                Post type
                            </Label>                        
                            }
                            <CustomDropdown
                                id="name"
                                type="text"
                                placeholder="Advertising"
                                required
                                value={postType}
                                values={postTypes}
                                onChange={setPostType}
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <Label>
                                Tone of voice
                            </Label>
                            <CustomDropdown
                                id="tones"
                                type="text"
                                placeholder="Friendly 😊"
                                required
                                value={tone}
                                values={tones}
                                onChange={setTone}
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
                                values={languages}
                                onChange={setLanguage}
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Write about...
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "6.2rem"
                                padding="0.7rem"
                                placeholder="uploading data in yepp.ai app"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Target audience
                            </Label>
                            <Input
                                id="target-adience-field"
                                height= "2.6rem"
                                padding="0.7rem"
                                placeholder="marketing experts"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                                required
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
            <ResultsContainer trigger={key} about={about} initialPrompt={prompt} resultsType={query.type + "-post"} query={query} preprompt={preprompt}  title={title} count={1} stopLoading={() => setLoading(false)}/>
        </PageContent>
    )
}

export default SocialMediaCreationPage;