import styled from "styled-components";
import backIcon from "../../../public/images/backArrow.png";
import Image from "next/image";
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
import BackBtnText from "../../Common/BackBtnText";
import BackBtnIcon from "../../Common/BackBtnIcon";
import BtnIcon from "../../Common/BtnIcon";
import api from "@/pages/api";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import { BsStars } from "react-icons/bs";
import Centered from "../../Centered";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import Input from "@/components/forms/Input";
import CustomDropdown from "@/components/forms/CustomDropdown";
import PersonaDropdown from "@/components/forms/PersonaDropdown";

interface InputContainer {
  width: string;
}

const languages = [
  "English",
  "Spanish",
  "French",
  "Italian",
  "German",
  "Portugese",
  "Ukrainian",
  "Polish",
  "Chinese",
  "Bulgarian",
  "Russian",
];
const paragraphsCount = [1, 2, 3, 4, 5];

const SocialMediaCreationPage = ({ back, query, template }: any) => {
  const [style, setStyle] = useState("Friendly 😊");
  const [paragraphCount, setParagraphCount] = useState(3);
  const [completionLength, setCompletionLength] = useState(200);
  const [prompt, setPrompt] = useState<string>();
  const [preprompt, setPrePrompt] = useState<string>();
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [videoDuration, setVideoDuration] = useState("20 minutes");
  const userPlan = useSelector(selectedPlanState);
  const [cta, setCta] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [objective, setObjective] = useState("");
  const [key, setKey] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [personas, setPersonas] = useState<any[]>([]);
  const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");

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
  }, []);

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

  const generateContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey((prevKey) => prevKey + 1);
    setLoading(true);
    const token = localStorage.getItem("token");
    let replyLength = `Write it in just ${completionLength} words.`;
    const personaText = selectedPersonaPrompt ? selectedPersonaPrompt : "";
      if (template.title === "Video Scripts") {
        setPrompt(
          `${personaText} Act as an experienced director from Hollywood. Please write a professional high-level YouTube video script that should be around ${videoDuration || "5 minutes"} long about ${topic}. Make sure it is viral and easy to watch. 
          Make sure to carefully plan it, so that it will keep the audience engaged and curious throughout the entire video. 
          My target audience is ${targetAudience}, and my CTA is: "${cta}". Main objective of the video is to ${objective}. Make sure the script is written in ${language} language.`
        );
      } else if (template.title === "TikTok script") {
        setPrompt(`${personaText} Act as an experienced, creative and viral TikToker. Please write a professional high-level TikTok video script about ${topic}. Make sure it is viral and easy to watch. 
          Make sure to carefully plan it, so that it will first get the attention thanks to a catchy hook as well as keep the audience engaged and curious throughout the entire video. 
          My target audience is ${targetAudience}, and my CTA is: "${cta}". Main objective of this TikTok is to ${objective}. Make sure the script is written in ${language} language.`);
      } else if (template.title === "Newsletter Outline") {
        setPrompt(`${personaText} Act as a professional newsletter writer. Craft a creative and informative newsletter outline that captures the essence of ${topic}. It's main objective is to ${objective}. 
          The outline should be written in ${language} language that is accessible to the target audience, which is comprised of ${targetAudience}. Your outline should be engaging, informative, and provide value to the reader.
          To keep the readers interested, make sure to consider adding helpful tips, strategies, examples and some interesting facts related to ${topic}. Your newsletter outline should not only inform but also inspire and motivate them into taking action, but before the CTA forsee a summary section to give the audience some reflections.
          Once you have the first draft of the outline, read through it and ensure that everything is written in the language ${language}. Lastly, run a grammar and spell check to make sure that the outline is correct. Respond only with complete newsletter outline.`);
      } else if (query.type.includes("email")) {
        setPrompt(`${personaText} Act as a professional ${language} email marketer. Write an enticing and effective email campaign to increase engagement and drive sales about ${topic}. The target audience is ${targetAudience}. ${replyLength}

                Begin with a captivating subject line that grabs the reader's attention, then craft an opening that speaks directly to the reader's needs and emotions. Ensure that your tone of voice is ${style}. Use easy-to-understand language to explain why your product/service/brand is the best option available on the market and how it can help address the challenges and concerns of the reader. 
                
                Let the email flow with a narrative structure and avoid making it sound too pushy or aggressive. 
                
                Finally, add a "${cta}" call-to-action (CTA) at the end of the email directing the reader to take the desired action. Ensure that both title and body are written in ${language} language and is grammarly correct with no typos.`);
      }
    setTitle(template.title)
  };
  return (
    <PageContent>
      {openNoElixirModal && (
        <NoElixir onClose={() => setOpenNoElixirModal(false)} />
      )}
      {!mobile && (
        <BackBtn onClick={back}>
          <BackBtnIcon>
            <Image
              style={{ width: "100%", height: "auto" }}
              src={backIcon}
              alt={"logo"}
            ></Image>
          </BackBtnIcon>
          <BackBtnText>Back</BackBtnText>
        </BackBtn>
      )}
      {template && (
        <FormContainer>
          {mobile && (
            <BackBtn onClick={back}>
              <BackBtnIcon>
                <Image
                  style={{ width: "100%", height: "auto" }}
                  src={backIcon}
                  alt={"logo"}
                ></Image>
              </BackBtnIcon>
              <BackBtnText>Back</BackBtnText>
            </BackBtn>
          )}
          <div>
            <Form onSubmit={(e) => generateContent(e)}>
              {userPlan && userPlan._id !== "647895cf404e31bfe8753398" && (
                <InputContainer width="100%">
                  <FoldersDropdown />
                </InputContainer>
              )}
              {(template.title !== "Video Scripts" && template.title !== "TikTok script") &&
                <InputContainer width="50%">
                  <Label>Paragraphs</Label>
                  <Dropdown
                    width="100%"
                    id="name"
                    type="text"
                    placeholder="3"
                    required
                    value={paragraphCount}
                    values={paragraphsCount}
                    onChange={setParagraphCount}
                    error={undefined}
                  />
                </InputContainer>
                }
              <InputContainer width="50%">
                <Label>Language</Label>
                <CustomDropdown
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
              {template.title === "Video Scripts"  &&
              <InputContainer width="50%">
                  <Label>Video duration</Label>
                  <Input
                    id="topic-field"
                    height="2.8rem"
                    padding="0.5rem"
                    placeholder="20 minutes"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                    required
                  />
                </InputContainer>
              }
              <InputContainer width="100%">
                  <Label>Topic</Label>
                  <Input
                    id="topic-field"
                    height="2.8rem"
                    padding="0.5rem"
                    placeholder="AI revolution in marketing."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </InputContainer>
                <InputContainer width="100%">
                <Label>Main objective</Label>
                <Input
                  id="target-adience-field"
                  height="2.8rem"
                  padding="0.5rem"
                  placeholder="teach people how to use our solution"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  required
                />
              </InputContainer>
              <InputContainer width="50%">
              <Label>Target audience / persona</Label>
                <PersonaDropdown
                  values={personas}
                  value={targetAudience}
                  onChange={handlePersonaChange}
                />
              </InputContainer>
                <InputContainer width="50%">
                  <Label>CTA (optional)</Label>
                  <Input
                    id="target-adience-field"
                    height="2.8rem"
                    padding="0.6rem"
                    placeholder="Sign up now"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                  />
                </InputContainer>
              <Centered>
                <GenerateBtn className="generate-content-btn">
                  {loading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "0.2rem",
                      }}
                    >
                      <TypingAnimation colorful={false} />
                    </div>
                  ) : (
                    <Centered>
                      <BtnIcon>
                        <BsStars style={{ width: "100%", height: "auto" }} />
                      </BtnIcon>
                      Generate content
                    </Centered>
                  )}
                </GenerateBtn>
              </Centered>
            </Form>
          </div>
        </FormContainer>
      )}
      <ResultsContainer
        trigger={key}
        about={topic}
        initialPrompt={prompt}
        resultsType={query.type}
        query={query}
        count={1}
        template={template}
        stopLoading={() => setLoading(false)}
      />
    </PageContent>
  );
};

export default SocialMediaCreationPage;
