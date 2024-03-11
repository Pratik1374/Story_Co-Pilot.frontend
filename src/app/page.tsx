"use client";

import AI_AssistantSection from "@/components/AI_AssistantSection";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import React from "react";

export default function Home() {
  const { login, user } = useAuth();

  useEffect(() => {
    console.log("user -> ", user);
  }, [user]);

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header />
    </main>
  );
}
