import styled from "styled-components";
import SlideBottom from "../../Animated/SlideBottom";
import ModalBackground from "../common/ModalBackground"
import { BsFillFolderFill, BsXLg } from "react-icons/bs";
import { selectFolderState, setSelectedFolder } from "../../../store/openedFolderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Key, useEffect } from "react";

const AboutAssistant = (props: {onClose: any, assistant: any, deleteAssistant: any}) => {

    const dispatch = useDispatch();

    const handleFolderClick = (folder: any) => {
        dispatch(setSelectedFolder(folder))
        props.onClose();
    }

    const handleDeleteAssistant = () => {
        props.onClose();
        props.deleteAssistant();
    }

    return (
        <ModalBackground onClick={props.onClose}>
            <SlideBottom>
                <Modal>
                    <CloseIcon onClick={props.onClose}>
                            <BsXLg style={{width: "100%", height: "auto"}}/>
                    </CloseIcon>
                    <AssistantHeader>
                        <AssistantIcon background={props.assistant.image}></AssistantIcon>
                        <div>
                            <div style={{display: "flex", paddingTop: "0.2rem"}}><AssistantName>{props.assistant.name}</AssistantName><AssistantRole>{props.assistant.category}</AssistantRole></div>
                            <AssistantDescription>{props.assistant.description}</AssistantDescription>
                        </div>
                    </AssistantHeader>
                    {(props.assistant.companyName && props.assistant.aboutCompany) &&
                        <>
                            <Label>Pomagam firmie:</Label>
                            <PromptContainer>{props.assistant.companyName}- {props.assistant.aboutCompany}</PromptContainer>
                        </>
                    }
                    {(props.assistant.folders.length > 0) &&
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            <Label>Wyuczone foldery:</Label>
                            {props.assistant.folders.map((folder: { _id: Key | null | undefined; title: any; }) => {
                                    return (
                                    <Folder key={folder._id} onClick={() => handleFolderClick(folder)}>
                                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        <FolderTitle style={{ color: "black" }}>
                                            <FolderIcon>
                                            <BsFillFolderFill style={{ height: "auto", width: "100%" }} />
                                            </FolderIcon>
                                            {folder.title}
                                        </FolderTitle>
                                        </div>
                                    </Folder>
                                    );
                                })
                            }
                        </div>
                    }
                    <BottomContainer>
                        <Id>Id: {props.assistant._id}</Id>
                        <DeleteAssistantBtn onClick={() => handleDeleteAssistant()}>
                            Usuń Asystenta
                        </DeleteAssistantBtn>
                    </BottomContainer>
                </Modal>
            </SlideBottom>

        </ModalBackground>
    )

}

export default AboutAssistant;

const Modal = styled.div`
    width: 37.5vw;
    border-radius: 25px;
    background: white;
    padding: 2.5rem 2.5rem 5.5rem 2.5rem;
    border: 2px solid #E9EAF5;
    box-shadow: 3px 3px 15px 3px rgba(15, 27, 40, 0.1);
    cursor: auto;
    @media (max-width: 1023px) {
        width: 95vw;
        padding: 1.2rem 1.2rem 1.5rem 1.2rem;
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        top: 1rem;
        right: 1rem;
        width: 1rem;
        height: 1rem;
    }
`

const AssistantHeader = styled.div`
    width: 100%;
    padding: 0rem 0 1rem 0;
    display: grid; 
    grid-template-columns: 0.4fr 1.6fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
`

const AssistantIcon = styled.div<{background: any}>`
    height: 4.5rem;
    width: 4.5rem;
    margin-bottom: 0.5rem;
    border-radius: 20px;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 1023px) {
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 15px;
    }
`

const AssistantName = styled.div`   
    font-size: 1.5rem;
    font-weight: 700;
    color: black;
    @media (max-width: 1023px) {
        font-size: 1.2rem;
    }
`

const AssistantRole = styled.div`
    font-size: 0.75rem;
    font-weight: 500;
    color: black;
    margin-left: 0.5rem;
    color: #A1A2AC;
`

const AssistantDescription = styled.div`
    color: black;
    font-weight: 500;
    width: 100%;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
    }
`

const Label = styled.div`
  display: block;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-weight: 500;
  display: flex;
  color: black;
  align-items: center;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const PromptContainer = styled.div`
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;
  border-radius: 14px;
  font-size: 1rem;
  background: #F3F7FA;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 1rem;
`

const FolderIcon = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.1rem;
    color: black;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease;
`

const Folder = styled.div`
    height: 3rem;
    position: relative;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 4px rgba(15, 27, 40, 0.23), -2px -2px 4px #FAFBFF;
    padding: 0.2rem 2rem 0.2rem 2rem;
    border: 2px solid #E5E8F0;
    border-radius: 15px;
    cursor: pointer;
    margin: 0rem 0.35rem 0.7rem 0.35rem;
    align-items: center;
    overflow: hidden;
    transition: all 0.4s ease;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const FolderTitle = styled.p`
    margin-left: 0rem;
    font-weight: 700;
    width: 100%;
    white-space: nowrap;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
`

const BottomContainer = styled.div`
    width: 32.5vw;
    position: absolute;
    padding: 1.2rem 0rem 2rem 0rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media (max-width: 1023px) {
        position: relative;
        width: 100%;
        padding: 0rem 0rem 0rem 0rem;
    }
`

const Id = styled.div`
    color: #A1A2AC;
    @media (max-width: 1023px) {
        font-size: 0.7rem;
    }
`

const DeleteAssistantBtn = styled.button`
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    border-radius: 15px;
    font-weight: 500;
    border: 2px solid red;
    color: black;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1);
        background: #EF4C4C;
        color: white;
    }
    @media (max-width: 1023px) {
        font-size: 0.75rem;
    }
`