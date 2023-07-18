import styled from "styled-components";
import Image from "next/image";
import socialMediaIcon from "../../public/images/socialMediaIcon.png";
import ideaIcon from "../../public/images/ideaIcon.png";
import purchaseIcon from "../../public/images/purchaseIcon.png";
import articleIcon from "../../public/images/articlesIcon.png";
import emailIcon from "../../public/images/emailsIcon.png";
import giftIcon from "../../public/images/giftIcon.png";
import { useEffect, useState } from "react";
import api from "../../pages/api";
import dynamic from "next/dynamic";
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill, BsPlusLg } from "react-icons/bs";
const AddElixir = dynamic(() => import("../Modals/AddingModals/AddElixir"));
const UpgradeSubscription = dynamic(() => import("../Modals/InformationalModals/UpgradeSubscription"));
import SlideBottom from "../Animated/SlideBottom";
import Centered from "../Centered";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { BlueLoader, Loader } from "../Common/Loaders";
import { send } from "@emailjs/browser";
import { showNotification } from "@mantine/notifications";
import { selectedUserState, } from "../../store/userSlice";
import { useSelector } from 'react-redux';
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";
import shareBg from "../../public/images/verticalBanner.png";
import ReferralModal from "../Modals/InformationalModals/ReferralModal";


interface Props {
    width: string;
}

interface Background {
    image: any;
}
interface Employee {
    user: any,
    role: string,
    name: string,
    email: string,
}

interface Transaction {
    timestamp: Date,
    value: Number,
    title: String,
    type: String
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  
const BottomPanel = () => {

    const [openElixirModal, setOpenElixirModal] = useState(false);
    const [elixirWidth, setElixirWidth] = useState<string>("0");
    const [balance, setBalance] = useState<string>("0");
    const [plan, setPlan] = useState<any>();
    const [transactions, setTransactions] = useState<Array<Transaction>>();
    const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [employees, setEmployees] = useState<Array<Employee>>([]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const router = useRouter();
    const user = useSelector(selectedUserState);
    const workspaceCompany = useSelector(selectedWorkspaceCompanyState);
    const [showApiKey, setShowApiKey] = useState(false);
    const [openReferralModal, setOpenReferralModal] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const { openElixir, openSubscriptions } = router.query;
    
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (userId) {
            setUserId(userId as string);
        }
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token as string);
        }

        if(window.innerWidth <= 1023){
            setMobile(true);
        }

