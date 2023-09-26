import { useEffect, useState } from 'react'
import Navbar from '@/components/Landing/Navbar'
import {
  AcademicCapIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
import partnershipIllustration from "../public/images/partnership_illustration.png";
import partnershipIllustrationMobile from "../public/images/partnership_illustration_mobile.png";
import Image from 'next/image';
import Footer from '@/components/Landing/Footer';
import Partner from '@/components/Modals/AddingModals/Partner';
import SlideBottom from '@/components/Animated/SlideBottom';
import Head from 'next/head';
import styled from 'styled-components';
import Centered from '@/components/Centered';

const values = [
  {
    name: 'Be world-class.',
    description: 'Always ask, improve and iterate. Just be the best version of yourself and strive for greatness.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Take responsibility.',
    description: 'You will usually be the primary contact for Yepp customers. Try your best serving them and forward important cases to us.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Be supportive.',
    description: 'Whenever asked, offer guidance to end user. Every honest advise increases the odds of gaining a loyal customer.',
    icon: UserGroupIcon,
  },
  {
    name: 'Always learning.',
    description: 'Stay up to date with our latest releases and if you have any questions do not hesitate to ask.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Share everything you know.',
    description: 'Try to be as helpful for the customer as possible. Listen carefully and offer best solutions that come to your mind.',
    icon: SparklesIcon,
  },
]

const benefits = [
  'Up to $1700 in passive income',
  'No commitments',
  'Simple application',
  'Free platform access'

]

export default function Example() {
  const [mobile, setMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);
 
  useEffect(() => {
    if (window.innerWidth < 1023) { 
      setMobile(true);
    }
    const updateWindowSize = () => {
      setMobile(window.innerWidth < 1023);
    };
    window.addEventListener("resize", updateWindowSize);
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  }, []);

  return (
    <div className="bg-white">
        <Head>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Start earning passive income by referring Yepp AI. Earn up to 30% of the referred user subscription." />
          <title>Partnership | Yepp AI</title>
        </Head>
      {openModal && <Partner onClose={() => setOpenModal(false)}/>}
        <Navbar/>
      <main className="relative isolate">
        {/* Background */}
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>

        {/* Header section */}
        <div className="px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-4xl pt-20 text-center sm:pt-36">
            <p className='text-gray-800 mb-4'>BECOME A PART OF YEPP &</p>
            <SlideBottom><h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Start earning from referrals</h2></SlideBottom>
            <p className="mt-6 text-2xl leading-8 text-gray-800">
                Share Yepp and claim up to <b>$1700</b> per referral
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-800 lg:max-w-none lg:grid-cols-2">
              <div>
                <p>
                By becoming Yepp AI official partner you get a unique opportunity to start earning from your referrals. If you invite someone and he/she stays with us you will be getting 30% of their monthly subscription for the 1st year, 20% for 2nd year and 10% for the 3rd year of their subscription. What makes up to <b>$1700 in passive income.</b>
                </p>
                <p className="mt-8">
                It&apos;s simple. If you know anyone who might be interested in using our platform, just <b onClick={() => setOpenModal(true)} className='text-blue-500 cursor-pointer'>apply for a partnership</b>. Every partner gets the access to our special platform with income stats and unique referral link.
                </p>
              </div>
              <div>
                <p>
                <b>What is Yepp AI?</b> It is a marketing platform where you can use any relevant data to generate content that is tailored and informative. Imagine having a marketing expert with all of your niche knowledge, writing best performing and informative content for your business.
                
                </p>
                <p className="mt-8">
                At Yepp, we understand how hard it is to keep coming up with creative content and as you probably know consistency is the key to success. We are here to help you overcome your writer&apos;s block and keep achieving your marketing goals.
                </p>
              </div>
            </div>
            <div className='w-full mt-28'>
              {mobile ? 
              <Image src={partnershipIllustrationMobile} alt="illustration" className='w-full' />
              :
              <Image src={partnershipIllustration} alt="illustration" className='w-full' />
              }
            </div>
          </div>
        </div>
        <div className='w-full mt-20'>
        <Centered><Button onClick={() => setOpenModal(true)} width='20rem' widthMobile='80%'>Become a partner</Button></Centered>
        </div>
        {/* Values section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Our values</h2>
            <p className="mt-6 text-lg leading-8 text-gray-800">
              At Yepp we value professionalism and honesty. While being our partner we kindly ask you to always be ethical and act in the best interest of customer whenever you promote our product.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-800 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {values.map((value) => (
              <div key={value.name} className="relative pl-9">
                <dt className="inline font-semibold text-black">
                  <value.icon className="absolute left-1 top-1 h-5 w-5 text-blue-500" aria-hidden="true" />
                  {value.name}
                </dt>{' '}
                <dd className="inline">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative isolate -z-10 mt-32 sm:mt-40">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
              <img
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                alt=""
              />
              <div className="w-full flex-auto">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Become a partner</h2>
                <p className="mt-6 text-lg leading-8 text-gray-800">
                  Become a part of Yepp today and reap the rewards from being a partner of one of fastest frowing AI marketing platforms.
                </p>
                <ul
                  role="list"
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-black sm:grid-cols-2"
                >
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-x-3">
                      <CheckCircleIcon className="h-7 w-5 flex-none" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex">
                  <Button width="20rem" widthMobile='7rem' onClick={() => setOpenModal(true)}>
                    Become a partner <span aria-hidden="true" className='ml-2'>&rarr;</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


const Button = styled.button<{width: string, widthMobile: string}>`
  padding: 0.55rem 1.25rem 0.75rem 1.25rem;
  width: ${props => props.width};
  font-size: 1rem;
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
  font-weight: 700;
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
    width: ${props => props.widthMobile}
    padding: 0.5rem 1.25rem 0.5rem 1.25rem;
  }
`;
