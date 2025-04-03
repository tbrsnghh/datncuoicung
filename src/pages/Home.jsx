import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Header from "../user/components/Header";
import HeroSection from "../user/components/HeroSection";
import Home2 from "../user/components/Home2";
import Footer from "../user/components/Footer";
// import Trangchu2 from "./Trangchu2";

// Component ServiceSection để hiển thị từng phần dịch vụ
const ServiceSection = ({ title, description, image, reverse }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center justify-between px-5 md:px-10 lg:px-20 py-16 border-b border-gray-300 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Nội dung bên trái */}
      <motion.div
        className="w-full md:w-1/2 px-4"
        initial={{ x: reverse ? 50 : -50, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-[#B17F59] mb-4">{title}</h2>
        <p className="text-lg text-gray-800 leading-relaxed">{description}</p>
      </motion.div>

      {/* Hình ảnh bên phải */}
      <motion.div
        className="w-full md:w-1/2 px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

const Home = () => {
  const { ref: introRef, inView: introInView } = useInView({ threshold: 0.5 });

  return (
    <div className="bg-[#f8f7f2] overflow-x-hidden">
      <Header />
      <HeroSection/>
      {/* Phần Giới thiệu */}
      <div ref={introRef} className="py-16 px-5 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Nội dung giới thiệu */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            animate={introInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              GIỚI THIỆU CHUNG
            </h1>
            <div className="w-64 h-1 bg-[#dcb46e] mb-6"></div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Trung tâm Hội Nghị - Tiệc Cưới Đông Á là một trong những địa điểm
              sang trọng và đẳng cấp hàng đầu dành cho những cặp đôi mong muốn
              một lễ cưới trọn vẹn hay các doanh nghiệp tìm kiếm không gian hội
              nghị chuyên nghiệp...
            </p>
          </motion.div>

          {/* Hình ảnh giới thiệu */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={introInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src="https://storage.googleapis.com/a1aa/image/xCc252vVQgzfSEW4awsdKRbJBL-LuRhu-ei0VepDOps.jpg"
              alt="Grand Palace building"
              className="w-full h-96 object-cover rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>

      {/* Phần dịch vụ */}
      <div className="px-5 md:px-10 lg:px-20">
        <ServiceSection
          title="TIỆC CƯỚI TRỌN VẸN"
          description="Đội ngũ tổ chức chuyên nghiệp, không gian sang trọng, thực đơn phong phú và đa dạng..."
          image="/images/test5.png"
          reverse={false}
        />
        <ServiceSection
          title="SINH NHẬT & TIỆC THÔI NÔI ĐẦY THÁNG"
          description="Không gian trang trí dễ thương, ý nghĩa với các chủ đề đa dạng..."
          image="/images/test6.png"
          reverse={true}
        />
        <ServiceSection
          title="TIỆC HỘI NGHỊ ĐẲNG CẤP"
          description="Không gian sang trọng, hiện đại, hệ thống âm thanh ánh sáng tối ưu..."
          image="/images/test7.png"
          reverse={false}
        />
        <ServiceSection
          title="TIỆC NGOẠI TRỜI KIỂU TÂY"
          description="Không gian ngoài trời thoáng đãng, phong cách trang trí hiện đại..."
          image="/images/test8.png"
          reverse={true}
        />
      </div>

      {/* Phần Trangchu2 */}
      <Home2 />
      <Footer />
    </div>
  );
};

export default Home;
