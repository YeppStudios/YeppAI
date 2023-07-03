import Centered from "@/components/Centered";
import Title from "@/components/Common/Title";
import Logo from "@/components/Landing/Logo";
import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import meshBackground from "../../../public/images/mediumMobileBackground.png";
import mediumMobileBackground from "../../../public/images/mediumMobileBackground.png";
import { useRouter } from 'next/router';
import api from "@/pages/api";
import {Loader} from "../../../components/Common/Loaders";
import Cookies from "js-cookie";
import Head from "next/head";
import { FiShoppingBag } from "react-icons/fi";
import ColorfulText from "@/components/Common/ColorfulText";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../../store/userSlice";

interface Background {
    image: any,
    mobileImage: any
  }

interface WidthProp {
      width: string,
      widthMobile: string
}

const products = [
    {description: "Subskrypcja odnawiana jest co miesiąc. Możesz zrezygnować kiedy chcesz, bez żadnego okresu wypowiedzenia!", name: "Basic", query: "basic", price: 99, promoPrice: 99, priceId: "price_1NFwcqFe80Kn2YGGi4iIulhc", promoPriceId: "price_1NFwcqFe80Kn2YGGi4iIulhc", planId: "647895cf404e31bfe8753398", amount: null},
    {description: "Subskrypcja odnawiana jest co miesiąc. Możesz zrezygnować kiedy chcesz, bez żadnego okresu wypowiedzenia!", name: "Pro", query: "pro", price: 299, promoPrice: 299, priceId: "price_1NFwxWFe80Kn2YGGvpHuUfpi", promoPriceId: "price_1NFwxWFe80Kn2YGGvpHuUfpi", planId: "6478970a404e31bfe87533a0", amount: null},
    {description: "Subskrypcja odnawiana jest co miesiąc. Istnieje możliwość rezygnacji z kontynuacji subskrypcji w dowolnym momencie.", name: "Business", query: "business", price: 799, promoPrice: 626.02, priceId: "price_1NFx0EFe80Kn2YGGCWikSSti", promoPriceId: "price_1MzNh9Fe80Kn2YGGkv8OaQ0T", planId: "6444d4394ab2cf9819e5b5f4", amount: null},
    {description: "Audyt identyfikujacy procesy, w których AI jest w stanie zoptymalizować Twoją firmę czasowo, kosztowo i jakościowo.", name: "Audyt identyfikacyjny", query: "audit", price: 4750.00, promoPrice: 4750.00, priceId: "price_1MzGSBFe80Kn2YGGdlY98v88", promoPriceId: "price_1MzGSBFe80Kn2YGGdlY98v88", planId: "", amount: null},
    {description: "Elixir to jednorazowe doładowanie wiedzy Asystenta AI.", name: "Elixir: 30000ml", query: "elixir-small", price: 24.99, promoPrice: 24.99, priceId: "price_1NBAYyFe80Kn2YGGmTM0y2ER", promoPriceId: "price_1NBAYyFe80Kn2YGGmTM0y2ER", planId: "", amount: 30000},
    {description: "Elixir to jednorazowe doładowanie wiedzy Asystenta AI.", name: "Elixir: 100000ml", query: "elixir-medium", price: 99.99, promoPrice: 99.99, priceId: "price_1NBAbsFe80Kn2YGGEHbkus2g", promoPriceId: "price_1NBAbsFe80Kn2YGGEHbkus2g", planId: "", amount: 100000},
    {description: "Elixir to jednorazowe doładowanie wiedzy Asystenta AI.", name: "Elixir: 500000ml", query: "elixir-big", price: 429.00, promoPrice: 429.00, priceId: "price_1NBAcoFe80Kn2YGG7IkK4m63", promoPriceId: "price_1NBAcoFe80Kn2YGG7IkK4m63", planId: "", amount: 500000}
]

