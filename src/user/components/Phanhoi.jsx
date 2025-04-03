import React from "react";
import { motion } from "framer-motion";

const phanhoi = [
  {
    id: 1,
    name: "Khách Hàng A",
    review: "Dịch vụ rất tốt, nhân viên chu đáo!",
    rating: 5,
    image: "/images/test1.png",
    reply: "Cảm ơn anh A! Mong sớm gặp lại anh. 😊",
  },
  {
    id: 2,
    name: "Khách Hàng B",
    review: "Không gian đẹp, món ăn ngon.",
    rating: 4,
    image: "/images/test2.png",
    reply: "Cảm ơn chị B! Hy vọng chị sẽ quay lại! ❤️",
  },
  {
    id: 3,
    name: "Khách Hàng C",
    review: "Tổ chức sự kiện chuyên nghiệp, rất ưng ý.",
    rating: 5,
    image: "/images/test3.png",
    reply: "Cảm ơn anh C! Hẹn gặp anh lần sau 🎉",
  },
];

const renderStars = (rating) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};

const Phanhoi = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Phản Hồi Khách Hàng</h2>

      <div className="flex flex-col gap-10">
        {phanhoi.map((item) => (
          <div key={item.id} className="space-y-4">
            {/* Bình luận khách hàng */}
            <motion.div
              className="flex items-start bg-gray-100 p-4 rounded-lg max-w-2xl shadow-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                <p className="text-yellow-500 text-lg">{renderStars(item.rating)}</p>
                <p className="text-gray-700">{item.review}</p>
              </div>
            </motion.div>

            {/* Phản hồi từ quản lý */}
            <motion.div
              className="flex items-start bg-blue-100 p-4 rounded-lg max-w-2xl shadow-md ml-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-right flex-1">
                <h4 className="text-lg font-semibold text-blue-700">Nhà Hàng Đông Á</h4>
                <p className="text-gray-800">{item.reply}</p>
              </div>
              <img
                src="/images/2.png"
                alt="Admin"
                className="w-16 h-16 rounded-full object-cover ml-4"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phanhoi;
