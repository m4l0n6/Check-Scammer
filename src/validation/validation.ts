import { z } from "zod";

export const validationSchema = z.object({
    scammer__name: z.string().min(6, { message: "Nhập tối thiểu 6 ký tự" }).nonempty({ message: "Nhập tên tài khoản" }),
    scammer_phone: z.string().min(10, { message: "Nhập tối thiêu 10 ký tự" }).nonempty({ message: "Nhập số điện thoại" }),
    bank__number: z.string().min(10, { message: "Nhập tối thiểu10 ký tự" }).nonempty({ message: "Nhập số tài khoản" }),
    bank__name: z.string().min(3, { message: "Nhập tối thiểu 3 ký tự" }).nonempty({ message: "Nhập ên ngân hàng" }),
    content: z.string().min(20, { message: "Nhập tối thiểu 20 ký tự" }).nonempty({ message: "Nhập nội dung" }),
    user__name: z.string().min(6, { message: "Nhập tối thiểu 6 ký tự" }).nonempty({ message: "Nhập họ và tên" }),
    user__phone: z.string().min(10, { message: "Nhập tối thiêu 10 ký tự" }).nonempty({ message: "Nhập số điện thoại" }),
    user__type: z.enum(["Tôi là nạn nhân", "Tôi chỉ đăng hộ"]),
    images: z
  .custom<File[]>((files) => files.length > 0, { message: "Chọn ít nhất 1 ảnh" })
  .refine((files) => files.every((file) => file.type.startsWith("image/")), { message: "Chỉ chấp nhận file ảnh" }),

});