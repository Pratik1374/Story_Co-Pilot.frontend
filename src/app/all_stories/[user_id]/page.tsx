"use client";

import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllStories({
  params,
}: {
  params: { user_id: string };
}) {
  const { login, user, getLatestToken } = useAuth();
  const user_id = params.user_id;
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const validateUserId = async () => {
      setIsValidating(true);
      try {
        if (user_id !== user?.uid) {
          router.push("/");
        }
        setIsValidating(false);
      } catch (error) {
        console.error("Error validating story");
        router.push("/");
      } finally {
        setIsValidating(false);
      }
    };

    validateUserId();
  }, [params.user_id]);

  if (isValidating) {
    return <></>;
  }

  return (
    <main className="flex flex-col min-h-screen w-screen">
      <Header />
      <div>Stories</div>
    </main>
  );
}
