import { FormEvent, useEffect, useState } from "react"
import api from "./api";
import { showNotification } from '@mantine/notifications';
import { selectedUserState, setSelectedUser } from "@/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";
import ReferralModal from "@/components/Modals/InformationalModals/ReferralModal";
import { FaLink } from "react-icons/fa";
import logoImage from "../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Code() {

    const [code, setCode] = useState<string>("");
    const [hours, setHours] = useState<number>(0);
    const [loggedIn, setLoggedIn] = useState(true);
    const [viewReferralModal, setViewReferralModal] = useState(false);
    const [user, setUser] = useState();
    const [registeredByReferral, setRegisteredByReferral] = useState(0);
    const [redeemedByReferral, setRedeemedByReferral] = useState(0);
    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
      // localStorage.removeItem("onboarding_token");
      // localStorage.removeItem("token");
      // localStorage.removeItem("user_id");
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
  
      if (!user && userId) {
        const fetchUserInfo = async () => {
          try { 
            const {data} = await api.get(`/users/${userId}`, {
              headers: {
                authorization: token,
              },
            });
            setUser(data);
            setRedeemedByReferral(data.referralCount);
            setRegisteredByReferral(data.registeredByReferral);
          } catch (e) {
            console.log(e);
          }
        }
        fetchUserInfo();
      }
      validateJWT();
    }, [dispatch, user]);

    const login = () => {
      setLoggedIn(true);
      router.reload();
    }
  
  
    const addPromoCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await api.post("/whitelist/add", {code, hours}).then(res => {
            showNotification({
                id: 'invited',
                disallowClose: true,
                autoClose: 5000,
                title: "Kod dodany!",
                message: 'Kod został dodany pomyślnie. Nie zapomnij go udostępnić firmie.',
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
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <div>
    {!loggedIn && <LoginModal onClose={() => login()} registration={false}/>}
    {viewReferralModal && <ReferralModal showDescription={false} onClose={() => setViewReferralModal(false)} />}
    <Link href="/" className="absolute top-5 left-10 lg:left-auto lg:top-6 lg:right-10 w-8 h-8 lg:w-10 lg:h-10"><Image src={logoImage} alt="logo" style={{width: "100%"}}/></Link>
    <div className="bg-white py-12 w-full mt-8 lg:mt-0">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl px-10 lg:px-0 lg:mx-0 lg:max-w-none">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">Good to see you!</h2>
          <div className="mt-6 lg:flex">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-2xl font-medium leading-8 text-gray-600">
                Let&apos;s make marketing smarter, together.
              </p>
              <p className="text-xl leading-8 mt-2 text-gray-600">
                Yepp, is not a tool, we&apos;re a mission-driven community shaping the future where marketing is both personal and effective. <p className="mt-4">- Welcome on board ;)</p>
              </p>
              <button onClick={() => setViewReferralModal(true)} className="px-12 py-4 mt-4 bg-blue-600 text-white font-medium rounded-xl flex items-center"><FaLink className="mr-4"/>Get your referral link</button>
            </div>
              <dl className="w-full flex mt-10">
                <div className="flex flex-col lg:ml-32">
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">{registeredByReferral}</dd>
                    <dt className="text-base leading-7 text-gray-600">Registered users</dt>
                  </div>
                  <div className="flex flex-col ml-16 lg:ml-32">
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">{redeemedByReferral}</dd>
                    <dt className="text-base leading-7 text-gray-600">Redeemed promo codes</dt>
                  </div>
              </dl>
          </div>
        </div>
      </div>
    </div>
    <form onSubmit={(e) => addPromoCode(e)} className='px-10 bg-stone-100 lg:px-20 py-10 pb-20 w-full'>
      <div className="">
        <div>
          <h2 className="font-semibold leading-7 text-2xl text-gray-900">Make someone a gift</h2>
          <p className="text-xl leading-8 mt-2 text-gray-600">
            Surprise your friend with a <b>20% promo code</b> for a Businss plan.
          </p>

          <div className="mt-6 space-y-8 border-b border-gray-10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="username" className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5">
                Promo code
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-0 sm:text-base sm:leading-6"
                    placeholder="secret-code"
                  />
                </div>
              </div>
            </div>

          </div>
          <div className="space-y-8 border-b border-gray-10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="hours" className="block text-base font-medium leading-6 text-gray-900 sm:pt-1.5">
                Expires in (hours)
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                  <input
                    type="number"
                    name="hours"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    id="hours"
                    min={1}
                    autoComplete="hours"
                    className="block flex-1 outline-none border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
                    placeholder="24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-blue-600 px-10 py-3 text-md font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Activate a code
        </button>
      </div>
    </form>
    </div>
  )
}
