import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { BsCheckLg, BsFileEarmarkExcelFill, BsXLg } from 'react-icons/bs';
import { Loader } from '../../Common/Loaders';
import axios from 'axios';
import { selectedUserState } from '@/store/userSlice';
import { useSelector } from 'react-redux';

interface Document {
    owner: string,
    title: string,
    category: string,
    timestamp: string,
    ownerEmail: string,
    vectorId: string
}

const DeleteDoc = (props: {
    onClose: any, assetType: string, document: any | undefined, deleteDocumentState: any
}) => {

    const [loading, setLoading] = useState(false);
    const user = useSelector(selectedUserState);

    const deleteAsset = async () => {
        if (props.document) {
            try {
                setLoading(true);
                if (props.assetType === "saved") {
                    await api.delete(`/deleteContent/${props.document._id}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                } else if (props.assetType === "campaign") {
                    await api.delete(`/deleteCampaign/${props.document._id}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                } else if (props.assetType === "persona") {
                    await api.delete(`/persona/${props.document._id}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                } else if (props.assetType === "tone of voice") {
                    await api.delete(`/tone/${props.document._id}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                } else {
                    await api.delete(`/user/${user._id}/delete-document/${props.document.vectorId}`, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
    
                    await axios.delete(
                        "https://whale-app-p64f5.ondigitalocean.app/delete",
                        {
                          data: {
                            ids: [props.document.vectorId],
                          },
                          headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`,
                          },
                        }
                      );    
                }

            
                setLoading(false);
                props.deleteDocumentState();
                props.onClose();
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        } else {
            console.log("Nothing to delete.");
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
                    {props.assetType === "campaign" ? <Title>Delete campaign?</Title> : <Title>Delete document?</Title>}
                    <Centered><Description>Asset will be permanently deleted and you will not be able to restore it.</Description></Centered>
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

export default DeleteDoc;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4rem 4rem 4rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
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