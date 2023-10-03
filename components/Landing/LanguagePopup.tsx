import { useEffect, useState } from "react";
import SlideBottom from "../Animated/SlideBottom";

const languages = [
    {country: "Spain", language: "Spanish", emoji: "🇪🇸"},
    {country: "Mexico", language: "Spanish", emoji: "🇲🇽"},
    {country: "Argentina", language: "Spanish", emoji: "🇦🇷"},
    {country: "Colombia", language: "Spanish", emoji: "🇨🇴"},
    {country: "France", language: "French", emoji: "🇫🇷"},
    {country: "Belgium", language: "French", emoji: "🇧🇪"},
    {country: "Italy", language: "Italian", emoji: "🇮🇹"},
    {country: "Portugal", language: "Portuguese", emoji: "🇵🇹"},
    {country: "Brazil", language: "Portuguese", emoji: "🇧🇷"},
    {country: "Germany", language: "German", emoji: "🇩🇪"},
    {country: "Austria", language: "German", emoji: "🇦🇹"},
    {country: "Switzerland", language: "German", emoji: "🇨🇭"},
    {country: "Ukraine", language: "Ukrainian", emoji: "🇺🇦"},
    {country: "Poland", language: "Polish", emoji: "🇵🇱"},
    {country: "China", language: "Chinese", emoji: "🇨🇳"},
    {country: "Taiwan", language: "Chinese", emoji: "🇹🇼"},
    {country: "Bulgaria", language: "Bulgarian", emoji: "🇧🇬"},
    {country: "Russia", language: "Russian", emoji: "🇷🇺"},
    {country: "Japan", language: "Japanese", emoji: "🇯🇵"},
    {country: "Turkey", language: "Turkish", emoji: "🇹🇷"},
    {country: "Cyprus", language: "Turkish", emoji: "🇨🇾"},
    {country: "Greece", language: "Greek", emoji: "🇬🇷"},
    {country: "Cyprus", language: "Greek", emoji: "🇨🇾"},
    {country: "Saudi Arabia", language: "Arabic", emoji: "🇸🇦"},
    {country: "Egypt", language: "Arabic", emoji: "🇪🇬"},
    {country: "UAE", language: "Arabic", emoji: "🇦🇪"},
    {country: "Jordan", language: "Arabic", emoji: "🇯🇴"},
    {country: "Netherlands", language: "Dutch", emoji: "🇳🇱"},
    {country: "Belgium", language: "Dutch", emoji: "🇧🇪"},
    {country: "Suriname", language: "Dutch", emoji: "🇸🇷"},
    {country: "Norway", language: "Norwegian", emoji: "🇳🇴"},
    {country: "Serbia", language: "Serbian", emoji: "🇷🇸"},
    {country: "Sweden", language: "Swedish", emoji: "🇸🇪"},
    {country: "Czech Republic", language: "Czech", emoji: "🇨🇿"},
    {country: "Romania", language: "Romanian", emoji: "🇷🇴"},
    {country: "Finland", language: "Finnish", emoji: "🇫🇮"},
    {country: "Hungary", language: "Hungarian", emoji: "🇭🇺"},
    {country: "India", language: "Hindi", emoji: "🇮🇳"}
  ];
  

const LanguagePopup = () => {

    const [selectedLanguage, setSelectedLanguage] = useState({country: "", language: "", emoji: ""});


    const determineCountry = async () => {
        const country = localStorage.getItem("country");
        if (country) {
            const language = languages.find((lang) => lang.country === country);
            if (language) {
                setSelectedLanguage(language);
            }
        }

    }

    useEffect(() => {
        determineCountry();
    }, [])

    if (!selectedLanguage.country) {
        return null;
    } else {
        return (
            <SlideBottom>
            <div className="px-8 bg-[#F6F7FF] py-2 rounded-xl mb-4 font-medium shadow-sm">
                <span className="mr-2">{selectedLanguage.emoji}</span>Yepp can also write in {selectedLanguage.language}!
            </div>
            </SlideBottom>
        )
    }
}

export default LanguagePopup;