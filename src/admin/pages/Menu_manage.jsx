import React, { useEffect, useState } from "react";
import MenuList from "../components/menu/MenuList";
import DishList from "../components/menu/DishList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenus } from "../../redux/menuSlice";
import SubHeader from "../components/sub-header/SubHeader";
import Search from "../components/search/Search";

export default function MenuManage() {
  const menus = useSelector((state) => state.menu.menu);
  const [selectedMenu, setSelectedMenu] = useState(menus ? menus[0] : null);
  const [createMenu, setCreateMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchMenus());
  }, []);

  useEffect(() => {
    setSearchResults(menus);
  }, [menus]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(menus);
    } else {
      const filtered = menus.filter(menu => 
        menu.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const sub = [
    { name: "Tạo mới", link: "/admin/menu/create" },
    { name: "Danh sách", link: "/admin/menu" },
  ]
  return (
    <div className="w-full p-6 bg-[#f8f9fa] h-dvh">
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Quản lý thực đơn
      </h1>

      <div className="mb-4 flex">
        <SubHeader subheader={sub} />
        <Search placeholder="Tìm kiếm thực đơn" onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <MenuList menus={searchResults} openModal={openModal} />
        <DishList selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
      </div>
    </div>
  );
}
