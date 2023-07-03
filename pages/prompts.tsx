import Centered from "@/components/Centered";
import Logo from "@/components/Landing/Logo";
import PageTemplate from "@/components/Common/PageTemplate";
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import blackLogo from "../public/images/logo_black.png";
import { BsSunglasses, BsHeart, BsHeartFill, BsSearch, BsFillBarChartFill, BsPlayFill, BsArrowRight, BsArrowLeft, BsFillEnvelopeFill, BsFillEaselFill, BsFillEmojiLaughingFill, BsApple, BsReverseListColumnsReverse, BsFillPhoneFill, BsCreditCardFill, BsFillPersonPlusFill, BsBuildingFill, BsLightbulbFill, BsCaretUpFill } from "react-icons/bs";
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react";
import SlideBottom from "@/components/Animated/SlideBottomView";
import ChatSidebar from "@/components/Prompts/ChatSidebar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import api from "./api";
import ideasIcon from "../public/images/ideasIcon.png";
import analyticsIcon from "../public/images/analyticsIcon.png";
import brandingIcon from "../public/images/brandingIcon.png";
import clientIcon from "../public/images/clientIcon.png";
import companyIcon from "../public/images/companyIcon.png";
import copywritingIcon from "../public/images/copywritingIcon.png";
import emailIcon from "../public/images/emailIcon.png";
import magnetIcon from "../public/images/magnetIcon.png";
import salesIcon from "../public/images/salesIcon.png";
import socialsIcon from "../public/images/socialsIcon.png";
import strategyIcon from "../public/images/strategyIcon.png";
import seoIcon from "../public/images/seoIcon.png";
import actIcon from "../public/images/actIcon.png";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/Common/Loaders";
import { useRouter } from "next/router";
import BackBtn from "@/components/Common/BackBtn";
import BackBtnIcon from "@/components/Common/BackBtnIcon";
import BackBtnText from "@/components/Common/BackBtnText";
import backIcon from "../public/images/backArrow.png";
import Head from "next/head";
import { selectAssistantState, setSelectedAssistant } from "../store/assistantSlice";
import { selectedWorkspaceCompanyState } from "@/store/workspaceCompany";
import { useSelector, useDispatch } from "react-redux";
interface Prompt {
  _id: string;
  title: string,
  text: string,
  category: string,
  hashtags: Array<string>,
  author: string,
  likes: Array<string>
}

const categories = [
    {title: "Ulubione", icon:  <BsHeartFill style={{height: "100%", width: "auto"}}/>},
    {title: "Strategia Marketingowa", icon:  <BsFillEaselFill style={{height: "100%", width: "auto"}}/>},
    {title: "Branding", icon:  <BsApple style={{height: "100%", width: "auto"}}/>},
    {title: "Copywriting", icon:  <BsReverseListColumnsReverse style={{height: "100%", width: "auto"}}/>},
    {title: "Email Marketing", icon:  <BsFillEnvelopeFill style={{height: "100%", width: "auto"}}/>},
    {title: "Social Media", icon:  <BsFillPhoneFill style={{height: "100%", width: "auto"}}/>},
    {title: "SEO & SEM", icon:  <BsSearch style={{height: "100%", width: "auto"}}/>},
    {title: "Analityka i Raportowanie", icon:  <BsFillBarChartFill style={{height: "100%", width: "auto"}}/>},
    {title: "Pozyskiwanie Klientów", icon:  <BsFillPersonPlusFill style={{height: "100%", width: "auto"}}/>},
    {title: "Utrzymanie Klientów", icon:  <BsFillEmojiLaughingFill style={{height: "100%", width: "auto"}}/>},
    {title: "Optymalizacja Sprzedaży", icon:  <BsCreditCardFill style={{height: "100%", width: "auto"}}/>},
    {title: "Zachowuj Się Jak...", icon:  <BsSunglasses style={{height: "100%", width: "auto"}}/>},
    {title: "Firma", icon:  <BsBuildingFill style={{height: "100%", width: "auto"}}/>},
    {title: "Pomysły", icon:  <BsLightbulbFill style={{height: "100%", width: "auto"}}/>}
]

