import styled from "styled-components";
import SlideBottom from "@/components/Animated/SlideBottom";
import { BsGlobe2, BsFonts, BsXLg, BsPlusLg, BsDash } from "react-icons/bs";
import Label from "@/components/Common/Label";
import { useRouter } from "next/router";
import { useState } from "react";
import Centered from "@/components/Centered";
import api from "@/pages/api";

const AddCompetition = (props: {onClose: any}) => {

    const router = useRouter();

    const [maximumError, setMaximumError] = useState(false);
    const [competitors, setCompetitors] = useState<any[]>([
        { name: '', url: '' }, 
        { name: '', url: '' },
      ]);
    const [inputErrors, setInputErrors] = useState<{ nameError: boolean; urlError: boolean }[]>([]);



      const handleInputChange = (index: number, key: string, value: string) => {
        const newCompetitors = [...competitors];
        newCompetitors[index][key] = value;
        setCompetitors(newCompetitors);

        const newInputErrors = [...inputErrors];
        const updatedError = { ...newInputErrors[index] };
      
        if (key === 'name') {
          updatedError.nameError = false;
        } else if (key === 'url') {
          updatedError.urlError = false;
        }
      
        newInputErrors[index] = updatedError;
        setInputErrors(newInputErrors);
      };
    
      const addMoreCompetitors = () => {
        if (competitors.length >= 7) {
            setMaximumError(true);
            return;
        }
        setCompetitors([...competitors, { name: '', url: '' }]);
      };

      const deleteCompetitor = (index: number) => {
        const newCompetitors = [...competitors];
        setMaximumError(false);
        newCompetitors.splice(index, 1);
        setCompetitors(newCompetitors);
    };
    

    const createResearch = async () => {
        const newInputErrors = competitors.map(competitor => ({
            nameError: competitor.name === '',
            urlError: competitor.url === ''
          }));
        
          if (newInputErrors.some(error => error.nameError || error.urlError)) {
            setInputErrors(newInputErrors);
            return;
          }

        const token = localStorage.getItem("token");
        const profileId = localStorage.getItem("profile_id");
        const competitorsArray = competitors.map((competitor) => {
            return {
                name: competitor.name,
                url: competitor.url
            }
        })
        try {
            const response = await api.post("/create-competition-research", {
                companies: competitorsArray,
                profile: profileId
            
            }, {
                headers: {
                    authorization: token
                }
            })
            router.push(`/competition/${response.data._id}`)
        } catch (e) {
            console.log(e);
        }
    }

    
    return (
        <ModalBackground onClick={props.onClose}>
            <SlideBottom>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>Define your competition</Title>
                <CloseIcon onClick={props.onClose}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {competitors.map((competitor, index) => (
                <CompetitorContainer key={index}>
                <MinusBtn onClick={() => deleteCompetitor(index)}><BsDash className="w-[1rem]" /></MinusBtn>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsFonts />
                    </LabelIcon>
                    <Label>Company name</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="My Competitor"
                        value={competitor.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        style={{ borderColor: inputErrors[index]?.nameError ? '#FF5757' : '' }}
                    />
                </div>
                <div className="w-full">
                    <div className="flex mb-1">
                    <LabelIcon>
                        <BsGlobe2 />
                    </LabelIcon>
                    <Label>Website url</Label>
                    </div>
                    <Input
                        type="text"
                        placeholder="https://www..."
                        value={competitor.url}
                        onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                        style={{ borderColor: inputErrors[index]?.urlError ? '#FF5757' : '' }}
                    />
                 </div>
                </CompetitorContainer>
                ))}
                {(competitors && competitors.length < 7) &&<Centered><AddBtn onClick={addMoreCompetitors}><BsPlusLg className="w-8 h-8" /></AddBtn></Centered>}
                {maximumError && <Centered><p className="text-gray-700 mt-4">You can add up to 7 competitors.</p></Centered>}
                <Centered><BlueBtn onClick={() => createResearch()}>Continue</BlueBtn></Centered>
            </Modal>
            </SlideBottom>
        </ModalBackground>
    )
}


export default AddCompetition;

const ModalBackground = styled.div`
width: 100%;
height: 100%;
position: fixed;
flex-wrap: wrap;
backdrop-filter: blur(7px);
z-index: 100;
padding-top: 4rem;
padding-bottom: 8rem;
top: 0;
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

const Modal = styled.div`
    width: 36.5rem;
    padding: 1.5rem 0rem 3rem 0rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 95vw;
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

const Title = styled.h1`
  margin-bottom: 2.2rem;
  font-size: 1.2rem;
  width: calc(100% + 8rem);
  margin-left: -2rem;
  padding-left: 4rem;
  display: flex;
  align-items: center;
  border-bottom: 4px solid #f8f8f8;
  padding-bottom: 1rem;
  color: black;
  font-weight: 700;
  @media (max-width: 1023px) {
      font-size: 1rem;
      line-height: 1.2;
      width: 95vw;
      margin-top: 0vh;
      margin-left: -2rem;
  }
`

const MinusBtn = styled.button`
    position: absolute;
    left: 0.5rem;
    top: 2.5rem;
    display: none;
    cursor: pointer;
    background: transparent;
`

const CompetitorContainer = styled.div`
    display: flex; 
    flex-direction: row;
    position: relative;
    margin-bottom: 0.5rem;
    padding: 0 2rem 0 2rem;
    gap: 0.75rem;
    &:hover ${MinusBtn} {
        display: block;
      }
`

const LabelIcon = styled.div`
width: 1rem;
height: 1rem;
margin-right: 0.4rem;
margin-left: 0.25rem;
margin-top: 0.1rem;
color: black;
`

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 15px;
  background: transparent;
  border: solid 2px #F6F6FB;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 1px 1px 10px rgba(22, 27, 29, 0.14);
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


const AddBtn = styled.button`
    border-radius: 50%;
    border: dashed 2px #DCDCDC;
    background: transparent;
    margin-top: 1rem;
    height: 3.5rem;
    width: 3.5rem;
    color: #DCDCDC;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        transform: scale(0.95);
        border: dashed 2px black;
        background-origin: border-box;
        background-clip: padding-box, border-box;
        color: black;
    }
`

const BlueBtn = styled.div`
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    margin-top: 3.5rem;
    width: 65%;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    white-space: nowrap;
    color: white;
    font-weight: 500;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -0.5rem;
    align-items: center;
    transition: all 0.4s ease;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0rem;
      padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    }
`