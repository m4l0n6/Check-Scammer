import { dateFormat } from "../dateFormat";

interface ModalDetailProps {
  scammer: {
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
  };
  modalDetail: boolean;
  handleShowModalDetail: () => void;
}

function ModalDetail({
  modalDetail,
  handleShowModalDetail,
  scammer,
}: ModalDetailProps) {
  return (
    <>
      <section className="top-0 right-0 bottom-0 left-0 z-[100] isolate fixed flex justify-center items-center h-screen animate-fadeIn modal">
        <div
          className={`modal__overlay absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.6)] -z-[1] ${
            modalDetail ? "cursor-pointer" : ""
          }`}
          onClick={handleShowModalDetail}
        ></div>
        <div className="bg-[var(--bgColor2)] backdrop-blur-[70px] rounded-2xl w-[623px] h-[800px] scale-[0.88] animate-fadeDown modal__content">
          <div className="flex justify-between items-center px-4 py-3 border-b border-b-[#FFFFFF1A] h-[54px] modal__header">
            <div className="font-semibold text-xl modal__header-title">
              Chi tiết tố cáo
            </div>
            <div
              className="flex justify-center items-center bg-[var(--bgColor3)] hover:opacity-50 rounded-full w-[30px] h-[30px] transition-all duration-200 ease-in cursor-pointer"
              onClick={handleShowModalDetail}
            >
              <img src="../src/assets/img/close_icon.png" alt="close_icon" />
            </div>
          </div>
          <div className="h-[calc(800px-54px)] px-4 py-2 overflow-y-auto modal__body">
            <div className="modal__group">
              <div className="modal__profile">
                <div>
                  <img src="../src/assets/img/avatar-1.png" alt="" />
                </div>
                <div className="modal__info">
                  <h4 className="modal__info-name">{scammer.scammer__name}</h4>
                  <p className="modal__info-desc">
                    Tố vào ngày {dateFormat(new Date(scammer.date))}
                  </p>
                </div>
              </div>
              <div className="modal__detail">
                <span className="modal__detail-title">Số điện thoại</span>
                <span className="modal__detail-text">
                  {scammer.scammer_phone}
                </span>
              </div>
              <div className="modal__detail">
                <span className="modal__detail-title">Số tài khoản</span>
                <span className="modal__detail-text">
                  {scammer.bank__number}
                </span>
              </div>
              <div className="modal__detail">
                <span className="modal__detail-title">Ngân hàng</span>
                <span className="modal__detail-text">{scammer.bank__name}</span>
              </div>
            </div>
            <div className="modal__group">
              <div className="modal__profile">
                <div>
                  <img src="../src/assets/img/avatar-2.png" alt="" />
                </div>
                <div className="modal__info">
                  <h4 className="modal__info-name">{scammer.user__name}</h4>
                  <p className="modal__info-desc">Người tố cáo</p>
                </div>
              </div>
              <div className="modal__detail">
                <span className="modal__detail-title">Trạng thái</span>
                <span className="modal__detail-text">{scammer.user__type}</span>
              </div>
              <div className="modal__detail">
                <span className="modal__detail-title">Liên hệ</span>
                <span className="modal__detail-text">
                  {scammer.user__phone}
                </span>
              </div>
              <div className="mt-1 modal__textarea">
                <span className="modal__detail-title">Nội dung tố cáo</span>
                <p>{scammer.content}</p>
              </div>
              <div className="mt-[10px] modal__img">
                <span className="modal__detail-title">Hình ảnh liên quan</span>
                <div className="gap-2 grid grid-cols-3 mt-2 modal__preview-img">
                  {scammer.images.map((image, index) => (
                    <img src={image} key={index} alt="image-scam" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModalDetail;
