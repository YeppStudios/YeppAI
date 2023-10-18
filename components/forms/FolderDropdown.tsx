import Image from 'next/image'
import { Key, useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { setSelectedFolders, selectFoldersState } from '@/store/selectedFoldersSlice'
import { useSelector, useDispatch } from 'react-redux'
import folderIcon from "../../public/images/folderIcon.webp";
import api from '@/pages/api'
import MultiLineSkeletonLoader from '../Common/MultilineSkeletonLoader'

interface Folder {
    owner: string,
    title: string,
    category: string,
    documents: Document[],
    updatedAt: string,
    _id: string,
    subfolders?: any[],
    totalDocsCount: number
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function FoldersDropdown() {
  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [mobile, setMobile] = useState(false);
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [totalDocumentsOpened, setTotalDocumentsOpened] = useState<number>(0);
  const [maxDocs, setMaxDocs] = useState<boolean>(false);
  const [loadingFolders, setLoadingFolders] = useState<boolean>(true);
  
  const dispatch = useDispatch();
  let selectedFolders = useSelector(selectFoldersState);

  useEffect(() => {
    if(window.innerWidth <= 1023){
      setMobile(true);
    }
    

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
        setLoadingFolders(false)
      } catch (error) {
        console.error(error);
        setLoadingFolders(false)
      }
    };
    fetchFolders();
  }, [selectedFolders]);

  
const getAllSubfolderIds = (folderId: string, allFolders: Folder[]): string[] => {
    let ids: string[] = [];
    const folder = allFolders.find(f => f._id === folderId);
    if (folder && folder.subfolders) {
        for (const subfolder of folder.subfolders) {
            ids.push(subfolder._id);
            ids = ids.concat(getAllSubfolderIds(subfolder._id, allFolders));
        }
    }
    return ids;
};

const getAllSubfolders = (folder: Folder, allFolders: Folder[]): Folder[] => {
  let result: Folder[] = [];

  if (folder.subfolders && folder.subfolders.length > 0) {
    for (const subfolder of folder.subfolders) {
      result.push(subfolder);
      
      const furtherSubfolders = getAllSubfolders(subfolder, allFolders);
      result = [...result, ...furtherSubfolders];
    }
  }
  return result;
};


const handleSelect = (folder: Folder) => {
  const allSubfolders = getAllSubfolders(folder, folders);
  const isFolderSelected = selectedFolders.some((item) => item._id === folder._id);
  if (isFolderSelected) {
      setMaxDocs(false);
      setTotalDocumentsOpened(totalDocumentsOpened - getTotalDocumentsForFolder(folder));
      const idsToRemove = new Set([folder._id, ...allSubfolders.map(sf => sf._id)]);
      const updatedFolders = selectedFolders.filter((item) => !idsToRemove.has(item._id));
      setSelectedFolders(updatedFolders);
      dispatch(setSelectedFolders(updatedFolders));
  } else {
      if ((totalDocumentsOpened + folder.totalDocsCount) > 1000) {
        setMaxDocs(true);
      }
      const updatedFolders = [folder, ...allSubfolders, ...selectedFolders];
      setTotalDocumentsOpened(totalDocumentsOpened + getTotalDocumentsForFolder(folder));
      setSelectedFolders(updatedFolders);
      dispatch(setSelectedFolders(updatedFolders));
      const idsToClose = getAllSubfolderIds(folder._id, folders);
      idsToClose.push(folder._id);
      setOpenFolders(prev => prev.filter(id => !idsToClose.includes(id)));
  }
};


const toggleFolder = (folderId: string) => {
  if (openFolders.includes(folderId)) {
    setOpenFolders(prev => prev.filter(id => id !== folderId));
  } else {
    setOpenFolders(prev => [...prev, folderId]);
  }
};

const getTotalDocumentsForFolder = (folder: Folder): number => {
  let totalDocuments = folder.totalDocsCount;

  if (folder.subfolders && folder.subfolders.length > 0) {
      folder.subfolders.forEach(subfolder => {
          totalDocuments += getTotalDocumentsForFolder(subfolder);
      });
  }

  return totalDocuments;
};


const FolderItem = ({ folder, handleSelect, selectedFolders, isOpen, onToggle }: any) => {

  const toggleOpen = (e: any) => {
    e.stopPropagation();
    onToggle(folder._id);
  };
  const totalDocs =  getTotalDocumentsForFolder(folder);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (totalDocs >= 1000) {
      toggleOpen(e);
    } else {
      handleSelect(folder);
    }
  };

  const isSelected = selectedFolders.some((selectedFolder: { _id: any }) => selectedFolder._id === folder._id);

  return (
    <>
    <div onClick={handleClick} className="relative flex items-center py-2 px-6 hover:bg-gray-100 rounded-xl cursor-pointer">
      <div className="h-6 w-6 mr-4 flex items-center flex-shrink-0 text-black" onClick={handleClick}>
        <Image src={folderIcon} alt="folder-icon" className="w-full"/>
      </div>
      <div className="min-w-0 flex-1 text-lg leading-6">
        <div className="select-none font-medium text-gray-900">
          {folder.title}
        </div>
      </div>
      <div className="ml-3 flex h-6 items-center gap-4">
        {totalDocs < 1000 ?
        <input
          id={`folder-${folder._id}`}
          name={`folder-${folder._id}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          checked={isSelected}
          readOnly
        />
        :
        <div></div>
        }
        <div onClick={(e) => e.stopPropagation()}>
          {!isSelected && (isOpen ? 
            <BsChevronUp onClick={toggleOpen} className='h-4 w-4 text-black'/> 
            : 
            <>
              {(folder.subfolders && folder.subfolders.length > 0) ? 
              <BsChevronDown onClick={toggleOpen} className='h-4 w-4 text-black'/> 
              : 
              <></>
              }
            </>
          )}
        </div>
      </div>
    </div>
    {isOpen && folder.subfolders && folder.subfolders.map((subfolder: any) => (
      <div key={subfolder._id} style={{ paddingLeft: '20px' }}>
          <FolderItem 
              folder={subfolder} 
              handleSelect={handleSelect} 
              selectedFolders={selectedFolders}
              isOpen={openFolders.includes(subfolder._id)}
              onToggle={onToggle}
          />
      </div>
    ))}
    </>
  );
};



  return (
    <Listbox className="w-full" as="div" value={selectedFolders[0]}>
      <div className="relative mt-2">
        <Listbox.Button className="w-full py-3" style={{boxShadow: "2px 2px 5px rgba(15, 27, 40, 0.23), -2px -2px 5px #FAFBFF", border: "solid 3px transparent", borderRadius: "20px",
          backgroundImage: "linear-gradient(white, white, white), radial-gradient(circle at top left, #6578F8, #64B5FF)", backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box", overflow: "hiddens", display: "flex", alignItems: "center"}}
        >
        <div className="w-8 h-8 lg:h-6 lg:w-6 ml-4 mr-4 flex items-center flex-shrink-0 text-black">
          <Image src={folderIcon} alt="folder-icon" className="w-full"/>
        </div>
        <span style={{maxWidth: "75%"}} className="block truncate text-left text-black font-medium text-base md:text-lg flex items-center">
          {selectedFolders.length > 0 ? <>{selectedFolders[0].title}{selectedFolders.length > 1 && <> +{selectedFolders.length - 1}</>}</> : <div className='text-black font-medium text-base md:text-lg'>Choose folders to reference...</div>} 
          {(selectedFolders.length > 0 && totalDocumentsOpened > 0) && <div className={classNames(totalDocumentsOpened >= 1000 ? 'border-2 border-red-400' : '', 'ml-4 bg-slate-100 rounded-full py-1 px-3 text-xs')}>{totalDocumentsOpened} docs</div>}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6 2xl:pr-8">
              <BsChevronDown
                className={"h-4 w-4 lg:h-6 lg:w-6 2xl:h-6 2xl:w-6 text-black arrowicon"}
                aria-hidden="true"
              />
        </span>
        </Listbox.Button>

        <Listbox.Options
           style={{boxShadow: "5px 5px 10px rgba(15, 27, 40, 0.23), -5px -5px 10px #FAFBFF", scrollbarWidth: "none", border: "2px solid #E5E8F0", borderRadius: "20px"}}
           className="absolute py-4 z-10 rounded-xl font-medium mt-1 max-h-64 w-full overflow-y-scroll rounded-md bg-white text-base shadow-lg sm:text-sm ring-0">
        {loadingFolders ?
        <div className='w-full px-6 pt-2 pb-4 flex justify-center items-center'>
          <MultiLineSkeletonLoader lines={3} justifyContent='left' />
        </div>
        :
        <>
        {folders.map((folder, folderIdx) => (
          <FolderItem 
            key={folderIdx} 
            folder={folder} 
            handleSelect={handleSelect} 
            selectedFolders={selectedFolders} 
            isOpen={openFolders.includes(folder._id)}
            onToggle={toggleFolder}
          />
        ))}
        </>
        }
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
