import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { AppContext } from "../App";
import { useContext } from "react";

function DropDownProfile({ name, setDropdownVisible }: any) {
  const [user] = useAuthState(auth);
  const { setUsers } = useContext(AppContext);

  const signUserOut = async () => {
    await signOut(auth);
    setDropdownVisible(false);
    setUsers([]);
  };
  //   const handleOnBlur =  ()=> {
  //     setDropdownVisible(false)
  //   }

  //   const handleCloseDropdown = (event: any) => {
  //     if (!event.currentTarget.contains(event.relatedTarget)) {
  //       setDropdownVisible(false);
  //     }
  //   };
  const close = () => {
    setDropdownVisible(false);
  };
  const open = () => {
    setDropdownVisible(true);
  };

  return (
    <>
      <div
        className="flex flex-col absolute top-[5.5rem] right-[3.9rem] w-[150px] h-[120px] border border-gray-400 rounded-lg bg-gray-100 items-center justify-center "
        onBlur={close}
        onFocus={open}
      >
        <div className="font-bold pt-1">{name}</div>
        <ul className="gap-1 w-[150px] items-center  flex flex-col">
          <li className=" hover:bg-gray-200 cursor-pointer w-[120px] px-2 ">
            Profile
          </li>
          <li className=" hover:bg-gray-200 cursor-pointer w-[120px]  px-2 ">
            Settings
          </li>
          <li className=" hover:bg-gray-200 cursor-pointer w-[120px]  px-2 ">
            {!user ? (
              <Link to="login">Log In</Link>
            ) : (
              <button onClick={signUserOut}>Log out</button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default DropDownProfile;
