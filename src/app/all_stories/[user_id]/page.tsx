"use client";

import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Story {
  id: string;
  story_name: string;
  created_at: string;
}

export default function AllStories({
  params,
}: {
  params: { user_id: string };
}) {
  const { login, user, getLatestToken } = useAuth();
  const user_id = params.user_id;
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [allStories, setAllStories] = useState<Story[]>();
  const [historyLoader, setHistoryLoader] = useState(false);

  const getAllStories = async () => {
    try {
      setHistoryLoader(true);
      const token = await getLatestToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/story/get-all-stories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllStories(response.data.all_stories);
      setHistoryLoader(false);
    } catch (error) {
      console.error("Error getting previous responses");
    } finally {
      setHistoryLoader(false);
    }
  };

  useEffect(() => {
    const validateUserId = async () => {
      setIsValidating(true);
      try {
        if (!user || user_id !== user?.uid) {
          router.push("/");
        }
        setIsValidating(false);
        getAllStories();
      } catch (error) {
        console.error("Error validating story");
        router.push("/");
      } finally {
        setIsValidating(false);
      }
    };

    validateUserId();
  }, []);

  function handleStoryClick(story_id: string): void {
    router.push(`/story/${story_id}`);
  }

  return (
    <>
      {isValidating ? (
        <></>
      ) : (
        <main className="flex flex-col min-h-screen w-screen">
          <Header />
          <h1 className="pt-[60px] font-bold text-2xl text-center p-3 mt-2">
            All Stories
          </h1>
          <p className="text-center m-2 text-sm">Select a previous story below or embark on a new adventure!</p>
          {historyLoader && (
            <div className="flex w-screen h-[50vh] justify-center items-center">
              <Spinner color="secondary" label="Getting all stories..." />
            </div>
          )}

          {!historyLoader && (allStories?.length === 0 || !allStories) ? (
            <div className="flex flex-col w-full h-[50vh] items-center justify-center mt-4">
              <p className="">Begin your writing adventure!</p>
              <p className="mt-2 text-sm text-gray-400">
                Click on New Story above
              </p>
            </div>
          ) : (
            <div className="flex w-screen pt-2 flex-col items-center justify-center">
              {allStories?.map((story) => (
                <div
                  key={`story_${story.id}`}
                  className="flex bg-gray-800 w-[95vw] lg:w-[80vw] p-2 mt-2 rounded-lg justify-between cursor-pointer hover:bg-gray-700"
                  onClick={() => handleStoryClick(story.id)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/storybook_icon.png"
                      alt="Storybook Icon"
                      height={30}
                      width={30}
                    />
                    <p className="font-semibold text-xl">{story.story_name}</p>
                  </div>
                  <div className="flex items-end text-sm">
                    <p>{story.created_at}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </>
  );
}
