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
import ToneDropdown from "@/components/forms/ToneDropdown";

interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}

const toneList = [
    {title: "Formal", icon: "💼"},
    {title: "Friendly", icon: "😊"},
    {title: "Informative", icon: "📚"},
    {title: "Persuasive", icon: "🫵🏼"},
    {title: "Motivational", icon: "📈"},
  ];

const EnhanceTextCreationPage = ({back, query, template}: any) => {

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [instruction, setInstruction] = useState("");
    const [prompt, setPrompt] = useState<string>();
    const [selectedToneTitle, setSelectedToneTitle] = useState("Friendly 😊");
    const [selectedTonePrompt, setSelectedTonePrompt] = useState("");
    const [tones, setTones] = useState<any[]>([]);
    const [preprompt, setPrePrompt] = useState<string>();
    const userPlan = useSelector(selectedPlanState);
    const [key, setKey] = useState(0);
    const [title, setTitle] = useState('');
    const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [completionLength, setCompletionLength] = useState(50);

    useEffect(() => {
        if (window.innerWidth < 1023) {
            setMobile(true);
        }

        let token = localStorage.getItem("token");
        let profileId = localStorage.getItem("profile_id");

        const fetchTone = async () => {
          let url = "/tones/owner";
          if (profileId) {
                url = `/profile_tones/${profileId}`
          }
          try {
            const toneResponse = await api.get<{title: string, icon: string}[]>(url, {
              headers: {
                Authorization: token,
              }
            });
            setTones([...toneResponse.data, ...toneList]);
          } catch (e) {
            console.log(e);
          }
        }
    
        fetchTone();
    }, [])

    const handleToneChange = (title: string) => {
        setSelectedToneTitle(title);
        const tone = tones.find((t: any) => t.title === title);
        try {
          if (tone.prompt) {
            setSelectedTonePrompt(tone.prompt);
          } else if (tone.title) {
            setSelectedTonePrompt(tone.title);
          } else {
            setSelectedTonePrompt(title);
          }
        } catch (e) {
          setSelectedTonePrompt(title);
        }
      };
    
    const generateContent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setKey((prevKey) => prevKey + 1);
        setPrompt("");
        setLoading(true);
        if (selectedTonePrompt) {
            setPrompt(`Please come up with unique ${template.title.toLowerCase()} to message client sent us: "${content}". 
            Your goal is to ${instruction}.
            Make sure it gives the desired feeling for the reader.
            Write it in the following tone of voice: ${selectedTonePrompt} 
            Return ready response in our client's language that is no longer than ${completionLength} words:
            `)
        } else {
            setPrompt(`Act as a friendly social media manager and professional customer support with years of experience. Here is the message client sent us: "${content}". 
            Start with a thorough analysis of the client's message in quotes and considering factors like readability, structure, grammar, style, and coherence please politely write an ${template.title.toLowerCase()} and ${instruction} in ${selectedToneTitle} tone of voice within no more than ${completionLength} words. 
            Make sure it gives the desired feeling for the reader.
            While editing, ensure the desired tone of voice is consistent across the content to maintain the desired feeling, which should resonate throughout. 
            Finally, review the revised content and ensure it is in the client's language and that it aligns with the the quoted message. Reply only with the response to the client's message that was quoted and do not use emojis. `);
        }

        setTitle(template.title)
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
                        <InputContainer width="100%">
                            <Label>
                                Client&apos;s message
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
                        <InputContainer width="50%">
                            <Label>Tone of voice</Label>
                            <ToneDropdown
                                values={tones}
                                value={selectedToneTitle}
                                onChange={handleToneChange}
                            />
                        </InputContainer>
                        <InputContainer width="50%">
                            <div className="flex justify-between">
                            <Label className="text-center">Words</Label>
                            {inputError && (
                                <p className="text-red-400 text-sm">Minimum 20 words</p>
                            )}
                            </div>
                            <Input
                            height="2.8rem"
                            padding="0.4rem"
                            type="number"
                            onChange={(e) => setCompletionLength(e.target.valueAsNumber)}
                            onBlur={() => {
                                const minValue = 20;
                                if (completionLength < minValue) {
                                setInputError(true);
                                setCompletionLength(100);
                                } else {
                                setInputError(false);
                                }
                            }}
                            value={completionLength}
                            />
                        </InputContainer>
                        <InputContainer width="100%">
                            <Label>
                                What to reply?
                            </Label>
                            <Input
                                id="instruction-field"
                                height= "2.8rem"
                                padding="0.5rem"
                                placeholder="apologise and offer a discount of 10%..."
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
            <ResultsContainer 
                trigger={key} 
                about={content + " " + instruction} 
                initialPrompt={prompt} 
                resultsType={query.type} 
                query={query} 
                template={template} 
                count={1} 
                stopLoading={() => setLoading(false)}
            />
        </PageContent>
    )
}

export default EnhanceTextCreationPage;