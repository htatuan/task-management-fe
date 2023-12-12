"use client";
import React, { useEffect, useState } from "react";
import AddTask from "./add-task";
import SearchForm from "./search-form";
import TaskList from "./task-list";
import { TaskModel } from "./task.model";
import { useGetAllTask } from "@/app/services/useRequestClient";
import { ApiResponse } from "./api.response";
import { useQuery } from "react-query";
import callApi from "@/app/services/useGraphQL";
import { gql } from "graphql-request";

const TaskManagement = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [refesh, setRefresh] = useState<number>(1);
  // useEffect(() => {
  //   console.log("call => ", typeof key);
  //   refetch();
  // }, [key]);

  const { data, isFetching, status, error, refetch }: any = useQuery(
    ["searchTask", keyword, refesh],
    () => {
      console.log("start call api with key=> ", keyword);
      const allTasks = callApi().request(gql`
        query {
          data: searchTask(keyword: "${keyword}") {
            id
            status
            title
          }
        }
      `);
      return allTasks;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  let responseData: TaskModel[] = [];
  if (data) {
    let response = data as ApiResponse;
    responseData = response.data;
  }

  return (
    <>
      <div className="text-right mt-5">
        <AddTask onAdd={() => setRefresh(Date.now())}/>
      </div>

      <div className="mt-5">
        <SearchForm
          onSearch={(key: string) => {
            console.log("key=> ", key);
            setKeyword(key);
          }}
        />
      </div>

      <div className="mt-5">
        <TaskList tasks={responseData} />
      </div>
    </>
  );
};

export default TaskManagement;
