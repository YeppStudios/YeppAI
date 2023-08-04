import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsChevronDown, BsFolder, BsFolderFill } from 'react-icons/bs'
import { setSelectedFolders, selectFoldersState } from '@/store/selectedFoldersSlice'
import { useSelector, useDispatch } from 'react-redux'
import api from '@/pages/api'

interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[],
    updatedAt: string,
    _id: string
  }

export default function FoldersDropdown() {
  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [mobile, setMobile] = useState(false);

  const dispatch = useDispatch();
  let selectedFolders = useSelector(selectFoldersState);

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    const token = localStorage.getItem("token");
    const workspace = localStorage.getItem("workspace");
    const userId = localStorage.getItem("user_id");
    const fetchFolders = async () => {
      try {
        if (workspace && workspace !== "undefined" && workspace !== "null") {
          const { data } = await api.get(`/folders/${workspace}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setFolders(data);
        } else {
          const { data } = await api.get(`/folders/owner/${userId}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
          setFolders(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    console.log(selectedFolders)
    fetchFolders();
  }, [selectedFolders]);

  const handleSelect = (folder: Folder) => {
    if (selectedFolders.find((item) => item._id === folder._id)) {
      const updatedFolders = selectedFolders.filter((item) => item._id !== folder._id);
      setSelectedFolders(updatedFolders);
      dispatch(setSelectedFolders(updatedFolders));
    } else {
      const updatedFolders = [...selectedFolders, folder];
      setSelectedFolders(updatedFolders);
      dispatch(setSelectedFolders(updatedFolders));
    }
  };
  

  return (
    <Listbox className="w-full" as="div" value={selectedFolders[0]}>
      <div className="relative mt-2">
        <Listbox.Button className="w-full py-3" style={{boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF", border: "solid 3px black", borderRadius: "20px",
           overflow: "hidden", display: "flex", alignItems: "center"}}
        >
        <div className="h-10 w-10 ml-4 flex items-center flex-shrink-0 text-black">
            <BsFolder style={{width: "60%", height: "auto"}} />
        </div>
        <span style={{maxWidth: "75%"}} className="block truncate text-left text-black font-medium text-lg flex items-center">
          {selectedFolders.length > 0 ? selectedFolders[0].title : <div className='text-black font-medium text-lg'>Choose uploaded assets...</div>} 
          {selectedFolders.length > 1 && <div className='ml-4 bg-slate-100 rounded-full py-1 px-2 text-sm'>+{selectedFolders.length -1}</div>}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6 2xl:pr-8">
              <BsChevronDown
                className={"h-6 w-6 2xl:h-6 2xl:w-6 text-black arrowicon"}
                aria-hidden="true"
              />
            </span>
        </Listbox.Button>
        <Listbox.Options
           style={{boxShadow: "5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF", scrollbarWidth: "none", border: "2px solid #E5E8F0", borderRadius: "20px"}}
           className="absolute py-4 z-10 rounded-xl font-medium mt-1 max-h-64 w-full overflow-y-scroll rounded-md bg-white text-base shadow-lg sm:text-sm ring-0">
          {folders.map((folder, folderIdx) => (
            <div 
              key={folderIdx} 
              className="relative flex items-center py-2 px-6 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(folder)} // Add the onClick handler here
            >
              <div className="h-8 w-8 flex items-center flex-shrink-0 text-black">
                <BsFolder style={{width: "60%", height: "auto"}} />
              </div>
              <div className="min-w-0 flex-1 text-lg leading-6">
                <div className="select-none font-medium text-gray-900">
                  {folder.title}
                </div>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  id={`folder-${folder._id}`}
                  name={`folder-${folder._id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={selectedFolders.some(selectedFolder => selectedFolder._id === folder._id)} // Set checked property based on whether the folder is in selectedFolders
                  readOnly // Make the checkbox read-only since we are managing the state ourselves
                />
              </div>
            </div>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
