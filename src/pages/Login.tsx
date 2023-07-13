import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Google from "../img/gooogle.png";

function Login() {
  const navigate = useNavigate();
  const signInWirhGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center flex-col h-[70%] gap-3">
      <div>
        <img src={Google} className="w-[250px]" />
      </div>
      <p className="">Sign in with Google to continue</p>
      <button
        onClick={signInWirhGoogle}
        className="border border-b-5  bg-blue-700 rounded-3xl p-2 px-5 text-white "
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
