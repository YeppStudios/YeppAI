import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import { BsImage, BsXLg } from 'react-icons/bs';
import { Loader } from '../../Common/Loaders';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from "react-redux";
import { create } from "ipfs-http-client";
import Centered from '@/components/Centered';
import { useRouter } from 'next/router';
import { selectedProfileState } from '@/store/selectedProfileSlice';
import { selectFoldersState } from '@/store/selectedFoldersSlice';
import TonesDropdown from '@/components/Profiles/TonesDropdown';
import PersonasDropdown from '@/components/Profiles/PersonaDropdown';
import FoldersDropdown from '../../Profiles/ProfileFolders';

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_API_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

const fileTypes = ["JPG", "PNG", "HEIC", "JPEG"];

interface Background {
    image: any
}

const AddProfile = (props: { onClose: any, setProfiles: any}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState(""); 
    const selectedProfile = useSelector(selectedProfileState);
    let selectedFolders = useSelector(selectFoldersState);
    const [step, setStep] = useState(1);
    const [selectedTones, setSelectedTones] = useState<any[]>([]);
    const [selectedPersonas, setSelectedPersonas] = useState<any[]>([]);
    
    const router = useRouter();

    useEffect(() => {
        if (selectedProfile) {
            setTitle(selectedProfile.title);
            setDescription(selectedProfile.description);
            setPreviewUrl(selectedProfile.imageUrl);
        }
    }, [selectedProfile])

    const addNewProfile = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const workspace = localStorage.getItem("workspace");
        const token = localStorage.getItem("token");

        let imageURL = "";
        if (title.length < 1) {
            setLoading(false);
            return;
        }

        if (!selectedProfile && step === 1) {
            setStep(2);
            setLoading(false);
            return;
        } else if (!selectedProfile && step === 2) {
            if (image) {
                const subdomain = 'https://asystentai.infura-ipfs.io';
                const ipfsImage = await client.add({ content: image });
                imageURL = `${subdomain}/ipfs/${ipfsImage.path}`;
            }
            const createdProfile = await api.post("/addProfile", {
                title: title,
                updatedAt: Date.now(),
                workspace: workspace,
                subfolders: selectedFolders,
                imageUrl: imageURL,
                description: description
              },
              {
                headers: {
                  Authorization: token
                }
              });

              await api.patch(`/assign_profile_to_folders`, {
                folders: selectedFolders,
                profileId: createdProfile.data._id
            }, {
                headers: {
                    Authorization: token
                }
            });

            await api.patch(`/assign_profiles_to_personas`, {
                personas: selectedPersonas,
                profileId: createdProfile.data._id
            }, {
                headers: {
                    Authorization: token
                }
            });

            await api.patch(`/assign_profiles_to_tones`, {
                tones: selectedTones,
                profileId: createdProfile.data._id
            }, {
                headers: {
                    Authorization: token
                }
            });

            setLoading(false);
            props.setProfiles((profiles: any) => [...profiles, createdProfile.data]);
            props.onClose();
        } else {
            try {
                if (selectedProfile) {
                    if (image) {
                        const subdomain = 'https://asystentai.infura-ipfs.io';
                        const ipfsImage = await client.add({ content: image });
                        imageURL = `${subdomain}/ipfs/${ipfsImage.path}`;
                    }

                    await api.patch(`/updateProfile/${selectedProfile._id}`, {
                        title: title,
                        updatedAt: Date.now(),
                        imageUrl: imageURL,
                        description: description
                      },
                      {
                        headers: {
                          Authorization: token
                        }
                      });
                    setLoading(false);
                    router.reload();
                    props.onClose();
                }
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }
    }


    const handleImage = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };


    return (
        <ModalBackground closeable={false}>
            <SlideBottom>
            <Container onClick={(e) => e.preventDefault()}>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
                <div>
                    {selectedProfile ? <Title>Update profile</Title> : <>{step === 1 ? <Title>Define new profile</Title> : <Title>Assign existing assets</Title>}</>}
                    <Form autoComplete="off" onSubmit={(e) => addNewProfile(e)}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                        {(step === 1) &&
                        <div className='w-full'>
                                <Centered>
                                <FileUploader hoverTitle="Drop here" handleChange={handleImage} name="file" types={fileTypes} multiple={false} label="Drop an image">
                                {previewUrl || image ?
                                    <SelectedAddPfp image={previewUrl}></SelectedAddPfp>  
                                    :
                                    <AddPfp image={previewUrl}>
                                        <BsImage style={{width: "2rem", height: "2rem"}}/>
                                    </AddPfp>      
                                }
                                </FileUploader>
                                </Centered>
                            </div>
                        }
                        {(!selectedProfile && step === 2) &&
                            <>
                                <div className='w-full mt-6 mb-4'>
                                    <FoldersDropdown />
                                </div>
                                <div className='w-full mb-4'>
                                    <TonesDropdown setSelectedTones={setSelectedTones} selectedTones={selectedTones}/>
                                </div>
                                <div className='w-full mb-4'>
                                    <PersonasDropdown setSelectedPersonas={setSelectedPersonas} selectedPersonas={selectedPersonas} />
                                </div>
                            </>
                        }
                        {(step === 1) &&
                          <>
                          <div className='w-full'>
                                <Label>
                                    Profile name
                                </Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="My Client"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className='w-full'>
                                <Label>
                                    Profile description
                                </Label>
                                <Input
                                    id="description"
                                    type="text"
                                    placeholder="Short description of profile."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            </>
                            }
                            <Button type="submit" onClick={(e) => addNewProfile(e)}>
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="black"/>
                                </div>
                                :
                                <>
                                {selectedProfile ?
                                <p>Update</p>
                                :
                                <>
                                {step !== 1 ?
                                <p>Add</p>
                                :
                                <p>Continue</p>
                                }
                                </>
                                }
                                </>
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

export default AddProfile;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 5rem 4rem 5rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
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
  border-radius: 15px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 0px 0px 10px rgba(22, 27, 29, 0.12), inset -3px -3px 10px #FAFBFF;
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


const SelectedAddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 1px 1px 8px rgba(0, 0, 100, 0.10);
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        color: black;
        box-shadow: none;
    }
`


const AddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: dashed 3px #CFD5E8;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: dashed 3px black;
        transform: scale(0.95);
        color: black;
    }
`