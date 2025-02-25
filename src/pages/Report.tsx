import { Link } from "react-router";
import React, { useState } from "react";
import { validationSchema } from "../validation/validation";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Loading";

type Validate = z.infer<typeof validationSchema>;

function Report() {
  const [images, setImages] = useState<string[]>([]);
  const [user, setUser] = useState<Validate>({
    scammer__name: "",
    scammer_phone: "",
    bank__number: "",
    bank__name: "",
    content: "",
    user__name: "",
    user__phone: "",
    user__type: "Tôi là nạn nhân",
    images: [] as File[],
    date: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const apiKey = "b1726c7f9f4bdfee51cae420c40e33ca";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      const filesArray = Array.from(e.target.files);
      const urlsArray = await Promise.all(
        filesArray.map((file) => uploadImgBB(file))
      );
      const validUrls = urlsArray.filter((url) => url !== null);
      setImages((prev) => [...prev, ...validUrls]);
      setUser((prevUser) => ({
        ...prevUser,
        images: [...prevUser.images, ...filesArray],
      }));
      setLoading(false);
      setIsUpload(validUrls.length > 0);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newFileImages = user.images.filter((_, i) => i !== index);
    setImages(newImages);
    setUser((prevUser) => ({
      ...prevUser,
      images: newFileImages,
    }));
    if (newImages.length === 0) {
      setIsUpload(false);
      const fileInput = document.getElementById("images") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpload(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validationSchema.safeParse(user);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }
    const userWithImageUrls = {
      ...user,
      images: images,
      date: new Date().toISOString(),
    };
    try {
      await axios.post(
        "https://67a8bcd26e9548e44fc1e141.mockapi.io/scammers",
        userWithImageUrls
      );
      setUser({
        scammer__name: "",
        scammer_phone: "",
        bank__number: "",
        bank__name: "",
        content: "",
        user__name: "",
        user__phone: "",
        user__type: "Tôi là nạn nhân",
        images: [] as File[],
        date: "",
      });
      setImages([]);
      setErrors({});
      toast.success("Tố cáo thành công!");
    } catch (error) {
      toast.error(`Lỗi: ${error}`);
    }
  };

  const uploadImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return res.data.data.display_url;
    } catch (err) {
      toast.error(`Lỗi: ${err}`);
      return null;
    }
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <>
      <ToastContainer />
      {/* BREADCRUMB */}
      <section className="flex items-center gap-2 mx-[6%] mt-4">
        <Link to="/" className="breadcrumb__link">
          Trang chủ
        </Link>
        <img src="../src/assets/svg/Vector.svg" alt="" />
        <Link to="/report" className="breadcrumb__link active">
          Tố cáo
        </Link>
      </section>
      {/* end BREADCRUMB */}

      {/* FORM REPORT */}
      <form
        className="mx-auto mt-1 pb-20 max-w-[830px]"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 font-extrabold text-3xl text-center">
          Thông tin kẻ lừa đảo
        </h2>
        {/* SCAMMER INFO */}
        <div className="form__group-wrap">
          <div className="form__group">
            <div className="form__group-heading">
              <label htmlFor="scammer__name" className="form__title">
                Tên tài khoản <span>*</span>
              </label>
              {errors.scammer__name && (
                <p className="error">{errors.scammer__name}</p>
              )}
            </div>
            <input
              type="text"
              id="scammer__name"
              name="scammer__name"
              className="form__input"
              placeholder="Nhập tên chủ tài khoản ..."
              value={user.scammer__name}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <div className="form__group-heading">
              <label htmlFor="scammer_phone" className="form__title">
                Số điên thoại <span>*</span>
              </label>
              {errors.scammer_phone && (
                <p className="error">{errors.scammer_phone}</p>
              )}
            </div>
            <input
              type="text"
              id="scammer_phone"
              name="scammer_phone"
              className="form__input"
              placeholder="Nhập số điện thoại ..."
              value={user.scammer_phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group-wrap">
          <div className="form__group">
            <div className="form__group-heading">
              <label htmlFor="bank__number" className="form__title">
                Số tài khoản <span>*</span>
              </label>
              {errors.bank__number && (
                <p className="error">{errors.bank__number}</p>
              )}
            </div>
            <input
              type="text"
              id="bank__number"
              name="bank__number"
              className="form__input"
              placeholder="Nhập số tài khoản ..."
              value={user.bank__number}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <div className="form__group-heading">
              <label htmlFor="bank__name" className="form__title">
                Ngân hàng <span>*</span>
              </label>
              {errors.bank__name && (
                <p className="error">{errors.bank__name}</p>
              )}
            </div>
            <input
              type="text"
              id="bank__name"
              name="bank__name"
              className="form__input"
              placeholder="Nhập tên ngân hàng ..."
              value={user.bank__name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form__group relative mb-6">
          <div className="form__group-heading">
            <label htmlFor="bank__name" className="form__title">
              Nội dung tối cáo <span>*</span>
            </label>
          </div>
          <textarea
            name="content"
            id="content"
            className="h-16 overflow-hidden resize-none form__input"
            placeholder="Nhập nội dung tố cáo ..."
            onChange={handleChange}
            onInput={handleContent}
            value={user.content}
          ></textarea>
          {errors.content && (
            <p className="top-[10px] right-3 absolute error">
              {errors.content}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-[40px]">
          {images.map((image, index) => (
            <div key={index} className="relative preview__img">
              <div
                className="preview__img-close"
                onClick={() => handleRemove(index)}
              >
                <img
                  src="../src/assets/img/close_icon.png"
                  alt=""
                  className=""
                />
              </div>
              <img src={image} alt="" className="img__preview" />
            </div>
          ))}
          <div className="relative bg-[--bgColor3] rounded-lg w-full max-w-32 h-[114px]">
            <label
              htmlFor="images"
              className="top-0 right-0 bottom-0 left-0 absolute flex flex-col justify-center items-center gap-2 cursor-pointer"
            >
              <input
                type="file"
                name="images"
                id="images"
                className=""
                accept="image/"
                multiple
                hidden
                onChange={handleFileChanges}
              />
              {isLoading ? (
                <div className="flex justify-center">
                  <Loading
                    width="w-[80px]"
                    border="border-[4px]"
                    height="h-[80px]"
                  />
                </div>
              ) : (
                <>
                  <img src="../src/assets/svg/image.svg" alt="" />
                  <span className="text-[#94A3B8] text-sm">
                    {isUpload ? "Thêm ảnh" : "Chọn ảnh"}
                  </span>
                </>
              )}
            </label>
            {errors.images && (
              <p className="top-full absolute error">{errors.images}</p>
            )}
          </div>
        </div>
        {/* end SCAMMER INFO */}

        {/* USER INFO */}
        <div>
          <h2 className="mb-4 font-extrabold text-3xl text-center">
            Xác thực người tố cáo
          </h2>
          <div className="form__group-wrap">
            <div className="form__group">
              <div className="form__group-heading">
                <label htmlFor="user__name" className="form__title">
                  Họ và tên <span>*</span>
                </label>
                {errors.user__name && (
                  <p className="error">{errors.user__name}</p>
                )}
              </div>
              <input
                type="text"
                id="user__name"
                name="user__name"
                className="form__input"
                placeholder="Nhập họ và tên..."
                value={user.user__name}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <div className="form__group-heading">
                <label htmlFor="user__phone" className="form__title">
                  Liên hệ (Zalo -SĐT)<span>*</span>
                </label>
                {errors.user__phone && (
                  <p className="error">{errors.user__phone}</p>
                )}
              </div>
              <input
                type="text"
                id="user__phone"
                name="user__phone"
                className="form__input"
                placeholder="Nhập số điện thoại..."
                value={user.user__phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="user__type"
                id="option-1"
                value="Tôi là nạn nhân"
                className="radio__btn"
                checked={user.user__type === "Tôi là nạn nhân"}
                onChange={handleChange}
              />
              <label htmlFor="option-1" className="text-[#CCCCCC]">
                Tôi là nạn nhân
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="user__type"
                id="option-2"
                value="Tôi chỉ đăng hộ"
                className="radio__btn"
                checked={user.user__type === "Tôi chỉ đăng hộ"}
                onChange={handleChange}
              />
              <label htmlFor="option-2" className="text-[#CCCCCC]">
                Tôi chỉ đăng hộ
              </label>
            </div>
          </div>
          <button type="submit" className="block mx-auto mt-10 btn">
            Gửi tố cáo
          </button>
        </div>
        {/* end USER INFO */}
      </form>
      {/* end FORM REPORT */}
    </>
  );
}

export default Report;
