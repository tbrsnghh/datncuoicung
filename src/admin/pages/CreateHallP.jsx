import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createHall } from "../../redux/hallSlice";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/sub-header/SubHeader";
import Swal from "sweetalert2";

export default function CreateHallP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    description: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createHall(formData)).unwrap();
      Swal.fire("Thành công!", "Sảnh đã được tạo.", "success");
      navigate("/admin/halls");
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi tạo sảnh.", "error");
      console.error("Failed to create hall:", error);
    }
  };

  const sub = [
    { name: "Thêm mới", link: "/admin/hall/create" },
    { name: "Danh sách", link: "/admin/halls" },
  ];

  return (
    <div className="w-full p-6 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Thêm sảnh mới
      </h1>

      <div className="mb-4">
        <SubHeader subheader={sub} />
      </div>

      <div className="w-1/2 mx-auto bg-white p-6 rounded-lg shadow-lg float-left">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Tên sảnh
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#d63384] transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Sức chứa (người)
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#d63384] transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Mô tả
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full h-32 focus:outline-none focus:border-[#d63384] transition duration-200 resize-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Giá cơ bản (VND)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#d63384] transition duration-200"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#d63384] hover:bg-[#b02a6d] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Thêm sảnh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
