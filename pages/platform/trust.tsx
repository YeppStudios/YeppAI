import Centered from "@/components/Centered";
import Footer from "@/components/Landing/Footer";
import LearnMoreSection from "@/components/Landing/LearnMoreSection";
import Navbar from "@/components/Landing/Navbar";
import BlueButton from "@/components/Landing/common/BlueButton";
import GraySection from "@/components/Landing/common/GraySection";
import MainTitle from "@/components/Landing/common/MainTitle";
import MiniTitle from "@/components/Landing/common/MiniTitle";
import Subtitle from "@/components/Landing/common/Subtitle";
import Head from "next/head";
import Masonry from "react-masonry-css";
import styled from "styled-components";

const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    770: 1,
  };
  

const WhatIsYepp = () => {
    return (
        <div>
            <Head>
            <meta name="theme-color" content="#F6F6FB" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                name="description"
                content="Learn how does Yepp protects its clients."
            />
            <title>Yepp AI | Trust</title>
            </Head>
            <Navbar />
            <div className="mt-[6rem] lg:mt-[18rem] w-full flex flex-wrap justify-center">
            <Centered>
            <div className="w-11/12 flex justify-center flex-wrap">
                <Centered><MiniTitle>Why trust Yepp?</MiniTitle></Centered>
                <div className="lg:w-8/12 w-full"><MainTitle>Yepp: Your Trusted Partner</MainTitle></div>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">Ensuring a safe environment for our users is at the core of Yepp&apos;s mission. This is one of many reasons why more than 3,000 users rely on Yepp with their data.</div>
                <Centered>
                    <div className="mt-10">
                    <BlueButton onClick={undefined}><a href="/Yepp_AI_Terms.pdf">View Privacy Policy</a></BlueButton>
                    </div>
                </Centered>
            </div>
            </Centered>
            </div>
            <div className="mt-[10rem]"></div>
            <GraySection>
            <div className="w-full flex justify-center flex-wrap">
                <Subtitle>Ensuring the security of your data is our primary priority.</Subtitle>
                <div className="lg:w-7/12 w-11/12 lg:text-lg text-center text-gray-800 mt-8">At Yepp, data security and privacy is our top priority. It&apos;s integral to our product design and operational security, strengthened by multiple protective layers and proven by key certifications. Discover more on how we safeguard your data.</div>
            </div>
            <div className="lg:px-[10rem] mt-8">
            <SectionsContanier
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName={MasonryColumn}
                style={{ marginTop: "0rem" }}
            >
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Data protection and privacy</div>
                    <p className="mt-4">Yepp employs Pinecone, a vector database designed for AI and machine learning. We use a secure AWS infrastructure, encrypting data during storage and transmission. Pinecone&apos;s robust access control adheres to data protection standards, holds a SOC2 Type II certificate, complies with GDPR, and undergoes regular security reviews.</p>
                </Section>
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Data Management and Storage</div>
                    <p className="mt-4">Yepp establishes its privacy standards and policies based on the General Data Protection Regulation (EU/UK). We actively assist our customers in safeguarding the data subject rights of individuals whose data they handle. Our ISO 27701 certification process is specifically tailored to GDPR requirements</p>
                </Section>
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Infrastructure and Security Measures</div>
                    <p className="mt-4">Yepp utilizes DigitalOcean as our IaaS provider for secure data uploading. Our application is hosted on secure servers with advanced physical and network defenses. These servers are stationed in secure facilities, equipped with strict access control and surveillance. They are protected by DDoS prevention methods and have strictly regulated employee access, ensuring ultimate user data security.</p>
                </Section>
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Cloud Hosting</div>
                    <p className="mt-4">Yepp uses Heroku for secure web hosting. Heroku&apos;s advanced practices ensure application and client data isolation. With fast security updates that require no client intervention, it&apos;s hosted within Amazon&apos;s secure data centers. These adhere to ISO 27001, SOC 1 and SOC 2/SSAE 16/ISAE 3402, PCI Level 1, FISMA Moderate, and SOX standards, attesting to a high level of data security.</p>
                </Section>
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Authorization Security</div>
                    <p className="mt-4">Yepp employs JSON Web Token (JWT) as the primary method for authentication and access control. After a user logs in, they receive a JWT, which must be attached to their HTTP request headers to access protected resources. This digitally signed token is verified by the server, ensuring data integrity during transmission. With JWT authorization, only users with a valid token linked to their account can access resources in our application, providing an additional layer of data protection.</p>
                </Section>
                <Section className="w-full shadow">
                    <div className="text-xl font-medium pb-3 border-b-2 border-b-gray-100">Privacy & safety features</div>
                    <p className="mt-4">Yepp&apos;s product is a highly customizable platform, allowing users to adapt its features to their operational needs, including detailed governance controls. This adaptable solution seamlessly integrates into any operation, enhancing control, efficiency, and productivity.</p>
                </Section>
            </SectionsContanier>
            </div>
            </GraySection>
            <div className="mt-10"></div>
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


const Section = styled.div`
    width: calc(100% - 1.4rem);
    background: #F6F6FB;
    margin: 1.4rem 0rem 1.4rem 0.75rem;
    border-radius: 20px;
    padding: 2rem 2.4rem 2rem 2.4rem;
`