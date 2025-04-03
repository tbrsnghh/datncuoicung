import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 text-center">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-around">
        {/* Cột 1: Thông tin liên hệ */}
        <div className="w-full sm:w-1/3 px-4 mb-6">
          <h3 className="text-yellow-400 text-xl font-semibold uppercase mb-4">Liên Hệ</h3>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <i className="fa-solid fa-map-marker-alt text-yellow-400"></i>
            123 Đường ABC, Quận XYZ, TP.HCM
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <i className="fa-solid fa-phone text-yellow-400"></i>
            0901 234 567
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-300">
            <i className="fa-solid fa-envelope text-yellow-400"></i>
            contact@nhahangtieccuoi.com
          </p>
        </div>

        {/* Cột 2: Giới thiệu */}
        <div className="w-full sm:w-1/3 px-4 mb-6">
          <h3 className="text-yellow-400 text-xl font-semibold uppercase mb-4">Về Chúng Tôi</h3>
          <p className="text-gray-300">
            Nhà hàng tiệc cưới sang trọng, đẳng cấp với không gian lộng lẫy và dịch vụ chuyên nghiệp.
          </p>
        </div>

        {/* Cột 3: Kết nối mạng xã hội */}
        <div className="w-full sm:w-1/3 px-4 mb-6">
          <h3 className="text-yellow-400 text-xl font-semibold uppercase mb-4">Kết Nối Với Chúng Tôi</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook text-yellow-400 text-2xl transition-transform transform hover:scale-110 hover:text-white"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram text-yellow-400 text-2xl transition-transform transform hover:scale-110 hover:text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4">
        <p className="text-gray-400 text-sm">&copy; 2025 Nhà Hàng Tiệc Cưới. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
