import PageTemplate from "@/components/Common/PageTemplate";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import Section from "@/components/Marketing/Section";
const EmailCreationPage = dynamic(() => import("@/components/Marketing/creationPages/EmailCreationPage"));
const LongContentCreationPage = dynamic(() => import("@/components/Marketing/creationPages/LongContentCreationPage"));
const ProductCreationPage = dynamic(() => import("@/components/Marketing/creationPages/ProductCreationPage"));
const SocialMediaCreationPage = dynamic(() => import("@/components/Marketing/creationPages/SocialMediaCreationPage"));
const SavedContentSidebar = dynamic(() => import("@/components/Marketing/SavedContentSidebar"));
const EnhanceTextCreationPage = dynamic(() => import("@/components/Marketing/creationPages/EnhanceTextCreationPage"));
const FrameworkCreationPage = dynamic(() => import("@/components/Marketing/creationPages/FrameworkCreationPage"));
import { useRouter } from 'next/router';
import facebookIcon from "../public/images/facebook-color.png";
import instagramIcon from "../public/images/instagram-color.png";
import linkedinIcon from "../public/images/linkedin-color.png";
import twitterIcon from "../public/images/twitter-color.png";
import konspektIcon from "../public/images/konspekt-icon.png";
import articleIcon from "../public/images/article-icon.png";
import newsletterIcon from "../public/images/newsletter-icon.png";
import aidaIcon from "../public/images/aida-logo.png";
import pressIcon from "../public/images/press-icon.png";
import pasIcon from "../public/images/pas-logo.png";
import babIcon from "../public/images/bab-logo.png";
import ideaIcon from "../public/images/ideas-icon.png";
import enhanceIcon from "../public/images/enhance-icon.png";
import emailIcon from "../public/images/email-icon.png";
import amazonLogo from "../public/images/amazon-logo.png";
import allegroLogo from "../public/images/allegro-logo.png";
import googleLogo from "../public/images/google-logo.png";
import Head from "next/head";
import Masonry from 'react-masonry-css'
import { BsPersonFillAdd, BsBookmarkStarFill, BsFillArchiveFill } from "react-icons/bs";
import { selectedPlanState } from "@/store/planSlice";
import { useSelector } from "react-redux";
import IdeasCreationPage from "@/components/Marketing/creationPages/IdeasCreationPage";
import { idea } from "react-syntax-highlighter/dist/esm/styles/hljs";

const breakpointColumnsObj = {
  default: 4,
  2000: 3,
  1250: 2,
  770: 1
}


