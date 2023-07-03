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

const IdeaCreator = ({back, query}: any) => {

  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [numberOfIdeas, setNumberOfIdeas] = useState("5");
  const [prompt, setPrompt] = useState<string>();
  const [preprompt, setPrePrompt] = useState<string>();
  const [mobile, setMobile] = useState(false);
  const [userElixir, setUserElixir] = useState(0);
  const userPlan = useSelector(selectedPlanState);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if(window.innerWidth <= 1023){
        setMobile(true);
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
  }, []);

  const generateContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKey((prevKey) => prevKey + 1);
    setLoading(true);
    setPrompt(`Act as an idea generator. Come up with ${numberOfIdeas} excellent ideas for ${idea}. Ensure each suggestion is specific, well-considered, and feasible. Try to think outside the box, and build on the original concept of ${idea}. Consider various angles, scenarios, and applications that could be utilized in different contexts. Use your creativity and problem-solving skills to identify areas where ${idea} can be improved, modified, or taken beyond the existing conceptual boundaries. Finally, provide a comprehensive summary of each idea, highlighting the key features, benefits, and potential impact. By default write in Polish.`);
    setTitle(`Wygenerowanie ${numberOfIdeas} pomysłów`);

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
                    <Form onSubmit={(e) => generateContent(e)}>
                        {(userPlan && userPlan._id !== "647895cf404e31bfe8753398") &&
                        <InputContainer width="100%">
                            <FoldersDropdown />
                        </InputContainer>
                        }
                      <InputContainer width="100%">
                      <Prompt>
                        Wymyśl  
                        <DropdownContainer>
                          <Dropdown values={["3", "5", "10"]} value={numberOfIdeas} onChange={setNumberOfIdeas} error={undefined}/>
                        </DropdownContainer>
                        pomysłów na:
                      </Prompt>
                      </InputContainer>
                        <InputContainer width="100%">
                            <TextArea
                                id="target-adience-field"
                                height= "20vh"
                                padding="0.6rem"
                                placeholder="hook'a instagramowego reelsa dotyczącego nowej funkcjonalności jaką jest wgrywanie danych firmowych."
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                                required
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
                                    Wyczaruj pomysły
                                </div>
                                }
                            </GenerateBtn>
                        </div>
                    </Form>
                </FormContainer>
                }
            <ResultsContainer trigger={key} about={idea} initialPrompt={prompt} resultsType="ideas" query={{}} preprompt={preprompt} title={title} count={Number(numberOfIdeas)} stopLoading={() => setLoading(false)}/>
        </PageContent>

  )
}

export default IdeaCreator;

const PageContainer = styled.div`
  height: calc(100% - 1.5rem);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  width: 100%;
  border-radius: 25px;
  margin-bottom: 5rem;
  padding: 1.5rem;
  @media (max-width: 1023px) {
    width: 100%;
    overflow-y: scroll;
    align-items: flex-start;
    padding: 0;
    padding-top: 2vh;
    box-shadow: none;
    background: transparent;
    margin-bottom: 4rem;
}
`

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