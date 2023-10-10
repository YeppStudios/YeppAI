import SlideBottom from "@/components/Animated/SlideBottom"
import Centered from "@/components/Centered"
import { Loader } from "@/components/Common/Loaders"
import styled from "styled-components"
import { create } from "ipfs-http-client";
import TypingAnimation from "../common/TypingAnimation";
import { useEffect, useRef, useState } from "react";
import { FileUploader } from 'react-drag-drop-files';
import InvisibleInput from "@/components/forms/InvisibleInput";
import { BsArrowRepeat, BsCash, BsGenderAmbiguous, BsGeo, BsHeart, BsHourglass, BsImage, BsPause, BsTextParagraph } from "react-icons/bs";
import MultiLineSkeletonLoader from "@/components/Common/MultilineSkeletonLoader";
import TextArea from "@/components/forms/TextArea";
import ReactMarkdown from "react-markdown";

interface Background {
    image: any
}

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

const traits = [
    {title: "age", icon: BsHourglass, value: "50"},
    {title: "status", icon: BsHeart, value: ""},
    {title: "income", icon: BsCash, value: ""},
    {title: "location", icon: BsGeo, value: ""},
    {title: "gender", icon: BsGenderAmbiguous, value: ""},
    {title: "description", icon: BsTextParagraph, value: ""},
]

