import { storage, ref, getDownloadURL } from "@/utils/firebase";
import { merriweather, nunito } from "@/utils/fonts";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageGenerationSection = () => {
  const [verticalImgUrls, setVerticalImgUrls] = useState(Array(4).fill("/grid.svg"));
  const [horizontalImgUrls, setHorizontalImgUrls] = useState(Array(4).fill("/grid.svg"));

  useEffect(() => {
    const verticalImgsRef = [
      ref(storage, "story_co-pilot_landing-page-AI-images/vertical-1.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/vertical-2.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/vertical-3.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/vertical-4.jpg"),
    ];

    const promises_vertical = verticalImgsRef.map((ref) => getDownloadURL(ref));

    Promise.all(promises_vertical)
      .then((urls) => {
        setVerticalImgUrls(urls);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });

    const horizontalImgsRef = [
      ref(storage, "story_co-pilot_landing-page-AI-images/horizontal-1.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/horizontal-2.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/horizontal-3.jpg"),
      ref(storage, "story_co-pilot_landing-page-AI-images/horizontal-4.jpg"),
    ];

    const promises_horizontal = horizontalImgsRef.map((ref) =>
      getDownloadURL(ref)
    );

    Promise.all(promises_horizontal)
      .then((urls) => {
        setHorizontalImgUrls(urls);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div className="py-12 flex px-6 w-full flex-col">
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <div className="flex gap-7">
            <Image src="/star-icon.png" alt="star" width={30} height={30} className="w-auto h-auto"/>
        <h1
          className={`${merriweather.className} text-center font-bold text-2xl lg:text-4xl `}
        >
          Visualize Your Stories Instantly
        </h1>
        <Image src="/star-icon.png" alt="star" width={30} height={30}/>
        </div>
        <h3 className={`${nunito.className} text-center mt-3 font-semibold text-gray-300 lg:max-w-[80vw]`}>
        Enhance reader engagement with captivating illustrations generated dynamically, featuring unique characters, immersive backgrounds, and everything in between! 
        </h3>
      </div>

      <div className="flex mt-8 items-center justify-center overflow-hidden gap-2">
        <div className="flex flex-col w-[30%] h-full gap-2">
          <div className="w-full object-contain">
            <Image
              key={`vertical-1`}
              src={`${verticalImgUrls[0]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full object-contain overflow-hidden">
            <Image
              key={`vertical-2`}
              src={`${verticalImgUrls[1]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={200}
              height={200}
            />
          </div>
        </div>
        <div className="flex flex-col h-full w-[30%] gap-3 overflow-hidden justify-between">
          <div className="w-full h-[30%] object-contain overflow-hidden">
            <Image
              key={`horizontal-1`}
              src={`${horizontalImgUrls[0]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={300}
              height={200}
            />
          </div>
          <div className="w-full h-[30%] object-contain overflow-hidden">
            <Image
              key={`horizontal-2`}
              src={`${horizontalImgUrls[1]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={300}
              height={200}
            />
          </div>
          <div className="w-full h-[30%] object-contain overflow-hidden">
            <Image
              key={`horizontal-3`}
              src={`${horizontalImgUrls[2]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={300}
              height={200}
            />
          </div>
          <div className="w-full h-[30%] object-contain overflow-hidden">
            <Image
              key={`horizontal-4`}
              src={`${horizontalImgUrls[3]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={300}
              height={200}
            />
          </div>
        </div>
        <div className="flex flex-col w-[30%] gap-2">
          <div className="w-full object-contain">
            <Image
              key={`vertical-3`}
              src={`${verticalImgUrls[2]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={200}
              height={200}
            />
          </div>
          <div className="w-full object-contain overflow-hidden">
            <Image
              key={`vertical-4`}
              src={`${verticalImgUrls[3]}`}
              alt={`AI Image `}
              className="w-auto h-auto object-cover"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerationSection;
