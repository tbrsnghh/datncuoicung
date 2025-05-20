import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createHall, uploadHallImage } from "../../redux/hallSlice";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/sub-header/SubHeader";
import Swal from "sweetalert2";

export default function CreateHallP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    description: "Mô tả trên 10 ký tự",
    price: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First create the hall
      const result = await dispatch(createHall(formData)).unwrap();
      
      // If image is selected, upload it
      if (selectedImage && result.id) {
        await dispatch(uploadHallImage({ 
          hallId: result.id, 
          imageFile: selectedImage 
        })).unwrap();
      }
      
      Swal.fire("Thành công!", "Sảnh đã được tạo.", "success");
      navigate("/admin/halls");
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi tạo sảnh.", "error");
      console.error("Failed to create hall:", error);
    } finally {
      setIsSubmitting(false);
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

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-bold mb-2">
              Ảnh sảnh
            </label>
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border-2 border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#d63384] transition duration-200"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-xs max-h-48 rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#d63384] hover:bg-[#b02a6d] text-white font-bold py-2 px-6 rounded-lg transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Thêm sảnh"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
