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
import TextArea from "../../forms/TextArea";
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

interface InputContainer {
  width: string;
}

interface TextArea {
  height: string;
}

const styles = [
  "Formal 💼",
  "Friendly 😊",
  "Concise 📃",
  "Persuasive 🫵🏼",
  "Motivational 📈",
];
const languages = [
  "English",
  "Spanish",
  "French",
  "Italian",
  "German",
  "Ukrainian",
  "Polish",
  "Chinese",
  "Bulgarian",
  "Russian",
];
const paragraphsCount = [1, 2, 3, 4, 5];

const SocialMediaCreationPage = ({ back, query }: any) => {
  const [style, setStyle] = useState("Friendly 😊");
  const [paragraphCount, setParagraphCount] = useState(3);
  const [completionLength, setCompletionLength] = useState(100);
  const [prompt, setPrompt] = useState<string>();
  const [preprompt, setPrePrompt] = useState<string>();
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const userPlan = useSelector(selectedPlanState);
  const [cta, setCta] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [title, setTitle] = useState("");
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [key, setKey] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1023) {
      setMobile(true);
    }
  }, []);

  const generateContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey((prevKey) => prevKey + 1);
    setLoading(true);
    const token = localStorage.getItem("token");
    let newTitle = "";
    let replyLength = `Write it in just ${completionLength} words.`;

    if (query.type) {
      if (query.type.includes("conspect")) {
        setPrompt(
          `Write a great newsletter conspect about ${topic} in ${paragraphCount} paragraphs. My target audience is ${targetAudience}, and my CTA is: "${cta}". Make sure everything you write is in ${language} language.`
        );
        newTitle = `Generated email conspect`;
      } else if (query.type.includes("newsletter")) {
        setPrompt(`Act as a professional newsletter writer. Craft a creative and informative newsletter in ${style} tone of voice that captures the essence of ${topic}. The newsletter should be written in ${language} language that is accessible to the target audience, which is comprised of ${targetAudience}. Don't address them directly, but rather write within their interest. Your content should be engaging, informative, and provide value to the reader. Make sure to write in a voice that sounds natural and human, plus add some personality to your writing to keep it interesting.

                To keep the readers interested, make sure to include helpful tips, strategies, examples and some interesting facts related to ${topic} if needed. Your newsletter should not only inform but also inspire and motivate them into taking action, but before the CTA summarize everything you have written nad give some reflections.
                
                Try to fit this newsletter ${replyLength}.
                
                Once you have the first draft of the newsletter, read through it and ensure that everything is written in the language ${language}. Lastly, run a grammar and spell check to make sure that the newsletter is correct. Respond only with complete newsletter.`);
        newTitle = `Generated newsletter`;
      } else if (query.type.includes("email")) {
        setPrompt(`You are a professional ${language} email marketer. Write an enticing and effective email campaign to increase engagement and drive sales about ${topic}. The target audience is ${targetAudience}. ${replyLength}

                Begin with a captivating subject line that grabs the reader's attention, then craft an opening that speaks directly to the reader's needs and emotions. Ensure that your tone of voice is ${style}. Use easy-to-understand language to explain why your product/service/brand is the best option available on the market and how it can help address the challenges and concerns of the reader. 
                
                Let the email flow with a narrative structure and avoid making it sound too pushy or aggressive. 
                
                Finally, add a "${cta}" call-to-action (CTA) at the end of the email directing the reader to take the desired action. Ensure that both title and body are written in ${language} language and is grammarly correct with no typos.`);
        newTitle = `Generated email`;
      }
    }
    setTitle(newTitle);
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
      {query.type && (
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
              {query.type.includes("conspect") && (
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
              )}
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
              <InputContainer width="50%">
                <Label>Length</Label>
                <input
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
                  style={{
                    fontWeight: "500",
                    height: "auto",
                    boxShadow:
                      "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
                  }}
                  className=" appearance-none border-2 flex text-black items-center px-4 w-full h-full  relative py-2 rounded-xl placeholder-[#DCDCDC] focus:outline-none text-md"
                />
                {inputError && (
                  <p className="text-red-600 mt-4">
                    Error: Minimum length is 20
                  </p>
                )}
              </InputContainer>
              {!query.type.includes("conspect") && (
                <InputContainer width="100%">
                  <Label>Tone of voice</Label>
                  <CustomDropdown
                    id="name"
                    type="text"
                    placeholder="Friendly 😊"
                    required
                    value={style}
                    values={styles}
                    onChange={setStyle}
                    error={undefined}
                  />
                </InputContainer>
              )}
              {(query.type.includes("conspect") ||
                query.type.includes("newsletter")) && (
                <InputContainer width="100%">
                  <Label>Topic</Label>
                  <TextArea
                    id="topic-field"
                    height="4.2rem"
                    padding="0.4rem"
                    placeholder="AI revolution in marketing."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </InputContainer>
              )}
              {query.type.includes("email") && (
                <InputContainer width="100%">
                  <Label>Write about...</Label>
                  <TextArea
                    id="topic-field"
                    height="4.2rem"
                    padding="0.4rem"
                    placeholder="new feature of Yepp AI- is uploading files."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </InputContainer>
              )}
              <InputContainer width="100%">
                <Label>Target audience</Label>
                <Input
                  id="target-adience-field"
                  height="2.6rem"
                  padding="0.4rem"
                  placeholder="users of Yepp AI"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  required
                />
              </InputContainer>
              {query.type.includes("email") && (
                <InputContainer width="100%">
                  <Label>CTA (optional)</Label>
                  <Input
                    id="target-adience-field"
                    height="2.6rem"
                    padding="0.6rem"
                    placeholder="Sign up now"
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                  />
                </InputContainer>
              )}
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
        preprompt={preprompt}
        title={title}
        count={1}
        stopLoading={() => setLoading(false)}
      />
    </PageContent>
  );
};

export default SocialMediaCreationPage;
