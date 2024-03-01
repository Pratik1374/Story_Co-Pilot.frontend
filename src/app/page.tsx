"use client";

import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { login, user } = useAuth();

  useEffect(() => {
    console.log(user);
  });
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="pt-12">Homepage</div>
    </main>
  );
}
