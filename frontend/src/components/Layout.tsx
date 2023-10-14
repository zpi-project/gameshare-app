import { FC } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

const Layout: FC = () => {
  return (
    <div className=" flex h-screen w-screen flex-row gap-6 p-6">
      <SideNav />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
