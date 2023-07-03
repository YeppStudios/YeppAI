import styled from "styled-components";
import thinArrow from "../../public/images/thinArrow.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CustomColor {
    color: string
}

const LearnMore = (props: {color: string}) => {

    const [link, setLink] = useState("/pricing");
    const [mobile, setMobile] = useState(false);

    return (
        <Link href={link}>
        <LearnMoreContainer color={props.color}>
            <LearnMoreText>Sprawdź pełną ofertę</LearnMoreText>
            <LearnMoreArrow>
                <Image style={{ width: "auto", height: "100%" }}  src={thinArrow} alt={'arrow'}></Image> 
            </LearnMoreArrow>
        </LearnMoreContainer>
        </Link>
    )
}

export default LearnMore;

const LearnMoreContainer = styled.div<CustomColor>`
    color: ${props => props.color || '#000000'};
    display: flex;
    margin-top: 3vh;
    align-items: center;
    cursor: pointer;
    @media (max-width: 1023px) {
        width: 100%;
        justify-content: center;
    }
`

const LearnMoreText = styled.div`
    font-size: 1.75vh;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    @media (max-width: 1023px) {
        font-size: 2vh;
    }
`

const LearnMoreArrow = styled.div`
    height: 1vh;
    margin-left: 1.5vw;
`