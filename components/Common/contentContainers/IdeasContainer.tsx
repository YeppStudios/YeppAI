import styled from "styled-components";
import { BsPencilSquare, BsFiles } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { Remarkable } from 'remarkable';
const md = new Remarkable();

const IdeasContainer = (props: {text: string, ideaProps: any, isSSEComplete: boolean}) => {

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [notification, setNotification] = useState("");

    useAutosizeTextArea(textAreaRef.current, props.text);

    useEffect(() => {
        const refactoredText = props.text.trimStart();
        setText(refactoredText);
    }, [props.text]);


      const handleCopy = () => {
        navigator.clipboard.writeText(text)
          .then(() => {
            setNotification("Copied!");
            setTimeout(() => {
              setNotification("");
            }, 1000);
          })
          .catch(err => {
            setNotification("Something went wrong.");
            console.error(err);
          });
      };

    return (
        <Post>
            <PostHeader>
                <div style={{display: "flex", alignItems: "center"}}>
                    {notification &&
                        <Notification>
                            {notification}
                        </Notification>
                    }
                    <CopyButton onClick={handleCopy}>
                        <BsFiles style={{height: "100%", width: "auto"}}/>
                    </CopyButton>
                </div>
            </PostHeader>
            <PostContent>
            <div dangerouslySetInnerHTML={{ __html: md.render(props.text) }}>
            </div>
            </PostContent>
        </Post>
    )
}

export default IdeasContainer;

const Post = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem;
    line-height: 4vh;
    border-radius: 15px;
    color: black;
    font-weight: 500;
`

const PostHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

const CopyButton = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.5vh;
`

const PostContent = styled.div`
    margin-top: 0vh;
    width: 100%;
    font-size: 1rem;
    border-radius: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    white-space: pre-wrap;
    will-change: transform;
    z-index: 1;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: #6F7890;
    }
    :-ms-input-placeholder {
    color: #6F7890;
    }
    @media (max-width: 1023px) {
        margin-top: 2vh;
    }
`

const Notification = styled.div`
    position: absolute;
    margin-bottom: 8vh;
    font-size: 0.7vw;
    margin-left: -1.8vw;
    padding: 0.1vh 0.5vw 0.1vh 0.5vw;
    border-radius: 10px;
    background-color: #414554;
`

const Title = styled.p`
    font-size: 1.2rem;
    color: white;
    max-width: 80%;
`