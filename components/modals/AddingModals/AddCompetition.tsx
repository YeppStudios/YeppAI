import styled from "styled-components";
import SlideBottom from "@/components/Animated/SlideBottom";
import { BsGlobe2, BsFonts, BsXLg, BsPlusLg, BsDash, BsBuildingAdd, BsSignpost, BsShop } from "react-icons/bs";
import Label from "@/components/Common/Label";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Centered from "@/components/Centered";
import api from "@/pages/api";
import axios from "axios";
import { Loader } from "@/components/Common/Loaders";
import TypingAnimation from "../common/TypingAnimation";
import EstimatedTime from "@/components/Competition/EstimatedTime";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import { HiPencil } from "react-icons/hi";
import { SparklesIcon } from "lucide-react";
import CustomDropdown from "@/components/forms/CustomDropdown";

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

const AddCompetition = (props: {onClose: any}) => {

    const router = useRouter();

    const [maximumError, setMaximumError] = useState(false);
    const [currentText, setCurrentText] = useState("Scraping websites...");
    const [endGoal, setEndGoal] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [language, setLanguage] = useState<string>("English");
    const [step, setStep] = useState<number>(1);
    const [industry, setIndustry] = useState<string>("");
    const [paragraphs, setParagraphs] = useState<{header: string, description: string}[]>([]);
    const [competitors, setCompetitors] = useState<any[]>([
        { name: '', url: '' }, 
      ]);
    const [inputErrors, setInputErrors] = useState<{ nameError: boolean; urlError: boolean }[]>([]);
    const textAreaRefs = useRef<{
      header: (HTMLTextAreaElement | null)[];
      description: (HTMLTextAreaElement | null)[];
    }>({
      header: [],
      description: [],
    });
    
    
    const adjustTextareaHeight = (element: any) => {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    };
    
      const handleInputChange = (index: number, key: string, value: string) => {
        const newCompetitors = [...competitors];
        newCompetitors[index][key] = value;
        setCompetitors(newCompetitors);

        const newInputErrors = [...inputErrors];
        const updatedError = { ...newInputErrors[index] };
      
        if (key === 'name') {
          updatedError.nameError = false;
        } else if (key === 'url') {
          updatedError.urlError = false;
        }
      
        newInputErrors[index] = updatedError;
        setInputErrors(newInputErrors);
      };
    
      const addMoreCompetitors = () => {
        if (competitors.length >= 7) {
            setMaximumError(true);
            return;
        }
        setCompetitors([...competitors, { name: '', url: '' }]);
      };

      const deleteCompetitor = (index: number) => {
        const newCompetitors = [...competitors];
        setMaximumError(false);
        newCompetitors.splice(index, 1);
        setCompetitors(newCompetitors);
    };


    const handleCategoryLoad = (id: number, field: string) => {
      let textareaElement = null;
      if (field === "header") {
        textareaElement = textAreaRefs.current.header[id];
      } else if (field === "description") {
        textareaElement = textAreaRefs.current.description[id];
      }
      if (textareaElement) {
          adjustTextareaHeight(textareaElement);
      }
    };
    
    const handleCategoryChange = (field: string, event: any, index: any) => {
      const newValue = event.target.value;
      const updatedParagraphs = [...paragraphs];

      if (field === "description") {
        updatedParagraphs[index].description = newValue;
      } else if (field === "header") {
        updatedParagraphs[index].header = newValue;
      }
    
      setParagraphs(updatedParagraphs);
      adjustTextareaHeight(event.target);
    };

    const createResearch = async () => {
        setLoading(true);
        const newInputErrors = competitors.map(competitor => ({
            nameError: competitor.name === '',
            urlError: competitor.url === ''
          }));
        
          if (newInputErrors.some(error => error.nameError || error.urlError)) {
            setInputErrors(newInputErrors);
            return;
          }

        const token = localStorage.getItem("token");
        const profileId = localStorage.getItem("profile_id");

        let links = competitors.map(competitor => competitor.url);
        let favicons: string[] = [];
        let vectorIds: string[] = [];

        for (let i = 0; i < links.length; i++) {
          setCurrentText(`Scraping ${competitors[i].name} pages...`);
          const scrapingResponse = await axios.post(`https://www.asistant.ai/scrape-multiple-websites`, {
            urls: [links[i]],
  
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
              }
          });
          favicons.push(scrapingResponse.data[0].favicon);
          vectorIds.push(scrapingResponse.data[0].ids[0]);
        }


        const competitorsArray = competitors.map((competitor, index) => {
            return {
                name: competitor.name,
                url: competitor.url,
                imageUrl: favicons[index],
                vectorId: vectorIds[index],
            }
        });
        
        
        try {
            const response = await api.post("/create-competition-research", {
                companies: competitorsArray,
                profile: profileId,
                owner: localStorage.getItem("user_id"),
                title,
                endGoal
            
            }, {
                headers: {
                    authorization: token
                }
            })
            localStorage.setItem("start_research", "true");
            router.push(`/competition/${response.data._id}`);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const generateSteps = async () => {
      let token = localStorage.getItem("token");
      setLoading(true);
      const competitorNames = competitors.map(competitor => competitor.name).join(", ");
      const generatedCriteria = await api.post("/completion", {
        model: "gpt-4-32k",
        temperature: 0.9,
        systemPrompt: `You are a ${language} expert in doing research based on just the landing pages of competitors in ${industry} sector. Having access to only page content scraped you return the proposed competition research criteria to ${endGoal} in this exact format:
        [
          "criteria 1",
          "criteria 2",
          "criteria 3",
          ...
        ]
        `,
        prompt: `As an expert, please help me determine what criteria should I consider while doing research to ${endGoal} between ${competitorNames}. I should be able to do it just based on the scraped text from competitors websites.
        Example:
        [
          "Pricing models",
          "Unique value proposition",
          "Product features",
          "User testimonials",
          "Target audience",
          "Integrations with other software",
          "Meat prices",
          "Diary prices",
          "Vegetable prices",
          "Fruit prices",
          "Offered services",
          ...
        ]
        As you can see every criteria must be possible to find on a website by a simple text scraper. Every criteria should be in ${language} language and should be a short phrase.
        
        Now come up with set of best reserach criteria to ${endGoal} in ${industry} industry. 
        Respond with array of up to 7 (not necessarily 7) essential criteria that make the most sense for comparing ${competitorNames} who are in ${industry} industry to ${endGoal} and are realistic for web scraper to find on their websites:
        `
      }, {
        headers: {
          Authorization: token,
        }
      });
      console.log(competitorNames)
      console.log(JSON.parse(generatedCriteria.data.completion));
      setLoading(false);
    }

    const generateField = async (field: any, paragraphIndex: any) => {
      
    };

    const generateCurrentParagraph = async () => {
      for (let i = 0; i < paragraphs.length; i++) {
        await generateField("description", i);
      }
    };
    
    return (
        <ModalBackground onClick={props.onClose}>
            <SlideBottom>
            {!loading ? 
            <>
            {step === 1 ?
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>Define your competition</Title>
                <CloseIcon onClick={props.onClose}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <div className="flex flex-wrap justify-between items-center  px-[2rem]">
                <div className="flex justify-between gap-[0.75rem]">
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsFonts />
                    </LabelIcon>
                    <Label>Name the research</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsFonts />
                    </LabelIcon>
                    <Label>Language</Label>
                    </div>
                    <CustomDropdown
                      id="languages"
                      type="text"
                      placeholder="English"
                      required
                      value={language}
                      values={languages.sort()}
                      onChange={setLanguage}
                    />
                </div>
                </div>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsSignpost />
                    </LabelIcon>
                    <Label>Reserch end goal</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="Define in what areas Yepp AI is better than competition"
                        value={endGoal}
                        onChange={(e) => setEndGoal(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsShop />
                    </LabelIcon>
                    <Label>Industry</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="Marketing generative AI solutions"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                    />
                </div>
                </div>
                {competitors.map((competitor, index) => (
                <CompetitorContainer key={index}>
                <MinusBtn onClick={() => deleteCompetitor(index)}><BsDash className="w-[1rem]" /></MinusBtn>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsBuildingAdd />
                    </LabelIcon>
                    <Label>Company name</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="My Competitor"
                        value={competitor.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        style={{ borderColor: inputErrors[index]?.nameError ? '#FF5757' : '' }}
                    />
                </div>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsGlobe2 />
                    </LabelIcon>
                    <Label>Website url</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="https://www.competitor.com"
                        value={competitor.url}
                        onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                        style={{ borderColor: inputErrors[index]?.urlError ? '#FF5757' : '' }}
                    />
                 </div>
                </CompetitorContainer>
                ))}
                {(competitors && competitors.length < 5) &&<Centered><AddBtn onClick={addMoreCompetitors}><BsPlusLg className="w-8 h-8" /></AddBtn></Centered>}
                {maximumError && <Centered><p className="text-gray-700 mt-4">You can add up to 7 competitors.</p></Centered>}
                <Centered>
                    <BlueBtn onClick={() => generateSteps()}>
                        {loading ?
                            <Loader color="white" />
                            :
                            <p>Continue</p>
                        }
                    </BlueBtn>
                </Centered>
            </Modal>
            :
            <Modal>
              <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
               </CloseIcon>
              <Title>Review research outline</Title>
              {paragraphs.map((paragraph, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <div className="w-full rounded-xl shadow-lg border-2 border-gray-100 mb-10">
                    <div className="px-6 py-2 w-full flex justify-between items-center border-b-2 border-gray-100">
                      {paragraph.header === "" ? (
                        <MultiLineSkeletonLoader lines={1} justifyContent={"left"} />
                      ) : (
                        <>
                          <textarea 
                            value={paragraph.header} 
                            onChange={(e) => handleCategoryChange("header", e, index)} 
                            rows={1}
                            className="font-semibold mr-4 w-full outline-none resize-none py-2"
                            ref={(el) => {
                              textAreaRefs.current.header[index] = el;
                              handleCategoryLoad(index, "header");
                            }}                                                             
                            >
                            </textarea>
                          <div className='flex items-center gap-4 font-medium text-gray-300'>
                            <div onClick={() => textAreaRefs.current.header[index]?.focus()} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                              <HiPencil className='w-4 h-4'/>
                              Edit
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="px-6 pt-4 pb-6 font-medium">
                      {paragraph.description === "" ? (
                        <MultiLineSkeletonLoader lines={2} justifyContent={"left"} />
                      ) : (
                        <div className='flex flex-wrap text-gray-300'>
                        <textarea 
                          value={paragraph.description} 
                          onChange={(e) => handleCategoryChange("description", e, index)} 
                          className='w-full text-gray-800 outline-none resize-none'
                          rows={1}
                          ref={(el) => {
                            textAreaRefs.current.description[index] = el;
                            handleCategoryLoad(index, "description");
                          }}
                          
                          >
                          </textarea>
                        <div className='w-full flex justify-end mt-4'>
                        <>
                        <div className='flex items-center gap-4'>
                          <div onClick={() => textAreaRefs.current.description[index]?.focus()} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                            <HiPencil className='w-4 h-4'/>
                            Edit
                          </div>
                          <div onClick={() => generateField("description", index)} className='flex gap-2 items-center text-sm hover:text-blue-500 cursor-pointer'>
                            <SparklesIcon className='w-4 h-4'/>
                            Rewrite
                          </div>
                        </div>
                        </>
                      </div>
                      </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
                <Centered>
                    <BlueBtn onClick={() => generateSteps()}>
                        {loading ?
                            <Loader color="white" />
                            :
                            <p>Start research</p>
                        }
                    </BlueBtn>
                </Centered>
              </Modal>
            } 
            </>
            :
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <Title>Preparing research resources...</Title>
                <div className="mt-10">
                    <Centered><p className="mb-6 w-8/12 text-center font-medium">Yepp AI is preparing resources for your competition research. It&apos;s worth the wait!</p></Centered>
                    <Centered><TypingAnimation colorful={true} /></Centered>
                    <Centered><Texts>{currentText}</Texts></Centered>
                    <EstimatedTime competitors={competitors} />
                </div>
            </Modal>
            }
            </SlideBottom>
        </ModalBackground>
    )
}


export default AddCompetition;

const ModalBackground = styled.div`
width: 100%;
height: 100%;
position: fixed;
flex-wrap: wrap;
backdrop-filter: blur(7px);
z-index: 100;
padding-top: 4rem;
padding-bottom: 8rem;
top: 0;
left: 0;
display: flex;
justify-content: center;
cursor: pointer;
overflow: scroll;
    &::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
color: black;
@media (max-width: 1023px) {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 100vw;
    overflow-x: hidden;
}
`

const Modal = styled.div`
    width: 36.5rem;
    padding: 1.5rem 0rem 3rem 0rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 4vh 5vw 5vh 5vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
        width: 1rem;
        height: 1rem;
    }
`

const Title = styled.h1`
  margin-bottom: 2.2rem;
  font-size: 1.2rem;
  width: calc(100% + 8rem);
  margin-left: -2rem;
  padding-left: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #f8f8f8;
  padding-bottom: 1rem;
  color: black;
  font-weight: 700;
  @media (max-width: 1023px) {
      font-size: 1rem;
      line-height: 1.2;
      width: 95vw;
      margin-top: 0vh;
      margin-left: -2rem;
  }
`

const MinusBtn = styled.button`
    position: absolute;
    left: 0.5rem;
    top: 2.5rem;
    display: none;
    cursor: pointer;
    background: transparent;
`

const CompetitorContainer = styled.div`
    display: flex; 
    flex-direction: row;
    position: relative;
    margin-bottom: 0.5rem;
    padding: 0 2rem 0 2rem;
    gap: 0.75rem;
    &:hover ${MinusBtn} {
        display: block;
      }
`

const LabelIcon = styled.div`
width: 1rem;
height: 1rem;
margin-right: 0.4rem;
margin-left: 0.25rem;
margin-top: 0.1rem;
color: black;
`

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 9px 12px 9px 12px;
  border: none;
  border-radius: 15px;
  background: transparent;
  border: solid 2px #F6F6FB;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 1px 1px 10px rgba(22, 27, 29, 0.14);
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    width: 72vw;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;


const AddBtn = styled.button`
    border-radius: 50%;
    border: dashed 2px #DCDCDC;
    background: transparent;
    margin-top: 1rem;
    height: 3.5rem;
    width: 3.5rem;
    color: #DCDCDC;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        border: dashed 2px black;
        background-origin: border-box;
        background-clip: padding-box, border-box;
        color: black;
    }
`

const BlueBtn = styled.div`
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    margin-top: 3.5rem;
    width: 65%;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    }
`

const Texts = styled.div`
  color: black; 
  width: 75%;
  margin-top: 1.2rem; 
  font-weight: 500;
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;

