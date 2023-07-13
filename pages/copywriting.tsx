import PageTemplate from "@/components/Common/PageTemplate";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import FirstPage from "@/components/Copywriting/FirstPage";
import CopywritingModal from "@/components/Modals/AddingModals/CopywritingModal";
import TextEditor from "@/components/Copywriting/TextEditor";

const DocumentCreator = () => {
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [copywritingModal, setCopywritingModal] = useState(false);
  const [embeddedVectorIds, setEmbeddedVectorIds] = useState<any[]>([]);
  const [toneOfVoice, setToneOfVoice] = useState("");
  const [conspect, setConspect] = useState<any>(null);
  const [title, setTitle] = useState("New Document");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [sectionLength, setSectionLength] = useState();
  const [page, setPage] = useState(1);
  const [contentType, setContentType] = useState("");


  useEffect(() => {
    if (conspect) {
      setConspect(conspect);
    }
  }, [conspect]);

  const finishCopywritingIntro = async () => {
    setPage(2);
    setCopywritingModal(false);
    console.log(embeddedVectorIds)
  }

  return (
    <PageTemplate userProfiles={[]}>
      <Head>
          <title>Copywriting | Yepp AI</title>
          <meta name="description" content="Craft unique SEO internet-based content on any topic with AI." />
      </Head>
      {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
      {copywritingModal && <CopywritingModal 
        onClose={() => setCopywritingModal(false)} 
        onSuccess={() => finishCopywritingIntro()} 
        conspect={conspect}
        setConspect={setConspect}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        embeddedVectorIds={embeddedVectorIds}
        setEmbeddedVectorIds={setEmbeddedVectorIds}
        contentType={contentType}
        setContentType={setContentType}
        language={language}
        setLanguage={setLanguage}
        toneOfVoice={toneOfVoice}
        setToneOfVoice={setToneOfVoice}
        setSectionLength={setSectionLength}
      />}
      {page === 1 &&
        <FirstPage nextPage={() => setPage(2)} openModal={() => setCopywritingModal(true)}/>
      }
      {page === 2 &&
            <TextEditor 
              setPage={setPage} 
              title={title} 
              conspect={conspect} 
              description={description} 
              embeddedVectorIds={embeddedVectorIds} 
              contentType={contentType}
              language={language}
              setDescription={setDescription}
              setTitle={setTitle}
              toneOfVoice={toneOfVoice}
              setToneOfVoice={setToneOfVoice}
              sectionLength={sectionLength}
            />
      }
    </PageTemplate>
  )
}

export default DocumentCreator;
