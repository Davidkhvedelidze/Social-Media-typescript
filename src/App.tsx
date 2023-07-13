import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/Login";
import Navbar from "./components/navigations/Navbar";
import CreatePost from "./pages/create-post/CreatePost";
import LeftNavbar from "./components/navigations/LeftNavbar";
import { useState, createContext, useEffect } from "react";

const defaultValue: any = JSON.parse(localStorage.getItem("users") as string)
  ? JSON.parse(localStorage.getItem("users") as string)
  : [];

// const saveUsersToLocalStorage = (users: any[]) => {
//   localStorage.setItem("users", JSON.stringify(users));
// };

export const AppContext = createContext({
  users: defaultValue,
  setUsers: (users: any[]) => {},
});
function App() {
  const [users, setUsers] = useState(defaultValue);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div>
      <AppContext.Provider value={{ users, setUsers }}>
        <Router>
          <div className="flex bg-[#e9ecef]">
            <div>
              <LeftNavbar />
            </div>
            <div>
              <Navbar />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Main />} />
                <Route path="/createpost" element={<CreatePost />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
