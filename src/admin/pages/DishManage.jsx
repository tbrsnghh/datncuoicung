import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../../redux/dishSlice";
import SubHeader from "../components/sub-header/SubHeader";
import DishItem from "../components/menu/DishItem";
import DishAddModal from "../components/menu/DishAddModal";
import Search from "../components/search/Search";

export default function DishManage() {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.dish);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(dishes);
  }, [dishes]);

  const refreshDishes = () => {
    dispatch(fetchDishes());
  };

  const sub = [
    { name: "Thêm mới", action: () => setIsAddModalOpen(true) },
  ];

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(dishes);
    } else {
      const filtered = dishes.filter(dish => 
        dish.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="w-full p-6 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Quản lý món ăn
      </h1>

      <div className="mb-4 flex">
        <SubHeader subheader={sub} />
        <Search 
          placeholder="Tìm kiếm món ăn"
          onSearch={handleSearch} 
        />
      </div>

      <ul className="space-y-2">
        {searchResults.map((dish) => (
          <DishItem key={dish.id} dish={dish} />
        ))}
      </ul>

      {/* Modal Thêm Món Ăn */}
      {isAddModalOpen && <DishAddModal onClose={() => {setIsAddModalOpen(false); refreshDishes();}} refreshDishes={refreshDishes}/>}
    </div>
  );
}
