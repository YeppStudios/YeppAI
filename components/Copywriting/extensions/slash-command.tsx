import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Text,
  TextQuote,
  Image as ImageIcon,
  Code,
  CheckSquare,
} from "lucide-react";
import LoadingCircle from "../shared/loading-circle";
import Magic from "../shared/magic";
import api from "@/pages/api";
import NoElixir from "@/components/Modals/LimitModals/NoElixir";
import { selectFoldersState } from '@/store/selectedFoldersSlice'
import { useSelector } from 'react-redux'
import axios from "axios";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface CommandProps {
  editor: Editor;
  range: Range;
}

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


const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          const expandedRange = { from: range.from - 1, to: range.to };
          if (expandedRange.from !== expandedRange.to) {
            editor.chain().deleteRange(expandedRange).run();
          }
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Failed to create canvas context"));
        return;
      }
      let width = image.width;
      let height = image.height;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob"));
        }
      }, file.type);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: "Ask AI",
      description: "Use AI to expand your thoughts.",
      searchTerms: ["gpt"],
      icon: <Magic className="w-7 text-black" />,
    },
    {
      title: "Text",
      description: "Just start typing with plain text.",
      searchTerms: ["p", "paragraph"],
      icon: <Text size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: "To-do List",
      description: "Track tasks with a to-do list.",
      searchTerms: ["todo", "task", "list", "check", "checkbox"],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      searchTerms: ["title", "big", "large"],
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      searchTerms: ["subtitle", "medium"],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      searchTerms: ["subtitle", "small"],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list.",
      searchTerms: ["unordered", "point"],
      icon: <List size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      searchTerms: ["ordered"],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Quote",
      description: "Capture a quote.",
      searchTerms: ["blockquote"],
      icon: <TextQuote size={18} />,
      command: ({ editor, range }: CommandProps) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      searchTerms: ["codeblock"],
      icon: <Code size={18} />,
      command: ({ editor, range }: CommandProps) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: "Image",
      description: "Upload an image from your computer.",
      searchTerms: ["photo", "picture", "media"],
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }: CommandProps) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          const resizedFile = await resizeImage(file, 800, 600);
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event?.target?.result;
            if (!imageUrl) return;
            const { from } = editor.state.selection;
            editor.view.dispatch(
              editor.view.state.tr
                .insert(from, editor.state.schema.nodes.image.create({ src: imageUrl }))
                .setMeta("addToHistory", true),
            );
          };
          reader.readAsDataURL(resizedFile);
        };
        input.click();
      },
      isActive: () => false,
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term: string) => term.includes(search)))
      );
    }
    return true;
  });
};

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

