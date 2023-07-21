import { Editor } from "@tiptap/core";
import cx from "classnames";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
} from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { BubbleMenuItem } from "./EditorBubbleMenu";

interface NodeSelectorProps {
  editor: Editor;
}

export const NodeSelector: FC<NodeSelectorProps> = ({editor}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0 });
  
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => {
        const { from, to } = editor.state.selection;
        editor.view.dispatch(
          editor.view.state.tr
            .replaceSelectionWith(
              editor.state.schema.nodes.heading.create(
                { level: 1 },
                editor.state.doc.slice(from, to).content,
              ),
            )
            .setMeta("addToHistory", true),
        );
      },
      isActive: () => editor.isActive("heading", { level: 1 }),

    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => {
        const { from, to } = editor.state.selection;
        editor.view.dispatch(
          editor.view.state.tr
            .replaceSelectionWith(
              editor.state.schema.nodes.heading.create(
                { level: 2 },
                editor.state.doc.slice(from, to).content,
              ),
            )
            .setMeta("addToHistory", true),
        );
      },
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => {
        const { from, to } = editor.state.selection;
        editor.view.dispatch(
          editor.view.state.tr
            .replaceSelectionWith(
              editor.state.schema.nodes.heading.create(
                { level: 3 },
                editor.state.doc.slice(from, to).content,
              ),
            )
            .setMeta("addToHistory", true),
        );
      },
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => {
        const { from, to } = editor.state.selection;
        const fragment = editor.state.doc.slice(from, to).content;
        const text = fragment.textBetween(from, fragment.size);
        editor.view.dispatch(
          editor.view.state.tr
            .replaceSelectionWith(
              editor.state.schema.nodes.bulletList.create(
                {},
                editor.state.schema.nodes.listItem.create(
                  {},
                  editor.state.schema.nodes.paragraph.create(
                    {},
                    editor.state.doc.slice(from, to).content,
                  ),
                ),
              ),
            )
            .setMeta("addToHistory", true),
        );
      },
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => {
        const { from, to } = editor.state.selection;
        const fragment = editor.state.doc.slice(from, to).content;
        const text = fragment.textBetween(from, fragment.size);
        editor.view.dispatch(
          editor.view.state.tr
            .replaceSelectionWith(
              editor.state.schema.nodes.orderedList.create(
                {},
                editor.state.schema.nodes.listItem.create(
                  {},
                  editor.state.schema.nodes.paragraph.create(
                    {},
                    editor.state.doc.slice(from, to).content,
                  ),
                ),
              ),
            )
            .setMeta("addToHistory", true),
        );
      },
      isActive: () => editor.isActive("orderedList"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };


  useEffect(() => {
    const { from, to } = editor.state.selection;
    
    if (from !== to && editor.view.dom.parentNode) {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const container = document.getElementById('scrollable-editor');
        if (container) {
          const containerRect = container.getBoundingClientRect();
    
          setPosition({
            top: - containerRect.top,
          });
        }
      }
    }
  }, [editor.view.state.selection]);
  
  return (
    <div className="relative overflow-visible bg-white h-full rounded-xl">
      <button
        className="flex whitespace-nowrap rounded-l-xl items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        onClick={() => {
            setIsOpen(!isOpen);
        }}
      >
        <span>{activeItem?.name}</span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section 
          style={{top: `${position.top}px`}} 
          className="absolute border border-stone-200 rounded-xl z-20 mt-14 flex w-48 flex-col overflow-hidden bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className={cx(
                "flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100",
                {
                  "text-blue-600": item.isActive(),
                },
              )}
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && <Check className="h-4 w-4" />}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};