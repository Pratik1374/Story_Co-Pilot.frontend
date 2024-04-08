import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Story_Co-Pilot",
  description: "Story_Co-Pilot: the AI-powered platform for storytellers. Elevate your writing with our rich text editor, AI assistant, and AI image generator.",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body>
        <Providers>
          <Toaster position="top-center"/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
