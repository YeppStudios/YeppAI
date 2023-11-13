import SlideBottom from "@/components/Animated/SlideBottom";
import Centered from "@/components/Centered";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import Navbar from "@/components/Landing/Navbar";
import Image from "next/image";
import MainTitle from "@/components/Landing/common/MainTitle";
import arrowIcon from "../../public/images/arroe_gradient.png";
import Masonry from "react-masonry-css";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

const WhatIsYepp = () => {
    return (
        <div>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Discover frequently asked questions about our platform."
                />
                <title>Yepp AI | FAQ</title>
            </Head>
            <Navbar />
            <div className="mt-[6rem] lg:mt-[12rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="w-11/12 flex justify-center flex-wrap">
                <div className="w-9/12"><MainTitle>Frequently Asked Questions About Yepp’s Marketing Intelligence Platform</MainTitle></div>
            </div>
            </Centered>
            </div>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[10rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">What is Yepp?</h2>
                    <p className="mt-6 text-lg">Yepp is the #1 marketing intelligence platform for marketing teams and agencies. It helps you make the most of content & strategy creation and by customizing AI to your specific needs. It understands your company&apos;s data, tone, and buyer persona, so you can generate personalized content at scale and increase your conversion rates.</p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">How does Yepp work?</h2>
                    <div className="mt-12 grid grid-cols-2 grid-rows-2 gap-8 p-10">
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">1</div>
                            <h3 className="text-xl font-medium mt-4">Fine-Tune LLM</h3>
                            <p className="mt-4 text-lg">Through fine-tuning the large language model, we effectively train AI with your company&apos;s data, providing you with a hyper-personalized platform that boosts your team&apos;s efficiency right from day one.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">2</div>
                            <h3 className="text-xl font-medium mt-4">Manage</h3>
                            <p className="mt-4 text-lg">Efficiently organize your team, assign team members to specific tasks, and closely monitor the execution of your strategy with the comprehensive project overview.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">3</div>
                            <h3 className="text-xl font-medium mt-4">Create</h3>
                            <p className="mt-4 text-lg">Whether it&apos;s content or concept you need to create, you craft them at lightning speed, all while enjoying the benefits of a customized LLM.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">4</div>
                            <h3 className="text-xl font-medium mt-4">Share</h3>
                            <p className="mt-4 text-lg">Once your project is ready, effortlessly schedule its publication using the integrated calendar and share it with your client for seamless collaboration.</p>
                        </div>
                    </div>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">Who is Yepp for?</h2>
                    <p className="mt-6 text-lg">Yepp is best for marketing teams and agencies aiming to enhance the effectiveness of their campaign efforts. Here are the roles we most commonly support:</p>
                    <div className="mt-12 grid grid-cols-2 grid-rows-2 gap-8 p-10">
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">1</div>
                            <h3 className="text-xl font-medium mt-4">Marketing Leaders</h3>
                            <p className="mt-4 text-lg">Yepp provides a comprehensive view of your team&apos;s content and strategy work while allowing you to assign projects to specific team members.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">2</div>
                            <h3 className="text-xl font-medium mt-4">Copywriters</h3>
                            <p className="mt-4 text-lg">Each piece of content is enriched by the creative flair of the platform, making it unique and engaging.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">3</div>
                            <h3 className="text-xl font-medium mt-4">Project Managers</h3>
                            <p className="mt-4 text-lg">By integrating data and creativity, Yepp empowers you with highly effective campaign strategies and analyzes their performance comprehensively.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">4</div>
                            <h3 className="text-xl font-medium mt-4">SEO Specialists</h3>
                            <p className="mt-4 text-lg">By harnessing a data-driven approach and activating SEO features, you streamline the creation of top-ranking content pieces.</p>
                        </div>
                        <div>
                            <div className="w-8 h-8 rounded-full border-black border-2 flex justify-center items-center text-black font-semibold">5</div>
                            <h3 className="text-xl font-medium mt-4">Social Media Managers</h3>
                            <p className="mt-4 text-lg">With Yepp&apos;s campaign feature, creating multi-platform social media content is a breeze.</p>
                        </div>
                    </div>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">What problems does Yepp address?</h2>
                    <div className="p-10">
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Limited manpower and expertise to meet increasing demands.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Managing project execution and overseeing team performance.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Extracting valuable insights from extensive data for effective decision-making.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Lack of personalization and content uniqueness when using AI and automation.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Identifying a unique value proposition (UVP) when competing with rivals.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Maintaining high levels of customer retention and loyalty.</p>
                        </div>
                        <div className="flex gap-6 items-center mt-4">
                            <div className="w-2 h-3">
                            <Image src={arrowIcon} alt="arrow icon" className="w-full" />
                            </div>
                            <p className="text-lg">Guiding customers throughout the entire purchase journey.</p>
                        </div>
                    </div>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">What kind of company makes a good customer for Yepp?</h2>
                    <p className="mt-6 text-lg">Marketing Agencies and Marketing Teams in Mid-Size and Enterprise companies, focused on content creation and strategy development, who need to automate and scale their workflow.</p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">How secure is my data?</h2>
                    <p className="mt-6 text-lg">Yepp offers the highest level of security to all customers. The platform is compliant with SOC2 Type II and adheres strictly to General Data Protection Regulation (GDPR) standards. Data during storage and transmission is encrypted via a secure AWS infrastructure. As an additional layer of data protection Yepp uses JSON Web Token (JWT) for authentication and access control.</p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">Is the generated content truly unique?</h2>
                    <p className="mt-6 text-lg">Certainly, Yepp generates genuinely unique content. It combines data-driven methods with creative flair to craft distinctive and impactful material. Instead of repurposing existing content, it builds upon your unique data, ensuring originality and depth in every topic.</p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">Who holds the legal ownership rights to the content produced on Yepp?</h2>
                    <p className="mt-6 text-lg">The content created on Yepp is legally owned by the users who create it. This means that anytime you use Yepp to generate content, you hold the full ownership rights to that content. 
                    <br />
                    Our commitment to user data and ownership rights is one of the many reasons why users trust us with their content creation needs.
                    </p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">Can I try the platform before buying it?</h2>
                    <p className="mt-6 text-lg">Absolutely! To enrich your trial experience, we arrange a discovery call to understand your team&apos;s needs and provide initial platform customization, maximizing the effectiveness of your free trial period.</p>
                </div>
            </div>
            </SlideBottom>
            <SlideBottom>
            <div className="lg:px-[10rem] mt-[2rem] w-full">
                <div className="rounded-3xl bg-[#F2F2FB] shadow p-10">
                    <h2 className="text-3xl font-medium">How much does Yepp cost?</h2>
                    <p className="mt-6 text-lg">Yepp pricing is custom-made, based on the LLM fine-tuning requirements, features you wish to use, as well as the number of users you want to give access to.</p>
                    <p className="mt-4"><Link href="/demo" className="text-blue-500">Request more information</Link> and our sales representative will discuss your team’s specific needs and prepare an estimated offer value during the scheduled meeting.</p>
                </div>
            </div>
            </SlideBottom>
            <Footer />
        </div>
    )
}


export default WhatIsYepp;


const SectionsContanier = styled(Masonry)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 1rem 0rem 3rem 0rem;
    @media (max-width: 1023px) {
    padding: 0vh 0 2vh 0vw;
    width: 100vw;
    }
`

const MasonryColumn = styled.div`
  background-clip: padding-box;
`;
