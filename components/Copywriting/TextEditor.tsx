"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/router";
import { EditorBubbleMenu } from "./components";
import BackBtn from "../Common/BackBtn";
import BackBtnIcon from "../Common/BackBtnIcon";
import Image from "next/image";
import backIcon from "../../public/images/backArrow.png";
import api from "@/pages/api";
import MultiLineSkeletonLoader from "../Common/MultilineSkeletonLoader";
import { selectedUserState } from "@/store/userSlice";
import NoElixir from "../Modals/LimitModals/NoElixir";
import { BottomMenu } from "./components/BottomMenu";
import axios from "axios";
import EditorSidebar from "./components/EditorSidebar";
import styled from "styled-components";
import { selectFoldersState } from '@/store/selectedFoldersSlice'
import { useSelector } from 'react-redux'
import {
  Wand2Icon,
} from "lucide-react";
import Space from "../Docs/common/Space";
import Centered from "../Centered";
import Toolbar from "./components/Toolbar";

interface Document {
  owner: string,
  title: string,
  category: string,
  timestamp: string,
  ownerEmail: string,
  vectorId: string
}
interface Folder {
  owner: string,
  title: string,
  category: string,
  documents: Document[] | [],
  updatedAt: string,
  _id:  string,
  workspace: string,
}

export default function Editor({setPage, title, conspect, description, embeddedVectorIds, contentType, language, setDescription, setTitle, toneOfVoice, setToneOfVoice, sectionLength, selectedTonePrompt}: any) {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [hydrated, setHydrated] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [editorLoading, setEditorLoading] = useState(false);
  const [sectionIndex, setSectionIndex] = useState<number> (1);
  const [createdSeoCotentId, setCreatedSeoContentId] = useState<any>(null);
  const [abortController, setAbortController] = useState(new AbortController());
  const [generating, setGenerating] = useState(false);
  const user = useSelector(selectedUserState);
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [bottomMenuPosition, setBottomMenuPosition] = useState<{ top: number; left: number }>();
  const [nextSection, setNextSection] = useState("");
  let selectedFolders: Folder[] = useSelector(selectFoldersState);

  const router = useRouter();
  const { contentId } = router.query;
  
  const stopReplying = () => {
    abortController.abort();
  }
  
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = e.editor.state.doc.textBetween(
        selection.from,
        selection.from,
        "\n",
      );
        debouncedUpdates(e);
    },
    autofocus: "end",
  });

  const countWords = () => {
    let wordCount = 0;
    if (editor) {
      const text = editor.getHTML(); // get HTML content
      const plainText = text.replace(/<[^>]*>/g, ' '); // convert to plain text
      const wordArray = plainText.trim().split(/\s+/); // split into words
      if (wordArray[0].length > 0){
        wordCount = wordArray.length;
      }
    }

    return wordCount;
  }

  function countNonWhitespaceCharacters() {
    let wordscount = 0;
    if (editor) {
    let documentString = editor?.getText();
    let stringWithoutWhitespace = documentString?.replace(/\s/g, '');
    wordscount = stringWithoutWhitespace?.length;
    }
    return wordscount;
}

