import { useState } from "react";

import ModalDetail from "../components/ModalDetail";
import { dateFormat } from "../components/dateFormat";
import Nodata from "../components/Nodata";
import Loading from "../components/Loading";
import { handleSearch } from "../components/handleSearch";

interface HomeProps {
  warningList: { title: string; content: string }[];
  scammerList: {
    scammer__name: string;
    scammer_phone: string;
    bank__number: string;
    bank__name: string;
    content: string;
    user__name: string;
    user__phone: string;
    user__type: string;
    images: Array<string>;
    date: string;
  }[];
  modalDetail: boolean;
  handleShowModalDetail: (
    scammer?: {
      scammer__name: string;
      scammer_phone: string;
      bank__number: string;
      bank__name: string;
      content: string;
      user__name: string;
      user__phone: string;
      user__type: string;
      images: Array<string>;
      date: string;
    } | null
  ) => void;
  selectedScammer: {
    scammer__name: string;
    scammer_phone: string;
    bank__number: string;
    bank__name: string;
    content: string;
    user__name: string;
    user__phone: string;
    user__type: string;
    images: Array<string>;
    date: string;
  } | null;
  isLoading: boolean;
}

const Home: React.FC<HomeProps> = ({
  warningList,
  scammerList,
  handleShowModalDetail,
  modalDetail,
  selectedScammer,
  isLoading,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const todayData = scammerList.filter((user) => {
    const userDate = new Date(user.date);
    userDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return userDate.getTime() === today.getTime();
  });

  const handleShowDownDrop = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    console.log(activeIndex);
  };
  return (
    <div className="relative">
      <div className="top-[573px] right-0 left-1/2 -z-[1] fixed img-fixed flex justify-center items-center -translate-x-1/2 transform">
        <img src="../src/assets/img/shield.png" alt="" />
        <img
          className="left-1/2 absolute -translate-x-1/2 trasnform"
          src="../src/assets/img/stars.png"
          alt=""
        />
      </div>
      {/* CONTENT */}
      <section className="mx-auto mt-24 w-full max-w-[664px]">
        <h1 className="bg-clip-text bg-gradient-to-tl from-[#D9C4AF] to-[#FFFFFF] font-extrabold text-[50px] text-transparent text-center content__heading">
          KIỂM TRA & TỐ CÁO SCAMMER
        </h1>
        <p className="mt-5 text-[var(--subTextColor)] text-center">
          Website lưu trữ dữ liệu lừa đảo trên mạng xã hội mà không chịu bất kỳ
          hạn chế seach của một thuật toán nào trên Facebook
        </p>
        <form
          className="flex items-center bg-[var(--bgColor3)] mx-auto mt-12 p-[5px] border border-[#FFFFFF1A] rounded-2xl w-full max-w-[500px]"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="flex-1 bg-transparent pr-6 pl-[19px] outline-none text-[var(--textcolor)]"
            placeholder="Kiểm tra số tài khoản ngân hàng..."
          />
          <button
            type="submit"
            className="flex-shrink-0 btn"
            onSubmit={handleSearch}
          >
            Tìm kiếm
          </button>
        </form>
      </section>
      {/* end CONTENT */}

      <div className="mx-auto mt-[138px] pb-[100px] w-full max-w-[1100px]">
        {/* SCAMERS */}
        <section className="bg-[--bgColor4] border border-[#FFFFFF1A] rounded-2xl">
          <div className="p-4 border-b border-b-[#FFFFFF1A] text-center">
            <h2 className="font-extrabold text-3xl">
              Hôm nay {dateFormat(new Date())}
            </h2>
            <p className="mt-2 text-[--subTextColor]">
              CÓ {todayData.length} CẢNH BÁO
            </p>
          </div>
          <div>
            {todayData.length > 0 ? (
              isLoading ? (
                <div className="flex justify-center items-center p-10 w-full">
                  <Loading
                    width="w-[100px]"
                    border="border-[8px]"
                    height="h-[100px]"
                  />
                </div>
              ) : (
                <ul className="gap-5 grid grid-cols-3 px-[30px] py-[50px]">
                  {todayData.map((scammer, index) => (
                    <li
                      key={index}
                      className="scammer__item"
                      onClick={() => handleShowModalDetail(scammer)}
                    >
                      <img
                        src="../src/assets/img/avatar-1.png"
                        alt="avatar"
                        className=""
                      />
                      <div>
                        <h3 className="scammer__name">
                          {scammer.scammer__name}
                        </h3>
                        <div className="scammer__date">
                          {" "}
                          #{index + 1} - {dateFormat(new Date(scammer.date))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <Nodata />
            )}
          </div>
        </section>
        {/* end SCAMERS */}

        {/* WARNING */}
        <section className="mt-[60px]">
          <h2 className="font-extrabold text-3xl text-center">
            Một số kiểu lừa đảo online thường gặp
          </h2>
          <ul className="flex flex-col gap-5 mt-[30px]">
            {warningList.map((warning, index) => (
              <li key={index} className="warning__item">
                <div
                  className="warning__header"
                  onClick={() => handleShowDownDrop(index)}
                >
                  <span
                    className={`warning__header-icon ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <img src="../src/assets/svg/arrow_right.svg" alt="icon" />
                  </span>
                  <h4 className="warning__title">{warning.title}</h4>
                </div>
                <div
                  className={`warning__content ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  {warning.content}
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* end WARNING */}

        {/* MODAL DETAIL SCAMMER */}
        {modalDetail && selectedScammer && (
          <ModalDetail
            modalDetail={modalDetail}
            handleShowModalDetail={handleShowModalDetail}
            scammer={selectedScammer}
          />
        )}

        {/* end MODAL DETAIL SCAMMER */}
      </div>
    </div>
  );
};

export default Home;
