import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHall } from "../../../redux/hallSlice";
import Swal from "sweetalert2";

export default function EditHall({ hall, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(hall.name);
  const [description, setDescription] = useState(hall.description);
  const [capacity, setCapacity] = useState(hall.capacity);
  const [price, setPrice] = useState(hall.price);

  const handleSave = async () => {
    try {
      await dispatch(updateHall({ id: hall.id, name, description, capacity, price })).unwrap();
      Swal.fire("Thành công!", "Sảnh đã được sửa thành công.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Sửa thông tin sảnh</h2>

        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-gray-600">Tên sảnh</span>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tên sảnh"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Mô tả</span>
            <textarea
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Sức chứa (người)</span>
            <input
              type="number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Sức chứa"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Giá cơ bản (VND)</span>
            <input
              type="number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Giá cơ bản"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-3 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
