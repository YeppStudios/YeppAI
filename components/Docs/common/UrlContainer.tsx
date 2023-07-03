import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import styled from "styled-components";

const UrlContainer = (props: {children: any}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(props.children)
          .then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
              }, 1500);
          })
          .catch(err => {

          });
      };

    return (
        <div style={{display: "flex"}}>
        <Container>
            <p>{props.children}</p>
            <CopyIcon onClick={handleCopy}>
                {copied ?
                <BsCheckLg className="text-green-400" style={{width: "auto", height: "100%"}}/>
                :
                <MdContentCopy style={{width: "auto", height: "100%"}}/>
                }
            </CopyIcon>
        </Container>
        </div>
    )
}

export default UrlContainer;

const Container = styled.div`
    max-width: 100%;
    width: auto;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: 2px solid rgba(232, 236, 246, 1);
    border-radius: 15px;
    display: grid; 
    grid-template-columns: 1.8fr 0.2fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". ."; 
    align-items: center;

`

const CopyIcon = styled.div`
    width: 2.5rem;
    height: 1.1rem;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
`