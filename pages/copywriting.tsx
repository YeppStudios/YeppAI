import PageTemplate from "@/components/Common/PageTemplate";
import Head from "next/head";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import dynamic from "next/dynamic";
const CopywritingModal = dynamic(() => import("@/components/Copywriting/CopywritingModal"));
const TextEditor = dynamic(() => import("@/components/Copywriting/TextEditor"));
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import { BsTrash, BsPencilFill, BsFillArchiveFill } from "react-icons/bs";
import { useRouter } from "next/router";
import api from "@/pages/api";
import documentIcon from "@/public/images/document-icon.png";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import classNames from "classnames";
import FirstPageTemplate from "@/components/Common/FirstPageTemplate";
import OnboardingModal from "@/components/Modals/OnboardingModals/FeatureOnboarding";

const DocumentCreator = () => {
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [copywritingModal, setCopywritingModal] = useState(false);
  const [embeddedVectorIds, setEmbeddedVectorIds] = useState<any[]>([]);
  const [toneOfVoice, setToneOfVoice] = useState("Informative");
  const [selectedPersonaPrompt, setSelectedPersonaPrompt] = useState("");
  const [conspect, setConspect] = useState<any>(null);
  const [title, setTitle] = useState("New Document");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [sectionLength, setSectionLength] = useState();
  const [selectedTonePrompt, setSelectedTonePrompt] = useState("");
  const [page, setPage] = useState(1);
  const [contentType, setContentType] = useState("");
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedContent, setSavedContent] = useState<any[]>([]);
  const [openOnboarding, setOpenOnboarding] = useState(false);

  const finishCopywritingIntro = async () => {
    setPage(2);
    setCopywritingModal(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth <= 1023) {
      setMobile(true);
    }
    const onboarding = localStorage.getItem("onboarding");
    if (onboarding) {
      if (!onboarding.includes("copywriting") && onboarding.length > 0) {
        setOpenOnboarding(true);
      }
    }
    const token = localStorage.getItem("token");
    const fetchSavedContent = async () => {
      setLoading(true);

      const profileId = localStorage.getItem("profile_id");

      let url = `/getUserSeoContent`;
      if (profileId) {
        url = `/getProfileSeoContent/${profileId}`
      }

      try {
        const fetchedContent = await api.get(url, {
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

  const closeOnboarding = () => {
    setOpenOnboarding(false);
    const prevOnboardingState = localStorage.getItem("onboarding");
    const updatedOnboardingState = prevOnboardingState + " copywriting";
    localStorage.setItem("onboarding", updatedOnboardingState);
  }

  const renderContent = () => {
    const renderedContent = savedContent.map((content, index) => {
      return (
        <tr key={content._id} onClick={() => handleOpenDocument(content._id)} className={index !== savedContent.length - 1 ? "border-b-2 border-slate-100" : ""}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
            <Image
              src={documentIcon}
              className="flex-none w-8 h-8"
              alt={"icon"}
            />
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-base text-slate-700">
            {mobile ? <p>{content.title.slice(0, 20)}...</p> : <>{content.title.length > 75 ? <p>{content.title.slice(0, 75)}...</p> : content.title}</>}
          </td>
          {/* <td className="hidden whitespace-nowrap px-3 py-4 text-base text-slate-700 lg:table-cell">
            {content.timestamp}
          </td> */}
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

  const ActionButtons = (props: { openModal: any }) => {
    return (
      <ActionContaienr>
        <WriteBtn onClick={() => props.openModal()}>
          <BsPencilFill style={{ width: "auto", height: "35%" }} />
          <BtnText>New content</BtnText>
        </WriteBtn>
      </ActionContaienr>
    );
  };

  return (
    <PageTemplate userProfiles={[]}>
      <Head>
        <title>Copywriting | Yepp AI</title>
        <meta
          name="description"
          content="Craft unique SEO internet-based content on any topic with AI."
        />
      </Head>
      {openNoElixirModal && (
        <NoElixir onClose={() => setOpenNoElixirModal(false)} />
      )}
      {openOnboarding && <OnboardingModal onClose={closeOnboarding} title="Experience AI copywriting" description="We've prepared for you a comprehensive flow that will help you write the best long-form content possible." videoUrl="https://www.youtube.com/embed/0wvlz7IHsrQ"/>}
      {copywritingModal && (
        <CopywritingModal
          onClose={() => setCopywritingModal(false)}
          onSuccess={() => finishCopywritingIntro()}
          conspect={conspect}
          setConspect={setConspect}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          embeddedVectorIds={embeddedVectorIds}
          setEmbeddedVectorIds={setEmbeddedVectorIds}
          contentType={contentType}
          setContentType={setContentType}
          language={language}
          setLanguage={setLanguage}
          toneOfVoice={toneOfVoice}
          setToneOfVoice={setToneOfVoice}
          setSectionLength={setSectionLength}
          setSelectedTonePrompt={setSelectedTonePrompt}
          setSelectedPersonaPrompt={setSelectedPersonaPrompt}
          selectedPersonaPrompt={selectedPersonaPrompt}
        />
      )}
      {page === 1 && (
        <FirstPageTemplate
          name="Copywriter AI"
          description="Unleash the potential of AI in copywriting."
          loading={loading}
          renderContent={renderContent}
          savedContent={savedContent}
          actionButtons={<ActionButtons openModal={() => setCopywritingModal(true)} />}
        />
      )}
      {page === 2 && (
        <TextEditor
          setPage={setPage}
          title={title}
          conspect={conspect}
          description={description}
          embeddedVectorIds={embeddedVectorIds}
          contentType={contentType}
          language={language}
          setDescription={setDescription}
          setTitle={setTitle}
          toneOfVoice={toneOfVoice}
          setToneOfVoice={setToneOfVoice}
          sectionLength={sectionLength}
          selectedTonePrompt={selectedTonePrompt}
          selectedPersonaPrompt={selectedPersonaPrompt}
        />
      )}
    </PageTemplate>
  );
};

const OptionsIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
`;
const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
  }
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
  }
`;

const BtnText = styled.p`
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
export default DocumentCreator;
