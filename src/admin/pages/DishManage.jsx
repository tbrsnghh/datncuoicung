import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes, fetchDishImages } from "../../redux/dishSlice";
import SubHeader from "../components/sub-header/SubHeader";
import DishItem from "../components/menu/DishItem";
import DishAddModal from "../components/menu/DishAddModal";
import DishDetail from "../components/dish/DishDetail";
import Search from "../components/search/Search";

export default function DishManage() {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.dish.dish);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(dishes);
  }, [dishes]);

  // Tải tất cả hình ảnh khi component được tải lần đầu
  useEffect(() => {
    const loadAllImages = async () => {
      if (dishes && dishes.length > 0) {
        setLoadingImages(true);
        for (const dish of dishes) {
          await dispatch(fetchDishImages(dish.id)).unwrap();
        }
        setLoadingImages(false);
      }
    };
    
    loadAllImages();
  }, [dishes, dispatch]);

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

  const handleDishClick = async (dish) => {
    // Đảm bảo hình ảnh được tải trước khi chọn món ăn
    setLoadingImages(true);
    await dispatch(fetchDishImages(dish.id)).unwrap();
    setLoadingImages(false);
    setSelectedDish(dish);
  };

  return (
    <div className="w-full flex flex-col h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Header cố định */}
      <div className="bg-[#f8f9fa] pt-4 pb-2 px-4 shadow-sm flex-shrink-0">
        <h1 className="text-3xl font-bold text-[#d63384] mb-4 text-center">
          Quản lý món ăn
        </h1>

        <div className="mb-2 flex">
          <SubHeader subheader={sub} />
          <Search 
            placeholder="Tìm kiếm món ăn"
            onSearch={handleSearch} 
          />
        </div>
      </div>

      {/* Nội dung có thể cuộn */}
      <div className="flex flex-1 overflow-hidden space-x-4">
        {/* Danh sách món ăn - có thể cuộn độc lập */}
        <div className="w-full lg:w-1/2 p-4 overflow-y-auto">
          {loadingImages && dishes.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <ul className="space-y-2">
              {searchResults.map((dish) => (
                <DishItem 
                  key={dish.id} 
                  dish={dish} 
                  onClick={() => handleDishClick(dish)}
                  isSelected={selectedDish && selectedDish.id === dish.id}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Chi tiết món ăn - cố định bên phải */}
        <div className="hidden lg:block w-1/2">
          {selectedDish ? (
            <div className="bg-white h-full overflow-hidden shadow-md">
              {loadingImages ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
                </div>
              ) : (
                <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} />
              )}
            </div>
          ) : (
            <div className="bg-white h-full flex items-center justify-center p-8 text-center">
              <div>
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-500 text-lg">Chọn một món ăn từ danh sách để xem chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chi tiết món ăn - Hiển thị overlay trên mobile khi có món được chọn */}
      {selectedDish && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-hidden relative">
            {loadingImages ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              <DishDetail dish={selectedDish} onClose={() => setSelectedDish(null)} />
            )}
          </div>
        </div>
      )}

      {/* Modal Thêm Món Ăn */}
      {isAddModalOpen && <DishAddModal onClose={() => {setIsAddModalOpen(false); refreshDishes();}} refreshDishes={refreshDishes}/>}
    </div>
  );
}
