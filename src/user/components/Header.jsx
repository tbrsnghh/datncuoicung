import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/Thucdon" || location.pathname == "/sanhtiec") {
        const pageHeight = document.documentElement.scrollHeight; 
        const scrollThreshold = pageHeight * 0.1; 
        setIsScrolled(window.scrollY > scrollThreshold);
      } else {
        setIsScrolled(window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const isHomeOrThucdon = ["/", "/Thucdon", "/sanhtiec"].includes(location.pathname);

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-center py-3 px-5 transition-all duration-300 z-[1001] ${
      isScrolled || !isHomeOrThucdon ? "bg-[#70695e] shadow-lg shadow-[rgba(150,133,126,0.77)]" : "bg-transparent"
    }`}>
      {/* Logo */}
      <Link to="/" className="mr-10">
        <img src="/image.png" alt="Nhà Hàng Tiệc Cưới Đông Á" className="h-[50px] rounded-lg" />
      </Link>

      {/* Menu */}
      <ul className="flex list-none gap-12 p-0">
        {[
          { to: "/", text: "TRANG CHỦ" },
          { to: "/sanhtiec", text: "SẢNH TIỆC" },
          { to: "/Thucdon", text: "THỰC ĐƠN" },
          { to: "/thiepcuoi", text: "TẠO THIỆP CƯỚI" },
          { to: "/booking", text: "ĐẶT LỊCH" },
          { to: "/Lienhe", text: "LIÊN HỆ" },
          {to:"/login",text:"ĐĂNG NHẬP"},
        ].map(({ to, text }) => (
          <li key={to}>
            <Link 
              to={to} 
              className="playfair-display relative text-white text-lg font-bold transition duration-300 ease-in-out shadow-lg hover:scale-110 hover:text-[#FFE6C9] hover:shadow-[#FCC6FF]"
              
            >
              {text}
              {/* Hiệu ứng gạch dưới khi hover */}
              <span className="absolute left-0 bottom-0 w-0 h-[4px] bg-white transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
