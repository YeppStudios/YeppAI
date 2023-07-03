import styled from "styled-components";
import { BsArrowRepeat, BsFiles } from "react-icons/bs";
import { useEffect, useState } from "react";

interface Background {
    image: any
}

const GeneratedPost = (props: {text: string, generateMore: any, username: string}) => {

    const [text, setText] = useState("");
    const [notification, setNotification] = useState("");
    const [mobile, setMobile] = useState(false);
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const refactoredText = props.text.trimStart();
        setText(refactoredText);

        if(window.innerWidth <= 1023){
            setMobile(true);
          }

          const profile = localStorage.getItem("profile");
          if(profile){
              const profileJSON = JSON.parse(profile);
              setProfilePic(profileJSON.image)
          }
    }, [props.text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
          .then(() => {
            setNotification("Skopiowane!");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          })
          .catch(err => {
            setNotification("Failed to copy text.");
            console.error(err);
          });
      };


    return (
        <Post>
            <PostHeader>
                <div style={{display: "flex"}}>
                    {profilePic ?
                        <ProfileImage image={profilePic}>
                        </ProfileImage>  
                        :
                        <FakeProfile>
                        </FakeProfile>         
                    }
                    <div>
                        <CompanyName>{props.username}</CompanyName>
                        <Date>07 lipca o 07:07</Date>
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                {notification &&
                        <Notification>
                            {notification}
                        </Notification>
                    }
                    <CopyButton onClick={handleCopy}>
                        <BsFiles />
                    </CopyButton>
                <MoreButton onClick={props.generateMore}>
                    <MoreIcon><BsArrowRepeat style={{width: "100%", height: "100%"}} /></MoreIcon> {!mobile && <MoreText>Więcej jak ten</MoreText>}
                </MoreButton>
                </div>
            </PostHeader>
            <PostContent>
                {props.text}
            </PostContent>
        </Post>
    )
}

export default GeneratedPost;

const Post = styled.div`
    width: 90%;
    padding: 1.5rem;
    border-radius: 15px;
    background-color: #222127;
    margin: 2rem 0 0rem 0;
    box-shadow: inset 0 4px 4px 1px rgb(0, 0, 0, 0.2);
    @media (max-width: 1023px) {
        background-color: #17171E;
    } 
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
    background-color: #313545;
    background-image: url(${props => props.image});
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
    margin-top: 0.1rem;
`

const CopyButton = styled.button`

`

const MoreButton = styled.button`
    width: 10rem;
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
    box-shadow: 4px 4px 25px rgba(57, 97, 255, 0.25);
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        box-shadow: none;
        transform: scale(0.9);
    }
    @media (max-width: 1023px) {
        width: auto;
        padding: 0 1rem 0 1rem;
    }
`

const MoreText = styled.div`
    margin-left: 0.4rem;
`

const PostContent = styled.p`
    font-size: 1em;
    margin-top: 1.5rem;
    white-space: pre-wrap;
`

const Notification = styled.div`
    position: absolute;
    margin-bottom: 8vh;
    font-size: 0.7vw;
    margin-left: -1.8vw;
    padding: 0.3vw 0.5vw 0.3vw 0.5vw;
    border-radius: 10px;
    background-color: #414554;
    @media (max-width: 1023px) {
        font-size: 1.7vh;
        padding: 0.3vh 0.5vh 0.3vh 0.5vh;
        margin-left: -6vw;
        margin-bottom: 10vh;
    }
`

const MoreIcon = styled.div`
    width: 1rem;
    height: 1rem;
`