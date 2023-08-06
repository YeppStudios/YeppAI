import { FC, SetStateAction, useEffect, useState } from "react";
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setIsMobile(true);
    }
  }, []);

  return (
    <PageContainer>
      <Header>
        <div className="w-full">
          <PageTitle>{name}</PageTitle>
          <PageDescription>{description}</PageDescription>
        </div>
        {/*We can pass any custom action buttons here*/}
        {actionButtons}
      </Header>
      {/*table with content*/}
      <Centered>
        <TableContainer>
          <div className="w-full mt-6 border rounded-2xl lg:mt-12 flow-root">
            <div className="w-full">
              <div className="inline-block w-full  align-middle">
                <div className="rounded-2xl overflow-hidden">
                  {loading ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <BlueLoader />
                    </div>
                  ) : (
                    <>
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50 ">
                          <tr>
                          <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                            >
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 "
                            >
                              Title
                            </th>
                            {!isMobile && (
                              <th
                                scope="col"
                                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                              >
                                Last updated
                              </th>
                            )}

                            {!isMobile && (
                              <th
                                scope="col"
                                className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                              >
                                Email
                              </th>
                            )}
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
                        <div className="flex items-center justify-center text-center p-10 h-64 text-slate-700 lg:text-xl md:text-md sm:text-sm">
                          You have no content yet. Click on the button above to
                          craft your first content with AI.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TableContainer>
      </Centered>
    </PageContainer>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F8F4ED;
  width: 100%;
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

const TableContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
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
  background-color: #F8F4ED;
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