        if (user.accountType === "company" && employees.length === 0) {
            const workspace = localStorage.getItem("workspace");
            const fetchEmployees = async () => {
                try {
                    const { data } = await api.get(`/workspace/${workspace}`, {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`
                        }
                    });
                    setApiKey(data.apiKey)
                    setEmployees(data.employees);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchEmployees();
        }

          if (openElixir) {
            setOpenElixirModal(true);
          } else if (openSubscriptions) {
            setOpenUpgradeModal(true);
          }

          if(window.innerWidth <= 1023){
              setMobile(true);
          }
          
        const getElixirUsage = async () => {
          const userResponse = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        });
          if(user.name && user.plan){
            const planResponse = await api.get(`/${userId}/planInfo`);
            setElixirWidth((planResponse.data.percentage*100).toString());
            setPlan(planResponse.data.plan);
            if (user.plan === "647c3294ff40f15b5f6796bf") {
                let percentage = (userResponse.data.tokenBalance/250);
                let elixir = Number(percentage) > 100 ? 100 : Number(percentage) < 0 ? 0 : percentage;
                setElixirWidth((elixir).toString());
            }
          }
          setBalance(userResponse.data.tokenBalance.toString());
        } 

        const getTransactions = async () => {
            const response = await api.get(`/token-transactions/${userId}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`   
                }
            });
            setTransactions(response.data);
        }

        if(userId){
            getElixirUsage();
            getTransactions();
        }

      }, [employees.length, openElixir, openSubscriptions, user]);

      const addTeammate = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/send-invitation", {email, role: "employee"}, {
                headers: {
                    Authorization: `${token}`
                }
            });

            const templateParams = {
                invitationLink: `${data.invitationLink}`,
                email: `${email}`
            };
            send("service_5j2yxyh","template_04xowv7", templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_KEY);

            showNotification({
                id: 'invited',
                disallowClose: true,
                autoClose: 5000,
                title: "Invitation sent",
                message: '' + email + ' should receive an email with an invitation.',
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
              setEmail("");
        } catch (e) {
            showNotification({
                id: 'invited',
                disallowClose: true,
                autoClose: 5000,
                title: "Something went wrong...",
                message: 'Unexpected error occured. Contact us hello@asystent.ai',
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


    const deleteTeammate = async (email: string) => {
        try {
            const workspace = localStorage.getItem("workspace");
            const { data } = await api.get(`/workspace/${workspace}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            await api.delete(`/workspaces/${data._id}/delete-employee/${email}`, {
                headers: {
                  authorization: token
                }
            });
            router.reload();
        } catch (e) {
            console.log(e);
        }
    }


    const renderTransactions = () => {
        const renderedTransactions = transactions?.map((transaction) => {

            const date = new Date(transaction.timestamp);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            const formattedDate = `${day}.${month}.${year}`;

            let icon = socialMediaIcon;
            if(transaction.title){
                if (transaction.title.includes("pomysłów")) {
                    icon = ideaIcon;
                } else if (transaction.title.includes("maila") || transaction.title.includes("newslettera")){
                    icon = emailIcon;
                } else if (transaction.title.includes("Doładowanie") || transaction.title.includes("Aktywacja")|| transaction.title.includes("doładowanie")) {
                    icon = purchaseIcon;
                } else if (transaction.title.includes("bloga") || transaction.title.includes("artykułu")){
                    icon = articleIcon;
                } else if (transaction.title.includes("polecenie") || transaction.title.includes("Polecenie")){
                    icon = giftIcon;
                } else if (transaction.type === "income"){
                    icon = purchaseIcon;
                }
            }
 
            return (
                <Transaction key={transaction.timestamp.toString()}>
                        <TransactionIcon image={icon}>
                        </TransactionIcon>
                        <div>
                            <TransactionTitle>{transaction.title}</TransactionTitle>
                            <TransactionDate>{formattedDate}</TransactionDate>
                        </div>
                </Transaction>
            )
        })
        return (
            <Transactions>
                {transactions?.length ?
                renderedTransactions
                :
                <NoTransactionsText>
                    <p style={{width: "70%"}}>Here your elixir transactions will appear. Generate some content!</p>
                </NoTransactionsText>
                }
            </Transactions>
        )
    }

    const renderEmployees = () => {
        const renderedEmployees = employees?.map((person, personIdx) => {
            return (
                <tbody key={person.email}>
                <tr key={person.email}>
                    <td
                    className={classNames(
                        personIdx !== employees.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                    )}
                    >
                    {person.name}
                    </td>
                    <td
                    className={classNames(
                        personIdx !== employees.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                    )}
                    >
                    {person.email}
                    </td>
                    {/* <td
                    className={classNames(
                        personIdx !== employees.length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                    )}
                    >
                        0 ml
                    </td> */}
                    <td
                    className={classNames(
                        personIdx !== employees.length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                    )}
                    >
                    <button onClick={() => deleteTeammate(person.email)} className="text-red-400 hover:text-red-600">
                        Delete<span className="sr-only">, {person.name}</span>
                    </button>
                    </td>
                </tr>
            </tbody>   
            )
        })
        return (
            <List>
                    <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 lg:mr-0">
                        <div className="inline-block min-w-full py-2 align-middle">
                            {employees ?
                            <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                >
                                    Imię
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Email
                                </th>
                                {/* <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Zużycie
                                </th> */}
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                >
                                    <span className="sr-only">Delete</span>
                                </th>
                                </tr>
                            </thead>
                            {employees.length > 0 ?
                            renderedEmployees
                            :
                            <div className="flex text-gray-400 ml-8 pt-8">
                                <p>Here you will find your teammates.</p>
                            </div>   
                            }
                            </table>
                            :
                            <div className="mt-8">
                                <Centered>
                                    <BlueLoader />
                                </Centered>    
                            </div>           
                            }
                        </div>
                    </div>
            </List>
        )
    }
      
    return (
        <Centered>
        {(user._id) ?
        <Panel>
            {(openElixirModal) ? 
                <AddElixir onClose={() => setOpenElixirModal(false)} />
                :
                openElixirModal &&
                <UpgradeSubscription onClose={() => setOpenElixirModal(false)} closeable={true} />
            }
            {openUpgradeModal && plan ? 
            <UpgradeSubscription onClose={() => setOpenUpgradeModal(false)} closeable={true} />
            :
            openUpgradeModal &&
            <UpgradeSubscription onClose={() => setOpenUpgradeModal(false)}closeable={true} />
            }
            {openReferralModal && <ReferralModal showDescription={true} onClose={() => setOpenReferralModal(false)} />}
            {mobile &&
            <AboutPlanContainer>
                <SlideBottom>
                <BalanceContainer>
                    <Title>Elixir balance</Title>
                    <div style={{width: "100%", textAlign: "right"}}>
                        {(plan && balance) ?
                        <>{plan._id === "647c3294ff40f15b5f6796bf" ? <Balance>{Number(balance).toLocaleString()} / 7,500</Balance> : <Balance>{Number(balance).toLocaleString()} / {plan.monthlyTokens.toLocaleString()}</Balance>}</>
                        :
                        Number(balance) !== 0 ?
                        <Balance>{Number(balance).toLocaleString()}ml</Balance>
                        :
                        <Balance>0 / 0ml</Balance>
                        }
                    </div>
                    <FuelBar>
                        <Fuel width={elixirWidth}></Fuel>
                    </FuelBar>
                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                        {plan && plan._id !== "647c3294ff40f15b5f6796bf" ?
                            <Button onClick={() => setOpenElixirModal(true)}><ButtonIcon><FaPlus style={{width: "100%", height: "100%"}}/></ButtonIcon><ButtonText>Doładuj Elixir</ButtonText></Button>
                            :
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonIcon><FaPlus style={{width: "100%", height: "100%"}}/></ButtonIcon><ButtonText>Doładuj Elixir</ButtonText></Button>
                        }
                    </div>
                </BalanceContainer>
                </SlideBottom>
                {(plan) ?
                <SlideBottom>
                <PlanContainer>
                    <Title>Active plan</Title>
                    <CurrentPlanTitle>{plan.name}</CurrentPlanTitle>
                    <MonthlyTokens>+{plan.monthlyTokens.toLocaleString()}ml / msc</MonthlyTokens>
                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                        <Button onClick={() => setOpenUpgradeModal(true)}><ButtonIcon><FaPlus style={{width: "100%", height: "100%"}}/></ButtonIcon><ButtonText>+ Upgrade plan</ButtonText></Button>
                    </div>
                </PlanContainer>
                </SlideBottom>
                :
                <>
                {(user.plan && plan) ?
                <SlideBottom>
                    <PlanContainer>
                        <Title>Active plan</Title>
                        <CurrentPlanTitle>{plan.name}</CurrentPlanTitle>
                        <MonthlyTokens>+{plan.monthlyTokens}ml / msc</MonthlyTokens>
                        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonText>+ Upgrade plan</ButtonText></Button>
                        </div>
                    </PlanContainer>
                </SlideBottom>     
                :
                <SlideBottom>
                    <PlanContainer>
                        <Title>Active plan</Title>
                        <CurrentPlanTitle>Assistant Business</CurrentPlanTitle>
                        <MonthlyTokens>+1 000 000ml / msc</MonthlyTokens>
                        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonText>+ Upgrade plan</ButtonText></Button>
                        </div>
                    </PlanContainer>
                </SlideBottom>           
                }
                </>
                }
            </AboutPlanContainer>
             }
            <SlideBottom>
             <>
            {(user._id !== workspaceCompany._id || (user.plan !== "6444d4394ab2cf9819e5b5f4" && user.plan !== "64ad0d250e40385f299bceea")) ?
                <ListContainer>
                    <Title>Elixir transactions</Title>
                    {renderTransactions()}
                </ListContainer>
            :
            <>
                <ListContainer>
                    <div style={{height: "100%"}} className="px-2 sm:px-6 lg:px-4 w-full flex flex-wrap">
                    <div className="sm:flex w-full justify-space">
                        <div className="sm:flex-auto">
                        <Title>Your team</Title>
                        </div>
                        <form onSubmit={(e) => addTeammate(e)} className="sm:ml-20 mt-4 lg:mt-0 flex items-center">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="email@gmail.com"
                            className="border-2 text-black font-medium rounded-2xl px-4 py-2 w-10/12 sm:w-56"
                        >
                        </input>
                        <SendBtn type="submit">
                            {loading ?
                                <Loader color="white"/>
                                : 
                                <><ButtonIcon><BsFillEnvelopeFill style={{width: "90%", height: "100%"}}/></ButtonIcon><ButtonText>Invite</ButtonText></>
                            }
                        </SendBtn>
                        </form>
                    </div>
                    {renderEmployees()}
                </div> 
                </ListContainer>
                {/* {!mobile &&
                <SlideBottom>
                    <APIContainer>
                        <div style={{display: "flex", alignItems: "flex-end"}}>
                        <Title>API key</Title>
                        <OptionDescription>Thanks to it you can access chatbots and assets beyond our platform.</OptionDescription>
                        </div>
                        <ApiKeyContainer>
                            {showApiKey ? <p>{apiKey}</p> : <p>************************</p>}
                            <div style={{display: "flex", alignItems: "center"}}>
                                {!showApiKey ? <BsFillEyeFill onClick={() => setShowApiKey(true)} style={{width: "1rem", height: "auto"}}/> : <BsFillEyeSlashFill onClick={() => setShowApiKey(false)} style={{width: "1rem", height: "auto"}}/>}
                            </div>
                    </ApiKeyContainer>
                    </APIContainer>
                </SlideBottom>  
                } */}
                </>

            }
            </>

            </SlideBottom>
            {!mobile &&
            <AboutPlanContainer>
                    <SlideBottom>
                    <ShareContainer onClick={() => setOpenReferralModal(true)} background={shareBg}>
                        <Title>Get 30 000 elixir for free</Title>
                        <p style={{width: "100%"}}>Share Yepp and earn free elixir!</p>
                    </ShareContainer>
                </SlideBottom>  
                <SlideBottom>
                <BalanceContainer>
                    <Title>Elixir balance</Title>
                    <div style={{width: "100%", textAlign: "right"}}>
                        {(plan && balance) ?
                        <>{plan._id === "647c3294ff40f15b5f6796bf" ? <Balance>{Number(balance).toLocaleString()} / 25,500</Balance> : <Balance>{Number(balance).toLocaleString()} / {plan.monthlyTokens.toLocaleString()}</Balance>}</>
                        :
                        Number(balance) !== 0 ?
                        <Balance>{Number(balance).toLocaleString()}ml</Balance>
                        :
                        <Balance>0 / 0ml</Balance>
                        }
                    </div>
                    <FuelBar>
                        <Fuel width={elixirWidth}></Fuel>
                    </FuelBar>
                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                        {plan && plan._id !== "647c3294ff40f15b5f6796bf" ?
                            <Button onClick={() => setOpenElixirModal(true)}><ButtonIcon><FaPlus style={{width: "100%", height: "100%"}}/></ButtonIcon><ButtonText>Doładuj Elixir</ButtonText></Button>
                            :
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonIcon><FaPlus style={{width: "100%", height: "100%"}}/></ButtonIcon><ButtonText>Doładuj Elixir</ButtonText></Button>
                        }
                    </div>
                </BalanceContainer>
                </SlideBottom>
                {(plan) ?
                <SlideBottom>
                <PlanContainer>
                    <Title>Active plan</Title>
                    <CurrentPlanTitle>{plan.name}</CurrentPlanTitle>
                    <MonthlyTokens>+{plan.monthlyTokens.toLocaleString()}ml / msc</MonthlyTokens>
                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                        <Button onClick={() => setOpenUpgradeModal(true)}><ButtonText>+ Upgrade plan</ButtonText></Button>
                    </div>
                </PlanContainer>
                </SlideBottom>
                :
                <>
                {workspaceCompany._id ?
                <SlideBottom>
                    <PlanContainer>
                        <Title>Active plan</Title>
                        <CurrentPlanTitle>Assistant Business</CurrentPlanTitle>
                        <MonthlyTokens>+1 000 000ml / msc</MonthlyTokens>
                        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonText>+ Upgrade plan</ButtonText></Button>
                        </div>
                    </PlanContainer>
                </SlideBottom>     
                :
                <SlideBottom>
                    <PlanContainer>
                        <Title>Active plan</Title>
                        <CurrentPlanTitle>Freemium</CurrentPlanTitle>
                        <MonthlyTokens>+0ml / msc</MonthlyTokens>
                        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "-1vh"}}>
                            <Button onClick={() => setOpenUpgradeModal(true)}><ButtonText>+ Upgrade plan</ButtonText></Button>
                        </div>
                    </PlanContainer>
                </SlideBottom>           
                }
                </>
                }
            </AboutPlanContainer>
             }
        </Panel>
        :
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "20rem"}}>
            <BlueLoader />
        </div>
        }
        </Centered>
    )
}

