import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";  // Import SweetAlert2
import DishEditModal from "../dish/DishEditModal";
import { deleteDish } from "../../../redux/dishSlice";
import { EditBtn ,DeleteBtn } from "../mini/Btn";

export default function DishItem({ dish }) {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
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
      }
    });
  };

  return (
    <li className="flex items-center justify-between bg-white p-2 rounded-lg shadow border border-gray-200 hover:shadow-md transition-all">
      {/* Hình ảnh món ăn */}
      <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-md object-cover border" />

      {/* Thông tin món ăn */}
      <div className="flex-1 ml-3">
        <h2 className="text-sm font-semibold text-gray-800">{dish.name}</h2>
        <p className="text-xs text-gray-500">{dish.description}</p>
        
      </div>
      <p className="text-sm red-m float-right mr-10">{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.price)}</p>
      {/* Nút thao tác */}
      <div className="flex gap-2">
        <EditBtn onclick={() => setIsEditModalOpen(true)}/>
        <DeleteBtn onclick={handleDelete}/>
      </div>

      {/* Modal sửa món ăn */}
      {isEditModalOpen && <DishEditModal dish={dish} onClose={() => setIsEditModalOpen(false)} />}
    </li>
  );
}
