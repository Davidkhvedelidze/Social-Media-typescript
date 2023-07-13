export interface MenuType {
  title: string;
  logo: any;
  onClick: any;
  active?: boolean;
}

function MenuBar({ title, logo, onClick, active }: MenuType) {
  const menuBarClass = `flex text-white w-[255px] h-[56px] items-center justify-between mb-1 bg-[#363755] pr-5 pl-5 hover:bg-opacity-[0.2] cursor-pointer ${
    active ? "border-l-4" : "" // Conditional class based on active prop
  }`;
  return (
    <div className={menuBarClass} onClick={onClick}>
      <div className="flex items-center justify-center w-[45px] h-[45px]">
        <img src={logo} />
      </div>
      {title}
      <div>:</div>
    </div>
  );
}

export default MenuBar;
