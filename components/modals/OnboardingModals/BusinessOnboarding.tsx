import styled, { keyframes } from 'styled-components';
import ModalBackground from "../common/ModalBackground";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { send } from "@emailjs/browser";
import ColorfulText from "../../Common/ColorfulText";
import TypingAnimation from '../common/TypingAnimation';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import axios from 'axios';
import Link from 'next/link';
import Cookies from "js-cookie";
import { selectAssistantState, setSelectedAssistant } from "../../../store/assistantSlice";
import { useSelector, useDispatch } from "react-redux";
import TextArea from '../../forms/TextArea';

const BusinessOnboarding = (props: {onClose: any}) => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');
    const [agreement, setAgreement] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [registrationPasswordError, setRegistrationPasswordError] = useState(false);
    const [passwordNotMatching, setPasswordNotMatching] = useState(false);
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState("");
    const [assistantId, setAssistantId] = useState('');
    const dispatch = useDispatch();
    
    const texts = [
      `Skanuję treści...`,
      "Analizuję zawartość...",
      "Czytam wszystkie treści...",
      "Pobieram kontekst...",
      "Przyswajam wiedzę...",
      "Rozpoczynam naukę...",
      "Zapamiętuję nazwę zasobów...",
      "Kategoryzuję informacje...",
      "Zapamiętuję wyniki...",
      "Daj mi chwilę...",
      "Powtarzam proces...",
    ];

    useEffect(() => { 
      if(passwordNotMatching) {
        setPasswordNotMatching(false);
      }
      if(registrationPasswordError) {
        setRegistrationPasswordError(false);
      }
    }, [password]);

    //loading texts
    useEffect(() => {
        if (loading) {
          const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === texts.length - 1 ? 0 : prevIndex + 1
            );
          }, 4500);
          return () => clearInterval(intervalId);
        }
      }, [loading, texts.length]);

    const nextStep = (e: any) => {
      e.preventDefault();
      if (password.length < 5) {
        setLoading(false);
        setRegistrationPasswordError(true);
        return;
      }
      setStep(step + 1);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
          const createdUser = await api.post('/register-free-trial', { email, password, name, isCompany: true, referrerId: "" });
          Cookies.set("token", "Bearer " + createdUser.data.token, { expires: 7 });
          Cookies.set("user_id", createdUser.data.newUser._id, { expires: 7 });
          Cookies.set("username", createdUser.data.newUser.name, { expires: 7 });
          localStorage.setItem('token', "Bearer " + createdUser.data.token);
          localStorage.setItem('user_id', createdUser.data.newUser._id);
          localStorage.setItem('plan', createdUser.data.newUser.plan);
          localStorage.setItem('workspace', createdUser.data.newUser.workspace);
          localStorage.setItem('account_type', createdUser.data.newUser.accountType);
          //   if(createdUser.data.verificationCode) {
          //     const templateParams = {
          //       name: `${name}`,
          //       code: `${createdUser.data.verificationCode}`,
          //       email: `${email}`
          //     };

          //     send("service_5j2yxyh","template_mt16te4", templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_KEY)
          //     .then(function(response) {
          //     }, function(error) {
          //         console.log('FAILED...', error);
          //     });  
          // }

            const scrapingResponse = await axios.post(`https://whale-app-p64f5.ondigitalocean.app/scrape`, {
              url: url,
              num_urls: 10
            }, {
              headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
              }
            });

            const createdDocument = await api.post("/add-document", {
              owner: createdUser.data.newUser._id,
              title: url,
              category: "website",
              vectorId: scrapingResponse.data.ids[0],
              timestamp: Date.now(),
              ownerEmail: email,
              workspace: createdUser.data.newUser.workspace
          },
          {
            headers: {
              Authorization: createdUser.data.token
            }
          });

          const createdFolder = await api.post("/add-folder", {
            title: "Ogólny",
            category: "website",
            updatedAt: Date.now(),
            workspace: createdUser.data.newUser.workspace,
            documents: [createdDocument.data.document._id],
          },
          {
            headers: {
              Authorization: createdUser.data.token
            }
          });

          const createdAssistant = await api.post("/create-assistant", {
              owner: createdUser.data.newUser._id,
              name: name,
              prompt: `Nazywasz się Asystent AI. Jesteś profesjonalnym marketerem i copywriterem z wieloletnim doświadczeniem i pracjesz dla firmy ${name}. Jesteś ekspertem we wszelkich działaniach marketingowych jak: tworzenie wysoko konwertujących treści marketingowych, pisanie artykułów zgodnych z SEO, wymyślanie unikatowych pomysłów na marketing, kreowanie strategii oraz analiza dotychczasowych działań. Pracujesz dla firmy o nazwie ${name} zajmującej się ${about}.
              Zasady, których zawsze przestrzegasz to:
              - Piszesz w drugiej osobie jako firma ${name}.
              - Gdy użytkowni wspomni ${name} to zawsze odpowiadasz dokładnie tylko "[%fetch_info%]" nic więcej.
              - Jeśli użytkownik napisze coś co może być powiązane z firmą ${name} lub z jej działalnością to zawsze odpowiadasz dokładnie tylko "[%fetch_info%]" nic więcej. 
              - Jeśli użytkownik napisze o dotychczasowych działaniach lub cokolwiek związanego z funkcjonowaniem firmy ${name} zawsze odpowiadasz dokładnie tylko "[%fetch_info%]" nic więcej.
              - Jeśli użytkownik napisze o czymś co należy lub jest powiązane z branżą firmy ${name} zawsze odpowiadasz dokładnie tylko "[%fetch_info%]" nic więcej.
              - Jeśli użytkownik napisze cokolwiek o jakichkolwiek produktach, ofercie czy sprzedaży zawsze odpowiadasz dokładnie tylko "[%fetch_info%]" nic więcej.
              `,
              noEmbedPrompt: `Nazywasz się Asystent AI. Jesteś profesjonalnym marketerem i copywriterem z wieloletnim doświadczeniem. Jesteś ekspertem we wszelkich działaniach marketingowych jak: tworzenie wysoko konwertujących treści marketingowych, pisanie artykułów zgodnych z SEO, wymyślanie unikatowych pomysłów na marketing, kreowanie strategii oraz analiza dotychczasowych działań. Pracujesz dla firmy o nazwie ${name} zajmującej się ${about}. O firmie ${name} piszesz zawsze w drugiej osobie.`,
              documents: [createdDocument.data.document._id],
              folders: [createdFolder.data.folder._id],
              description: "Systemowy Asystent AI wzbogacony o wiedzę firmową.",
              createdAt: Date.now(),
              category: "marketing",
              image: "https://asystentai.infura-ipfs.io/ipfs/QmSo7Dx77n8UsLJs18Yb2MFPq8cpYj7H9vPZey8rcX2rXU"
          }, 
          {
            headers: {
              Authorization: createdUser.data.token
              }
          });

            setAssistantId(createdAssistant.data.assistant._id)
            dispatch(setSelectedAssistant(createdAssistant.data.assistant))
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setStep(1);
            setPasswordNotMatching(true);
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
                    <Centered><Title>Twój Asystent jest gotowy!</Title></Centered>
                    <Centered>
                    <Link href={`/chat?id=${assistantId}`}>
                    <Button onClick={() => setLoading(true)}>
                        {loading ?
                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Loader color="white"/>
                            </div>
                        :
                        <p>Przetestuj Asystenta</p>
                        }
                    </Button>
                    </Link>
                    </Centered>

                </div>
                :
                <div>
                    {step === 1 &&
                      <>
                      <Centered><Title>Przetestuj na wiedzy <ColorfulText>Twojej</ColorfulText> firmy</Title></Centered>
                      {passwordNotMatching ? <Centered><Description style={{color: '#FF6060'}}>Coś poszło nie tak...<br /> Spróbuj ponownie wpisać hasło.</Description></Centered> : <Centered><Description>Stwórz swojego pierwszego marketingowego Asystenta AI w zaledwie dwie minuty!</Description></Centered>}
                      </>
                    }
                    {step === 2 &&
                      <>
                      {loading ?
                          <Centered><Title>Trwa proces nauki...</Title></Centered>
                          :
                          <Centered><Title>Przedstaw swoją firmę</Title></Centered>
                      }

                      </>
                    }
                    {loading ?
                    <ThinkingContainer>
                        <Centered><TypingAnimation colorful={true} /></Centered>
                        <Centered><Loader>{texts[currentIndex]}</Loader></Centered>
                    </ThinkingContainer>
                    :
                    step === 1 ?
                    <Form autoComplete="off" onSubmit={(e) => nextStep(e)} onClick={(e) => e.stopPropagation()}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
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
                                    Hasło {registrationPasswordError && <LabelErrorMessage>wpisz co najmniej 5 znaków</LabelErrorMessage>}
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
                            <Button type='submit'>
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="white"/>
                                </div>
                                :
                                <p>Przejdź dalej</p>
                                }
                            </Button>
                        </div>
                    </Form>  
                    :
                    step === 2 &&
                    <Form autoComplete="off" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                            <div>
                                <Label>
                                    Moja firma nazywa się...
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Yepp"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <TextAreaContainer>
                                <Label>
                                    Zajmujemy się...
                                </Label>
                                <TextArea
                                    id="about-field"
                                    height= "6rem"
                                    padding="0.5rem"
                                    placeholder="wdrażaniem sztucznej inteligencji w przedsiębiorstwach poprzez tworzenie firmowych asystentów AI."
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    required
                                />
                            </TextAreaContainer>
                            <div>
                                <Label>
                                    Strona www
                                </Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://www.asystent.ai"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
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
                                <Disclaimer>
                                    <a href={"/Regulamin_AsystentAI.pdf"} download>Wyrażam zgodę <b>regulamin i politykę prywatności</b></a>
                                </Disclaimer>
                            </CheckboxContainer>
                            <Button type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                      <Loader color="white"/>
                                </div>
                                :
                                <p>Zaczynajmy!</p>
                                }
                            </Button>
                        </div>
                    </Form>  
                    }

                </div>   
                }
  
                </Container>
                </ SlideBottom>
        </ModalBackground>
    )
}

