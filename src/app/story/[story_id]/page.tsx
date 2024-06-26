"use client";

import AI_AssistantDrawer from "@/components/AI_AssistantDrawer";
import AI_AssistantSection from "@/components/AI_AssistantSection";
import Header from "@/components/Header";
import TiptapTextEditor from "@/components/TiptapTextEditor";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";

interface PromptAndOutput {
  id: string;
  prompt: string;
  answer: string;
}

export default function StoryMainPage({
  params,
}: {
  params: { story_id: string };
}) {
  const { login, user, getLatestToken } = useAuth();
  const story_id = params.story_id;
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);
  const [isAssistantDrawerOpen, setIsAssistantDrawerOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const [isDesktopView, setIsDesktopView] = useState(true);
  const [historyLoader, setHistoryLoader] = useState(false);
  const [outputs, setOutputs] = useState<[PromptAndOutput] | []>([]);
  const [storyName, setStoryName] = useState("");

  const getPreviousAIConversation = async () => {
    try {
      setHistoryLoader(true);
      const token = await getLatestToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/get-ai-conversations/${story_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOutputs(response.data.conversations);
      // setHistoryLoader(false);
    } catch (error) {
      console.error("Error getting previous responses");
    } finally {
      setHistoryLoader(false);
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 items-start w-full gap-1 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none text-black bg-white",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const validateStoryId = async () => {
      setIsValidating(true);
      try {
        const token = await getLatestToken();
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/validate-story-id`,
          {
            story_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const story_name = response.data.story_name;
        setStoryName(story_name);
        getPreviousAIConversation();
        setIsValidating(false);
      } catch (error) {
        console.error("Error validating story");
        router.push("/");
      } finally {
        setIsValidating(false);
      }
    };

    validateStoryId();
  }, [params.story_id]);

  if (isValidating) {
    return <></>;
  }

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header set_is_assistant_drawer_open={setIsAssistantDrawerOpen} />
      <div className="flex h-screen w-screen bg-gray-600 overflow-auto pt-[60px] scrollbar-thin scrollbar-thumb-gray-500">
        {/* AI prompting section */}
        {isDesktopView && (
          <div className="hidden md:flex flex-col bg-black h-full w-[35%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
            <AI_AssistantSection
              history_loader={historyLoader}
              outputs={outputs}
              set_outputs={setOutputs}
              editor={editor}
            />
          </div>
        )}

        {/* editor section */}
        <div className="h-full w-screen lg:w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 pb-2 my-bg-gradient text-black">
          <TiptapTextEditor content={content} editor={editor} story_name={storyName}/>
        </div>

        {/* AI Assistant section drawer in mobile view */}
        <AI_AssistantDrawer
          is_open={isAssistantDrawerOpen}
          set_is_open={setIsAssistantDrawerOpen}
        >
          <AI_AssistantSection
            history_loader={historyLoader}
            outputs={outputs}
            set_outputs={setOutputs}
            editor={editor}
          />
        </AI_AssistantDrawer>
      </div>
    </main>
  );
}
