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

interface InputContainer {
    width: string;
}

interface TextArea {
    height: string;
}


const paragraphsCount = [1, 2, 3, 4, 5];
const contentLengths = ["Short", "Medium", "Long", "Very long"];
const styles = ["Formal 💼", "Friendly 😊", "Concise 📃", "Persuasive 🫵🏼", "Motivational 📈"];
const languages = [ "English", "Spanish", "French", "Italian", "German", "Ukrainian", "Polish", "Chinese", "Bulgarian", "Russian"];

const BlogCreationPage = ({back, query}: any) => {

    const [count, setCount] = useState(1);
    const [completionLength, setCompletionLength] = useState("Long");
    const [paragraphCount, setParagraphCount] = useState(3);
    const [targetAudience, setTargetAudience] = useState("");
    const [style, setStyle] = useState("Friendly 😊");
    const [topic, setTopic] = useState("");
    const [keywords, setKeywords] = useState("");
    const [prompt, setPrompt] = useState<string>();
    const [formLoading, setFormLoading] = useState(true);
    const [language, setLanguage] = useState("English");
    const userPlan = useSelector(selectedPlanState);
    const [preprompt, setPrePrompt] = useState<string>();
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        let newTitle = "";
        let replyLength = "in around 300 words"
        if(completionLength === "Short") {
            replyLength = "in around 200 words"
        } else if (completionLength === "Long") {
            replyLength = "in around 400 words"
        } else if (completionLength === "Very long") {
            replyLength = "that is minimum 600 words long"
        }

        if (query.type.includes("conspect")) {
            if(query.type.includes("blog")){
                setPrompt(`Write a unique, detailed blog conspect about "${topic}". It needs to have exactly ${paragraphCount} paragraphs. Make sure to write it in ${language} language.`)
                if ( count === 1 ) {
                    newTitle = `Generated blog conspect`
                } else {
                    newTitle = `Generated ${count} blog conspects`
                }
            } else if (query.type.includes("article")){
                setPrompt(`Write a unique, detailed article conspect about "${topic}". It needs to have exactly ${paragraphCount} paragraphs. Make sure to write it in ${language} language.`)
                if ( count === 1 ) {
                    newTitle = `Generated article conspect`
                } else {
                    newTitle = `Generated ${count} article conspects`
                }
            }

        } else if (query.type.includes("section")){
            if(query.type.includes("blog")){
                setPrompt(`Write a unique and fascinating blog section ${topic} in ${language} language ${replyLength} in ${style} tone of voice. Make it sound natural and human, and optimize it for best SEO performance according to best practices.`)
                if ( count > 1 ) {
                    newTitle = `Generated blog section`
                } else {
                    newTitle = `Generated ${count} blog sections`
                }
            } else if (query.type.includes("article")){
                setPrompt(`Act as an SEO Content Writer. Compose a unique and engaging article about "${topic}" in ${language} language ${replyLength}  in ${style} tone of voice. Your target audience is ${targetAudience}, so make sure your article is clear and concise and answers the reader's questions. Be sure to use best SEO practices and frequently use the following keywords ${keywords}. Try to incorporate these keywords naturally into your article and avoid stuffing them to satisfy search engines. Research the topic thoroughly and provide unique insights and perspectives on the topic to craft a piece that is informative and engaging to the reader.  Ensure writing style and tone matches the intended audience. Remember to focus on value and quality, not just keywords, to provide an excellent user experience. And lastly, ensure that it is plagiarism-free.`)
                if ( count > 1 ) {
                    newTitle = `Generated article`
                } else {
                    newTitle = `Generated ${count} articles`
                }
            }

        } else if (query.type.includes("press-release")){
            setPrompt(`
            Act as a PR specialist. Develop a winning press release ${replyLength} with a strong headline (ideally containing some eye catching number) for ${topic}. Begin by highlighting the key aspects of your press release such as describing the event or announcement, highlighting new features or products, or discussing a particular topic depending on the topic. Make sure to, provide context on why this is important or noteworthy, and relevant statistics or data to back up your claims. Furthermore, make sure your press release follow the standard format, including an attention-grabbing first paragraph, follow up paragraphs that elaborate and give necessary detail, and a conclusion that summarises everything. Finally, choose an engaging and effective headline that encapsulates the most important aspects of the story and provides an enticing reason for media outlets to pick it up. Make sure to write it in ${language} language.`)
            newTitle = `Generated press release`
        }
        setTitle(newTitle);
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
                            <FolderDropdown />
                        </InputContainer>
                        }
                        {query.type.includes("conspect") &&  
                        <InputContainer width="50%">
                            <Label>
                                Number of sections
                            </Label>
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
                        {!query.type.includes("conspect") &&  
                        <InputContainer width="50%">
                            <Label>
                                Length
                            </Label>
                            <Dropdown
                                width="100%"
                                id="name"
                                type="text"
                                placeholder="50"
                                required
                                value={completionLength}
                                values={contentLengths}
                                onChange={setCompletionLength}
                                error={undefined}
                            />
                        </InputContainer>
                        }
                        {(!query.type.includes("conspect") && !query.type.includes("press-release")) &&        
                            <InputContainer width="50%">
                                <Label>
                                    Tone of voice
                                </Label>
                                <Dropdown
                                    id="name"
                                    type="text"
                                    placeholder="Friengly 😊"
                                    required
                                    value={style}
                                    values={styles}
                                    onChange={setStyle}
                                    error={undefined}
                                />
                            </InputContainer>
                        }
                        {query.type.includes("section") &&  
                        <InputContainer width="50%">
                            <Label>
                                Target audience
                            </Label>
                            <TextArea
                                height= "2.6rem"
                                placeholder="Marketing experts"
                                padding="0.5rem"
                                required
                                rows={1}
                                wrap="off"
                                value={targetAudience}
                                onChange={(e) => setTargetAudience(e.target.value)}
                            />
                        </InputContainer>
                        } 
                        <InputContainer width="50%">
                            <Label>
                                Language
                            </Label>
                            <Dropdown
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
                        {query.type.includes("section") &&  
                        <InputContainer width="100%">
                            <Label>
                                Keywords
                            </Label>
                            <TextArea
                                height= "2.6rem"
                                placeholder="AI, marketing, social media"
                                padding="0.5rem"
                                required
                                rows={1}
                                wrap="off"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </InputContainer>
                        }
                        <InputContainer width="100%">
                            <Label>
                                Topic
                            </Label>
                            <TextArea
                                id="about-field"
                                height= "8rem"
                                padding="0.6rem"
                                placeholder="Whatever you want to publish..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
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
            <ResultsContainer trigger={key} about={topic + " " + keywords} initialPrompt={prompt} query={query} resultsType={query.type} preprompt={preprompt} title={title} count={1} stopLoading={() => setLoading(false)}/>
        </PageContent>
    )
}

export default BlogCreationPage;

