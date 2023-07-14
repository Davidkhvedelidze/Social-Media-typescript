// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../../config/firebase";
import { useState, useContext } from "react";
import { Post } from "./Post";
import Modal from "../../components/Modal";
import TasksBar from "../../components/TasksBar";
// import { auth } from "../../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import { AppContext } from "../../App";
import ProgressBar from "@ramonak/react-progress-bar";
import PlusIcon from "../../img/plus.png";
import MinusIcon from "../../img/minus.png";

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  username: string;
}
interface User {
  firstName: string;
  lastName: string;
  startTime: string;
  done: boolean;
}

function Main() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  // const [user] = useAuthState(auth);

  const { users, setUsers } = useContext(AppContext);

  const handleDeleteUser = (index: number) => {
    let newTasks = [...users];
    newTasks.splice(index, 1);
    setUsers(newTasks);
  };

  const handleDone = (id: number) => {
    const updatedTodos = users.map((todo: any) => {
      if (todo.id === id) {
        return { ...todo, done: true };
      }
      return todo;
    });
    setUsers(updatedTodos);
  };
  const handleUnDone = (id: number) => {
    const updatedTodos = users.map((todo: any) => {
      if (todo.id === id) {
        return { ...todo, done: false };
      }
      return todo;
    });
    setUsers(updatedTodos);
  };

  const doneTasks = users.filter((task: any) => task.done);
  const undoneTasks = users.filter((task: any) => !task.done);

  return (
    <div className="flex">
      {/* <div className="flex gap-2 justify-between flex-wrap ">
        {postList?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div> */}
      <div className="flex flex-col">
        <div
          className=" cursor-pointer flex py-4 px-2 justify-center items-center gap-3 rounded-md border border-blue-500 bg-blue-900 shadow-xs w-[150px] font-bold text-white ml-5"
          onClick={() => setModalVisible(!modalVisible)}
        >
          + Add New Task
        </div>

        <div
          className=" h-[50px] 
          w-[1064px]
           p-[16px] flex  items-center justify-start
        rounded-t-lg border border-gray-300 bg-gray-50 m-5 mb-0  text-[#8a92a6] text-sm  font-circular tracking-normal leading-175 "
        >
          <div
            className="flex
          items-center"
          >
            <div className="bg-white w-5 h-5 flex items-center justify-center border">
              {!tasksVisible ? (
                <img
                  src={PlusIcon}
                  width={20}
                  height={20}
                  onClick={() => setTasksVisible(!tasksVisible)}
                />
              ) : (
                <img
                  src={MinusIcon}
                  width={15}
                  height={15}
                  onClick={() => setTasksVisible(!tasksVisible)}
                />
              )}
            </div>
          </div>
          <div
            className="
           w-[700px]
            flex justify-between px-5 items-center 
            "
          >
            <p>Author</p>
            <p>Tasks To do </p>
            <p>Start Time</p>
          </div>
        </div>
        {tasksVisible && (
          <div className="ml-[20px]">
            {users &&
              users?.map((user: User, index: number) => {
                return (
                  <TasksBar
                    title={user.firstName}
                    description={user.lastName}
                    time={user.startTime}
                    key={index}
                    onDelete={() => handleDeleteUser(index)}
                    onDone={() => handleDone(index)}
                    done={user.done}
                    unDone={() => handleUnDone(index)}
                  />
                );
              })}
          </div>
        )}

        {modalVisible && (
          <Modal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            firstName={firstName}
            lastName={lastName}
            setUsers={setUsers}
            users={users}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setModalvisible={setModalVisible}
          ></Modal>
        )}
      </div>
      <div className="mt-[150px]">
        <div
          className="w-[250px] h-[117px] bg-white  rounded-sm p-2 mb-2 
        "
        >
          <ProgressBar
            completed={doneTasks.length * 10}
            animateOnRender={true}
            transitionDuration="0.4s"
            className="rounded-full"
            isLabelVisible={false}
            height="10px"
            bgColor="green"
            borderRadius="100px"
          />
          <h1 className="items-center  justify-center flex font-bold h-[100px] text-green-500">
            Completed Tasks
          </h1>
        </div>
        <div
          className="w-[250px] h-[117px] bg-white  rounded-sm p-2
      "
        >
          <ProgressBar
            completed={undoneTasks.length * 10}
            animateOnRender={true}
            transitionDuration="0.4s"
            className="rounded-full"
            isLabelVisible={false}
            height="10px"
            bgColor="red"
            borderRadius="100px"
          />
          <h1 className="items-center  justify-center flex font-bold h-[100px] text-red-500">
            Tasks To Do
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Main;
