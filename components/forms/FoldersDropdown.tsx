import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import folderIcon from "../../public/images/folderIcon.webp";
import api from '@/pages/api';

interface Folder {
    owner: string;
    title: string;
    category: string;
    documents: Document[];
    updatedAt: string;
    _id: string;
    subfolders?: Folder[];
}

export default function FoldersDropdown({ onChange }: any) {
    const [folders, setFolders] = useState<Array<Folder>>([]);
    const [chosenFolder, setChosenFolder] = useState<Folder | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [openFolders, setOpenFolders] = useState<string[]>([]);

    useEffect(() => {
        const fetchFolders = async () => {
            const token = localStorage.getItem("token");
            const workspace = localStorage.getItem("workspace");
            const userId = localStorage.getItem("user_id");
            
            const path = workspace && workspace !== "undefined" && workspace !== "null"
                ? `/folders/${workspace}`
                : `/folders/owner/${userId}`;
            
            try {
                const { data } = await api.get(path, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setFolders(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFolders();
    }, []);

    const handleSelect = (folder: Folder) => {
        setChosenFolder(folder);
        onChange(folder);
        setIsOpen(false); // Close dropdown upon selection
    };

    const toggleFolderVisibility = (folderId: string) => {
        if (openFolders.includes(folderId)) {
            setOpenFolders(prev => prev.filter(id => id !== folderId));
        } else {
            setOpenFolders(prev => [...prev, folderId]);
        }
    };

    const FolderItem = ({ folder }: any) => {
        const isSubfolderOpen = openFolders.includes(folder._id);

        return (
            <>
                <div className="relative flex items-center py-2 px-6 hover:bg-gray-100 rounded-xl cursor-pointer">
                    <div className="h-6 w-6 mr-4 flex items-center flex-shrink-0 text-black">
                        <Image src={folderIcon} alt="folder-icon" className="w-full"/>
                    </div>
                    <div className="min-w-0 flex-1 text-lg leading-6" onClick={() => handleSelect(folder)}>
                        <div className="select-none font-medium text-gray-900">
                            {folder.title}
                        </div>
                    </div>
                    {folder.subfolders && folder.subfolders.length > 0 && (
                        <div onClick={(e) => { e.stopPropagation(); toggleFolderVisibility(folder._id); }}>
                            {isSubfolderOpen ? 
                                <BsChevronUp className='h-4 w-4 text-black'/> 
                                : 
                                <BsChevronDown className='h-4 w-4 text-black'/>}
                        </div>
                    )}
                </div>
                {isSubfolderOpen && folder.subfolders && folder.subfolders.map((subfolder: Folder) => (
                    <div key={subfolder._id} style={{ paddingLeft: '20px' }}>
                        <FolderItem folder={subfolder} />
                    </div>
                ))}
            </>
        );
    };

    return (
        <Listbox className="w-full" as="div" value={chosenFolder}>
            <div className="relative mt-2">
                <div onClick={() => setIsOpen(!isOpen)} className="w-full py-3" style={{ boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF", borderRadius: "20px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                    <div className="w-8 h-8 lg:h-6 lg:w-6 ml-4 mr-4 flex items-center flex-shrink-0 text-black">
                        <Image src={folderIcon} alt="folder-icon" className="w-full"/>
                    </div>
                    <span style={{ maxWidth: "75%" }} className="block truncate text-left text-black font-medium text-base md:text-lg flex items-center">
                        {chosenFolder ? chosenFolder.title : <div className='text-black font-medium text-base md:text-lg'>Choose existing folder</div>}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6 2xl:pr-8">
                        <BsChevronDown className={"h-4 w-4 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 text-black arrowicon"} aria-hidden="true"/>
                    </span>
                </div>
                {isOpen && (
                    <div style={{ boxShadow: "5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF", scrollbarWidth: "none", border: "2px solid #E5E8F0", borderRadius: "20px" }} className="absolute py-4 z-10 rounded-xl font-medium mt-1 max-h-64 w-full overflow-y-scroll rounded-md bg-white text-base shadow-lg sm:text-sm">
                        {folders.map((folder, folderIdx) => (
                            <FolderItem key={folderIdx} folder={folder} />
                        ))}
                    </div>
                )}
            </div>
        </Listbox>
    )
}
