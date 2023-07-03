import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { BsCheckLg, BsClockFill, BsXLg } from 'react-icons/bs';
import Link from 'next/link';
import { Loader } from '../../Common/Loaders';
import { useRouter } from 'next/router';

const BusinessOnboarding = (props: {onClose: any}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mobile, setMobile] = useState(false);

    const router = useRouter();
    const pathname = router.pathname;

    useEffect(() => {
        if(window.innerWidth <= 1023){
          setMobile(true);
        }
      }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/add-business-reservation", {
                company: name,
                email,
                phone: phone,
            });
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <ModalBackground closeable={false}>
            <SlideBottom>
            <Container>
            <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
            </CloseIcon>
            {success ?
                <div>
                    <Centered><SuccessIcon className='text-green-400'><BsCheckLg style={{width: "100%", height: "100%"}} /></SuccessIcon></Centered>
                    <Title>Dołączyłeś do listy</Title>
                    <Centered><Description>Dziękujemy, już niebawem postaramy odezwać się ze szczegółami naszej oferty.</Description></Centered>
                    <Centered>
                    {pathname === "/" ?
                        <Button onClick={() => router.reload()}>
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="black"/>
                                </div>
                            :
                            <p>Strona Główna</p>
                            }
                        </Button>
                        :
                        <Button onClick={() => router.push("/")}>
                        {loading ?
                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Loader color="black"/>
                            </div>
                        :
                        <p>Strona Główna</p>
                        }
                    </Button>
                    }

                    </Centered>

                </div>
                :
                <div>
                    <Title>Dołącz do listy</Title>
                    {!mobile &&
                        <Centered><Description>Zapisz się do 31 maja, a my postaramy się do Ciebie odezwać, przedstawić ofertę i doprecyzować szczegóły.</Description></Centered>
                    }
                    <Form autoComplete="off" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                            <div>
                                <Label>
                                    Nazwa firmy
                                </Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Yepp"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <Label>
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="firma@domena.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <Label>
                                    Nr. telefonu (opcjonalne)
                                </Label>
                                <Input
                                    id="phone"
                                    type="phone"
                                    placeholder="777 222 123"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                    <a href={"/Regulamin_AsystentAI.pdf"} download>Wyrażam zgodę <b>regulamin i politykę prywatności</b></a>
                                </RegisterText>
                            </CheckboxContainer>
                            <Button type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="black"/>
                                </div>
                                :
                                <div id="business-signup" style={{display: "flex", justifyContent: "center", alignItems: "center"}}><BtnIcon><BsClockFill style={{width: "100%", height: "auto"}}/></BtnIcon><p>Dołącz do oczekujących</p></div>
                                }
                            </Button>
                            <Disclaimer>Miejsca są ograniczone i zapis nie gwarantuje obsługi w pierwszej transzy.</Disclaimer>
                        </div>
                    </Form>  
                </div>   
                }
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default BusinessOnboarding;

const Container = styled.div`
    width: 32rem;
    padding: 3rem 3.5rem 4rem 3.5rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 10vw 5vh 10vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const Form = styled.form`
    margin-top: 3vh;
    width: 100%;
`
const Title = styled.h1`
    font-size: 2.2rem;
    text-align: center;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.75rem;
      }
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
  width: 20vw;
  height: 3rem;
  margin-top: 2rem;
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
    width: 72vw;
    }
`;

const Description = styled.div`
    text-align: center;
    margin-top: 1rem;
    width: 100%;
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
        }
`

const RegisterText = styled.div`
  font-size: 0.75rem;
  display: flex;
  cursor: pointer;
  color: black;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 0.65rem;
    }
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
`

const CheckboxInput = styled.input`
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    
`

const ThinkingContainer = styled.div`
    margin-top: 3rem;
`;


const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`


const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1rem;
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

const Disclaimer = styled.div`
    color: black;
    text-align: center;
    width: 70%;
    font-size: 0.75em;
    margin-top: 0.75rem;
    @media (max-width: 1023px) {
        justify-content: center;
        width: 100%;
    }
`

const BtnIcon = styled.div`
    width: auto;
    margin-right: 0.75rem;
    width: 1.2rem;
    height: 1.2rem;

`