import styled from "styled-components";
import { Editor } from "@tiptap/core";
import cx from "classnames";
import { FC, useState } from "react";
import {
    Check,
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    ListOrdered,
    TextIcon,
    ImageIcon,
  } from "lucide-react";
import classNames from "classnames";

interface NodeSelectorProps {
    editor: Editor;
  }
  
const Toolbar: FC<NodeSelectorProps> = ({editor}) => {
    const [isOpen, setIsOpen] = useState(false);
    const items: any[] = [
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
        {
          name: "Image",
          icon: ImageIcon,
          command: () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = () => {
              const file = input.files?.[0];
              if (!file) return;
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
              reader.readAsDataURL(file);
            };
            input.click();
          },
          isActive: () => false,
        }
      ];

      const activeItem = items.filter((item) => item.isActive()).pop() ?? {
        name: "Multiple",
      };

      
    return (
        <ToolbarContainer>
            <div className="relative bg-white h-full flex">
            {items.map((item, index) => (
                    <button
                    key={index}
                    onClick={() => {
                        item.command();
                        setIsOpen(false);
                    }}
                    className={classNames( activeItem.name === item.name ? "bg-slate-100" : "bg-white hover:bg-slate-100",
                        "flex items-center justify-between rounded-md text-sm text-black",
                    )}
                    >
                    <div className="flex items-center space-x-2">
                        <div className="rounded-sm rounded-2xl p-2 px-4">
                        <item.icon className="h-4 w-4" />
                        </div>
                    </div>
                    </button>
              ))}
            </div>
        </ToolbarContainer>
    )
}

export default Toolbar;

const ToolbarContainer = styled.div`
    display: flex;
    position: absolute;
    width: 70%;
    justify-content: center;
    align-items: center;
`