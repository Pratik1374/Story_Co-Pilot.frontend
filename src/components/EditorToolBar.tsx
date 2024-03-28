"use client";

import React, { useEffect } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

type Props = {
  editor: Editor | null;
  content: string;
};

const EditorToolbar = ({ editor, content }: Props) => {
  const { getLatestToken } = useAuth();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const story_id = segments.length > 2 ? segments[2] : null;

  if (!editor) {
    return null;
  }

  useEffect(() => {
    const getEditorContent = async () => {
      try {
        const token = await getLatestToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/get-editor-content/${story_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.status === 200) {
          console.log("Got editor content");
        } else {
          console.error("Error saving content");
        }
      } catch (error) {
        console.error("Error saving content:", error);
      }
    };

    // getEditorContent();
  }, []);

  const handleSave = async () => {
    try {
      const editorContent = editor.getHTML();
      console.log("editorcontent : ", editorContent);
      const token = await getLatestToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/save-editor-content/${story_id}`,
        {
          editor_content: editorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Saved successfully");
      } else {
        console.error("Error saving content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      // Handle the error appropriately (display an error message, etc.)
    }
  };

  return (
    <div
      className="rounded-tl-md rounded-tr-md flex flex-col justify-between items-center
    gap-2 w-full flex-wrap border border-gray-700 bg-black"
    >
      <p className="text-center font-bold text-xl font-serif text-white pt-2">
        Editor
      </p>
      <div className="flex w-full justify-between items-center border border-gray-700 p-1 gap-4">
        <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={
              editor.isActive("bold")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={
              editor.isActive("italic")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
            className={
              editor.isActive("underline")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Underline className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            className={
              editor.isActive("strike")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Strikethrough className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Heading2 className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={
              editor.isActive("bulletList")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={
              editor.isActive("orderedList")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <ListOrdered className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={
              editor.isActive("blockquote")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Quote className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setCode().run();
            }}
            className={
              editor.isActive("code")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500"
            }
          >
            <Code className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            className={
              editor.isActive("undo")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500 hover:bg-purple-500 hover:text-white p-1 hover:rounded-lg"
            }
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            className={
              editor.isActive("redo")
                ? "bg-purple-500 text-white p-2 rounded-lg"
                : "text-purple-500 hover:bg-purple-500 hover:text-white p-1 hover:rounded-lg"
            }
          >
            <Redo className="w-5 h-5" />
          </button>
        </div>
        {content && content !== "" && (
          <button
            type="submit"
            className="px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 h-[40px] w-[80px]"
            onClick={handleSave} // Attach the save handler
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;
