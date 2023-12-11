import React, { useEffect, useState } from "react";
import SearchForm from "./task/components/search-form";
import TaskList from "./task/components/task-list";
import AddTask from "./task/components/add-task";
import CustomModal from "./task/components/add-new-task-modal";
import { TaskModel } from "./task/components/task.model";

const Homepage = () => {
  const session = await getServerSession(authOptions);
  console.log("sesss=> ", session);
  const tasks: TaskModel[] = [
    { id: 1, status: "InProgress", title: "Tuan" },
    { id: 2, status: "Todo", title: "Huy" },
    { id: 3, status: "Done", title: "Bao" },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="text-right mt-5">
        <AddTask />
      </div>
      <div className="text-right mt-5"></div>
      <div className="mt-5">
        <SearchForm />
      </div>

      <div className="mt-5">
        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default Homepage;
