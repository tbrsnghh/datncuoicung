import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDish, uploadDishImage } from "../../../redux/dishSlice";
import Swal from "sweetalert2";

export default function DishEditModal({ dish, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [image, setImage] = useState(dish.image);
  const [price, setPrice] = useState(dish.price);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      await dispatch(updateDish({ id: dish.id, name, description, image, price })).unwrap();
      Swal.fire("Thành công!", "Món ăn đã được sửa thành công.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsSubmitting(true);
        await dispatch(uploadDishImage({ dishId: dish.id, imageFile: file })).unwrap();
        Swal.fire("Thành công!", "Ảnh đã được tải lên thành công.", "success");
      } catch (error) {
        Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi tải lên ảnh.", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Sửa món ăn</h2>

        <div className="space-y-2">
          <label className="block">
            <span className="text-sm text-gray-600">Tên món</span>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tên món"
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
            <span className="text-sm text-gray-600">Giá</span>
            <input
              type="number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Giá món ăn"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Link hình ảnh</span>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Link hình ảnh"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Tải lên ảnh</span>
            <input
              type="file"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleImageUpload}
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
