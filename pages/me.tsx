import React, { useEffect } from "react";
import PageTemplate from "@/components/Common/PageTemplate";
import api from '@/pages/api';
import dynamic from 'next/dynamic';
const TopPanel = dynamic(() => import("@/components/Me/TopPanel"));
const BottomPanel = dynamic(() => import("@/components/Me/BottomPanel"));
import Loading from "@/components/Common/Loading";
import Head from "next/head";
import { selectedUserState } from "@/store/userSlice";
import { useSelector } from "react-redux";


const Profile = () => {
    const user = useSelector(selectedUserState);

    
    return (
      <>
            <Head>
                <meta name = "theme-color" content = "#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Profile | Yepp AI</title>
                <meta name="description" content="Twój profil i panel zarządzania kontem." />
            </Head> 
            <div>
            <PageTemplate>
              {!user ? 
                  <Loading />
                  :
                  <div style={{width: "100%", height: "calc(100vh -1.5rem)"}}>
                    <TopPanel stats={stats}/>
                    <BottomPanel />
                  </div>
              }
            </PageTemplate>   
            </div>
      </>

    )

  };

 export default Profile;
