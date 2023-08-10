import {
    FC,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
    FormEvent,
  } from "react";
  import { BsFillCollectionFill, BsChevronLeft } from "react-icons/bs";
  import { FaBook } from "react-icons/fa";
  import { GiOpenBook } from "react-icons/gi";
  import { BsXLg } from "react-icons/bs";
  import styled from "styled-components";
  import Dropdown from "@/components/forms/Dropdown";
  import { useRouter } from "next/router";
  import api from "@/pages/api";
  import Image from "next/image";
  import Input from "../../forms/Input";
  import { Switch } from "@headlessui/react";
  import Label from "@/components/Common/Label";
  import TextArea from "@/components/forms/TextArea";
  import BackBtn from '@/components/Common/BackBtn';
  import BackBtnIcon from '@/components/Common/BackBtnIcon';
  import { CampaignDropdown } from "./CampaignDropdown";
  import SlideBottom from "@/components/Animated/SlideBottom";
  import { Textarea } from "@mantine/core";
  import CustomDropdown from "@/components/forms/CustomDropdown";
  import { set } from "lodash";
  import { BlueLoader, Loader } from "@/components/Common/Loaders";
  import { selectedUserState } from "@/store/userSlice";
  import { useSelector } from "react-redux";
  import { selectFoldersState } from '@/store/selectedFoldersSlice'
  import FoldersDropdown from "@/components/forms/FolderDropdown";

  interface CampaginModalProps {
    setOpenCreateCampaignModal: Dispatch<SetStateAction<boolean>>;
  }
  interface SectionsProps {
    stepName: string;
    icon: JSX.Element;
    stepNumber: number;
  }

  interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[] | [],
    updatedAt: string,
    _id:  string,
    workspace: string,
  }
  
  interface TemplateProps {
    _id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    likes: any[];
    icon: string;
    query: string;
    prompt: string;
  }

  const sections: SectionsProps[] = [
    {
      stepName: "Placements",
      icon: <BsFillCollectionFill />,
      stepNumber: 1,
    },
    {
      stepName: "General",
      icon: <FaBook />,
      stepNumber: 2,
    },
    {
      stepName: "About",
      icon: <GiOpenBook />,
      stepNumber: 3,
    },
  ];

  const tones = [
    "Formal ",
    "Formal 💼",
    "Friendly 😊",
    "Informative 📃",
    "Persuasive 🫵🏼",
    "Informal 😎",
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

  const campaignTypes = [
    "Educational",
    "Informative",
    "Advertisement",
    "Lifestyle",
  ];
  
  export const CampaignModal: FC<CampaginModalProps> = ({
    setOpenCreateCampaignModal,
  }) => {
    const router = useRouter();
    const { query } = router;
  
    const [step, setStep] = useState(1);
    const [templates, setTemplates] = useState<TemplateProps[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>();
    const [templateCategories, setTemplateCategories] = useState<string[]>([]);
    const [targetAudience, setTargetAudience] = useState<string>("");
    const [objectives, setObjectives] = useState<string>("");
    const [keywords, setKeywords] = useState<string>("");
    const [tone, setTone] = useState<string>("Informal 😎");
    const [language, setLanguage] = useState<string>("English");
    const [campaignType, setCampaignType] = useState<string>("Advertisement");
    const [openedCategory, setOpenedCategory] = useState<string>("");
    const [productType, setProductType] = useState<string>("");
    const [campaginTitle, setCampaignTitle] = useState<string>("");
    const [useEmojis, setUseEmojis] = useState<boolean>(true);
    const [chosenTemplates, setChosenTemplates] = useState<any[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector(selectedUserState);
    let selectedFolders: any[] = useSelector(selectFoldersState);
    const [mobile, setMobile] = useState(true);

    useEffect(() => {
      if (window.innerWidth >= 1023) {
        setMobile(false);
      }
    }, [])
    
    const filteredDropdownCategories = templates
      .filter((category, index, self) => {
        return (
          index ===
          self.findIndex(
            (c) => c.category === category.category && c.category !== "Frameworks"
          )
        );
      })
      .map((category) => ({
        name: category.category,
        icon: category.icon,
      }));
  
    const filterDropdownValues = (category: string) => {
      const templatesInCategory = templates.filter(
        (template) => template.category === category
      );
      const dropdownValues = templatesInCategory.map((template) => ({
        title: template.title,
        icon: template.icon,
        _id: template._id,
        description: template.description,
        category: template.category,
        query: template.query,
        prompt: template.prompt,
        author: template.author,
        likes: template.likes
      }));
  
      return dropdownValues;
    };
  
    const handleToggleEmojis = () => {
      setUseEmojis((prev) => !prev);
    };
  
  
    useEffect(() => {
      setLoadingCategories(true);
      const fetchTemplates = async () => {
        const { data } = await api.get("/templates");
        if (data) {
          setTemplates(data);
          setLoadingCategories(false);
        } else {
          console.log("wrong fetch");
        }
        if (query.contentId) {
          try {
            const token = localStorage.getItem("token");
            const { data } = await api.get(
              `/getContentPiece/${query.contentId}`,
              {
                headers: {
                  authorization: token,
                },
              }
            );
            setSelectedTemplate(data);
          } catch (e) {
            console.log(e);
          }
        }
        data
          .filter((category: { category: string }, index: any, self: any[]) => {
            return (
              index === self.findIndex((c) => c.category === category.category)
            );
          })
          .map((category: { category: string }) => {
            setTemplateCategories((prev) => [...prev, category.category]);
          });
      };
      fetchTemplates();
    }, []);
  
    const createCampaign = async (e: any) => {
      e.preventDefault();
      if (loading) {
        return;
      }
      setLoading(true);
      const workspace = localStorage.getItem("workspace");
      let fetchedUser = user;
      if (workspace && workspace !== "null" && workspace !== "undefined") {
        const {data} = await api.get(`/workspace-company/${workspace}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          }
        });
        fetchedUser = data.company;
      }
      try {
        const documentsResponse = await api.post('/folders/documents', {folderIds: selectedFolders}, {
          headers: {
              Authorization: localStorage.getItem("token")
        }});

        const mappedTemplates = chosenTemplates.map(template => ({
          data: template,
          text: ""
      }));

        const { data } = await api.post("/addCampaign", 
        {
          title: campaginTitle,
          templates: mappedTemplates,
          type: campaignType,
          language: language,
          toneOfVoice: tone,
          about: productType,
          useEmojis: useEmojis,
          keywords: keywords,
          objective: objectives,
          targetAudience: targetAudience,
          owner: fetchedUser._id,
          workspace: workspace,
          documents: documentsResponse.data,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        router.push(`/campaign/${data._id}`);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  
    const renderStepText = () => {
      switch (step) {
        case 1:
          return (
            <span>
              Select campaign placements
            </span>
          );
        case 2:
          return (
            <span>
              Define new campaign
            </span>
          );
        case 3:
          return (
            <span>
              Provide AI with knowledge
            </span>
          );
      }
    };
  
    const handleModalClick = (e: any) => {
      e.stopPropagation();
      setOpenedCategory("");
    }
  
    return (
      <ModalBackground>
        <SlideBottom>
        <ModalContainer onClick={(e) => handleModalClick(e)} step={step} className="relative ">
          <div className="flex w-full justify-between">
            <CloseIcon onClick={() => setOpenCreateCampaignModal(false)}>
                      <BsXLg style={{width: "100%", height: "auto"}}/>
              </CloseIcon>
          </div>
          <Title>
            {renderStepText()}
          </Title>
          {!mobile &&
          <div className="flex gap-8 items-center justify-center flex-wrap mb-8">
            {sections.map((section, index) => {
              if (step === section.stepNumber) {
                return (
                  <SelectedMainTab key={index} onClick={() => setStep(section.stepNumber)}>
                    <TabIcon>{section.icon} </TabIcon>
                    <span>{section.stepName}</span>
                  </SelectedMainTab>
                );
              } else
                return (
                  <MainTab onClick={() => setStep(section.stepNumber)}>
                    <TabIcon>{section.icon} </TabIcon>
                    <span>{section.stepName}</span>
                  </MainTab>
                );
            })}
          </div>
          }
          {step === 1 && (
            <div className="flex justify-around flex-col">
              {loadingCategories ?
              <div className="w-full py-8 flex justify-center"><BlueLoader /></div>
              :
              <div className="grid sm:grid-cols-2 grid-cols-1 relative">
              {filteredDropdownCategories.map((category, index) => {
                let dropdownValues = filterDropdownValues(category.name);

                if (category.name === "Other") {
                  dropdownValues = dropdownValues.filter(value => 
                    value.title === "Press Release" || value.title === "Product Description"
                  );
                }

                if (category.name === "Email") {
                  dropdownValues = dropdownValues.filter(value => value.title !== "Email Reply");
                }

                return (
                  <div key={index} onClick={(e) => e.stopPropagation()}>
                    <CampaignDropdown
                      category={category}
                      values={dropdownValues}
                      openedCategory={openedCategory}
                      setOpenedCategory={setOpenedCategory}
                      setChosenTemplates={setChosenTemplates}
                      chosenTemplates={chosenTemplates}
                    />
                  </div>
                );
              })}
            </div>
              }
              <ButtonContainer>
                <ContinueBtn onClick={() => setStep((prev) => prev + 1)}>
                  Continue
                </ContinueBtn>
              </ButtonContainer>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="md:grid md:grid-cols-2">
                <div className="pb-6 pr-3 pl-3 pt-0">
                  <Label>Title</Label>
                  <Input
                    name="campaignTitle"
                    height="2.75rem"
                    placeholder="Campaign title"
                    padding="1rem"
                    type="text"
                    value={campaginTitle}
                    onChange={(e) => setCampaignTitle(e.target.value)}
                  />
                </div>
                <div className="pb-6 pr-3 pl-3 pt-0">
                  <Label>Campaign type</Label>
                  <CustomDropdown
                    name="campaignType"
                    value={campaignType}
                    values={campaignTypes}
                    onChange={setCampaignType}
                    placeholder="Educational"
                  />
                </div>
                <div className="pb-6 pr-3 pl-3 pt-0">
                  <Label>Language</Label>
                  <CustomDropdown
                    name="language"
                    value={language}
                    values={languages}
                    onChange={setLanguage}
                    placeholder="English"
                  />
                </div>
                <div className="pb-6 pr-3 pl-3 pt-0">
                  <Label>Tone of voice</Label>
                  <CustomDropdown
                    name="tone"
                    value={tone}
                    values={tones}
                    onChange={setTone}
                    placeholder="Friendly"
                  />
                </div>
              </div>

                <div className="w-full pb-6 pr-3 pl-3 pt-0">
                  <Label>What is the campaign promoting?</Label>
                  <Input
                    name="productType"
                    height="2.75rem"
                    padding="1rem"
                    placeholder="Yepp AI- generative ai platform for marketing"
                    type="text"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  />
                </div>
                  <div className="pr-3 pl-3 pt-0">
                    <Label className="pb-2">Use relevant emojis</Label>
                    <Switch
                      name="useEmojis"
                      checked={useEmojis}
                      onChange={handleToggleEmojis}
                      style={{
                        boxShadow: "inset 4px 4px 20px rgba(255, 255, 255, 0.35)",
                      }}
                      className={`${
                        useEmojis ? "bg-green-400" : "border-2 border-gray-200"
                      } relative inline-flex items-center h-7 rounded-full w-16 transition-colors focus:outline-none`}
                      >
                      <span className="sr-only">Toggle Tone</span>
                      <span
                        className={`${
                          useEmojis
                            ? "translate-x-10"
                            : "-translate-x-1 border-2 border-gray-200"
                        } inline-block w-7 h-7 transform bg-white border rounded-full transition-transform`}
                      />
                    </Switch>
                  </div>
              <ButtonContainer>
                <ContinueBtn type="submit" onClick={() => setStep(3)}>Continue</ContinueBtn>
              </ButtonContainer>
            </div>
          )}
          {step === 3 && (
            <form onSubmit={(e) => createCampaign(e)}>
              <div className="pb-6 pt-0">
              <FoldersDropdown />
              </div>
              <div className="pb-6 pr-3 pl-3 pt-0">
                <Label>Target autdience</Label>
                <Input
                  height="2.8rem"
                  padding="1rem"
                  name="targetAudience"
                  placeholder="Marketing agencies looking for AI tools"
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
              <div className="pb-6 pr-3 pl-3 pt-0">
                <Label>Campaign&apos;s main objective</Label>
                <Input
                  height="2.8rem"
                  padding="1rem"
                  placeholder="Set campaign's objectives"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                />
              </div>
              <div className="pr-3 pl-3 pt-0">
                <Label>Keywords</Label>
                <TextArea
                  height="4rem"
                  padding="0.65rem"
                  placeholder="marketing, ai, generative ai, content creation"
                  name="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>
              <ButtonContainer>
                <ContinueBtn type="submit">
                        {loading ?
                        <Loader color="white" />
                        :
                        <>
                        <p>Create Campaign</p>
                        </>
                        }
                </ContinueBtn> 
              </ButtonContainer>
            </form>
          )}
        </ModalContainer>
        </SlideBottom>
      </ModalBackground>
    );
  };
  
  const ModalContainer = styled.div<{step: number}>`
      width: 44rem;
      padding: 1.4rem 4rem 3rem 4rem;
      background: white;
      border: 2px solid #eaedf5;
      box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
      border-radius: 25px;
      cursor: auto;
      overflow: visible;
      margin-top: 2.5rem;
      @media (max-width: 1023px) {
          width: 95vw;
          padding: 4vh 5vw 5vh 5vw;
          box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
          margin-top: 2rem;
          margin-bottom: 6rem;
      }
  `

  const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
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

  const Title = styled.h1`
      margin-bottom: 2.2rem;
      font-size: 1.2rem;
      width: 43.75rem;
      margin-left: -4rem;
      padding-left: 3rem;
      border-bottom: 1px solid #eaedf5;
      padding-bottom: 1rem;
      color: black;
      font-weight: 500;
      @media (max-width: 1023px) {
        font-size: 1rem;
        line-height: 1.2;
        width: 90vw;
        margin-left: -2.5rem;
    }
  `
  
  const MainTab = styled.div`
      padding: 0.55rem 0rem 0.55rem 0rem;
      font-weight: 500;
      margin: 0 0.5rem 0 0.5rem;
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      border-radius: 12px;
      cursor: pointer;
      color: black;
      @media (max-width: 1023px) {
          font-size: 0.75rem;
          margin: 0;
          background-color: transparent;
          margin-bottom: 0.4rem;
          padding: 0.55rem 2rem 0.55rem 2rem;
      }
  `
  

  const SelectedMainTab = styled.div`
    padding: 0.55rem 2rem 0.55rem 2rem; 
    font-weight: 500;
    margin: 0 0.5rem 0 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    background: #EEF1F8;
    border: solid 3px transparent;
    overflow: hidden;
    color: black;
    border-radius: 12px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
        padding: 0.55rem 2rem 0.55rem 2rem;
        margin: 0;
        margin-bottom: 0.4rem;
    }
  `
    
  const TabIcon = styled.div`
    width: 1.4rem;
    margin-right: 0.75rem;
  `;
  
  
  const ContinueBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  position: relative;
  color: white;
  font-weight: 500;
  width: 100%;
  height: 3rem;
  z-index: 0;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 110%;
  background-position-x: -1rem;
  transition: all 0.4s ease;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
  }
  `

  const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 7rem 0 7rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.8rem;
    @media (max-width: 1023px) {
      padding: 0 1rem 0 1rem;
      margin-top: 4rem;
    }
  `;
  
  
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