import styled from "styled-components";
import ModalBackground from "../common/ModalBackground";
import ModalTitle from "../common/ModalTitle";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import { useRouter } from "next/router";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { AxiosResponse } from "axios";
import UpgradeSubscription from "../InformationalModals/UpgradeSubscription";

const RegisterModal = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationPasswordError, setRegistrationPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [agreementError, setAgreementError] = useState(false);
    const router = useRouter();
    const [openPlans, setOpenPlans] = useState(false);


    useEffect(() => {
        if (password.length > 5) {
            setRegistrationPasswordError(false);
        }
    }, [password, agreement]);

    useEffect(() => {
        if(agreement){
            setAgreementError(false)
        }
    }, [agreement]);

    useEffect(() => {
        setLoginError(false);
    }, [password, email]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            let response: AxiosResponse<any, any>;
            if (password.length < 5) {
                setLoading(false);
                setRegistrationPasswordError(true);
                return;
            }
            response = await api.post('/register', { email, password, name });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user_id", response.data.user._id.toString());
            router.push("/assets?success=true")
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setLoginError(true);
            console.error(error);
        }
    };

    return (
        <ModalBackground closeable={false}>
            {openPlans && <Centered><UpgradeSubscription purchase={false} onClose={() => console.log("")} closeable={false} landing={false} /></Centered>}
            <SlideBottom>
            <LoginContainer>
            <div>
                    <ModalTitle>Register</ModalTitle>
                    <Form autoComplete="off" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    {loginError &&
                        <Centered>
                            <LoginErrorMessage>User already exists</LoginErrorMessage>
                        </Centered>
                    }
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                            <div>
                                <Label>
                                    Your first name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Filip"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />                   
                            </div>
                            <div>
                                <Label>
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <Label>
                                    Password {registrationPasswordError && <LabelErrorMessage>at least 5 characters</LabelErrorMessage>}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <CheckboxContainer>
                                <CheckboxInput
                                    id="rules"
                                    type="checkbox"
                                    checked={agreement}
                                    onChange={() => setAgreement(!agreement)}
                                    required
                                />
                                <RegisterText>
                                    <a href={"/Yepp_AI_Terms.pdf"} download>I agree with <b>terms of use & privacy policy</b></a>
                                </RegisterText>
                            </CheckboxContainer>
                            <div className="w-full">
                            <Centered>
                            <Button id="send-email-btn" type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="white"/>
                                </div>
                                :
                                <p>Register</p>
                                }
                            </Button>
                            </Centered>
                            </div>
                        </div>
                    </Form>
                </div>    
            </LoginContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default RegisterModal;

const LoginContainer = styled.div`
    width: 32rem;
    padding: 3rem 4rem 4rem 4rem;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    background: white;
    margin-bottom: 1.5rem;
    cursor: auto;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 10vw 5vh 10vw;
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
  width: 22rem;
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
    width: 72vw;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;

const Button = styled.button`
  display: block;
  width: 20rem;
  height: 3rem;
  margin-top: 1.5rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.4s ease;
  cursor: pointer;
  border: solid 3px transparent;
  border-radius: 25px;
  box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  align-items: center;
  background: linear-gradient(40deg, #6578F8, #64B5FF);
  background-size: 120%;
  background-position-x: -1rem;
  &:hover {
    transform: scale(0.95);
    box-shadow: none;
    translateX: 10px;
    box-shadow: 0 2px 2px 1px rgb(0, 0, 0, 0.1);
}
  box-shadow: 0 4px 20px rgb(0, 0, 0, 0.2);
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
  display: flex;
  align-items: center;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 0.7rem;
}
`

const LabelErrorMessage = styled.p`
    color: #FF6060;
    font-size: 0.8rem;
    margin-left: 1vw;
`

const LoginErrorMessage = styled.p`
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-bottom: 2vh;
    margin-top: -1vh;
    color: #FF6060;
`

const CheckboxContainer = styled.div`
    width: 22rem;
    display: grid; 
    grid-template-columns: 0.2fr 1.8fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    margin: 1vh 0 1vh 0;
    align-items: center;
    @media (max-width: 1023px) {
        margin-top: 2vh;
        width: 100%;
    }
`

const CheckboxInput = styled.input`
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    
`