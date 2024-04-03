"use client";

import AI_AssistantSection from "@/components/AI_AssistantSection";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const { login, user } = useAuth();

  useEffect(() => {
    console.log("user -> ", user);
  }, [user]);

  return (
    <main className="flex flex-col min-h-screen w-screen overflow-auto">
      <Header />

      {/* intro section */}
      {/* <div className="flex pt-[100px] flex-col items-center max-h-[40vw] overflow-hidden">
        <div className="">
          <div className="box w-[90vw] h-[90vw] flex items-center justify-center">
            <div className="box z-10 w-[70%] h-[70%] flex items-center justify-center"></div>
          </div>
          <div className="absolute top-[60px] z-20">
            <h1 className="lg:text-6xl text-2xl ">
              Your Storytelling Revolution Starts Here
            </h1>
            <h2>
              Elevate your writing with cutting-edge AI, rich editing, and
              stunning visuals.
            </h2>
            <button>Get Started</button>
          </div>
        </div>
      </div> */}

      <div className="flex w-screen bg-green-800 pt-[160px] justify-center overflow-hidden ">
        <div className="outer-circle w-[90vw] h-[45vw] bg-blue-700 flex justify-center">
           <div className="inner-circle w-[40vw] h-[20vw] bg-pink-400">

            </div> 
        </div>
      </div>
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
