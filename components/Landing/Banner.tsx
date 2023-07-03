import styled from "styled-components";
import Centered from "../Centered";
import nofificationIcon from "../../public/images/notificationIcon.png";
import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import BusinessSignupModal from "../Modals/OnboardingModals/BusinessSignupModal";

const Banner = () => {

    const router = useRouter();
    const [openBusinessSignup, setOpenBusinessSignup] = useState(false);

    return (
        <Centered>
            {openBusinessSignup && <BusinessSignupModal  onClose={() => setOpenBusinessSignup(false)}/>}
            <BannerContainer>
                <NofificationIcon>
                    <Image style={{ width: "auto", height: "100%" }}  src={nofificationIcon} alt={'nofification-icon'}></Image> 
                </NofificationIcon>
                <div>
                    <NotificationTitle>Umów indywidualną prezentację rozwiązania.</NotificationTitle>
                    <NotificationDescription>W 45 minut przedstawimy Ci AI z wiedzą o Twojej firmie oraz odpowiemy na nurtujące Cię pytania.</NotificationDescription>
                </div>
                <ReservationContainer>
                    <ReservationBtn id="conference-registration-banner-btn" href="https://calendly.com/asystentai/asystent-business-konsultacja">
                        <BtnImage>
                            <FaRegCalendarAlt style={{width: "100%", height: "auto"}} />
                        </BtnImage>
                        Umów spotkanie
                    </ReservationBtn>

                </ReservationContainer>
            </BannerContainer>
        </Centered>
    )
}

export default Banner;

const BannerContainer = styled.div`
    width: 100%;
    background-color: #0D0E16;
    padding: 2rem 2rem 2rem 2rem;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 5px 5px 10px rgba(15, 27, 40, 0.23);
    margin-bottom: 2vh;
    display: grid; 
    grid-template-columns: 0.15fr 2fr 0.75fr; 
    grid-template-rows: 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      ". . ."; 
    align-items: center;
    justify-content: space-between;
    @media (max-width: 1023px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-bottom: 2.4rem;
        text-align: center;
    }
`

const NofificationIcon = styled.div`
    width: 3rem;
    height: 3rem;
    position: relative;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        display: none;
    }
`

const NotificationTitle = styled.div`
    font-size: 1.75rem;
    color: white;
    font-weight: 700;
    margin-left: 1.75rem;
    margin-top: -0.2rem;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        margin-left: 0;
        margin-top: 0;
    }
`

const NotificationDescription = styled.div`
    font-size: 1rem;
    margin-top: 0rem;
    color: white;
    font-weight: 200;
    margin-left: 1.75rem;
    @media (max-width: 1023px) {
        margin-bottom: 1rem;
        margin-left: 0;
    }
`

const ReservationBtn = styled.a`
    width: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 3px transparent;
    border-radius: 15px;
    box-shadow: inset 2px 2px 6px rgba(22, 27, 29, 0.23), inset -1px -1px 4px #FAFBFF, 1px 1px 3px rgba(22, 27, 29, 0.23);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    position: relative;
    color: white;
    font-weight: 500;
    padding: 0.5rem 1.2rem 0.5rem 1.2rem;
    background: linear-gradient(40deg, #6578F8, #64B5FF);
    background-size: 110%;
    background-position-x: -1rem;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        margin-left: 0rem;
        margin-top: 1rem;
    }
`

const ReservationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    @media (max-width: 1023px) {
        justify-content: center;
    }
`

const BtnImage = styled.div`
    width: 1rem;
    margin-right: 0.7rem;
`