const sections = [
    {
      image: facebookIcon,
      title: "Post na Facebooka",
      description: "Wciągające posty na Facebooka w zaledwie kilka sekund.",
      creatorType: "social-media",
      type: "Facebook",
      id: "panel-facebook"
    },
    {
      image: instagramIcon,
      title: "Post na Instagrama",
      description: "Wciągające posty na Instagrama w zaledwie kilka sekund.",
      creatorType: "social-media",
      type: "Instagram",
      id: "panel-instagram"
    },
    {
      image: linkedinIcon,
      title: "Post na LinkedIn",
      description: "Wciągające posty na LinkedIn'a w zaledwie kilka sekund.",
      creatorType: "social-media",
      type: "LinkedIn",
      id: "panel-linkedin"
    },
    {
      image: twitterIcon,
      title: "Tweet",
      description: "Przykuwające uwagę tweety w zaledwie kilka sekund.",
      creatorType: "social-media",
      type: "Twitter",
      id: "panel-twitter"
    },
    {
      image: googleLogo,
      title: "Reklama Google",
      description: "Unikatowe opisy pod Twoje produkty czy też usługi.",
      creatorType: "product-description",
      type: "google-ads",
      id: "panel-googleAds"
    },
    {
      image: articleIcon,
      title: "Artykuł Tematyczny",
      description: "Unikatowy artykuł zgodny z SEO na dowolny temat.",
      creatorType: "blogs-and-articles",
      type: "article-section",
      id: "panel-article"
    },
    {
      image: pressIcon,
      title: "Komunikat prasowy",
      description: "Unikatowy komunikat prasowy na dowolny temat.",
      creatorType: "blogs-and-articles",
      type: "press-release",
      id: "press-release"
    },
    {
      image: emailIcon,
      title: "Email Marketingowy",
      description: "Maile przedstawiające produkt i usługę w mgnieniu oka.",
      creatorType: "newsletters-and-emails",
      type: "email",
      id: "panel-email"
    },
    {
      image: newsletterIcon,
      title: "Newsletter",
      description: "Newsletter, który wciągnie twoich czyteliników w kilka sekund.",
      creatorType: "newsletters-and-emails",
      type: "newsletter",
      id: "panel-newsletter"
    },
    {
      image: konspektIcon,
      title: "Konspekt Artykułu",
      description: "Unikatowy konspekt artykułu na dowolny temat.",
      creatorType: "blogs-and-articles",
      type: "article-conspect",
      id: "panel-article-conspect"
    },
    {
      image: konspektIcon,
      title: "Konspekt Newslettera",
      description: "Unikatowy konspekt bloga na dowolny temat.",
      creatorType: "newsletters-and-emails",
      type: "newsletter-conspect",
      id: "panel-newsletter-conspect"
    },
    {
      image: amazonLogo,
      title: "Opis produktu - Amazon",
      description: "Unikatowe opisy szyte na miare pod twoje produkty na Amazona.",
      creatorType: "product-description",
      type: "amazon",
      id: "panel-amazon"
    },
    {
      image: allegroLogo,
      title: "Opis produktu - Allegro",
      description: "Unikatowe opisy szyte na miare pod twoje produkty na Allegro.",
      creatorType: "product-description",
      type: "allegro",
      id: "panel-allegro"
    },
    {
      image: aidaIcon,
      title: "AIDA Framework",
      description: "Uwaga, zainteresowanie, pragnienie i działanie w reklamie.",
      creatorType: "frameworks",
      type: "AIDA",
      id: "framework-aida"
    },
    {
      image: pasIcon,
      title: "PAS Framework",
      description: "Zidentyfikuj i rozwiąż problem, który rozwiązuje produkt lub usługa.",
      creatorType: "frameworks",
      type: "PAS",
      id: "framework-pas"
    },
    {
      image: babIcon,
      title: "BAB Framework",
      description: "Szczegółowe porównanie przed i po skorzystaniu z usługi/produktu.",
      creatorType: "frameworks",
      type: "BAB",
      id: "framework-bab"
    },
    {
      image: enhanceIcon,
      title: "Poprawienie Treści",
      description: "Wklej treść i napisz co chcesz poprawić, a uzyskasz unikatowy tekst.",
      creatorType: "enhance",
      type: "Ulepszenie Treści",
      id: "content-enhance"
    },
    {
      image: ideaIcon,
      title: "Kreatywny Pomysł",
      description: "Wklej treść i napisz co chcesz poprawić, a uzyskasz unikatowy tekst.",
      creatorType: "ideas",
      type: "Wygenerowanie Pomysłów",
      id: "ideas"
    }
]


