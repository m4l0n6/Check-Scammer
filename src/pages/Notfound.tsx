import { Link } from "react-router";

const Notfound = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[var(--bgColor4)] min-h-screen text-center">
      <h1 className="mb-4 font-bold text-red-500 text-6xl">404</h1>
      <h2 className="mb-4 text-3xl">Không Tìm Thấy Trang</h2>
      <p className="mb-6 text-gray-600">
        Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition"
      >
        Quay Về Trang Chủ
      </Link>
    </div>
  );
};

export default Notfound;
