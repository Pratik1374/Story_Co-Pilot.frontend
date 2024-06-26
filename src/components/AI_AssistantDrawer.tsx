import React, { FC } from "react";

interface DrawerProps {
  children: React.ReactNode;
  is_open: boolean;
  set_is_open: (open: boolean) => void;
}

const AI_AssistantDrawer: FC<DrawerProps> = (props) => {
  const { children, is_open, set_is_open } = props;
  return (
    <main
      className={
        " fixed overflow-hidden z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (is_open
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-[80vw] max-w-lg left-0 absolute bg-black h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (is_open ? " translate-x-0 " : " -translate-x-[80vw] ")
        }
      >
        <article className="relative w-[80vw] max-w-[80vw] pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer "
        onClick={() => {
          set_is_open(false);
        }}
      ></section>
    </main>
  );
};

export default AI_AssistantDrawer;
