import Centered from "@/components/Centered";
import PageTemplate from "@/components/Common/PageTemplate"
import styled from "styled-components";
import Image from "next/image";
import CampaignSidebar from "@/components/Marketing/Campaigns/CampaignSidebar";
import { useEffect, useState } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronUp } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { CiRedo } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import api from "@/pages/api";
import { useRouter } from "next/router";
import Masonry from "react-masonry-css";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import BackBtnText from "@/components/Common/BackBtnText";
import backIcon from "../../../public/images/backArrow.png";

const breakpointColumnsObj = {
    default: 4,
    2000: 3,
    1250: 2,
    770: 1,
};

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

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
}

const Campaign = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [templates, setTemplates] = useState<TemplateProps[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>();
    const [templateCategories, setTemplateCategories] = useState<string[]>([]);
    const router = useRouter();
    const { query } = router;
    
    const LoremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida lorem a ante condimentum pretium. Aliquam in arcu non ex laoreet dictum ornare ut arcu. Suspendisse a augue tincidunt, consectetur risus at, auctor metus. Duis magna dui, ornare eu mattis vel, eleifend sed nisi. Vestibulum porta massa at risus imperdiet efficitur. Nam ut justo a lectus venenatis rutrum. Cras eleifend venenatis efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta nunc rutrum nunc accumsan laoreet.";

    const toggleCategoryExpansion = (category: string) => {
        setExpandedCategories((prevExpanded) =>
          prevExpanded.includes(category)
            ? prevExpanded.filter((c) => c !== category)
            : [...prevExpanded, category]
        );
      };
    
      useEffect(() => {
        const fetchTemplates = async () => {
            const { data } = await api.get("/templates");
            if (data) {
                const filteredTemplates = data.filter((template: { title: string; }) => template.title !== "Frameworks");
                setTemplates(filteredTemplates);
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
    

    return (
        <div>
            <PageTemplate>
            <PageContainer>
                <CampaignSidebar open={openSidebar} setOpen={setOpenSidebar} />
                <Header>
                    <div className="w-full flex items-center justify-between">
                    <BackBtn onClick={() => router.push("/marketing")}>
                        <BackBtnIcon>
                            <Image
                            style={{ width: "100%", height: "auto" }}
                            src={backIcon}
                            alt={"logo"}
                            ></Image>
                        </BackBtnIcon>
                        <BackBtnText>Back</BackBtnText>
                    </BackBtn>
                    <div></div>
                    <div className="text-black flex lg:flex-row flex-col">
                        <button
                        className={`h-4 text-black font-bold border-2 border-[#eaedf5] rounded-xl ml-2 mt-2 sm:px-8 px-4 py-5 flex items-center justify-between  lg:gap-6 gap-2 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300 shadow-lg`}
                        onClick={() => setOpenSidebar(true)}
                        >
                        <div>
                            <TbAdjustmentsHorizontal className="h-6 w-6" />
                        </div>
                        <span>Capmaign settings</span>
                        </button>
                    </div>
                    </div>
                </Header>
                <Centered>
                    <SectionsContainer
                    className="my-masonry-grid"
                    breakpointCols={breakpointColumnsObj}
                    >
                    {templates
                        .filter((category, index, self) => {
                        // Return true only for the first occurrence of each category
                        return (
                            index ===
                            self.findIndex((c) => c.category === category.category)
                        );
                        })
                        .map((category) => {
                        const isCategoryExpanded = expandedCategories.includes(
                            category.category
                        );
                        return (
                            <div
                            style={{boxShadow: "0px 4px 10px rgba(15, 27, 40, 0.15)"}}
                            className={classNames(expandedCategories.includes(category.category) ? "" : "hover:scale-95 hover:shadow-none duration-300", `h-auto text-black font-bold border-2 border-[#eaedf5] rounded-xl mt-[1rem] mx-[0.5rem] px-8 py-4 flex flex-col items-center justify-between gap-2 hover:cursor-pointer`)}
                            key={category._id}
                            onClick={() => toggleCategoryExpansion(category.category)}
                            >
                            <div className="flex justify-between w-full">
                                <div className="flex gap-2 items-center">
                                <Image
                                    src={category.icon}
                                    height={22}
                                    width={22}
                                    alt={`${category.category}'s icon`}
                                />
                                <span className="ml-2">{category.category}</span>
                                </div>
                                <div className="flex items-center">
                                {isCategoryExpanded ? (
                                    <BsChevronUp />
                                ) : (
                                    <BsChevronDown />
                                )}
                                </div>
                            </div>

                            {isCategoryExpanded && (
                                <div className="flex flex-col items-stretch">
                                <div className="pb-4 mt-4">
                                    <p className="text-justify font-medium">{LoremIpsum}</p>
                                </div>
                                <div className="border w-full border-[#eaedf5]" />
                                <div className="flex w-full justify-between items-center pt-4">
                                    <div className="flex gap-2 items-center">
                                    <CiRedo className="w-6 h-6" />
                                    <span>Rewrite</span>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                    <TbAdjustmentsHorizontal className="h-5 w-5" />
                                    <MdContentCopy className="h-5 w-5" />
                                    <FaRegBookmark className="h-5 w-5" />
                                    </div>
                                </div>
                                </div>
                            )}
                            </div>
                        );
                        })}
                    </SectionsContainer>
                </Centered>
                </PageContainer>
            </PageTemplate>
        </div>
    )
}

export default Campaign;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  color: black;
  border-bottom: 2px solid #eaedf5;
  padding-bottom: 2rem;
  @media (max-width: 1023px) {
    display: flex;
    padding: 1.5rem 1rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  width: 100%;
  border-radius: 25px;
  padding: 0.5rem 2rem 1.5rem 2rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
  border-radius: 20px;
  background: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;


const SectionsContainer = styled(Masonry)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 1rem;
`;