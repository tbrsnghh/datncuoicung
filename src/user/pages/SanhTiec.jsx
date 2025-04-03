import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Header from '../components/Header'
import About from "../components/sanhtiec/About";
import Gioithieu2 from "../components/sanhtiec/Gioithieu2";
import Footer from "../components/Footer";

const SanhTiec = () => {
  return (
    <div className="bg-gray-100 pb-10">
      <Header />
      {/* About (Gioithieu) */}
      <About />

      {/* Gioithieu2 */}
      <Gioithieu2 />
      <Footer />
    </div>
  );
};

export default SanhTiec;
