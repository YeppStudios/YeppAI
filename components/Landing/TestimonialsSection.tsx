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
                    Yepp AI stands out in the crowded field of AI marketing tools thanks to the team&apos;s individual approach to every client. Its robust data processing capabilities and intuitive chatbot creation have <b>empowered us to deliver tailored, impactful marketing strategies for our clients</b>.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Eva Patel</PersonName>
                            <PersonRole>Marketing Manager at Visionary Media</PersonRole>
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
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    At first I was skeptical, but Yepp AI team really lived up to my expectations and truly transformed the way we keep delivering results for our clients in today&apos;s competitive marketing world. Their professional support and their set of AI tools are really shaping the future of marketing. Now I cannot imagine how our work would look like without Yepp AI&apos;s assistance in managing our client&apos;s data and content.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/540367571988389888/I0PmoBNB_400x400.jpeg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Linda Strauss</PersonName>
                            <PersonRole>Project Manager of DigitalOne</PersonRole>
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
                    Yepp AI and its individual approach has revolutionized our marketing. Its ability to process data about our clients enables us to <b>create content that is on point and factual even for niches that require expert knowledge.</b> It has not only increased our client&apos;s content impressions but has also boosted creativity of our teams.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Noah Kim</PersonName>
                            <PersonRole>Marketing Strategy Lead at GrowthGenius</PersonRole>
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
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Implementing Yepp AI has been transformative for our agency. The platform&apos;s sophisticated data handling capabilities have allowed us to unlock the full potential of our client&apos;s data. The personalized chatbot solutions have been a standout, offering our clients a unique way to engage with their audience. It&apos;s been a win-win for us and our clients.
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
                    Integrating Yepp AI into our agency has been a game-changer. Its ability to process and utilize vast amounts of data has transformed how we approach marketing. I&apos;m also a big fan of its UI and UX which definitely stands out in comparison to other tools out there. 
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Ethan Johnson</PersonName>
                            <PersonRole>CEO at Echo Global</PersonRole>
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
                            <PersonRole>CEO at YCombinator</PersonRole>
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
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Yepp AI&apos;s capability to handle massive datasets and turn them into actionable marketing tools is unmatched. The custom solutions, especially the chatbots, are incredibly accurate and relevant, enabling us to deliver precisely targeted campaigns. Our efficiency and client satisfaction have skyrocketed, all thanks to the innovative technology provided by Yepp AI.
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
                    We were drowning in data until we found Yepp AI. Their platform&apos;s capacity to process and utilize our extensive data has been a game-changer. Creating custom chatbots and data-driven campaigns has never been easier. Our clients have noticed the difference, too — <b>our campaigns are more targeted, engaging, and, most importantly, more effective than ever :)</b>
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Laura Garcia</PersonName>
                            <PersonRole>Marketing Head at Orion Strategies</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Yepp AI has been a revelation for us. The ability to upload and harness large sets of data has enabled us to create more sophisticated and responsive marketing strategies. Their AI-driven chatbots have become a cornerstone of our client interaction, providing personalized experiences at scale. The depth of insights and efficiency we&apos;ve gained is a testament to Yepp AI&apos;s amazing technology. Definitely a must-have for all marketing agencies.
                    </TestimonialText>
                    <ProfileContainer>
                        <ProfilePicture>
                            <Image layout='fill' objectFit='cover'  src="https://pbs.twimg.com/profile_images/1256841238298292232/ycqwaMI2_400x400.jpg" alt={'preview'}></Image> 
                        </ProfilePicture>
                        <div>
                            <PersonName>Leon Matter</PersonName>
                            <PersonRole>CEO at DigitalG</PersonRole>
                        </div>
                    </ProfileContainer>
                </TestimonialContainer>
                </SlideBottom>
                <SlideBottom>
                <TestimonialContainer>
                    <TestimonialText>
                    Yepp AI has been a phenomenal addition to our marketing toolkit. Its ability to process and intelligently utilize large amounts of data has opened up new avenues for creative and effective marketing. The chatbots and other AI-driven tools have significantly enhanced our customer interactions, making our campaigns more dynamic and impactful. Yepp AI is a breakthrough in data-driven marketing solutions.
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
                    As a fast-paced marketing agency, the ability to quickly process large data sets is crucial. Yepp AI has exceeded our expectations in this regard. Their platform has not only streamlined our data analysis but also enhanced our client interactions through smart chatbot solutions. It&apos;s like having an extra team of data scientists at our disposal.
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
        max-height: 140vh;
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
        font-size: 1.1rem;
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
    align-items: center;
`

const ProfilePicture = styled.div`
    border-radius: 50%;
    height: 4.5vh;
    width: 4.5vh;
    overflow: hidden;
    position: relative;
    @media (max-width: 1023px) {
        height: 2rem;
        width: 2rem;
        margin-right: 1rem;
    }
    
`

const PersonName = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 1.75vh;
    @media (max-width: 1023px) {
        font-size: 0.9rem;
        margin-left: 1rem;
    }
`

const PersonRole = styled.p`
    width: 100%;
    text-align: left;
    margin-left: 1vw;
    font-size: 1.5vh;
    color: #818FB9;
    @media (max-width: 1023px) {
        font-size: 0.75rem;
        margin-left: 1rem;
    }
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