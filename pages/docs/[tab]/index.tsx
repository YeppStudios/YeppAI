import { useEffect, useState } from "react";
import api from "../../api";
import Loading from '@/components/Common/Loading';
import Sidebar from "@/components/Docs/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ApiDocumentation from "@/components/Docs/ApiDocumentation";
import styled from "styled-components";

const Docs = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [username, setUsername] = useState("");

    const router = useRouter();
    const { tab } = router.query;

    useEffect(() => {
        // localStorage.removeItem("onboarding_token");
        // localStorage.removeItem("token");
        // localStorage.removeItem("user_id");
        const user_name = Cookies.get('username');
        if(user_name){
          setUsername(user_name);
        }
        const validateJWT = async () => {
          const token = localStorage.getItem("token");
          try {
            const { data } = await api.get('/checkJWT', {
              headers: {
                authorization: token
              }
            })
            setLoggedIn(data.valid);
          } catch (e) {
            setLoggedIn(false);
          }
        }
        validateJWT();
      }, []);

    return (
        <div>
            <Loading />
            <Sidebar loggedIn={loggedIn} username={username} tab={tab as string}/>
            <ContentContainer>
              {tab === "api" && <ApiDocumentation />}
            </ContentContainer>
        </div>
    )
}

export default Docs;


const ContentContainer = styled.div`
  width: 100%;
  padding: 4rem 2rem 4rem 22rem;
  height: auto;
`