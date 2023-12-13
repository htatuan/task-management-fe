"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskModel } from "./task.model";
import { useFormSchema } from "./types/searchFormSchema";
import { useGetAllTask } from "@/app/services/useRequestClient";
import { ApiResponse } from "./api.response";
import { useQuery } from "react-query";
import callApi from "@/app/services/useGraphQL";
import { gql } from "graphql-request";
import Modal from "react-responsive-modal";
import { useState } from "react";

interface Task {
  tasks: TaskModel[];
}

const TaskList = ({ tasks }: Task) => {
  const [open, setOpen] = useState<boolean>(false)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<InputEditTaskForm>();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.title}
                </th>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">{task.createdAt}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="py-2 px-2 bg-orange-500 text-white rounded hover:bg-blue-700 mr-2"
                  >
                    <i className="fas fa-plus"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="py-2 px-2 bg-red-500 text-white rounded hover:bg-gray-700 "
                  >
                    <i className="fas fa-times"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 sm:block sm:p-0">
          <form onSubmit={handleSubmit(onSubmitTaskForm)} className="px-8 pt-6">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                className="w-full outline-none rounded  border border-gray-300 p-2 mt-2 mb-3"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs italic">
                  Please enter title
                </p>
              )}
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                className=" border rounded border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose status</option>
                <option value="TO DO">TO DO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs italic">
                  Please enter status
                </p>
              )}
            </div>

            <div className="mt-5 text-right">
              <button
                type="button"
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => setOpen(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                <i className="fas fa-plus"></i> Create
              </button>
            </div>
          </form>
        </div>
      </Modal> */}
    </>
  );
};
export default TaskList;
