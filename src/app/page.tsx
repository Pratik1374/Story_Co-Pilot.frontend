"use client"

import Header from "@/components/Header";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import Footer from "@/components/landing-page/Footer";
import ImageGenerationSection from "@/components/landing-page/ImageGenerationInfoSection";
import {
  kreon,
  merriweather,
  nunito,
  quintessential,
} from "@/utils/fonts";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const handleScrollClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className=" flex flex-col min-h-screen w-full overflow-auto">
      <Header />

      {/* intro section */}
      <div className="landing-main absolute top-[60px] left-0 right-0 m-auto flex pt-[100px] flex-col items-center h-[50vh] lg:h-[100vh] overflow-hidden">
        <div className="">
          <div className="outer-circle w-[100vh] h-[100vh] lg:w-[100vw] lg:h-[100vw] flex items-center justify-center border border-gray-700">
            <div className="inner-circle z-10 w-[80%] h-[80%] flex items-center justify-center border border-gray-700">
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[40px] lg:pt-[100px] h-[50vh] lg:h-[100vh] z-20 flex flex-col items-center justify-center">
        <h1
          className={`${kreon.className} z-15 lg:text-7xl text-3xl text-center blue_gradient overflow-visible pb-2 `}
        >
          Your AI Writing Companion Awaits
        </h1>
        <h2
          className={`${quintessential.className} z-15 mt-3 lg:text-2xl text-center landing-page-subheading`}
        >
          Elevate your writing with cutting-edge AI, rich editing, and stunning
          visuals.
        </h2>
        <div className="mt-16 lg:mt-20 cursor-pointer group" onClick={() => router.push('/register')}>
          <div className="get-started-rotating-border rounded-full font-serif font-bold text-xl group-hover:bg-gray-600">
            Get Started
          </div>
        </div>
      </div>

      {/* what section */}
      <div className="py-8 flex px-6 w-full lg:h-[430px] what-section">
        <div className="w-full lg:w-[70%] bg-transparent">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
           
            className={`${merriweather.className} text-white font-bold text-2xl lg:text-4xl `}
          >
            What is Story-Co-Pilot?
          </motion.div>

          <h3
            className={`${nunito.className} mt-3 text-xl font-semibold text-gray-300`}
          >
            Story_Co-Pilot is your all-in-one storytelling powerhouse. Our
            platform features a rich text editor for crafting your narratives,
            AI assistance to spark ideas and refine your writing, and integrated
            AI image generation to bring your worlds to life. Unleash your
            creativity, overcome writer's block, and produce captivating stories
            with the help of Story_Co-Pilot.
          </h3>

          <button
            className="mt-8 px-10 py-3 rounded-lg font-bold border-3 border-gray-700 button-gradient shadow-md hover:shadow-purple-400 hover:scale-105"
            onClick={() => handleScrollClick("features-section")}
          >
            Our Features
          </button>
        </div>
      </div>

      {/* image generation info section*/}
      <ImageGenerationSection />

      {/* features section */}
      <FeaturesSection />

      {/* some taglines */}
      <div className="py-12 px-6 flex w-full items-center justify-around flex-wrap gap-4 circuit-board-bg h-[100px] lg:h-[300px]">
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/write-icon.png"
            width={40}
            height={40}
            alt="write-icon"
          />
          <p className={`${quintessential.className} lg:text-4xl mt-3 `}>
            Write
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/refine-icon.png"
            width={40}
            height={40}
            alt="write-icon"
          />
          <p className={`${quintessential.className} lg:text-4xl mt-3`}>
            Refine
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/visualize-icon.png"
            width={40}
            height={40}
            alt="write-icon"
          />
          <p className={`${quintessential.className} lg:text-4xl mt-3`}>
            Visualize
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
