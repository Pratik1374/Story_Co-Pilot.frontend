import { Github, Globe, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-[100px] flex flex-col gap-4 w-full border-t-1 border-gray-500 pt-4 items-center justify-center pb-1">
      <div className="flex gap-2 w-full lg:w-[70%] items-center justify-around">
        <Link
          href="https://github.com/Pratik1374/"
          target="_blank"
          className="p-2 bg-gray-700 rounded-lg hover:bg-purple-500 cursor-pointer"
        >
          <Github />
        </Link>
        <Link
          href="https://www.linkedin.com/in/pratik-jadhav-7a969920b"
          target="_blank"
          className="p-2 bg-gray-700 rounded-lg hover:bg-purple-500 cursor-pointer"
        >
          <Linkedin />
        </Link>
        <Link
          href="mailto:pratik1374@gmail.com"
          target="_blank"
          className="p-2 bg-gray-700 rounded-lg hover:bg-purple-500 cursor-pointer"
        >
          <Mail />
        </Link>
        <Link
          href="https://pratik-portfolio-temp.netlify.app/"
          target="_blank"
          className="p-2 bg-gray-700 rounded-lg hover:bg-purple-500 cursor-pointer"
        >
          <Globe />
        </Link>
      </div>
      <p className="text-center text-gray-400 items-center">Copyright &copy; Story_Co-Pilot</p>
    </div>
  );
};

export default Footer;
