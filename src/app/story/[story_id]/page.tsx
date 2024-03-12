"use client";

import AI_AssistantSection from "@/components/AI_AssistantSection";
import { Header } from "@/components/Header";
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
        setIsValidating(false)
      } catch (error) {
        console.error("Error validating story");
        router.push("/");
      } finally {
        setIsValidating(false)
      }
    };

    validateStoryId();
  }, [params.story_id]);

  if(isValidating) {
    return <></>;
  }

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header />
      <div className="flex h-screen w-screen bg-gray-600 overflow-auto pt-[60px] scrollbar-thin scrollbar-thumb-gray-500">
        {/* AI prompting section */}
        <div className="bg-black h-full w-[35%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
          <AI_AssistantSection />
        </div>

        {/* editor section */}
        <div className="bg-gray-400 h-full w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500"></div>
      </div>
    </main>
  );
}
