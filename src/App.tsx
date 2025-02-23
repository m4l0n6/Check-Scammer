import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useState } from "react";
import UserApp from "./layout/UserApp";
import Home from "./pages/Home";
import Scammer from "./pages/Scammer";
import About from "./pages/About";
import Report from "./pages/Report";

function App() {
  const [warningList] = useState([
    {
      title: "Giả mạo tên miền, website",
      content:
        "Bọn lừa đảo mua 1 tên miền gần giống (chỉ lệch 1 vài ký tự) sau đó gắn vào web fake có giao diện giống hệt để lừa đảo",
    },
    {
      title: "Giả mạo tên miền, website",
      content:
        "Bọn lừa đảo mua 1 tên miền gần giống (chỉ lệch 1 vài ký tự) sau đó gắn vào web fake có giao diện giống hệt để lừa đảo",
    },
    {
      title: "Giả mạo tên miền, website",
      content:
        "Bọn lừa đảo mua 1 tên miền gần giống (chỉ lệch 1 vài ký tự) sau đó gắn vào web fake có giao diện giống hệt để lừa đảo",
    },
  ]);
  const scammerList = [
    {
      scammer__name: "Scammer A",
      scammer_phone: "0987654321",
      bank__number: "123456789",
      bank__name: "Vietcombank",
      content: "Lừa đảo mua 1 tên miền gần giống",
      user_name: "Nguyễn Văn B",
      user_phone: "0123456780",
      user_type: "Cá nhân",
      images: ["../src/assets/img/avatar-1.png"],
    },
    {
      scammer__name: "Scammer B",
      scammer_phone: "0987654322",
      bank__number: "123456780",
      bank__name: "Vietcombank",
      content: "Lừa đảo mua 1 tên miền gần giống",
      user_name: "Nguyễn Văn A",
      user_phone: "0123456789",
      user_type: "Cá nhân",
      images: ["../src/assets/img/avatar-1.png"],
    },
    {
      scammer__name: "Scammer C",
      scammer_phone: "0987654323",
      bank__number: "123456781",
      bank__name: "Vietcombank",
      content: "Lừa đảo mua 1 tên miền gần giống",
      user_name: "Nguyễn Văn A",
      user_phone: "0123456789",
      user_type: "Cá nhân",
      images: ["../src/assets/img/avatar-1.png"],
    },
  ];
  const [modalDetail, setModalDetail] = useState(false);
  const handleShowModalDetail = () => {
    setModalDetail(!modalDetail);
    document.body.style.overflow = modalDetail ? "auto" : "hidden";
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserApp />}>
          <Route
            index
            element={
              <Home
                warningList={warningList}
                scammerList={scammerList}
                modalDetail={modalDetail}
                handleShowModalDetail={handleShowModalDetail}
              />
            }
          />
          <Route
            path="scammer"
            element={
              <Scammer
                scammerList={scammerList}
                handleShowModalDetail={handleShowModalDetail}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
