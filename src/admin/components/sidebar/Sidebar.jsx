import React, { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  PlusCircleIcon,
  MenuIcon,
  OfficeBuildingIcon,
  CakeIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

// Danh sách menu
const menuItems = [
  { name: "Tổng quan", path: "/admin/home", icon: HomeIcon },
  { name: "Tiệc đã đặt", path: "/admin/booking", icon: CheckIcon },
  { name: "Khách hàng", path: "/admin/users", icon: UsersIcon },
  { name: "Sảnh tiệc", path: "/admin/halls", icon: OfficeBuildingIcon },
  { name: "Thực đơn", path: "/admin/menu", icon: MenuIcon },
  { name: "Món ăn", path: "/admin/dishes", icon: CakeIcon },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="relative flex min-h-full bg-[#f9c5d1]"
      onMouseEnter={() => !isPinned && setIsOpen(true)}
      onMouseLeave={() => !isPinned && setIsOpen(false)}
    >
      {/* Nút ghim sidebar */}
      <button
        className={`w-10 h-10 border border-black rounded-lg fixed top-2 left-2 z-50 
        ${isPinned ? "bg-yellow-500 text-white scale-110" : "bg-white text-black scale-100"}`}
        onClick={() => setIsPinned(!isPinned)}
        title="Ghim Sidebar"
      >
        📌
      </button>

      {/* Sidebar */}
      <aside
        className={`border-r border-[#f5c518] min-h-screen px-7 pt-20  bg-gray-900 text-white
        ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        <nav className={`space-y-4 ${isOpen ? "block" : "hidden"}`}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center space-x-3 py-3 px-4 rounded-lg transition
                ${isActive ? "bg-yellow-500 font-semibold" : "hover:bg-gray-700"}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          

          {/* Nút Đăng xuất */}
          <button
            onClick={handleLogout}
            className="relative flex items-center space-x-3 py-3 px-4 rounded-lg transition bg-red-600 hover:bg-red-700 text-white"
          >
            <span>Đăng xuất</span>
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
