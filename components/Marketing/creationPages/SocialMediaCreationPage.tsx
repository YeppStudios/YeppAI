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

interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const contentLength = ["Krótki", "Średni", "Długi"];
const postTypes = ["Edukacyjny", "Informacyjny", "Reklamowy", "Lifestyle"];
const styles = ["Formalny 💼", "Przyjazny 😊", "Treściwy 📃", "Przekonujący 🫵🏼", "Motywacyjny 📈"];
const languages = ["Polski", "Angielski", "Hiszpański", "Francuski", "Włoski", "Niemiecki", "Chiński", "Bułgarski", "Rosyjski", "Ukraiński"];
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1F300}-\u{1F5FF}]/gu;

const SocialMediaCreationPage = ({back, query}: any) => {

    const [completionLength, setCompletionLength] = useState("Średni");
    const [postType, setPostType] = useState("Reklamowy");
    const [style, setStyle] = useState("Przyjazny 😊");
    const [about, setAbout] = useState("");
    const [language, setLanguage] = useState("Polski");
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
        if(completionLength === "Krótki") {
            replyLength = "in around 25 words"
        } else if (completionLength === "Długi") {
            replyLength = "in around 125 words"
        } else if (completionLength === "Bardzo długi") {
            replyLength = "that is minimum 200 words long"
        }
        if (query.type === "Twitter") {
            replyLength = "in around 90 characters"
            if(completionLength === "Krótki") {
                replyLength = "in around 50 characters"
            } else if (completionLength === "Długi") {
                replyLength = "in around 150 characters"
            } else if (completionLength === "Bardzo długi") {
                replyLength = "in around 250 characters"
            }
        }

        setPrompt(`You are an experienced social media content creator. Write exactly 1 unique ${postType} post on ${query.type} about ${about} ${replyLength}. Make sure to write it in ${style.replace(emojiRegex, '')} tone of voice. The post should draw attention of ${targetAudience} and should sound totally natural and casual as if it was written by human. Don't address the target audience directly, but rather speak within their interests. Make sure everything you write is in ${language} language. Appropriately adjust content to the audience group.`)
        setTitle(`Wygenerowanie wpisu- ${query.type}`)
    }

    return (
        <PageContent>
            {!mobile &&  
                <BackBtn onClick={back}>
                    <BackBtnIcon>
                        <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                    </BackBtnIcon> 
                    <BackBtnText>Wróć</BackBtnText>
                </BackBtn>
            }
                {query.type && 
                <FormContainer>
                    {mobile &&
                    <BackBtn onClick={back}>
                        <BackBtnIcon>
                            <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                        </BackBtnIcon> 
                        <BackBtnText>Wróć</BackBtnText>
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
                        {query.type === "Twitter" ?
                            <Label>
                                Długość tweeta
                            </Label>     
                            :
                            <Label>
                                Długość posta
                            </Label>                        
                            }
                            <Dropdown
                                width="100%"
                                id="name"
                                type="text"
                                placeholder="Piotr"
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
                                Rodzaj tweeta
                            </Label>     
                            :
                            <Label>
                                Rodzaj posta
                            </Label>                        
                            }

                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="Reklamowy"
                                required
                                value={postType}
                                values={postTypes}
                                onChange={setPostType}
                                error={undefined}
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <Label>
                                Ton wypowiedzi
                            </Label>
                            <Dropdown
                                id="name"
                                type="text"
                                placeholder="Przyjazny 😊"
                                required
                                value={style}
                                values={styles}
                                onChange={setStyle}
                                error={undefined}
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <Label>
                                Język
                            </Label>
                            <Dropdown
                                id="languages"
                                type="text"
                                placeholder="Facebook"
                                required
                                value={language}
                                values={languages}
                                onChange={setLanguage}
                                error={undefined}
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Napisz o...
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "4.2rem"
                                padding="0.5rem"
                                placeholder="o nowej ofercie pracy na stanowisku full stack developera"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                Grupa docelowa
                            </Label>
                            <TextArea
                                id="target-adience-field"
                                height= "2.6rem"
                                padding="0.5rem"
                                placeholder="młodzi, początkujący programiści"
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
                                    Wyczaruj treści
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