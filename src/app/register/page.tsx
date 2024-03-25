"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getAuth } from "@firebase/auth";
import axios from "axios";

const Register: NextPage = () => {
  // State variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  // Auth context and router
  const { register, user } = useAuth();
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
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await register(email, password);
      const uid = userCredential.user?.uid || "";
      if (uid === "") {
        alert("Failed to register");
      }
      await addNewUser(email, name, uid);
      await router.push("/");
    } catch (error: any) {
      // Handle registration errors
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already registered. Please use a different email.");
        alert("Email is already registered. Please use a different email.");
      } else {
        setError("An error occurred during registration. Please try again.");
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), googleProvider);
      const googleUser = result.user;
      const googleName = googleUser.displayName || "";
      const googleEmail = googleUser.email || "";
      setName(googleName);
      const uid = googleUser?.uid || "";
      if (uid === "") {
        alert("Failed to register");
      }
      await addNewUser(googleEmail, googleName, uid);
      await router.push("/");
    } catch (error: any) {
      setError("An error occurred during Google sign-in. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to the home page if the user is already authenticated
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <main className="p-4">
        <div className="container mx-auto">
          
            <h1 className="font-bold text-5xl text-center mb-6 font-serif text-purple-500">
              Story_Co-Pilot
            </h1>
          
          <h1 className="text-2xl text-center">Register Your Account</h1>
          <form
            className="w-3/4 max-w-md mt-4 mx-auto text-black"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="name" />
              <input
                className="w-full p-2 border-2 border-gray-900"
                name="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className={`w-full py-2 px-6 text-gray-50 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex justify-center">
                    <div className="mr-2 text-sm">Registering...</div>
                    <div className="animate-spin m-2 w-4 h-4 rounded-full bg-gray-500"></div>
                  </span>
                ) : (
                  "Register"
                )}
              </button>
              <button
                className="w-full py-2 px-6 text-gray-50 bg-red-500"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading
                  ? "Signing in with Google..."
                  : "Continue with Google"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
