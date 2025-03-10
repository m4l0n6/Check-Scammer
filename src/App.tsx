import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import UserApp from "./layout/UserApp";
import Home from "./pages/Home";
import Scammer from "./pages/Scammer";
import About from "./pages/About";
import Report from "./pages/Report";
import axios from "axios";
import { useHandleModal } from "./components/ModalDetail/usehandleModal";
import Notfound from "./pages/Notfound";

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
  const [scammerList, setScammerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getScammer() {
      setIsLoading(true);
      try {
        setTimeout(() => setIsLoading(false), 1000);
        const res = await axios.get(
          "https://67a8bcd26e9548e44fc1e141.mockapi.io/scammers"
        );
        setScammerList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getScammer();
  }, []);

  const { modalDetail, handleShowModalDetail, selectedScammer } =
    useHandleModal();

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
                selectedScammer={selectedScammer}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="scammer"
            element={
              <Scammer
                scammerList={scammerList}
                modalDetail={modalDetail}
                handleShowModalDetail={handleShowModalDetail}
                selectedScammer={selectedScammer}
                isLoading={isLoading}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="report" element={<Report />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
