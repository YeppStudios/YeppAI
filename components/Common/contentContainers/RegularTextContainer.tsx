import styled from "styled-components";
import { BsPencilSquare, BsFiles, BsArrowRepeat, BsCheckLg } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLike, AiOutlineCopy, AiFillLike } from "react-icons/ai";
import facebookIcon from "../../../public/images/facebook-color.png";
import instagramIcon from "../../../public/images/instagram-color.png";
import linkedinIcon from "../../../public/images/linkedin-color.png";
import twitterIcon from "../../../public/images/twitter-color.png";
import labelIcon from "../../../public/images/label-icon.png";
import konspektIcon from "../../../public/images/konspekt-icon.png";
import articleIcon from "../../../public/images/article-icon.png";
import newsletterIcon from "../../../public/images/newsletter-icon.png";
import aidaIcon from "../../../public/images/aida-logo.png";
import pasIcon from "../../../public/images/pas-logo.png";
import babIcon from "../../../public/images/bab-logo.png";
import enganceIcon from "../../../public/images/enhance-icon.png";
import pressIcon from "../../../public/images/press-icon.png";
import emailIcon from "../../../public/images/email-icon.png";
import amazonLogo from "../../../public/images/amazon-logo.png";
import allegroLogo from "../../../public/images/allegro-logo.png";
import googleLogo from "../../../public/images/google-logo.png";
import moment from 'moment';
import api from "@/pages/api";
import { selectedMarketingAssistantState } from "@/store/marketingAssistantSlice";
import { useSelector, useDispatch } from "react-redux";
interface Background {
    image: any
}


const RegularTextContainer = (props: {text: string, prompt: string | undefined, category: string, query: any, user: any, isSSEComplete: boolean}) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [notification, setNotification] = useState("");
    const [profilePic, setProfilePic] = useState<any>();
    const [mobile, setMobile] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showSavedIcon, setShowSavedIcon] = useState(false);
    const [disableLike, setDisableLike] = useState(false);
    const selectedAssistant = useSelector(selectedMarketingAssistantState);


    useEffect(() => {
        if (textAreaRef) {
            if(textAreaRef.current){
                textAreaRef.current.style.height = "0px";
                const scrollHeight = textAreaRef.current.scrollHeight;
                textAreaRef.current.style.height = scrollHeight + "px";
            }
        }
    }, [text, props.text]);
      
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
        let profileIcon;
        if (props.category === "Facebook-post"){
            profileIcon = facebookIcon;
        } else if (props.category === "Instagram-post") {
            profileIcon = instagramIcon;
        } else if (props.category === "LinkedIn-post") {
            profileIcon = linkedinIcon;
        } else if (props.category === "Twitter-post") {
            profileIcon = twitterIcon;
        } else if (props.category === "google-ads") {
            profileIcon = googleLogo;
        } else if (props.category.includes("conspect")) {
            profileIcon = konspektIcon;
        } else if (props.category === "article-section") {
            profileIcon = articleIcon;
        } else if (props.category === "email") {
            profileIcon = emailIcon;
        } else if (props.category === "newsletter") {
            profileIcon = newsletterIcon;
        } else if (props.category === "amazon") {
            profileIcon = amazonLogo;
        } else if (props.category === "allegro") {
            profileIcon = allegroLogo;
        } else if (props.category === "PAS"){
            profileIcon =pasIcon;
        } else if (props.category === "AIDA") {
            profileIcon = aidaIcon;
        } else if (props.category === "BAB") {
            profileIcon = babIcon;
        } else if (props.category === "press-release") {
            profileIcon = pressIcon;
        } else if (props.category === "content-enhance") {
            profileIcon = enganceIcon;
        } 
        setProfilePic(profileIcon);
    }, []);

    useEffect(() => {
        const refactoredText = props.text.trimStart();
        setText(refactoredText);
    }, [props.text]);

    const like = async () => {
        setLiked(!liked);
        if(!liked && !disableLike && props.isSSEComplete && props.prompt){
            setShowSavedIcon(true);
            const token = localStorage.getItem("token");
            try {
                await api.post("addContent", {
                    text,
                    prompt: props.prompt,
                    category: props.category,
                    savedBy: props.user._id
                }, {
                    headers: {
                        authorization: token
                      }
                })
                setTimeout(() => {
                    setShowSavedIcon(false);
                  }, 1000);
            } catch (e) {
                console.log(e)
            }
            setDisableLike(true);
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setText(val);
      };

      const handleCopy = () => {
        navigator.clipboard.writeText(text)
          .then(() => {
            setNotification("Copied!");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          })
          .catch(err => {
            setNotification("Something went wrong...");
            console.error(err);
          });
      };

    return (
        <Post>
            <PostHeader>
                <div style={{display: "flex"}}>
                    {profilePic ?
                        <ProfileImage image={profilePic} /> 
                        :
                        <FakeProfile></FakeProfile>
                    }
                    <div>
                        {selectedAssistant ? <CompanyName>{selectedAssistant.name}</CompanyName> : <CompanyName>{props.user.name}</CompanyName>}
                        <Date>{moment().format('DD MMMM YYYY HH:mm')}</Date>
                    </div>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    {notification &&
                        <Notification>
                            {notification}
                        </Notification>
                    }
                    {/* <LikeIcon onClick={() => like()}>
                        {liked ?
                            <AiFillLike style={{width: "100%", height: "100%"}}/>
                            :
                            <AiOutlineLike style={{width: "100%", height: "100%"}}/>
                        }

                    </LikeIcon> */}
                    <CopyIcon onClick={handleCopy}>
                        <AiOutlineCopy style={{width: "100%", height: "100%"}}/>
                    </CopyIcon>
                    {!props.query.contentId &&
                        showSavedIcon ?
                            <SaveBtn>
                                <BsCheckLg style={{fontSize: "1.5em"}} className="text-green-400"/>
                            </SaveBtn>
                        :
                        <SaveBtn onClick={() => like()}><MoreIcon><FiDownload style={{width: "100%", height: "100%"}} /></MoreIcon> {!mobile && <MoreText>Save</MoreText>}</SaveBtn>
                        
                    }  
                </div>
            </PostHeader>
            {
            props.isSSEComplete ? 
                <PostContentForm
                ref={textAreaRef}
                value={text}
                onChange={handleChange}
                ></PostContentForm>
            : 
                <PostContent>{text}</PostContent>
            }
        </Post>
    )
}

