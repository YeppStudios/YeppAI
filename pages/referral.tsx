import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "@/components/Common/NavigationBar";
import { IoWalletOutline } from "react-icons/io5";
import { BiCertification } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import giftIcon from "../public/images/giftIcon.png";
import Image from "next/image";
import Label from "@/components/Common/Label";
import Input from "@/components/forms/Input";
import ColorfulText from "@/components/Common/ColorfulText";
import { MdContentCopy } from "react-icons/md";
import referralBg from "../public/images/referralbg.png";
import Centered from "@/components/Centered";
import { BlueLoader } from "@/components/Common/Loaders";

const Refferal = () => {
  interface HeaderDataType {
    icon: ReactNode;
    number: string;
    description: string;
  }

  interface ChartDataType {
    label: string;
    value: number;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData: ChartDataType[] = [
    {
      label: "Feb",
      value: 0,
    },
    {
      label: "Mar",
      value: 0,
    },
    {
      label: "Apr",
      value: 0,
    },
    {
      label: "May",
      value: 0,
    },
    {
      label: "Jun",
      value: 0,
    },
    {
      label: "Jul",
      value: 200,
    },
    {
      label: "Aug",
      value: 100,
    },
  ];

  const totalSum = chartData.reduce((acc, item) => acc + item.value, 0);
  const labels = chartData.map((item) => item.label);

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        data: chartData.map((item) => item.value),
        backgroundColor: "#558FFF",
        borderRadius: 12,
        hoverBackgroundColor: "#558FFF",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
        padding: {
          top: 10,
          bottom: 10,
          left: 50,
          right: 50,
        },
        xAlign: "center",
        yAlign: "top",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  const headerObject: HeaderDataType[] = [
    {
      icon: <IoWalletOutline />,
      number: `${totalSum}$`,
      description: "Total revenue",
    },
    {
      icon: <BiCertification />,
      number: "3",
      description: "Referrals",
    },
    {
      icon: <FiUsers />,
      number: "45",
      description: "Total registered",
    },
  ];

  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsSmallDevice(window.innerWidth < 1024);
    };

    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <PageContainer
          style={{
            height: `${isSmallDevice ? "100%" : "auto"}`,
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
          }}
        >
          <div className="flex lg:flex-row flex-col h-full">
            <div className="px-4 w-[50%] lg:border-r-2 border-slate-100">
              <SectionTitle>Affillate Dashboard</SectionTitle>
              <span className="text-xl">Share & earn money with Yepp</span>
            </div>
            <div className="w-[50%] lg:flex grid grid-cols-2 gap-4 items-center justify-around pt-8 lg:pt-0">
              {headerObject.map(({ icon, description, number }) => {
                return (
                  <div key={description} className="flex flex-col text-black lg:border-r-2 border-slate-100 last:border-none h-full justify-center w-full lg:pl-8 ">
                    <span className="text-2xl font-bold">{number}</span>
                    <div className="flex gap-2 items-center"><div>{icon}</div><span>{description}</span></div>
                  </div>
                );
              })}
            </div>
          </div>
        </PageContainer>
        <div className="flex gap-4 flex-row">
          <PageContainer style={{ height: "24rem", width: "30%" }}>
              <div className="w-full flex justify-between">
                <ContainerTitle>Invite a friend</ContainerTitle>
                <Image src={giftIcon} alt="gift icon" height={20} width={20} className="w-8 h-8" />
                </div>
              <p className="w-5/6 mt-2">Gift your friend a $100 coupon code and claim $100 in cash once he/she stays.</p>
              <div className="flex flex-wrap flex-col gap-6 h-full mt-6">
                <div className="pb-6 border-b-2 border-slate-100">
                <div className="mb-2"><Label>Invite via email</Label></div>
                  <Input height="auto" padding="0.55rem" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="random@gail.com" />
                </div>
                <div>
                  <div className="mb-2"><Label>Invite via link</Label></div>
                  <div className="px-4 py-[0.55rem] bg-[#F6F7FF] rounded-xl flex justify-between items-center"><div className="w-5/6 overflow-scroll"><ColorfulText>https://www.yepp.ai/dsgfasgsderg</ColorfulText></div><MdContentCopy /></div>
                </div>
              </div>
          </PageContainer>
          <PageContainer style={{ height: "24rem", width: "70%" }}>
            <div className="flex h-full flex-col">
              <div className="h-[30%] w-full  flex flex-col">
                <div className="flex justify-between">
                  <ContainerTitle>Revenue History</ContainerTitle>
                  <button className="bg-[#F6F7FF] py-2 px-6 rounded-xl">
                    Request withdrawal
                  </button>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-black">{`$${totalSum}`}</span>
                  <span className="text-slate-300 ml-2">total</span>
                </div>
              </div>
              <div className="w-full h-[70%] flex items-center justify-center">
                <Bar data={data} options={options} />
              </div>
            </div>
          </PageContainer>
        </div>
        <div className="flex flex-row gap-4 ">
        <ReferralBackground background={referralBg}>
          <div className="w-10/12">
            <h2 className="text-3xl font-bold w-10/12">Refer Yepp and claim up to $200 total</h2>
            <p className="w-5/6 mt-3">Gift your friend a $100 coupon code and claim $100 in cash once he/she stays.</p>
            <button className="bg-white rounded-xl px-8 py-2 mt-8 text-black">Learn more</button>
          </div>

        </ReferralBackground>
          <PageContainer style={{ height: "24rem", width: "70%" }}>
          <ContainerTitle>Recent Activity</ContainerTitle>
                    <div className="">
                        <div className="inline-block min-w-full py-2 align-middle">
                            {transactions ?
                            <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 boarder-b-2 border-[#F6F7FF] bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden boarder-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden boarder-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden boarder-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Value
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 boarder-b-2 border-[#F6F7FF] bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                >
                                    <span className="sr-only">Delete</span>
                                </th>
                                </tr>
                            </thead>
                            {transactions.length > 0 ?
                            <></>
                            :
                            <div className="flex text-gray-400 ml-8 pt-8">
                                <p>Here you will find your activity.</p>
                            </div>   
                            }
                            </table>
                            :
                            <div className="mt-8">
                                <Centered>
                                    <BlueLoader />
                                </Centered>    
                            </div>           
                            }
                        </div>
                    </div>
          </PageContainer>
        </div>
      </div>
    </Page>
  );
};

const SectionTitle = styled.h2`
  font-size: 2vw;
  font-weight: 800;
`;

const ContainerTitle = styled.h3`
  font-size: 1.5vw;
  font-weight: 800;
`

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  font-weight: 500;
  height: auto;
  background-color: #eef1fa;
  color: white;
  position: absolute;
  @media (max-width: 1023px) {
    padding: 0.5rem;
    min-height: 100vh;
  }
`;

const PageContainer = styled.div`
  color: black;
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.5rem 1.75rem 1.5rem 1.75rem;
  height: calc(100vh - 9rem);
  font-weight: 500;

  @media (max-width: 1023px) {
    height: 100vh;
    padding: 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`

const ReferralBackground = styled.div<{ background: any }>`
  width: 30%;
  height: 24rem;
  border-radius: 25px;
  background-image: url(${({ background }) => background.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Refferal;
