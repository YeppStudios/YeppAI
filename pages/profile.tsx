import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/Common/PageTemplate";
import api from '@/pages/api';
import dynamic from 'next/dynamic';
const TopPanel = dynamic(() => import("@/components/Profile/TopPanel"));
const BottomPanel = dynamic(() => import("@/components/Profile/BottomPanel"));
import Loading from "@/components/Common/Loading";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { selectedUserState } from "@/store/userSlice";
import FeedbackPopover from "@/components/Common/FeedbackPopover";
import { useSelector } from "react-redux";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, user_id } = context.req.cookies;
  let statsResponse = {data: {}};
  try {
    statsResponse = await api.get(`/stats/${user_id}`, {
      headers: {
        authorization: token
      }
    });
  } catch (e) {
  }

  return {
    props: {
      stats: statsResponse.data,
    },
  };
};


const Profile = ({ stats }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const user = useSelector(selectedUserState);
    
    return (
      <>
            <Head>
                <meta name = "theme-color" content = "#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Profil | Asystent AI</title>
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
