import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import React, { useEffect, useState } from "react";
import LoginModal from '../Modals/OnboardingModals/LoginModal';
import api from "@/pages/api";
import { useRouter } from "next/router";
import Loading from "./Loading";
import DashboardLoading from "./DashboardLoading";
import { Helmet } from "react-helmet";
import { selectedUserState, setSelectedUser } from "@/store/userSlice";
import { selectedPlanState, setSelectedPlan } from "@/store/planSlice";
import { selectedWorkspaceCompanyState, setSelectedWorkspaceCompany } from "@/store/workspaceCompany";
import { useSelector, useDispatch } from "react-redux";
import UpgradeSubscription from "../Modals/InformationalModals/UpgradeSubscription";
import BanPopup from "../Modals/InformationalModals/Ban";
import BreakModal from "../Modals/InformationalModals/BreakModal";

const PageTemplate = ({children}: any) => {
  const [mobile, setMobile] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const user = useSelector(selectedUserState);
  const plan = useSelector(selectedPlanState);
  const [showPlans, setShowPlans] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.removeItem("onboarding_token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("user_id");

    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const ban = localStorage.getItem("ban");
    const validateJWT = async () => {
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
    setIsBanned(ban === "true" ? true : false)

      const fetchUserInfo = async () => {
        try { 
          const {data} = await api.get(`/users/${userId}`, {
            headers: {
              authorization: token,
            },
          });
          if (!data.dashboardAccess) {
            setShowPlans(true);
          }
          if (data.workspace) {
              localStorage.setItem("workspace", data.workspace);
              const workspaceCompany = await api.get(`/workspace-company/${data.workspace}`, {
                headers: {
                  authorization: token
                }
            });
            dispatch(setSelectedWorkspaceCompany(workspaceCompany.data.company));
          }
          if (data.plan) {
            const planResponse = await api.get(`/getPlan/${data.plan}`, {
              headers: {
                authorization: token
              }
            });
            dispatch(setSelectedPlan(planResponse.data));
          } else {
            dispatch(setSelectedPlan({}));
          }
          dispatch(setSelectedUser(data));
        } catch (e) {
          console.log(e);
        }
      }
      fetchUserInfo();
      validateJWT();
  }, []);

  const login = () => {
    setLoggedIn(true);
    router.push("/assets");
    router.reload();
  }

  return (
    <div>
      {!mobile &&
          <DashboardLoading />
      }
      {mobile &&
        <Loading />
      }
      <BreakModal />
      {showPlans && <UpgradeSubscription purchase={false} onClose={() => setShowPlans(false)} closeable={false} landing={false}/>}
      {!loggedIn && <LoginModal onClose={() => login()} registration={false}/>}
      {isBanned && <BanPopup />}
      <Page>
          <NavigationBar />
          {children}
      </Page>
    </div>
  )
}

export default PageTemplate;


const Page = styled.div`
    width: 100vw;
    min-height: 100vh;
    padding: 0.75rem 1rem 0.75rem 5rem;
    height: auto;
    background-color: #EEF1FA;
    color: white;
    position: absolute;
    @media (max-width: 1023px) {
      padding: 4.5rem 0rem 0rem 0rem;
      min-height: 100svh;
  }
`