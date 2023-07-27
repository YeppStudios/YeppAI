import styled from "styled-components";
import ModalBackground from "../common/ModalBackground";
import ModalTitle from "../common/ModalTitle";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { Loader } from "../../Common/Loaders";
import { useRouter } from "next/router";
import SlideBottom from "../../Animated/SlideBottom";
import Centered from "../../Centered";
import { send } from "@emailjs/browser";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../../store/userSlice";
import ColorfulText from "@/components/Common/ColorfulText";
import { AxiosResponse } from "axios";
import Plans from "@/components/Landing/Plans";
import UpgradeSubscription from "../InformationalModals/UpgradeSubscription";

const LoginModal = (props: {onClose: any, registration: boolean}) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registration, setRegistration] = useState(props.registration);
    const [resetPassword, setResetPassword] = useState(false);
    const [registrationPasswordError, setRegistrationPasswordError] = useState(false);
    const [openVerification, setOpenVerification] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [agreementError, setAgreementError] = useState(false);
    const [code, setCode] = useState("");
    const [workspace, setWorkspace] = useState("");
    const [codeError, setCodeError] = useState(false);
    const [resetError, setResetError] = useState(false);
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const [openPlans, setOpenPlans] = useState(false);

    const dispatch = useDispatch();
    const { invitedEmail, trial, priceId, planName, planId, billingPeriod } = router.query;

    useEffect(() => {
        const { registration, workspace, company, invitedEmail } = router.query;
        if (registration) {
          setRegistration(true);
        }
        if (company === "true") {
            setIsCompany(true);
        }
        if (workspace) {
            setWorkspace(workspace as string);
        }
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, [router.query])

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

    const sendResetLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResetError(false);
        try {
            const { data } = await api.post('/password-reset', { email });
            const msg = {
                to: `${email}`,
                nickname: "Yepp AI",
                from: {
                  email: "hello@yepp.ai",
                  name: "Yepp AI"
                },
                templateId: 'd-fe65c7fe87f14c358079b6e48d97ff36',
                dynamicTemplateData: {
                name: `${data.name}`,
                link: `${data.link}`
                },
            };
            const response = await api.post('/send-email', { msg });
            setLoading(false);
        } catch (e) {
            setResetError(true);
            console.log(e);
        }

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        let successUrl = `https://www.yepp.ai/assets?success`;
        let invoiceTitle = `Yepp.ai - ${planName} monthly subscription`;
        if (Number(billingPeriod) > 1) {
            invoiceTitle = `Yepp.ai - ${billingPeriod} months of ${planName} subscription`;
        }

        try {
            let response: AxiosResponse<any, any>;
            if (registration) {
                if (password.length < 5) {
                    setLoading(false);
                    setRegistrationPasswordError(true);
                    return;
                  }
                let referrerId;
                const { ref } = router.query;
                if (ref) {
                    referrerId = ref;
                }
                if (workspace) {
                    response = await api.post('/register-to-workspace', { email: invitedEmail, password, name, workspaceId: workspace });
                    Cookies.set("token", "Bearer " + response.data.token, { expires: 7 });
                    Cookies.set("user_id", response.data.newUser._id, { expires: 7 });
                    Cookies.set("username", response.data.newUser.name, { expires: 7 });
                    Cookies.set("workspace", response.data.newUser.workspace, { expires: 7 });
                    localStorage.setItem('onboarding_step', "1");
                    dispatch(setSelectedUser(response.data.newUser));
                    localStorage.setItem('token', "Bearer " + response.data.token);
                    localStorage.setItem('user_id', response.data.newUser._id);
                    localStorage.setItem('plan', response.data.newUser.plan);
                    localStorage.setItem('workspace', response.data.newUser.workspace);
                    localStorage.setItem('account_type', response.data.newUser.accountType);
                    setLoading(false);
                    props.onClose();
                } else {
                    response = await api.post('/register-free-trial', { email, password, name, isCompany, referrerId, blockAccess: true }); //set to true to require credit card
                    if (priceId) {
                        let res = await api.post(`/create-checkout-session`, 
                        {
                            priceId: priceId,
                            mode: "subscription",
                            successURL: successUrl,
                            cancelURL: `${window.location.origin}${router.asPath}`,
                            planId: "64ad0d250e40385f299bceea",
                            email,
                            months: billingPeriod,
                            global: true
                        });
                        const { url } = await res.data;
                        window.location.href = url;
                    } else if (trial) {
                        setOpenPlans(true);
                    } else {
                    if (planId) {
                        if (localStorage.getItem("country") === "Poland" && Number(billingPeriod) > 1) {
                            let res = await api.post(`/create-checkout-session`, 
                            {
                                priceId,
                                mode: "payment",
                                successURL: successUrl,
                                cancelURL: `${window.location.origin}${router.asPath}`,
                                planId: planId,
                                email,
                                months: Number(billingPeriod),
                                global: true
                            });
                            const { url } = await res.data;
                            window.location.href = url;
                        } else {
                            let res = await api.post(`/create-checkout-session`, 
                            {
                                priceId,
                                mode: "subscription",
                                successURL: successUrl,
                                cancelURL: `${window.location.origin}${router.asPath}`,
                                planId: planId,
                                email,
                                months: Number(billingPeriod),
                                global: true
                            });
                            const { url } = await res.data;
                            window.location.href = url;
                        }
                    }
                    }
                    setLoading(false);
                    Cookies.set("token", "Bearer " + response.data.token, { expires: 7 });
                    Cookies.set("user_id", response.data.newUser._id, { expires: 7 });
                    Cookies.set("username", response.data.newUser.name, { expires: 7 });
                    Cookies.set("workspace", response.data.newUser.workspace, { expires: 7 });
                    dispatch(setSelectedUser(response.data.newUser));
                    localStorage.setItem('token', "Bearer " + response.data.token);
                    localStorage.setItem('user_id', response.data.newUser._id);
                    localStorage.setItem('plan', response.data.newUser.plan);
                    localStorage.setItem('workspace', response.data.newUser.workspace);
                    localStorage.setItem('account_type', response.data.newUser.accountType);
                    localStorage.setItem('onboarding_step', "1");
                }
            } else {
                response = await api.post('/login', { email, password });
                Cookies.set("token", "Bearer " + response.data.token, { expires: 7 });
                Cookies.set("user_id", response.data.user._id, { expires: 7 });
                Cookies.set("username", response.data.user.name, { expires: 7 });
                Cookies.set("workspace", response.data.user.workspace, { expires: 7 });
                dispatch(setSelectedUser(response.data.user));
                localStorage.setItem('token', "Bearer " + response.data.token);
                localStorage.setItem('user_id', response.data.user._id);
                localStorage.setItem('plan', response.data.user.plan);
                localStorage.setItem('workspace', response.data.user.workspace);
                localStorage.setItem('account_type', response.data.user.accountType);
                if (planId) {
                    if (localStorage.getItem("country") === "Poland" && Number(billingPeriod) > 1) {
                        let res = await api.post(`/create-checkout-session`, 
                        {
                            priceId,
                            mode: "payment",
                            successURL: successUrl,
                            cancelURL: `${window.location.origin}${router.asPath}`,
                            planId: planId,
                            email,
                            months: Number(billingPeriod),
                        });
                        const { url } = await res.data;
                        window.location.href = url;
                    } else {
                        let res = await api.post(`/create-checkout-session`, 
                        {
                            priceId,
                            mode: "subscription",
                            successURL: successUrl,
                            cancelURL: `${window.location.origin}${router.asPath}`,
                            planId: planId,
                            email,
                            months: Number(billingPeriod),
                            global: true
                        });
                        const { url } = await res.data;
                        window.location.href = url;
                    }
                } else {
                    props.onClose();
                }
                setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            setLoginError(true);
            console.error(error);
        }
    };

    return (
        <ModalBackground closeable={false}>
            {openPlans && <Centered><UpgradeSubscription purchase={false} landing={false} onClose={() => console.log("")} closeable={false} /></Centered>}
            <SlideBottom>
            <LoginContainer>
                {registration ?
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
                            {!invitedEmail &&
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
                            }
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
                            <DisclaimersContainer>
                                <div></div>
                                {!workspace &&
                                    <RegisterText>Already have an account? <RegisterLink onClick={() => setRegistration(false)}>Log in</RegisterLink></RegisterText>
                                }
                               
                            </DisclaimersContainer>
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

                            {trial ?
                            <Button id="send-email-btn" type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="white"/>
                                </div>
                                :
                                <p>Start free trial</p>
                                }
                            </Button>
                            :
                            <div className="w-full">
                            {planName ?
                            <Centered>
                            <Button id="send-email-btn" type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="white"/>
                                </div>
                                :
                                <p>Continue</p>
                                }
                            </Button>
                            </Centered>
                            :
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
                            }
                            </div>
                            }

                        </div>
                    </Form>  
                </div>     
                :
                // <SlideBottom>
                // <div>
                //     <MailIcon><BsEnvelopeCheck style={{height: "100%", width: "auto"}}/></MailIcon>
                //     <ModalTitle>Sprawdź maila</ModalTitle>
                //     <Text>Pod <b>{email}</b> powinien czekać na Ciebie kod dostępu. Wpisz go poniżej:</Text>
                //     <Form autoComplete="off" onSubmit={verifyCode} onClick={(e) => e.stopPropagation()}>
                //         <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                //             {codeError &&
                //             <Centered>
                //                 <LoginErrorMessage>Niepoprawny kod</LoginErrorMessage>
                //             </Centered>
                //             }
                //             <div>
                //                 <Input
                //                     id="code"
                //                     type="code"
                //                     placeholder="123456"
                //                     value={code}
                //                     onChange={(e) => setCode(e.target.value)}
                //                     required
                //                 />
                //             </div>
                //             <Button id="register-btn" type="submit">
                //                 {loading ?
                //                 <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                //                     <Loader color="white" />
                //                 </div>
                //                 :
                //                 <p>Zaczynajmy!</p>
                //                 }
                //             </Button>
                //         </div>
                //     </Form>  
                // </div>  
                // </SlideBottom>
                // :
                !resetPassword ?
                <div>
                    <ModalTitle>Log in</ModalTitle>
                    <Form autoComplete="off" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                        <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                            {loginError &&
                            <Centered>
                                <LoginErrorMessage>Incorrect email or password</LoginErrorMessage>
                            </Centered>
                            }
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
                                    Password
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
                            <DisclaimersContainer>
                                {mobile ?
                                 <RegisterText><RegisterLink onClick={() => setRegistration(true)}>Register</RegisterLink></RegisterText>
                                 :
                                 <RegisterText>No account?<RegisterLink onClick={() => setRegistration(true)}>Register</RegisterLink></RegisterText>
                                }
                                <ResetPassword onClick={() => setResetPassword(true)}>Reset password</ResetPassword>
                            </DisclaimersContainer>
                            <Button id="login-btn" type="submit">
                                {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="white" />
                                </div>
                                :
                                <p>Log in</p>
                                }
                            </Button>
                        </div>
                    </Form>  
                </div>   
                :
                <div>
                <ModalTitle>Reset password</ModalTitle>
                <Form autoComplete="off" onSubmit={sendResetLink} onClick={(e) => e.stopPropagation()}>
                    <div style={{display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
                        {resetError &&
                        <Centered>
                            <LoginErrorMessage>Incorrect email</LoginErrorMessage>
                        </Centered>
                        }
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
                            />
                        </div>
                        <DisclaimersContainer>
                                {mobile ?
                                 <RegisterText><RegisterLink onClick={() => setRegistration(true)}>Register</RegisterLink></RegisterText>
                                 :
                                 <RegisterText>No account?<RegisterLink onClick={() => setRegistration(true)}>Register</RegisterLink></RegisterText>
                                }
                            <ResetPassword onClick={() => setResetPassword(false)}>Log in</ResetPassword>
                        </DisclaimersContainer>
                        <Button type="submit">
                            {loading ?
                            <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Loader color="white" />
                            </div>
                            :
                            <p>Send an email</p>
                            }
                        </Button>
                    </div>
                </Form>  
            </div>   
                }
            </LoginContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default LoginModal;

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

const DisclaimersContainer = styled.div`
  width: 22rem;
  margin-bottom: 1.5vh;
  display: flex;
  color: black;
  font-weight: 500;
  justify-content: space-between;
  @media (max-width: 1023px) {
      width: 100%;
    }
`

const RegisterText = styled.div`
  font-size: 0.8rem;
  display: flex;
  cursor: pointer;
  color: black;
  font-weight: 500;
  @media (max-width: 1023px) {
    font-size: 0.7rem;
}
`

const RegisterLink = styled.div`
  margin-left: 0.2rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  background: -webkit-linear-gradient(45deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ResetPassword = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  background: -webkit-linear-gradient(45deg, #6578F8, #64B5FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

const MailIcon = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    height: 3rem;
    margin-bottom: 1.2rem;
    color: black;
`

const Text = styled.p`
    text-align: center;
    margin-top: 1rem;
    color: black;
    font-weight: 500;
`