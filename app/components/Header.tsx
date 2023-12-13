"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Header = (props: { username: string }) => {
  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap justify-between items-center mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Task Management
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse text-right">
            <p className="text-sm  text-gray-500 dark:text-white">
              Welcome <b>{props.username}</b>
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
