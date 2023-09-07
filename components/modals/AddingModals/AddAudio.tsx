import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { send } from "@emailjs/browser";
import ColorfulText from "../../Common/ColorfulText";
import TypingAnimation from '../common/TypingAnimation';
import { BsCheckLg, BsFillVolumeUpFill, BsFolderPlus, BsXLg } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { Loader } from '../../Common/Loaders';
import { selectFolderState, setSelectedFolder } from "../../../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosResponse } from 'axios';
import { selectedUserState } from '@/store/userSlice';
import { selectedPlanState } from '@/store/planSlice';
import InputContainer from '../../Common/InputContainer';
import FoldersDropdown from '../../forms/FoldersDropdown';
import Space from '../../Docs/common/Space';
import { selectedWorkspaceCompanyState } from '@/store/workspaceCompany';

const AddAudio = (props: {
    onClose: any, setDocuments: any, documentsLimit: any, spaceLimit: any, folders: any, setFolders: any, folderLimit: any
}) => {


    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const selectedFolder = useSelector(selectFolderState);
    const plan = useSelector(selectedPlanState);
    const [fileLoading, setFileLoading] = useState(false);
    const user = useSelector(selectedUserState);
    const [chosenFolder, setChosenFolder] = useState<any>({title: "Choose folder"});
    const [success, setSuccess] = useState(false);
    const [openChooseFolder, setOpenChooseFolder] = useState(false);
    const [savingOption, setSavingOption] = useState(1);
    const [folderName, setFolderName] = useState("");
    const [createdDoc, setCreatedDoc] = useState<any>();
    const selectedWorkspaceCompany = useSelector(selectedWorkspaceCompanyState);

    const dispatch = useDispatch();

    const texts = [
      "Launching a clip...",
      "Starting the session...",
      "Hmmmm...",
      "Analyzing the content...",
      `Scanning the content...`,
      "Loading the context...",
      "Assimilating knowledge...",
      "Categorizing information...",
      "Just a moment...",
      "Repeating the process...",
      ];

    //loading texts
    useEffect(() => {
        if (loading) {
          const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 2500);
          return () => clearInterval(intervalId);
        }
      }, [loading, texts.length]);

      
      useEffect(() => {
        if (props.folders.length > 0) {
          setSavingOption(2);
        } else {
          setSavingOption(1);
        }
      }, [props.folders.length]);

      
    const addNewAudio = async (e: any) => {
        e.preventDefault();
        setFileLoading(true);
        try {
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

            const usageResponse = await api.get(`/user/${fetchedUser._id}/uploadStats`, {
              headers: {
                authorization: token
              }
            })

            const transcriptionResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/transcribe-yt`, {
              url: url
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
              }
            });

            if (usageResponse.data.uploadedBytes + transcriptionResponse.data.transcription.length*2 > fetchedPlan.maxUploadedBytes) {
              props.spaceLimit();
              setFileLoading(false);
              return;
            }

            if (usageResponse.data.documentCount >= fetchedPlan.maxFiles) {
              props.documentsLimit();
              setFileLoading(false);
              return;
            }

            if (usageResponse.data.folderCount >= fetchedPlan.maxFolders) {
              props.folderLimit();
              setFileLoading(false);
              return;
            }


            const estimatedTextSize = ((transcriptionResponse.data.transcription.length*2)/1048576).toFixed(2);
            const createdDocument = await api.post("/add-document", {
                owner: fetchedUser._id,
                ownerEmail: user.email,
                title: transcriptionResponse.data.title,
                category: "audio",
                timestamp: Date.now(),
                workspace: selectedWorkspaceCompany.workspace,
                vectorId: transcriptionResponse.data.ids[0],
                size: estimatedTextSize
            },
              {
                headers: {
                  Authorization: token
                }
             });
             setCreatedDoc(createdDocument.data.document)
             
            if (selectedFolder._id) {
              await api.post(`/folders/${selectedFolder._id}/add-document`, { documentId: createdDocument.data.document._id,},
              {
                headers: {
                  Authorization: token
                }
             });
             setFileLoading(false);
             props.setDocuments((prevDocuments: any) => [...prevDocuments, createdDocument.data.document]);
             setSuccess(true);
             setChosenFolder(selectedFolder);
            } else {
              setOpenChooseFolder(true);
              setFileLoading(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const saveToFolder = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (chosenFolder._id) {
        await api.post(`/folders/${chosenFolder._id}/add-document`, { documentId: createdDoc._id},
        {
          headers: {
            Authorization: token
          }
       });
       setSuccess(true);
       setLoading(false);
      } else {
        const createdFolder = await api.post("/add-folder", {
          title: folderName,
          owner: localStorage.getItem("user_id"),
          workspace: user.workspace,
          documents: [createdDoc]
        },
        {
          headers: {
            Authorization: token
          }
        });
        setChosenFolder(createdFolder.data.folder);
        setSuccess(true);
        setLoading(false);
      }
    }

    const handleOpenFolder = () => {
      dispatch(setSelectedFolder(chosenFolder));
      props.onClose();
    }

    return (
        <ModalBackground closeable={false}>
            <SlideBottom>
            <Container onClick={(e) => e.preventDefault()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            {!fileLoading && !success && !openChooseFolder &&
                <div>
                    <Title>Upload YouTube video</Title>
                    <Centered><Description>What video you want AI to learn from? <br />*<b>English only.</b>*</Description></Centered>
                    <Form autoComplete="off" onSubmit={(e) => addNewAudio(e)}>
                        <div style={{width: "100%"}}>
                                <Label>
                                  Video URL
                                </Label>
                                <Input
                                    id="yt-url"
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            <Centered>
                            <Button type="submit" onClick={(e) => addNewAudio(e)}>
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="black"/>
                                </div>
                                :
                                <p>Upload</p>
                                }
                            </Button>
                            </Centered>
                        </div>
                    </Form> 
                </div>   
            }

            {(openChooseFolder && !success) &&
              <div>
                  <Centered><Icon><BsFolderPlus style={{width: "100%", height: "auto", color: "black"}} /></Icon></Centered>
                      <Centered><Title>Save audio:</Title></Centered>
                          {!selectedFolder._id &&
                          <>
                          <ToggleContainer>
                              {savingOption === 1 &&
                                  <>
                                      <SelectedToggleBtn>New folder</SelectedToggleBtn>
                                      <ToggleBtn onClick={() => setSavingOption(2)}>Existing folder</ToggleBtn>
                                  </>
                              }
                              {savingOption === 2 &&
                                  <>
                                      <ToggleBtn onClick={() => setSavingOption(1)}>New folder</ToggleBtn>
                                      <SelectedToggleBtn>Existing folder</SelectedToggleBtn>
                                  </>
                              }
                          </ToggleContainer>
                          {savingOption === 2 &&
                            <InputContainer width="100%">
                                <FoldersDropdown
                                    width="100%"
                                    id="folder"
                                    type="text"
                                    placeholder="Create new folder"
                                    required
                                    value={chosenFolder}
                                    values={props.folders}
                                    onChange={setChosenFolder}
                                    error={undefined}
                                />
                            </InputContainer>
                          }
                          {savingOption === 1 &&
                            <InputContainer width="100%">
                                <Label>
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Folder"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    required
                                />          
                            </InputContainer>
                            }
                          </>
                          }
                        <Centered>
                        {!selectedFolder._id ?
                          <Button onClick={saveToFolder}>
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                            :
                            <p>Save</p>
                            }
                        </Button>
                        :
                        <Button onClick={() => props.onClose()}>
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                            :
                            <p>Continue</p>
                            }
                        </Button>
                        }
                    </Centered>
                </div>
              }          
            { fileLoading &&
              <div>
                <Title>Watching video...</Title>
                  <ThinkingContainer>
                      <Centered><TypingAnimation colorful={true} /></Centered>
                      <Centered><Texts>{texts[currentIndex]}</Texts></Centered>
                  </ThinkingContainer>
              </div>               
            }
            { success &&
              <div>
                <Centered><SuccessIcon><BsCheckLg className="text-green-400" style={{width: "100%", height: "100%"}}/></SuccessIcon></Centered>
                <Title>Content saved</Title>
                <Space margin='1rem 0 0 0'></Space>
                <Centered>
                <Button onClick={handleOpenFolder}>
                    {loading ?
                        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Loader color="black"/>
                          </div>
                      :
                      <p>Open folder</p>
                    }
                </Button>
              </Centered>
              </div>
            }           
            </Container>
           </ SlideBottom>
        </ModalBackground>
    )
}

export default AddAudio;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4.5rem 4rem 4.5rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
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
  width: 100%;
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
  border: solid 3px transparent;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  font-weight: 700;
  border-radius: 15px;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    transform: scale(0.95);
    box-shadow: none;
    translateX: 10px;
    box-shadow: 0 2px 2px 1px rgb(0, 0, 0, 0.1);
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
    width: 100%;
    color: black;
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

const ThinkingContainer = styled.div`
    margin-top: 3rem;
`;

const Texts = styled.div`
  color: black; 
  width: 75%;
  margin-top: 1.2rem; 
  font-weight: 500;
  text-align: center;
  @media (max-width: 1023px) {
    width: 55vw; 
    margin-top: 1rem;
  }
`;

const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  @media (max-width: 1023px) {
    margin-bottom: 0rem;
  }
`

const ToggleContainer = styled.div`
    width: 100%;
    justify-content: space-evenly;
    margin-bottom: 2rem;
    color: black;
    margin-top: 1rem;
    display: flex;
    @media (max-width: 1023px) {
      margin-top: 1rem;
  }
`

const ToggleBtn = styled.button`
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    font-weight: 700;
    border-bottom: solid 3px #ECECEC;
    @media (max-width: 1023px) {
        padding: 0.25rem 1rem 0.25rem 1rem;
        font-size: 0.8rem;
        margin: 0 0.6rem 0 0.6rem;
    }
`

const SelectedToggleBtn = styled.button`
    font-weight: 700;
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    border-bottom: solid 3px #6578F8;
    @media (max-width: 1023px) {
        padding: 0.25rem 1rem 0.25rem 1rem;
        font-size: 0.8rem;
        margin: 0 0.6rem 0 0.6rem;
    }
`