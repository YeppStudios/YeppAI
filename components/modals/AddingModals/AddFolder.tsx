import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { BsCheckLg, BsFolder, BsXLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Loader } from '../../Common/Loaders';
import { selectFolderState, setSelectedFolder } from "../../../store/openedFolderSlice";
import { selectedWorkspaceCompanyState } from '@/store/workspaceCompany';
import { selectedUserState } from '@/store/userSlice';
import { selectedPlanState } from '@/store/planSlice';
import { useSelector, useDispatch } from "react-redux";

const AddFolder = (props: {
    onClose: any, setFolders: any, folders: any[], folderLimit: any
}) => {


    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const selectedWorkspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const user = useSelector(selectedUserState);
    const plan = useSelector(selectedPlanState);

    const addNewFolder = async (e: any) => {
        e.preventDefault();
        const workspace = localStorage.getItem("workspace");
        const token = localStorage.getItem("token");
        let fetchedUser: any;
        let fetchedPlan: any;
        if (selectedWorkspaceCompany._id) {
            fetchedUser = selectedWorkspaceCompany;
            fetchedPlan = selectedWorkspaceCompany.plan;
        } else {
            fetchedUser = user;
            fetchedPlan = plan;
        }

        if (props.folders.length >= fetchedPlan.maxFolders) {
          props.folderLimit();
          setLoading(false);
          return;
        }

        if (name.length > 1) {
            try {
                setLoading(true);
                const createdFolder = await api.post("/add-folder", {
                    title: name,
                    owner: fetchedUser._id,
                    category: "general",
                    updatedAt: Date.now(),
                    documents: [],
                    workspace: workspace
                  },
                  {
                    headers: {
                      Authorization: token
                    }
                  });
                setLoading(false);
                dispatch(setSelectedFolder(createdFolder.data.folder));
                props.setFolders((folders: any) => [...folders, createdFolder.data.folder]);
                props.onClose();
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        } else {
            alert("Title needs to be at least 2 characters long.")
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
                    <Centered><Icon className='text-gray-800'><BsFolder style={{width: "100%", height: "100%"}} /></Icon></Centered>
                    <Title>Add new folder</Title>
                    <Form autoComplete="off" onSubmit={(e) => addNewFolder(e)}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                          <div>
                                <Label>
                                    Folder name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="New Folder"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <Button type="submit" onClick={(e) => addNewFolder(e)}>
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="black"/>
                                </div>
                                :
                                <p>Save</p>
                                }
                            </Button>
                        </div>
                    </Form> 
                </div>   
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default AddFolder;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4rem 4rem 4rem;
    background: #F8F4ED;
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

const Label = styled.div`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  display: flex;
  color: black;
  font-weight: 500;
  align-items: center;
  @media (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 22rem;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 3px 3px 10px rgba(22, 27, 29, 0.23), inset -3px -3px 10px #FAFBFF;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #A7ACBC;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    width: 72vw;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;

const Button = styled.button`
  display: block;
  width: 18vw;
  height: 3rem;
  margin-top: 2rem;
  border: none;
  color: black;
  font-size: 1.2rem;
  border: solid 3px black;
  background: transparent;
  font-weight: 700;
  border-radius: 15px;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    box-shadow: none;
    translateX: 10px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
}
  box-shadow: 0 4px 4px 1px rgb(0, 0, 0, 0.2);
  @media (max-width: 1023px) {
    margin-top: 3vh;
    width: 65vw;
    }
`;

const Description = styled.div`
    text-align: center;
    margin-top: 1rem;
    width: 80%;
    font-weight: 500;
    @media (max-width: 1023px) {
      width: 95%;
      font-size: 0.9rem;
      }
`

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
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