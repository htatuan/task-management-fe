import { addNewTask, deleteTask } from "@/app/services/useRequest";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Modal } from "react-responsive-modal";

interface DeleteTaskProps {
  onDeleteTaskSuccess: () => void;
  id: number;
}

const DeleteTask = (deleteTaskProps: DeleteTaskProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const { onDeleteTaskSuccess, id } = deleteTaskProps;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputAddTaskForm>();

  const { mutate } = useMutation((variables: { id: number }) =>
    deleteTask(variables.id)
  );

  const onSubmitTaskForm: SubmitHandler<InputAddTaskForm> = async (
    dataForm
  ) => {
    console.log(dataForm);
    mutate(
      {
        id: id,
      },
      {
        onSuccess: () => {
          console.log("success");
          onDeleteTaskSuccess();
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
export default DeleteTask;
