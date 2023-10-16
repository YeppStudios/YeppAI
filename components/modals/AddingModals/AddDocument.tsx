import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import TypingAnimation from '../common/TypingAnimation';
import { BsCheckLg, BsFolder, BsXLg, BsFolderPlus } from 'react-icons/bs';
import { selectFolderState, setSelectedFolder } from "../../../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import { FileUploader } from 'react-drag-drop-files';
import Image from 'next/image';
import tickIcon from '../../../public/images/tickGreen.png';
import axios, { AxiosResponse } from 'axios';
import { Loader } from '../../Common/Loaders';
import { selectedUserState } from '@/store/userSlice';
import { selectedPlanState } from '@/store/planSlice';
import InputContainer from '../../Common/InputContainer';
import TextArea from '../../forms/TextArea';
import FoldersDropdown from '../../forms/FoldersDropdown';
import Space from '../../Docs/common/Space';
import { selectedWorkspaceCompanyState } from '@/store/workspaceCompany';

const fileTypes = ["TXT", "DOCX", "PPTX", "PDF", "CSV"];

const AddDocument = (props: {
    onClose: any, documentType: string, setDocuments: any, documentsLimit:any, spaceLimit: any, folders: any[], setFolders: any, folderLimit: any
}) => {

    const selectedFolder = useSelector(selectFolderState);
    const selectedWorkspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const [website, setWebsite] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [scraping, setScraping] = useState(false);
    const [linkError, setLinkError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chosenFolder, setChosenFolder] = useState<any>({title: "Choose folder"});
    const [savingOption, setSavingOption] = useState(1);
    const [folderName, setFolderName] = useState("");
    const [scrapedUrls, setScrapedUrls] = useState<string[]>([]);
    const [openChooseFolder, setOpenChooseFolder] = useState(false);
    const [createdDocs, setCreatedDocs] = useState<any[]>([]);
    const [success, setSuccess] = useState(false);
    const [usageResponse, setUsageResponse] = useState<any>();
    const plan = useSelector(selectedPlanState);
    const user = useSelector(selectedUserState);
    const [files, setFiles] = useState<File[]>([]);
    const dispatch = useDispatch();

    const texts = [
      "Analyzing content...",
      `Give me a sec...`,
      "Loading context...",
      "Learning...",
      "Saving files...",
      "Categorizing information...",
      "Just a moment...",
      "Repeating the process...",
    ];

    function isValidURL(string: string) {
      var url;
    
      try {
        url = new URL(string);
      } catch (_) {
        return false;  
      }
    
      return url.protocol === "http:" || url.protocol === "https:";
    }
    

    useEffect(() => {
      const fetchUsage = async () => {
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
        setUsageResponse(usageResponse.data);
      }
      fetchUsage();

    }, [plan, selectedWorkspaceCompany, user]);

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

    const handleFiles = (uploadedFiles: FileList) => {
      if (Array.from(uploadedFiles).length > 5) {
        alert("Please upload up to 5 files at once.");
        return;
      }
        setFiles(Array.from(uploadedFiles));
    };


    const addNewDocuments = async () => {
      const token = localStorage.getItem("token");
      if (files.length > 0) {
          try {
              setFileLoading(true);
              let fetchedUser: any;
              let fetchedPlan: any;
              if (selectedWorkspaceCompany._id) {
                  fetchedUser = selectedWorkspaceCompany;
                  fetchedPlan = selectedWorkspaceCompany.plan;
              } else {
                  fetchedUser = user;
                  fetchedPlan = plan;
              }
  
              for (const file of files) {
                  if (usageResponse.documentCount >= fetchedPlan.maxFiles) {
                    props.documentsLimit();
                    setFileLoading(false);
                    return;
                  }
  
                  if (usageResponse.uploadedBytes + file.size > fetchedPlan.maxUploadedBytes) {
                    props.spaceLimit();
                    setFileLoading(false);
                    return;
                  }

                  let upsertResponse = {data: {text: '', ids: ['']}};
                  let url;
                  const fileType = file.type; // This gives the MIME type of the file
                  
                  switch(fileType) {
                    case 'text/csv':
                      url = 'https://www.asistant.ai/upsert-csv';
                      break;
                    case 'application/pdf':
                      url = 'https://www.asistant.ai/upsert-pdf';
                      break;
                    default:
                      url = 'https://www.asistant.ai/upsert-file';
                  }
                  
                  upsertResponse = await axios.post(
                    url,
                    {file},
                    {
                      headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`,
                        'Content-Type': 'multipart/form-data'  
                      }
                    }
                  );
  
                  const createdDocument = await api.post("/add-document", {
                        owner: fetchedUser._id,
                        ownerEmail: user.email,
                        title: file.name,
                        category: "general",
                        timestamp: Date.now(),
                        workspace: fetchedUser.workspace,
                        vectorId: upsertResponse.data.ids[0],
                        size: file.size
                    },
                      {
                        headers: {
                          Authorization: token
                        }
                    });
                    setCreatedDocs(prevDocs => [...prevDocs, createdDocument.data.document]);
  
                  if (selectedFolder._id) {
                    await api.post(`/folders/${selectedFolder._id}/add-document`, { documentId: createdDocument.data.document._id},
                    {
                      headers: {
                        Authorization: token
                      }
                   });
                   props.setDocuments((prevDocuments: any) => [...prevDocuments, createdDocument.data.document]);
                   setChosenFolder(selectedFolder);
                  }
  
                  // Wait for 2 seconds before processing the next file
                  await new Promise(resolve => setTimeout(resolve, 2000));
              }

              setFileLoading(false);

              if (selectedFolder._id) {
                setSuccess(true);
              } else {
                setOpenChooseFolder(true);
              }

          } catch (e) {
              console.log(e);
              setFileLoading(false);
          }
      } else {
          alert("Choose a file.")
      }
  };
  

    const scrapeWebsite = async () => {
        try {
          let url = new URL(website);
        } catch (_) {
          setLinkError(true);
          setLoading(false);
          setScraping(false);
          return;  
        }
        setScraping(true);
        const workspace = localStorage.getItem("workspace");
        const token = localStorage.getItem("token");
        let title = "";
        try {
          let fetchedUser: any;
          let fetchedPlan: any;
          if (selectedWorkspaceCompany._id) {
              fetchedUser = selectedWorkspaceCompany;
              fetchedPlan = selectedWorkspaceCompany.plan;
          } else {
              fetchedUser = user;
              fetchedPlan = plan;
          }

            const scrapingResponse = await axios.post(`https://www.asistant.ai/scrape-links`, {
              urls: [website]
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
              }
            });

            if (usageResponse.uploadedBytes + scrapingResponse.data.text.length*2 > fetchedPlan.maxUploadedBytes) {
              props.spaceLimit();
              setLoading(false);
              return;
            }

            if (usageResponse.documentCount >= fetchedPlan.maxFiles) {
              props.documentsLimit();
              setLoading(false);
              return;
            }

            if(scrapingResponse.data.ids.length === 0) {
              alert("An error occured while scanning the website. Contact us: hello@yepp.ai");
              setScraping(false);
              return;
            }

            setScrapedUrls(prevUrls => [...prevUrls, website]);

            if (website.length > 35) {
              title = website.slice(0, 35) + '...';
            } else {
                title = website;
            }
            const estimatedTextSize = scrapingResponse.data.text.length*2;
            const createdDocument = await api.post("/add-document", {
                owner: fetchedUser._id,
                title: title,
                category: "website",
                vectorId: scrapingResponse.data.ids[0],
                timestamp: Date.now(),
                ownerEmail: user.email,
                workspace: fetchedUser.workspace,
                size: estimatedTextSize
            },
            {
              headers: {
                Authorization: token
              }
            });
            setCreatedDocs(prevDocs => [...prevDocs, createdDocument.data.document]);

          if (selectedFolder._id) {
            await api.post(`/folders/${selectedFolder._id}/add-document`, { documentId: createdDocument.data.document._id,},
            {
              headers: {
                Authorization: token
              }
           });
           props.setDocuments((prevDocuments: any) => [...prevDocuments, createdDocument.data.document]);
           setChosenFolder(selectedFolder);
           setSuccess(true);
          } else {
            setOpenChooseFolder(true);
          }
          setScraping(false);
        } catch (error) {
            console.log(error);
            setScraping(false);
        }
    }


    const saveToFolder = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (chosenFolder._id) {
        const documentIds = createdDocs.map(doc => doc._id);
        await api.post(`/folders/${chosenFolder._id}/add-documents`, { documents: documentIds},
        {
          headers: {
            Authorization: token
          }
       });
       setSuccess(true);
       setLoading(false);

      } else {
        let fetchedUser: any;
        let fetchedPlan: any;
        if (selectedWorkspaceCompany._id) {
            fetchedUser = selectedWorkspaceCompany;
            fetchedPlan = selectedWorkspaceCompany.plan;
        } else {
            fetchedUser = user;
            fetchedPlan = plan;
        }
        if (usageResponse.folderCount >= fetchedPlan.maxFolders) {
          props.folderLimit();
          setFileLoading(false);
          return;
        }

        const createdFolder = await api.post("/add-folder", {
          title: folderName,
          owner: localStorage.getItem("user_id"),
          workspace: fetchedUser.workspace,
          documents: createdDocs,
          ownerEmail: user.email
        },
        {
          headers: {
            Authorization: token
          }
        });
        props.setFolders((folders: any) => [...folders, createdFolder.data.folder]);
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
                  {(props.documentType === "file" && !openChooseFolder && !fileLoading && !success) &&
                  <>
                    <Title>Upload a file</Title>
                    <Centered><Description>Upload a PDF, PPTX, TXT, CSV or DOCX file. </Description></Centered>
                    <Form autoComplete="off">
                            <Centered>
                                <FileUploader hoverTitle="Drop here" handleChange={handleFiles} name="file" types={fileTypes} multiple={true} >
                                {files.length > 0 ? 
                                    <UploadFile>
                                        <Centered><BsFolder style={{width: "2rem", height: "2rem"}}/></Centered>
                                        <Centered>
                                          <div style={{display: "flex", flexWrap: "wrap"}}>
                                        {files.map((file, index) => (
                                            <FileText key={index} className='text-gray-700'>
                                                <TickIcon>
                                                    <Image style={{ width: "100%", height: "auto" }}  src={tickIcon} alt={'icon'} />
                                                </TickIcon>
                                                {file.name.length > 24 ? <p>{file.name.slice(0, 24)}...</p> : file.name}
                                            </FileText>
                                          ))}
                                          </div>
                                        </Centered>
                                    </UploadFile>
                                 : 
                                    <UploadFile>
                                        <Centered><BsFolder style={{width: "2rem", height: "2rem"}}/></Centered>
                                        <Centered><FileText>Click of drag up to 5 files</FileText></Centered>
                                    </UploadFile>                                          
                                  }
                                </FileUploader>
                            </Centered>
                            <Centered>
                            <Button type="submit" onClick={addNewDocuments}>
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                                :
                                <p>Upload</p>
                                }
                            </Button>
                            </Centered>
                    </Form> 
                    </>
                    }
                    {(props.documentType === "website" && scrapedUrls.length === 0 && !scraping && !openChooseFolder && !success) &&  
                    <>
                    <Title>Scrape the website</Title>     
                    <Centered><Description>Paste the link to the webpage for AI to read.</Description></Centered>
                     <Form autoComplete="off">
                          <div>
                            <div style={{width: "100%"}}>
                                    <Label>
                                      Link {linkError && <span style={{color: "red", marginLeft: "0.5rem"}}>please enter a valid website url</span>}
                                    </Label>
                                    <Input
                                        id="website"
                                        type="text"
                                        placeholder="https://www.yepp.ai/about-us"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <Centered>
                                <Button type="submit" onClick={scrapeWebsite}>
                                    <p>Scrape</p>
                                </Button>
                                </Centered>
                                <Centered><Disclaimer>Lot of web pages? Contact us: <br /><b>hello@yepp.ai</b></Disclaimer></Centered>
                            </div>
                        </Form>     
                      </> 
                    }

                  {(openChooseFolder && !success) &&
                  <div>
                    <Centered><Icon><BsFolderPlus style={{width: "100%", height: "auto", color: "black"}} /></Icon></Centered>
                      <Centered>{props.documentType === "website" ? <Title>Save content in:</Title> : <Title>Save the file:</Title>}</Centered>
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
                                    Name new folder
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
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
                      <Title>Uploading content...</Title>
                        <ThinkingContainer>
                            <Centered><TypingAnimation colorful={true} /></Centered>
                            <Centered><Texts>{texts[currentIndex]}</Texts></Centered>
                        </ThinkingContainer>
                    </div>
                  }
                  { success &&
                    <div>
                      <Centered><SuccessIcon><BsCheckLg className="text-green-400" style={{width: "100%", height: "100%"}}/></SuccessIcon></Centered>
                      {props.documentType === "file" ? <Title>File saved</Title> : <Title>Content saved</Title>}
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
                  { scraping &&
                  <div>
                    <Title>Scraping the website...</Title>
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><LoaderTexts>{texts[currentIndex]}</LoaderTexts></Centered>
                    </ThinkingContainer>       
                  </div>         
                  }
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default AddDocument;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4.5rem 3.5rem 4.5rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
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
  margin-top: 1rem;
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
  width: 20vw;
  height: 3rem;
  margin-top: 1.5rem;
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
    margin-top: 0.7rem;
    width: 90%;
    font-weight: 500;
    color: black;
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

const UploadFile = styled.div`
    justify-content: center;
    padding: 1.5rem 0 1.5rem 0;
    width: 20rem;
    color: #CFD5E8;
    overflow: hidden;
    overflow-y: scroll;
    border: dashed 3px #CFD5E8;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px black;
        transform: scale(0.95);
        color: black;
    }
  @media (max-width: 1023px) {
    width: 18rem;
  }
`

const FileText = styled.div`
    width: 90%;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-weight: 500;
`

const TickIcon = styled.div`
    width: 0.75rem;
    height: 0.75rem;
    margin-top: 0.2rem;
    margin-left: 1.5rem;
    margin-right: 0.5rem;
    @media (max-width: 1023px) {
        width: 4vw;
        height: 4vw;
    }
`

const ThinkingContainer = styled.div`
    margin-top: 3rem;
`;

const LoaderTexts = styled.div`
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

const Disclaimer = styled.div`
  color: black;
  margin-top: 1.2rem;
  text-align: center;
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