import FirstPageTemplate from "@/components/Common/FirstPageTemplate";
import PageTemplate from "@/components/Common/PageTemplate";
import React, { useState, useEffect, Fragment } from "react";
import Masonry from "react-masonry-css";

import { useRouter } from "next/router";
import {
  BsFillArchiveFill,
  BsPencilFill,
  BsTrash,
  BsChevronLeft,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import styled from "styled-components";
import classNames from "classnames";
import Image from "next/image";

import api from "@/pages/api";

import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";

import { CampaignModal } from "@/components/Camapigns/Modal/CampaignModal";
import Centered from "@/components/Centered";
import { CiRedo } from "react-icons/ci";

const Campagin = () => {
  //place to fetch content for campaigns. For now i will use copywrite content as placeholder.

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

  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedContent, setSavedContent] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState<boolean>(false);
  const [templates, setTemplates] = useState<TemplateProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>();
  const [templateCategories, setTemplateCategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([""]);

  const router = useRouter();
  const breakpointColumnsObj = {
    default: 4,
    2000: 3,
    1250: 2,
    770: 1,
  };
  const { query } = router;

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

  useEffect(() => {
    if (window.innerWidth <= 1023) {
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const fetchSavedContent = async () => {
      setLoading(true);
      try {
        const fetchedContent = await api.get(`/getUserSeoContent`, {
          headers: {
            authorization: token,
          },
        });
        setSavedContent(fetchedContent.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSavedContent();
  }, []);

  const handleOpenDocument = (id: string) => {
    router.push(`/copywriting?contentId=${id}`);
    setPage(2);
  };

  const handleDeleteDocument = async (id: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      await api.delete(`/deleteSeoContent/${id}`, {
        headers: {
          authorization: token,
        },
      });
      const documentContent = savedContent.filter(
        (content: { _id: string }) => content._id !== id
      );
      setSavedContent(documentContent);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(category)
        ? prevExpanded.filter((c) => c !== category)
        : [...prevExpanded, category]
    );
  };

  const [openCreateCamapginModal, setOpenCreateCampaignModal] = useState(false);
  const LoremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam gravida lorem a ante condimentum pretium. Aliquam in arcu non ex laoreet dictum ornare ut arcu. Suspendisse a augue tincidunt, consectetur risus at, auctor metus. Duis magna dui, ornare eu mattis vel, eleifend sed nisi. Vestibulum porta massa at risus imperdiet efficitur. Nam ut justo a lectus venenatis rutrum. Cras eleifend venenatis efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta nunc rutrum nunc accumsan laoreet.";

  //not sure if this component should be here, or template file
  const renderContent = () => {
    const renderedContent = savedContent.map((content, index) => {
      return (
        <tr key={content._id} onClick={() => handleOpenDocument(content._id)}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"></td>
          <td className="whitespace-nowrap px-3 py-4 text-base text-slate-700">
            {mobile ? `${content.title.slice(0, 28)}...` : content.title}
          </td>
          <td className="hidden whitespace-nowrap px-3 py-4 text-base text-slate-700 lg:table-cell">
            {content.timestamp}
          </td>
          <td className="hidden whitespace-nowrap px-3 py-4 text-base text-slate-700 lg:table-cell">
            {content.savedBy}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <button
              onClick={() => handleOpenDocument(content._id)}
              className="text-blue-600 hover:text-blue-900 font-semibold"
            >
              Open
            </button>
          </td>
          <td
            onClick={(e) => e.stopPropagation()}
            className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
          >
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center text-sm font-semibold text-gray-900 focus:outline-none">
                  <OptionsIcon>
                    <SlOptionsVertical
                      style={{ color: "black", width: "100%" }}
                    />
                  </OptionsIcon>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-20 mt-2 py-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleDeleteDocument(content._id)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "group w-full flex items-center px-4 py-2 text-sm"
                        )}
                      >
                        <BsTrash
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </td>
        </tr>
      );
    });
    return (
      <tbody className="divide-y divide-gray-200 bg-white">
        {renderedContent}
      </tbody>
    );
  };

  //placeholder for custom action buttons
  const ActionButtons = (props: { openModal: any }) => {
    const router = useRouter();
    return (
      <ActionContaienr>
        <ActionBtn onClick={() => router.push("/assets")}>
          <BsFillArchiveFill style={{ width: "auto", height: "35%" }} />
        </ActionBtn>
        <WriteBtn onClick={props.openModal}>
          <BsPencilFill style={{ width: "auto", height: "35%" }} />
          <BtnText>New campaign</BtnText>
        </WriteBtn>
      </ActionContaienr>
    );
  };
  return (
    <PageTemplate>
      {openCreateCamapginModal && (
        <CampaignModal
          setOpenCreateCampaignModal={setOpenCreateCampaignModal}
        />
      )}
      {isFirstPage ? (
        <FirstPageTemplate
          name="Campagin"
          description="Campaign description"
          renderContent={renderContent}
          actionButtons={
            <ActionButtons openModal={() => setOpenCreateCampaignModal(true)} />
          }
          savedContent={savedContent}
          loading={loading}
        />
      ) : (
        <PageContainer>
          <Header>
            <div className="w-full flex items-center justify-between">
              <button className="flex gap-4 items-center">
                <BsChevronLeft className="w-4 h-4 fill-black" />
                <span>Back</span>
              </button>
              <div className="text-black flex gap-4">
                <button
                  className={`h-4 text-black font-bold border-2 border-[#eaedf5] rounded-xl m-2 px-6 py-5 flex items-center justify-between gap-6 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300 ${"border border-gray-100 shadow-lg"}`}
                >
                  <FaRegBookmark className="h-6 w-6" />
                  <span>Saved</span>
                </button>
                <button
                  className={`h-4 text-black font-bold border-2 border-[#eaedf5] rounded-xl m-2 px-8 py-5 flex items-center justify-between gap-6 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300 ${"border border-gray-100 shadow-lg"}`}
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
            <SectionsContanier
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
                      className={`h-auto text-black font-bold border-2 border-[#eaedf5] rounded-xl m-2 px-10 py-6 flex flex-col items-center justify-between gap-2 hover:cursor-pointer hover:scale-95 hover:shadow-none duration-300`}
                      key={category._id}
                      onClick={() => toggleCategoryExpansion(category.category)}
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2 ">
                          <Image
                            src={category.icon}
                            height={22}
                            width={22}
                            alt={`${category.category}'s icon`}
                          />
                          <span className="ml-2">{category.category}</span>
                        </div>
                        <div>
                          {isCategoryExpanded ? (
                            <BsChevronUp />
                          ) : (
                            <BsChevronDown />
                          )}
                        </div>
                      </div>

                      {isCategoryExpanded && (
                        <div className="flex flex-col items-stretch">
                          <div className=" pb-4 ">
                            <p className="text-justify">{LoremIpsum}</p>
                          </div>
                          <div className="border w-full border-gray-300  " />
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
            </SectionsContanier>
          </Centered>
        </PageContainer>
      )}
    </PageTemplate>
  );
};

const SectionsContanier = styled(Masonry)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  color: black;
  margin-bottom: 4rem;
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
  border: 2px solid #eaedf5;
  width: 100%;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
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
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;

const ActionBtn = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-left: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border: 2px solid #eaedf5;
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
const WriteBtn = styled.div`
  width: 15rem;
  height: 3.5rem;
  margin-left: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
    inset -2px -2px 4px #fafbff, 1px 1px 3px rgba(22, 27, 29, 0.23);
  border: solid 3px transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  position: relative;
  white-space: nowrap;
  color: white;
  font-weight: 500;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  background-size: 110%;
  background-position-x: -0.5rem;
  align-items: center;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    transform: scale(0.95);
  }
  @media (max-width: 1023px) {
    margin-left: 0;
    margin-right: 0rem;
    margin-top: 1rem;
    flex: 1;
    max-width: 50%;
  }
`;
const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1023px) {
    justify-content: center;
    width: 100%;
  }
`;
const BtnText = styled.p`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`;
const OptionsIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
`;

export default Campagin;
