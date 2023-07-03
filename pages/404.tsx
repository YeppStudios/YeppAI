import Centered from "@/components/Centered";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import meshBackground from "../public/images/delicateBackground-2.png";

interface Background {
    image: any,
  }

const ErrorPage = () => {
    return (
        <div>
        <Head>
          <title>Strona Nie Istnieje....</title>
          <meta name="description" content="Taka strona nie istnieje. Wróć na stronę główną." />
        </Head>
        <ErrorBackground>
            <ErrorContainer>
                <Centered>
                    <ErrorHeader>Ta strona nie istnieje :(</ErrorHeader>
                </Centered>
                <Centered>
                    <Link href="/"><Comeback>Wróć na stronę główną</Comeback></Link>
                </Centered>
            </ErrorContainer>
        </ErrorBackground>
      </div>
    )
}

export default ErrorPage;

const ErrorBackground = styled.div`
height: 100vh;
width: 100vw;
overflow: scroll;
display: flex;
align-items: center;
flex-wrap: wrap;
justify-content: center;
@media (max-width: 1023px) {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  margin-right: 0;
  padding-left: 0vw;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
`

const ErrorContainer = styled.div`
    width: 40vw;
    padding: 4vh;
    margin: 1.2rem 0.7rem 1.2rem 0.7rem;
    display: flex;
    flex-wrap: wrap;
    border-radius: 30px;
    @media (max-width: 1023px) {
        width: 95vw;
    }
`

const ErrorHeader = styled.h2`
    text-align: center;
    font-size: 2rem;
    font-family: 'Satoshi', sans-serif;
    font-weight: 700;
    @media (max-width: 1023px) {
        font-size: 1.6rem;
    }
`

const Comeback = styled.div`
    margin-top: 2rem;
    cursor: pointer;
    backdrop-filter: blur(15px);
    box-shadow: inset 4px 4px 20px rgba(255, 255, 255, 0.35);
    border-radius: 15px;
    padding: 1rem 2.5rem 1rem 2.5rem;
    transition: all 0.4s ease;
    &:hover {
        transform: scale(1.1);
    }
`