const getEmojiForCategory = (category: string): StaticImageData => {
  const emojiMap: Record<string, StaticImageData> = {
    'Pomysły': ideasIcon,
    'Strategia Marketingowa': strategyIcon,
    'Branding': brandingIcon,
    'Copywriting': copywritingIcon,
    'Email Marketing': emailIcon,
    'Social Media': socialsIcon,
    'SEO & SEM': seoIcon,
    'Analityka i Raportowanie': analyticsIcon,
    'Pozyskiwanie Klientów': magnetIcon,
    'Utrzymanie Klientów': clientIcon,
    'Optymalizacja Sprzedaży': salesIcon,
    'Zachowuj Się Jak...': actIcon,
    'Firma': companyIcon,
  };

  return emojiMap[category] || copywritingIcon;
};


const breakpointColumnsObj = {
    default: 4,
    2000: 3,
    1250: 2,
    770: 1
  }

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token, user_id } = context.req.cookies;
    let userResponse = {data: {plan: {}, profiles: []}};
    try {
      userResponse = await api.get(`/users/${user_id}`, {
        headers: {
          authorization: token,
        },
      });
    } catch (e) {
    }
  
    return {
      props: {
        user: userResponse.data,
      },
    };
  };
  

  const defaultAssistant =   {
    _id: "644d511929430f833c5ea281",
    name: "Asystent AI",
    description: "Systemowy Asystent AI z wiedzą o marketingu i copywritingu.",
    category: "marketing",
    prompt: "Nazywasz się: Asystent AI. Jesteś profesjonalnym marketingowcem i copywriterem z wieloletnim doświadczeniem. Pomagasz użytkownikowi we wszelkich działaniach marketingowych jak tworzeniu treści, strategii oraz analizy dotychczasowych działań. Zawsze jesteś uprzejmy i pozytywnie nastawiony.",
    noEmbedPrompt: "`Nazywasz się Asystent AI. Jesteś profesjonalnym marketingowcem i copywriterem z wieloletnim doświadczeniem. Pomagasz użytkownikowi we wszelkich działaniach marketingowych jak tworzeniu treści, strategii oraz analizy dotychczasowych działań. Zawsze jesteś uprzejmy i pozytywnie nastawiony.",
    folders: [],
    documents: []
}