export default BottomPanel;


const Panel = styled.div`
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0.5rem; 
    grid-template-areas: 
      ". ."; 
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: auto;
        padding-bottom: 7vh;
    }
`

const ListContainer = styled.div`
    padding: 3vh 2vw 4vh 2vw;
    height: 78vh;
    margin: 2vh 0 1.5vh 0vh;
    background: white;
    overflow: hidden;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #EAEDF5;
    border-radius: 25px;
    color: black;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        margin: 0;
        width: 97vw;
        padding: 3vh;
    }
`

const AboutPlanContainer = styled.div`
    padding: 2vh 0vh 0vh 1vh;
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: space-between;
    @media (max-width: 1023px) {
        display: flex;
        height: auto;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        padding: 1.5vw;
    }
`

const Title = styled.h2`
    font-size: 3vh;
    height: 4vh;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
`

const Transactions = styled.div`
    margin-top: 2vh;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-mask: 
    linear-gradient(to top,    black 90%, transparent) top   /100% 51%,
    linear-gradient(to bottom, black 90%, transparent) bottom/100% 50%,
    linear-gradient(to left  , black, transparent) left  /100% 0%,
    linear-gradient(to right , black, transparent) right /100% 0%;
    -webkit-mask-repeat:no-repeat;
    &::-webkit-scrollbar {
        display: none;
    }
`

