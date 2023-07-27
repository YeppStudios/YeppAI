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
import { BsStars } from "react-icons/bs";
import { selectedPlanState } from "@/store/planSlice";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import TypingAnimation from "../../Modals/common/TypingAnimation";
import { useSelector, useDispatch } from "react-redux";
import FolderDropdown from "@/components/forms/FolderDropdown";
import CustomDropdown from "@/components/forms/CustomDropdown";
import Input from "@/components/forms/Input";

interface InputContainer {
  width: string;
}

interface TextArea {
  height: string;
}

const paragraphsCount = [1, 2, 3, 4, 5];
const styles = [
  "Formal 💼",
  "Informal 😎",
  "Friendly 😊",
  "Informative 📃",
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

const LongFormPage = ({ back, query, template }: any) => {
  const [completionLength, setCompletionLength] = useState(700);
  const [paragraphCount, setParagraphCount] = useState(3);
  const [targetAudience, setTargetAudience] = useState("");
  const [style, setStyle] = useState("Informal 😎");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [prompt, setPrompt] = useState<string>();
  const [cta, setCta] = useState("");
  const [language, setLanguage] = useState("English");
  const userPlan = useSelector(selectedPlanState);
  const [preprompt, setPrePrompt] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [title, setTitle] = useState("");
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1023) {
      setMobile(true);
    }
    if (template) {
      if (template.title === "Newsletter") {
        setCompletionLength(200)
      } else if (template.title === "Marketing Email") {
        setCompletionLength(150)
      } else if (template.title === "Welcome Email") {
        setCompletionLength(50)
      }
    }
  }, []);

  const generateContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey((prevKey) => prevKey + 1);
    setLoading(true);
    let replyLength = `Write it in just ${completionLength} words.`;
      if (template.title === "Newsletter") {
        setPrompt(`Act as a ${language.toLowerCase()} professional newsletter writer. Craft a creative and informative newsletter draft in ${style} tone of voice that captures the essence of ${topic}. 
        Begin by greeting ${targetAudience} and open the newsletter with a bold statement that will get their attention.
        Then analyze it and consider using these keywords: ${keywords}. The newsletter should be written in ${language} language that is accessible to the target audience, which is comprised of ${targetAudience}. 
        Don't address them directly, but rather write within their interest. Your content should be engaging, informative, and provide value to the reader. 
        Make sure to write in a voice that sounds natural and human, plus add some personality to your writing to keep it interesting.
        To keep the readers interested, make sure to include helpful tips, strategies, examples and some interesting facts related to ${topic} if needed. 
        Your newsletter should not only inform but also inspire and motivate them into taking action, but before the CTA summarize everything you have written nad give some reflections.
        ${replyLength}
        Once you have the first draft of the newsletter, read through it and ensure that everything is written in the language ${language}. Lastly, run a grammar and spell check to make sure that the final newsletter version is correct. Respond only with complete newsletter.`);
      } else if (template.title === "Marketing Email") {
        setPrompt(`You are a professional ${language} email marketer. Write an enticing and effective email campaign draft to increase engagement and drive sales writing about ${topic}. 
        Next analyze it and consider using these keywords: ${keywords}. Do not begin by greeting ${targetAudience}, rather open the email with a bold statement that will get their attention.
        Don't address ${targetAudience} directly, but rather write within their interest. ${replyLength}
        Craft an opening that speaks directly to the reader's needs and emotions. Ensure that your tone of voice is ${style}. Use easy-to-understand language to explain why your product/service/brand is the best option available on the market and how it can help address the challenges and concerns of the reader. 
        Let the email flow with a narrative structure and avoid making it sound too pushy or aggressive. 
        Finally, seamlessly add a call-to-action (CTA) at the end of the email directing the reader to take the desired action. Ensure that the body of final email version is written in ${language} language and is grammarly correct with no typos. Respond only with email content.`);
      } else if (template.title === "Press Release") {
        setPrompt(`You are a professional ${language} journalist and PR specialist. Write an enticing and effective press release draft about ${topic}. 
        Next analyze it and consider using these keywords: ${keywords}. Open up the press release with a bold statement or rethorical question that will get the ${targetAudience} attention.
        Don't address ${targetAudience} directly, but rather write within their interest. ${replyLength}
        Ensure that your tone of voice is ${style}. Use easy-to-understand language. 
        Let the press release flow with a narrative structure and avoid making it sound too pushy, aggressive or generic. 
        Finally, leave the readers with some rethorical question for contemplation. Ensure that the body of final press release is written in ${language} language and is grammarly correct with no typos. Make sure to respond only with press release content. Do not mention: "FOR IMMEDIATE RELEASE".`);
      } else if (template.title === "Welcome Email") {
        setPrompt(`You are a professional ${language} email marketer. Write an enticing and effective welcoming email draft to make the users feel special. 
        Next analyze it and consider using these keywords: ${keywords}. Our target audience is ${targetAudience}, so make sure your email resonates with them.
        Don't address ${targetAudience} directly, but rather write within their interest. ${replyLength}
        Ensure that your tone of voice is ${style}. Use easy-to-understand language. 
        Let this welcoming email email flow with a narrative structure and avoid making it sound too pushy or aggressive. 
        Finally, seamlessly add a call-to-action (CTA) at the end of the email directing the reader to take the desired action. Ensure that the body of final email version is written in ${language} language and is grammarly correct with no typos. Respond just with email content nothing else.`);
      }
      if (query.type.includes("blog")) {
        setPrompt(
          `Write a unique and fascinating blog section ${topic} in ${language} language ${replyLength} in ${style} tone of voice. Make it sound natural and human, and optimize it for best SEO performance according to best practices.`
        );
      } else if (query.type.includes("article")) {
        setPrompt(
          `Act as an SEO Content Writer. Compose a unique and engaging article about "${topic}" in ${language} language ${replyLength}  in ${style} tone of voice. Your target audience is ${targetAudience}, so make sure your article is clear and concise and answers the reader's questions. Be sure to use best SEO practices and frequently use the following keywords ${keywords}. Try to incorporate these keywords naturally into your article and avoid stuffing them to satisfy search engines. Research the topic thoroughly and provide unique insights and perspectives on the topic to craft a piece that is informative and engaging to the reader.  Ensure writing style and tone matches the intended audience. Remember to focus on value and quality, not just keywords, to provide an excellent user experience. And lastly, ensure that it is plagiarism-free.`
        );
      }
      if (query.type.includes("press-release")) {
        setPrompt(`
          Act as a PR specialist. Develop a winning press release ${replyLength} with a strong headline (ideally containing some eye catching number) for ${topic}. Begin by highlighting the key aspects of your press release such as describing the event or announcement, highlighting new features or products, or discussing a particular topic depending on the topic. Make sure to, provide context on why this is important or noteworthy, and relevant statistics or data to back up your claims. Furthermore, make sure your press release follow the standard format, including an attention-grabbing first paragraph, follow up paragraphs that elaborate and give necessary detail, and a conclusion that summarises everything. Finally, choose an engaging and effective headline that encapsulates the most important aspects of the story and provides an enticing reason for media outlets to pick it up. Make sure to write it in ${language} language.`);
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
                  <FolderDropdown />
                </InputContainer>
              )}
              {query.type.includes("conspect") && (
                <InputContainer width="50%">
                  <Label>Number of sections</Label>
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
                  <div className="flex justify-between  ">
                    <Label className="text-center">Words</Label>
                    {inputError && (
                      <p className="text-red-400 text-sm">Minimum 20 words</p>
                    )}
                  </div>
                  <Input
                    height="2.6rem"
                    padding="0.6rem"
                    type="number"
                    onChange={(e) =>
                      setCompletionLength(e.target.valueAsNumber)
                    }
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
                <InputContainer width="50%">
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

                <InputContainer width="50%">
                  <Label>Target audience</Label>
                  <TextArea
                    height="2.8rem"
                    placeholder="Marketing experts"
                    padding="0.5rem"
                    required
                    rows={1}
                    wrap="off"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
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
                  values={languages}
                  onChange={setLanguage}
                  error={undefined}
                />
              </InputContainer>
                <InputContainer width="100%">
                  <Label>Keywords</Label>
                  <TextArea
                    height="2.8rem"
                    placeholder="AI, marketing, social media"
                    padding="0.5rem"
                    required
                    rows={1}
                    wrap="off"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </InputContainer>
                {template.title !== "Welcome Email" &&
              <InputContainer width="100%">
                <Label>Topic</Label>
                <TextArea
                  id="about-field"
                  height="8rem"
                  padding="0.6rem"
                  placeholder="What do you want to write..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
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
        about={topic + " " + keywords}
        initialPrompt={prompt}
        query={query}
        resultsType={query.type}
        template={template}
        count={1}
        stopLoading={() => setLoading(false)}
      />
    </PageContent>
  );
};

export default LongFormPage;