"use client";
import React from "react";
import AddTask from "./add-task";
import SearchForm from "./search-form";
import TaskList from "./task-list";
import { TaskModel } from "./task.model";
import { useGetAllTask } from "@/app/services/useRequest";
import { useQuery } from "react-query";
import graphQLClient from "@/app/services/useGraphQL";
import { gql } from "graphql-request";

const TaskManagement = () => {
  const { data, error, isLoading } = useGetAllTask();
  const tasks: TaskModel[] = [
    { id: 1, status: "InProgress", title: "Tuan" },
    { id: 2, status: "Todo", title: "Huy" },
    { id: 3, status: "Done", title: "Bao" },
  ];
  console.log("a");
  //console.log(data.data.findAllTasks[0]);
  return (
    <>
      <div className="text-right mt-5">
        <AddTask />
      </div>

      <div className="mt-5">
        <SearchForm />
      </div>

      <div className="mt-5">
        <TaskList tasks={[]} />
      </div>
    </>
  );
};

export default TaskManagement;
