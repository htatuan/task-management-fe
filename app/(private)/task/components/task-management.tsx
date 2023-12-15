"use client";
import React, { useState } from "react";
import AddTask from "./add-task";
import SearchForm from "./search-form";
import TaskList from "./task-list";
import { TaskModel } from "./task.model";
import { ApiResponse } from "./api.response";
import { useFetchAllTasks } from "@/app/services/useRequest";

const TaskManagement = () => {
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [refresh, setRefresh] = useState<number>(1);

  
  const { isPending, isError, data, error } = useFetchAllTasks(
    "searchTask",
    keyword,
    refresh
  );

  let responseData: TaskModel[] = [];
  if (data) {
    let response = data as ApiResponse;
    responseData = response.data;
  }

  return (
    <>
      <div className="p-4">
        <div className="text-right mt-5">
          <AddTask onRefreshData={() => setRefresh(Date.now())} />
        </div>

        <div className="mt-5">
          <SearchForm
            onSearch={(key: string | undefined) => {
              console.log("key=> ", key);
              setKeyword(key);
            }}
          />
        </div>

        <div className="mt-5">
          <TaskList
            tasks={responseData}
            onRefreshData={() => setRefresh(Date.now())}
          />
        </div>
      </div>
    </>
  );
};

export default TaskManagement;