useEffect(() => {
  const fetchSavedContent = async () => {
    setEditorLoading(true);
    try {
      if (contentId) {
        const response = await api.get(`/seoContent/${contentId}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setTitle(response.data.title)
        const content = response.data.content;
        editor?.commands.setContent(content);
      }
    } catch (error) {
      console.error(error);
      setEditorLoading(false);
    } finally {
      setEditorLoading(false);
    }
  };
  fetchSavedContent();
}, [contentId]);


  const generateIntro = async () => {
    if (editor) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    setEditorLoading(true);
    // const startPos = editor.state.selection.from;
    if (generating) {
      stopReplying();
      return;
    }
    const startPos = editor.state.selection.from;
    editor.chain().focus().insertContent(`<h1>${conspect[0].header}</h1>`).run();
    editor.chain().insertContent("<p id='content'></p>").run();
    editor.chain().insertContent("\n").run();
    setGenerating(true);
    let fetchedUser = null;
    if (workspace && workspace !== "null" && workspace !== "undefined") {
      const {data} = await api.get(`/workspace-company/${workspace}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data.company;
    } else {
      const {data} = await api.get(`/users/${userId}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data;
    }
    //make sure user has elixir
    if(fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      return;
    }

    let reply = "";
    let context = "";
    let companyDataIds = [];
    let allDocuments = selectedFolders.reduce((acc: Document[], folder: Folder) => {
      return acc.concat(folder.documents || []);
    }, [] as Document[]);
    
    if (allDocuments.length > 0) {
      try {
        const vectorIdsResponse = await api.post("/getPineconeIds", {documents: allDocuments}, {
          headers: {
            Authorization: token
          }
        });
        companyDataIds = vectorIdsResponse.data;
      } catch (e) {
        console.log(e);
      }
    }
    
    // Combine companyDataIds and embeddedVectorIds
    let combinedIds = [...companyDataIds, ...embeddedVectorIds];
    
    // Check if combined array is not empty
    if (combinedIds.length > 0) {
      try {
        const chunks = await axios.post(
          "https://www.asistant.ai/query",
          {
            "queries": [
              {
                "query": conspect[0].header,
                "filter": {
                  "document_id": combinedIds  // Use combined array here
                },
                "top_k": 2
              }
            ]
          },
          {
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
            }
          }
        );
    
        chunks.data.results[0].results.forEach((item: { text: string; }) => {
          context += item.text + " ";
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Combined ID array is empty. Not sending query.");
    }
    let tonePrompt = ``;
    if (selectedTonePrompt) {
      tonePrompt = `Write it in the following tone of voice of ${toneOfVoice}: ${selectedTonePrompt}`;
    }

    let prompt = `Additional context that you might find relevant, but not necessary to include in the introduction:
    ${context}
    
    Please write a professional introduction for my ${contentType} titled ${title} in ${language} language using ${toneOfVoice} tone of voice. Make sure to write it in no more than ${sectionLength} characters.
    This is the introduction header:
    ${conspect[0].header}
    And this is how I want you to write the introduction:
    ${conspect[0].instruction}
    ${tonePrompt}
    End this intro so that it will be easy to continue writing the next section: ${conspect[1].header}
    Introduction: 
    `;
    let systemPrompt = `You're a professional copywriter that specializes in writing ${contentType} introductions. ${language} is your native language. You craft an informative introduction for a ${contentType} about ${title} that is optimized to attract and engage readers. You use your expert knowledge in ${title} topic to immediately captivate the target audience interest, and then provide them with well-researched and valuable insights. You write in a tone that matches the subject at hand while ensuring the language remains easy-to-understand and approachable. You always make the introductions flow seamlessly by using a captivating heading. Finally, you ensure the introduction is error-free, meeting all ${language} grammatical standards required for a professional copywriter and follows best SEO practices. You always respond just with introduction without header.`;
    let model = "gpt-4-32k";

    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: "Generated intro of SEO content", model, systemPrompt, temperature: 0.75}),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.body){
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setGenerating(false);
            if (conspect.length > 1) {
              setNextSection("Write 2nd section");
            }
            if (editor) {
              const endPos = startPos + reply.length;
              const rect = editor.view.coordsAtPos(endPos);
              setBottomMenuPosition({
                top: rect.top + window.scrollY + 75,
                left: rect.left -180
              });
            }
            setShowBottomMenu(true);
            localStorage.setItem("generateIntro", "false");
            const conversationBottom = document.getElementById("conversation-bottom");
            if(conversationBottom){
                conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
            }
            break;
          }
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          setEditorLoading(false);
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                reply += data.content;
                editor.chain().focus().setTextSelection(editor.state.doc.content.size).insertContent(data.content).run();
              }              
            } catch (error) {
              console.error('Error parsing JSON:', jsonString, error);
            }
          }
        }
      }
    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        setGenerating(false);
      } else {
        console.log(e);
        setGenerating(false);
      }
    } finally {
      abortController.abort();
    }
    }
  }

  const generateNextSection = async () => {
    if (editor) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    setShowBottomMenu(false);
    setAiThinking(true);
    if (generating) {
      stopReplying();
      return;
    }
    if (!sectionIndex) {
      setSectionIndex(1);
    } else if (sectionIndex + 2 < conspect.length) {
      if (sectionIndex + 2 === 3) {
        setNextSection("Write 3rd section");
      } else {
        setNextSection(`Write ${sectionIndex + 2}th section`);
      }
      setSectionIndex(sectionIndex + 1);
    } else if (sectionIndex + 2 === conspect.length ) {
      setSectionIndex(sectionIndex + 1);
      setNextSection("Write a summary");
    } else {
      setNextSection("end");
    }
    let startPos = editor.state.selection.from;
    let endPos = editor.state.doc.content.size;
    editor.chain().focus().setTextSelection(endPos).insertContent("\n\n").run();
    editor.chain().focus().setTextSelection(endPos).insertContent(`<h1>${conspect[sectionIndex].header}</h1>`).run();
    editor.chain().setTextSelection(endPos + conspect[sectionIndex].header.length + 5).insertContent("<p id='content'></p>").run();
    editor.chain().focus().setTextSelection(endPos).insertContent("\n\n").run();
    setGenerating(true);
    let fetchedUser = null;
    if (workspace && workspace !== "null" && workspace !== "undefined") {
      const {data} = await api.get(`/workspace-company/${workspace}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data.company;
    } else {
      const {data} = await api.get(`/users/${userId}`, {
        headers: {
          authorization: token
        }
      });
      fetchedUser = data;
    }
    //make sure user has elixir
    if(fetchedUser.tokenBalance <= 0) {
      setOpenNoElixirModal(true);
      return;
    }

    let reply = "";
    let context = "";
    let companyDataIds = [];
    let allDocuments = selectedFolders.reduce((acc: Document[], folder: Folder) => {
      return acc.concat(folder.documents || []);
    }, [] as Document[]);
    
    if (allDocuments.length > 0) {
      try {
        const vectorIdsResponse = await api.post("/getPineconeIds", {documents: allDocuments}, {
          headers: {
            Authorization: token
          }
        });
        companyDataIds = vectorIdsResponse.data;
      } catch (e) {
        console.log(e);
      }
    }
    
    // Combine companyDataIds and embeddedVectorIds
    let combinedIds = [...companyDataIds, ...embeddedVectorIds];
    
    // Check if combined array is not empty
    if (combinedIds.length > 0) {
      try {
        const chunks = await axios.post(
          "https://www.asistant.ai/query",
          {
            "queries": [
              {
                "query": conspect[sectionIndex].header,
                "filter": {
                  "document_id": combinedIds  // Use combined array here
                },
                "top_k": 2
              }
            ]
          },
          {
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PYTHON_API_KEY}`
            }
          }
        );
    
        chunks.data.results[0].results.forEach((item: { text: string; }) => {
          context += item.text + " ";
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Combined ID array is empty. Not sending query.");
    }

    let endStyle = "";
    if (sectionIndex + 1 !== conspect.length ) {
      endStyle = `End this section, so that it will be easy to fluently start writing next one titled: "${conspect[sectionIndex + 1].header}" without mentioning it.`;
    }

    let tonePrompt = ``;
    if (selectedTonePrompt) {
      tonePrompt = `Write it in the following tone of voice of ${toneOfVoice}: ${selectedTonePrompt}`;
    }

    const text = editor.getText();
    let prompt = `Additional context that you might find relevant, but not necessary to include in the section:
    ${context}
    
    This is the previous paragraph of my ${contentType}: "...${text.slice(-500)}". Now please without repeating yourself, starting from new line write content for the next ${contentType} paragraph titled: "${conspect[sectionIndex].header}" in ${language} language using ${toneOfVoice} tone of voice. Ensure that it keeps the flow of the previous paragraph. Make sure to write it in no more than ${sectionLength} characters.
    When writing this paragraph, please follow these instructions:
    ${conspect[sectionIndex].instruction}
    Make sure to use the following keywords: ${conspect[sectionIndex].keywords}
    ${endStyle}
    ${tonePrompt}
    Now understanding the guidelines come up with the paragraph content:
    `;
    let systemPrompt = `You are a professional ${language} copywriter that specializes in writing ${contentType} sections. You craft section for a ${contentType} about ${title} that is optimized to attract and engage readers from start to finish. You use your expert knowledge in ${title} topic to provide readers with well-researched and valuable insights. You keep sections brief and on point without writing unnecessary introductions. You write as human would in an emphatic way using ${toneOfVoice} tone of voice. You are ensuring the text remains easy-to-understand, emphatic and approachable. Your section flow seamlessly from the previous one into a new thread. Finally, you ensure the written section is error-free, follows best SEO practices and is meeting all ${language} grammatical standards required for a professional copywriter. You always respond only with ${contentType} section without header.`;
    let model = "gpt-4-32k";

    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: `Generated section of ${contentType}`, model, systemPrompt, temperature: 0.85}),
        });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.body){
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setGenerating(false);
            if (editor) {
              const endPos = startPos + reply.length;
              const rect = editor.view.coordsAtPos(endPos);

              // Get the container's scroll position and bounding rectangle
              const container = document.getElementById('scrollable-editor');
              if (container) {
                const containerRect = container.getBoundingClientRect();

                // Adjust the bottom menu's position
                if (sectionIndex + 2 === conspect.length ) {
                  setBottomMenuPosition({
                    top: rect.top - containerRect.top + container.scrollTop + 85,
                    left: rect.left - containerRect.left -120
                  });
                } else {
                  setBottomMenuPosition({
                    top: rect.top - containerRect.top + container.scrollTop + 65,
                    left: rect.left - containerRect.left -120
                  });
                }
              }
            }

            const conversationBottom = document.getElementById("conversation-bottom");
            if(conversationBottom){
                conversationBottom.scrollIntoView({behavior: 'smooth', block: 'end'});
            }
            setShowBottomMenu(true);
            break;
          }
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          setAiThinking(false);
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                reply += data.content;
                editor.chain().focus().setTextSelection(editor.state.doc.content.size).insertContent(data.content).run();
              }              
            } catch (error) {
              console.error('Error parsing JSON:', jsonString, error);
            }
          }
        }
      }
    } catch (e: any) {
      if (e.message === "Fetch is aborted") {
        setGenerating(false);
      } else {
        console.log(e);
        setGenerating(false);
      }
    } finally {
      abortController.abort();
    }
    }
  }

  useEffect(() => {
    if (editor) {
      editor.commands.focus()
    }
  }, [editor, editor?.state.doc.content.size]);
  
  useEffect(() => {
    const startGenerating = localStorage.getItem("generateIntro");
    if (startGenerating === "true") {
      generateIntro();
    }
  }, [editor]);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus("Saving...");
    setContent(json);
    if (createdSeoCotentId || contentId) {
      let id = createdSeoCotentId || contentId;
      await api.patch(`/updateSeoContent/${id}`, {
        content: json.content,
        title
      }, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      })
      setSaveStatus("Saved");
    } else {
      const createdContentResponse = await api.post("/addSeoContent", {
        content: json.content,
        title,
        owner: user._id,
        savedBy: user.email,
      }, {
        headers: {
          authorization: localStorage.getItem("token"),
        }
      })
      setSaveStatus("Saved");
      setCreatedSeoContentId(createdContentResponse.data._id);
    }

    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 650);
  }, 1500);


  // Hydrate the editor with the content
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);


  const handleBack = async () => { 
    const newQuery = { ...router.query };
    delete newQuery.contentId;

    // Replace the current entry in the history
    await router.replace({
      pathname: router.pathname, // keep the same path
      query: newQuery, // use the updated query object
    }, undefined, { shallow: true });
    
    setPage(1);
  }

  return (
    <PageContent  onClick={() => {setShowBottomMenu(false)}}>
      {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
      <EditorContainer
        onClick={() => {editor?.chain().focus().run()}}
        id="scrollable-editor"
      >
      <div className="sticky w-full bg-white overflow-visible rounded-lg left-0 mb-10 py-4 pb-2 -top-1 text-sm text-stone-400 flex items-center justify-between z-10">
      <div className="-mt-4 -ml-12">
        <BackBtn onClick={() => handleBack()}>
          <BackBtnIcon>
              <Image style={{ width: "100%", height: "auto" }}  src={backIcon} alt={'logo'}></Image> 
          </BackBtnIcon> 
        </BackBtn>  
      </div> 
      {editor && <Toolbar editor={editor} />}
      {editor &&  
        <div className="flex items-center h-full -mr-12">
          <div className="ml-4">
            {countWords()} Words
          </div>
          <div className="ml-4 mr-4">
            {countNonWhitespaceCharacters()} Chars
          </div>
          {saveStatus}
          {(nextSection && !generating && nextSection !== "end") &&
          <ConspectTab onClick={() => generateNextSection()} className="border-2"><ConspectIcon><Wand2Icon style={{ width: "auto", height: "100%" }} /></ConspectIcon>
          <p>{nextSection}</p>
          </ConspectTab>
          }
        </div>
      }
      </div>
  
      {editor && <EditorBubbleMenu editor={editor} />}
      <Centered>
      <EditorText>
      {editorLoading ?
        <MultiLineSkeletonLoader lines={7} justifyContent={"left"} />
        :
        <EditorContent editor={editor} />
      }
      </EditorText>
      </Centered>
      <Centered>
      <EditorText>
      {aiThinking &&
          <MultiLineSkeletonLoader lines={5} justifyContent={"left"} />
      }
      </EditorText>
      </Centered>
      <div onClick={(e) => e.stopPropagation()}>
      {(showBottomMenu && editor) && <BottomMenu editor={editor} menuPosition={bottomMenuPosition} generateNextSection={() => generateNextSection()} nextSection={nextSection}/>}
      </div>
      <Space margin="4rem" />
      <div id="conversation-bottom"></div>     
    </EditorContainer>
    {!conspect &&
    <EditorSidebar 
      description={description} 
      title={title} 
      setTitle={setTitle} 
      setDescription={setDescription} 
      editor={editor}
      embeddedVectorIds={embeddedVectorIds} 
      abortController={abortController} 
      setAbortController={setAbortController}
      generating={generating}
      setGenerating={setGenerating}
      setToneOfVoice={setToneOfVoice}
      toneOfVoice={toneOfVoice}
      />
    }

    </PageContent>
  );
}


const PageContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ConspectTab = styled.div`
    padding: 0.4rem 1rem 0.4rem 1rem;
    border-radius: 12px;
    color: black;
    box-shadow: 2px 2px 5px rgba(15, 27, 40, 0.23);
    margin-bottom: 0.5rem;
    font-weight: 500;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      box-shadow: none;
      transform: scale(0.96);
    }
`

const ConspectIcon = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`

const EditorContainer = styled.div`
  height: calc(100vh - 1.5rem); 
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  overflow-x: visible;
  box-shadow: 2px 2px 5px rgba(15, 27, 40, 0.2), 0px -20px 20px #EEF1FA;
  position: relative;
  cursor: auto;
  background: white;
  border: 2px solid #EAEDF5;
  padding: 0 6rem 4rem 6rem;
  border-radius: 25px;
  color: black;
  flex: 1;
`

const EditorText = styled.div`
  width: 44rem;
`

const ToolbarBtn = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 12px;
  margin: 0 1rem 0 1rem;
  color: black;
  box-shadow: 2px 2px 5px rgba(15, 27, 40, 0.23);
  margin-bottom: 0.5rem;
  font-weight: 500;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`