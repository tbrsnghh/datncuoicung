import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Header from "../Header";
import Footer from "../Footer";
const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        alert("Thông tin đã được gửi! Chúng tôi sẽ liên hệ với bạn sớm.");
        reset();
    };

    return (
        <div className="mt-[60px] py-[50px] bg-[#f9f9f9] font-roboto">
            <Header />
            <div className="max-w-[1000px] mx-auto flex gap-8 flex-wrap justify-center mb-15">
                {/* Form Liên Hệ */}
                <motion.div
                    className="flex-1 max-w-[400px] bg-white p-6 rounded-lg shadow-md"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-xl text-[#d4a017] mb-2 text-center">LIÊN HỆ VỚI CHÚNG TÔI</h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Vui lòng điền thông tin để nhận tư vấn từ nhà hàng tiệc cưới của chúng tôi.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName" className="text-sm font-bold text-gray-700">Họ và Tên *</label>
                            <input
                                type="text"
                                id="fullName"
                                {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
                                className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-bold text-gray-700">Email *</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Vui lòng nhập email",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                                className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="text-sm font-bold text-gray-700">Số Điện Thoại *</label>
                            <input
                                type="tel"
                                id="phone"
                                {...register("phone", {
                                    required: "Vui lòng nhập số điện thoại",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Số điện thoại phải gồm 10 chữ số",
                                    },
                                })}
                                className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="eventDate" className="text-sm font-bold text-gray-700">Ngày Tổ Chức *</label>
                            <input
                                type="date"
                                id="eventDate"
                                {...register("eventDate", { required: "Vui lòng chọn ngày" })}
                                className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                            {errors.eventDate && <span className="text-red-500 text-xs">{errors.eventDate.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="message" className="text-sm font-bold text-gray-700">Lời Nhắn *</label>
                            <textarea
                                id="message"
                                {...register("message", { required: "Vui lòng nhập lời nhắn" })}
                                className="p-2 border border-gray-300 rounded-md text-sm resize-none"
                                rows="3"
                                placeholder="Nhập yêu cầu hoặc thông tin thêm..."
                            />
                            {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
                        </div>

                        <motion.button
                            type="submit"
                            className="py-2 px-4 bg-[#d4a017] text-white border-none rounded-md text-sm cursor-pointer hover:bg-[#b8860b] transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            GỬI THÔNG TIN
                        </motion.button>
                    </form>
                </motion.div>

                {/* Bản Đồ */}
                <motion.div
                    className="flex-1 max-w-[400px] bg-white p-6 rounded-lg shadow-md"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-xl text-[#d4a017] mb-2 text-center">VỊ TRÍ CỦA CHÚNG TÔI</h2>
                    <p className="text-sm text-gray-600 mb-4 text-center">
                        Tham quan bản đồ để tìm đường đến nhà hàng tiệc cưới của chúng tôi.
                    </p>
                    <div className="overflow-hidden rounded-lg" onClick={() => window.open("https://maps.app.goo.gl/BLh78PVrv4fk7pvh8", "_blank")}>
                        <img
                            src="public/images/map.png"
                            alt="Map of Wedding Venue"
                            className="w-full h-auto transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;