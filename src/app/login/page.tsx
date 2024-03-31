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

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, user } = useAuth();
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("got")

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
    // <div>
    //   <main className="p-2 w-full h-screen flex items-center gap-5">
    //     <div className="login-page w-1/2 bg-gray-50 h-full">
    //       <Image src="/AI_bot.svg" alt="login-bg" width={300} height={400} className="opacity-1 rotate-180"/>
    //     </div>
    //     <div className="w-1/2 h-full">
    //       <h1 className="text-2xl font-semibold font-serif">
    //         Welcome to<span> </span>
    //         <Link
    //           href="/"
    //           className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer text-center`}
    //         >
    //           Story_Co-Pilot
    //         </Link>
    //       </h1>
    //       <div className="container mx-auto">
    //         <h1 className="text-2xl text-center">Login To Your Account</h1>
    //         <form
    //           className="w-3/4 max-w-md mt-4 mx-auto text-black"
    //           onSubmit={handleSubmit}
    //         >
    //           <div className="mb-4">
    //             <label htmlFor="email" />
    //             <input
    //               className="w-full p-2 border-2 border-gray-900"
    //               name="email"
    //               type="text"
    //               placeholder="Email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label htmlFor="password" />
    //             <input
    //               className="w-full p-2 border-2 border-gray-900"
    //               name="password"
    //               type="password"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //           </div>

    //           <div className="mb-4">
    //             <button
    //               className="w-full py-2 px-6 text-gray-50 bg-gray-900"
    //               type="submit"
    //             >
    //               Login
    //             </button>
    //           </div>
    //           <button
    //             className="w-full py-2 px-6 text-gray-50 bg-red-500"
    //             onClick={handleGoogleSignIn}
    //           >
    //             Continue with Google
    //           </button>
    //         </form>

    //         <p className="text-center">
    //           Need an account? <Link href="/register">Register</Link>
    //         </p>
    //       </div>
    //     </div>
    //   </main>
    // </div>

    // <div className="bg-black h-screen flex">
    //   <div className="flex flex-col-reverse lg:flex-row  bg-black lg:gap-36">
    //     <div className="flex items-center justify-center lg:h-screen h-[50%] lg:max-w-[50%] max-w-[100%] max-h-[50%] lg:ml-48 lg:mt-0 mt-[-100px]">
    //       <div className="lg:w-[28rem] w-[100%] p-8 bg-black text-white shadow-md rounded-md">
    //         <h2 className="text-2xl font-semibold mb-4">
    //           Login With Your Account
    //         </h2>
    //         <form>
    //           <div className="mb-4">
    //             <label
    //               htmlFor="username"
    //               className="block text-sm font-medium text-gray-600"
    //             >
    //               Username
    //             </label>
    //             <input
    //               type="email"
    //               id="email"
    //               placeholder="Email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               className="w-full mt-5 p-2 border rounded-md bg-black"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label
    //               htmlFor="password"
    //               className="block text-sm font-medium text-gray-600"
    //             >
    //               Password
    //             </label>
    //             <input
    //               type="password"
    //               id="password"
    //               value={password}
    //               placeholder="password"
    //               onChange={(e) => setPassword(e.target.value)}
    //               className="w-full mt-5 p-2 border rounded-md text-white bg-black"
    //               autoComplete="off"
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="w-full mt-5 bg-purple-600 text-white p-2 rounded-2xl hover:bg-purple-900  cursor-pointer text-xl"
    //           >
    //             Login
    //           </button>
    //         </form>
    //         <button
    //           className="mt-3 w-full flex rounded-md items-center border-1 border-white pl-2 gap-1 "
    //           onClick={handleGoogleSignIn}
    //         >
    //           <Image
    //             src="/google_icon.svg"
    //             alt="google_icon"
    //             width={40}
    //             height={40}
    //           />
    //           <p className="text-xl cursor-pointer">Continue with Google</p>
    //         </button>
    //       </div>
    //     </div>
    //     <div className="flex flex-col  items-center justify-center">
    //       <h1 className="relative text-3xl font-semibold font-serif before:absolute before:inset-0 before:animate-typewriter before:bg-black">
    //         Welcome to<span> </span>
    //         <Link
    //           href="/"
    //           className={`${lobster.className} story-pilot-link text-4xl font-bold cursor-pointer text-center`}
    //         >
    //           Story_Co-Pilot
    //         </Link>
    //       </h1>
    //       <div className="animate-appearance-in">
    //         <img
    //           src="/AI_bot.svg"
    //           alt="logo"
    //           className="w-[450px] lg:h-[250px] h-[550px] lg:mt-0 mt-[-100px]"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex-grow bg-black">
    //     <img src="/wave.svg" alt="wave" className="" />
    //   </div>

    <div className="h-screen w-screen flex flex-col">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex w-full lg:w-1/2 p-8 items-center justify-center">
          <div className="h-full">
          <h1 className="lg:hidden relative text-3xl font-semibold font-serif before:absolute before:inset-0 before:animate-typewriter before:bg-black">
              Welcome to<span> </span>
              <Link
                href="/"
                className={`${lobster.className} story-pilot-link text-3xl font-bold cursor-pointer text-center`}
              >
                Story_Co-Pilot
              </Link>
            </h1>
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
                  className="w-full mt-3 p-2 rounded-md border-t-1 border-cyan-200 text-cyan-300 bg-black shadow-sm shadow-cyan-200"
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
                  className="w-full mt-3 p-2 rounded-md border-t-1 border-cyan-200 text-cyan-300 bg-black shadow-sm shadow-cyan-200"
                  required
                />
              </div>
             
              <div className="flex w-full">
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
          </div>
        </div>
        <div className="hidden lg:flex lg:h-full">
          <div className="flex flex-col  items-center justify-center">
            <h1 className="relative text-3xl font-semibold font-sans before:absolute before:inset-0 before:animate-typewriter before:bg-black bg-black p-3">
              Welcome to<span> </span>
              <Link
                href="/"
                className={`${lobster.className} story-pilot-link text-4xl font-bold cursor-pointer text-center`}
              >
                Story_Co-Pilot
              </Link>
            </h1>
            <div className="animate-appearance-in">
              <img
                src="/AI_bot.svg"
                alt="logo"
                className="w-[450px] lg:h-[250px] h-[550px] lg:mt-0 mt-[-100px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex-grow">
        <div className="flex-grow bg-black">
          <img src="/wave.svg" alt="wave" className="" />
        </div>
      </div> */}
    </div>
  );
};

export default Login;
