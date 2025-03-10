import Footer from "./Footer";
import Header from "./Header";
import { Outlet, useLocation } from "react-router";

function UserApp() {
  const location = useLocation();
  const is404Page = location.pathname === "*";

  return (
    <div className="relative">
      {!is404Page && <Header />}
      <div className="relative min-h-screen">
        <div className="top-1 left-[-57px] -z-[10] fixed bg-[#1B1D30] opacity-40 supports-[backdrop-filter]:blur-[50px] rounded-full w-[530px] h-[530px] effect-circle-1"></div>
        <div className="right-[-57px] bottom-1 -z-[10] fixed bg-[#1B1D30] opacity-40 supports-[backdrop-filter]:blur-[50px] rounded-full w-[530px] h-[530px] effect-circle-2"></div>
        <Outlet />
      </div>
      {!is404Page && <Footer />}
    </div>
  );
}

export default UserApp;
