import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Phanhoi from "./Phanhoi";
import Footer from "./Footer";

const services = [
  {
    title: "Sảnh tiệc",
    description:
      "Được thiết kế đa dạng phong cách, mang đến không gian sang trọng, hiện đại...",
    image: "/images/test10.png",
    link: "/Gioithieu",
  },
  {
    title: "Thực đơn",
    description:
      "Thực đơn tiệc cưới tại Đông Á là sự kết hợp của tinh hoa ẩm thực Á Âu...",
    image: "/images/banner4.png",
    link: "/Thucdon",
  },
  {
    title: "Ưu đãi",
    description: "Những ưu đãi cho tiệc cưới trọn gói cực kỳ hấp dẫn...",
    image: "/images/test9.png",
    link: "/khuyenmai",
  },
];

const Home2 = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold text-[#b8860b] uppercase tracking-wide mb-10">
        Dịch Vụ
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="rounded-lg shadow-lg bg-white overflow-hidden transform transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Hình ảnh dịch vụ */}
            <div className="w-full overflow-hidden">
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full h-72 object-cover"
                whileHover={{ scale: 1.08 }}
              />
            </div>

            {/* Nội dung */}
            <div className="p-6 text-left">
              <h2 className="text-2xl font-bold text-[#055160] uppercase mb-4">
                {service.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Nút Xem Thêm */}
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to={service.link}
                  className="inline-block bg-[#5C7285] text-white px-6 py-3 rounded-md font-bold uppercase text-sm tracking-wide transition-all duration-200 hover:bg-[#818C78] hover:-translate-y-1 active:scale-95"
                >
                  Xem Thêm
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Phản hồi khách hàng */}
      <Phanhoi />

    </div>
  );
};

export default Home2;
//             </