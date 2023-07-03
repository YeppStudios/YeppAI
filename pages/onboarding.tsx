import WelcomePage from "@/components/Onboarding/WelcomePage";
import Timeline from "@/components/Onboarding/common/Timeline";
import { useEffect, useState } from "react";
import BenefitsPage from "@/components/Onboarding/BenefitsPage";
import TestAssistant from "@/components/Onboarding/TestPage";
import PlanPage from "@/components/Onboarding/PlanPage";
import HowItWorks from "@/components/Onboarding/HowItWorks";
import LoginModal from "@/components/Modals/OnboardingModals/LoginModal";
import LoginPage from "@/components/Onboarding/LoginPage";
import api from "./api";
import Head from 'next/head';
import { useRouter } from 'next/router';

const Onboarding = () => {

    const [step, setStep] = useState(0);
    const [loggedIn, setLoggedIn] = useState(true);

    const router = useRouter();

    useEffect(() => {
      const { step } = router.query;
      if (step) {
        setStep(Number(step));
      }
      if(step !== "5" && step){

        const validateJWT = async () => {
          const token = localStorage.getItem("token");

          const { ref } = router.query;
          if (ref) {
            localStorage.setItem("referrer_id", ref as string);
          }

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
      }

      }, [router.query]);
      
    const handleBack = () => {
      router.push(`/onboarding?step=${step-1}`)
    }

    const login = () => {
      router.push("/onboarding?step=1")
      setLoggedIn(true);
    }

    return (
        <div style={{color: "white"}}>
        <Head>
          <meta name = "theme-color" content = "#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Przekonaj się jak Asystent AI może pomóc Ci w codziennych wyzwaniach." />
          <title>Onboarding | Asystent AI</title>
        </Head>
            {!loggedIn && <LoginModal onClose={() => setLoggedIn(true)} registration={false}/>}
            {step === 0 && <LoginPage nextStep={() => login()} />}
            {step === 1 && <WelcomePage ><Timeline step={step} /></WelcomePage>}
            {step === 2 && <BenefitsPage openChat={() => router.push("/onboarding?step=4")} back={handleBack}><Timeline step={step} /></BenefitsPage>}
            {step === 3 && <HowItWorks back={handleBack}><Timeline step={step} /></HowItWorks>}
            {step === 4 && <TestAssistant back={handleBack}><Timeline step={step} /></TestAssistant>}
            {step === 5 && <PlanPage back={handleBack}><Timeline step={step} /></PlanPage>}
        </div>
    )
}

export default Onboarding;
