import { addNewTask } from "@/app/services/useRequest";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Modal } from "react-responsive-modal";

interface AddTaskProps {
  onAddSuccess: () => void;
}

const AddTask = ({ onAddSuccess }: AddTaskProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputAddTaskForm>();

  const { mutate } = useMutation(
    (variables: { title: string; status: string; ownerId: number }) =>
      addNewTask(variables.title, variables.status, variables.ownerId)
  );

  const onSubmitTaskForm: SubmitHandler<InputAddTaskForm> = async (
    dataForm
  ) => {
    console.log(dataForm);
    mutate(
      {
        title: dataForm.title,
        status: dataForm.status,
        ownerId: 1,
      },
      {
        onSuccess: () => {
          console.log("success");
          onAddSuccess();
          setOpen(false);
        },
        onError: (errors) => {
          console.log("error=> ", errors);
        },
      }
    );
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => setOpen(true)}
      >
        New Task
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
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
      </Modal>
    </>
  );
};
export default AddTask;
