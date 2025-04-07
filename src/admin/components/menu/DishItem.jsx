import React from "react";
import { useSelector } from "react-redux";

export default function DishItem({ dish, onClick, isSelected }) {
  const dishImages = useSelector((state) => state.dish.dishImages[dish.id] || []);

  // Tìm ảnh chính
  const primaryImage = dishImages.find(img => img.isPrimary);
  const firstImage = dishImages[0];
  const displayImage = primaryImage || firstImage;

  return (
    <li 
      className={`flex items-center bg-white p-3 rounded-lg shadow border hover:shadow-md transition-all cursor-pointer ${isSelected ? 'border-[#d63384] border-2' : 'border-gray-200'}`}
      onClick={onClick}
    >
      {/* Hình ảnh món ăn */}
      <div className="w-16 h-16 shrink-0">
        {displayImage ? (
          <img 
            src={`http://localhost:8081/api/dishes/${dish.id}/images/${displayImage.fileName}`} 
            alt={dish.name} 
            className="w-full h-full rounded-md object-cover border"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">No image</span>
          </div>
        )}
      </div>

      {/* Thông tin món ăn */}
      <div className="flex-1 ml-3">
        <h2 className="text-sm font-semibold text-gray-800">{dish.name}</h2>
        <p className="text-xs text-gray-500 line-clamp-2">{dish.description}</p>
        <p className="text-sm font-medium text-red-500">
          {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.price)}
        </p>
      </div>
    </li>
  );
}
