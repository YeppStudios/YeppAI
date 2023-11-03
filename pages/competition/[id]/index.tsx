import PageTemplate from "@/components/Common/PageTemplate";
import styled from "styled-components";
import Image from "next/image";
import backIcon from "../../../public/images/backArrow.png";
import { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import CompetitorFavicons from "@/components/Competition/CompetitorFavicons";


const CompetitionResearch = () => {

    const router = useRouter();
    const [backLink, setBackLink] = useState<string>("/competition");
    const { id, profile } = router.query;
    const [competitors, setCompetitors] = useState<any[]>();


    useEffect(() => {
        const start = localStorage.getItem("start_research");
        if (start === "true") {
            localStorage.setItem("start_research", "false");
            
        }
    }, [])

    useEffect(() => {
        if (profile) {
            setBackLink(`/profile/${profile}`);
        }
        const fetchCompetition = async () => {

            const competitionResult = await api.get(`/competition-research/${id}`, {
                headers: {
                    authorization: localStorage.getItem("token"),
                },
            });
            setCompetitors(competitionResult.data.companies);
            console.log(competitionResult.data.companies);
        }
        if (id) {
            fetchCompetition();
        }

    }, [id, profile])

    return (
        <PageTemplate>
            <MainContainer>
                    <table className="min-w-full">
                    <tbody>
                    <tr className="border-b-4 border-gray-50 h-20 flex items-center">
                        <td className="text-sm font-medium text-gray-900 pl-8 w-[22%]">
                            <BackBtn onClick={() => router.push(backLink)}>
                                <BackBtnIcon>
                                    <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                                </BackBtnIcon> 
                                {profile ? <BackBtnText>Back to profile</BackBtnText> : <BackBtnText>Back to panel</BackBtnText>}
                            </BackBtn>
                        </td>
                        {competitors &&
                        competitors.map((competitor, index) => (
                            <td key={index} className="text-xl font-bold text-gray-900 text-center flex items-center gap-6 justify-center w-[26%] border-l-4 border-gray-50">
                                <CompetitorFavicons images={[competitor.imageUrl]} />
                                {competitor.name}
                            </td>
                        ))}
                    </tr>
                    {competitors &&
                    Object.entries(competitors).map(([key, value], index) => {
                        if (Array.isArray(value) && key !== 'companies' && value.length > 0) {
                            return (
                                <tr key={index}>
                                    <td className="text-sm font-medium text-gray-900 pr-4 pl-8 w-[22%] border-r-4 border-gray-50">
                                        <h2 className="font-bold text-xl flex gap-2 items-center"><BsStarFill /> {key}</h2>
                                        <p className="text-sm font-medium mt-1 w-full">Some criteria description that will explain how the criteria works or something.</p>
                                    </td>
                                    {competitors &&
                                    competitors.map((competitor, index) => (
                                        <td key={index} className="font-medium text-center text-gray-900 p-6 w-[26%]">
                                            {/* Render the appropriate row Components here based on `key` and `competitor` */}
                                        </td>
                                    ))}
                                </tr>
                            );
                        }
                        return null;
                    })}
                    </tbody>
                    </table> 
            </MainContainer>
        </PageTemplate>
    )
}


export default CompetitionResearch;


const MainContainer = styled.div`
    width: 100%;
    position: relative;
    height: calc(100svh - 1.5rem);
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13), -7px -7px 10px #FAFBFF;
    border: 1.5px solid #EAEDF5;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 1023px) {
        padding: 1rem 1rem 2rem 1.5rem;
        overflow: visible;
    }
`

const BackBtn = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`
const BackBtnIcon = styled.div`
    width: 0.6rem;
`

const BackBtnText = styled.p`
    color: black;
    font-weight: 500;
    margin-left: 0.7rem;
    font-size: 1rem;
`

