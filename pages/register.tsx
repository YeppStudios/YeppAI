import LoginModal from "@/components/Modals/OnboardingModals/LoginModal"
import styled from "styled-components";
import background from "@/public/images/stripe_background.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Register = () => {

    const router = useRouter();

    return (
        <div>
            <Background>
                <Image src={background} alt={'background'} style={{width: "100%", height: "100%"}}></Image>
            </Background>
            <LoginModal onClose={() => router.push("/assets")} registration={false} />
        </div>
    )

}


export default Register;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
`