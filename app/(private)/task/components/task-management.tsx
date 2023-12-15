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
import useQueryCustom from "@/app/services/useQueryCustom";
import { ref } from "yup";
import { useFetchAllTasks } from "@/app/services/useRequest";

const TaskManagement = () => {
  const [keyword, setKeyword] = useState<string | undefined>("");
  const [refresh, setRefresh] = useState<number>(1);

  // const { data, isFetching, status, error, refetch }: any = useQuery(
  //   ["searchTask", keyword, refresh],
  //   () => {
  //     console.log("start call api with key=> ", keyword);
  //     const allTasks = callApi().request(gql`
  //       query {
  //         data: searchTask(keyword: "${keyword}") {
  //           id
  //           status
  //           title
  //           createdAt
  //         }
  //       }
  //     `);
  //     return allTasks;
  //   },
  //   {
  //     refetchOnWindowFocus: true,
  //     staleTime: 0,
  //     cacheTime: 0,
  //     refetchInterval: 0,
  //   }
  // );
  const { data, isFetching, status, error, refetch } = useFetchAllTasks(
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
