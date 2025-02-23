interface Scamerprops {
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
  handleShowModalDetail: () => void;
}

const Scammer: React.FC<Scamerprops> = ({
  scammerList,
  handleShowModalDetail,
}) => {
  return (
    <div>
      <form className="max-w-[500px] p-[5px] w-full rounded-2xl bg-[var(--bgColor3)] border-[#FFFFFF1A] border mt-[60px] flex items-center mx-auto">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none pl-[19px] pr-6 text-[var(--textcolor)]"
          placeholder="Kiểm tra số tài khoản ngân hàng..."
        />
        <button type="submit" className="btn flex-shrink-0">
          Tìm kiếm
        </button>
      </form>

      <div className="max-w-[1100px] w-full  mx-auto mt-[60px] pb-[100px]">
        <section className="rounded-2xl bg-[--bgColor4] border border-[#FFFFFF1A]">
          <div className="p-4 border-b border-b-[#FFFFFF1A] text-center">
            <h2 className="text-3xl font-extrabold">Danh sách scammer</h2>
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
      </div>
    </div>
  );
};

export default Scammer;
