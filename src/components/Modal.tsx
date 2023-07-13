import { useState } from "react";

function Modal({
  open,
  onClose,
  firstName,
  lastName,
  setUsers,
  users,
  setFirstName,
  setLastName,
}: any) {
  if (!open) return null;
  const [inputError, setInputError] = useState<boolean>(false);
  const [lengthErr, setLengthErr] = useState<boolean>(false);

  const addUser = () => {
    if (firstName === "" || lastName === "") {
      setInputError(true);
      setLengthErr(false);
      return;
    } else {
      setInputError(false);
    }
    const newUser = {
      id: users.length === 0 ? 0 : users[users.length - 1].id + 1,
      firstName,
      lastName,
      startTime: new Date().toLocaleTimeString([], {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      done: false,
    };
    if (users.length > 9) {
      setLengthErr(true);
      return;
    } else {
      setUsers([...users, newUser]);
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-50 "
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white  z-50 w-[850px] h-[120px] items-center   rounded-md">
        <div className="flex items-center border-b-2 justify-evenly">
          <button
            className="absolute right-4 top-2 w-5 h-5 bg-red-600 flex items-center text-white justify-center "
            onClick={onClose}
          >
            X
          </button>
          <input
            className="hover:shadow-md border-b-4 m-5 outline-none 
            w-[230px] p-2"
            type="text"
            value={firstName}
            placeholder="Author ... "
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="hover:shadow-md border-b-4 m-5 outline-none  w-[230px] p-2"
            type="text"
            value={lastName}
            placeholder="Task To Do ... "
            onChange={(e) => setLastName(e.target.value)}
          />

          <button
            className=" cursor-pointer flex py-2  justify-center items-center rounded-md border border-blue-500 bg-blue-900 shadow-xs w-[100px] h-[40px] font-bold text-white  "
            onClick={addUser}
          >
            Add Task
          </button>
        </div>
        <div className="flex justify-center items-center text-red-700 font-bold ">
          {inputError && <p>Something is missing</p>}
          {lengthErr && <p>You can add maximum 10 Tasks</p>}
        </div>
      </div>
    </>
  );
}

export default Modal;
