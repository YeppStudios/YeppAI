import styled from "styled-components";
import testimonialsBackground from "../../public/images/testimonialsBackground.png";
import mobileBlueMeshBg from "../../public/images/mobileBlueMeshBg.png";
import Image from "next/image";
import Centered from "../Centered";
import SlideBottom from "../Animated/SlideBottom";
import { useEffect, useState } from "react";
import ColorfulText from "../Common/ColorfulText";


interface Section {
    image: any,
    mobileImage: any
  }

const TestimonialsSection = () => {
    
    const [mobile, setMobile] = useState(true);
   
    useEffect(() => {
      if (window.innerWidth > 1023) { 
        setMobile(false);
      }
      const updateWindowSize = () => {
        setMobile(window.innerWidth < 1023);
      };
      window.addEventListener("resize", updateWindowSize);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }, []);

    return (
        <>
        <div className="pl-[5vw] lg:pl-[10rem] lg:w-1/2 w-11/12">
        <h2 className="lg:text-[4vw] text-3xl font-medium leading-tight">Voices of <ColorfulText>innovation</ColorfulText></h2>
        <p className='lg:w-10/12 text-gray-800 lg:mt-8 mt-4 lg:text-lg'>How Yepp is changing the marketing game? Discover the impact in our clients&apos; words.</p>
        </div>
        {mobile && 
        <Section image={testimonialsBackground} mobileImage={mobileBlueMeshBg}>
            <div>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    <b>Yepp AI is a perfect platform for organizations looking to get started with artificial intelligence.</b> This tool effectively guides users through their daily marketing tasks.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://storage.googleapis.com/socialmedia-images-yepp/towerlogo.png" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Szymon Pietkiewicz</PersonName>
                            <PersonRole>CMO at Tower Group</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Yepp AI has proven to be an invaluable support for our marketing agency. Its advanced artificial intelligence technology helps us in managing various aspects of our business efficiently and effectively. <b>The true game-changer lies in its ability to analyze and process vast quantities of data in minimal time.</b> The most important aspect of Yepp is nevertheless the team, which we highly recommend!
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAz1BMVEX///8cHyMAAADwNzfwNTXwMDDvIiLwMzPwLS0ZHCDvICDvGxvPz8/wLi4RFRrvKioAAAkAAAb4mpoUFxwIDhQABw+hoqMAAAz/9/eEhYb/9PSOj5D39/dNT1HySkrvGBj7zs7o6Oj94eH819f1fX3e39/W1te5ubpxc3TyXl78z8/6vLz3kZFpamymp6iVlpfvAADxQEBfYGL4q6v1gID0c3P+6+szNTg8PkF5enwoKy7GxseztLX6wMDyV1f3l5f4paX0a2tJSk1WWFrxUFBuyW36AAASCklEQVR4nO2dCVfqvBaGS0cKlIIMThwrIAJHUHEABRzx//+mmzTN2LS0At9371151zpH6ZQ8GfbeSUPUNCUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJaX/Zj35jj8BPye+U5Je8HZ1UTTGj9Jzn+Zs9q5pF7OZcyk53bt4f/850bT39/eLvvQBN0/j8fjp5ndZz6hnzyw+aZDQDE7ip08uSp5jmpZdnEtuPvJNx9Q03zFtWS77ZccpvWmaYTnlS8n5uW97lmN58ofvS8+WUYR1+FE0yhLCJ98wDBP8874kNx/54JymFU1DTlgC94Him4Hzl5LzY89AKl7txJAuQOgfgZ8fvlE+i5/+skD6tm0YzkxyMyQ00wnNIiB05IQBgPNtkIJzsRNDujDhkZxwHFZx3zbMJMItdWiU+tpFMmHxqA9ycHDCTy2Z0IGZPymHJDFlqEPD/0gjLPW0S/tfJXwHmXsLCU3JzVkIQfP+7yGUWDRI+DcDoZ9ICB77k054XwpkXWBf2kIIih90pJ0I/cdxKqHW6/UkrWdvIra0KCUEhh5kYidC5+tLTgieCovv0IL+8AP8nMgJLUA41852IQQ9Ue4P/yFC4PCsZy00mjJC24SHz7ba0jRCGDEkEvb+3gBJzu5NgNC0z7QeyExJQggOAxO7C6EZQiYTjku2bR/S0nyCsMz0v0BdyQlNTJge0/iy0BwSWlfWFkLvwDHNSckBiA7MBbRrouyQcF6WZwISOumENnB3KYR2fwIc0kEJtZ4HAnzPSSC0COG75N4MhOWTCyeB8AwS/tX+Htjja/35zdXzEzDoUsIZIRxL7o1aqZdKCPtBGuGhY5r+ffkJkE08eT/8CaO2N9uwkkZPPhgfphGezYM0wvDhhyQ8AbnzSp5fBLkI5HGpYc9AV/KeJXc/guqxvq48I4Vwjp5xKTlfNg3T+3JMefHtSZMAWnPTNJJGgHZk8MPAR1QPVo8FjWUg89wR4Y2fQDgBDzdBTzeCt50g0vVZ9h3kl8vSuZgxtLWG4xuSCQBQAEF4s2lLKyEiPAnC/iZ9OOAzreDp9/nPoJPPWWD7vp2UzONPUA5mshqEegM326VgIj3Zuw+Ce9D0n++D+0vpFTdfduB/HbIGkeaXN583EkOKdSatP3Lz2+Fjy/83rdqv0+lpe5Xjlk4FK3agk3AFVreyWlW64gPxxbETWdTtDgaD6+trcD/4/xp8GLCnz3W91axWm8e6fpr5mRsd6lUn93zrWCN0YEkOtJms3OHrmiOuQF/I1dd83r9fXhbLQrV1zFx+W28h6cPwc0GP645cXWkeuwWsVpVjT9GfRsHVrwd6ofGCDtTwUxp/UNZ0/NBjQni90VuN6Kjb1JdD+jxyda3NpbPWGw0XqjmlB5fokOvWb+HHAbmZqjnCF7d1lz3hCkWYqFHT1bva7XGhoIefOzQVdOCaHNBx6b/q1QKf2EOcsHnOpUMeg0uSuxjlVkqIm+OdeNLVO5kI71r6AHKCVDo8UHRgXeezARricTwfS5waJeR7Ci05nRwbCMekhK/o2mH8XPVPJsJbfQ3+X7gYYMUQDlARkM/IeHw34/koNHHNJBFqtKBI0ZNcu4tthF3JKdqoUrV6wAWMenu7JjzglQChgm7L0gInb7cQvuCOqxMrS9KqjhIJo1NTWbFWH7QMGnTwo5HVOqWPqoWZ/iYmxUUIriQtcLaxhXCK+y4t+RE+FNkwKWFomKRVCHpiFsJQsLnUUYFsqBFBtqLA29aKvApJL00kJK29vsaHaLWukgkfuJs5tUZaVrVbBX2qdTigqPiohUDt5bYmS4tmPJGQWKwW8XDU0HSTCTdcWYADpAqqi8yAwJTWAeCaSzXq/7R9tMIqbScRojadTEgqH1tH+mi3qQmEVerxR3yu9Ok0+uBWs3mLUJvQocEuyTX4msba1lpYAvL2AnS8hZA8ubERmasbgbD6AOM2EBQCcfeG7bkdZsHV88SFyNZfD4RuBu064w7DxM6pJXJhzEY+tdrphOSMW4gOkAaPgwNKKHSwa4qu4Y6TNaRBaoX1fbdigaKHnFN3GLpHamvd5bA7eCXeP+peyYSkh2MLSB4VRaUZCFELh9Ywmy/E6qAg9mUtNEKYMrHokadm3GPYSv5gG4C6aQrhQ5W7kTHbuDoo4ZS/dcD32LVOCiWXOvo5Ct+IoJuiVgwVPbmg8R1+XuOmtpWQVlkE5IqVmkhIDTrynMt8NYi1Ag6DVgnOZBNnI4qsiOOOAgragLYRkm4XlT/JtoutfiIhHfDkcPJxndeBvamyEQuAYNzhg0A4zUlIrHJNiGAITzIhaeGF4zvt13rQdXbsBAtsybioKMeEMBq4ZSckj4rODAXiFEujtYlB26kSK5uOEFXojDuMvAEpzYjoWsh3MmGHM/mMUSOdKpmQyddxW9tFFX5sq3dokBb1HkIYeQexZpIJiWURezRx3cmE2oLYB7e2E6HWfWDHDvo1MzpEE1HExLeE3hQjPBefTUYpxyjTGPgYX5BCuKaVWNutEkE1FqhL1FdT6g5RSW9INnMTEleKPCuJ4r4zEGotUvA4it1BI6bvfZMHRz2cuJMo0s5BSDsejDC6wo1bCO/o1En9dmfENU2cVGE0/qVNLRot5SAkxjM0LcSG0fFisrfgZsh2qEQ8B0zib3dBqhDH/3TUOkwnbMUIidkNq/8WVwoNodMImQB5h0rs6NPIcOMCplYHz1sS5sjy5CAk1RCeOuV75VZCthIL8dMZ1YUjzhAyNt+ER+aUEBW94A9pPlrx4AOPW8Juhjs0CCto8imETMxf0NeS89k00BtNvXZaEQLUAu0tyx0IcQsPJ4UF/7+dkBmcM6WSH/G46bpNvXl+q/OIOPCgo7xBbkIyEtPZJkuvSyekIULhd4OnSJ1RQT9+2Yzu2t9gBE/7IQ483B0IibEAXY/cx2S2K6lXRsx0fCPHJFQa7PC1St7AYHtABh8RcjJhPPQgEwigdNjfMxKyPed3A0SZBrAqq3BiKzogzvEnEkoiZDIJBOwwrU96fhsh88YBO6+9qDMc6aDhRp/orFdnC2HcaREC4BBxBO8uJOeTpusXTK/J+vowoyqvuO/vQqgx1gXbZDJ7qmUgZOJv9r79ihKiz7kIMRawlbrkMkqY1AZbTCXuGYxoJ0LcNBvfXaZLEm0nZKYCd/D66dqJkERqzRUxpczU/HZCJnSjg649K5nwnM+CbLaBRNtVPGjhxgl04j8x96zX/9Vqj+0iU4At9LmSh5Ax97Laoq9qEh0689ZBElLsIlJeJBOukGRLIJRNNsRfn3GjSEq4HK5v29IxEnUYycWwm0gmohFMIqEkpuHe3SHVWXtBY2u3Xqsd6zKHwLy/3K9LJMFjMmHYaLYQVsVX5NwbJOFdtnQEwdgaaQq/VZdMnGQnlHWTjTAm40xp7G291OXRNyvsypydtSDFJRIS44FKdAvhq7Ckgq+mTISMrdmjNR3pia2UEIrvgOOzGBo7O4/ET6plImRWGtT35fS7mxrtLomE4nt8KaG4somv6GyENK6RTDrm13DzvQSjJz3uLbYRxmcTNW4Qixi4YV42Qsbi/jI2razb55Xzu/Z6uKpM9WrD5dLajbAjMnA9KRshnbL9nb841fV6S6/oreO6ruP3NIxBED0+JdyyngapybsLniEjIXWJtV9MnJ6HiTSFsm7QVYCJhNtWDCG9NBKeyxO61Wq12YwTdvnLmvk7IroZJMwTMsNNPELD0xo5CUfc27ukFZruYjodvb6KE2rdjR4WCV1qlz9wQ3YKDFALXGtiTF4DEzYFwsihkNUqckJ+wZHQygihdADfOYUmD/5GhiiFjItoGaFGBID4CWHG8RD06EXlMJFQOs3ArdcRV/1QQknrWzVb+A5miVSuZUM0CVC03KoTdiC+FJaI8C+UthLySxuFKkgjfEVvblHkRDKR2+dH6YPM8q2JscoLYb6UriGpZCHkzCW2VhkIv6NkUM8juZOGFWmKsstO2LL1BfUirIEizTm2vlQ+GcYSilNqyYQbOk0Lk1mlNedURcvyQOPhWhOZDtY4dwubJV1BH9XpNkJmyjMWnCcTLvn3mMM6+ymP0CwINJPcaJydNmHGP/rD+YIZj2YjZCZaYu9XkgkfmOmZO61LgHMPoFCTg7dxLp99FcSkVaiyEUpkNbYRMqs3Y0FXMiHzArjQqum/n8lAriAM2dnRONufp5zLZhT1VebVAoj/moXlcrFgDd66FrslThgbNMSnsH5JiJ4TxsxseMU65qQ1wnjuTZiIgGqwJEwHjzUx2nAaf7C+TyWPpY/I2w+JO+TDK3aMI1ttzmZXdpolZNxFvB0z9ESof49k37f4hS0l7pBv+Vx/eRGnWqK0TrMRMhfEZ8WlN4eJiwPLSHkno6JWEj6T6y9s6JHwhQtcCtJMsvdTw6+LX2hMIWS/B8KejD0iUYMKQwgzxPZt3iJMZT2xiZ33VsJNVXp4G6H0WzOso96mDmzuEWE9RKZPFA3WMl6c9JtyWwmJuxBjtqSbo+D6VnKynqeRtgqYENkMxiGKgUOnIHb7Bu2pWwlJICtZcJFGGA3OuWRzLTpZtP5EVFG0SF9GxtfCbrivd7n6gk63bCUUppC3E5Ku1hYWwFTrueZL73T9VdOPgaJY6jT8EB6Id+dhAa9Ecas69w5myXyFtw5Uq4EH8BPb1chLxsd2eg2rRcSkPnhh1r9U9ZecE8LD9l23DYWd37odSWqvVq+IxR0JweVqSLQGur0VXyIN/7xALSRz4pU20R0S+I27YNQCBVeDk2SbHRYNZVa32809i7B7oqv17XqYd2yvdDid9C8v+2k7T6Sd24dKUPexzS1unmeO8/MkbkpyUQ6vFzb76AeWVQIZ9T2rLN7xHJTg7iBjIYX5fbl8Pw9/3n/sASNZZ4F0q6qLkuWYpuMFwrYmM7TZS5En/FsyTftN08A9JYHww0a7w1j3/OYi83K4twvcasg/LGEv2t2QP/oY5cswhM134cZWNqhDfrOXv3AboitNM8zYVjRwiyHLN2OFMkd7wcEtv4ry3V/2JbTdmLiH0JMH8lWy41uAwa06//Z6fX5TKUgIt4yaxQkt07CeHwG6xxcKJtQOTgg3OXp3xESuPJCv+ZstI5RsdPrXRtvNSghB9ZXCVDx+t+CQELaP0qEJP31z9myJm1EBQlitgZQwvilYSAgyCrcMFiyKHVYuuEDYTAsSBv8I4aRo/jx5zg9/FBJ+5CQ0jbANC4RlRFgykwhtsf3uW8+WM/4omh5/FBDCXT/hTk9ZCPs23W6WJzxBhP3AL8UtTQB/OTjh2LGeP32UGBUkhDk6ORHccQJhZJDfkwjjYlqpd8j9vKH5854+Y3vsYsKY0gid8ZcjWppUQmhpwAUHJrTN4uTRF7vbs2V4uQnRdrN5CM9Czy/d0G9vgg73E9hyIWMhYe/o8/PziPcNcm/BbjebkTDcFLYfdmHroISgCK3nK0vckTskvAl8349bGm8yuRSeggmN7IQwaoNoeJ/fgyncKNaKhW3hXxS4KUtjGsOzxSyFT3nyJBFuRHj2dnkpNG4YyXmW5RkHJnyL9n4s8tFvWIf9SVFKKLq2aLtZVJFywsd7W9x78AbuShluSnlYwhsYUcKokbdnoO1ALxX3+MDjmYYjGqFwE0h4Lj5KiQj9uG1+LPvFIqzJQ+7uGW6V7IxB+kIqaYSSP4SBtpt99OP9MJnw5HF+M/l4nB12/9Jwq3LrCqQv7AMLCOHGumUpodyWls/CoWacELT3N9C4RcL3kn00D6Ohw7bSMDx7s0WDN4HbyxpFMzY+BISl3tmZsB8mIoR/DkM2tjCKcJNUwZZNQJrFUsmOD6f3rLEDkoYFWeYOz+8jM+ALMSPsa6VyOeAjdbzdrG3EIu9n/LdWAt6W3nvEwZQOuoOpaTmlt17gOEIG3gLfchyvJO5y/VN0oDy+UffLpgkfEJimuFX+vOw7pmnGpkNOroJo+1tLtt/7/vQ+Hv/0TsL/+RNnR1+zi6tY6cK/XwQlDIWgVwMN9yk+etLOJjPfN57j++zOP2blkm2XZ4f8U0H/ts76b28pu98qKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKf3v6z9a672Ghkn23gAAAABJRU5ErkJggg==" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Tomasz Szmyd</PersonName>
                            <PersonRole>Owner of Young Wolves Agency</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                        <b>Yepp is a tool that significantly speeds up the workflow in our agency.</b> While it won&apos;t fully replace the functions of a marketer, it serves as excellent support in our daily operations. With its ability to create individual customer profiles, we can generate content dedicated to a specific audience based on up-to-date data. We have been working with Yepp since its inception and are confident that any issue we encounter will be promptly resolved by their efficient customer service team.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="data:image/png;base64,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" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Maciej Surgiel</PersonName>
                            <PersonRole>CEO at Fajne Studio Kreatywne</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
        </Section>
        }
        {!mobile && 
        <Section image={testimonialsBackground} mobileImage={mobileBlueMeshBg}>
            <div>
                {!mobile &&
                    <div className="h-36">
                    </div>
                }
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    <b>Yepp AI is a perfect platform for organizations looking to get started with artificial intelligence.</b> This tool effectively guides users through their daily marketing tasks.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://storage.googleapis.com/socialmedia-images-yepp/towerlogo.png" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Szymon Pietkiewicz</PersonName>
                            <PersonRole>CMO at Tower Group</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    <b>No other platform has ever offered us such a comprehensive individual support.</b> They really go an extra mile when it comes to customer success. Definitely a game-changer for our agency and I would recommend it to anyone who is considering using AI in marketing and even other industries.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Stewart Mason</PersonName>
                            <PersonRole>CEO of Apex Media Solutions</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <div>
            <div className="h-24">

            </div>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Yepp AI has proven to be an invaluable support for our marketing agency. Its advanced artificial intelligence technology helps us in managing various aspects of our business efficiently and effectively. <b>The true game-changer lies in its ability to analyze and process vast quantities of data in minimal time.</b> The most important aspect of Yepp is nevertheless the team, which we highly recommend!
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="data:image/png;base64,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" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Tomasz Szmyd</PersonName>
                            <PersonRole>Owner of Young Wolves Agency</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    The power of Yepp AI in processing and utilizing large data sets effectively is unparalleled. The custom chatbot solutions have been particularly impressive, providing our clients with a level of engagement that was previously unattainable. This platform is not just a tool; it&apos;s a strategic partner that has elevated our agency to new heights in the digital marketing world.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://news.microsoft.com/wp-content/uploads/prod/2020/08/MS-Execs-2017-02-Nadella-Satya-Portraits-11-rt-1024x780.jpg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Isabella Lee</PersonName>
                            <PersonRole>Chief Marketing Officer at BrandCrafters</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <div>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                        <b>Yepp is a tool that significantly speeds up the workflow in our agency.</b> While it won&apos;t fully replace the functions of a marketer, it serves as excellent support in our daily operations. With its ability to create individual customer profiles, we can generate content dedicated to a specific audience based on up-to-date data. We have been working with Yepp since its inception and are confident that any issue we encounter will be promptly resolved by their efficient customer service team.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="data:image/png;base64,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" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Maciej Surgiel</PersonName>
                            <PersonRole>CEO at Fajne Studio Kreatywne</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Using Yepp AI? It&apos;s been a game-changer for us, especially with content creation. <b>It&apos;s pretty awesome how it digs into the data we&apos;d have never used and turns it into something useful.</b> We&apos;re talking about chatbots that are way more intuitive, and content generators that just make sense. I&apos;ve seen a real boost in how our customers interact with us and the overall impact on our campaigns. For anyone focusing on data-driven marketing, Yepp AI&apos;s been a solid addition for us.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://i.insider.com/5e1deef5f44231754a600e73?width=1136&format=jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Artur Kaczmarek</PersonName>
                            <PersonRole>CEO at Prime Start</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Adopting Yepp AI was a pivotal move for our brand. The platform&apos;s exceptional ability to process and utilize large volumes of data has enabled us to gain deeper insights into our market. This has been crucial in developing chatbots and other interactive tools that offer our customers a personalized and engaging experience. Yepp AI is not just a platform; it&apos;s a revolution in customer engagement.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://yt3.googleusercontent.com/xGH1BCpEHp4V0hRXEpKUbudZy2zxon3z7JnnAXngiW-8374wuiFolwYf6wmgVbKr-_RmqBHJrA=s900-c-k-c0x00ffffff-no-rj" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Alex Hormozi</PersonName>
                            <PersonRole>CEO Acquisition.com</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <Fade></Fade>
        </Section>
        }
        </>
    )
}

