import React from "react";
import { useFetchAllTasks } from "../services/useRequest";

const Homepage = async () => {
  const ttt = await useFetchAllTasks(1);
  console.log("ttt=> ", ttt);
  return <div>Homepage</div>;
};

export default Homepage;
