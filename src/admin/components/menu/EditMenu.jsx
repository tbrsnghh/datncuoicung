import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchDishes } from "../../../redux/dishSlice";
import { updateMenu } from "../../../redux/menuSlice";

export default function EditMenuManage({ menu, handleClose }) {
  const dispatch = useDispatch();
  const allDishes = useSelector((state) => state.dish.dish);

  // Khởi tạo selectedDishes từ menu.Dishes
  const [selectedDishes, setSelectedDishes] = useState(() => {
    const initialDishes = {};
    menu.Dishes.forEach(dish => {
      initialDishes[dish.id] = dish.quantity || 1; // Nếu không có quantity thì mặc định là 1
    });
    return initialDishes;
  });

  const [menuData, setMenuData] = useState({
    name: menu.name,
    description: menu.description
  });

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDishQuantity = (dishId, action) => {
    setSelectedDishes(prev => {
      const newDishes = { ...prev };
      
      if (action === 'increase') {
        newDishes[dishId] = (newDishes[dishId] || 0) + 1;
      } else if (action === 'decrease') {
        if (newDishes[dishId] > 1) {
          newDishes[dishId] -= 1;
        } else {
          delete newDishes[dishId];
        }
      }
      
      return newDishes;
    });
  };

  const calculateTotalPrice = () => {
    return Object.entries(selectedDishes).reduce((sum, [dishId, quantity]) => {
      const dish = allDishes.find(d => d.id === +dishId);
      return sum + (dish?.price || 0) * quantity;
    }, 0);
  };

  const handleUpdateMenu = async () => {
    if (!menuData.name.trim()) {
      Swal.fire("Lỗi!", "Tên menu không được để trống.", "error");
      return;
    }

    try {
      await dispatch(updateMenu({
        id: menu.id,
        name: menuData.name,
        description: menuData.description,
        dishes: Object.entries(selectedDishes).map(([id, quantity]) => ({
          id,
          quantity
        }))
      })).unwrap();

      Swal.fire("Thành công!", "Menu đã được cập nhật.", "success");
      handleClose();
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5">
        <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Chỉnh sửa thực đơn
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-100 p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Thông tin menu</h2>
            <input
              type="text"
              name="name"
              placeholder="Tên menu"
              value={menuData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="description"
              placeholder="Mô tả menu"
              value={menuData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-2"
              rows="3"
            />

            <h3 className="mt-3 font-semibold">Món ăn trong menu:</h3>
            <ul className="mt-1 space-y-1">
              {Object.entries(selectedDishes).map(([id, quantity]) => {
                const dish = allDishes.find(d => d.id === +id);
                return (
                  <li key={id} className="bg-white p-2 rounded shadow-sm flex justify-between items-center border">
                    <span>{dish?.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => handleDishQuantity(id, 'decrease')}
                      >
                        ➖
                      </button>
                      <span className="text-sm">{quantity}</span>
                      <button
                        className="text-xs bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => handleDishQuantity(id, 'increase')}
                      >
                        ➕
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-4 font-semibold text-right text-lg">
              Tổng tiền: <span className="text-green-600">{calculateTotalPrice().toLocaleString()} VNĐ</span>
            </h3>
          </div>

          <div className="bg-gray-100 p-5 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">Danh sách món ăn</h2>
            <ul className="space-y-2">
              {allDishes?.map((dish) => (
                <li
                  key={dish.id}
                  className={`bg-white p-2 rounded shadow-sm cursor-pointer hover:bg-gray-200 transition ${
                    selectedDishes[dish.id] ? "bg-green-200" : ""
                  }`}
                  onClick={() => handleDishQuantity(dish.id, 'increase')}
                >
                  {dish.name} - <span className="text-gray-600">{dish.price.toLocaleString()} VNĐ</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            onClick={handleClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleUpdateMenu}
          >
            Cập nhật menu
          </button>
        </div>
      </div>
    </div>
  );
}