const CommandList = ({
  items,
  command,
  editor,
  range,
}: {
  items: CommandItemProps[];
  command: any;
  editor: any;
  range: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [abortController, setAbortController] = useState(new AbortController());
  const [generating, setGenerating] = useState(false);
  const [openNoElixirModal, setOpenNoElixirModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAIInput, setShowAIInput] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [userInput, setUserInput] = useState("");
  let selectedFolders: Folder[] = useSelector(selectFoldersState);

  const aiInput = useRef<HTMLInputElement>(null);

  const stopReplying = () => {
    abortController.abort();
  }


const complete = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.length === 0) {
      return;
    }
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
    setGenerating(true);
    let initialPosition = range.from;
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

    const text = editor.getText();
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
    
    // Check if combined array is not empty
    if (companyDataIds.length > 0) {
      try {
        const chunks = await axios.post(
          "http://165.227.147.24:8000/query",
          {
            "queries": [
              {
                "query": userInput,
                "filter": {
                  "document_id": companyDataIds  // Use combined array here
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

    let prompt = `
    Closely analize the text I have written to understand the intents, context and adjust the tone of voice. Once you have an uderstanding of what I'm writing now answer ${userInput}. Make this completion no longer than 5 sentences long. So far I have written above: "${text.slice(-750)}".
    Extra context you might find useful: ${context}
    `;
    let systemPrompt = "You are a creative copywriter with years of experience. You write best performing SEO content without overcomplicating it for readers and making it easy to read. You are great at understanding the context, intents of the writer and adjusting your tone of voice. You always find some interesting and relevant facts to include in your writing. You never write anything offensive or controversial. You always write fluently in whatever languaguage the user content is.";
    let model = "gpt-4-32k";
    try {
        const response = await fetch('https://asystentai.herokuapp.com/askAI', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `${token}`},
          signal: newAbortController.signal,
          body: JSON.stringify({prompt, title: "Generated fragment of SEO content", model, systemPrompt}),
        });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.body){
        editor.chain().focus().deleteRange(range).run();
        setIsLoading(false);
        setOpenList(false);
        setShowAIInput(false);
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setGenerating(false);
            editor.commands.setTextSelection({
              from: range.from,
              to: range.from + reply.length + 1,
            });
            break;
          }
  
          const jsonStrings = new TextDecoder().decode(value).split('data: ').filter((str) => str.trim() !== '');
          for (const jsonString of jsonStrings) {
            try {
              const data = JSON.parse(jsonString);
              if (data.content) {
                reply += data.content;
                editor.view.dispatch(
                    editor.view.state.tr.insertText(data.content, initialPosition)
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
  }, [generating, abortController, userInput]); 

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        if (item.title === "Ask AI") {
          setShowAIInput(true);
          setOpenList(false);
          setTimeout(() => {
            if (aiInput.current) {
              aiInput.current.focus();
            } else {
              console.log('aiInput is not assigned');
            }
          }, 0);
        }  else { 
          command(item);
        }
      }
    },
    [complete, command, editor, items],
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter", "Escape"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        if(document.activeElement !== aiInput.current){
          e.preventDefault();
          if (e.key === "ArrowUp") {
            setSelectedIndex((selectedIndex + items.length - 1) % items.length);
            return true;
          }
          if (e.key === "ArrowDown") {
            setSelectedIndex((selectedIndex + 1) % items.length);
            return true;
          }
          if (e.key === "Enter") {
            selectItem(selectedIndex);
            return true;
          }
        }
        if (e.key === "Escape") {
          setShowAIInput(false);
          setOpenList(false);
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);


  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const commandListContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;
    const item = container?.children[selectedIndex] as HTMLElement;
    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <>
    {openNoElixirModal && <NoElixir onClose={() => setOpenNoElixirModal(false)} />}
    {openList &&
    <div
      id="slash-command"
      ref={commandListContainer}
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto scroll-smooth rounded-xl border border-stone-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            className={`flex w-full items-center space-x-2 rounded-xl px-2 py-1 text-left text-sm text-stone-900 hover:bg-stone-100 ${
              index === selectedIndex ? "bg-stone-100 text-stone-900" : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white">
              {item.title === "Continue writing" && isLoading ? (
                <LoadingCircle />
              ) : (
                item.icon
              )}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-stone-500">{item.description}</p>
            </div>
          </button>
        );
      })}
    </div>
    }
    {(!openList && showAIInput) &&
    <div onClick={(e) => e.stopPropagation()}>
    <form onSubmit={(e) => complete(e)} className="z-50 h-12 w-81 -mt-10 flex rounded-xl border border-stone-200 bg-white shadow-md transition-all">
      <input value={userInput} onChange={(e) => setUserInput(e.target.value)} ref={aiInput} style={{width: "20rem"}} className="w-81 w-auto h-full outline-none px-4 font-medium"/>
      <button type="submit" className="h-full transition-100 px-5 border-l hover:bg-black hover:text-white rounded-r-xl flex items-center justify-center">
        {isLoading ?
          <LoadingCircle />
          :
          <Magic className={"w-6"} />
        }
      </button>
    </form>
    </div>
    }
    </>
  ) : null;
};

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      // @ts-ignore
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0].hide();

        return true;
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});

export default SlashCommand;