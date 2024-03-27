import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarIcon,
  Slider,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import Spinner from "@/components/Spinner";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import DotLoader from "./DotLoader";

interface PromptAndOutput {
  id: string;
  prompt: string;
  answer: string;
}

const AI_AssistantSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoader, setHistoryLoader] = useState(false);
  const [outputs, setOutputs] = useState<[PromptAndOutput] | []>([]);
  const [error, setError] = useState(null);
  const [selectedLengthTab, setSelectedLengthTab] = useState<string>("Medium");
  const [creativityValue, setCreativityValue] = useState<number | number[]>(
    0.2
  );
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [isPromptEmpty, setIsPromptEmpty] = useState<boolean>(false);
  const { login, user, getLatestToken } = useAuth();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const story_id = segments.length > 2 ? segments[2] : null;

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
  }, [story_id]);

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

      const token = await getLatestToken();
      console.log(token);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/response/response-for-text`,
        {
          user_prompt: userPrompt,
          story_id,
          length_setting: lengthSetting,
          creativity_value: creativityValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      setOutputs(
        (prevOutputs: [PromptAndOutput] | []) =>
          [
            { prompt: userPrompt, answer: response?.data?.data },
            ...prevOutputs,
          ] as [PromptAndOutput]
      );
      setUserPrompt("");
    } catch (err) {
      // setError("An error occurred during the API call.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full p-2">
        <h1 className="text-center font-bold text-xl font-serif">
          Your AI Assistant
        </h1>

        <div className="flex flex-col gap-1 mt-3">
          <p className="font-sans">Prompt</p>
          <Textarea
            key="prompt_textarea"
            id="prompt_textarea"
            variant="bordered"
            value={userPrompt}
            labelPlacement="outside"
            placeholder="Enter prompt here..."
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
            className="max-w-md mt-3 cursor-pointer"
            onChange={(value) => setCreativityValue(value)}
            aria-label="creativity-slider"
          />
        </div>

        {isLoading || historyLoader ? (
          <div className="flex items-center justify-center flex-col w-full mt-5">
            <DotLoader />
          </div>
        ) : (
          <button
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-400 group-hover:from-purple-500 group-hover:to-purple-500-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-5 ${
              isLoading ? "cursor-not-allowed " : ""
            }`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <p className="flex w-full justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-black text-center font-sans font-semibold">
              Submit
            </p>
          </button>
        )}
      </div>

      {/* outputs sections */}
      <div className="flex flex-col w-full p-2">
        <p>Results</p>
        {isLoading && (
          <div className="flex items-center justify-center w-full bg-gray-800 mt-3 p-2 h-[200px]">
            <Spinner />
          </div>
        )}

        {historyLoader && outputs.length === 0 && (
          <div className="flex items-center justify-center flex-col w-full  mt-3 p-2 h-[200px]">
            <p className="text-sm mb-1">Loading history...</p>
            <Spinner />
          </div>
        )}

        {!historyLoader && !isLoading && outputs.length === 0 && (
          <div className="w-full h-[60px] text-center p-2">
            <p className="text-sm">No any results yet</p>
          </div>
        )}

        {outputs.map((output, index) => (
          <div
            className="w-full bg-gray-900 mt-4 p-2  overflow-auto rounded-md shadow-md shadow-gray-600 whitespace-pre-wrap"
            key={`AI_Text_Output_${index}`}
          >
            <div className="w-full flex items-start gap-1">
              <div className="flex">
                <Avatar
                  icon={<AvatarIcon />}
                  classNames={{
                    base: "bg-gradient-to-br from-[#ad04bf] to-[#cc93f5]",
                    icon: "text-black/80",
                  }}
                  size="sm"
                />
              </div>
              <p className="flex font-semibold font-mono p-1">
                {output.prompt}
              </p>
            </div>
            <div className="w-full flex items-start gap-1 mt-2">
              <div className="flex">
                <Avatar
                  src="/chatbot_icon.png"
                  className="bg-gray-800"
                  size="sm"
                />
              </div>
              <div className="flex p-1">{output.answer}</div>
            </div>
            <div className="flex w-full gap-2 justify-end  mt-3">
              <button className="bg-purple-400 p-1 hover:bg-purple-500 rounded-lg text-sm font-mono text-black">
                Replace selected text
              </button>
              <button className="bg-purple-400 p-1 hover:bg-purple-500 rounded-lg text-sm font-mono text-black">
                Move to editor
              </button>
            </div>
          </div>
        ))}

        {error && <div className="error-message">{error}</div>}
      </div>
    </>
  );
};

export default AI_AssistantSection;
