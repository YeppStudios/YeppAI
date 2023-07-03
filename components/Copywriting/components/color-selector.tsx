import { Editor } from "@tiptap/core";
import cx from "classnames";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const [position, setPosition] = useState({ top: 0 });
  const items: BubbleColorMenuItem[] = [
    {
      name: "Default",
      color: "#000000",
    },
    {
      name: "Purple",
      color: "#9333EA",
    },
    {
      name: "Red",
      color: "#E00000",
    },
    {
      name: "Blue",
      color: "#2563EB",
    },
    {
      name: "Green",
      color: "#008A00",
    },
    {
      name: "Orange",
      color: "#FFA500",
    },
    {
      name: "Pink",
      color: "#BA4081",
    },
    {
      name: "Gray",
      color: "#A8A29E",
    },
  ];

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
  
  
  const activeItem = items.find(({ color }) =>
    editor.isActive("textStyle", { color }),
  );

  return (
    <div className="relative h-full overflow-visible">
      <button
        className="flex h-full rounded-r-xl items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200 bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ color: activeItem?.color || "#000000" }}>A</span>

        <ChevronDown className="h-4 w-4 " />
      </button>

      {isOpen && (
        <section 
          style={{top: `${position.top}px`}} 
          className="absolute border border-stone-200 rounded-xl z-20 mt-14 flex w-48 flex-col overflow-hidden bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          {items.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setIsOpen(false);
              }}
              className={cx(
                "flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100",
                {
                  "text-blue-600": editor.isActive("textStyle", { color }),
                },
              )}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-200 px-1 py-px font-medium"
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
