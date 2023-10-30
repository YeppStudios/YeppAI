import Image from 'next/image'
import { Key, useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import api from '@/pages/api'
import MultiLineSkeletonLoader from '../Common/MultilineSkeletonLoader'
import personaIcon from '../../public/images/persona_icon.png'

const PersonasDropdown = (props: {selectedPersonas: any, setSelectedPersonas: any}) => {
    const [personas, setPersonas] = useState<Array<any>>([]);
    const [loadingPersonas, setLoadingPersonas] = useState<boolean>(true);
    const [mobile, setMobile] = useState(false);
    

useEffect(() => {
    if(window.innerWidth <= 1023) {
      setMobile(true);
    }
    

    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
    
      try {
        const { data } = await api.get(`/personas/owner`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setPersonas(data);
        setLoadingPersonas(false);
      } catch (error) {
        console.error(error);
        setLoadingPersonas(false);
      }
    };
    fetchFolders();
  }, []);

  const handleSelect = (persona: any) => {
    const isPersonaSelected = props.selectedPersonas.some((item: any) => item._id === persona._id);
    if (isPersonaSelected) {
      props.setSelectedPersonas(props.selectedPersonas.filter((item: any) => item._id !== persona._id));
    } else {
      props.setSelectedPersonas([...props.selectedPersonas, persona]);
    }
  };



  const PersonaItem = ({ persona, handleSelect, selectedPersonas }: any) => {
    const isSelected = selectedPersonas.some((selectedPersona: { _id: any }) => selectedPersona._id === persona._id);

    const handleClick = (e: any) => {
      e.stopPropagation();
      handleSelect(persona);
    };

    return (
      <div onClick={handleClick} className="relative flex items-center py-2 px-6 hover:bg-gray-100 rounded-xl cursor-pointer">
        <div className="h-6 w-6 mr-4 flex items-center flex-shrink-0 text-black">
          <Image src={personaIcon} alt="persona-icon" className="w-full"/>
        </div>
        <div className="min-w-0 flex-1 text-lg leading-6">
          <div className="select-none font-medium text-gray-900">
            {persona.title}
          </div>
        </div>
        <div className="ml-3 flex h-6 items-center gap-4">
          <input
            id={`persona-${persona._id}`}
            name={`persona-${persona._id}`}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            checked={isSelected}
            readOnly
          />
        </div>
      </div>
    );
  };


  return (
    <Listbox className="w-full" as="div">
      <div className="relative mt-2">
        <Listbox.Button className="w-full py-3" style={{
          boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF",
          border: "2px solid #F6F6FB",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center"
        }}>
          <div className="w-8 h-8 lg:h-6 lg:w-6 ml-4 mr-4 flex items-center flex-shrink-0 text-black">
            <Image src={personaIcon} alt="persona-icon" className="w-11/12"/>
          </div>
          <span style={{ maxWidth: "75%" }} className="block truncate text-left text-black font-medium text-base md:text-lg flex items-center">
          {(Array.isArray(props.selectedPersonas) && props.selectedPersonas.length > 0 && props.selectedPersonas[0].hasOwnProperty('title')) ?
            <>
                {props.selectedPersonas[0].title}
                {props.selectedPersonas.length > 1 && ` +${props.selectedPersonas.length - 1}`}
            </>
              :
              <div className='text-black font-medium text-base md:text-lg'>
                Choose personas...
              </div>
            }
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6 2xl:pr-8">
            <BsChevronDown
              className={"h-4 w-4 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 text-black arrowicon"}
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        
        <Listbox.Options
          style={{
            boxShadow: "5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF",
            scrollbarWidth: "none",
            border: "2px solid #E5E8F0",
            borderRadius: "20px"
          }}
          className="absolute py-4 z-10 rounded-xl font-medium mt-1 max-h-64 w-full overflow-y-scroll rounded-md bg-white text-base shadow-lg sm:text-sm ring-0">
          
          {loadingPersonas ?
            <div className='w-full px-6 pt-2 pb-4 flex justify-center items-center'>
              <MultiLineSkeletonLoader lines={3} justifyContent='left' />
            </div>
            :
            <>
              {personas.map((persona, personaIdx) => (
                <PersonaItem
                  key={personaIdx}
                  persona={persona}
                  handleSelect={handleSelect}
                  selectedPersonas={props.selectedPersonas}
                />
              ))}
            </>
          }
          
        </Listbox.Options>
      </div>
    </Listbox>
  )  
}


export default PersonasDropdown;