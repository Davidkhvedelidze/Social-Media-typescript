import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="text-xl font-bold gap-10px text-red-600 gap-5 bg-blue-500 flex items-center h-15 justify-between">
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="login">Log In</Link>
      ) : (
        <>
          <Link to="createPost">Create Post</Link>
          <button onClick={signUserOut}>Log out</button>
        </>
      )}

      <div className="flex items-center justify-center">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              width={"30"}
              height={"30"}
              className="rounded-full ml-2 mr-2"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
