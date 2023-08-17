import SlideBottom from "@/components/Animated/SlideBottom";
import ModalBackground from "@/components/Modals/common/ModalBackground";
import TextArea from "@/components/forms/TextArea";
import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { BsImage, BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FileUploader } from 'react-drag-drop-files';
import { create } from "ipfs-http-client";
import { Center } from "@mantine/core";
import Centered from "@/components/Centered";
import Space from "@/components/Docs/common/Space";
import Label from "@/components/Common/Label";

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


const PersonaModal = (props: {onClose: any, currentModal: any}) => {

    const [personaDescription, setPersonaDescription] = useState("");
    const [step, setStep] = useState("");
    const [image, setImage] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    useEffect(() => {
        if (props.currentModal === "persona-description") {
            setStep("description");
        } else if (props.currentModal === "persona-form") {
            setStep("form");
        }
    }, [props.currentModal])

    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    return (
        <ModalBackground onClose={props.onClose} closeable={true}>
            <SlideBottom>
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {step === "form" &&
                <div>
                    <ModalTitle>
                        Provide some details
                    </ModalTitle>
                    <Centered>
                    <div className="flex flex-wrap w-full px-6">
                    <div className="flex items-center justify-between w-full"><Label>What is your product/service?</Label><WordCounter>{about.length} / 200</WordCounter></div>
                    <TextArea 
                        placeholder="Describe your product/service in 1 sentence."
                        padding="1rem"
                        height="5.2rem"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn>
                        <p>Save</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                {step === "description" &&
                <div>
                    <ModalTitle>
                        Describe your persona
                    </ModalTitle>
                    <div className="px-6">
                    <TextArea 
                        placeholder="Describe your ideal persona..."
                        padding="1rem"
                        height="30rem"
                        value={personaDescription}
                        onChange={(e) => setPersonaDescription(e.target.value)}
                    />
                    <WordCounter>{personaDescription.length} / 1000</WordCounter>
                    </div>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => setStep("save")}>
                        <p>Continue</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                {step === "save" &&
                <div>
                    <ModalTitle>
                        Save your persona
                    </ModalTitle>
                    <Centered>
                    <div className="flex flex-wrap justify-center w-8/12">
                    <FileUploader hoverTitle="Drop here" handleChange={handleFile} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                            {previewUrl || image ?
                                <SelectedAddPfp image={previewUrl}></SelectedAddPfp>  
                                :
                                <AddPfp image={previewUrl}>
                                    <div>
                                    <Centered><BsImage style={{width: "2rem", height: "2rem"}}/></Centered>
                                    <p className="w-full text-center mt-2">optional</p>
                                    </div>
                                </AddPfp>      
                            }
                    </FileUploader>
                    <Input type="text" placeholder="Assistant Michael" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn>
                        <p>Save</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
            </Container>
            </SlideBottom>
        </ModalBackground>
    )
}

export default PersonaModal;

const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 0rem 0rem;
    background: white;
    position: relative;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
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

const ModalTitle = styled.h1`
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    width: 100%;
    margin-left: 0rem;
    padding-left: 2rem;
    border-bottom: 1px solid #E5E8F0;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.7rem;
        line-height: 1.2;
        width: 95vw;
        margin-top: 2vh;
    }
`

const ContinueBtn = styled.button`
        border: solid 3px transparent;
        border-radius: 15px;
        position: relative;
        color: white;
        font-weight: 500;
        width: 100%;
        height: 3rem;
        background: linear-gradient(40deg, #6578F8, #64B5FF);
        background-size: 110%;
        background-position-x: -1rem;
        transition: all 0.4s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    &:hover {
    transform: scale(0.95);
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    padding: 0 8rem 2rem 8rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
    @media (max-width: 1023px) {
        padding: 0 1rem 0 1rem;
    }
`
const WordCounter = styled.p`
    text-align: right;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    color: #A0AEC0;
`

const SelectedAddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 7rem;
    height: 7rem;
    margin-bottom: 1.5rem;
    color: #CFD5E8;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: -4px 4px 0px rgba(101, 120, 248, 1), 4px -4px 0px rgba(100, 181, 255, 1);
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        color: black;
    }
`
const AddPfp = styled.div<Background>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 7rem;
    height: 7rem;
    margin-bottom: 1.5rem;
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

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 3.2rem;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: inset 1px 1px 5px rgba(22, 27, 29, 0.2), inset -1px -1px 5px #FAFBFF;
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
    width: 100%;
    margin-bottom: 0;
    padding: 0.6rem;
}
`;