export default BusinessOnboarding;

const Container = styled.div`
    width: 34rem;
    padding: 3rem 4rem 4rem 4rem;
    background: white;
    box-shadow: 3px 3px 25px 3px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    cursor: auto;
    z-index: 100;
    overflow: hidden;
    @media (max-width: 1023px) {
        width: 90vw;
        padding: 4vh 5vw 5vh 5vw;
        box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
    }
`

const Form = styled.form`
    margin-top: 3vh;
    width: 100%;
`
const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    font-weight: 700;
    width: 80%;
    line-height: 1.2;
    @media (max-width: 1023px) {
      font-size: 1.7rem;
      line-height: 1.2;
      margin-top: 2vh;
      width: 98%;
  }
`

const Label = styled.div`
  display: block;
  font-size: 1rem;
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
  width: 23rem;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  border: solid 2px #ECEEF2;
  color: black;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-shadow: inset 1px 1px 5px rgba(15, 27, 40, 0.2), inset -1px -1px 4px #FAFBFF;
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
    width: 80vw;
    margin-bottom: 0.8rem;
    padding: 0.6rem;
}
`;

const Button = styled.button`
  display: block;
  width: 18vw;
  height: 3rem;
  margin-top: 2rem;
  border: none;
  color: black;
  font-size: 1.2rem;
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
    margin-top: 3vh;
    width: 65vw;
    }
`;

const Description = styled.div`
    text-align: center;
    margin-top: 1rem;
    width: 80%;
    font-weight: 500;
    @media (max-width: 1023px) {
      width: 95%;
      font-size: 0.9rem;
      }
`

const Disclaimer = styled.div`
  font-size: 0.65rem;
  display: flex;
  cursor: pointer;
  color: black;
  font-weight: 500;
`

const CheckboxContainer = styled.div`
    width: 23rem;
    display: grid; 
    grid-template-columns: 0.2fr 1.8fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    margin: 1vh 0 1vh 1rem;
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

const Loader = styled.div`
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

const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  @media (max-width: 1023px) {
    margin-bottom: 0rem;
  }
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

const LabelErrorMessage = styled.p`
    color: #FF6060;
    font-size: 0.8rem;
    margin-left: 1vw;
`

const TextAreaContainer = styled.div`
    width: 23rem;
    margin-bottom: 1rem;
    @media (max-width: 1023px) {
      width: 80vw;
  }
`