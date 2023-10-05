import styled from "styled-components"
import ModalBackground from "../common/ModalBackground"
import Image from "next/image";
import Centered from "@/components/Centered";
import chatbotIcon from "@/public/images/chatbot_visualization.png";
import { BsXLg } from "react-icons/bs";
import Input from "@/components/forms/Input";
import Label from "@/components/Common/Label";
import { useState } from "react";
import api from "@/pages/api";
import { Loader } from "lucide-react";
import tickIcon from "@/public/images/tickGreen.png";
import SlideBottom from "@/components/Animated/SlideBottom";

const ChatbotPopup = (props: {onClose: any}) => {

    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const msg = {
                to: "hello@yepp.ai",
                nickname: "Yepp AI Website",
                from: {
                  email: "hello@yepp.ai",
                  name: "Yepp AI Website"
                },
                templateId: 'd-797ff9e9e08c41f6a85437faf0af3a37',
                dynamicTemplateData: {
                website: `${website}`,
                email: `${email}`,
                },
            };
            await api.post('/send-email', { msg });
            setEmail('');
            setWebsite('');
            setLoading(false);
            setSuccess(true);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }
    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                        <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                {!success ?
                <>
                <div className="font-bold text-2xl lg:text-3xl w-full text-center">AI on your website?</div>
                <Centered><div className="font-medium w-11/12 lg:w-10/12 text-center hidden lg:block mt-4 lg:mt-4">We are excited to announce that from now on we are offering custom AI Assistants for your websites!</div></Centered>
                <form onSubmit={(e) => sendEmail(e)}>
                    <Centered>
                        <div className="mt-6 w-11/12 lg:w-3/4">
                            <Label>Your email</Label>
                            <div className="w-full"><Input onChange={(e) => setEmail(e.target.value)} value={email} height="2.8rem" padding="0.65rem" placeholder="your@mail.com" /></div>
                        </div>
                    </Centered>
                    <Centered>
                        <div className="mt-4 w-11/12 lg:w-3/4">
                            <Label>Website link</Label>
                            <div className="w-full"><Input onChange={(e) => setWebsite(e.target.value)} height="2.8rem" padding="0.65rem" placeholder="https://www.yourwebsite.com" /></div>
                        </div>
                    </Centered>
                    <Centered><BlueBtn type="submit" className="mt-6 lg:mt-8">{!loading ? <>Request more details</> : <Loader color="white"></Loader>}</BlueBtn></Centered>
                </form>
                <Centered><p className="mt-2 text-gray-400 text-xs lg:text-sm">we will email you more details</p></Centered>
                </>
                :
                <>
                <Centered><SlideBottom><div className="w-8 lg:h-10 h-8 lg:w-10"><Image src={tickIcon} alt="tick" className="w-full h-auto"/></div></SlideBottom></Centered>
                <SlideBottom><Centered><div className="font-medium w-10/12 lg:w-10/12 text-center mt-4 lg:mt-8">Thank you for interest, we will get back to you with details ASAP!</div></Centered></SlideBottom>
                </>
                }
                <div className="w-full lg:mt-2"><Centered><Image src={chatbotIcon} alt="chatbot" width={400} height={400} className="mt-6 lg:mt-8" /></Centered></div>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}


export default ChatbotPopup;

const ModalContainer = styled.div`
    width: 40vw;
    height: auto;
    position: relative;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    backdrop-filter: blur(25px);
    cursor: auto;
    color: black;
    font-weight: 500;
    overflow: hidden;
    padding: 6vh 3.5vw 0vh 3.5vw;
    @media (max-width: 1023px) {
        width: 90vw;

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

const BlueBtn = styled.button`
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    width: 65%;
    font-size: 0.85rem;
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
      width: 80%;
      padding: 0.5rem 1.25rem 0.5rem 1.25rem;
    }
`