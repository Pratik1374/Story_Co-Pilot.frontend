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
    <main className="flex flex-col min-h-screen w-full overflow-auto">
      <Header />

      {/* intro section */}
      <div className="absolute flex pt-[100px] flex-col items-center max-h-[40vw] overflow-hidden">
        <div className="">
          <div className="outer-circle w-[90vw] h-[90vw] flex items-center justify-center">
            <div className="inner-circle z-10 w-[70%] h-[70%] flex items-center justify-center"></div>
          </div>
        </div>
      </div>

      <div className="h-[50vh] lg:h-[40vw] z-20 pt-[100px] flex flex-col items-center justify-center">
        <h1
          className={`${kreon.className} z-15 lg:text-5xl text-2xl text-center blue_gradient overflow-visible pb-2 `}
        >
          Your AI Writing Companion Awaits
        </h1>
        <h2
          className={`${quintessential.className} z-15 mt-3 lg:text-xl text-sm text-center landing-page-subheading`}
        >
          Elevate your writing with cutting-edge AI, rich editing, and stunning
          visuals.
        </h2>
        <button className="mt-3 lg:mt-16">Get Started</button>
      </div>

      {/* <div className="flex w-screen pt-[80px] justify-center overflow-hidden h-[40vw]">
        <div className="outer-circle w-[90vw] h-[90vw] flex flex-col justify-start lg:justify-center items-center border border-gray-500 box">
          <div className="z-10 overflow-visible flex flex-col items-center justify-start inner-content w-[90vw] h-[90vw] border border-green-500 pt-16">
            <h1
              className={`${kreon.className} z-15 lg:text-5xl text-2xl text-center blue_gradient overflow-visible pb-2 `}
            >
              Your AI Writing Companion Awaits
            </h1>
            <h2
              className={`${quintessential.className} z-15 mt-3 lg:text-xl text-sm text-center landing-page-subheading`}
            >
              Elevate your writing with cutting-edge AI, rich editing, and
              stunning visuals.
            </h2>
            <button className="lg:mt-6">Get Started</button>
          </div>
        </div>
      </div> */}
      <div className="flex">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
        molestias tempore rem voluptates numquam ipsam inventore doloribus,
        voluptatibus earum deserunt alias tenetur dignissimos illo atque quo ex
        ipsa explicabo facere. Animi cum illum enim beatae vero explicabo alias
        atque excepturi eligendi eius asperiores soluta minus recusandae quaerat
        perspiciatis, voluptatem deleniti quod. Amet deleniti, maxime aspernatur
        repellat quod molestiae inventore autem. Laboriosam ipsa exercitationem
        ex rem tempora nihil maiores. Ex odio in excepturi dolorem est nisi
        sint, non eum eaque obcaecati repudiandae. Nesciunt culpa veniam, aut ab
        sunt accusamus libero pariatur.
      </div>
    </main>
  );
}
