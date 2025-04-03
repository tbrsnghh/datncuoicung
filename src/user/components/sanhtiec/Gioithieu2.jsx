import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const features = [
  { number: "01", title: "4 Sảnh tiệc với không gian thoáng", description: "Trần cao, không có cột trụ ở giữa sảnh, giúp tất cả khách mời đều nhìn rõ sân khấu." },
  { number: "02", title: "Địa điểm tổ chức tiệc cưới", description: "Phù hợp từ 100 đến 600 khách mời trong cùng một không gian." },
  { number: "03", title: "1.000 m² bãi giữ xe", description: "Bãi giữ xe ô tô và xe máy rộng rãi, giúp khách mời an tâm dự tiệc." },
  { number: "04", title: "Menu đa dạng", description: "Đầu bếp của chúng tôi là những đầu bếp nổi tiếng xếp hạng 5 sao đem lại cho quý khách hàng những trải nghiệm món ăn tuyệt vời nhất." },
];
const images = [
  "test1.png", "test2.png", "test3.png", "test5.png",
  "test9.png", "test14.png", "19.png", "20.png",
  "21.png", "22.png", "23.png", "24.png", "25.png"
];


const Gioithieu2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative w-full">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/images/videonen.mp4" type="video/mp4" />
      </video>

      {/* Features section */}
      <div className="px-10 py-20 bg-black/50 text-white text-center">
        <h2 className="text-4xl font-bold uppercase">ĐIỀU ĐẶC BIỆT TẠI SẢNH TIỆC CƯỚI ĐÔNG Á</h2>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="max-w-xs text-left opacity-0"
              data-aos="fade-up"
              data-aos-delay={index * 300}
              data-aos-once="false"
            >
              <h3 className="text-3xl text-red-400 font-bold">{feature.number}</h3>
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery section */}
      <div className="py-16 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 uppercase text-center mb-10">
          MỘT SỐ HÌNH ẢNH ĐÁM CƯỚI TỪ NHÀ HÀNG CHÚNG TÔI
        </h1>

        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 }
          }}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full max-w-[95%] mx-auto bg-gradient-to-r from-gray-100 via-white to-gray-100 p-8 rounded-xl shadow-lg"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="p-2 bg-white rounded-xl shadow-md">
                <img
                  src={`/images/${image}`}
                  alt={`Hình cưới ${index + 1}`}
                  className="w-full h-[300px] object-cover rounded-lg shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Gioithieu2;
