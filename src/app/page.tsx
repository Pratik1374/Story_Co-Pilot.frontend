"use client";

import AI_AssistantSection from "@/components/AI_AssistantSection";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import React from "react";


export default function Home() {
  const { login, user, getToken } = useAuth();
 

  useEffect(() => {
    console.log("user -> ", user);
  }, [user]);

  

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header />
      <div className="flex h-screen w-screen bg-gray-600 overflow-auto pt-[60px] scrollbar-thin scrollbar-thumb-gray-500">
        {/* AI prompting section */}
        <div className="bg-black h-full w-[35%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500">
          <AI_AssistantSection/>
        </div>

        {/* editor section */}
        <div className="bg-gray-400 h-full w-[65%] overflow-auto scrollbar-thin scrollbar-thumb-gray-500"></div>
      </div>
    </main>
  );
}
