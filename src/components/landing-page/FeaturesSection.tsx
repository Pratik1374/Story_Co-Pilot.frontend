import { merriweather, nunito } from "@/utils/fonts";
import Image from "next/image";
import React from "react";

const FeaturesSection = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1
        className={`${merriweather.className} text-center font-bold text-2xl lg:text-4xl`}
      >
        Our Features
      </h1>
      <div className="py-12 px-6 flex w-full items-center justify-center lg:justify-between flex-wrap gap-4 mt-3">
        <div className="flex flex-col w-[90%] lg:w-[30%] h-[400px] p-2 feature-card gap-2 items-center justify-center rounded-md border border-gray-400">
          <Image src="/ai-icon.png" alt="ai-icon" width={70} height={70} />
          <h2 className={`${merriweather.className} text-xl mt-5`}>
            AI Assistant
          </h2>
          <p className={`${nunito.className} text-center mt-2`}>
            AI-powered writing companion for brainstorming, editing, and
            overcoming creative blocks, guiding you through every step of the
            writing process.
          </p>
        </div>
        <div className="flex flex-col w-[90%] lg:w-[30%] h-[400px] p-2 feature-card gap-2 items-center justify-center rounded-md border border-gray-400">
          <Image src="/editor-icon.png" alt="ai-icon" width={70} height={70} />
          <h2 className={`${merriweather.className} text-xl mt-5`}>
            Rich Text Editor
          </h2>
          <p className={`${nunito.className} text-center mt-2`}>
            A versatile writing environment with powerful formatting tools,
            allowing you to focus on crafting your story and creating a polished
            final draft.
          </p>
        </div>
        <div className="flex flex-col w-[90%] lg:w-[30%] h-[400px] p-2 feature-card gap-2 items-center justify-center rounded-md border border-gray-400">
          <Image
            src="/img-generation-icon.png"
            alt="ai-icon"
            width={70}
            height={70}
          />
          <h2 className={`${merriweather.className} text-xl mt-5`}>
            AI Image Generation
          </h2>
          <p className={`${nunito.className} text-center mt-2`}>
            Effortlessly transform your words into captivating illustrations,
            bringing characters, settings, and unique visuals to life with the
            power of AI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