const OrderPage = () => {

    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [nip, setNip] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [street, setStreet] = useState("");
    const [apartmentNumber, setApartmentNumber] = useState("");
    const [validCode, setValidCode] = useState(false);
    const [user, setUser] = useState<any>();
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [isCompany, setIsCompany] = useState(true);
    const [loading, setLoading] = useState(false);
    const [stripePriceId, setStripePriceId] = useState<string | undefined>("");
    const [namesError, setNamesError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [apartmentNumberError, setApartmentNumberError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nipError, setNipError] = useState(false);
    const [planId, setPlanId] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState<number>();
    const [productDescription, setProductDescription] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [promoPrice, setPromoPrice] = useState<number>();
    const [promoPriceId, setPromoPriceId] = useState<string | undefined>();
    const [amount, setAmount] = useState<any>();
    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    const { item, price, priceId, months } = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        if(window.innerWidth <= 1023){
            setMobile(true);
        }
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const fetchUser = async () => {
            if(userId){
                const { data } = await api.get(`/users/${userId}`, {
                    headers: {
                      authorization: localStorage.getItem("token"),
                    },
                  });
                setContactEmail(data.email);
                setUser(data);
                setNip(data.nip);
                setFullName(data.fullName);
                setCompanyName(data.companyName);
                setCity(data.city);
                setStreet(data.street);
                setApartmentNumber(data.apartmentNumber);
                setPostalCode(data.postalCode);
            }
        }
        const renderredProduct = products.find((product) => product.query === item);
        if(renderredProduct){
            setProductName(renderredProduct.name);
            setProductPrice(renderredProduct.price);
            if (priceId) {
                setStripePriceId(priceId as string);
            } else {
                setStripePriceId(renderredProduct.priceId);
            }
            setPromoPrice(renderredProduct.promoPrice);
            setPromoPriceId(renderredProduct.promoPriceId);
            setProductDescription(renderredProduct.description);
            if(renderredProduct.planId){
                setPlanId(renderredProduct.planId)
            } else if (renderredProduct.amount){
                setAmount(renderredProduct.amount)
            } 
        }
        fetchUser();
    }, [item]);

    
    
    useEffect(() => {
        const checkWhitelist = async () => {
            const whitelistResponse = await api.get(`/whitelist/check/${promoCode}`);
            if (whitelistResponse.data.valid && months === "1") {
                setValidCode(true);
                setStripePriceId(promoPriceId)
            } else {
                setValidCode(false);
            }
        }
        if (promoCode.length > 0) {
        checkWhitelist();
        }
    }, [promoCode]);
    


    const buy = async (e: FormEvent) => {
        e.preventDefault();
            setLoading(true);
            setNamesError(false);
            setPasswordError(false);
            setApartmentNumberError(false);
            setPostalCodeError(false);
            setNipError(false);
        if(fullName.trim().split(' ').length < 2){
            setNamesError(true);
            setLoading(false);
            return;
        }
        if(isCompany) {
            if(!(/^\d{10}$/.test(nip))){
                setLoading(false);
                setNipError(true);
                return;
            }
            if(phoneNumber){
                if(phoneNumber.length !== 9){
                setLoading(false);
                return;
                }
            }
            if(!(/\d/.test(apartmentNumber))) {
                setLoading(false);
                setApartmentNumberError(true);
                return;
            }
            const polishPostalCodeRegex = /^[0-9]{2}-[0-9]{3}$/;
            if(!(polishPostalCodeRegex.test(postalCode))){
                setLoading(false);
                setPostalCodeError(true);
                return;
            }
        }
        try {
            let successUrl = "https://www.asystent.ai/assets?success";
            if (password.length < 5) {
                setLoading(false);
                setPasswordError(true);
                return;
            }
            const name = fullName.split(" ")[0];
            let registrationResponse;
            if (!user) {
                registrationResponse = await api.post('/register', { email: contactEmail, password, name, isCompany });
                Cookies.set("token", "Bearer " + registrationResponse.data.token, { expires: 7 });
                Cookies.set("user_id", registrationResponse.data.user._id, { expires: 7 });
                Cookies.set("username", registrationResponse.data.user.name, { expires: 7 });
                Cookies.set("workspace", registrationResponse.data.user.workspace, { expires: 7 });
                dispatch(setSelectedUser(registrationResponse.data.user));
                localStorage.setItem('token', "Bearer " + registrationResponse.data.token);
                localStorage.setItem('user_id', registrationResponse.data.user._id);
                localStorage.setItem('plan', registrationResponse.data.user.plan);
                localStorage.setItem('workspace', registrationResponse.data.user.workspace);
                localStorage.setItem('account_type', registrationResponse.data.user.accountType);
                localStorage.setItem('onboarding', "true");
            }

                let token = localStorage.getItem("token");
                const userId = localStorage.getItem("user_id");
                await api.patch(`/updateUserData/${userId}`, {
                    fullName,
                    street,
                    apartmentNumber,
                    contactEmail,
                    companyName,
                    nip,
                    city,
                    postalCode
                }, {
                    headers: {
                      Authorization: token
                    },
                });

                if (item === "basic" || item === "pro") {
                    localStorage.removeItem("workspace");
                }
            //check if tokens purchase
            if (amount){
                const response = await api.post(`/create-checkout-session`, 
                {
                    priceId: stripePriceId, 
                    mode: "payment",
                    successURL: successUrl,
                    cancelURL: `${window.location.origin}${router.asPath}`,
                    email: contactEmail,
                    tokensAmount: amount,
                    planId: "",
                    isTrial: false,
                    asCompany: isCompany,
                    invoiceTitle: `Jednorazowe Doładowanie Miesięcznej Subskrypcji - "Elixir ${amount}ml`
                });
                const { url } = await response.data;
                setLoading(false);
                window.location.href = url;
                setLoading(false);
            } else {
                let referrerId = localStorage.getItem("referrer_id");
                let invoiceTitle = "Miesięczna Subskrypcja Aplikacji Asystent AI";
                if (item === "audit") {
                    invoiceTitle = "Audyt Identyfikacyjny Wdrożenia Sztucznej Inteligencji"
                    successUrl = "https://www.asystent.ai/purchasesuccess/audit"
                }
                if (months === "1") {
                    invoiceTitle = `Zakup Miesięcznej Subskrypcji Pakietu Asistant ${productName} Aplikacji Asystent AI`;
                } else if (months) {
                    invoiceTitle = `Zakup ${months} Miesięcy Subskrypcji Pakietu Asistant ${productName} Aplikacji Asystent AI`;
                }
                if (productName === "Basic") {
                    successUrl = "https://www.asystent.ai/marketing"
                }
                try {
                    if(user.referredBy) {
                        referrerId = user.referredBy;
                        await api.put('/clear-referred-by', {}, {
                            headers: {
                              authorization: token
                            }
                        })
                    }
                } catch (e) {
                    console.log(e)
                }
                if (planId && months === "1") {
                    let response = await api.post(`/create-checkout-session`, 
                    {
                        priceId: stripePriceId, 
                        mode: "subscription",
                        successURL: successUrl,
                        cancelURL: `${window.location.origin}${router.asPath}`,
                        email: contactEmail,
                        planId: planId,
                        referrerId: referrerId,
                        isTrial: false,
                        asCompany: isCompany,
                        invoiceTitle: invoiceTitle,
                        months: 1
                    });
                    const { url } = await response.data;
                    window.location.href = url;
                } else {
                    let response = await api.post(`/create-checkout-session`, 
                    {
                        priceId: stripePriceId, 
                        mode: "payment",
                        successURL: successUrl,
                        cancelURL: `${window.location.origin}${router.asPath}`,
                        email: contactEmail,
                        planId: planId,
                        referrerId: referrerId,
                        isTrial: false,
                        asCompany: isCompany,
                        invoiceTitle: invoiceTitle,
                        months: Number(months)
                    });
                    const { url } = await response.data;
                    window.location.href = url;
                }

                setLoading(false);
                setLoading(false);
                localStorage.removeItem("referrer_id")
            }
            localStorage.setItem("referrer_id", "");
        } catch (e) { 
            console.log(e);
            setLoading(false);
        }
    }


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        router.reload();
    }

    return (
        <div>
            <Head>
                <title>Zamówienie | Asystent AI</title>
                <meta name = "theme-color" content = "#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Zatrudnij Asystenta AI, który pomoże Ci tworzyć unikatowe treści i usprawni twoją firmę." />
            </Head>
            <Background image={meshBackground} mobileImage={mediumMobileBackground}></Background>
            <Centered>
                <Logo color="white"/>
            </Centered>
            <Container>
            <BuyerDetailsContainer>
                {isCompany ?
                <Title fontSize={"4vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize={"3vh"} mobileTextAlign={"left"}>Dane firmowe</Title>
                :
                <Title fontSize={"4vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize={"3vh"} mobileTextAlign={"left"}>Twoje dane</Title>
                }
                {item !== "business" &&
                <ToggleContainer>
                    Kupuję na: 
                    {isCompany ? 
                        <SelectedToggle>Firmę</SelectedToggle>
                    :
                        <Toggle onClick={() => setIsCompany(true)}>Firmę</Toggle>
                    }
                    {!isCompany ? 
                        <SelectedToggle>Osobę fizyczną</SelectedToggle>
                    :
                        <Toggle onClick={() => setIsCompany(false)}>Osobę fizyczną</Toggle>
                    }

                </ToggleContainer>
                }
                <Form id="form" onSubmit={(e) => buy(e)}>
                        <InputContainer width="45%" widthMobile="100%">
                            <Label>
                                Imię i nazwisko {namesError && <LabelErrorMessage>podaj oddzielnie: Imię Nazwisko</LabelErrorMessage>}
                            </Label>
                            {namesError ?
                            <ErrorInput
                                id="name"
                                type="text"
                                placeholder="Jan Kowalski"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />           
                            :
                            <Input
                                id="name"
                                type="text"
                                placeholder="Jan Kowalski"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />                           
                            }
              
                        </InputContainer>
                        {isCompany &&
                        <InputContainer width="45%" widthMobile="100%">
                            <Label>
                                Nazwa firmy
                            </Label>
                            <Input
                                id="company-name"
                                type="text"
                                placeholder="Moja Firma Sp. z o. o."
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />                   
                        </InputContainer>
                        }
                    <InputContainer width="45%" widthMobile="100%">
                            <Label>
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mail@gmail.com"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                required
                            />                   
                    </InputContainer>
                        <InputContainer width="45%" widthMobile="100%">
                            <Label>
                                Hasło do konta {passwordError && <LabelErrorMessage>wpisz co najmniej 5 znaków</LabelErrorMessage>}
                            </Label>
                            {passwordError ?
                                <ErrorInput
                                    id="password"
                                    type="password"
                                    placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />                
                                :
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />            
                            }
                        </InputContainer>     
                    {isCompany &&
                    <InputContainer width="45%" widthMobile="100%">
                        <Label>
                            Miasto
                        </Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="Warszwa"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </InputContainer>
                    }
                    {isCompany &&
                    <AddressInputContainer  width="45%" widthMobile="100%">
                        <AddressInput width="70%" widthMobile="60%">
                            <Label>
                                Ulica
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                placeholder="ul. Szwajcarska"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />                 
                        </AddressInput>
                        <AddressInput width="25%" widthMobile="35%">
                            <Label>
                                Nr. lokalu
                            </Label>
                            {apartmentNumberError ?
                                <ErrorInput
                                    id="address"
                                    type="text"
                                    placeholder="7A/4"
                                    value={apartmentNumber}
                                    onChange={(e) => setApartmentNumber(e.target.value)}
                                    required
                                />                      
                                :
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="7A/4"
                                    value={apartmentNumber}
                                    onChange={(e) => setApartmentNumber(e.target.value)}
                                    required
                                />    
                            }
                        </AddressInput>
                    </AddressInputContainer>
                    }
                    {isCompany &&
                    <InputContainer width="45%" widthMobile="100%">
                    <Label>
                        Kod pocztowy {postalCodeError && <LabelErrorMessage>podaj poprawny kod</LabelErrorMessage>}
                    </Label>
                    {postalCodeError ?
                    <ErrorInput
                        id="postal-code"
                        type="text"
                        placeholder="62-080"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />                    
                    :
                    <Input
                        id="postal-code"
                        type="text"
                        placeholder="62-080"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />       
                    }
                    </InputContainer>                    
                    }
                    {isCompany && 
                    <InputContainer width="45%" widthMobile="100%">
                        <Label>
                            NIP {nipError && <LabelErrorMessage>podaj poprawny NIP</LabelErrorMessage>}
                        </Label>
                        {nipError ?
                        <ErrorInput
                            id="NIP"
                            type="text"
                            placeholder="1173525642"
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            required
                        />               
                        :
                        <Input
                            id="NIP"
                            type="text"
                            placeholder="1173525642"
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            required
                        />             
                        }
                    </InputContainer>
                    }
                    <InputContainer width="45%" widthMobile="100%">
                        <Label>
                            Numer telefonu (opcjonalne)
                        </Label>
                        <Input
                            id="phone-number"
                            type="text"
                            placeholder="812 432 235"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </InputContainer>
                        <InputContainer width="45%" widthMobile="100%">
                            <Label>
                                Kod promocyjny (opcjonalne)
                            </Label>
                            <Input
                                id="promo-code"
                                type="text"
                                placeholder="tajny-kod"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                        </InputContainer>
                </Form>
            </BuyerDetailsContainer>
            <PurchaseDetailsContainer>
                <AboutPayment>
                    <Title fontSize={"4vh"} width={"100%"} textAlign={"left"} color={"black"} mobileFontSize={"3vh"} mobileTextAlign={"left"}>Podsumowanie</Title>
                    {months === "1" ? <DescriptionText>{productDescription}</DescriptionText>
                    :
                    months && <DescriptionText>{months} miesięczna subskrypcja pakietu {productName} aplikacji Asystent AI z możliwością wypowiedzenia subskrypcji na następny okres w każdym momencie.</DescriptionText>
                    }
                </AboutPayment>
                        <BuyContainer>
                            <Label>Zakup:</Label>
                            <Item>Pakiet: {productName}</Item>
                            <DescriptionText>Zakup jest równoznaczny ze zgodą na <a href={"/Regulamin_AsystentAI.pdf"} download><b style={{color: "black"}}>politykę prywatności</b> oraz <b style={{color: "black"}}>regulamin</b></a>.</DescriptionText>
                            <PriceContainer>
                                <PriceLabel>Cena netto:</PriceLabel>
                                {validCode ? <Price><div className="checkout-price"><ColorfulText>{promoPrice}</ColorfulText></div><ColorfulText>zł</ColorfulText>{months === "1" && <>/msc</>}</Price> : <Price><div className="checkout-price">{price}</div>zł{months === "1" && <>/msc</>}</Price>}
                            </PriceContainer>
                            <BuyButton type="submit" form="form">
                            {loading ?
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Loader color="white" />
                                </div>
                                :
                                <><BtnIcon><FiShoppingBag style={{ width: "100%", height: "auto" }} /></BtnIcon><p>Przejdź do zakupu</p></>
                            }
                            </BuyButton>
                        </BuyContainer>  
            </PurchaseDetailsContainer>
            {user && 
                <LogoutBtn onClick={logout}>Wyloguj się</LogoutBtn>
            }
            </Container>
        </div>
    )
}

export default OrderPage;

const Container = styled.div`
    width: 100%;
    padding: 14vh 10vw 10vh 10vw;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
        justify-content: center;
        padding: 18vh 5vw 10vh 5vw;
    }
`

const Background = styled.div<Background>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    height: 100%;
    z-index: 0;
    background-image: url(${props => props.image.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    @media (max-width: 580px) {
        background-image: url(${props => props.mobileImage.src});
        max-height: 100%;
    }

`

const BuyerDetailsContainer = styled.div`
    z-index: 1;
    padding: 2.5vh 3.5vh 2.5vh 3.5vh;
    background-color: white;
    border-radius: 15px;
    width: 54vw;
    height: auto;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
    @media (max-width: 1023px) {
        width: 90vw;
    }
`

const PurchaseDetailsContainer = styled.div`
    padding: 2.5vh 4vh 2.5vh 4vh;
    z-index: 1;
    background-color: white;
    border-radius: 15px;
    width: 25vw;
    height: 80vh;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    @media (max-width: 1023px) {
        width: 90vw;
        margin-top: 3vh;
        height: auto;
    }
`

const ToggleContainer = styled.div`
    font-size: 2.2vh;
    color: black;
    display: flex;
    margin-top: 1vh;
    align-items: center;
    @media (max-width: 1023px) {
        font-size: 2vh;
    }
`

const Toggle = styled.div`
    padding: 1vh 1vw 1vh 1vw;
    margin-left: 2vw;
    cursor: pointer;
    border-radius: 12px;
    &:hover {
        background-color: #F1F1F1;
    }
    @media (max-width: 1023px) {
        padding: 1.5vh 4vw 1.5vh 4vw;
        margin-left: 2vw;
      }
`

const SelectedToggle = styled.div`
    padding: 1vh 1vw 1vh 1vw;
    background-color: #0D0E16;
    border-radius: 12px;
    color: white;
    margin-left: 2vw;
    @media (max-width: 1023px) {
        padding: 1.5vh 4vw 1.5vh 4vw;
        margin-left: 2vw;
    }
`

const Form = styled.form`
    margin-top: 2.5vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

const AddressInputContainer = styled.div<WidthProp>`
    width: ${props => props.width || '45%'};
    margin: 0 2vw 2vh 0vw;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1023px) {
        width: ${props => props.widthMobile || '100%'};
    }
`

const AddressInput = styled.div<WidthProp>`
width: ${props => props.width || '45%'};
    margin: 0;
    @media (max-width: 1023px) {
        width: ${props => props.widthMobile || '100%'};
    }
`


const InputContainer = styled.div<WidthProp>`
width: ${props => props.width || '45%'};
    margin: 0 2vw 2vh 0vw;
    @media (max-width: 1023px) {
        width: ${props => props.widthMobile || '100%'};
    }
`

const Label = styled.label`
  display: block;
  color: #141418;
  font-size: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  @media (max-width: 1023px) {
    font-size: 0.9rem;
}
`;

const Input = styled.input`
  padding: 1.2vh 1vw 1.2vh 1vw;
  width: 100%;
  font-size: 2.2vh;
  border-radius: 10px;
  background-color: white;
  box-shadow: inset 2px 2px 5px rgba(15, 27, 40, 0.15);
  -webkit-box-shadow: inset 3px 3px 5px rgba(15, 27, 40, 0.23)s;
  border: 2px solid #E5E8F0;
  color: black;
  font-weight: 500;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #696E7D;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #696E7D;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    padding: 1.5vh 4vw 1.5vh 4vw;
}
`;

const ErrorInput = styled.input`
  padding: 1.2vh 1vw 1.2vh 1vw;
  width: 100%;
  border-radius: 12px;
  background: #FFE9E9;
  font-size: 2.2vh;
  border: 2px solid #FF9999;
  color: black;
  font-weight: 400;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #696E7D;
    font-weight: 400;
  }
  :-ms-input-placeholder {
    color: #696E7D;
    font-weight: 400;
  }
  @media (max-width: 1023px) {
    padding: 1.5vh 4vw 1.5vh 4vw;
}
`;

const AboutPayment = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 1rem;
  border-bottom: 2px solid #DCDCDC;
  @media (max-width: 1023px) {
    height: 27vh;
}
`

const DescriptionText = styled.p`
    color: #717EA6;
    font-size: 1rem;
    width: 95%;
    text-align: left;
    margin-top: 0.5vh;
    @media (max-width: 1023px) {
        margin-top: 1rem;
        font-size: 2.2vh;
        width: 100%;
        margin-bottom: 2vh;
    }
`

const BuyContainer = styled.div`
    width: 100%;
    @media (max-width: 1023px) {
        margin-top: 7vh;
    }
`

const Item = styled.p`
    color: black;
    font-weight: 700;
    font-size: 3vh;
    line-height: 1.4;
    margin-bottom: 1vh;
`

const PriceContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4vh;

`

const PriceLabel = styled.div`
    color: black;
    font-size: 2vh;
`

const Price = styled.div`
    font-weight: 700;
    font-size: 3vh;
    color: black;
    display: flex;
`

const BuyButton = styled.button`
    width: 100%;
    height: 6vh;
    background-color: #0D0E16;
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    margin-top: 2vh;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        height: 8vh;
        font-size: 2.2vh
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
    }
`

const TialButtonText = styled.p`
    color: white;
    transition: all 0.4s ease;
`

const TialButton = styled.button`
    width: 100%;
    height: 6vh;
    background: -webkit-linear-gradient(45deg, #F7A097, #E497FF, #7EC5FF);
    color: black;
    border-radius: 12px;
    margin-top: 2vh;
    transition: all 0.4s ease;
    font-weight: 600;
    font-family: 'Lato', sans-serif;
    transition: all 0.4s ease;
    @media (max-width: 1023px) {
        height: 8vh;
        font-size: 2.2vh
    }
    &:hover {
        box-shadow: none;
        transform: scale(0.95);
        background: -webkit-linear-gradient(45deg, #F7A097, #E497FF, #7EC5FF);
    }
`

const LogoutBtn = styled.button`
    position: absolute;
    background-color: transparent;
    color: black;
    bottom: 3vh;
    right: 2vw;
    font-size: 2vh;
`

const LabelErrorMessage = styled.p`
    color: #FF6060;
    font-size: 0.8rem;
    margin-left: 0.7vw;
`

const BtnIcon = styled.div`
    width: auto;
    margin-right: 0.75rem;
    width: 1.2rem;
    height: 1.2rem;

`