const PromptsBrowser = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    const [loading, setLoading] = useState<boolean>(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const [ref, inView] = useInView();
    const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [timer, setTimer] = useState<any>()
    const [mobile, setMobile] = useState(false);
    const [assistants, setAssistants] = useState<any[]>([defaultAssistant]);
    const workspaceCompany = useSelector(selectedWorkspaceCompanyState)

    const dispatch = useDispatch();

    const fetchAssistants = async () => {
      const workspace = localStorage.getItem("workspace");
      const fetchedAssistants = await api.get(`/getUserAssistants/${workspaceCompany._id}`, {
          headers: {
              Authorization: `${localStorage.getItem("token")}`,
          },
      });
        setAssistants(fetchedAssistants.data.assistants.concat(assistants));
        dispatch(setSelectedAssistant(fetchedAssistants.data.assistants[0]));
    }

    useEffect(() => {
        const workspace = localStorage.getItem("workspace");
        if (workspace && workspace !== "undefined" && workspaceCompany._id) {
            fetchAssistants();
        }
    }, [workspaceCompany]);

    const router = useRouter();
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
          }
    }, []);
  
    const fetchPrompts = async (category: string | null, loadmore: boolean | null, searchTerm: string | null) => {
      setLoading(true);
      try {
        let endpoint = `/getPrompts?page=${page}&limit=20`;
        if (category) {
          endpoint += `&category=${category}`;
        }
        if (searchTerm) {
          endpoint += `&searchTerm=${searchTerm}`;
        }

        const { data } = await api.get(endpoint);
        const newPrompts = await data;

        if (newPrompts.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPrompts((prevPrompts) => [...prevPrompts, ...newPrompts]);
        if(loadmore){
          setPage(page + 1);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    
    const fetchLikes = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const { data } = await api.get(`/user/${userId}/likedPrompts`, {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            }
          });
          setLikedPrompts(new Set(data.map((prompt: { _id: any; }) => prompt._id)));
        } catch (error) {
          console.error('Error fetching liked prompts:', error);
        }
      }
    };

    const openFavoritesCategory = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        try {
          const { data } = await api.get(`/user/${userId}/likedPrompts`, {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            }
          });
          setPrompts(data)
        } catch (error) {
          console.error('Error fetching liked prompts:', error);
        }
      }
    }
    
    useEffect(() => {
      fetchLikes();
    }, []);
    
    useEffect(() => {
      if (inView && !loading) {
        fetchPrompts(selectedCategory, true, null);
      }
    }, [inView]);
    

    const handleLike = async (promptId: string) => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await api.patch(`/prompts/${promptId}/like`, null, {
          headers: {
            authorization: token
          }
        });
        // Toggle the liked prompt ID in the likedPrompts state
        setLikedPrompts((prevLikedPrompts) => {
          const newLikedPrompts = new Set(prevLikedPrompts);
          if (newLikedPrompts.has(promptId)) {
            newLikedPrompts.delete(promptId);
          } else {
            newLikedPrompts.add(promptId);
          }
          return newLikedPrompts;
        });
    
        // Update the liked prompt in the local state
        setPrompts((prevPrompts) =>
          prevPrompts.map((prompt) => {
            if (prompt._id === promptId) {
              // Update the prompt.likes array based on the response data
              return data.prompt;
            } else {
              return prompt;
            }
          })
        );
      } catch (error) {
        console.error('Error liking prompt:', error);
      }
    };
    
    const handleCategoryClick = (categoryTitle: string) => {
      if (selectedCategory === categoryTitle) {
        setSelectedCategory('');
      }  else {
        setSelectedCategory(categoryTitle);
      }
    };

    useEffect(() => {
      if (selectedCategory && selectedCategory !== "Ulubione") {
        setPage(1);
        setPrompts([]);
        fetchPrompts(selectedCategory, false, null);
      } else if (selectedCategory === "Ulubione"){
        setPage(1);
        setPrompts([]);
        openFavoritesCategory();
      } else {
        setPage(1);
        setPrompts([]);
        fetchPrompts(null, false, null);
      }
    }, [selectedCategory]);


    const delayedSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
      clearTimeout(timer);
      setTimer(setTimeout(async () => {
        if (searchTerm) {
          setSelectedCategory("");
          setPage(1);
          setPrompts([]);
          fetchPrompts(null, false, searchTerm);
        } else {
          setSelectedCategory("");
          setPage(1);
          setPrompts([]);
          fetchPrompts(null, false, null);
        }
      }, 700))
    };
    

    const triggerOpenSidebar = (prompt: string) => {
      setSelectedPrompt(prompt);
      setOpenSidebar(!openSidebar);
    }

    const handleScrollTop = () => {
      const contactSection = document.getElementById("searchbar")!;
      contactSection.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const renderCategories = () => {
      const renderedCategories = categories.map((category) => {
        if (category.title === selectedCategory){
          return (
            <SelectedCategory key={category.title} onClick={() => handleCategoryClick(category.title)}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              {category.title}
            </SelectedCategory>
          )
        } else {
          return (
            <Category key={category.title} onClick={() => handleCategoryClick(category.title)}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              {category.title}
            </Category>
          )
        }
        });
      return <Categories>{renderedCategories}</Categories>;
    };
    
    const renderPrompts = () => {
      let renderedPrompts;
      if (prompts) {
        renderedPrompts = prompts.map((prompt) => {
          return (
            <SlideBottom key={prompt.title}>
            <HeartBtn onClick={() => handleLike(prompt._id)}>
              {likedPrompts.has(prompt._id) ? (
                <BsHeartFill style={{ width: "auto", height: "100%" }} />
              ) : (
                <BsHeart style={{ width: "auto", height: "100%" }} />
              )}
            </HeartBtn>
            <PromptContainer>
              <Centered>
                <div onClick={(e) => e.stopPropagation()}>
                  <PromptIcon onClick={() => triggerOpenSidebar(prompt.text)}>
                    <Image
                      style={{ width: "auto", height: "100%" }}
                      src={getEmojiForCategory(prompt.category)}
                      alt={"logo"}
                    ></Image>
                  </PromptIcon>
                </div>
              </Centered>
              <div style={{ width: "100%" }} onClick={(e) => e.stopPropagation()}>
                <Centered>
                  <PromptTitle onClick={() => triggerOpenSidebar(prompt.text)}>
                    {prompt.title}
                  </PromptTitle>
                </Centered>
              </div>
              <Centered>
                <div onClick={(e) => e.stopPropagation()}>
                  <PromptDescription onClick={() => triggerOpenSidebar(prompt.text)}>
                    {prompt.text}
                  </PromptDescription>
                </div>
              </Centered>
              <PromptHashtags>
                {prompt.hashtags.map((tag, index) => (
                  <PromptHashtag key={index}>{tag}</PromptHashtag>
                ))}
              </PromptHashtags>
              <Centered>
                <div onClick={(e) => e.stopPropagation()}>
                  <PromptSubmit onClick={() => triggerOpenSidebar(prompt.text)}>
                    <PromptSubmitIcon>
                      <BsPlayFill style={{ width: "auto", height: "100%" }} />
                    </PromptSubmitIcon>
                  </PromptSubmit>
                </div>
              </Centered>
            </PromptContainer>
          </SlideBottom>
          )

      });
      }
      return (
        <Prompts
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName={MasonryColumn}
        >
        {renderedPrompts}
      </Prompts>
      );
    };
    

    return (
        <PageTemplate userProfiles={[]} >
        <Head>
          <title>Wyszukiwarka Poleceń | Asystent AI</title>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Odkryj największą listę przygotowanych promptów do sztucznej inteligencji w formie wyszukiwarki." />
        </Head>
          <Page onClick={() => setOpenSidebar(false)}>
          <Centered>
            <Searchbar id="searchbar">
                <div style={{display: "flex", alignItems: "center"}}>
                <LogoContainer>
                    <Image style={{ width: "auto", height: "100%" }}  src={blackLogo} alt={'icon'}></Image> 
                </LogoContainer>
                <AppName>Wyszukiwarka AI</AppName>
                </div>
                <Slogan>Wybieraj spośród 1000+ najefektywniejszych poleceń</Slogan>
                <InputContainer>
                    <Input value={searchTerm} onChange={(e) => delayedSearch(e.target.value)} type="text" placeholder="Wyszukaj polecenia..."/>
                    <SubmitBtn>
                        <SubmitBtnIcon>
                            <BsSearch style={{ width: "auto", height: "100%" }}/>
                        </SubmitBtnIcon>
                    </SubmitBtn>
                </InputContainer>
                {renderCategories()}
            </Searchbar>
            </Centered>
            <PromptsContainer  id="prompts">
            {renderPrompts()}
            <Centered>
              {hasMore &&
                <PageNavigation ref={ref}>
                  <Loader color="black"/>
                </PageNavigation>
                }
            </Centered>
            </PromptsContainer>
            {page > 2 &&
            <div style={{position: "fixed", right: "2vw", bottom: "2vh"}}>
              <UpButton onClick={handleScrollTop}><BsCaretUpFill style={{ width: "auto", height: "100%" }} /></UpButton>
            </div>
            }
            <ChatSidebar open={openSidebar} onClose={() => setOpenSidebar(false)} user={user} selectedPrompt={selectedPrompt} assistants={assistants} setAssistants={setAssistants}/>
            </Page>
        </PageTemplate>
    )
}

