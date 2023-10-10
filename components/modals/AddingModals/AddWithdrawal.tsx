import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import { useRouter } from "next/router";
import SlideBottom from "../../Animated/SlideBottom";
import { MdOutlineClose } from "react-icons/md";
import ModalBackground from "../common/ModalBackground";
import { showNotification } from "@mantine/notifications";

const AddWithdrawal = (props: {onClose: any}) => {

    const [loading, setLoading] = useState(false);
    const [ibanNumber, setIbanNumber] = useState("");
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const userId = localStorage.getItem("user_id")
        try {
            await api.post("/requestWithdrawal", {userId: userId, ibanNumber}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setIbanNumber('');
            showNotification({
                id: 'request',
                disallowClose: true,
                autoClose: 4000,
                title: "Request sent",
                message: 'We will wire the money as soon as possible.',
                color: 'green',
          
                styles: (theme: any) => ({
                  root: {
                    backgroundColor: "white",
                    border: "none",
                  },
                  title: { color: "black" },
                  description: { color: "black" },
                })
              })
              setLoading(false);
              setTimeout(() => {
                  props.onClose();
              }, 5000)
        } catch (e) {
            showNotification({
                id: 'invited',
                disallowClose: true,
                autoClose: 5000,
                title: "Something went wrong...",
                message: 'Unexpected error occured. Contact us hello@yepp.ai',
                color: 'red',
          
                styles: (theme: any) => ({
                  root: {
                    backgroundColor: "#F1F1F1",
                    border: "none",
          
                  },
          
                  title: { color: "black" },
                  description: { color: "black" },
                })
              })
              setLoading(false);
              console.log(e);
          }
    }
    return (
        <ModalBackground onClick={() => props.onClose()}>
            <SlideBottom>
            <Container onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={props.onClose}>
                <MdOutlineClose style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
                <div>
                <ModalTitle>Request withdrawal</ModalTitle>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                            <div className="w-full">
                                <Label>
                                   IBAN Number
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="LT72 6435 3245 7777 3425"
                                    value={ibanNumber}
                                    onChange={(e) => setIbanNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="blue"/>
                                </div>
                                :
                                <p>Request withdrawal</p>
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

export default AddWithdrawal;


const Container = styled.div`
    width: 40rem;
    padding: 1rem 3rem 3rem 3rem;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 1.5rem 5vh 1.5rem;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const Form = styled.form`
    margin-top: 4vh;
    width: 100%;
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
    width: 100%;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;

const Button = styled.button`
  display: block;
  width: 70%;
  height: 3rem;
  margin-top: 1.5rem;
  border: none;
  color: black;
  font-size: 2vh;
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
    margin-top: 3.5vh;
    width: 90%;
    }
`;

const RegisterText = styled.div`
  font-size: 0.8rem;
  display: flex;
  cursor: pointer;
  color: black;
  font-weight: 500;
`


const CheckboxContainer = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 0.1fr 1.9fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    margin: 1vh 0 1vh 0;
    align-items: center;
    margin-top: 1.5rem;
`

const CheckboxInput = styled.input`
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    
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
    margin-left: -1.5rem;
    padding-left: 1.5rem;
    border-bottom: 1px solid #E5E8F0;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.2rem;
        line-height: 1.2;
        width: calc(100% + 3rem);
        margin-top: 0;
        padding-left: 1rem;
    }
`
