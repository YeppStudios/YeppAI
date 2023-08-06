import PageTemplate from "@/components/Common/PageTemplate";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Section from "@/components/Marketing/Section";

const LongContentCreationPage = dynamic(
  () => import("@/components/Marketing/creationPages/LongContentPage")
);
const DescriptionPage = dynamic(
  () => import("@/components/Marketing/creationPages/DescriptionPage")
);
const PostPage = dynamic(
  () => import("@/components/Marketing/creationPages/PostPage")
);
const SavedContentSidebar = dynamic(
  () => import("@/components/Marketing/SavedContentSidebar")
);
const EnhanceTextCreationPage = dynamic(
  () => import("@/components/Marketing/creationPages/EnhanceTextCreationPage")
);
const FrameworkCreationPage = dynamic(
  () => import("@/components/Marketing/creationPages/FrameworkCreationPage")
);
const BioPage = dynamic(
  () => import("@/components/Marketing/creationPages/BioPage")
);
const IdeasPage = dynamic(
  () => import("@/components/Marketing/creationPages/IdeasPage")
);
const HeadlinePage = dynamic(
  () => import("@/components/Marketing/creationPages/HeadlinePage")
);
const ScriptPage = dynamic(
  () => import("@/components/Marketing/creationPages/ScriptPage")
);
const ReplyPage = dynamic(
  () => import("@/components/Marketing/creationPages/ReplyPage")
);
import { useRouter } from "next/router";
import Head from "next/head";
import Masonry from "react-masonry-css";
import {
  BsBookmarkStarFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import api from "./api";
import Image from "next/image";
import Dropdown from "@/components/forms/Dropdown";
import Space from "@/components/Docs/common/Space";

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

const ContentCreator = () => {
  const [currentPage, setCurrentPage] = useState("menu");
  const [mobile, setMobile] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const userPlan = useSelector(selectedPlanState);
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<any>();
  const [templateCategories, setTemplateCategories] = useState<string[]>([]);

  const { query } = router;

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data } = await api.get("/templates");
      if (data) {
        setTemplates(data);
      } else {
        console.log("wrong fetch");
      }
      if(query.contentId) {
        try {
          const token = localStorage.getItem("token");
          const { data } =await api.get(`/getContentPiece/${query.contentId}`, {
            headers: {
              authorization: token,
            },
          });
          setSelectedTemplate(data)
        } catch (e) {
          console.log(e);
        }
      }
      data.filter((category: { category: string; }, index: any, self: any[]) => {
        return (
          index === self.findIndex((c) => c.category === category.category)
        );
        }).map((category: { category: string; }) => {
            setTemplateCategories((prev) => [...prev, category.category]);
        });
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1023) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    if (query.page) {
      setCurrentPage(query.page as string);
    }
  }, [query]);

  const back = () => {
    if (query.contentId) {
      router.back();
    } else {
      router.push(`/marketing?page=menu`);
    }
    setSelectedTemplate(undefined);
  };

  const handleOpenSaved = () => {
    setOpenSaved(false);
  };

  const HandleCategoryChange = (name: string) => {
    if (name === currentCategory) {
      setCurrentCategory("");
    } else {
      setCurrentCategory(name);
    }
  };

  const openForm = (template: any) => {
    router.push(`/marketing/?page=${template.query}&type=${template.title.split(" ")[0]}`);
    setSelectedTemplate(template);
  }

  const renderSections = () => {
    const filteredSections = templates.filter(
      (section) => section.category === currentCategory
    );
    const arrayToFetch = currentCategory === "" ? templates : filteredSections;
    const fetchedSections = arrayToFetch.map((section) => {
      return (
        <div
          id={section._id}
          key={section.title}
          onClick={() => openForm(section)}
        >
          <Section
            image={section.icon}
            title={section.title}
            description={section.description}
          ></Section>
        </div>
      );
    });
    return (
      <SectionsContanier
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName={MasonryColumn}
        style={{ marginTop: "0rem" }}
      >
        {fetchedSections}
      </SectionsContanier>
    );
  };

  return (
    <>
      <SavedContentSidebar setOpen={handleOpenSaved} open={openSaved} setTemplate={setSelectedTemplate}/>
      <PageTemplate userProfiles={[]}>
        <Head>
          <title>Marketing | Yepp AI</title>
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Effortlessly generate unique marketing content with your custom AI based on your files, websites and videos."
          />
        </Head>
        <PageContainer>
          {currentPage == "menu" && (
            <Header>
              <div>
                <PageTitle>Marketing</PageTitle>
                <PageDescription>
                  Unleash the potential of AI in marketing.
                </PageDescription>
              </div>

              <ActionContainer>
                <ActionBtn onClick={() => setOpenSaved(true)} square={true}>
                  <ActionBtnIcon>
                    <BsBookmarkStarFill
                      style={{ width: "auto", height: "100%" }}
                    />
                  </ActionBtnIcon>
                </ActionBtn>
                {userPlan && userPlan._id !== "647895cf404e31bfe8753398" && (
                  <ActionBtn
                    onClick={() => router.push("/assets")}
                    square={true}
                  >
                    <ActionBtnIcon>
                      <BsFillArchiveFill
                        style={{ width: "auto", height: "100%" }}
                      />
                    </ActionBtnIcon>
                  </ActionBtn>
                )}
                {mobile &&
                <div className="mt-4 ml-2 w-full flex">
                <Dropdown
                  id="name"
                  type="text"
                  placeholder="Filter"
                  required
                  value={currentCategory}
                  values={templateCategories}
                  onChange={setCurrentCategory}
                />
                </div>
                }
              </ActionContainer>
            </Header>
          )}
          {(currentPage === "menu" && !mobile) && (
            <div className="flex w-full flex-wrap">
              {templates
                .filter((category, index, self) => {
                  // Return true only for the first occurrence of each category
                  return (
                    index ===
                    self.findIndex((c) => c.category === category.category)
                  );
                })
                .map((category) => {
                  return (
                    <div
                      className={`h-4 bg-white text-black font-bold border-2 rounded-xl m-2 px-10 py-6 flex items-center justify-center gap-2 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300 ${
                        currentCategory === category.category
                          ? "border-2  border-black"
                          : "border border-gray-100 shadow-md"
                      }`}
                      key={category._id}
                      onClick={() => HandleCategoryChange(category.category)}
                    >
                      <Image
                        src={category.icon}
                        height={22}
                        width={22}
                        alt={`${category.category}'s icon`}
                      />
                      <span className="ml-2">{category.category}</span>
                    </div>
                  );
                })}
            </div>
          )}
          {currentPage === "post" && (
            <PostPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "bio" && (
            <BioPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "hashtags" && (
            <IdeasPage back={back} query={query} template={selectedTemplate} />
          )}
          {currentPage === "headline" && (
            <HeadlinePage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "description" && (
            <DescriptionPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "script" && (
            <ScriptPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "long-form" && (
            <LongContentCreationPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "framework" && (
            <FrameworkCreationPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "enhance" && (
            <EnhanceTextCreationPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "ideas" && (
            <IdeasPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "reply" && (
            <ReplyPage back={back} query={query} template={selectedTemplate}/>
          )}
          {currentPage === "menu" && renderSections()}
        </PageContainer>
      </PageTemplate>
    </>
  );
};

export default ContentCreator;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 20px;
  background-color: #F8F4ED;
  box-shadow: inner 2px 2px 10px rgba(15, 27, 40, 0.15);
  width: 100%;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    position: relative;
    border: none;
    overflow-x: hidden;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
`;

const SectionsContanier = styled(Masonry)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 1rem 0rem 3rem 0rem;
  @media (max-width: 1023px) {
    padding: 0vh 0 2vh 0vw;
    width: 100vw;
  }
`;

const PageTitle = styled.h1`
  color: black;
  font-size: 2.4rem;
  font-weight: 700;
  width: 100%;
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`;
const PageDescription = styled.p`
  color: black;
  font-size: 1.2rem;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`;
const MasonryColumn = styled.div`
  background-clip: padding-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  @media (max-width: 1023px) {
    display: flex;
    padding-left: 1.5rem;
    padding: 1rem 1rem 2rem 1.5rem;
    background-color: white;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    margin-top: 1rem;
    flex-wrap: wrap;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
  }
`;

const ActionBtn = styled.div<{ square: boolean }>`
  padding: ${(props) => (props.square ? "1rem 1.2rem" : "1rem 1.2rem")};
  margin-left: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border: 2px solid #eaedf5;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 2px 5px rgba(15, 27, 40, 0.1);
  align-items: center;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    transform: scale(0.95);
  }
  @media (max-width: 1023px) {
    margin-left: 0;
    margin-right: 0.75rem;
    margin-top: 1rem;
  }
`;

const ActionBtnIcon = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;
const BtnText = styled.p`
  font-weight: 700;
  margin-left: 1rem;
  font-size: 0.75rem;
`;
