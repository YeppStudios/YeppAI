import styled from "styled-components";
import testimonialsBackground from "../../public/images/testimonialsBackground.png";
import mobileBlueMeshBg from "../../public/images/mobileBlueMeshBg.png";
import Image from "next/image";
import Centered from "../Centered";
import SlideBottom from "../Animated/SlideBottom";
import { useEffect, useState } from "react";


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
        <h2 className="lg:text-[4vw] text-3xl font-medium leading-tight">Voices of innovation</h2>
        <p className='lg:w-10/12 text-gray-800 lg:mt-8 mt-4 lg:text-lg'>How Yepp is changing the marketing game? Discover the impact in our clients&apos; words.</p>
        </div>
        <Section image={testimonialsBackground} mobileImage={mobileBlueMeshBg}>
            <div>
                {!mobile &&
                    <div className="h-36">
                    </div>
                }
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://cdn.galleries.smcloud.net/t/galleries/gf-Lo7G-QqzF-U7Lx_steve-jobs-nie-zyje-664x442-nocrop.png" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Steve Jobs</PersonName>
                            <PersonRole>Former Apple CEO</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <div>
            {!mobile &&
            <div className="h-36">

            </div>
            }
            {!mobile &&
            <div className="mt-10">
            </div>
            }
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/472421066007015424/MHUJj15g_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://news.microsoft.com/wp-content/uploads/prod/2020/08/MS-Execs-2017-02-Nadella-Satya-Portraits-11-rt-1024x780.jpg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <div>
            {!mobile &&
                <div className="mt-10">
                </div>
            }
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://v.wpimg.pl/QUJDREVGfjQrJiR2eTxzIWh-cCw_ZX13P2ZoZ3lxY2EyazQsOiIjMDorfCIkMiE0PTR8NTpoMCUjayR0eSM4JjooMzx5Ijw3LyB9dTN1NzAsJWRoN3NjZ2dwNnU0amk3f3B_IWR_NzdyIjZ0biVgdzc" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Elon Musk</PersonName>
                            <PersonRole>CEO at SpaceX, Tesla</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://i.insider.com/5e1deef5f44231754a600e73?width=1136&format=jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur.
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
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <div>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Alex Hormozi</PersonName>
                            <PersonRole>CEO Acquisition.com</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur.
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
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                        Świetna inicjatywa. Unikatowe rozwiązanie dla małych i średnich przedsiębiorstw jeśli chodzi o zwiększenie widoczności w internecie bez zatrudniania całego działu marketingu.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Michael Seibel</PersonName>
                            <PersonRole>CEO at YCombinator</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
            </div>
            <Fade></Fade>
        </Section>
        </>
    )
}

export default TestimonialsSection;

const Section = styled.div<Section>`
    margin-top: -11.5rem;
    position: relative;
    background-image: url(${props => props.image.src});
    width: 100vw;
    padding: 12vh 10rem 12vh 10rem;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 0 95%;
    background-size: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-template-rows: 1fr; 
    gap: 1.2vh; 
    grid-template-areas: 
      ". . . ."; 
      max-height: 110vh;
      overflow: hidden;
      @media (max-width: 1023px) {
        background-image: url(${props => props.mobileImage.src});
        background-size: 100%;
        width: 100vw;
        max-height: 150vh;
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
    padding: 3vh 3vh 3vh 3vh;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-bottom: 1.2vh;
`

const TestimonialText = styled.p`
    font-size: 1.8vh;
    color: rgb(31 41 55);
    @media (max-width: 1023px) {
        font-size: 1rem;
    }
`

const ProfileContainer = styled.div`
    display: grid; 
    grid-template-columns: 5vh 1.5fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". ."; 
    margin-top: 3vh;
`

const ProfilePicture = styled.div`
    border-radius: 50%;
    height: 4.5vh;
    width: 4.5vh;
    overflow: hidden;
    position: relative;
    
`

const PersonName = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 1.75vh;
`

const PersonRole = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 1.5vh;
    color: #818FB9;
`

const Fade = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20rem;
    background: linear-gradient(rgb(242, 242, 251, 0) 0%, rgb(242, 242, 251, 0.7) 40%, rgb(242, 242, 251, 1) 90%);
    @media (max-width: 1023px) {
        height: 14rem;
    }
`