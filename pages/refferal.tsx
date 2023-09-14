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
        backgroundColor: "rgb(226 232 240)",
        borderRadius: 10,
        hoverBackgroundColor: "blue",
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
      description: "Successful referrals",
    },
    {
      icon: <FiUsers />,
      number: "45",
      description: "Registered users",
    },
  ];

  const [isSmallDevice, setIsSmallDevice] = useState(false);

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
      <NavigationBar />
      <div className="flex flex-col gap-4">
        <PageContainer
          style={{
            height: `${isSmallDevice ? "100%" : "11rem"}`,
            padding: "0.75rem 1rem 0.75rem 1rem;",
          }}
        >
          <div className="flex lg:flex-row flex-col h-full">
            <div className="flex flex-col justify-center gap-3 w-[50%] lg:border-r border-slate-300">
              <SectionTitle>Affillate Dashboard</SectionTitle>
              <span className="text-2xl">Make money with Yepp</span>
            </div>
            <div className="w-[50%] lg:flex grid grid-cols-2 gap-4 items-center justify-around pt-8 lg:pt-0">
              {headerObject.map(({ icon, description, number }) => {
                return (
                  <div className="flex flex-col text-black lg:border-r border-slate-300 last:border-none h-full justify-center w-full lg:pl-8 ">
                    <div>{icon}</div>
                    <span>{number}</span>
                    <span>{description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </PageContainer>
        <div className="flex gap-4 flex-row">
          <PageContainer
            style={{ height: "24rem", width: "30%" }}
          ></PageContainer>
          <PageContainer style={{ height: "24rem", width: "70%" }}>
            <div className="flex h-full flex-col">
              <div className="h-[30%] w-full  flex flex-col">
                <div className="flex justify-between items-center">
                  <span>Revenue History</span>
                  <button className="bg-slate-200 p-2 rounded-xl">
                    withdraw now
                  </button>
                </div>
                <div className="flex ">
                  <span>{`${totalSum}$`}</span>
                  <span>total</span>
                </div>
              </div>
              <div className="w-full h-[70%] flex items-center justify-center">
                <Bar data={data} options={options} />
              </div>
            </div>
          </PageContainer>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="flex h-[24rem] w-[30%] flex-col  gap-4">
            <div className="h-[8rem] w-full bg-slate-300"></div>
            <div className="h-[16rem] w-full bg-slate-300"></div>
          </div>
          <PageContainer
            style={{ height: "24rem", width: "70%" }}
          ></PageContainer>
        </div>
      </div>
    </Page>
  );
};

const SectionTitle = styled.h3`
  font-size: 2vw;
  font-weight: 800;
`;

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0.75rem 1rem 0.75rem 5rem;
  font-weight: 500;
  height: auto;
  background-color: #eef1fa;
  color: white;
  position: absolute;
  @media (max-width: 1023px) {
    padding: 4.5rem 0.5rem 0.5rem 0.5rem;
    min-height: 100vh;
  }
`;

const PageContainer = styled.div`
  color: black;
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  height: calc(100vh - 9rem);
  font-weight: 500;

  @media (max-width: 1023px) {
    height: 100vh;
    padding: 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`;

export default Refferal;