export default TestimonialsSection;

const Section = styled.div<Section>`
    margin-top: -11.5rem;
    position: relative;
    background-image: url(${props => props.image.src});
    width: 100vw;
    padding: 7rem 10rem 7rem 10rem;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 0 95%;
    background-size: 100%;
    overflow-hidden;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 1rem; 
    grid-template-areas: 
      ". . . ."; 
      max-height: 50rem;
      overflow: hidden;
      @media (max-width: 1023px) {
        background-image: url(${props => props.mobileImage.src});
        background-size: 100%;
        width: 100vw;
        max-height: 100%;
        margin-left: 0vw;
        padding: 5vh 5% 10vh 5%;
        margin-top: 2vh;
        display: flex;
        flex-wrap: wrap;
      }
`

const TestimonialContainer = styled.div`
    background-color: white;
    width: 100%;
    height: auto;
    padding: 2.5rem;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-bottom: 2vh;
    @media (max-width: 1023px) {
        box-shadow: 1px 1px 15px 0px rgba(0,0,0,0.12);
    }
`

const TestimonialText = styled.p`
    font-size: 1rem;
    color: rgb(31 41 55);
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const ProfileContainer = styled.div`
    display: grid; 
    grid-template-columns: 0.2fr 1.8fr; 
    grid-template-rows: 1fr; 
    gap: 0.5rem; 
    grid-template-areas: 
    ". ."; 
    margin-top: 1.5rem;
    align-items: center;
    @media (max-width: 1023px) {
        gap: 0.25rem; 
    }
`

const ProfilePicture = styled.div`
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    overflow: hidden;
    position: relative;
    box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.15);
    @media (max-width: 1023px) {
        height: 3rem;
        width: 3rem;
    }
    
`

const PersonName = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 1rem;
    font-weight: 500;
    @media (max-width: 1023px) {
        font-size: 1rem;
        margin-left: 1rem;
    }
`

const PersonRole = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 0.75rem;
    color: #818FB9;
    @media (max-width: 1023px) {
        font-size: 0.8rem;
        margin-left: 1rem;
    }
`

const Fade = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15rem;
    background: linear-gradient(rgb(242, 242, 251, 0) 0%, rgb(242, 242, 251, 0.7) 40%, rgb(242, 242, 251, 1) 90%);
    @media (max-width: 1023px) {
        height: 14rem;
    }
`