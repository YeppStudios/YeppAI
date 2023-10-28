import PageTemplate from "@/components/Common/PageTemplate";
import styled from "styled-components";
import Image from "next/image";
import backIcon from "../../../public/images/backArrow.png";
import { useRouter } from "next/router";
import { BsStarFill } from "react-icons/bs";


const CompetitionResearch = () => {

    const router = useRouter();

    return (
        <PageTemplate>
            <MainContainer>
                    <table className="min-w-full">
                    <tr className="border-b-4 border-gray-50">
                        <td className="text-sm font-medium text-gray-900 p-8 w-[22%]">
                            <BackBtn onClick={() => router.push("/profile")}>
                                <BackBtnIcon>
                                    <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
                                </BackBtnIcon> 
                                <BackBtnText>Back to profile</BackBtnText>
                            </BackBtn>
                        </td>
                        <td className="text-xl font-bold text-gray-900 text-center w-[26%]">
                            Open AI
                        </td>
                        <td className="text-xl font-bold text-gray-900 text-center w-[26%]">
                            Yepp AI
                        </td>
                        <td className="text-xl font-bold text-gray-900 text-center w-[26%]">
                            Jasper
                        </td>
                    </tr>
                    <tr>
                        <td className="text-sm font-medium text-gray-900 pr-4 pl-8 py-8 w-[22%] border-r-4 border-gray-50">
                            <h2 className="font-bold text-xl flex gap-2 items-center"><BsStarFill /> Criteria</h2>
                            <p className="text-sm font-medium mt-1 w-full">Some criteria description that will explain how the criteria works or something.</p>
                        </td>
                        <td className="font-medium text-center text-gray-900 p-6 w-[26%]">
                            <div className="flex w-full h-full p-10 justify-center items-center">
                            </div>
                        </td>
                        <td className="font-medium text-center text-gray-900 p-6 w-[26%]">

                        </td>
                        <td className="font-medium text-center text-gray-900 p-6 w-[26%]">

                        </td>
                    </tr>
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
`

