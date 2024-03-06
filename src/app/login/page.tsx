"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getAuth } from "@firebase/auth";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      await router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), googleProvider);
      await router.push("/");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <main className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-center">Login To Your Account</h1>
          <form
            className="w-3/4 max-w-md mt-4 mx-auto text-black"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="email" />
              <input
                className="w-full p-2 border-2 border-gray-900"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" />
              <input
                className="w-full p-2 border-2 border-gray-900"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button
                className="w-full py-2 px-6 text-gray-50 bg-gray-900"
                type="submit"
              >
                Login
              </button>
            </div>
            <button
              className="w-full py-2 px-6 text-gray-50 bg-red-500"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </button>
          </form>

          <p className="text-center">
            Need an account? <Link href="/register">Register</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
