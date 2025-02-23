import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router";

function UserApp() {
  return (
    <div className="relative">
      <Header />
      <div>
        <div className="effect-circle-1 w-[530px] h-[530px] rounded-full bg-[#1B1D30] fixed top-1 left-[-57px] opacity-40 supports-[backdrop-filter]:blur-[50px] -z-[10] "></div>
        <div className="effect-circle-2 w-[530px] h-[530px] rounded-full bg-[#1B1D30] fixed bottom-1 right-[-57px] opacity-40 supports-[backdrop-filter]:blur-[50px] -z-[10]"></div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserApp;
