import api from "@/pages/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";
import { BlueLoader } from "../Common/Loaders";
import SlideBottom from "../Animated/SlideBottom";
import { useRouter } from "next/router";
import Link from "next/link";

interface Tone {
    _id: String
    base_text: String
    icon: any
    owner: String
    prompt: String
    timestamp: String
    title: String
    workspace: String
}

const Tones = () => {

    const [tones, setTones] = useState<Tone[]>();
    const [loadingTones, setLoadingTones] = useState(true);
    const [isSmallDevice, setIsSmallDevice] = useState(false);

    const router = useRouter();

    useEffect(() => {
        let token = localStorage.getItem("token");
        const updateWindowSize = () => {
          setIsSmallDevice(window.innerWidth < 1023);
        };
        window.addEventListener("resize", updateWindowSize);
        let profileId = localStorage.getItem("profile_id");
        let url = "/tones/owner";
        if (profileId) {
            url = `/profile_tones/${profileId}`
          }
        const fetchTones = async () => {
          try {
            const toneResponse = await api.get(url ,{
              headers: {
                Authorization: token,
              }
            });
    
            setTones(toneResponse.data);
            setLoadingTones(false);
          } catch (e) {
            console.log(e);
          }
    
        }
        fetchTones();
        return () => {
          window.removeEventListener("resize", updateWindowSize);
        };
    }, []);


    const handleToneClick = (tone: Tone) => {
        router.push(`/lab?tone=${tone._id}`);
    }

    const renderTones = () => {
        const renderedTones =  tones?.map((tone, index) => {
            return (
                <Tone key={index} onClick={() => handleToneClick(tone)}>
                <div className="flex items-center">
                <div className="rounded-full overflow-hidden lg:h-[1.75rem] lg:w-[1.75rem] h-[10vw]  w-[10vw] relative">
                    <Image src={`${tone.icon}`} fill alt="profile's icon" />
                </div>
                <ToneName>{tone.title}</ToneName>
                </div>
                <BsChevronRight className="text-gray-800"/>
            </Tone>
            )

        })

        return (
            <TonesContainer>
                {(tones && tones?.length > 0) ?
                renderedTones
                :
                <div className="py-10 text-black w-full text-center">
                    <p className="text-gray-300 font-medium">You have no tone of voice.</p>
                    <Link href="/lab" className="text-blue-500 font-medium mt-2 cursor-pointer">Create one!</Link>
                </div>
                }
            </TonesContainer>
        )
    }

    return (
        <SlideBottom>
        <MainContainer>
            <SubheaderContainer>
                <Subtitle>Tones of voice</Subtitle>
                <AddBtn onClick={() => router.push("/lab")}>Open lab</AddBtn>
            </SubheaderContainer>
            {loadingTones ?
            <div className="w-full flex items-center justify-center pt-10">
                <BlueLoader />
            </div>
            :
            renderTones()
            }
        </MainContainer>
        </SlideBottom>
    )
}


export default Tones;


const MainContainer = styled.div`
    width: 100%;
    height: 17rem;
    background: white;
    border-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 2px solid #eaedf5;
    overflow-y: scroll;
    padding: 1.25rem 2rem 3.5em 2rem;
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

const TonesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    @media (max-width: 1023px) {
        margin-top: 1rem;
    }
`

const Tone = styled.div`
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

const ToneName = styled.p`
  white-space: nowrap;
  margin-left: 1rem;
  @media (max-width: 1023px) {
    font-size: large;
  }
  font-size: min(1.05vw, 1.2rem);
  font-weight: 600;
`;
