import { useState } from "react";
import { Modal } from "react-responsive-modal";

const AddTask = () => {
  const [open, setOpen] = useState(false);

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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label className="font-medium text-gray-800">Title</label>
            <input
              type="text"
              className="w-full outline-none rounded  border-2 p-2 mt-2 mb-3"
            />
          </div>
          <div className="px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={() => setOpen(false)}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
            >
              <i className="fas fa-plus"></i> Create
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddTask;
