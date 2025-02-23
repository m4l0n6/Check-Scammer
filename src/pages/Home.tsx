import { useState } from "react";
import { format } from "date-fns";

interface HomeProps {
  warningList: { title: string; content: string }[];
  scammerList: {
    scammer__name: string;
    scammer_phone: string;
    bank__number: string;
    bank__name: string;
    content: string;
    user_name: string;
    user_phone: string;
    user_type: string;
    images: Array<string>;
  }[];
  modalDetail: boolean;
  handleShowModalDetail: () => void;
}

const Home: React.FC<HomeProps> = ({
  warningList,
  scammerList,
  handleShowModalDetail,
  modalDetail,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const dateString = format(new Date(), "dd/MM/yyyy");

  const handleShowDownDrop = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    console.log(activeIndex);
  };
  return (
    <div className="relative">
      <div className="img-fixed fixed top-[573px] left-1/2 right-0 transform -translate-x-1/2 -z-[1] flex items-center justify-center">
        <img src="../src/assets/img/shield.png" alt="" />
        <img
          className="absolute left-1/2  trasnform -translate-x-1/2"
          src="../src/assets/img/stars.png"
          alt=""
        />
      </div>
      {/* CONTENT */}
      <section className="max-w-[664px] w-full mx-auto mt-24">
        <h1 className="content__heading text-[50px] font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-tl from-[#D9C4AF] to-[#FFFFFF]">
          KIỂM TRA & TỐ CÁO SCAMMER
        </h1>
        <p className="text-[var(--subTextColor)] mt-5 text-center">
          Website lưu trữ dữ liệu lừa đảo trên mạng xã hội mà không chịu bất kỳ
          hạn chế seach của một thuật toán nào trên Facebook
        </p>
        <form className="max-w-[500px] p-[5px] w-full rounded-2xl bg-[var(--bgColor3)] border-[#FFFFFF1A] border mt-12 flex items-center mx-auto">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none pl-[19px] pr-6 text-[var(--textcolor)]"
            placeholder="Kiểm tra số tài khoản ngân hàng..."
          />
          <button type="submit" className="btn flex-shrink-0">
            Tìm kiếm
          </button>
        </form>
      </section>
      {/* end CONTENT */}

      <div className="max-w-[1100px] w-full  mx-auto mt-[138px] pb-[100px]">
        {/* SCAMERS */}
        <section className="rounded-2xl bg-[--bgColor4] border border-[#FFFFFF1A]">
          <div className="p-4 border-b border-b-[#FFFFFF1A] text-center">
            <h2 className="text-3xl font-extrabold">Hôm nay {dateString}</h2>
            <p className="text-[--subTextColor] mt-2">
              CÓ {scammerList.length} CẢNH BÁO
            </p>
          </div>
          <ul className="py-[50px] px-[30px] grid grid-cols-3 gap-5">
            {scammerList.map((scammer, index) => (
              <li
                key={index}
                className="scammer__item"
                onClick={handleShowModalDetail}
              >
                <img
                  src="../src/assets/img/avatar-1.png"
                  alt="avatar"
                  className=""
                />
                <div>
                  <h3 className="scammer__name">{scammer.scammer__name}</h3>
                  <div className="scammer__date">12/12/2024</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* end SCAMERS */}

        {/* WARNING */}
        <section className="mt-[60px]">
          <h2 className="text-3xl font-extrabold text-center">
            Một số kiểu lừa đảo online thường gặp
          </h2>
          <ul className="mt-[30px] flex flex-col gap-5">
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
        {modalDetail && (
          <section className="modal fixed top-0 right-0 left-0 bottom-0 h-screen flex justify-center items-center isolate z-[100] animate-fadeIn">
            <div
              className={`modal__overlay absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] -z-[1] ${
                modalDetail ? "cursor-pointer" : ""
              }`}
              onClick={handleShowModalDetail}
            ></div>
            <div className="modal__content h-[800px] w-[623px]  bg-[var(--bgColor2)] rounded-2xl backdrop-blur-[70px] animate-fadeDown scale-[0.88]">
              <div className="modal__header flex justify-between py-3 px-4 border-b border-b-[#FFFFFF1A] items-center h-[54px]">
                <div className="modal__header-title font-semibold text-xl">
                  Chi tiết tố cáo
                </div>
                <div
                  className="w-[30px] h-[30px] rounded-full bg-[var(--bgColor3)] flex justify-center items-center cursor-pointer hover:opacity-50 transition-all ease-in duration-200"
                  onClick={handleShowModalDetail}
                >
                  <img
                    src="../src/assets/img/close_icon.png"
                    alt="close_icon"
                  />
                </div>
              </div>
              <div className="modal__body py-2 px-4 h-[calc(800px-54px)] overflow-y-auto">
                <div className="modal__group">
                  <div className="modal__profile">
                    <div>
                      <img src="../src/assets/img/avatar-1.png" alt="" />
                    </div>
                    <div className="modal__info">
                      <h4 className="modal__info-name">Hoang van phong</h4>
                      <p className="modal__info-desc">
                        #50 - Tố vào ngày 12/02/2024
                      </p>
                    </div>
                  </div>
                  <div className="modal__detail">
                    <span className="modal__detail-title">Số điện thoại</span>
                    <span className="modal__detail-text">0333990859</span>
                  </div>
                  <div className="modal__detail">
                    <span className="modal__detail-title">Số tài khoản</span>
                    <span className="modal__detail-text">342423443</span>
                  </div>
                  <div className="modal__detail">
                    <span className="modal__detail-title">Nạn nhân</span>
                    <span className="modal__detail-text">0356655665</span>
                  </div>
                </div>
                <div className="modal__group">
                  <div className="modal__profile">
                    <div>
                      <img src="../src/assets/img/avatar-2.png" alt="" />
                    </div>
                    <div className="modal__info">
                      <h4 className="modal__info-name">Nguyễn văn B</h4>
                      <p className="modal__info-desc">Người tố cáo</p>
                    </div>
                  </div>
                  <div className="modal__detail">
                    <span className="modal__detail-title">Trạng thái</span>
                    <span className="modal__detail-text">Nạn nhân</span>
                  </div>
                  <div className="modal__detail">
                    <span className="modal__detail-title">Liên hệ</span>
                    <span className="modal__detail-text">0356655665</span>
                  </div>
                  <div className="modal__textarea mt-1">
                    <span className="modal__detail-title">Nội dung tố cáo</span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in
                    </p>
                  </div>
                  <div className="modal__img mt-[10px]">
                    <span className="modal__detail-title">
                      Hình ảnh liên quan
                    </span>
                    <div className="modal__preview-img grid grid-cols-3 gap-2 mt-2">
                      <img
                        src="https://images.unsplash.com/photo-1482434368596-fbd06cae4f89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image-scam"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1482434368596-fbd06cae4f89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image-scam"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1482434368596-fbd06cae4f89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image-scam"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1482434368596-fbd06cae4f89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="image-scam"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* end MODAL DETAIL SCAMMER */}
      </div>
    </div>
  );
};

export default Home;
