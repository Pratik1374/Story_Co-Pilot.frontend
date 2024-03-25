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
  const handleContentChange = (reason: any) => {
    setContent(reason);
  };

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

  if (isValidating) {
    return <></>;
  }

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header set_is_assistant_drawer_open={setIsAssistantDrawerOpen} />
      <div className="flex h-screen w-screen bg-gray-600 overflow-auto pt-[60px] scrollbar-thin scrollbar-thumb-gray-500">
        {/* AI prompting section */}
        <div className="hidden md:flex flex-col bg-black h-full w-[35%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
          <AI_AssistantSection />
        </div>

        {/* editor section */}
        <div className="h-full w-screen lg:w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500  p-2 my-bg-gradient text-black">
          <p className="text-center font-bold text-xl font-serif mb-4 text-white">
            Editor
          </p>

          <TiptapTextEditor
            content={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </div>

        {/* AI Assistant section drawer in mobile view */}
        <AI_AssistantDrawer
          is_open={isAssistantDrawerOpen}
          set_is_open={setIsAssistantDrawerOpen}
        >
          <AI_AssistantSection />
        </AI_AssistantDrawer>
      </div>
    </main>
  );
}
