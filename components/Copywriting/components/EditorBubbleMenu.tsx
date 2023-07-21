import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";
import cx from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  RepeatIcon,
  UnderlineIcon,
  
} from "lucide-react";

import { NodeSelector } from "./node-selector";
import { ColorSelector } from "./color-selector";
import api from "@/pages/api";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import LoadingCircle from "../shared/loading-circle";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  let { from, to } = props.editor.state.selection;

  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: () => props.editor.isActive("bold"),
      command: () => {
        props.editor.chain().focus().toggleBold().run();
        props.editor.commands.setTextSelection({
          from: to,
          to: to,
        });
        setOpenPopup(false);
      },
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: () => props.editor.isActive("italic"),
      command: () => {
        props.editor.chain().focus().toggleItalic().run();
        props.editor.commands.setTextSelection({
          from: to,
          to: to,
        });
        setOpenPopup(false);
      },
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: () => props.editor.isActive("underline"),
      command: () => {
        props.editor.chain().focus().toggleUnderline().run();
        props.editor.commands.setTextSelection({
          from: to,
          to: to,
        });
        setOpenPopup(false);
      },
      icon: UnderlineIcon,
    },
    {
      name: "rewrite",
      isActive: () => props.editor.isActive("rewrite"),
      command: () => {
        rewrite();
      },
      icon: RepeatIcon,
    },
  ];

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState(new AbortController());
  const [generating, setGenerating] = useState(false);
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);

    // Get the current selection whenever it changes
    useEffect(() => {
      const { from, to } = props.editor.state.selection;
      
      if (from !== to && props.editor.view.dom.parentNode) {
        const selection = window.getSelection();
        if (selection) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const container = document.getElementById('scrollable-editor');
          if (container) {
            const containerRect = container.getBoundingClientRect();
      
            setPosition({
              top: rect.top - containerRect.top + container.scrollTop - 50,
              left: rect.left - containerRect.left - 10,
            });
          }
        }
      }
    }, [props.editor.state.selection, props.editor.view.dom.parentNode, props.editor.view.state.selection]);
    

  useEffect(() => {
    if (props.editor.view.state.selection.content().size > 0) {
      setOpenPopup(true);
    } else {
      setOpenPopup(false);
    }
  }, [props.editor.view.state.selection]);


  const stopReplying = () => {
    abortController.abort();
  }

  const rewrite = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    const workspace = localStorage.getItem("workspace");
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    setIsLoading(true);
    if (generating) {
      stopReplying();
      return;
    }
    const { from, to } = props.editor.state.selection;
    let initialPosition = from;
    const selectedText = props.editor.state.doc.textBetween(from, to);
    props.editor.chain().focus().deleteSelection().run();
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
    let prompt = `
    Please analyze what you have written to understand the context, your intents and tone of voice: ${selectedText}. Now please rewrite it in a new way keeping the same meaning and tone of voice.
    `;
    let systemPrompt = "You are a creative copywriter with years of experience. You write best performing SEO content for your clients. You are great at understanding the context, intents of the writer and adjusting your tone of voice. You always find some interesting and relevant facts to include in your writing. You never write anything offensive or controversial. You always write fluently in whatever languaguage the previously written content is.";
    let model = "gpt-4";
    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: "Content rewrite", model, systemPrompt}),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.body){
        setOpenPopup(false);
        setIsLoading(false);
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setGenerating(false);
            props.editor.commands.setTextSelection({
              from: from,
              to: from + reply.length,
            });
            break;
          }
  
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                reply += data.content;
                props.editor.view.dispatch(
                  props.editor.view.state.tr.insertText(data.content, initialPosition)
                );
                initialPosition += data.content.length;
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
  }, [generating, abortController, props.editor]); 


  return (
    <>
    {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
    {openPopup && 
    <div
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className="flex absolute rounded-xl shadow-xl z-50 bg-white items-center border border-stone-200"
    >
      <NodeSelector
        editor={props.editor}
      />

      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.command}
          className="p-2 text-stone-600 hover:bg-stone-100 h-full bg-white active:bg-stone-200 relative"
        >
          {item.name === "rewrite" && isLoading ?
          <LoadingCircle />
          :
          <item.icon
            className={cx("h-4 w-4", {
              "text-blue-500": item.isActive(),
            })}
          />
          }
        </button>
      ))}
      <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={setIsColorSelectorOpen}
      />
    </div>
    }
    </>
  );
};