const Transaction = styled.div`
    display: flex;
    border-bottom: 2px solid #EAEDF5;
    align-items: center;
    padding: 2vh 0.5vw 1.5vh 0.5vw;
    color: black;
    font-weight: 500;
    margin-bottom: 1vh;
    @media (max-width: 1023px) {
        padding: 2.5vh 0.5vw 1.5vh 0.5vw;
    }
`

const TransactionIcon = styled.div<Background>`
    position: relative;
    width: 5vh;
    height: 5vh;
    min-width: 5vh;
    overflow: hidden;
    margin-right: 2vw;
    border-radius: 10px;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 1023px) {
        margin-right: 4vw;
        margin-bottom: 1vh;
    }
`

const TransactionTitle = styled.p`
    font-size: 2vh;
`

const TransactionDate = styled.p`
    font-size: 1.5vh;
    color: #596073;
`

const BalanceContainer = styled.div`
    padding: 3vh 2vw 4vh 2vw;
    width: 100%;
    height: 28vh;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #EAEDF5;
    display: flex;
    color: black;
    flex-wrap: wrap;
    align-items: space-between;
    border-radius: 25px;
    @media (max-width: 1023px) {
        width: 97vw;
        margin: 0;
        padding: 3vh;
        height: auto;
    }
`

const PlanContainer = styled.div`
    padding: 3vh 2vw 4vh 2vw;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #EAEDF5;
    border-radius: 25px;
    display: flex;
    align-items: space-between;
    height: 28vh;
    color: black;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 1023px) {
        width: 97vw;
        margin: 1.5vw 0 0 0;
        padding: 3vh;
        height: auto;
    }
`

