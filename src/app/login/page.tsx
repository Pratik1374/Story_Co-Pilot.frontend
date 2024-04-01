"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getAuth } from "@firebase/auth";
import { lobster } from "@/utils/fonts";
import Image from "next/image";
import toast from "react-hot-toast";
import DotLoader from "@/components/DotLoader";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, user } = useAuth();
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("got");

    try {
      setLoggingIn(true);
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials", {
        style: {
          fontWeight: "bold",
          border: "3px solid red",
          borderRadius: "50px",
          backgroundColor: "white",
        },
      });
    } finally {
      setLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), googleProvider);
      await router.push("/");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Something went wrong", {
        style: {
          fontWeight: "bold",
          border: "3px solid red",
          borderRadius: "50px",
          backgroundColor: "white",
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex lg:items-center justify-center w-full h-full">
        <div className="flex w-full lg:w-1/2 p-8 items-center justify-center">
          <div className="h-full">
            <h1 className="lg:hidden text-2xl font-semibold font-serif animate-appearance-in mb-5 mt-2">
              Welcome to
              <span>
                {" "}
              </span>
              <Link
                href="/"
                className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer text-center`}
              >
                Story_Co-Pilot
              </Link>
            </h1>
            <div className="flex flex-col p-6 bg-black py-8 rounded-lg login-card-shadow lg:w-[30vw] w-[90vw]">
              <h2 className="text-xl font-semibold mb-4 lg:pr-24">
                Login With Your Account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-3 p-2 rounded-md border-t-1 border-gray-600 text-cyan-300 bg-black shadow-sm shadow-cyan-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-3 p-2 rounded-md border-t-1 border-gray-600 text-cyan-300 bg-black shadow-sm shadow-cyan-200"
                    required
                  />
                </div>

                <div className="flex w-full justify-center">
                  {loggingIn ? (
                    <DotLoader />
                  ) : (
                    <button
                      type="submit"
                      className={`w-full relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-gray-900 rounded-full group bg-gradient-to-br from-purple-500 to-pink-700 group-hover:from-purple-500 group-hover:to-purple-500-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mt-5 ${
                        loggingIn ? "cursor-not-allowed " : ""
                      }`}
                      disabled={loggingIn}
                    >
                      <p className="flex w-full justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-950 rounded-full group-hover:bg-opacity-0 group-hover:text-black text-center font-sans font-semibold">
                        Login
                      </p>
                    </button>
                  )}
                </div>
              </form>
              <button
                className="mt-3 w-full flex rounded-full items-center border border-sky-300  pl-2 p-2 gap-1  hover:border-0 hover:shadow-sm hover:shadow-sky-300"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src="/google_icon.svg"
                  alt="google_icon"
                  width={30}
                  height={30}
                />
                <p className="cursor-pointer">Continue with Google</p>
              </button>
              <div className="flex items-center mt-6 justify-center">
                <Link
                  href="/register"
                  className="border-b-1 border-gray-400 text-gray-400"
                >
                  Don't have an account? Sign Up here
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:h-full overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            <h1 className="relative text-3xl font-semibold font-sans before:absolute before:inset-0 before:animate-typewriter before:bg-black bg-black p-1">
              Welcome to<span> </span>
              <Link
                href="/"
                className={`${lobster.className} story-pilot-link text-4xl font-bold cursor-pointer text-center`}
              >
                Story_Co-Pilot
              </Link>
            </h1>
            <div className="animate-appearance-in -mt-4">
              <img
                src="/AI_bot.svg"
                alt="logo"
                className="w-[450px] lg:h-[250px] h-[550px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
