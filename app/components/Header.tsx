"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useFetchAllTasks } from "../services/useRequest";

const Header = (props: { username: string }) => {
    
  return (
    <>
      Welcome {props.username} <br />
      <button onClick={() => signOut()}>Sign out</button>
      {/* <button onClick={() => {
        useFetchAllTasks(1).then(res => {
            console.log("res=> ", res)
        })
      }}>test</button> */}
    </>
  );
};

export default Header;
