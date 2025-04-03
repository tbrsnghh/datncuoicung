import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDishes } from "../../redux/dishSlice";
import { createMenu } from "../../redux/menuSlice";
import SubHeader from "../components/sub-header/SubHeader";
import Swal from "sweetalert2";

export default function MenuManage() {
  const dispatch = useDispatch();
  const allDishes = useSelector((state) => state.dish.dish);

  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [selectedDishes, setSelectedDishes] = useState({});

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  // Chọn món ăn (mặc định số lượng = 1)
  const handleSelectDish = (dish) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dish.id]: prev[dish.id] ? prev[dish.id] + 1 : 1,
    }));
  };

  // Cộng số lượng món
  const increaseQuantity = (dishId) => {
    setSelectedDishes((prev) => ({
      ...prev,
      [dishId]: prev[dishId] + 1,
    }));
  };

  // Trừ số lượng món
  const decreaseQuantity = (dishId) => {
    setSelectedDishes((prev) => {
      const newSelectedDishes = { ...prev };
      if (newSelectedDishes[dishId] > 1) {
        newSelectedDishes[dishId] -= 1;
      } else {
        delete newSelectedDishes[dishId]; // Xóa món nếu số lượng = 0
      }
      return newSelectedDishes;
    });
  };

  // Tính tổng tiền
  const totalPrice = Object.entries(selectedDishes).reduce((sum, [dishId, quantity]) => {
    const dish = allDishes.find((d) => d.id === +dishId);
    return sum + (dish ? dish.price * quantity : 0);
  }, 0);

  // Xử lý tạo menu mới
  const handleCreateMenu = async () => {
    if (!menuName.trim()) {
      Swal.fire("Lỗi!", "Tên menu không được để trống.", "error");
      return;
    }

    try {
      await dispatch(
        createMenu({
          name: menuName,
          description: menuDescription,
          dishes: Object.entries(selectedDishes).map(([dishId, quantity]) => ({
            dishId: +dishId,
            quantity,
          })),
        })
      ).unwrap();

      Swal.fire("Thành công!", "Menu đã được tạo.", "success");
      setMenuName("");
      setMenuDescription("");
      setSelectedDishes({});
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    }
  };

  const sub = [
    { name: "Tạo mới", action: handleCreateMenu },
    { name: "Danh sách", link: "/admin/menu" },
  ];

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Quản lý thực đơn
      </h1>

      {/* Thanh điều hướng */}
      <div className="mb-4">
        <SubHeader subheader={sub} />
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-2 gap-6">
        {/* Cột trái: Tạo menu */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Thông tin menu</h2>
          <input
            type="text"
            placeholder="Tên menu"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Mô tả menu"
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
          ></textarea>

          <h3 className="mt-3 font-semibold">Món ăn trong menu:</h3>
          <ul className="mt-1 space-y-1">
            {Object.keys(selectedDishes).length > 0 ? (
              Object.entries(selectedDishes).map(([dishId, quantity]) => {
                const dish = allDishes.find((d) => d.id === +dishId);
                return (
                  <li
                    key={dishId}
                    className="bg-gray-100 p-2 rounded shadow-sm flex justify-between items-center"
                  >
                    <span>{dish?.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => decreaseQuantity(dishId)}
                      >
                        ➖
                      </button>
                      <span className="text-sm">{quantity}</span>
                      <button
                        className="text-xs bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => increaseQuantity(dishId)}
                      >
                        ➕
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-400">Chưa chọn món nào</p>
            )}
          </ul>

          {/* Hiển thị tổng tiền */}
          <h3 className="mt-4 font-semibold text-right text-lg">
            Tổng tiền: <span className="text-green-600">{totalPrice.toLocaleString()} VNĐ</span>
          </h3>
        </div>

        {/* Cột phải: Danh sách món ăn */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Danh sách món ăn</h2>
          <ul className="space-y-2">
            {allDishes?.map((dish) => (
              <li
                key={dish.id}
                className={`bg-gray-100 p-2 rounded shadow-sm cursor-pointer hover:bg-gray-200 transition ${
                  selectedDishes[dish.id] ? "bg-green-200" : ""
                }`}
                onClick={() => handleSelectDish(dish)}
              >
                {dish.name} - <span className="text-gray-600">{dish.price.toLocaleString()} VNĐ</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nút tạo menu */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          onClick={handleCreateMenu}
        >
          Tạo menu
        </button>
      </div>
    </div>
  );
}
