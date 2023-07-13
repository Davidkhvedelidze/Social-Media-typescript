import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { signOut } from "firebase/auth";
import hello from "../../img/hello.png";
import DropDownProfile from "../DropDownProfile";
import { useState, useContext } from "react";
import { AppContext } from "../../App";

function Navbar() {
  const [user] = useAuthState(auth);
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const { users } = useContext(AppContext);

  // useEffect(() => {
  //   let handleOutsideClick = (event: MouseEvent) => {
  //     if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
  //       setDropdownVisible(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  const doneTasks = users.filter((task: any) => task.done);
  const undoneTasks = users.filter((task: any) => !task.done);

  return (
    <div className="flex justify-center">
      <div className="navbarMain">
        {!user ? (
          <>
            <div className="flex items-center gap-5 justify-between w-[100%] ">
              <div>
                <h1>I don't Know you yet</h1>
              </div>
              <div className="text-white bg-blue-500 rounded-3xl p-2 px-5 hover:bg-blue-700">
                <Link to="login">Log In</Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-5">
              <img src={hello} />
              <h1>{user?.displayName}</h1>
            </div>
            <h1 className="text-red-600 ">
              You Have {undoneTasks.length ? undoneTasks.length : "0"} Task to
              do
            </h1>
            {!(doneTasks.length === 0) && (
              <h1 className="text-green-600 ">
                You Have {doneTasks.length ? doneTasks.length : "0"} Task Done
              </h1>
            )}
          </>
        )}

        <div className="flex items-center justify-center">
          {user && (
            <>
              <img
                src={user?.photoURL || ""}
                width={"40"}
                height={"40"}
                className="rounded-full ml-2 mr-3 cursor-pointer hover:shadow-md hover:shadow-blue-600"
                onClick={() => {
                  setDropdownVisible(!dropDownVisible);
                }}
              />
            </>
          )}
        </div>
      </div>
      {dropDownVisible && (
        <DropDownProfile
          name={user?.displayName}
          setDropdownVisible={setDropdownVisible}
        />
      )}
    </div>
  );
}

export default Navbar;
