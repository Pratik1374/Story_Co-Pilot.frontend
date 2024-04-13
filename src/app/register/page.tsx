"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getAuth } from "@firebase/auth";
import axios from "axios";
import Link from "next/link";
import { lobster } from "@/utils/fonts";
import DotLoader from "@/components/DotLoader";
import Image from "next/image";
import toast from "react-hot-toast";

const Register: NextPage = () => {
  // State variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Auth context and router
  const { register, user, registerWithGoogle } = useAuth();
  const router = useRouter();

  //add new user to database
  const addNewUser = async (email: string, name: string, uid: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`,
        {
          email,
          name,
          uid,
        }
      );
    } catch (error) {
      console.error("Error while adding user data");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoggingIn(true);
    setError(null);

    try {
      const userCredential = await register(email, password);
      if(!userCredential || !userCredential.user) {
        toast.error("Email is already registered.Please Log In", {
          style: {
            display: "flex",
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
        return;
      }
      const uid = userCredential?.user?.uid || "";
      await addNewUser(email, name, uid);
      router.push(`/all_stories/${userCredential?.user?.uid}`);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already registered.Please Log In");
        toast.error("Email is already registered.Please Log In", {
          style: {
            display: "flex",
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
      } else {
        setError("An error occurred during registration. Please try again.");
        console.error(error);
      }
    } finally {
      setLoggingIn(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoggingIn(true);
    setError(null);

    try {
      const userCredential = await registerWithGoogle();
      if (!userCredential || !userCredential.user) {
        toast.error("Something went wrong", {
          style: {
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
        return;
      }
      setName(userCredential?.user?.displayName || "");
      
      await addNewUser(
        userCredential?.user?.email || "",
        userCredential?.user?.displayName || "",
        userCredential?.user?.uid
      );
      router.push(`/all_stories/${userCredential?.user?.uid}`);
    } catch (error: any) {
      setError("An error occurred during Google sign-in. Please try again.");
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already registered.Please Log In");
        toast.error("Email is already registered.Please Log In", {
          style: {
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
      } else {
        setError("An error occurred during registration. Please try again.");
        console.error(error);
        toast.error("Something went wrong", {
          style: {
            fontWeight: "bold",
            border: "3px solid red",
            borderRadius: "50px",
            backgroundColor: "white",
          },
        });
      }
    } finally {
      setLoggingIn(false);
    }
  };

  // Redirect to the home page if the user is already authenticated
  useEffect(() => {
    if (user) {
      router.push(`/all_stories/${user?.uid}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-auto">
      <div className="flex lg:items-center justify-center w-full h-full">
        <div className="flex w-full lg:w-1/2 p-8 items-center justify-center">
          <div className="h-full">
            <h1 className="lg:hidden text-2xl font-semibold font-serif animate-appearance-in mb-5 mt-2">
              Welcome to
              <span> </span>
              <Link
                href="/"
                className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer text-center`}
              >
                Story_Co-Pilot
              </Link>
            </h1>
            <div className="flex flex-col p-6 bg-black py-8 rounded-lg login-card-shadow lg:w-[30vw] w-[90vw]">
              <h2 className="text-xl font-semibold mb-4 lg:pr-24">
                Create An Account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-3 p-2 rounded-md border-t-1 border-gray-600 text-cyan-300 bg-black shadow-sm shadow-cyan-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
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
                    Create Password
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
                        Register
                      </p>
                    </button>
                  )}
                </div>
              </form>
              <button
                className="mt-3 w-full flex rounded-full items-center justify-center border border-sky-300  pl-2 p-2 gap-2  hover:border-0 hover:shadow-sm hover:shadow-sky-300"
                onClick={handleGoogleSignIn}
              >
                <Image
                  src="/google_icon.svg"
                  alt="google_icon"
                  width={30}
                  height={30}
                />
                <p className="cursor-pointer">Sign Up with Google</p>
              </button>
              <div className="flex items-center mt-6 justify-center">
                <Link
                  href="/login"
                  className="border-b-1 border-gray-400 text-gray-400 hover:text-gray-300  hover:border-gray-300"
                >
                  Already have an account? Sign In here
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
                className="w-[450px] lg:h-[300px] h-[550px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
