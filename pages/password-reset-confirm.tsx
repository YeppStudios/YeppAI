import styled from "styled-components";
import ModalBackground from "@/components/Modals/common/ModalBackground";
import ModalTitle from "@/components/Modals/common/ModalTitle";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { Loader } from "../components/Common/Loaders";
import { useRouter } from "next/router";
import SlideBottom from "../components/Animated/SlideBottom";
import mesh from "../public/images/testimonialsBackground.png";
import Centered from "@/components/Centered";
import Loading from "@/components/Common/Loading";
import Head from "next/head";

interface Background {
    image: any,
  }
  

const PasswordReset = (props: {onClose: any, registration: boolean}) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetError, setResetError] = useState(false);
    const [mobile, setMobile] = useState(false);

    const router = useRouter();
    const {token, userId} = router.query;

    useEffect(() => {
        if(window.innerWidth <= 1023){
          setMobile(true);
        }

      }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setResetError(false);
        if(password !== confirmPassword){
            setLoading(false);
            setResetError(true);
            return;
        }
        try {
           await api.post('/reset-password-confirm', {userId, password, token});
            setLoading(false);
            router.push("/assets");
          } catch (error) {
            setLoading(false);
            setResetError(true);
            console.error(error);
        }
    };

    return (
        <Background image={mesh}>
        <Head>
          <title>Reset password</title>
          <meta name="description" content="Reset your password for Yepp AI." />
        </Head>
        <ModalBackground closeable={false}>
        <Loading />
            <SlideBottom>
            <LoginContainer>
                <div>
                <ModalTitle>Reset password</ModalTitle>
                <Form autoComplete="off" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                    <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                        {resetError &&
                        <Centered>
                           <LoginErrorMessage>Passowrds doesn&apos;t match</LoginErrorMessage>
                        </Centered>
                        }
                        <div>
                            <Label>
                                New password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label>
                                Repeat new password
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit">
                            {loading ?
                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Loader color="white" />
                            </div>
                            :
                            <p>Reset</p>
                            }
                        </Button>
                    </div>
                </Form>  
            </div>   

            </LoginContainer>
            </SlideBottom>
        </ModalBackground>
        </Background>
    )
}

export default PasswordReset;

const LoginContainer = styled.div`
width: 32rem;
padding: 3rem 4rem 4rem 4rem;
box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
border-radius: 25px;
background: white;
cursor: auto;
z-index: 100;
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
  color: black;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  display: flex;
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
  width: 70%;
  height: 3rem;
  margin-top: 1.5rem;
  border: none;
  background-color: #0D0E16;
  color: white;
  font-size: 2vh;
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


const LoginErrorMessage = styled.p`
    text-align: center;
    font-size: 1rem;
    color: white;
    margin-bottom: 2vh;
    margin-top: -1vh;
    color: #FF6060;
`
const Background = styled.div<Background>`
    width: 100vw;
    height: 100vh;
    &:before {
        content: "";
        position: absolute;
        width: 100vw;
        height: 120vh;
        margin-top: -20vh;
        z-index: 0;
        background-image: url(${props => props.image.src});
        background-size: cover;
        background-position: center;
    }
`