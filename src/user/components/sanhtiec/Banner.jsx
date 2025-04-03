import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const bannerImages = [
    "/images/bannermenu2.png",
    "/images/bannermenu1.png",
    "/images/bannermenu3.png",
  ];

  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/khuyenmai");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings} className="w-full overflow-hidden">
        {bannerImages.map((img, index) => (
          <div key={index} className="w-full">
            <div
              className="h-[80vh] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center text-center relative text-white cursor-pointer transition-all duration-500 hover:scale-105"
              style={{ backgroundImage: `url(${img})` }}
              onClick={handleBannerClick}
            >
              {/* Hiệu ứng overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

              {/* Nội dung Banner */}
              <div 
                className="relative p-10 bg-black/40 backdrop-blur-sm rounded-xl max-w-[70%] shadow-2xl transform hover:scale-105 transition-transform duration-300"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
                data-aos-once="true"
              >
                <h2 
                  className="text-4xl font-bold mb-4 tracking-wider"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="400"
                >
                  Khám Phá Ưu Đãi Đặc Biệt
                </h2>
                <p 
                  className="text-xl font-light tracking-wide hover:text-yellow-300 transition-colors"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                >
                  Xem Ngay →
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
