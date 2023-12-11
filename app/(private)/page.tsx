import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Homepage = async() => {
  const session = await getServerSession(authOptions);
  console.log("sesss=> ", session)
  return <div>Homepage</div>;
};

export default Homepage;
