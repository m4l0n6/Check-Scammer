import ModalDetail from "../components/ModalDetail";
import { dateFormat } from "../components/dateFormat";
import Loading from "../components/Loading";
import Nodata from "../components/Nodata";
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
interface Scamerprops {
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

const Scammer: React.FC<Scamerprops> = ({
  scammerList,
  handleShowModalDetail,
  modalDetail,
  selectedScammer,
  isLoading,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchQuery = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/scammer?search=${encodeURIComponent(searchQuery)}`);
  };

  const danhSachScammerDaLoc = useMemo(() => {
    if (!initialSearchQuery) return scammerList;

    const keyWord = initialSearchQuery.toLowerCase();
    return scammerList.filter(
      (scammer) =>
        scammer.scammer_phone.toLowerCase().includes(keyWord.trim()) ||
        scammer.bank__number.toLowerCase().includes(keyWord.trim()) ||
        scammer.scammer__name.toLowerCase().includes(keyWord.trim()) ||
        scammer.bank__name.toLowerCase().includes(keyWord.trim())
    );
  }, [scammerList, initialSearchQuery]);
  return (
    <div>
      <form
        className="flex items-center bg-[var(--bgColor3)] mx-auto mt-[60px] p-[5px] border border-[#FFFFFF1A] rounded-2xl w-full max-w-[500px]"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent pr-6 pl-[19px] outline-none text-[var(--textcolor)]"
          placeholder="Kiểm tra số tài khoản ngân hàng..."
        />
        <button type="submit" className="flex-shrink-0 btn">
          Tìm kiếm
        </button>
      </form>

      <div className="mx-auto mt-[60px] pb-[100px] w-full max-w-[1100px]">
        <section className="bg-[--bgColor4] border border-[#FFFFFF1A] rounded-2xl">
          <div className="p-4 border-b border-b-[#FFFFFF1A] text-center">
            <h2 className="font-extrabold text-3xl">Danh sách scammer</h2>
            {initialSearchQuery ? (
              <p className="mt-2 text-[--subTextColor]">
                Kết quả tìm kiếm cho: "{initialSearchQuery}"
              </p>
            ) : (
              <p className="mt-2 text-[--subTextColor]">
                CÓ {scammerList.length} CẢNH BÁO
              </p>
            )}
          </div>
          <div>
            {danhSachScammerDaLoc.length > 0 ? (
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
                  {danhSachScammerDaLoc.map((scammer, index) => (
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
                          {dateFormat(new Date(scammer.date))}
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
        {modalDetail && selectedScammer && (
          <ModalDetail
            modalDetail={modalDetail}
            handleShowModalDetail={handleShowModalDetail}
            scammer={selectedScammer}
          />
        )}
      </div>
    </div>
  );
};

export default Scammer;
