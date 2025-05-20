import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHall, uploadHallImage, deleteHallImage, setPrimaryHallImage } from "../../../redux/hallSlice";
import Swal from "sweetalert2";

export default function EditHall({ hall, onClose }) {
  console.log(hall);
  
  const dispatch = useDispatch();
  const [name, setName] = useState(hall.name);
  const [description, setDescription] = useState(hall.description);
  const [capacity, setCapacity] = useState(hall.capacity);
  const [price, setPrice] = useState(hall.price);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sử dụng dữ liệu từ Redux store, không gọi API
  const hallImages = useSelector(state => state.hall.hallImages[hall.id] || []);
  const loading = useSelector(state => state.hall.loading);

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

  const handleUploadImage = async () => {
    if (!selectedImage) return;
    
    try {
      setIsSubmitting(true);
      const result = await dispatch(uploadHallImage({ 
        hallId: hall.id, 
        imageFile: selectedImage 
      })).unwrap();
      
      console.log("Upload result:", result);
      
      setSelectedImage(null);
      setImagePreview(null);
      Swal.fire("Thành công!", "Ảnh đã được tải lên.", "success");
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi tải ảnh lên.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      const result = await Swal.fire({
        title: 'Xác nhận xóa?',
        text: "Bạn không thể hoàn tác sau khi xóa!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        await dispatch(deleteHallImage({ hallId: hall.id, imageId })).unwrap();
        Swal.fire('Đã xóa!', 'Ảnh đã được xóa thành công.', 'success');
      }
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi xóa ảnh.", "error");
    }
  };

  const handleSetPrimaryImage = async (imageId) => {
    try {
      await dispatch(setPrimaryHallImage({ hallId: hall.id, imageId })).unwrap();
      Swal.fire("Thành công!", "Ảnh chính đã được cập nhật.", "success");
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra khi đặt ảnh chính.", "error");
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(updateHall({ id: hall.id, name, description, capacity, price })).unwrap();
      Swal.fire("Thành công!", "Sảnh đã được sửa thành công.", "success");
      onClose();
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
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

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Quản lý ảnh sảnh</h3>
            
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-xs max-h-32 rounded-lg shadow-md"
                  />
                  <button
                    className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={handleUploadImage}
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? "Đang tải..." : "Tải ảnh lên"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {hallImages && hallImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={`http://localhost:8081/api/hall/${hall.id}/images/${image.fileName}`} 
                    alt="Hall" 
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                    <button
                      onClick={() => handleSetPrimaryImage(image.id)}
                      className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      title={image.isPrimary ? "Ảnh chính" : "Đặt làm ảnh chính"}
                      disabled={image.isPrimary}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Xóa ảnh"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {image.isPrimary && (
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                      Ảnh chính
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
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
            {isSubmitting ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
