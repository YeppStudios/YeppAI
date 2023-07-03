import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MultiLineSkeletonLoader from "./MultilineSkeletonLoader";

export default function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
          url !== router.asPath;
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          setLoading(true);
        }
        const handleComplete = (url:string) => {
          url === router.asPath
          document.body.style.overflow = 'auto';
          document.body.style.position = 'static';
          setLoading(false);
        };

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    
    if (loading) {
        return  (
            <BlurBackground>
              <LoaderContainer>
                <MultiLineSkeletonLoader lines={6} justifyContent="center" />
              </LoaderContainer>
            </BlurBackground>
        );
    } else {
        return null;
    }

}

const BlurBackground = styled.div`
display: flex;
position: fixed;
min-height: calc(100vh - 1.5rem);
flex-wrap: wrap;
justify-content: center;
border: 2px solid #EAEDF5;
z-index: 10;
border-radius: 20px;
box-shadow: 2px 2px 10px rgba(15, 27, 40, 0.15);
background: white;
width: calc(100% - 5.75rem);
border-radius: 25px;
margin: 0.75rem 1rem 0.75rem 5.5rem;
right: 0rem;
@media (max-width: 1023px) {
  width: 100%;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;
  padding-top: 2vh;
  box-shadow: none;
  background: transparent;
  margin-bottom: 4rem;
}
`

const LoaderContainer = styled.div`
    width: 35rem;
    margin-top: 10rem;

`