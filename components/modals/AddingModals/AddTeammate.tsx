import ModalBackground from "../common/ModalBackground";
import SlideBottom from "../../Animated/SlideBottom";
import styled from "styled-components";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import Label from "../../Common/Label";
import { useEffect, useState } from "react";
import api from "@/pages/api";
import { BlueLoader, Loader } from "../../Common/Loaders";
import { showNotification } from "@mantine/notifications";
import { send } from "@emailjs/browser";
import Centered from "../../Centered";

interface Invitation {
    role: string,
    email: string,
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
const AddTeammateModal = (props: {onClose: any}) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingInvitations, setLoadingInvitations] = useState(true);
    const [invitations, setInvitations] = useState<Array<Invitation>>([]);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const { data } = await api.get("/invitatations", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`
                    }
                });
                setInvitations(data.invitations);
                setLoadingInvitations(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchInvitations();
    }, []);

    const addTeammate = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post("/send-invitation", {email, role: "employee"}, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });

            setInvitations([...invitations, {email, role: "employee"}]);

            const templateParams = {
                invitationLink: `${data.invitationLink}`,
                email: `${email}`
            };
            send("service_5j2yxyh","template_04xowv7", templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_KEY);

            showNotification({
                id: 'invited',
                disallowClose: true,
                autoClose: 5000,
                title: "Invitation sent!",
                message:  email + ' should receive an email with an invitation.',
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
                message: 'Something went wrong... Contact us: hello@yepp.ai',
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
        }
    }

    return (
        <ModalBackground closeable={true} onClose={props.onClose}>
            <SlideBottom>
            <ModalContainer onClick={(e) =>  e.stopPropagation()}>
                <CloseIcon onClick={props.onClose}>
                    <BsXLg style={{width: "100%", height: "auto"}}/>
                </CloseIcon>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center w-full">
                        <div className="sm:flex-auto">
                        <h1 className="text-3xl font-semibold leading-6 text-gray-900">Your invitations</h1>
                        <p className="mt-4 text-base text-gray-600">
                            Below you can find all pending invitations.
                        </p>
                        </div>
                        <form onSubmit={(e) => addTeammate(e)} className="mt-4 sm:ml-20 sm:mt-0 flex">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="email@firmowy.com"
                            className="border-2 rounded-2xl px-4 py-2 w-10/12 sm:w-64"
                        >
                        </input>
                        <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl w-20 h-12 flex justify-center items-center">
                            {loading ?
                                <Loader color="white"/>
                                : 
                                <p>Invite</p>
                            }
                        </button>
                        </form>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 lg:mr-0">
                        <div className="inline-block min-w-full py-2 align-middle">
                            {!loadingInvitations ?
                            <table className="min-w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Status
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
                                    <span className="sr-only">Usuń</span>
                                </th>
                                </tr>
                            </thead>
                            {invitations.length > 0 ?
                            <tbody>
                                {invitations.map((person, personIdx) => (
                                <tr key={person.email}>
                                    <td
                                    className={classNames(
                                        personIdx !== invitations.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                    )}
                                    >
                                    {person.email}
                                    </td>
                                    <td
                                    className={classNames(
                                        personIdx !== invitations.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                                    )}
                                    >
                                    <div className="flex items-center justify-end gap-x-4 sm:justify-start">
                                        <div className="text-green-400 bg-green-400/10 flex-none rounded-full p-1'">
                                            <div className="h-2 w-2 rounded-full bg-current" />
                                        </div>
                                        <div className="hidden text-gray-500 sm:block">Sent</div>
                                        </div>
                                    </td>
                                    {/* <td
                                    className={classNames(
                                        personIdx !== invitations.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                                    )}
                                    >
                                        0 ml
                                    </td> */}
                                    <td
                                    className={classNames(
                                        personIdx !== invitations.length - 1 ? 'border-b border-gray-200' : '',
                                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                    )}
                                    >
                                    </td>
                                </tr>
                                ))}
                            </tbody>     
                            :
                            <div className="flex text-gray-400 pl-6 pt-8">
                                <p>Here you can find pending invitations.</p>
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
                    </div>
                </div>
            </ModalContainer>
            </SlideBottom>
        </ModalBackground>
    )
}

export default AddTeammateModal;


const ModalContainer = styled.div`
    width: 70vw;
    max-height: 70vh;
    padding: 6vh 3.5vw 7vh 3.5vw;
    background: white;
    box-shadow: 5px 5px 10px rgba(15, 20, 100, 0.15);
    border: 2px solid #E5E8F0;
    border-radius: 25px;
    font-weight: 500;
    cursor: auto;
    color: black;
    border: 2px solid rgba(255, 255, 255, 0.15);
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 1023px) {
        padding: 2vh 3.5vw 10vh 3.5vw;
        width: 90vw;
        max-height: 75vh;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`

const CloseIcon = styled.button`
    background: transparent;
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 10;
    color: black;
    @media (max-width: 1023px) {
        width: 1rem;
        height: 1rem;
    }
`