import MenuBar from "../MenuBar";
import { useNavigate } from "react-router-dom";
import HomePage from "../../img/HomePage.png";
import aboutAs from "../../img/aboutAs.png";
import newPost from "../../img/newPost.png";
import blog from "../../img/blog.png";
import { useState } from "react";

const MenuData = [
  {
    id: 1,
    title: "Home",
    navigate: "/",
    logo: HomePage,
  },
  {
    id: 2,
    title: "New Post",
    navigate: "/createPost",
    logo: newPost,
  },
  {
    id: 3,
    title: "Blog",
    navigate: "/createPost",
    logo: blog,
  },
  {
    id: 4,
    title: "About Us",
    navigate: "/createPost",
    logo: aboutAs,
  },
];

function LeftNavbar() {
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState<any>(null);

  const handleMenuItemClick = (menuItem: any) => {
    setActiveMenuItem(menuItem.id);
    navigate(menuItem.navigate);
  };

  return (
    <div className="bg-[#363740] w-[255px] h-[801px] ">
      <div className=" w-[255px] h-[124px] flex items-center justify-center  ">
        <h1
          className="font-bold text-white text-3xl p-10 cursor-pointer"
          onClick={() => {
            setActiveMenuItem(null);
            navigate("/");
          }}
        >
          LOGOGO
        </h1>
      </div>
      {MenuData.map((item) => {
        return (
          <MenuBar
            title={item.title}
            logo={item.logo}
            key={item.id}
            active={activeMenuItem === item.id}
            onClick={() => {
              handleMenuItemClick(item);
              navigate(item.navigate);
            }}
          />
        );
      })}
    </div>
  );
}

export default LeftNavbar;
