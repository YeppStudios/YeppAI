import Label from "@/components/Common/Label";
import Input from "@/components/forms/Input";
import { useEffect, useState } from "react";
import api from "./api";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import { useRouter } from "next/router";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";
import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";

interface User {
    _id: string,
    name: string,
    email: string,
    lastSeen: string,
    tokenBalance: number,
}

const Admin = () => {

    const [email, setEmail] = useState("");
    const [registrationEmail, setRegistrationEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [user, setUser] = useState<User>();
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationPasswordError, setRegistrationPasswordError] = useState(false);
    const [agencyPlan, setAgencyPlan] = useState(true);
    const [loading, setLoading] = useState(false);
    const [monthlyElixir, setMonthlyElixir] = useState("");

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        router.reload();
    }

    const login = () => {
        setLoggedIn(true);
        router.reload();
    }


    const register = async (e: any) => {
      e.preventDefault();
      if (password.length < 5) {
        setRegistrationPasswordError(true);
        return;
      }
      try {
        await api.post('/register-free-trial', { email: registrationEmail, password, name, isCompany: true, referrerId: "", blockAccess: false });
        showNotification({
          id: 'subscribed',
          disallowClose: true,
          autoClose: 5000,
          title: "User registered!",
          message: `${registrationEmail} has been registered!`,
          color: "green",
    
          styles: (theme: any) => ({
            root: {
              backgroundColor: "white",
              border: "none",
            },
    
            title: { color: "black" },
            description: { color: "black" },
          })
        })
      } catch (e) {
        console.log(e);
      }

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const validateJWT = async () => {
          try {
            const { data } = await api.get('/checkJWT', {
              headers: {
                authorization: token
              }
            })
            setLoggedIn(data.valid);
          } catch (e) {
            setLoggedIn(false);
          }
        }

          const fetchUserInfo = async () => {
            try { 
              const {data} = await api.get(`/users/${userId}`, {
                headers: {
                  authorization: token,
                },
              });
 
              if (data.email !== "hello@asystent.ai") {
                setLoggedIn(false);
              } else {
                setLoggedIn(true);
              }
            } catch (e) {
              console.log(e);
            }
          }
          fetchUserInfo();
        validateJWT();
      }, []);

    const addTokens = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
           await api.patch(`/users/${user?._id}/addTokens`, {
                amount: parseInt(amount),
                title: "Elixir boost",
            }, {
                headers: {
                  authorization: token,
                },
              });
              setAmount("");
              showNotification({
                  id: 'subscribed',
                  disallowClose: true,
                  autoClose: 5000,
                  title: "Elixir added",
                  message: `${user?.email} has received ${amount}ml of elixir`,
                  color: "green",
            
                  styles: (theme: any) => ({
                    root: {
                      backgroundColor: "white",
                      border: "none",
                    },
            
                    title: { color: "black" },
                    description: { color: "black" },
                  })
                })
        } catch (e) {
            console.log(e);
        }
    }


    const activatePlan = async (e: any) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      let planId = "64ad0d740e40385f299bcef9";
      if (agencyPlan) {
        planId = "64ad0d250e40385f299bceea"
      }
      try {
         await api.patch(`/updateUserPlan/${user?._id}`, {
              planId,
              tokens: parseInt(monthlyElixir),
          }, {
              headers: {
                authorization: token,
              },
            });
            setAmount("");
            showNotification({
                id: 'subscribed',
                disallowClose: true,
                autoClose: 5000,
                title: "Plan activated",
                message: `${user?.email} has now ${monthlyElixir}ml of elixir`,
                color: "green",
          
                styles: () => ({
                  root: {
                    backgroundColor: "white",
                    border: "none",
                  },
                  title: { color: "black" },
                  description: { color: "black" },
                })
              })
      } catch (e) {
          console.log(e);
      }
  }


    const searchUser = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const { data } = await api.get(`/users?email=${email}`, {
                headers: {
                    authorization: token,
                },
            });
            setUser(data[0])
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
        {!loggedIn && <LoginModal onClose={() => login()} registration={false}/>}
        <button className="m-4" onClick={logout}>Wyloguj się</button>
        <div className="w-full flex flex-wrap justify-center pt-20">
        <form className="w-1/2 flex flex-wrap" onSubmit={(e) => searchUser(e)}>
        <div className="w-full mb-4 text-xl font-medium"><h2>Search user</h2></div>
        <div className="flex w-full gap-4">
        <Input
            id="email"
            height="2.8rem"
            padding="0.7rem"
            placeholder="customer@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <SendBtn type="submit">
            <><ButtonIcon><BsSearch style={{width: "90%", height: "100%"}}/></ButtonIcon><ButtonText>Search</ButtonText></>
        </SendBtn>
        </div>
        </form>
        {user &&
        <div className="w-[51%] flex flex-wrap mt-10 ml-4">
            <div className="w-full mb-4 text-lg font-medium pb-2 border-b border-b-[#F2F2FB]"><h2>About</h2></div>
            <div className="flex">
                <p className="px-4 border-l-2">{user.name}</p>
                <p className="px-4 border-l-2">{user.email}</p>
                {user.lastSeen && <p className="px-4 border-l-2">{user.lastSeen}</p>}
                <p className="px-4 border-l-2">{user.tokenBalance} elixir</p>
          </div>
            <div className="w-full flex flex-wrap mt-10">
            <div className="w-full mb-4 text-lg font-medium pb-2 border-b-2 border-b-[#F2F2FB]"><h2>Activate plan</h2></div>
            <form className="w-2/3 flex flex-wrap gap-4" onSubmit={(e) => activatePlan(e)}>
              <div>
                <Label>Monthly elixir</Label>
                <Input
                    id="email"
                    height="2.8rem"
                    padding="0.7rem"
                    placeholder="0"
                    value={monthlyElixir}
                    onChange={(e) => setMonthlyElixir(e.target.value)}
                    required
                />
                </div>
                <div className="ml-4">
                <Label>Plan standard</Label>
                        <div className="flex">
                            {agencyPlan ? <SelectedTab>Agency</SelectedTab> : <Tab onClick={() => setAgencyPlan(true)}>Agency</Tab>}
                            {agencyPlan ? <Tab onClick={() => setAgencyPlan(false)}>Standard</Tab> : <SelectedTab>Standard</SelectedTab>}
                        </div>
                </div>
                <div className="w-full">
                <SendBtn type="submit">
                    <><ButtonText>Activate plan</ButtonText></>
                </SendBtn>
                </div>
                </form>
            </div> 
        <div className="w-full flex flex-wrap mt-10">
        <div className="w-full mb-4 text-lg font-medium pb-2 border-b border-b-[#F2F2FB]"><h2>Add Elixir</h2></div>
            <form className="w-2/3 flex flex-wrap gap-4" onSubmit={(e) => addTokens(e)}>
              <div>
                <Label>Elixir</Label>
                <Input
                    id="email"
                    height="2.8rem"
                    padding="0.7rem"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                </div>

                <div className="w-full">
                <SendBtn type="submit">
                    <><ButtonText>+ Add Elixir</ButtonText></>
                </SendBtn>
                </div>
                </form>
            </div>
        </div>
        }
        <div className="w-full flex justify-center">
          <form className="w-1/2 mt-16" onSubmit={(e) => register(e)}>
          <div className="w-full mb-4 text-xl font-medium"><h2>Register user</h2></div>
          <div className="mt-6">
              <Label>
                First name
              </Label>
              <Input
                id="name"
                type="text"
                height="2.8rem"
                padding="0.7rem"
                placeholder="Filip"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />                   
            </div>
            <div className="mt-6">
            <Label>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              height="2.8rem"
              padding="0.7rem"
              placeholder="email@gmail.com"
              value={registrationEmail}
              onChange={(e) => setRegistrationEmail(e.target.value)}
              required
              autoComplete="off"
            />
            </div>
            <div className="mt-6">
              <Label>
                Password {registrationPasswordError && <LabelErrorMessage>at least 5 characters</LabelErrorMessage>}
              </Label>
              <Input
                id="password"
                type="password"
                height="2.8rem"
                padding="0.7rem"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="mt-6 -ml-2">
            <SendBtn id="send-email-btn" type="submit">
              <p>Register user</p>
            </SendBtn>  
            </div>         
          </form>
        </div>
    </div>
    </div>

    )

}

export default Admin;


const SendBtn = styled.button`
    height: 2.6rem;
    width: 12rem;
    text-align: center;
    background-color: transparent;
    color: white;
    display: flex;
    border: solid 3px transparent;
    font-weight: 500;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF, 2px 2px 6px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    align-items: center;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 120%;
    background-position-x: -1rem;
    justify-content: center;
    cursor: pointer;
    font-size: 1.7vh; 
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
        height: 6vh;
        width: 30vw;
        margin-left: 1rem;
    }
`
    const ButtonIcon = styled.div`
    position: relative;
    width: 2vh;
    height: 2vh;
`
const ButtonText = styled.p`
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        margin-left: 1.5vw;
    }
`

const LabelErrorMessage = styled.p`
    color: #FF6060;
    font-size: 0.8rem;
    margin-left: 1vw;
`
  

const Tab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    background: #EEF1F8;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
    }
`

const SelectedTab = styled.div`
    padding: 0rem 1.75rem 0rem 1.75rem;
    height: 2.5rem;
    font-weight: 500;
    margin: 0 0.5rem 0.5rem 0rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    border: solid 3px transparent;
    overflow: hidden;
    border-radius: 12px;
    background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
    background-origin: border-box;
    background-clip: padding-box, border-box;
`
