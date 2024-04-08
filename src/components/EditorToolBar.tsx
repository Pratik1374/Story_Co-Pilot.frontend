"use client";

import React, { useEffect, useState } from "react";
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
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";

type Props = {
  editor: Editor | null;
  content: string;
  story_name: string;
};

const EditorToolbar = ({ editor, content, story_name }: Props) => {
  const { getLatestToken } = useAuth();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const story_id = segments.length > 2 ? segments[2] : null;
  const [isSaving, setIsSaving] = useState(false);

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

        editor?.commands.setContent(response?.data?.editor_content);
      } catch (error) {
        console.error("Error getting previous content:", error);
      }
    };

    if (editor) {
      getEditorContent();
    }
  }, [editor]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const editorContent = editor?.getHTML();
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
        toast.success("Saved successfully", {
          style: {
            fontWeight: "bold",
            border: "3px solid #07f72f",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
        setIsSaving(false);
      } else {
        console.error("Error saving content");
        toast.error("Error occurred", {
          style: {
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Error occurred", {
        style: {
          fontWeight: "bold",
          border: "3px solid red",
          borderRadius: "50px",
          backgroundColor: "white",
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className="rounded-tl-md rounded-tr-md flex flex-col justify-between items-center
    w-full flex-wrap border border-gray-700 bg-black"
    >
      <div className="relative w-full flex items-center justify-center">
        <p className="text-center font-bold text-xl font-serif text-white pt-2">
          Editor
        </p>
        <div className="absolute px-1 text-gray-300 left-0 bottom-0 max-w-[30%] truncate text-sm font-semibold border-t-1 border-r-1 border-gray-400 rounded-tr-md">{story_name}</div>
      </div>
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
          <>
            {isSaving ? (
              <Spinner color="success" size="sm" label="Saving..." />
            ) : (
              <button
                type="submit"
                className="px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 h-[40px] w-[80px]"
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditorToolbar;
