import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

import "./Layout.css";

const MainLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default MainLayout;
