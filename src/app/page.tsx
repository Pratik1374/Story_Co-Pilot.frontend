"use client";

import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { Slider, Tab, Tabs, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";
import axios, { AxiosResponse } from "axios"; // Import axios
import Spinner from "@/components/Spinner";

interface APIResponse {
  success: boolean;
  data: any;
}

export default function Home() {
  const { login, user, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // const [outputs, setOutputs] = useState<AxiosResponse[] | []>([]);
  const [outputs, setOutputs] = useState<string[] | []>([]);
  const [error, setError] = useState(null);
  const [selectedLengthTab, setSelectedLengthTab] = useState<string>("Medium");
  const [creativityValue, setCreativityValue] = useState<number | number[]>(
    0.2
  );
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(false);

  useEffect(() => {
    console.log("user -> ", user);
  }, [user]);

  const handleSubmit = async () => {
    if (userPrompt === "") {
      setIsPromptEmpty(true);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      let lengthSetting = "Medium";
      if (selectedLengthTab === "tab_small_length") {
        lengthSetting = "Small";
      } else if (selectedLengthTab === "tab_medium_length") {
        lengthSetting = "Medium";
      } else if (selectedLengthTab === "tab_large_length") {
        lengthSetting = "Large";
      }

      const prompt = `You will be given a user-provided description. Respond creatively using the following settings:
      * Output Length: ${lengthSetting}
      * Creativity: ${creativityValue} (Ranged from 0 to 1)

      User Description: ${userPrompt}`;

      const token = await getToken();
      console.log("token -", token);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/response/response-for-text`,
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      setOutputs([response?.data?.data, ...outputs]);
      setUserPrompt("");
    } catch (err) {
      // setError("An error occurred during the API call.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header />
      <div className="flex h-screen w-screen bg-gray-600 overflow-auto pt-[60px] scrollbar-thin scrollbar-thumb-gray-500">
        {/* AI prompting section */}
        <div className="bg-black h-full w-[35%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
          <div className="flex flex-col w-full p-2">
            <h1 className="text-center font-bold text-xl">Your AI Assistant</h1>

            <div className="flex flex-col gap-1 mt-3">
              <p className="font-sans">Prompt</p>
              <Textarea
                key="prompt_textarea"
                id="prompt_textarea"
                variant="bordered"
                value={userPrompt}
                labelPlacement="outside"
                placeholder="Enter your description"
                className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                onValueChange={(value) => {
                  setUserPrompt(value);
                  setIsPromptEmpty(false);
                }}
                aria-label="user-prompt"
                isInvalid={isPromptEmpty}
                errorMessage={isPromptEmpty ? "Please enter a prompt" : ""}
                isRequired={true}
              />
            </div>

            <div className="flex items-center gap-4 mt-3">
              <p className="font-sans">Output Length</p>
              <Tabs
                key="output_length_tabs"
                id="output_length_tabs"
                color="secondary"
                aria-label="Output Length"
                radius="full"
                defaultSelectedKey="tab_medium_length"
                onSelectionChange={(key) => setSelectedLengthTab(key as string)}
              >
                <Tab key="tab_small_length" title="Small" />
                <Tab key="tab_medium_length" title="Medium" />
                <Tab key="tab_large_length" title="Large" />
              </Tabs>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              <p className="font-sans">Set Creativity</p>
              <Slider
                showTooltip={true}
                step={0.1}
                formatOptions={{ style: "percent" }}
                color="secondary"
                maxValue={1}
                minValue={0}
                marks={[
                  {
                    value: 0.2,
                    label: "20%",
                  },
                  {
                    value: 0.5,
                    label: "50%",
                  },
                  {
                    value: 0.8,
                    label: "80%",
                  },
                ]}
                defaultValue={0.2}
                className="max-w-md mt-3"
                onChange={(value) => setCreativityValue(value)}
                aria-label="creativity-slider"
              />
            </div>

            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-400 group-hover:from-purple-500 group-hover:to-purple-500-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-5"
              onClick={handleSubmit}
            >
              <p className="flex w-full justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-black text-center font-sans font-semibold">
                Submit
              </p>
            </button>
          </div>

          {/* outputs sections */}
          <div className="flex flex-col w-full p-2">
            <p>Results</p>
            {isLoading && (
              <div className="flex items-center justify-center w-full bg-gray-800 mt-3 p-2 h-[200px]">
                <Spinner />
              </div>
            )}

            {/* Display outputs in reverse order */}
            {!isLoading && outputs.length === 0 && (
              <div className="w-full h-[60px] text-center p-2">
                <p className="text-sm">No any results yet</p>
              </div>
            )}

            {outputs.map((output, index) => (
              <div
                className="w-full bg-gray-800 mt-4 p-2  overflow-auto scrollbar-thin scrollbar-thumb-gray-300 rounded-md shadow-md shadow-gray-600 whitespace-pre-wrap"
                key={`AI_Text_Output_${index}`}
              >
                {output}
                <div className="flex w-full gap-2 justify-end  mt-3">
                  <button className="bg-violet-400 p-2 hover:bg-violet-500 rounded-lg text-sm text-black">
                    Replace selected text
                  </button>
                  <button className="bg-violet-400 p-2 hover:bg-violet-500 rounded-lg text-sm text-black">
                    Move to editor
                  </button>
                </div>
              </div>
            ))}

            {error && <div className="error-message">{error}</div>}
          </div>
        </div>

        {/* editor section */}
        <div className="bg-gray-400 h-full w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500"></div>
      </div>
    </main>
  );
}
