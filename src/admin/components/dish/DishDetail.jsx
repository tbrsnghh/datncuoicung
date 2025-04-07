import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDishImage, setPrimaryDishImage, uploadDishImage, updateDish, deleteDish } from "../../../redux/dishSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";

export default function DishDetail({ dish, onClose }) {
  const dispatch = useDispatch();
  const dishImages = useSelector((state) => state.dish.dishImages[dish.id] || []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Trạng thái chỉnh sửa
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [price, setPrice] = useState(dish.price);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    adaptiveHeight: false,
    className: "dish-slider",
  };

  const handleDeleteDish = () => {
    Swal.fire({
      title: "Xác nhận xóa?",
      text: "Bạn có chắc chắn muốn xóa món này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDish(dish.id));
        Swal.fire("Đã xóa!", "Món ăn đã được xóa.", "success");
        onClose();
      }
    });
  };

  const handleDeleteImage = (imageId) => {
    Swal.fire({
      title: "Xác nhận xóa ảnh?",
      text: "Bạn có chắc chắn muốn xóa ảnh này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDishImage({ dishId: dish.id, imageId }));
        Swal.fire("Đã xóa!", "Ảnh đã được xóa.", "success");
      }
    });
  };

  const handleSetPrimaryImage = (imageId) => {
    dispatch(setPrimaryDishImage({ dishId: dish.id, imageId }))
      .unwrap()
      .then(() => {
        Swal.fire("Thành công!", "Ảnh đã được đặt làm ảnh chính.", "success");
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
      });
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

  const handleUpdateDish = async () => {
    try {
      setIsSubmitting(true);
      await dispatch(updateDish({ 
        id: dish.id, 
        name, 
        description, 
        price 
      })).unwrap();
      Swal.fire("Thành công!", "Món ăn đã được cập nhật thành công.", "success");
      setIsEditMode(false);
    } catch (error) {
      Swal.fire("Lỗi!", error.message || "Có lỗi xảy ra.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header sticky */}
      <div className="sticky top-0 z-10 bg-white px-3 py-2  shadow-sm">
        <div className="flex justify-between items-center space-x-2">
          {!isEditMode ? (
            <h2 className="text-xl font-semibold text-gray-800 truncate">{dish.name}</h2>
          ) : (
            <input
              type="text"
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tên món"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          
          <div className="flex items-center gap-1 shrink-0">
            {!isEditMode ? (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="text-blue-500 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50"
                  title="Sửa món ăn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L15.5 8.5l-5 5-3.5 1 1-3.5 5-5z" />
                  </svg>
                </button>
                <button 
                  onClick={handleDeleteDish}
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50"
                  title="Xóa món ăn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
                  title="Đóng"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUpdateDish}
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm disabled:opacity-60"
                >
                  Lưu
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded text-sm"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung cuộn */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {/* Khung hình ảnh cố định */}
        <div className="mb-4 border rounded-lg overflow-hidden bg-black bg-opacity-5 dish-image-container" style={{ height: '250px' }}>
          {dishImages.length > 0 ? (
            <div className="h-full">
              <Slider {...settings}>
                {dishImages.map((image) => (
                  <div key={image.id} className="relative outline-none h-full">
                    <div className="flex items-center justify-center h-[220px]">
                      <img
                        src={`http://localhost:8081/api/dishes/${dish.id}/images/${image.fileName}`}
                        alt={image.originalName}
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                    </div>
                    {image.isPrimary && (
                      <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        Ảnh chính
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        title="Xóa ảnh"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {!image.isPrimary && (
                        <button
                          onClick={() => handleSetPrimaryImage(image.id)}
                          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                          title="Đặt làm ảnh chính"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Không có ảnh</p>
            </div>
          )}
        </div>

        {/* Thêm ảnh mới */}
        <div className="mb-4 bg-gray-50 p-3 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tải lên ảnh mới
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isSubmitting}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg border">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Mô tả</h3>
            {!isEditMode ? (
              <p className="text-gray-600">{dish.description}</p>
            ) : (
              <textarea
                className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            )}
          </div>

          <div className="bg-white p-3 rounded-lg border">
            <h3 className="text-base font-semibold text-gray-800 mb-1">Giá</h3>
            {!isEditMode ? (
              <p className="text-red-500 font-semibold text-lg">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dish.price)}
              </p>
            ) : (
              <input
                type="number"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Giá món ăn"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            )}
          </div>

          {/* Thư viện ảnh */}
          <div className="bg-white p-3 rounded-lg border">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Thư viện ảnh ({dishImages.length})
            </h3>
            {dishImages.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {dishImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group"
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="aspect-square overflow-hidden rounded border">
                      <img
                        src={`http://localhost:8081/api/dishes/${dish.id}/images/${image.fileName}`}
                        alt={image.originalName}
                        className={`w-full h-full object-cover cursor-pointer ${
                          index === currentSlide
                            ? "ring-2 ring-blue-500"
                            : ""
                        }`}
                      />
                    </div>
                    {image.isPrimary && (
                      <div className="absolute top-1 right-1 bg-blue-500 w-4 h-4 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 rounded">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                        title="Xóa ảnh"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {!image.isPrimary && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetPrimaryImage(image.id);
                          }}
                          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                          title="Đặt làm ảnh chính"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Chưa có ảnh nào, hãy tải lên ảnh mới</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 