"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Header = (props: { username: string }) => {
  return (
    <>
      Welcome {props.username} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default Header;
