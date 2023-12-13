import { addNewTask, deleteTask } from "@/app/services/useRequest";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Modal } from "react-responsive-modal";

interface DeleteTaskProps {
  onDeleteTaskSuccess: () => void;
  onShowDeleteTaskModal: (show: boolean) => void;
  id: number | undefined;
  willShowModal: boolean;
}

const DeleteTask = (deleteTaskProps: DeleteTaskProps) => {
  const {
    onDeleteTaskSuccess,
    id,
    willShowModal,
    onShowDeleteTaskModal: onShowModal,
  } = deleteTaskProps;
  console.log("task id => " + id);
  const { mutate } = useMutation((variables: { id: number }) =>
    deleteTask(variables.id)
  );

  const onDeleteTask = async () => {
    console.log("delete it now" + id);
    mutate(
      {
        id: id!,
      },
      {
        onSuccess: () => {
          onDeleteTaskSuccess();
          onShowModal(false);
        },
        onError: (errors) => {
          console.log("error=> ", errors);
        },
      }
    );
  };

  return (
    <>
      <Modal open={willShowModal} onClose={() => onShowModal(false)} center>
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 sm:block sm:p-0">
          <form className="px-8 pt-6">
            <span>Are you sure you want to delete it ?</span>
            <div className="mt-5 text-right">
              <button
                type="button"
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => onShowModal(false)}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteTask();
                }}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                <i className="fas fa-plus"></i> Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default DeleteTask;