const APIContainer = styled.div`
    padding: 3vh 2vw 4vh 2vw;
    background: white;
    height: 19vh;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border: 1.5px solid #EAEDF5;
    border-radius: 25px;
    display: flex;
    align-items: space-between;
    color: black;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 1023px) {
        width: 92vw;
        margin: 3vh 0 0 0;
        padding: 3vh;
        height: 30vh;
    }
`


const ShareContainer = styled.div<{background: any}>`
    padding: 3vh 2vw 4vh 2vw;
    background: white;
    height: 19vh;
    background-image: url(${props => props.background.src});
    background-repeat: no-repeat;
    background-position: center;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    font-size: 1.3rem;
    text-align: center;
    background-size: cover;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.13);
    border-radius: 25px;
    display: flex;
    align-items: space-between;
    justify-content: center;
    color: white;
    flex-wrap: wrap;
    width: 100%;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.97);
        box-shadow: none;
    }
    @media (max-width: 1023px) {
        width: 92vw;
        margin: 3vh 0 0 0;
        padding: 3vh;
        height: 30vh;
    }
`

const FuelBar = styled.div`
  width: 100%;
  height: 0.75rem;
  border-radius: 15px;
  background: white;
  box-shadow: inset 2px 2px 4px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
  @media (max-width: 1023px) {
}
`