export default PromptsBrowser;

const Page = styled.div`
  height: 100%;
  min-height: calc(100vh - 1.5rem);
  background: white;
  width: calc(100% - 1.4rem);
  margin-left: 0.7vw;
  border-radius: 25px;
  margin-bottom: 5rem;
  padding: 0 1.5rem 1.5rem 1.5rem;
  @media (max-width: 1023px) {
    overflow-y: scroll;
    background: transparent;
    align-items: flex-start;
    margin-left: 0;
    width: 100%;
    overflow: visible;
    padding: 0;
    padding-top: 2vh;
    box-shadow: none;
    margin-bottom: 4rem;
  }
`

const BackBtnNav = styled.div`
  width: 100vw:
  height: 2vh;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0vh 0 1vh 0;
  position: fixed;
  backdrop-filter: blur(10px);
`

const Searchbar = styled(motion.div)`
    width: 70vw;
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
      width: 95vw;
      background: white;
      padding: 1.5rem 0 1.5rem 0;
      border-radius: 20px;
      margin-top: 0;
      box-shadow: 0px 4px 10px rgba(15, 27, 40, 0.15);
    }
`

const PromptsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 3vh;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
      padding-top: 0;
    }
`


const LogoContainer = styled(motion.div)`
  width: 6vh;
  cursor: pointer;
  height: 6vh;
  @media (max-width: 1023px) {
    position: relative;
    display: flex;
    width: 4.5vh;
    height: 4.5vh;
    justify-content: center;
    margin-top: 0rem;
    right: 0rem;
  }
