import styled from "styled-components";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import { useRouter } from "next/router";
import SlideBottom from "../../Animated/SlideBottom";
import { showNotification } from "@mantine/notifications";
import { MdOutlineClose } from "react-icons/md";
import TextArea from "@/components/forms/TextArea";
import ModalBackground from "../common/ModalBackground";
import tickIcon from "../../../public/images/tickGreen.png"
import Image from "next/image";
import Centered from "@/components/Centered";

const Partner = (props: {onClose: any}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [sending, setSending] = useState(false);
    const [address, setAddress] = useState("");
    const [fullName, setFullName] = useState('');
    const [city, setCity] = useState("");
    const [message, setMessage] = useState("");
    const [country, setCountry] = useState("");
    const [mobile, setMobile] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if  (window.innerWidth <= 1023) {
            setMobile(true);
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSending(true);
          try {
            const msg = {
              to: "milosz@yepp.ai",
              nickname: "Yepp AI",
              from: {
                email: "hello@yepp.ai",
                name: "Yepp AI"
              },
              templateId: 'd-8d6c7f9f54e24f42bb0835f77656faa1',
              dynamicTemplateData: {
              fullName: `${fullName}`,
              email: `${email}`,
              },
          };
          await api.post('/send-email', { msg });
          setCompanyName('');
          setSending(false);
          setAddress("");
          setFullName('');
          setCity("");
          setMessage("");
          setCountry("");
          showNotification({
              id: 'invited',
              disallowClose: true,
              autoClose: 4000,
              title: "Request sent",
              message: 'We will reply as soon as possible.',
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
            setSending(false);
            setSuccess(true);
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
            setSending(false);
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
                {!success ? 
                <div>
                <ModalTitle>Become a partner</ModalTitle>
                    <Form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                        <div className="w-full lg:w-[100%]">
                                <Label>
                                    Full name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                </div>

                                <div className="w-full lg:w-[100%]">
                                <Label>
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="company@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                </div>
                            <Button type="submit">
                                {sending ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="blue"/>
                                </div>
                                :
                                <p>Request partnership</p>
                                }
                            </Button>
                        </div>
                    </Form>  
                </div> 
                :
                <div>
                    <Centered><Image src={tickIcon} alt="success" className="w-auto h-6 mt-4 lg:mt-10" /></Centered>
                    <h2 className="mt-6 text-lg font-medium text-center px-8">We recieved your request and will get back to you ASAP!</h2>
                </div>
                }    
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default Partner;

const Container = styled.div`
    width: 30rem;
    padding: 1rem 3rem 3rem 3rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
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
  margin-top: 2.5rem;
  border: none;
  color: black;
  font-size: 1rem;
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
    width: 30rem;
    margin-left: -3rem;
    padding-left: 1.5rem;
    border-bottom: 1px solid #E5E8F0;
    padding-bottom: 1rem;
    color: black;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.2rem;
        line-height: 1.2;
        margin-left: -1.5rem;
        width: calc(100% + 3rem);
        margin-top: 0;
        padding-left: 1rem;
    }
`
