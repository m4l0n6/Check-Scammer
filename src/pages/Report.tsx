import { Link } from "react-router";
import React, { useState } from "react";
import { validationSchema } from "../validation/validation";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

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
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const apiKey = "b1726c7f9f4bdfee51cae420c40e33ca";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const urlsArray = await Promise.all(
        filesArray.map((file) => uploadImgBB(file))
      );
      setImages((prev) => [...prev, ...urlsArray]);
      setUser((prevUser) => ({
        ...prevUser,
        images: [...prevUser.images, ...filesArray],
      }));
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

  const onsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validationSchema.safeParse(user);
    const userWithImageUrls = {
      ...user,
      images: images,
    };
    try {
      axios.post(
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
      });
      setImages([]);
      setErrors({});
      notify();
    } catch (error) {
      const newErrors: Record<string, string> = {};
      if (!result.success) {
        result.error.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      }
      console.log(error);
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
      console.log(err);
    }
  };

  const notify = () => toast.success("Tố cáo thành công!");

  return (
    <>
      <ToastContainer />
      {/* BREADCRUMB */}
      <section className="flex mt-4 items-center gap-2 mx-[6%]">
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
      <form className="max-w-[830px] mx-auto mt-1 pb-20" onSubmit={onsSubmit}>
        <h2 className="text-3xl font-extrabold text-center mb-4">
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

        <div className="form__group mb-6 relative">
          <textarea
            name="content"
            id="content"
            className="form__input resize-none h-16 overflow-hidden"
            placeholder="Nhập nội dung tố cáo ..."
            onChange={handleChange}
            value={user.content}
          ></textarea>
          {errors.content && (
            <p className="error absolute top-[10px] right-3">
              {errors.content}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-[40px]">
          {images.map((image, index) => (
            <div key={index} className="preview__img relative">
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
          <div className="w-32 h-[114px] rounded-lg bg-[--bgColor3] relative">
            <label
              htmlFor="images"
              className="cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-2"
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
              <img src="../src/assets/svg/image.svg" alt="" />
              <span className="text-sm text-[#94A3B8]">Chọn ảnh</span>
            </label>
            {errors.images && (
              <p className="error top-full absolute">{errors.images}</p>
            )}
          </div>
        </div>
        {/* end SCAMMER INFO */}

        {/* USER INFO */}
        <div>
          <h2 className="text-3xl font-extrabold text-center mb-4">
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
          <button type="submit" className="btn mx-auto block mt-10">
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
