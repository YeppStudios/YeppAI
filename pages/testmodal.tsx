import ChoiceModal from "@/components/Tone/modals/ChoiceModal";
import PersonaModal from "@/components/Tone/modals/PersonaModal";
import ToneModal from "@/components/Tone/modals/ToneModal";
import { useState } from "react";

const Test = () => {

    const [openModal, setOpenModal] = useState(true);
    const [currentModal, setCurrentModal] = useState("choice");

    return (
        <div>
            <button></button>
            {(currentModal === "choice" && openModal) &&
                <ChoiceModal onClose={() => setOpenModal(false)} setNextModal={setCurrentModal}/>
            }
            {(currentModal === "tone" && openModal) && 
                <ToneModal onClose={() => setOpenModal(false)} />
            }
            {((currentModal === "persona-form" || currentModal === "persona-description") && openModal) && 
                <PersonaModal onClose={() => setOpenModal(false)} currentModal={currentModal}/>
            }
        </div>
    )
}

export default Test;