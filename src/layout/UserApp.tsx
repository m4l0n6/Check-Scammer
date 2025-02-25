import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";

function UserApp() {
  return (
    <div className="relative">
      <Header />
      <div>
        <div className="top-1 left-[-57px] -z-[10] fixed bg-[#1B1D30] opacity-40 supports-[backdrop-filter]:blur-[50px] rounded-full w-[530px] h-[530px] effect-circle-1"></div>
        <div className="right-[-57px] bottom-1 -z-[10] fixed bg-[#1B1D30] opacity-40 supports-[backdrop-filter]:blur-[50px] rounded-full w-[530px] h-[530px] effect-circle-2"></div>
        <Outlet />
        <div className="right-3 bottom-3 z-[20] fixed bg-white shadow-lg px-5 py-3 rounded-xl font-semibold text-black cursor-pointer">
          Tối
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserApp;
