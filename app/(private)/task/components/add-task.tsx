import ModalAdd from "./ModalAdd";

const AddTask = () => {
  return (
    <>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
        New Task
      </button>
      <ModalAdd />
    </>
  );
};
export default AddTask;
