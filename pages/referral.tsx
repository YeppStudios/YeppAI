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
import { BsCheckLg, BsCoin } from "react-icons/bs";
import api from "./api";

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

  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const [successfulReferrals, setSuccessfulReferrals] = useState({standard: 0, agency: 0});
  const [user, setUser] = useState({registeredByReferral: 0});

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    const fetchLink = async () => {
      try {
        const { data } = await api.get("/get-refferal-link", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        });
        setReferralLink(data.link);
      } catch (e) {
        console.log(e);
      }
    }
    fetchLink();

    const fetchReferrals = async () => {
      try {
        const { data } = await api.get(`/referrals/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        });
        const userResult = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        });
        setUser(userResult.data);
        const counts = data.reduce((acc:any, referral:any) => {
            if (referral.type === 'standard') {
                acc.standard += 1;
            } else if (referral.type === 'agency') {
                acc.agency += 1;
            }
            return acc;
        }, {standard: 0, agency: 0});
        setSuccessfulReferrals(counts);
        console.log(counts);
        setTransactions(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchReferrals();

    const updateWindowSize = () => {
      setIsSmallDevice(window.innerWidth < 1024);
    };

    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);


  const handleCopy = () => {
      navigator.clipboard.writeText(referralLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
              setCopied(false);
            }, 1500);
        })
        .catch(err => {

        });
    };

  return (
    <Page>
      <div className="flex flex-col gap-3">
        <PageContainer
          width="100%"
          mobileWidth="100%"
          style={{
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
          }}
        >
          <div className="flex lg:flex-row flex-col flex-wrap h-full lg:justify-between">
            <div className="lg:px-4 w-full lg:w-[50%] border-slate-100 w-full lg:w-auto">
              <SectionTitle>Hello Peter 👋</SectionTitle>
              <span className="text-lg lg:text-xl">Here you can earn money with Yepp</span>
            </div>
            <div className="lg:w-[50%] w-full flex-wrap lg:flex-nowrap flex gap-4 items-center justify-around pt-8 lg:pt-0">
              <div className="flex flex-col text-black lg:border-r-2 border-slate-100 last:border-none h-full justify-center w-full lg:pl-8 ">
                    <span className="text-2xl font-bold">${(Number(successfulReferrals.agency) * 100) + (Number(successfulReferrals.standard) * 50)}</span>
                    <div className="flex gap-2 items-center"><div><IoWalletOutline /></div><span>Total revenue</span></div>
              </div>
                  <div className="flex flex-col text-black lg:border-r-2 border-slate-100 last:border-none h-full justify-center w-full lg:pl-8 ">
                    <span className="text-2xl font-bold">{Number(successfulReferrals.agency) + Number(successfulReferrals.standard)}</span>
                    <div className="flex gap-2 items-center"><div><BsCoin /></div><span>Complete referrals</span></div>
                  </div>
                  <div className="flex flex-col text-black lg:border-r-2 border-slate-100 last:border-none h-full justify-center w-full lg:pl-8 ">
                    <span className="text-2xl font-bold">{user.registeredByReferral}</span>
                    <div className="flex gap-2 items-center"><div><FiUsers /></div><span>Total registered</span></div>
                  </div>
            </div>
          </div>
        </PageContainer>
        <div className="flex gap-3 flex-row flex-wrap lg:flex-nowrap">
          <SpecialPageContainer style={{ height: "24rem"}} width="30%" mobileWidth="100%">
              <div className="w-full flex justify-between">
                <ContainerTitle>Invite a friend</ContainerTitle>
                <Image src={giftIcon} alt="gift icon" height={20} width={20} className="w-8 h-8" />
                </div>
              <p className="w-5/6 mt-2">Gift your friend a <b>$100</b> coupon code and claim <b>$100</b> in cash once he/she stays.</p>
              <div className="flex flex-wrap flex-col gap-6 h-full mt-6 w-full">
                <div className="pb-6 border-b-2 border-slate-100 w-full">
                <div className="mb-2"><Label>Invite via email</Label></div>
                  <div className="flex items-center justify-between gap-2"><Input height="auto" padding="0.6rem" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="myfriend@gmail.com" /><BlueBtn>Invite</BlueBtn></div>
                </div>
                {referralLink && 
                <div className="w-full">
                  <div className="mb-2"><Label>Invite via link</Label></div>
                  <div className="px-4 py-[0.6rem] bg-[#F6F7FF] rounded-xl flex justify-between items-center"><div className="w-5/6 overflow-scroll whitespace-nowrap"><ColorfulText>{referralLink}</ColorfulText></div>
                  {copied ?
                    <BsCheckLg className="text-green-400" style={{width: "auto", height: "100%"}}/>
                    :
                    <MdContentCopy onClick={(e) => handleCopy()} className="cursor-pointer hover:scale-95 transition"/>
                  }
                  </div>
                  
                </div>
                }
              </div>
          </SpecialPageContainer>
          <PageContainer style={{ height: "24rem"}} width="70%" mobileWidth="100%">
            <div className="flex h-full flex-col">
              <div className="h-[30%] w-full  flex flex-col">
                <div className="flex justify-between">
                  <ContainerTitle>Revenue</ContainerTitle>
                  <button className="bg-[#F6F7FF] py-2 px-6 rounded-xl  hover:scale-95 transition hover:bg-[#EDEFFB]">
                    withdrawal
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
        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-4 ">
        <ReferralBackground background={referralBg}>
          <div className="w-10/12">
            <h2 className="text-3xl font-bold w-10/12">Refer Yepp and claim up to <b>$200</b> total</h2>
            <p className="w-5/6 mt-3">Gift your friend a <b>$100</b> coupon code and claim <b>$100</b> in cash once he/she stays.</p>
            <button className="bg-white rounded-xl px-8 py-2 mt-8 text-black hover:scale-95 transition hover:bg-[#EDEFFB]">Learn more</button>
          </div>

        </ReferralBackground>
          <PageContainer style={{ height: "24rem"}}  width="70%" mobileWidth="100%">
          <ContainerTitle>Recent Activity</ContainerTitle>
                    <div className="mt-2">
                        <div className="inline-block min-w-full py-2 align-middle">
                            {transactions ?
                            <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b-2 border-[#F6F7FF] bg-white bg-opacity-75 py-3.5 pl-2 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b-2 border-[#F6F7FF] bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Value
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b-2 border-[#F6F7FF] bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
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
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`;

const ContainerTitle = styled.h3`
  font-size: 1.5vw;
  font-weight: 800;
  @media (max-width: 1023px) {
    font-size: 1.5rem;
  }
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

const PageContainer = styled.div<{mobileWidth: string, width: string}>`
  width: ${( props ) => props.width};
  color: black;
  align-items: center;
  border: 2px solid #eaedf5;
  border-radius: 25px;
  padding: 1.5rem 1.75rem 1.5rem 1.75rem;
  font-weight: 500;
  @media (max-width: 1023px) {
    height: auto;
    width: ${(props) => props.mobileWidth};
    padding: 1rem 1rem 1.5rem 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`

const SpecialPageContainer = styled.div<{mobileWidth: string, width: string}>`
  color: black;
  align-items: center;
  padding: 1.5rem 1.75rem 1.5rem 1.75rem;
  width: ${( props ) => props.width};
  height: calc(100vh - 9rem);
  font-weight: 500;
  border: solid 3px transparent;
  border-radius: 25px;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  @media (max-width: 1023px) {
    height: 100vh;
    width: ${(props) => props.mobileWidth};
    padding: 1rem;
  }
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
`

const BlueBtn = styled.div`
    height: 2.8rem;
    padding: 0 2vw 0 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    font-size: 1.2vw;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
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
      padding: 0 2rem 0 2rem;
      font-size: 0.9rem;
    }
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
  @media (max-width: 1023px) {
    width: 100%;
  }
`

export default Refferal;