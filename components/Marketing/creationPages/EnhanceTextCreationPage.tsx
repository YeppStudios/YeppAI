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

interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const EnhanceTextCreationPage = ({back, query}: any) => {

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true);
    const [instruction, setInstruction] = useState("");
    const [prompt, setPrompt] = useState<string>();
    const [preprompt, setPrePrompt] = useState<string>();
    const userPlan = useSelector(selectedPlanState);
    const [key, setKey] = useState(0);
    const [title, setTitle] = useState('');
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
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
        setPrompt(`Act as an editor. Take content in quotes "${content}" and ${instruction}. Make sure it gives the desired feeling for the reader. Start with a thorough analysis of the existing content (content in quotes, not the context given by the user), considering factors like readability, structure, grammar, style, and coherence. Then, make edits that highlight the strengths of the content while simultaneously addressing any weaknesses. Consider adding additional detail, clarifying language, restructuring, and rephrasing to create a cohesive and concise result that appeals to your target audience. While editing, ensure the desired tone of voice is consistent across the content to maintain the desired feeling, which should resonate throughout. Finally, review the revised content to ensure it aligns with the original goal of the quoted content. Reply only with the edited that was previously in quotes.`);
        setTitle("Text enhancement");
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
                        <InputContainer width="100%">
                            <Label>
                                Text to enhance
                            </Label>
                            <TextArea
                                id="content-field"
                                height= "12rem"
                                padding="0.5rem"
                                placeholder="Hello, because of..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                How to enhance it?
                            </Label>
                            <Input
                                id="instruction-field"
                                height= "2.8rem"
                                padding="0.5rem"
                                placeholder="make this email feel more professional..."
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
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
                                    Enhance content
                                </div>
                                }
                            </GenerateBtn>
                        </div>
                    </Form>
                    </div>
                </FormContainer>
                }
            <ResultsContainer trigger={key} about={content + " " + instruction} initialPrompt={prompt} resultsType={query.type} query={query} preprompt={preprompt}  title={title} count={1} stopLoading={() => setLoading(false)}/>
        </PageContent>
    )
}

export default EnhanceTextCreationPage;