const Fuel = styled.div<Props>`
  width: ${props => props.width}%;
  height: 0.75rem;
  border-radius: 15px;
  background: linear-gradient(45deg, #6578F8, #64B5FF);
`

const Balance = styled.div`
    font-size: 2vh;
    margin-bottom: 0.5vh;
    font-weight: 500;
`

const Button = styled.button`
    height: 5vh;
    width: 12.5vw;
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
    margin-left: 2.5vw;
    cursor: pointer;
    font-size: 2vh; 
    margin-top: 2.5vh;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(0.95);
        box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -2px -2px 4px #FAFBFF;
    }
    @media (max-width: 1023px) {
        height: 6vh;
        width: 42vw;
        margin-top: 1.5rem;
    }
`

const SendBtn = styled.button`
    height: 5vh;
    width: 8vw;
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
    margin-left: 0.5vw;
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

const List = styled.div`
    width: 100%;
    height: 82%;
    margin-top: 1.2rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`

const ButtonText = styled.p`
    margin-left: 0.5vw;
    @media (max-width: 1023px) {
        margin-left: 1.5vw;
    }
`

const ButtonIcon = styled.div`
    position: relative;
    width: 2vh;
    height: 2vh;
`

const CurrentPlanTitle = styled.div`
    width: 100%;
    text-align: center;
    font-size: 3.5vh;
    font-weight: 600;
    color: black;
`

const MonthlyTokens = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2.2vh;
    font-weight: 500;
    color: black;
    @media (max-width: 1023px) {
        margin-top: 0vh;
    }
`

const NoTransactionsText = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 2vh;
    color: #596073;
    height: 100%;
    align-items: center;

`

const OptionDescription = styled.div`
    margin-left: 0.75rem;
`

const ApiKeyContainer = styled.div`
    width: 100%;
    margin-top: 1.2rem;
    border: 2px solid #E9EFF6;
    font-weight: 500;
    border-radius: 10px;
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
