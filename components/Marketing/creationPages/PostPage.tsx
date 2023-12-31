import styled from "styled-components";
import backIcon from "../../../public/images/backArrow.png";
import Image from "next/image";
import { FormEvent, use, useEffect, useState } from "react";
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
import TypingAnimation from "@/components/Modals/common/TypingAnimation";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import api from "@/pages/api";
import FoldersDropdown from "@/components/forms/FolderDropdown";
import Input from "@/components/forms/Input";
import CustomDropdown from "@/components/forms/CustomDropdown";
import { Switch } from "@headlessui/react";
import ToneDropdown from "@/components/forms/ToneDropdown";
import PersonaDropdown from "@/components/forms/PersonaDropdown";
import { BsStars } from "react-icons/bs";

interface InputContainer {
  width: string;
}

interface TextArea {
  height: string;
}

const postTypes = ["Educational", "Informative", "Advertisement", "Lifestyle"];
const toneList = [
  {title: "Formal", icon: "💼"},
  {title: "Friendly", icon: "😊"},
  {title: "Informative", icon: "📚"},
  {title: "Persuasive", icon: "🫵🏼"},
  {title: "Motivational", icon: "📈"},
];
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
const emojiRegex =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1F300}-\u{1F5FF}]/gu;

const SocialMediaCreationPage = ({ back, query, template }: any) => {
  const [completionLength, setCompletionLength] = useState(100);
  const [postType, setPostType] = useState("Advertisement");
  const [tones, setTones] = useState<any[]>([]);
  const [selectedToneTitle, setSelectedToneTitle] = useState("Friendly 😊");
  const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");
  const [selectedTonePrompt, setSelectedTonePrompt] = useState("");
  const [about, setAbout] = useState("");
  const [language, setLanguage] = useState("English");
  const [targetAudience, setTargetAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>();
  const userPlan = useSelector(selectedPlanState);
  const [key, setKey] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [enableEmojis, setEnableEmojis] = useState(true);
  const [personas, setPersonas] = useState<any[]>([]);


  useEffect(() => {
    if (localStorage.getItem("country") === "Poland") {
      setLanguage("Polish");
    }
    if (window.innerWidth < 1023) {
      setMobile(true);
    }

    if (template) {
      if (template.title === "Tweet") {
        setCompletionLength(20);
      }
    }

    let token = localStorage.getItem("token");
    let profileId =  localStorage.getItem("profile_id");

    const fetchTonesAndPersonas = async () => {
      let toneUrl = `/tones/owner`;
      let personaUrl = `/personas/owner`;
      if (profileId) {
        toneUrl = `/profile_tones/${profileId}`;
        personaUrl = `/profile_personas/${profileId}`;
      }
      try {
        const toneResponse = await api.get<{title: string, icon: string}[]>(toneUrl, {
          headers: {
            Authorization: token,
          }
        });
        setTones([...toneResponse.data, ...toneList]);
        const personaResponse = await api.get<{title: string, icon: string}[]>(personaUrl, {
          headers: {
            Authorization: token,
          }
        });
        setPersonas(personaResponse.data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchTonesAndPersonas();

    fetchTonesAndPersonas();
  }, []);

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
    setPrompt("");
    setLoading(true);
    let replyLength = `Write it in just ${completionLength} words.`;
    const personaText = selectedPersonaPrompt ? selectedPersonaPrompt : "";
    if (selectedTonePrompt) {
      setPrompt(`${personaText} Please come up with unique ${template.title} about ${about}. 
      It should resonate with ${targetAudience}, but do not adress them directly.
      Write it in the following tone of voice: ${selectedTonePrompt} 
      Return ready ${template.title} in ${language} that is around ${completionLength} words total:
      `)
    } else {
      if (template.title === "LinkedIn-About Company") {
        setPrompt(
          ` ${personaText} Act as an experienced LinkedIn specialist for you always write unique and novel company descriptions. 
          Write exactly 1 unique about company section for ${about} ${replyLength} Make sure to write it in ${selectedToneTitle} tone of voice. 
          The description should draw the attention of ${targetAudience} and sound totally natural and casual as if it was written by human. Make sure everything you write is in ${language} language. Appropriately adjust content to the audience group and given type. Do not use hashtags. ${
            enableEmojis
              ? "Please use relevant emojis related to the topic."
              : "Do not use emojis"
          }`
        );
      } else if (template.title === "LinkedIn Ad Description") {
        setPrompt(
          `${personaText} act as an experienced LinkedIn specialist for you always write unique and novel ad descriptions. 
          Write exactly 1 unique ad description- ${about}. Write it in up to 140 characters. Make sure to write it in ${selectedToneTitle} tone of voice. 
          The description should draw the attention of ${targetAudience} and sound totally natural and casual as if it was written by human. Make sure everything you write is in ${language} language. Appropriately adjust content to the audience group and given type. Do not use hashtags. ${
            enableEmojis
              ? "Please use relevant emojis related to the topic."
              : "Do not use emojis"
          }`
        );
      } else {
        setPrompt(
          `${personaText} Act as an experienced social media content creator for ${query.type} you always write unique and novel content. 
          Write exactly 1 unique ${template.title} about ${about} ${replyLength} Make sure to write it in ${selectedToneTitle} tone of voice. 
          The post should draw the attention of ${targetAudience} and should sound totally natural and casual as if it was written by human. Don't address the target audience directly, but rather speak within their interests. Make sure everything you write is in ${language} language. Appropriately adjust content to the audience group and post type. ${
            enableEmojis
              ? "Please use relevant emojis related to the topic."
              : "Do not use emojis"
          }`
        );
      }
    }

  };

  const handleToggleEmojis = () => {
    setEnableEmojis((prev) => !prev);
  };

  return (
    <PageContent>
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
              {template.title !== "LinkedIn Ad Description" && 
              <InputContainer width="50%">
                <div className="flex justify-between  ">
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
              }
              {(template.title !== "LinkedIn-About Company" && template.title !== "LinkedIn Ad Description") && 
              <InputContainer width="50%">
                {template.title === "Tweet" ? (
                  <Label>Tweet type</Label>
                ) : (
                  <Label>Post type</Label>
                )}
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
              }
              <InputContainer width="50%">
                <Label>Tone of voice</Label>
                <ToneDropdown
                    values={tones}
                    value={selectedToneTitle}
                    onChange={handleToneChange}
                />
              </InputContainer>
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
              {template.title === "LinkedIn-About Company" &&
              <InputContainer width="50%">
                <Label>Target audience / persona</Label>
                <PersonaDropdown
                    values={personas}
                    value={targetAudience}
                    onChange={handlePersonaChange}
                  />
              </InputContainer>
              }
              <InputContainer width="100%">
              {template.title !== "LinkedIn-About Company" ? 
              <>
              {template.title === "LinkedIn Ad Description" ?
                <Label>About the ad...</Label> 
                :
                <Label>Write about...</Label>
              }
              </>
              : 
              <Label>About company...</Label>
              }
                <TextArea
                  id="about-field"
                  height="6.2rem"
                  padding="0.7rem"
                  placeholder="Yepp AI- a generative AI for marketing agencies..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </InputContainer>
              {template.title !== "LinkedIn-About Company" &&
              <InputContainer width="58%">
              <Label>Target audience / persona</Label>
              <PersonaDropdown
                  values={personas}
                  value={targetAudience}
                  onChange={handlePersonaChange}
                />
            </InputContainer>
              }
              {!selectedTonePrompt &&
              <InputContainer width="42%">
              <div className="flex flex-wrap gap-1 ml-2 ">
                <div className="w-full"><Label>Use relevant emojis</Label></div>
                <Switch
                  checked={enableEmojis}
                  onChange={handleToggleEmojis}
                  style={{
                    boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)",
                  }}
                  className={`${
                    enableEmojis ? "bg-green-400" : "border-2 border-gray-200"
                  } relative inline-flex items-center h-7 rounded-full w-16 transition-colors focus:outline-none`}
                >
                  <span className="sr-only">Toggle Tone</span>
                  <span
                    className={`${
                      enableEmojis
                        ? "translate-x-10"
                        : "-translate-x-1 border-2 border-gray-200"
                    } inline-block w-7 h-7 transform bg-white border rounded-full transition-transform`}
                  />
                </Switch>
              </div>
              </InputContainer>
              }
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <BtnIcon>
                        <BsStars style={{ width: "100%", height: "auto" }} />
                      </BtnIcon>
                      Generate content
                    </div>
                  )}
                </GenerateBtn>
              </div>
            </Form>
          </div>
        </FormContainer>
      )}
      <ResultsContainer
        trigger={key}
        about={about}
        initialPrompt={prompt}
        resultsType={query.type + "-post"}
        query={query}
        template={template}
        count={1}
        stopLoading={() => setLoading(false)}
        language={language}
      />
    </PageContent>
  );
};

export default SocialMediaCreationPage;
