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

  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

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

  useEffect(() => {
    setHistoryLoader(true);
    const getPreviousAIConversation = async () => {
      try {
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

    getPreviousAIConversation();
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
              historyLoader={historyLoader}
              outputs={outputs}
              setOutputs={setOutputs}
            />
          </div>
        )}

        {/* editor section */}
        <div className="h-full w-screen lg:w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 pb-2 my-bg-gradient text-black">
          <TiptapTextEditor
            content={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </div>

        {/* AI Assistant section drawer in mobile view */}
        {!isDesktopView && (
          <AI_AssistantDrawer
            is_open={isAssistantDrawerOpen}
            set_is_open={setIsAssistantDrawerOpen}
          >
            <AI_AssistantSection
              historyLoader={historyLoader}
              outputs={outputs}
              setOutputs={setOutputs}
            />
          </AI_AssistantDrawer>
        )}
      </div>
    </main>
  );
}