`

const AppName = styled(motion.h1)`
  color: black;
  font-size: 5.4vh;
  margin-left: 1vw;
  font-weight: 900;
  @media (max-width: 1023px) {
    margin-left: 3vw;
    font-size: 4.5vh;
  }
`

const Slogan = styled(motion.p)`
  width: 100%;
  text-align: center;
  font-size: 3vh;
  margin-top: 2vh;
  color: black;
`

const Input = styled.input`
  width: 45vw;
  height: 3rem;
  padding-left: 1vw;
  background-color: rgba(255, 255, 255, 0.1);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  backdrop-filter: blur(15px);
  box-shadow: inset 2px 2px 4px rgba(15, 27, 40, 0.23), inset -2px -2px 4px #FAFBFF;
  border: 2px solid #E5E8F0;
  color: black;
  font-weight: 500;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #A7ACBC;
    font-weight: 200;
    font-style: italic;
  }
  :-ms-input-placeholder {
    color: #A7ACBC;
    font-weight: 200;
    font-style: italic;
  }
  @media (max-width: 1023px) {
    padding-left: 3vw;
    width: 70vw;
  }
`
const SubmitBtnIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
      width: 1.2rem;
      height: 1.2rem;
    }
`

const SubmitBtn = styled.div`
  width: 8vh;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  background-color: #0D0E16;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    transform: scale(0.95);
    box-shadow: 4px 4px 20px rgba(255, 255, 255, 0.35);
  }
`

const InputContainer = styled.form`
  margin-top: 2vh;
  display: flex;
`

const Categories = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5vh;
  @media (max-width: 1023px) {
    width: 100vw;
  }
`

const Category = styled.div`
  display: flex;
  align-items: center;
  margin: 1vh 0.3vw 0.5vh 0.3vw;
  padding: 1vh 1vw 1vh 1vw;
  border-radius: 7px;
  background: #F3F7FA;
  cursor: pointer;
  transition: all 0.4s ease;
  color: black;
  &:hover {
      background-color: rgba(255, 255, 255, 0.25);
      box-shadow: none;
      transform: scale(0.95);
      background: #EEF1FA;
  }
  @media (max-width: 1023px) {
    padding: 1.2vh 2vh 1.2vh 2vh;
    font-weight: 500;
    font-size: 1.5vh;
    margin: 1vh 0.5vh 0.5vh 0.5vh;
  }
