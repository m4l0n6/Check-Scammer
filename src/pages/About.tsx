function About() {
  return (
    <div className="mx-36 mt-16">
      <h1 className="bg-clip-text bg-gradient-to-tl from-[#D9C4AF] to-[#FFFFFF] font-extrabold text-[32px] text-center">
        Ý tưởng web
      </h1>
      <div className="mt-4">
        <h2 className="text-[var(--textcolor)]">Phân tích:</h2>
        <p className="text-[var(--subTextColor)]">
          Thuật toán Facebook luôn hạn chế việc tìm kiếm những thông tin, dữ
          liệu kiểu STK ngân hàng, Số CMT, SĐT…. <br></br>Bạn sẽ không thể tìm
          thấy kết quả gì khi search những từ khóa liên quan đến thông tin cá
          nhân trên Fb, trừ khi bạn là thành viên trong Gr có bài tố cáo đó,
          hoặc có một chút gì đó liên quan đến STK đã bị tố cáo đó . thì bạn mới
          có thể nhìn thấy bài bài phốt <br></br> Cho dù bạn có phốt, tố cáo một
          ai đó lên các Group trên FB thì 1, 2 ngày sau <br></br> Admin thường
          sẽ xóa bài đó của bạn, vì nội dung vi phạm chính sách, gây ảnh hưởng
          đến Group của họ. hoặc nếu admin không gỡ, thì kẻ lừa đảo bạn chỉ cần
          dùng một vài tut, trick fb là có thể khiến bài của bạn bị Facebook báo
          vi phạm vè gỡ ngay sau đó.
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-[var(--textcolor)]">Mục đich:</h2>
        <p className="text-[var(--subTextColor)]">
          Tạo ra một Website lưu trữ dữ liệu lừa đảo trên mxh mà không chịu bất
          kỳ hạn chế seach của một thuật toán nào trên Facebook <br></br> Là nơi
          bạn có thể tố cáo kẻ lừa đảo, và phát tán thông tin kẻ lừa đảo đó lên
          Google, Facebook giúp người dùng có thể tìm kiếm 1 cách dễ dàng những
          thông tin lừa đảo <br></br> Là nơi giới thiệu cho bạn biết những người
          chuyên làm dịch vụ trên mxh, link Fb chuẩn, thông tin chuẩn của một
          người làm dv nào đó. <br></br> Là nơi lưu trữ bằng chứng lừa đảo, cung
          cấp góp phần nào thúc đẩy quá trình thu thập dữ liệu phục vụ cho công
          tác điều tra của “Cục An ninh mạng và phòng, chống tội phạm sử dụng
          công nghệ cao”
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-[var(--textcolor)]">Hệ Thống Gồm 4 Mục:</h2>
        <p className="text-[var(--subTextColor)]">
          Mục 1: Ô tìm kiếm “STK Ngân Hàng, SĐT, Tên...” kiểm tra dữ liệu Scam
          <br />
          Mục 2: Nút “Gửi đơn tố cáo” những kẻScam <br /> Mục 3: Danh sách
          những “Tài khoản Scam cập nhật mới nhất” trong ngày <br /> Mục 4: “Chi
          tiết thông tin Scam” bao gồm: Chủ tài khoản, STK ngân hàng, Bằng
          chứng, TT người tố cáo, Link nguồn phốt
        </p>
      </div>
    </div>
  );
}

export default About;
