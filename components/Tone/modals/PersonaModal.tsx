import SlideBottom from "@/components/Animated/SlideBottom";
import TextArea from "@/components/forms/TextArea";
import { useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { BsArrowRepeat, BsBriefcase, BsCash, BsDashLg, BsGenderAmbiguous, BsGeo, BsHeart, BsHourglass, BsImage, BsPlusLg, BsTextParagraph, BsXLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { FileUploader } from 'react-drag-drop-files';
import { create } from "ipfs-http-client";
import { Center } from "@mantine/core";
import Centered from "@/components/Centered";
import Space from "@/components/Docs/common/Space";
import Label from "@/components/Common/Label";
import persona from "@/public/images/persona.png";
import Image from "next/image";
import CustomDropdown from "@/components/forms/CustomDropdown";

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

const traits = [
        {title: "age", icon: BsHourglass, value: "50"},
        {title: "occupation", icon: BsBriefcase, value: ""},
        {title: "status", icon: BsHeart, value: ""},
        {title: "income", icon: BsCash, value: ""},
        {title: "location", icon: BsGeo, value: ""},
        {title: "gender", icon: BsGenderAmbiguous, value: ""},
        {title: "description", icon: BsTextParagraph, value: "sdfadsf"},
]

const competition = [
    {title: "Jasper", favicon: "https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b86e6acc31077_Favicon.png", description: "dsfsdga"},
]

const markets = [
    "Global",
    "Europe",
    "United States",
    "Asia",
    "South America",
    "Africa",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "China",
    "Japan",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Poland",
    "Singapore"
]

const PersonaModal = (props: {onClose: any, currentModal: any}) => {
    const [personaDescription, setPersonaDescription] = useState("");
    const [step, setStep] = useState("");
    const [image, setImage] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState(""); 
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [links, setLinks] = useState<string[]>([""]);
    const [userLink, setUserLink] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [market, setMarket] = useState("United States");
    const [personaTraits, setPersonaTraits] = useState<any[]>([{age: "", occupation: "", status: "", income: "", location: "", gender: "", description: ""}]);

    useEffect(() => {
        if (props.currentModal === "persona-description") {
            setStep("description");
        } else if (props.currentModal === "persona-form") {
            setStep("form");
        }
    }, [props.currentModal])

    const isValidURL = (string: string) => {
        const res = string.match(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        );
        return res !== null;
    };

    const handleFile = (image: File) => {
        setImage(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const handleAddLink = () => {
        if (links[links.length - 1] && isValidURL(links[links.length - 1])) {
          setLinks([...links, ""]);
        }
      };
      
      const handleRemoveLink = (indexToRemove: number) => {
        if (links.length > 1) {
          setLinks(links.filter((_, index) => index !== indexToRemove));
        }
      };
      

    return (
        <ModalBackground>
            <SlideBottom>
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <MdOutlineClose style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {step === "form" &&
                <div>
                    <ModalTitle>
                        Provide more details
                    </ModalTitle>
                    <Centered>
                    <div className="flex flex-wrap">
                    <div className="flex flex-wrap w-full px-6">
                    <div className="flex items-center justify-between w-full"><Label>What is your product/service about?</Label><WordCounter>{about.length} / 400</WordCounter></div>
                    <TextArea 
                        placeholder="Briefly describe your product/service."
                        padding="1rem"
                        height="5.2rem"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    </div>
                    <div className="flex flex-wrap w-full px-6 mt-6 justify-between">
                    <div className="flex w-[48%] items-center mb-2 flex-wrap">
                    <div className="flex items-between justify-between w-full">
                        <Label>Market</Label>
                    </div>
                        <CustomDropdown 
                        placeholder="United States"
                        value={market}
                        values={markets}
                        onChange={setMarket}
                        />
                    </div>
                    <div className="flex w-[48%] items-center mb-2 flex-wrap">
                    <div className="flex items-between justify-between w-full">
                        <Label>Target audience</Label>
                    </div>
                        <Input 
                        placeholder="Marketing agencies"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="flex flex-wrap w-full px-6 mt-6">
                    <div className="flex items-between justify-between w-full">
                    <Label>Your landing page (optional)</Label>
                    </div>
                    <div className="flex w-full items-center mb-2">
                        <Input 
                        placeholder="https://..."
                        value={userLink}
                        onChange={(e) => setUserLink(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="flex flex-wrap w-full px-6 mt-6">
                    <div className="flex items-between justify-between w-full">
                    <Label>Who is your competition? (optional)</Label>
                    </div>

                    {links.map((link, index) => (
                    <div key={index} className="flex w-full items-center mb-2">
                        <Input 
                        placeholder="https://..."
                        value={link}
                        onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[index] = e.target.value;
                            setLinks(newLinks);
                        }}
                        />

                        {index !== links.length - 1 && (
                        <LinkBtn onClick={() => handleRemoveLink(index)}>
                            <BsDashLg style={{width: "auto", height: "60%"}}/>
                        </LinkBtn>
                        )}

                        {index === links.length - 1 && (
                        <LinkBtn onClick={handleAddLink}>
                            <BsPlusLg style={{width: "auto", height: "60%"}}/>
                        </LinkBtn>
                        )}
                    </div>
                    ))}
                    </div>
                    </div>
                    </Centered>
                    <Space margin="2rem"/>
                    <ButtonContainer>
                    <ContinueBtn onClick={() => setStep("persona")}>
                        <p>Continue</p>
                    </ContinueBtn>  
                    </ButtonContainer>
                </div>
                }
                {step === "persona" &&
                <div className="pb-12">
                    <ModalTitle>
                        Persona outline
                    </ModalTitle>
                    <Centered>
                        <div className="px-6 w-full">
                        <PersonaContainer>
                            <div className="flex items-center">
                                <PersonaProfile background={persona}/>
                                <div className="ml-4">
                                    <p className="font-bold text-2xl">Elon Musk</p>
                                    <p className="text-sm font-medium">CEO of biggest tech companies</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap">
                                {traits.map((trait, index) => (
                                    <>
                                        {trait.title === "description" ?
                                            <div className="mr-4 mb-4 w-full mt-4">
                                                <div className="w-full flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <trait.icon style={{marginRight: '10px'}} />
                                                    <span className="font-medium">{trait.title}: </span>
                                                </div>
                                                <div>
                                                <RetryButton>
                                                    <BtnIcon>
                                                        <BsArrowRepeat style={{width: "100%", height: "auto"}}/>
                                                    </BtnIcon>
                                                    Rewrite
                                                </RetryButton>
                                                </div>
                                                </div>
                                                <span className="ml-1 mt-4 font-medium">{trait.value}</span>
                                            </div>
                                        :
                                            <div className="flex items-center mr-4 mb-4">
                                                <trait.icon style={{marginRight: '10px'}} />
                                                <span className="font-medium">{trait.title}: </span>
                                                <span className="ml-1 font-medium">{trait.value}</span>
                                            </div>
                                        }
                                    </>
                                ))}
                            </div>
                        <ContinueBtn onClick={() => setStep("save")}>
                            <p>Save</p>
                        </ContinueBtn>  
                        </PersonaContainer>
                        <div className="mt-10">
                        <h2 className="text-lg font-medium">How does it compare to your competition?</h2>
                        {competition.map((competitor, index) => (
                            <div key={index} className="mt-6">
                                <div className="flex items-center">
                                    <div className="rounded-full">
                                        <Image width={300} height={300} alt={`${competitor.title}`} src={competitor.favicon} style={{width: "2.5rem", height: "2.5rem"}}/>
                                    </div>
                                    <div className="ml-4 font-medium text-lg">
                                        {competitor.title}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    {competitor.description}
                                </div>
                            </div>
                        ))}
                        </div>
                        </div>
                    </Centered>
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
                    <Input type="text" placeholder="Name your persona" value={name} onChange={(e) => setName(e.target.value)}/>
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

const ModalBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    flex-wrap: wrap;
    backdrop-filter: blur(7px);
    z-index: 100;
    padding-top: 3rem;
    left: 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    overflow: scroll;
        &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    color: black;
    @media (max-width: 1023px) {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100vw;
        overflow-x: hidden;
    }
`

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

const PersonaContainer = styled.div`
    width: 100%;
    padding: 1rem 1.2rem 1.5rem 1.2rem;
    border-radius: 25px;
    border: 2px solid #E5E8F0;
    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.1);
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
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-image: url(${props => props.background.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

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