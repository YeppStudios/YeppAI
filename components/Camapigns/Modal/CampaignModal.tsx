import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FormEvent,
} from "react";
import { BsTools, BsChevronLeft } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Dropdown from "@/components/forms/Dropdown";
import { useRouter } from "next/router";
import api from "@/pages/api";
import Image from "next/image";
import Input from "../../forms/Input";
import { Switch } from "@headlessui/react";
import Label from "@/components/Common/Label";
import TextArea from "@/components/forms/TextArea";
import { CampaignDropdown } from "./CampaignDropdwon";

interface CampaginModalProps {
  setOpenCreateCampaignModal: Dispatch<SetStateAction<boolean>>;
}
interface SectionsProps {
  stepName: string;
  icon: JSX.Element;
  stepNumber: number;
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
}

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
  const [tone, setTone] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [campaignType, setCampaignType] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [campaginTitle, setCampaignTitle] = useState<string>("");
  const [useEmojis, setUseEmojis] = useState<boolean>(true);

  const filteredDropdownCategories = templates
    .filter((category, index, self) => {
      // Return true only for the first occurrence of each category
      return index === self.findIndex((c) => c.category === category.category);
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
      name: template.title,
      icon: template.icon,
    }));

    return dropdownValues;
  };

  const handleToggleEmojis = () => {
    setUseEmojis((prev) => !prev);
  };

  const submitThirdPageForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetAudienceInput = event.currentTarget.elements.namedItem(
      "targetAudience"
    ) as HTMLInputElement;
    setTargetAudience(targetAudienceInput?.value || "");

    const campaignObjectiveInput = event.currentTarget.elements.namedItem(
      "objectives"
    ) as HTMLInputElement;
    setObjectives(campaignObjectiveInput?.value || "");

    const keywordsInput = event.currentTarget.elements.namedItem(
      "keywords"
    ) as HTMLInputElement;
    setKeywords(keywordsInput?.value || "");
  };

  const submitSecondPageForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const campaignTitleInput = event.currentTarget.elements.namedItem(
      "campaignTitle"
    ) as HTMLInputElement;
    setCampaignTitle(campaignTitleInput?.value || "");

    const campaignTypeInput = event.currentTarget.elements.namedItem(
      "campaignType"
    ) as HTMLInputElement;
    setCampaignType(campaignTypeInput?.value || "");

    const languageInput = event.currentTarget.elements.namedItem(
      "language"
    ) as HTMLInputElement;
    setLanguage(languageInput?.value || "");

    const toneInput = event.currentTarget.elements.namedItem(
      "tone"
    ) as HTMLInputElement;
    setTone(toneInput?.value || "");

    const productTypeInput = event.currentTarget.elements.namedItem(
      "productType"
    ) as HTMLInputElement;
    setProductType(productTypeInput?.value || "");

    const useEmojisInput = event.currentTarget.elements.namedItem(
      "useEmojis"
    ) as HTMLInputElement;
    setUseEmojis(useEmojisInput?.checked || false);
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await api.get("/templates");
      if (data) {
        setTemplates(data);
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

  const sections: SectionsProps[] = [
    {
      stepName: "Placements",
      icon: <BsTools />,
      stepNumber: 1,
    },
    {
      stepName: "General",
      icon: <FaBook />,
      stepNumber: 2,
    },
    {
      stepName: "Knowledge",
      icon: <GiOpenBook />,
      stepNumber: 3,
    },
  ];

  const tones = [
    "Formal",
    "Friendly",
    "Informative",
    "Persuasive",
    "Motivational",
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

  return (
    <ModalBackground>
      <ModalContainer step={step} className="relative">
        <div className="flex w-full justify-between mb-4">
          <div className="flex items-center justify-center ">
            {step > 1 && (
              <BackArrow selectedTab={step} onClick={() => setStep(step - 1)}>
                <BsChevronLeft style={{ width: "150%", height: "auto" }} />
              </BackArrow>
            )}
          </div>
          <button onClick={() => setOpenCreateCampaignModal(false)}>
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>
        <div className="flex gap-8 items-center justify-center flex-wrap mb-4">
          {sections.map((section) => {
            return (
              <div
                className={`hover: cursor-pointer flex gap-4 items-center justify-center p-2 rounded-xl${
                  step === section.stepNumber ? " border-2 border-blue-700" : ""
                }`}
                onClick={() => setStep(section.stepNumber)}
              >
                {section.icon} <span>{section.stepName}</span>
              </div>
            );
          })}
        </div>
        {step === 1 && (
          <div>
            <div className="grid grid-cols-2 relative">
              {filteredDropdownCategories.map((template) => {
                const dropdownValues = filterDropdownValues(template.name);
                return (
                  <div
                    style={{
                      fontWeight: "500",
                      height: "auto",
                      boxShadow:
                        "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
                    }}
                    className={
                      "  appearance-none border-2 flex text-black items-center pl-3  m-2 h-full pr-4 relative py-2 rounded-full placeholder-[#DCDCDC] focus:outline-none text-md"
                    }
                  >
                    <CampaignDropdown
                      category={template}
                      values={dropdownValues}
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-full flex items-center justify-center absolute bottom-10 left-0 ">
              <button
                className="p-4 w-[40%] bg-blue-400 rounded-2xl text-white text-lg"
                onClick={() => setStep((prev) => prev + 1)}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={submitSecondPageForm}>
            <div className="grid grid-cols-2 ">
              <div className="p-4">
                <Label>Title</Label>
                <Input
                  name="campaignTitle"
                  height="2.75rem"
                  padding="1rem"
                  type="text"
                  value={campaginTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                />
              </div>
              <div className="p-4">
                <Label>Campaign type</Label>
                <Dropdown
                  name="campaignType"
                  value={campaignType}
                  values={campaignTypes}
                  onChange={setCampaignType}
                  placeholder="Educational"
                />
              </div>
              <div className="p-4">
                <Label>Language</Label>
                <Dropdown
                  name="language"
                  value={language}
                  values={languages}
                  onChange={setLanguage}
                  placeholder="English"
                />
              </div>
              <div className="p-4">
                <Label>Tone of voice</Label>
                <Dropdown
                  name="tone"
                  value={tone}
                  values={tones}
                  onChange={setTone}
                  placeholder="Friendly"
                />
              </div>
              <div className="p-4">
                <Label>What is it promoting?</Label>
                <Input
                  name="productType"
                  height="2.75rem"
                  padding="1rem"
                  type="text"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                />
              </div>
              <div className="p-4">
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
            </div>
            <div className="w-full flex items-center justify-center absolute bottom-10 left-0 ">
              <button
                type="submit"
                className="p-4 w-[40%] bg-blue-400 rounded-2xl text-white text-lg"
              >
                Continue
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={submitThirdPageForm}>
            <div className="p-2">
              <label>Target autdience</label>
              <Input
                height="4rem"
                padding="1rem"
                name="targetAudience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <div className="p-2">
              <label>Campaign's objective</label>
              <TextArea
                height="5.8rem"
                padding="0.75rem"
                placeholder="Set campaign's objectives"
                onChange={(e) => setObjectives(e.target.value)}
              />
            </div>
            <div className="p-2">
              <label>Keywords</label>
              <Input
                height="4rem"
                padding="1rem"
                name="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="w-full flex items-center justify-center absolute bottom-10 left-0">
              <button
                type="submit"
                className="p-4 w-[40%] bg-blue-400 rounded-2xl text-white text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};
const BackArrow = styled.button<{ selectedTab: any }>`
  background: transparent;
  width: 1.2rem;
  height: 1.2rem;
  top: 1rem;
  left: 1.5rem;
  z-index: 10;
  color: black;
  fill: red;
`;

const ModalContainer = styled.div<{ step: number }>`
  width: ${((props: { step: number }) => props.step === 3 || props.step === 2)
    ? "44rem"
    : "50rem"};
  padding: 3rem 4.5rem 4rem 4.5rem;
  background: white;
  box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  cursor: auto;
  z-index: 100;
  overflow: visible;

  @media (max-width: 1023px) {
    width: 90vw;
    padding: 4vh 5vw 5vh 5vw;
    box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
  }
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  flex-wrap: wrap;
  backdrop-filter: blur(7px);
  z-index: 100;
  top: 0;
  left: 0;
  padding: 3rem 0 10rem 0;
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
  @media (max-width: 768px) {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
`;
