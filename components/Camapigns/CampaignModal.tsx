import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import { BsTools, BsChevronLeft } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Dropdown from "@/components/forms/Dropdown";
import { useRouter } from "next/router";
import api from "@/pages/api";
import Image from "next/image";

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

  const filteredDropdownCategories = templates.filter(
    (category, index, self) => {
      // Return true only for the first occurrence of each category
      return index === self.findIndex((c) => c.category === category.category);
    }
  );

  const filterDropdownValues = (category: string): string[] => {
    const templatesInCategory = templates.filter(
      (template) => template.category === category
    );
    return templatesInCategory.map((template) => template.title);
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

  return (
    <ModalBackground>
      <ModalContainer step={step}>
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
        <div className="flex gap-8 items-center justify-center mb-4">
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
          <div className="grid grid-cols-2">
            {filteredDropdownCategories.map((template) => {
              const dropdownValues = filterDropdownValues(template.category);
              return (
                <div className="p-2">
                  <Dropdown value={template.category} values={dropdownValues} />
                </div>
              );
            })}
          </div>
        )}
        {step === 2 && <div>Second Page</div>}
        {step !== 3 && (
          <div className=" bg-red-300 flex items-center justify-center mt-12">
            <button
              className="p-4 w-[40%] bg-blue-300"
              onClick={() => setStep((prev) => prev + 1)}
            >
              Continue
            </button>
          </div>
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
