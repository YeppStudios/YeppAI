import { useEffect, useState } from "react";
import { BsClipboardCheck } from "react-icons/bs";
import styled from "styled-components";

const FeedbackPopover = ({}) => {

    const [mobile, setMobile] = useState(false);
    
    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
          }
    }, []);

    return (
        <>
        {!mobile ?
        <FeedbackDesktopPopover href="https://hiaupnlym0k.typeform.com/to/L7AEQsbe">
                <div style={{whiteSpace: "nowrap", marginRight: "1rem", fontWeight: "500"}}>Feedback</div>
            <FeedbackIcon>
                <BsClipboardCheck style={{width: "100%", height: "auto"}}/>
            </FeedbackIcon>
        </FeedbackDesktopPopover>
        :
        <FeedbackMobilePopover href="https://hiaupnlym0k.typeform.com/to/L7AEQsbe">
            <FeedbackIcon>
                <BsClipboardCheck style={{width: "100%", height: "auto"}}/>
            </FeedbackIcon>
        </FeedbackMobilePopover>
        }
        </>
    )
}

export default FeedbackPopover;

const FeedbackDesktopPopover = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    max-height: 3rem;
    padding: 1rem;
    background-color: #0D0E16;
    border-radius: 15px;
    position: fixed;
    bottom: 1rem;
    right: 0.75rem;
    color: white;
    z-index: 11;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.45);
    }
`

const FeedbackMobilePopover = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    width: 3rem;
    height: 3rem;
    padding: 0rem;
    background-color: #0D0E16;
    border-radius: 15px;
    position: fixed;
    bottom: 1rem;
    left: 0.88rem;
    color: white;
    z-index: 11;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.45);
    }
`

const FeedbackIcon = styled.div`
    width: 1.55rem;
    height: 1.55rem;
    margin-bottom: 0.15rem;
    @media (max-width: 1023px) {
        width: 1.5rem;
        height: 1.5rem;
        margin-bottom: 0rem;
    }
`