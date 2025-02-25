import { useEffect } from "react";
import { Link } from "react-router";

const handleScroll = () => {
  const header = document.querySelector("header");
  const headerHeight = header?.clientHeight || 0;
  const marginTop = header ? parseFloat(getComputedStyle(header).marginTop) : 0;
  const totalHeight = headerHeight + marginTop;
  if (window.scrollY > totalHeight) {
    header?.classList.add("fixed");
    document.body.style.paddingTop = `${totalHeight}px`;
  } else {
    header?.classList.remove("fixed");
    document.body.style.paddingTop = "0";
  }
};

function Header() {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup sự kiện khi thành phần bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className="fixed flex justify-between items-center bg-[var(--bgColor2)] backdrop-blur-[70px] mt-[25px] mr-[6%] ml-[6%] px-10 py-4 rounded-2xl header">
        <a href="" className="flex items-end gap-[6px]">
          <img src="../src/assets/img/logo.png" alt="logo" className="" />
          <span className="font-bold text-[18px] text-[var(--textcolor)]">
            Check scam
          </span>
        </a>
        <ul className="flex items-center gap-10 header-menu">
          <li className="header-menu-item">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="header-menu-item">
            <Link to="/scammer">Scamer</Link>
          </li>
          <li className="header-menu-item">
            <Link to="/about">Giới thiệu</Link>
          </li>
        </ul>
        <Link to="/report" className="btn">
          Gửi tố cáo
        </Link>
      </header>
    </>
  );
}

export default Header;
