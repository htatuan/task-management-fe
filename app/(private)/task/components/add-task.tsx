import { addNewTask } from "@/app/services/useRequest";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Modal } from "react-responsive-modal";

interface AddTaskProps {
  onRefreshData: () => void;
}

const AddTask = ({ onRefreshData }: AddTaskProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputAddTaskForm>();

  const { mutate:addTask } = addNewTask({});

  const onSubmitTaskForm: SubmitHandler<InputAddTaskForm> = async (
    dataForm
  ) => {
    console.log(dataForm);
    addTask(
      {
        title: dataForm.title,
        status: "TO DO",
      },
      {
        onSuccess: () => {
          console.log("success");
          onRefreshData();
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
        onClick={() => {
          reset();
          setOpen(true);
        }}
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
