import FirstPageTemplate from "@/components/Common/FirstPageTemplate";
import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import api from "./api";
import Image from "next/image";
import campaignIcon from "../public/images/campaignIcon.png";
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import classNames from "classnames";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { CampaignModal } from "@/components/Campaigns/CampaignModal";
import PageTemplate from "@/components/Common/PageTemplate";

const Campaigns = () => {
    const [loading, setLoading] = useState(true);
    const [savedContent, setSavedContent] = useState<any>();
    const [mobile, setMobile] = useState(false);
    const [openOnboarding, setOpenOnboarding] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth <= 1023) {
          setMobile(true);
        }
        const token = localStorage.getItem("token");
        const fetchSavedContent = async () => {
          setLoading(true);
    
          const profileId = localStorage.getItem("profile_id");
    
          let url = `/campaignsByOwner`;
          if (profileId) {
            url = `/get_profile_campaigns/${profileId}`
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

      const handleOpenCampaign = (id: string) => {
        router.push(`/campaign/${id}?main=true`);
      }

      const handleCampaignDelete = async (id: string) => {
        await api.delete(`/deleteCampaign/${id}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        router.reload();
      }

    const renderContent = () => {
        const renderedContent = savedContent.map((campaign: any, index: any) => {
          return (
            <tr key={campaign._id} onClick={() => handleOpenCampaign(campaign._id)} className={index !== savedContent.length - 1 ? "border-b-2 border-slate-100" : ""}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <Image
                  src={campaignIcon}
                  className="flex-none w-8"
                  alt={"icon"}
                />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-base font-medium text-slate-700">
                {mobile ? <p>{campaign.title.slice(0, 20)}...</p> : <>{campaign.title.length > 75 ? <p>{campaign.title.slice(0, 75)}...</p> : campaign.title}</>}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-base text-slate-700">
                <div className="flex items-center gap-4">
                    <div className="rounded-full border-2 border-white bg-slate-200 w-8 h-8 flex justify-center items-center shadow-sm relative -ml-1">
                        <p className="font-medium text-white">{campaign.owner.name.substring(0, 1)}</p>
                    </div>
                      <p className="font-medium">{campaign.owner.name}</p>
                </div>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button
                  onClick={() => handleOpenCampaign(campaign._id)}
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
                            onClick={() => handleCampaignDelete(campaign._id)}
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
                <WriteBtn onClick={() => props.openModal()}><BsPencilFill className="mr-4" style={{ width: "auto", height: "35%" }} /> New Campaign</WriteBtn>
          </ActionContaienr>
        );
      };

    return (
        <PageTemplate>
        {openOnboarding && <CampaignModal setOpenCreateCampaignModal={setOpenOnboarding} />}
        <FirstPageTemplate
          name="Content Campaigns"
          description="Generate entire content campaigns in seconds."
          loading={loading}
          renderContent={renderContent}
          savedContent={savedContent}
          actionButtons={<ActionButtons openModal={() => setOpenOnboarding(true)} />}
        />
        </PageTemplate>
    )
}

export default Campaigns;


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


const OptionsIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
`;
