import api from "@/pages/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { BlueLoader } from "../Common/Loaders";
import SlideBottom from "../Animated/SlideBottom";
import { useRouter } from "next/router";
import Link from "next/link";

const Competition = () => {

    const [competition, setCompetition] = useState<any[]>();
    const [loadingCompetition, setLoadingCompetition] = useState(true);
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    const router = useRouter();

    useEffect(() => {
        let token = localStorage.getItem("token");
        const updateWindowSize = () => {
          setIsSmallDevice(window.innerWidth < 1023);
        };
        window.addEventListener("resize", updateWindowSize);
        let profileId = localStorage.getItem("profile_id");
        const fetchCompetition = async () => {
          try {
            const fetchedCompetition = await api.get(`/competition-list/${profileId}`, {
                headers: {
                    authorization: token,
                },
            });
            setCompetition(fetchedCompetition.data);
            setLoadingCompetition(false);
          } catch (e) {
            console.log(e);
          }
    
        }
        fetchCompetition();
        return () => {
          window.removeEventListener("resize", updateWindowSize);
        };
    }, []);


    const handlecompetitionClick = (tone: any) => {
        router.push(`/competition/${tone._id}`);
    }

    const renderCompetition = () => {
        const renderedCompetition =  competition?.map((competition, index) => {
            return (
                <Competitor key={index} onClick={() => handlecompetitionClick(competition)}>
                <div className="flex items-center">
                <div className="rounded-full overflow-hidden lg:h-[1.75rem] lg:w-[1.75rem] h-[10vw]  w-[10vw] relative">
                    <Image src={`${competition.icon}`} fill alt="profile's icon" />
                </div>
                <CompetitorName>{competition.title}</CompetitorName>
                </div>
                <BsChevronRight className="text-gray-800"/>
            </Competitor>
            )
        })

        return (
            <CompetitionContainer>
                {(competition && competition?.length > 0) ?
                renderedCompetition
    
                :
                <div className="py-10 text-black w-full text-center">
                    <p className="text-gray-300 font-medium">You haven&apos;t done any competition research so far.</p>
                    <Link href="/competition" className="text-blue-500 font-medium mt-4 cursor-pointer">Get started now</Link>
                </div>
                }
            </CompetitionContainer>
        )
    }

    return (
        <SlideBottom>
        <MainContainer>
            <SubheaderContainer>
                <Subtitle>Competition</Subtitle>
                <AddBtn onClick={() => router.push("/competition")}>Open panel</AddBtn>
            </SubheaderContainer>
            {loadingCompetition ?
            <div className="w-full flex items-center justify-center pt-10">
                <BlueLoader />
            </div>
            :
            renderCompetition()
            }
        </MainContainer>
        </SlideBottom>
    )
}


export default Competition;


const MainContainer = styled.div`
    width: 100%;
    height: 17rem;
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 2px solid #F6F6FB;
    padding: 1.25rem 2rem 3.5em 2rem;
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const SubheaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`

const Subtitle = styled.h2`
    font-weight: 700;
    font-size: 1.4rem;
    color: black;
    display: flex;
    align-items: center;
`

const AddBtn = styled.button`
    width: 10rem;
    height: 2.75rem;
    font-size: 1rem;
    font-weight: 500;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
        width: 11rem;
    }
`

const CompetitionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 1023px) {
        margin-top: 1rem;
    }
`

const Competitor = styled.div`
    width: 48%;
    height: auto;
    display: flex;
    justify-content: space-between;
    color: black;
    align-items: center;
    background: white;
    border-radius: 15px;
    box-shadow: 3px 3px 9px rgba(15, 27, 40, 0.12);
    cursor: pointer;
    padding: 1rem 1.5rem 1em 1.5rem;
    margin-top: 1rem;
    transition: all 0.3s ease;
    border: 2px solid #F6F6FB;
    &:hover {
        box-shadow: none;
        transform: scale(0.98);
    }
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const CompetitorName = styled.p`
  white-space: nowrap;
  margin-left: 1rem;
  @media (max-width: 1023px) {
    font-size: large;
  }
  font-size: min(1.05vw, 1.2rem);
  font-weight: 600;
`;