const PersonaModal = (props: {step: any, personaGeneralInfo: any, setPersonaGeneralInfo: any, generatePersonaDescription: any, processingPrompt: any, editableDescription: any}) => {

    const [currentText, setCurrentText] = useState(0);
    const [personaDescription, setPersonaDescription] = useState("");
    const [image, setImage] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [descriptionLoading, setDescriptionLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const texts = [
        "Analyzing the value proposition...",
        "Learning more about the market...",
        "Saving persona in correct format...",
        "Analysing provided information...",
        "Reading...",
        "Thinking...",
        "Categorizing info...",
        "Memorizing the results...",
        "Give me a sec...",
        "Give me some more time to learn...",
        "It's taking me a while to read it, please wait...",
        "Trust me it's worth the wait...",
      ];  

      useEffect(() => {
        if (props.step === 0) {
          const intervalId = setInterval(() => {
            setCurrentText((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 5000);
          return () => clearInterval(intervalId);
        }
  
      }, [props.step, texts.length]);

      
    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const handleTraitInputChange = (e: any, traitTitle: string) => {
        const updatedValue = e.target.value;
        props.setPersonaGeneralInfo((prevState: any) => ({
            ...prevState,
            [traitTitle]: updatedValue
        }));
    };

    return (
        <Container onClick={(e) => e.stopPropagation()}>
            {props.step === 0 ?
                <div>
                    <ModalTitle>Give me a sec...</ModalTitle>
                    <Centered>
                        <ModalDescription>AI is analyzing the content to come up with an ideal persona. <br />It&apos;s worth the wait!</ModalDescription>
                    </Centered>
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><Texts>{texts[currentText]}</Texts></Centered>
                    </ThinkingContainer>
                </div>
            :
            <div>
            
            {(props.personaGeneralInfo) &&
            <SlideBottom>
            <div className="pb-8">
                <ModalTitle>
                    Persona outline
                </ModalTitle>
                <Centered>
                    <div className="lg:px-6 w-full">
                    <PersonaContainer>
                        <div className="flex items-center">
                        <FileUploader hoverTitle="Drop here" handleChange={handleFile} name="file" types={fileTypes} multiple={false} label="Drop an image" >
                            <ProfileContainer>
                                {previewUrl &&
                                        <PersonaProfile background={previewUrl}/>
                                }
                                <HoverIcon />
                            </ProfileContainer>
                        </FileUploader>
                            <div className="ml-4">
                                <p className="font-bold text-2xl">{props.personaGeneralInfo.fullName}</p>
                                <InvisibleInput value={props.personaGeneralInfo.occupation} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTraitInputChange(e, "occupation")}/>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap">
                        {traits.map((trait, index) => (
                            <>
                                {trait.title === "description" ?
                                    <div className="mb-4 w-full mt-4">
                                        <div className="w-full flex items-end justify-between">
                                            <div className="flex items-center">
                                                <trait.icon style={{ marginRight: '10px' }} />
                                                <span className="font-medium">{trait.title}: </span>
                                            </div>
                                            <div>
                                                {descriptionLoading ?
                                                <RetryButton onClick={() => props.generatePersonaDescription(props.personaGeneralInfo)}>
                                                    <BtnIcon>
                                                        <BsPause style={{ width: "100%", height: "auto" }} />
                                                    </BtnIcon>
                                                    Pause
                                                </RetryButton>
                                                :
                                                <RetryButton onClick={() => props.generatePersonaDescription(props.personaGeneralInfo)}>
                                                    <BtnIcon>
                                                        <BsArrowRepeat style={{ width: "100%", height: "auto" }} />
                                                    </BtnIcon>
                                                    Rewrite
                                                </RetryButton>
                                                }
                                            </div>
                                        </div>
                                        {props.processingPrompt ?
                                        <div className="ml-1 mt-4 font-medium px-2">
                                            <MultiLineSkeletonLoader lines={3} justifyContent={"left"} />
                                        </div>
                                        :
                                        <>
                                        {props.editableDescription ?
                                            <div className="ml-1 mt-4 font-medium px-2"><TextArea ref={textAreaRef} value={personaDescription} height="auto" padding="0.75rem" onChange={(e) => setPersonaDescription(e.target.value)}/></div>
                                            :
                                            <p className="ml-1 mt-4 font-medium px-4 whitespace-pre-wrap will-change-transform"><ReactMarkdown>{personaDescription}</ReactMarkdown></p>
                                        }
                                        </>
                                        }

                                    </div>
                                    :
                                    <div className="flex items-center mr-4 mb-4">
                                        <trait.icon style={{ marginRight: '10px' }} />
                                        <span className="font-medium mr-2">{trait.title}: </span>
                                        {/* Render value from props.personaGeneralInfo for the respective trait */}
                                        <InvisibleInput value={props.personaGeneralInfo[trait.title] || ''} onChange={(e: any) => handleTraitInputChange(e, trait.title)}></InvisibleInput>
                                    </div>
                                }
                            </>
                        ))}
                        </div>
                    {/* {props.personaGeneralInfo &&
                    <div className="mt-6">
                        <div>Why {personaGeneralInfo.occupation}?</div>
                    </div>
                    } */}
                    <WordCounter>{personaDescription.length} / 1500</WordCounter>
                    <div className="mt-4 px-2">
                    <ContinueBtn>
                        {saving ?
                        <Loader color="white" />
                        :
                        <p>Save</p>
                        }
                    </ContinueBtn>  
                    </div>
                    </PersonaContainer>
                    </div>
                </Centered>
            </div>
            </SlideBottom>
            }
            </div>
            }
        </Container>
    )
}


export default PersonaModal;

const Container = styled.div`
    width: 37rem;
    padding: 1rem 0rem 0rem 0rem;
    background: white;
    will-change: transform;
    position: relative;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: visible;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 4vh 2vw 4vh 2vw;
        box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.15);
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
        font-size: 1.2rem;
        line-height: 1.2;
        width: 95vw;
        margin-top: 0;
        padding-left: 1rem;
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
    color: #A0AEC0;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
    }
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
  height: 2.8rem;
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

const PersonaContainer = styled.div`
    width: 100%;
    padding: 1rem 1.2rem 1.5rem 1.2rem;
    border-radius: 25px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 150, 0.1);
`

const LinkBtn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 2.75rem;
    min-width: 2.75rem;
    margin-left: 1rem;
    color: black;
    border: solid 2px #e5e5e5;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        border: double 2px transparent;
        background-image: linear-gradient(white, white, white),
          radial-gradient(circle at top left, #6578f8, #64b5ff);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        transform: scale(0.95);
        color: black;
    }
`

const PersonaProfile = styled.div<{background: any}>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const HoverIcon = styled(BsImage)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 1.2rem;
    height: 1.2rem;
    color: #000;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease; 
`;
const ProfileContainer = styled.div`
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    cursor: pointer;
    
    &:hover ${PersonaProfile} {
        opacity: 0.7;
    }

    &:hover ${HoverIcon} {
        opacity: 1;
    }
`;

const RetryButton = styled.button`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    color: black;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const BtnIcon = styled.div`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
`

const ModalDescription = styled.p`
    width: 85%;
    text-align: center;
    margin-top: 0.75rem;
    font-weight: 500;
    margin-bottom: 2rem;
`
const EstimatedTime = styled.p`
    margin-top: 1vh;
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #798094;
    font-weight: 700;
    @media (max-width: 1023px) {
        margin-top: 5vh;
    }
`

const ThinkingContainer = styled.div`
    margin-top: 1rem;
    padding-bottom: 3.5rem;
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