const ContentCreator = () => {

  const [currentPage, setCurrentPage] = useState("menu")
  const [mobile, setMobile] = useState(false);
  const [openSaved, setOpenSaved] = useState(false);
  const userPlan = useSelector(selectedPlanState);
  const router = useRouter();

  const { query } = router;

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    if(query.page){
      setCurrentPage(query.page as string);
    }
  }, [query])

  const back = () => {
    if(query.contentId){
      router.back();
    } else {
      router.push(`/marketing/?page=menu`);
    }
  }

  const handleOpenSaved = () => {
    setOpenSaved(!openSaved);
  }

  const renderSections = () => {
    const fetchedSections = sections.map((section) => {
      return (
        <div id={section.id} key={section.title} onClick={() => router.push(`/marketing/?page=${section.creatorType}&type=${section.type}`)}>
          <Section image={section.image} title={section.title} description={section.description}></Section>
        </div>
      );
    });
    return (
    <SectionsContanier  
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName={MasonryColumn} 
      style={{ marginTop: "0rem" }}>
    {fetchedSections}
    </SectionsContanier>
    )
    }
  

  return (
    <>
    <SavedContentSidebar setOpen={handleOpenSaved} open={openSaved} />
    <PageTemplate userProfiles={[]}>
      <Head>
          <title>Kreator Treści | Asystent AI</title>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="description" content="Kreuj unikatowe treści jak maile, posty, artykuły i opisy w zaledwie kilka sekund." />
      </Head>
      <PageContainer>
        {currentPage == "menu" &&
        <Header>
          <div>
          <PageTitle>Marketer AI</PageTitle>
          <PageDescription>Wykorzystaj potencjał AI w marketingu.</PageDescription>
          </div>
          <ActionContaienr>
            <ActionBtn onClick={() => setOpenSaved(true)} square={true}>
              <ActionBtnIcon><BsBookmarkStarFill style={{width: "auto", height: "100%"}}/></ActionBtnIcon>
            </ActionBtn>
            {(userPlan && userPlan._id !== "647895cf404e31bfe8753398") &&
            <ActionBtn onClick={() => router.push("/assets")} square={true}>
              <ActionBtnIcon><BsFillArchiveFill style={{width: "auto", height: "100%"}}/></ActionBtnIcon>
            </ActionBtn>
            }
          </ActionContaienr>
        </Header>
        }
        {currentPage === "social-media" && <SocialMediaCreationPage back={back} query={query} />}
        {currentPage === "product-description" && <ProductCreationPage back={back} query={query}/>}
        {currentPage === "blogs-and-articles" && <LongContentCreationPage back={back} query={query}/>}
        {currentPage === "newsletters-and-emails" && <EmailCreationPage back={back} query={query}/>}
        {currentPage === "frameworks" && <FrameworkCreationPage back={back} query={query}/>}
        {currentPage === "enhance" && <EnhanceTextCreationPage back={back} query={query}/>}
        {currentPage === "ideas" && <IdeasCreationPage back={back} query={query}/>}
        {currentPage === "menu" &&
          renderSections()
        }
      </PageContainer>
    </PageTemplate>
    </>
  )
}

export default ContentCreator;

const PageContainer = styled.div`
  min-height: calc(100vh - 1.5rem);
  align-items: center;
  border: 2px solid #EAEDF5;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
  width: 100%;
  border-radius: 25px;
  padding: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 1023px) {
    width: 100%;
    display: block;
    position: relative;
    border: none;
    overflow-x: hidden;
    background-color: transparent;
    align-items: flex-start;
    min-height: 100vh;
    padding: 0rem 0rem 4rem 0em;
    box-shadow: none;
    margin-bottom: 4rem;
  }
`

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

const PageTitle = styled.h1`
  color: black;
  font-size: 2.4rem;
  font-weight: 700;
  width: 100%;
  @media (max-width: 1023px) {
    font-size: 2rem;
  }
`
const PageDescription = styled.p`
  color: black;
  font-size: 1.2rem;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`
const MasonryColumn = styled.div`
  background-clip: padding-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #EAEDF5;
  padding-bottom: 2rem;
  @media (max-width: 1023px) {
    display: flex;
    padding-left: 1.5rem;
    padding: 1rem 1rem 2rem 1.5rem;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    margin-top: 1rem;
    flex-wrap: wrap;
  }
`


const ActionContaienr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
  }
`

const ActionBtn = styled.div<{square: boolean}>`
    padding: ${props => props.square ? "1rem 1.2rem" : "1rem 1.2rem"};
    margin-left: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border: 2px solid #EAEDF5;
    border-radius: 15px;
    box-shadow: 0px 2px 5px rgba(15, 27, 40, 0.1);
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: scale(0.95);
    }
    @media (max-width: 1023px) {
      margin-left: 0;
      margin-right: 0.75rem;
      margin-top: 1rem;
    }
`

const ActionBtnIcon = styled.div`
    width: 1.2rem;
    height: 1.2rem;
`
const BtnText = styled.p`
    font-weight: 700;
    margin-left: 1rem;
    font-size: 0.75rem;
`