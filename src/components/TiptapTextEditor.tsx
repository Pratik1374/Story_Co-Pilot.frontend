"use client";

import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolBar";

const TiptapTextEditor = ({ content, editor }: any) => {
  
  return (
    <div className="w-full h-full flex flex-col">
      <EditorToolbar editor={editor} content={content} />
      <div className="flex min-w-full flex-grow overflow-auto">
      <EditorContent style={{ whiteSpace: "pre-line", minHeight: "100%" }} editor={editor} />
      </div>
    </div>
  );
};

export default TiptapTextEditor;
