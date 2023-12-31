import FirstPageTemplate from "@/components/Common/FirstPageTemplate";
import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl";
import classNames from "classnames";
import { BsTrash, BsSearch } from "react-icons/bs";
import PageTemplate from "@/components/Common/PageTemplate";
import api from "@/pages/api";
import AddCompetition from "@/components/Modals/AddingModals/AddCompetition";
import DeleteCompetitionResearch from "@/components/Modals/DeletingModals/DeleteCompetitionResearch";
import CompetitorFavicons from "@/components/Competition/CompetitorFavicons";

const Competition = () => {
    const [loading, setLoading] = useState(true);
    const [savedContent, setSavedContent] = useState<any>();
    const [mobile, setMobile] = useState(false);
    const [openOnboarding, setOpenOnboarding] = useState(false);
    const [selectedReserach, setSelectedResearch] = useState<any>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (window.innerWidth <= 1023) {
          setMobile(true);
        }
        const token = localStorage.getItem("token");
        const fetchSavedContent = async () => {
          setLoading(true);
    
          const profileId = localStorage.getItem("profile_id");
    
          try {
            const fetchedCompetition = await api.get(`/competition-list/${profileId}`, {
              headers: {
                authorization: token,
              },
            });
            setSavedContent(fetchedCompetition.data);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
        };
        fetchSavedContent();
      }, []);

      const handleOpenResearch = (id: string) => {
        router.push(`/competition/${id}?main=true`);
      }

      const handleResearchDelete = async (id: string) => {
        setSelectedResearch(id);
        setOpenDeleteModal(true);
      }

    const renderContent = () => {
        const renderedContent = savedContent.map((research: any, index: any) => {
          return (
            <tr key={research._id} onClick={() => handleOpenResearch(research._id)} className={index !== savedContent.length - 1 ? "border-b-2 border-slate-100" : ""}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <CompetitorFavicons images={research.companies.map((company: any) => company.imageUrl)} />
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-base font-medium text-slate-700">
                {research.title}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-base text-slate-700">
                <div className="flex items-center gap-4">
                    <div className="rounded-full border-2 border-white bg-slate-200 w-8 h-8 flex justify-center items-center shadow-sm relative -ml-1">
                        <p className="font-medium text-white">{research.owner.name.substring(0, 1)}</p>
                    </div>
                      <p className="font-medium">{research.owner.name}</p>
                </div>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button
                  onClick={() => handleOpenResearch(research._id)}
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
                            onClick={() => handleResearchDelete(research._id)}
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
                <WriteBtn onClick={() => props.openModal()}><BsSearch className="mr-4" style={{ width: "auto", height: "35%" }} /> New Research</WriteBtn>
          </ActionContaienr>
        );
      };

    return (
        <PageTemplate>
        {openOnboarding && <AddCompetition onClose={() => setOpenOnboarding(false)} />}
        {openDeleteModal && <DeleteCompetitionResearch onClose={() => setOpenDeleteModal(false)} researchId={selectedReserach} />}
        <FirstPageTemplate
          name="Competition research"
          description="Always be one step ahead of your competition."
          loading={loading}
          renderContent={renderContent}
          savedContent={savedContent}
          actionButtons={<ActionButtons openModal={() => setOpenOnboarding(true)} />}
        />
        </PageTemplate>
    )
}

export default Competition;


const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
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
