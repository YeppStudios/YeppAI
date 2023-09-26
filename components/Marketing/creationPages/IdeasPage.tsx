import Form from "@/components/Common/Form";
import FormContainer from "@/components/Common/FormContainer";
import PageContent from "@/components/Common/PageContent";
import ResultsContainer from "@/components/Common/ResultsContainer";
import BtnIcon from "@/components/Common/BtnIcon";
import React, { FormEvent, useEffect, useState } from "react";
import InputContainer from "@/components/Common/InputContainer";
import TextArea from "@/components/forms/TextArea";
import GenerateBtn from "@/components/Common/GenerateBtn";
import { BsStars } from "react-icons/bs";
import styled from "styled-components";
import Dropdown from "@/components/forms/Dropdown";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import api from "@/pages/api";
import BackBtnText from "@/components/Common/BackBtnText";
import Image from "next/image";
import backIcon from "../../../public/images/backArrow.png";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import Label from "@/components/Common/Label";
import { useSelector, useDispatch } from "react-redux";
import { selectedPlanState } from "@/store/planSlice";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import Input from "@/components/forms/Input";
import CustomDropdown from "@/components/forms/CustomDropdown";
import PersonaDropdown from "@/components/forms/PersonaDropdown";

const languages = [
  "English",
  "Spanish",
  "French",
  "Italian",
  "Portugese",
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

const IdeaCreator = ({back, query, template}: any) => {

  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [numberOfIdeas, setNumberOfIdeas] = useState("3");
  const [prompt, setPrompt] = useState<string>();
  const [preprompt, setPrePrompt] = useState<string>();
  const [mobile, setMobile] = useState(false);
  const [userElixir, setUserElixir] = useState(0);
  const userPlan = useSelector(selectedPlanState);
  const [key, setKey] = useState(0);
  const [targetAudience, setTargetAudience] = useState("");
  const [language, setLanguage] = useState("English");
  const [tones, setTones] = useState<any[]>([]);
  const [personas, setPersonas] = useState<any[]>([]);
  const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");

  useEffect(() => {
    if(window.innerWidth <= 1023){
        setMobile(true);
    }
    if (localStorage.getItem("country") === "Poland") {
      setLanguage("Polish");
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
      const fetchUserElixir = async () => {
        const elixirResponse = await api.get(`/balance/${userId}`, {
                headers: {
                  authorization: token
                },
              });
            setUserElixir(elixirResponse.data.balance)
        }
        fetchUserElixir();

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
  }, []);

  const generateContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey((prevKey) => prevKey + 1);
    setLoading(true);
    const personaText = selectedPersonaPrompt ? selectedPersonaPrompt : "";
    if (query.page === "hashtags") {
      setPrompt(`${personaText} Act as a hashtag generator. Come up with ${numberOfIdeas} excellent hashtags for ${idea}. Ensure each hashtag is specific, well-considered, feasible but generic enough for people to casually search it. Try to think outside the box, and craft on the best performing ${template.title}. Finally, provide only a comprehensive list of just ${numberOfIdeas} simple hashtags perfectly suited for the niche and ${targetAudience} target audience. Make sure the ideas are written correctly in ${language} language.`);
    } else if (template.title === "Video Ideas") {
      setPrompt(`${personaText} Act as an experienced, creative YouTuber come up with ${numberOfIdeas} excellent YouTube video ideas for ${idea}. Ensure each suggestion is specific, well-considered, and feasible. Try to think outside the box, and build on the original concept of ${idea}. Consider various angles, scenarios, and applications that could be utilized in different contexts. Use your creativity and problem-solving skills to identify areas where ${idea} can be improved, modified, or taken beyond the existing conceptual boundaries to capture the attention of ${targetAudience}. Finally, provide a comprehensive summary of each YouTube video idea as a numbered list, highlighting the title, key scenes, outline, and potential impact. Make sure the ideas are written correctly in ${language} language.`)
    } else if (template.title === "TikTok hooks") {
      setPrompt(`${personaText} Act as an experienced, viral and creative TikToker come up with ${numberOfIdeas} excellent TikTok hook ideas for ${idea}. Ensure each suggestion is specific, well-considered, and feasible. Use your creativity and problem-solving skills to identify areas where ${idea} can be improved, modified, or taken beyond the existing conceptual boundaries to get the precious attention of ${targetAudience} immediately. Finally, provide a comprehensive numbered list of each viral TikTok hooks with potential TikTok content description. Make sure the ideas are written correctly in ${language} language.`)
    } else if (template.title === "Subject Lines") {
      setPrompt(`${personaText} Act as an experienced and creative email marketer come up with ${numberOfIdeas} excellent email title ideas for ${idea}. Ensure each title is specific, well-considered, feasible and worth the ${targetAudience} attention. Use your creativity and problem-solving skills to identify areas where ${idea} can be improved, modified, or taken beyond the existing conceptual boundaries to get the precious attention of the audience immediately. Finally, provide a comprehensive numbered list of each viral TikTok hooks with potential TikTok content description. Make sure the ideas are written correctly in ${language} language.`)
    } else if (template.title === "Google Ads Keywords") {
      setPrompt(`${personaText} Act as Google Keywords Planner come up with ${numberOfIdeas} excellent keyword ideas for ${idea}. Ensure each keyword matches the topic, has high chance of good conversion, has a good search/competition ratio and will rank well on Google. Make sure it is worth the ${targetAudience} attention. Make sure the keywords are written correctly in ${language} language. Respond with numbered list of keywords. Make sure they are no longer than 30 characters and strictly follow Google Ads guidelines. Make sure these are keywords, not the entire headlines. Do not quote them.`)
    } else {
      setPrompt(`${personaText} Act as a ${language} idea generator. Come up with ${numberOfIdeas} excellent ideas for ${idea}. Ensure each suggestion is specific, well-considered, and feasible. Try to think outside the box, and build on the original concept of ${idea}. Consider various angles, scenarios, and applications that could be utilized in different contexts. Use your creativity and problem-solving skills to identify areas where ${idea} can be improved, modified, or taken beyond the existing conceptual boundaries. Finally, provide a comprehensive summary of each idea, highlighting the key features, benefits, and potential impact. Make sure that all ideas are written correctly in ${language} language.`);
    }
    
    setTitle(numberOfIdeas + " " + template.title)

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
                    <Form onSubmit={(e) => generateContent(e)}>
                        {(userPlan && userPlan._id !== "647895cf404e31bfe8753398") &&
                        <InputContainer width="100%">
                            <FoldersDropdown />
                        </InputContainer>
                        }
                      <InputContainer width="100%">
                      <Prompt>
                        Come up with  
                        <DropdownContainer>
                          <Dropdown values={["3", "5", "10"]} value={numberOfIdeas} onChange={setNumberOfIdeas} error={undefined}/>
                        </DropdownContainer>
                        {query.page === "hashtags" && 
                        <>
                        {template.title.includes("Instagram") && <p>best Instagram hashtags for:</p>}
                        {template.title.includes("Google") && <p>best Google hashtags for:</p>}
                        </>
                        }
                        {template.title === "Video Ideas" && "YouTube video ideas for:"}
                        {template.title === "Video Ad Idea" && "YouTube video ad ideas for:"}
                        {template.title === "TikTok hooks" && "TikTok hook ideas for:"}
                        {template.title === "Subject Lines" && "best subject lines for:"}
                        {template.title === "Creative Ideas" && "best, creative ideas for:"}
                        {(template.title === "Google Ads Keywords") && "best Google Keywords for:"}
                        {template.page === "ideas" && "unique ideas for:"}
                      </Prompt>
                      </InputContainer>
                        <InputContainer width="100%">
                            <TextArea
                                id="idea-field"
                                height= "6rem"
                                padding="0.6rem"
                                placeholder="describe what to generate your ideas for.."
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                required
                            />
                        </InputContainer>
                        {template.title !== "Creative Ideas" &&
                        <InputContainer width="50%">
                          <Label>Target audience / persona</Label>
                          <PersonaDropdown
                              values={personas}
                              value={targetAudience}
                              onChange={handlePersonaChange}
                            />
                        </InputContainer>
                        }
                        <InputContainer width="50%">
                          <Label>Language</Label>
                          <CustomDropdown
                            id="languages"
                            type="text"
                            placeholder="English"
                            required
                            value={language}
                            values={languages.sort()}
                            onChange={setLanguage}
                          />
                        </InputContainer>
                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                        <GenerateBtn className="generate-ideas-btn">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.2rem"}}>
                                    <TypingAnimation colorful={false}/>
                                </div>
                                :
                                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                    <BtnIcon>
                                        <BsStars style={{width: "100%", height: "auto"}}/>
                                    </BtnIcon>
                                    Generate ideas
                                </div>
                                }
                            </GenerateBtn>
                        </div>
                    </Form>
                </FormContainer>
                }
            <ResultsContainer 
            trigger={key} 
            about={idea} 
            template={template} 
            initialPrompt={prompt} 
            resultsType="ideas" 
            query={{}} 
            count={Number(numberOfIdeas)} 
            stopLoading={() => setLoading(false)}
            />
        </PageContent>

  )
}

export default IdeaCreator;


const Prompt = styled.div`
  color: black;
  font-weight: 500;
  display: flex;
  align-items: center;
`

const DropdownContainer = styled.div`
  margin: 0 1vw 0 1vw;
  @media (max-width: 1023px) {
    margin: 0 3vw 0 3vw;
}
`