export default RegularTextContainer;

const Post = styled.div`
    width: 100%;
    height: auto;
    padding: 1.5rem;
    border-radius: 15px;
    background-color: white;
    margin: 0rem 0 0rem 0;
    box-shadow: inset 3px 3px 10px rgba(22, 27, 29, 0.23), inset -3px -3px 10px #FAFBFF;
    color: black;
`

const PostHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const ProfileImage = styled.div<Background>`
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 10px;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const FakeProfile = styled.div`
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    background-color: #313545;
`


const CompanyName = styled.p`
    font-weight: 500;
    margin-left: 1rem;
    font-size: 1.2rem;
`

const Date = styled.p`
    margin-left: 1rem;
    color: #6F7890;
    font-size: 0.8em;
    margin-top: 0rem;
`

const CopyIcon = styled.button`
    width: 2.7vh;
    height: 2.7vh;
    margin-left: 1vw;
    color: rgba(0, 0, 0, 0.75);
    @media (max-width: 1023px) {
        margin-left: 4vw;
        width: 3.4vh;
        height: 3.4vh;
    }
`

const LikeIcon = styled.button`
    width: 3.2vh;
    height: 3.2vh;
    margin-left: 1vw;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.12);
    }
    @media (max-width: 1023px) {
        margin-left: 4vw;
        width: 3.5vh;
        height: 3.5vh;
    }
`

const SaveBtn = styled.button`
    width: 7rem;
    height: 2rem;
    border-radius: 10px;
    border: none;
    font-size: 0.8em;
    font-weight: 500;
    margin-left: 1rem;
    background-color: #ECECEC;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
    @media (max-width: 1023px) {
        width: auto;
        padding: 0 1rem 0 1rem;
    }
`

const MoreText = styled.div`
    margin-left: 0.4rem;
`

const PostContent = styled.div`
    margin-top: 3vh;
    width: 100%;
    font-size: 1rem;
    border-radius: 10px;
    background-color: transparent;
    color: black;
    border: none;
    outline: none;
    resize: none;
    font-weight: 500;
    z-index: 1;
    @media (max-width: 1023px) {
        margin-top: 4vh;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #6F7890;
    }
    :-ms-input-placeholder {
    color: #6F7890;
    }
    &::-webkit-scrollbar {
        display: none;
    }
    white-space: pre-wrap;
    will-change: transform;
`

const PostContentForm = styled.textarea`
    margin-top: 3vh;
    width: 100%;
    font-size: 1rem;
    border-radius: 10px;
    background-color: transparent;
    color: black;
    font-weight: 500;
    height: auto;
    border: none;
    outline: none;
    resize: none;
    z-index: 1;
    @media (max-width: 1023px) {
        margin-top: 4vh;
    }
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #6F7890;
    }
    :-ms-input-placeholder {
    color: #6F7890;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`


const Notification = styled.div`
    position: absolute;
    margin-bottom: 8vh;
    width: 5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7vw;
    border-radius: 10px;
    background-color: #414554;
    color: white;
    @media (max-width: 1023px) {
        font-size: 0.5rem;
    }
`

const MoreIcon = styled.div`
    width: 1rem;
    height: 1rem;
`

