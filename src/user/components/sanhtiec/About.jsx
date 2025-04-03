import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Banner from "./Banner";


const halls = {
  "Paradise Hall": {
    images: ["/images/4.png", "/images/5.png", "/images/15.png", "/images/16.png"],
    description: "Biểu trưng cho sự hoàn hảo, nơi diễn ra một đám cưới đẹp như thiên đường.",
    features: ["Sức chứa 500 – 700 khách", "Tiệc cưới, tiệc gala, hội nghị công ty, quy mô lớn", "Kiến trúc hoàng gia châu Âu, lộng lẫy với đèn chùm pha lê và bàn tiệc cao cấp"],
  },
  "Bliss Hall": {
    images: ["/images/8.png", "/images/12.png", "/images/18.png", "/images/17.png"],
    description: "Mang đến sự ấm áp và hạnh phúc trọn vẹn cho ngày trọng đại.",
    features: ["Sức chứa 300 – 450 khách", "Tiệc cưới ấm cúng, vừa phải Không gian rộng rãi", "Trang trí với tone màu pastel nhẹ nhàng, hoa tươi lãng mạn, không gian gần gũi và ấm cúng."],
  },
  "SPearl Hall": {
    images: ["/images/3.png", "/images/14.png", "/images/9.png", "/images/10.png"],
    description: "Thể hiện sự quý giá, sang trọng như viên ngọc sáng giữa lòng thành phố.",
    features: ["Sức chứa 200 – 300 khách", "Phong cách ấm cúng", "Thiết kế trang nhã với tone trắng – vàng, bàn tiệc đơn giản nhưng tinh tế, phù hợp phong cách hiện đại hoặc truyền thống."],
  },
  "Sunrise Hall": {
    images: ["/images/6.png", "/images/7.png", "/images/11.png", "/images/13.png"],
    description: "Biểu tượng cho khởi đầu mới, tương lai rực rỡ và hạnh phúc dài lâu.",
    features: ["Sức chứa 100 – 150 khách", "Tiệc cưới nhỏ, tiệc báo hỷ", "Không gian mở với ánh sáng tự nhiên, tone màu tươi sáng, phù hợp với phong cách trẻ trung, hiện đại."],
  },
};

const About = () => {
  const [currentHall, setCurrentHall] = useState(halls["Paradise Hall"]);

  const handleHallClick = (hallName) => {
    setCurrentHall(halls[hallName]);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    prevArrow: <FaArrowLeft className="absolute left-5 text-white text-2xl cursor-pointer" />,
    nextArrow: <FaArrowRight className="absolute right-5 text-white text-2xl cursor-pointer" />,
  };

  return (
    <div className="bg-gray-50 pb-12">
      <Banner />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-800 text-center mt-8 mb-4 relative">
          SẢNH TIỆC TẠI NHÀ HÀNG ĐÔNG Á
          <span className="absolute left-1/2 bottom-0 w-48 h-0.5 bg-gray-800 transform -translate-x-1/2"></span>
        </h1>
        <p className="text-base text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Lấy cảm hứng từ vẻ đẹp vĩnh cửu của các viên ngọc quý, các sảnh tiệc tại Nhà hàng Đông Á được thiết kế với sự tinh tế, mang đến không gian hoàn hảo cho những khoảnh khắc đáng nhớ.
        </p>

        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {Object.keys(halls).map((hall) => (
            <button
              key={hall}
              onClick={() => handleHallClick(hall)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentHall === halls[hall]
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-blue-400 hover:bg-blue-50"
              }`}
            >
              {hall}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <Slider {...sliderSettings}>
            {currentHall.images.map((img, idx) => (
              <div key={idx} className="w-full h-[300px] overflow-hidden">
                <img 
                  src={img} 
                  alt={`Hall ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>

          <div className="p-6">
            <p className="text-gray-700 text-base italic mb-4">
              {currentHall.description}
            </p>
            <div className="space-y-2">
              {currentHall.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
