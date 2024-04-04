"use client";

import AI_AssistantSection from "@/components/AI_AssistantSection";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { kreon, lobster, quintessential } from "@/utils/fonts";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const { login, user } = useAuth();

  useEffect(() => {
    console.log("user -> ", user);
  }, [user]);

  return (
    <main className=" flex flex-col min-h-screen w-full overflow-auto">
      <Header />

      {/* intro section */}
      <div className="landing-main absolute top-[60px] left-0 right-0 m-auto flex pt-[100px] flex-col items-center  max-h-[50vh] lg:max-h-[30vw] overflow-hidden">
        <div className="">
          <div className="outer-circle w-[100vh] h-[100vh] lg:w-[90vw] lg:h-[90vw] flex items-center justify-center border border-gray-700">
            <div className="inner-circle z-10 w-[70%] h-[70%] flex items-center justify-center border border-gray-700"></div>
          </div>
        </div>
      </div>

      <div className="mt-[40px] lg:mt-[100px] h-[50vh] lg:h-[30vw] z-20 flex flex-col items-center justify-center">
        <h1
          className={`${kreon.className} z-15 lg:text-7xl text-3xl text-center blue_gradient overflow-visible pb-2 `}
        >
          Your AI Writing Companion Awaits
        </h1>
        <h2
          className={`${quintessential.className} z-15 mt-3 lg:text-2xl text-center landing-page-subheading`}
        >
          Elevate your writing with cutting-edge AI, rich editing, and stunning
          visuals.
        </h2>
        <div className="mt-16 lg:mt-16 cursor-pointer group">
          <div className="get-started-rotating-border rounded-full font-serif font-bold text-xl group-hover:bg-gray-600">
            Get Started
          </div>
        </div>
      </div>

      <div className="flex px-3">
        <div>
          <h1 className="font-bold text-2xl">What is Story-Co-Pilot?</h1>
        </div>
      </div>
    </main>
  );
}