`

const SelectedCategory = styled.div`
  display: flex;
  align-items: center;
  margin: 1vh 0.3vw 0.5vh 0.3vw;
  padding: 1vh 1vw 1vh 1vw;
  border-radius: 7px;
  border: double 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: inset 3px 3px 5px rgba(22, 27, 29, 0.23), inset -3px -3px 5px #FAFBFF;
  transition: all 0.4s ease;
  color: black;
  @media (max-width: 1023px) {
    padding: 1vh 1vh 1vh 1vh;
    font-size: 1.5vh;
    margin: 1vh 0.5vh 0.5vh 0.5vh;
  }
`

const CategoryIcon = styled.div`
  width: 2vh;
  height: 2vh;
  margin-right: 0.7vw;
  @media (max-width: 1023px) {
    margin-right: 1.4vw;
  }
`

const Prompts = styled(Masonry)`
  display: flex;
  width: 90%;
  justify-content: center;
  margin-bottom: 7vh;
  @media (max-width: 1023px) {
    width: 100%;
  }
`
const PromptContainer = styled.div`
  border-radius: 25px;
  padding: 4vh;
  backdrop-filter: blur(15px);
  box-shadow: 7px 7px 15px rgba(15, 27, 40, 0.23), -7px -7px 15px #FAFBFF;
  border: 2px solid #E5E8F0;
  margin: 1.4rem 1.4rem 1.4rem 1.4rem;
  background-color: white;
  width: calc(100% - 1.7rem);
  display: flex;
  position: relative;
  flex-wrap: wrap;
  color: black;
  @media (max-width: 1023px) {
    width: 100%;
    margin: 1.75rem 0 1.75rem 0;
  }
`

const MasonryColumn = styled.div`
  background-clip: padding-box;
  padding: 0 0.7rem;
`;

const PromptIcon = styled.div`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin-top: 1rem;
`

const PromptTitle = styled.div`
  width: 90%;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 0.5rem;
  cursor: pointer;
  line-height: 2rem;
  height: auto;
  padding: 0.7rem 0 0.7rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1023px) {
    font-size: 3vh;
  }
`

const PromptDescription = styled.div`
  width: 95%;
  margin-top: 1vh;
  cursor: pointer;
  text-align: center;
`

const PromptHashtags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5vh;
`

const PromptHashtag = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    margin: 0.3rem 0.2rem 0.3rem 0.2rem;
    padding: 0.7vh 1rem 0.7vh 1rem;
    border-radius: 5px;
    backdrop-filter: blur(15px);
    background-color: #E9ECF1;
    cursor: pointer;
    transition: all 0.4s ease;
`

const PromptSubmit = styled.button`
    padding: 1vh;
    border-radius: 50%;
    background: linear-gradient(45deg, #6578F8, #64B5FF);
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF;
    margin-top: 2vh;
    transition: all 0.4s ease;
    color: white;
    &:hover {
        transform: scale(0.95);
        box-shadow: none;
      }
`

const PromptSubmitIcon = styled.div`
    width: 3vh;
    height: 3vh;
    border-radius: 50%;
    background: linear-gradient(#6578F8, #64B5FF);
`

const PageNavigation = styled.div`
    margin-bottom: 10vh;
    display: flex;
`

const HeartBtn = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 2.5rem;
    width: 1.2rem;
    color: black;
    height: 1.2rem;
    z-index: 1;
    cursor: pointer;
    @media (max-width: 1023px) {
      top: 1.5rem; 
      right: 1.5rem;
      width: 1.25rem;
      height: 1.25rem;
    }
`

const UpButton = styled.button`
  width: 5vh;
  height: 5vh;
  padding: 1vh;
  border-radius: 50%;
  background: linear-gradient(45deg, #E497FF, #7EC5FF);
  margin-top: 2vh;
  transition: all 0.4s ease;
  &:hover {
      transform: scale(1.15);
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.45);
    }
  @media (max-width: 1023px) {
    width: 7vh;
    height: 7vh;
    padding: 1.2vh;
  }
`