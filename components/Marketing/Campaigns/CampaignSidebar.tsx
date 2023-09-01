import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import DeleteDoc from "@/components/Modals/DeletingModals/DeleteDocModal";
import styled from "styled-components";
import Label from "../../Common/Label";
import Input from "../../forms/Input";
import CustomDropdown from "@/components/forms/CustomDropdown";
import { Switch } from "@headlessui/react";
import TextArea from "@/components/forms/TextArea";
import api from "@/pages/api";
import { Loader } from "@/components/Common/Loaders";

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
  "Portugese",
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

export default function CampaignSidebar(props: {
  setOpen: any;
  open: boolean;
  campaign: any;
}) {
  const [openDeleteContent, setOpenDeleteContent] = useState(false);
  const [contentToDelete, setContentToDelete] = useState("");
  const [mobile, setMobile] = useState(false);

  const [tone, setTone] = useState<string>("Informal 😎");
  const [language, setLanguage] = useState<string>("English");
  const [campaignType, setCampaignType] = useState<string>("Advertisement");
  const [productType, setProductType] = useState<string>("");
  const [useEmojis, setUseEmojis] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [objectives, setObjectives] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  const router = useRouter();

  const handleToggleEmojis = () => {
    setUseEmojis((prev) => !prev);
  };

  useEffect(() => {
    if (window.innerWidth < 1023) {
      setMobile(true);
    }
    if (props.campaign.type) {
      setCampaignType(props.campaign.type);
    }
    if (props.campaign.language) {
      setLanguage(props.campaign.language);
    }
    if (props.campaign.toneOfVoice) {
      setTone(props.campaign.toneOfVoice);
    }
    if (props.campaign.targetAudience) {
      setTargetAudience(props.campaign.targetAudience);
    }
    if (props.campaign.objective) {
      setObjectives(props.campaign.objective);
    }
    if (props.campaign.keywords) {
      setKeywords(props.campaign.keywords)
    }
    if (props.campaign.about) {
      setProductType(props.campaign.about)
    }
  }, [props.campaign]);

  const updateCampaign = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.patch(`/updateCampaign/${props.campaign._id}`, {
        type: campaignType,
        language,
        toneOfVoice: tone,
        targetAudience,
        objective: objectives,
        keywords,
        about: productType
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
      )
      setLoading(false);
      router.reload();
    } catch (e) {
      setLoading(false);
      console.log(e)
    }

  }

  return (
    <>
      {openDeleteContent && (
        <DeleteDoc
          onClose={() => setOpenDeleteContent(false)}
          assetType="saved"
          document={contentToDelete}
          deleteDocumentState={() => props.setOpen}
        />
      )}
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog as="div" className="z-20" onClose={props.setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 z-20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-400"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-400"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                    <div
                      style={{
                        boxShadow: "2px 2px 10px rgba(15, 27, 40, 0.25)",
                      }}
                      className="flex h-full flex-col overflow-y-scroll bg-white "
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">
                            Campaign settings
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 "
                              onClick={() => props.setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border border-[#e5e5e5]">
                        <div className="px-6 mt-6">
                          {/*content*/}
                          <form className="" onSubmit={(e) => updateCampaign(e)}>
                            <div className="grid grid-cols-1">
                              <div className="grid lg:grid-cols-2">
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
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <Label>What is it promoting?</Label>
                                  <Input
                                    name="productType"
                                    height="2.75rem"
                                    padding="1rem"
                                    placeholder="Product"
                                    type="text"
                                    value={productType}
                                    onChange={(e) =>
                                      setProductType(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="">
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <Label>Target autdience</Label>
                                  <Input
                                    height="2.8rem"
                                    padding="1rem"
                                    name="targetAudience"
                                    placeholder="Marketing agencies looking for AI tools"
                                    type="text"
                                    value={targetAudience}
                                    onChange={(e) =>
                                      setTargetAudience(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <Label>Campaign&apos;s objective</Label>
                                  <TextArea
                                    height="5.8rem"
                                    padding="0.75rem"
                                    placeholder="Set campaign's objectives"
                                    value={objectives}
                                    onChange={(e) =>
                                      setObjectives(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <Label>Keywords</Label>
                                  <TextArea
                                    height="4rem"
                                    padding="0.65rem"
                                    placeholder="marketing, ai, generative ai, content creation"
                                    name="keywords"
                                    value={keywords}
                                    onChange={(e) =>
                                      setKeywords(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="grid lg:grid-cols-2">
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <Label className="pb-2">
                                    Use relevant emojis
                                  </Label>
                                  <Switch
                                    name="useEmojis"
                                    checked={useEmojis}
                                    onChange={handleToggleEmojis}
                                    style={{
                                      boxShadow:
                                        "inset 4px 4px 20px rgba(255, 255, 255, 0.35)",
                                    }}
                                    className={`${
                                      useEmojis
                                        ? "bg-green-400"
                                        : "border-2 border-gray-200"
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
                                <div className="pb-6 pr-3 pl-3 pt-0">
                                  <ButtonContainer>
                                    <ContinueBtn type="submit">
                                      {loading ?
                                      <Loader color="white" />
                                      :
                                      <p>Save</p>
                                      }
                                    </ContinueBtn>
                                  </ButtonContainer>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

const ContinueBtn = styled.button`
  border: solid 3px transparent;
  border-radius: 15px;
  position: relative;
  color: white;
  font-weight: 500;
  width: 100%;
  height: 3rem;
  background: linear-gradient(40deg, #6578f8, #64b5ff);
  background-size: 110%;
  background-position-x: -1rem;
  transition: all 0.4s ease;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23),
      inset -1px -1px 4px #fafbff;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;
