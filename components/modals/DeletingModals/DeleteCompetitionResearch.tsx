import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { BsCheckLg, BsFileEarmarkExcelFill, BsXLg } from 'react-icons/bs';
import { Loader } from '../../Common/Loaders';
import { useRouter } from "next/router";

const DeleteCompetitionResearch = (props: {onClose: any, researchId: string}) => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const deleteAsset = async () => {
            try {
                setLoading(true);
                await api.delete(`/competition-research/${props.researchId}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                setLoading(false);
                props.onClose();
                router.reload();
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
    }

    return (
        <ModalBackground closeable={false}>
            <SlideBottom>
            <Container onClick={(e) => e.preventDefault()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
                <div>
                    <Centered><Icon className='text-gray-800'><BsFileEarmarkExcelFill style={{width: "100%", height: "100%"}} /></Icon></Centered>
                    <Title>Delete research?</Title>
                    <Centered><Description>Competition research will be permanently deleted and you will not be able to restore it.</Description></Centered>
                </div>   
                <Centered>
                    <Button onClick={deleteAsset}>
                        {loading ? 
                        <Loader color='black'/> 
                        : 
                        <p>Delete</p>
                        }
                    </Button>
                </Centered>
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default DeleteCompetitionResearch;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4rem 4rem 4rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 5vw 5vh 5vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const Form = styled.form`
    margin-top: 3vh;
    width: 100%;
`
const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
      font-size: 1.7rem;
      line-height: 1.2;
      margin-top: 2vh;
  }
`


const Button = styled.button`
  display: block;
  width: 18vw;
  height: 3rem;
  margin-top: 2rem;
  border: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border: solid 3px transparent;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #EF4C4C, #EF4C4C);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  font-weight: 700;
  border-radius: 15px;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.9);
    box-shadow: none;
    background: #EF4C4C;
    color: white;
    border: none;
    translateX: 10px;
}
  @media (max-width: 1023px) {
    margin-top: 3vh;
    width: 65vw;
    }
`;

const Description = styled.div`
    text-align: center;
    margin-top: 0.5rem;
    width: 85%;
    font-weight: 500;
    color: black;
    @media (max-width: 1023px) {
      width: 95%;
      font-size: 0.9rem;
      }
`

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  @media (max-width: 1023px) {
    margin-bottom: 0rem;
  }
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1.2rem;
        width: 1rem;
        height: 1rem;
    }
`