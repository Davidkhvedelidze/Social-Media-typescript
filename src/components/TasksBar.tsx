import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

interface Tasks {
  title: string;
  description: string;
  time: string;
  onDelete: () => void;
  onDone: () => void;
  done: boolean;
  unDone: () => void;
}

function TasksBar({
  title,
  description,
  time,
  onDelete,
  onDone,
  done,
  unDone,
}: Tasks) {
  const [user] = useAuthState(auth);

  return (
    <>
      <div
        className={`flex w-[1064px] flex-col  border border-gray-300ml-5 ${
          done ? "bg-green-100" : "bg-white"
        }`}
      >
        <div>
          {user?.displayName && (
            <p className="text-gray-300 text-xs pl-3">
              author : {user?.displayName}
            </p>
          )}
        </div>
        <div
          className="
         items-center flex justify-evenly p-[10px]
        "
        >
          <div className="w-[300px] flex items-center  border-b-4">
            <p className="p-1">{title}</p>
          </div>
          <div
            className="w-[300px] flex items-center justify-start
          border-b-4 
      "
          >
            <p className="p-1">{description}</p>
          </div>
          <div className="w-[250px] flex items-center justify-start">
            {time}
          </div>
          {done ? (
            <button className="text-blue-500 " onClick={unDone}>
              unDone
            </button>
          ) : (
            <button className="text-green-500" onClick={onDone}>
              Done
            </button>
          )}
          <button className="text-red-500" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default TasksBar;
