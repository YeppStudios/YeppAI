import spar from "../../public/images/spar.png"
import sprawny from "../../public/images/sprawnylogo.png"
import ilove from "../../public/images/ilovelogo.png"
import activerse from "../../public/images/activerse.png"
import maxroy from "../../public/images/maxroylogo.png"
import Image from "next/image"
import Centered from "../Centered"
import styled from "styled-components"

const PartnersSection = () => {
    return (
        <div style={{width: "100%"}}>
            <Title>
                Te firmy czerpią już z możliwości Asystenta: 
            </Title>
            <Centered>
                <Partners>
                    {/* <PartnerContainer>
                    <Partner>
                        <Image style={{ width: "auto", height: "100%" }}  src={spar} alt={'preview'}></Image>   
                    </Partner>
                    </PartnerContainer> */}
                    <PartnerContainer>
                    <Partner>
                        <Image style={{ width: "auto", height: "100%" }}  src={sprawny} alt={'preview'}></Image>   
                    </Partner>
                    </PartnerContainer>
                    <PartnerContainer>
                    <Partner>
                        <Image style={{ width: "auto", height: "100%" }}  src={ilove} alt={'preview'}></Image>   
                    </Partner>
                    </PartnerContainer>
                    <PartnerContainer>
                    <Partner>
                        <Image style={{ width: "auto", height: "100%" }}  src={maxroy} alt={'preview'}></Image>   
                    </Partner>
                    </PartnerContainer>
                    <PartnerContainer>
                    <Partner>
                        <Image style={{ width: "auto", height: "100%" }}  src={activerse} alt={'preview'}></Image>   
                    </Partner>
                    </PartnerContainer>
                </Partners>
            </Centered>
        </div>
    )
}

export default PartnersSection;

const Title = styled.p`
    color: #000000;
    font-size: 2vh;
    margin-top: 5vh;
    font-weight: 500;
    text-align: center;
    @media (max-width: 1023px) {
        padding: 0 5vw 0 5vw;
        margin-top: 6vh;
    }
`

const Partners = styled.div`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 4vh;
    @media (max-width: 1023px) {
        width: 100%;
    }
`

const PartnerContainer = styled.div`
    padding: 0rem 2rem 0rem 2rem;
    margin: 0vh 0.5vw 2vh 0.5vw;
    background-color: #F0F3F8;
    height: 5vh;
    display: flex;
    align-items: center;
    border-radius: 10px;
    @media (max-width: 1023px) {
    }
`

const Partner = styled.div`
    width: auto;
    height: 50%;
    position: relative;
    @media (max-width: 1023px) {
    }
`