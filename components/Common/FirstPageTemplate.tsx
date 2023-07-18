import { FC, SetStateAction, useState } from "react";
import styled from "styled-components";
import Centered from "../Centered";
import { BlueLoader } from "./Loaders";

interface FirstPageTemplateProps {
  name: string;
  description: string;
  actionButtons?: JSX.Element;
  renderContent: () => JSX.Element;
  savedContent: any;
  loading: boolean;
}

const FirstPageTemplate: FC<FirstPageTemplateProps> = ({
  name,
  description,
  actionButtons = <div>No action buttons</div>,
  renderContent,
  savedContent,
  loading,
}) => {
  return (
    <PageContainer>
      <Header>
        <div>
          <PageTitle>{name}</PageTitle>
          <PageDescription>{description}</PageDescription>
        </div>

        {/*We can pass any custom action buttons here*/}
        {actionButtons}
      </Header>
      {/*table with content*/}
      <Centered>
        <div style={{ width: "100%" }}>
          <div className="mt-6 lg:mt-12 flow-root">
            <div className="-mx-4 -my-2 overflow-visible sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-visible shadow ring-1 ring-black ring-opacity-5 sm:rounded-2xl">
                  {loading ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <BlueLoader />
                    </div>
                  ) : (
                    <>
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            ></th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                              Last updated
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Open</span>
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        {savedContent.length > 0 && renderContent()}
                      </table>
                      {savedContent.length === 0 && (
                        <>
                          <div className="flex justify-center items-center w-full h-64 text-slate-700 text-xl">
                            You have no content yet. Click on the button above
                            to craft your first content with AI.
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Centered>
    </PageContainer>
  );
};

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  @media (max-width: 1023px) {
    display: flex;
    padding-left: 1.5rem;
    padding: 1rem 1rem 2rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    margin-top: 1rem;
    flex-wrap: wrap;
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

export default FirstPageTemplate;
