"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskModel } from "../../../types/task.model";
import Modal from "react-responsive-modal";
import { useState } from "react";
import { updateTask } from "@/app/services/useRequest";
import DeleteTask from "./DeleteTask";
import { toShortDateTimeString } from "@/app/utils/format-date";
import useMutationCustom from "@/app/hooks/useMutationCustom";
import { formatErrorResponse } from "@/app/utils/format-error";
import { toast } from "react-toastify";

interface TaskListProps {
  tasks: TaskModel[];
  onRefreshData: () => void;
}

const TaskList = ({ tasks, onRefreshData }: TaskListProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [willShowModal, setWillShowDeleteTaskModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TaskModel>({} as TaskModel);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputEditTaskForm>();

  const mutation = useMutationCustom({
    onError: (error, variables, context) => {
      toast.error(formatErrorResponse(error).message);
    },
    onSuccess: (data, variables, context) => {
      onRefreshData();
      setOpen(false);
    },
  }, updateTask);

  const deleteTask = async (task: TaskModel) => {
    setSelectedItem(task);
    setWillShowDeleteTaskModal(true);
  };

  const progressStatusStyle = (status: string) => {
    let style = "";
    switch (status) {
      case "TO DO":
        style = "bg-blue-500 text-white rounded rounded-full text-center";
        break;
      case "IN PROGRESS":
        style = "bg-cyan-600 text-white rounded rounded-full text-center";
        break;
      case "COMPLETED":
        style = "bg-green-600 text-white rounded rounded-full text-center";
        break;
      case "ARCHIVED":
        style = "bg-neutral-400 text-white rounded rounded-full text-center";
        break;

      default:
        style = "";
        break;
    }
    return style;
  };

  const onSubmitEditTaskForm: SubmitHandler<InputEditTaskForm> = async (
    dataForm
  ) => {
    mutation.mutate({ id: selectedItem.id, status: dataForm.status });
  };

  return (
    <>
      <DeleteTask
        id={selectedItem.id}
        willShowModal={willShowModal}
        onDeleteTaskSuccess={() => {
          onRefreshData();
        }}
        onShowDeleteTaskModal={setWillShowDeleteTaskModal}
      />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-1 w-10 text-center">
                Status
              </th>
              <th scope="col" className="px-12 py-3 text-center ">
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
                className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {task.title}
                </th>
                <td
                  className={`px-6 py-1 w-10 ${progressStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </td>
                <td className="px-12 py-1 text-center ">
                  {toShortDateTimeString(task.createdAt)}
                </td>
                <td className="px-6 py-1">
                  <button
                    type="button"
                    className="py-2 px-2 bg-orange-500 text-white rounded rounded-full hover:bg-blue-700 mr-2"
                    onClick={() => {
                      setSelectedItem(task);
                      setValue("status", task.status);
                      setOpen(true);
                    }}
                  >
                    <i className="fas fa-plus"></i> Edit
                  </button>
                  <button
                    disabled={task.status == "ARCHIVED"}
                    type="button"
                    onClick={async () => {
                      await deleteTask(task);
                    }}
                    className="py-2 px-2 bg-red-500 text-white rounded rounded-full hover:bg-gray-700 "
                  >
                    <i className="fas fa-times"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 sm:block sm:p-0">
          <form
            onSubmit={handleSubmit(onSubmitEditTaskForm)}
            className="px-8 pt-6"
          >
            <div className="">
              <h3>
                Update status for the task:{" "}
                <strong>[{selectedItem.title}]</strong>
              </h3>
            </div>
            <div className="">
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
                <i className="fas fa-plus"></i> Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default TaskList;
