import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";
import cx from "classnames";
import { FC, useEffect, useState } from "react";
import {
  ThumbsUp,
  RepeatIcon,
  Wand2Icon,
} from "lucide-react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof ThumbsUp;
  text: string | undefined;
}

type BottomMenuProps = Omit<BubbleMenuProps, "children"> & {
  menuPosition?: { top: number; left: number };
  generateNextSection: any;
  nextSection: string;
  editor?: any;
};

export const BottomMenu: FC<BottomMenuProps> = (props) => {
  let from = 0;
  let to = 0;
  if (props.editor) {
    const { selection } = props.editor.state;
    from = selection.from;
    to = selection.to;
  }

  const items: BubbleMenuItem[] = [
    {
      name: "like",
      isActive: () => props.editor.isActive("like"),
      command: () => {
        setLiked(!liked);
      },
      icon: AiOutlineLike,
      text: ""
    },
    {
      name: "next_section",
      isActive: () => props.editor.isActive("next_section"),
      command: () => {
        props.generateNextSection();
        setOpenPopup(false);
      },
      icon: Wand2Icon,
      text: props.nextSection
    },
  ];

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [openPopup, setOpenPopup] = useState(false);
  const [liked, setLiked] = useState(false);

    // Get the current selection whenever it changes
    useEffect(() => {
      if (props.menuPosition) {
      if (props.menuPosition?.top !== 0 || props.menuPosition?.left !== 0) {
        setPosition(props.menuPosition);
        setOpenPopup(true);
      }
    }
    }, [props.menuPosition]);


  return (
    <>
    {openPopup && 
    <div
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      className="flex absolute overflow-hidden rounded-xl border border-stone-200 shadow-xl z-5"
    >
      {items.map((item, index) => (
        <>
        {item.name === 'next_section' && props.nextSection === "end" ?
        <></>
        :
        <button
          key={index}
          onClick={item.command}
          className="p-2 px-3 text-stone-600 hover:bg-gray-200 bg-white active:bg-stone-200 border-l border-r border-gray-100"
        >
          <div className="flex items-center">
          {(item.name === "like" && liked) ?
          <AiFillLike
            className={cx("h-4 w-4", {
              "text-blue-500": item.isActive(),
            })}
          />
          :
          <item.icon
            className={cx("h-4 w-4", {
              "text-blue-500": item.isActive(),
            })}
          />
          }
          {item.text && <p className="ml-2 text-sm font-medium">{item.text}</p>}
          </div>
        </button>
        }

        </>
      ))}
    </div>
    }
    </>
  );
};
