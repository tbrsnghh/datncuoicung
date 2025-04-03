import React, { useState } from "react";
import { DeleteBtn, EditBtn, DetailBtn } from "../mini/Btn";
import { useDispatch } from "react-redux";
import EditMenu from "./EditMenu";
import Swal from "sweetalert2";
import { deleteMenu } from "../../../redux/menuSlice";

export default function DishList({ selectedMenu, setSelectedMenu}) {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(updateMenu(selectedMenu));
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn không thể hoàn tác sau khi xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Add delete logic here
        dispatch(deleteMenu(selectedMenu.id));
        Swal.fire(
          'Đã xóa!',
          'Menu đã được xóa thành công.',
          'success'
        )
      }
    })
  };

  if (!selectedMenu) {
    return (
      <div className="border rounded-lg p-3 bg-white shadow-md">
        <h2 className="text-xl font-bold text-[#d63384] mb-3">Chi tiết món ăn</h2>
        <p className="text-gray-500">Chọn một thực đơn để xem chi tiết.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-3 bg-white shadow-md text-sm flex flex-col min-h-[250px]">
      {/* Tiêu đề menu */}
      <h2 className="text-xl font-bold text-[#d63384] mb-3">Menu {selectedMenu.name}</h2>
      
      {/* Danh sách món ăn */}
      <div className="flex-grow max-h-150 overflow-y-auto">
        {selectedMenu.Dishes.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {selectedMenu.Dishes.map((dish) => (
              <li key={dish.id} className="flex items-center gap-2 py-2">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-12 h-12 object-cover rounded border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{dish.name}</h3>
                  <p className="text-gray-500 text-xs truncate">{dish.description}</p>
                </div>
                <span className="font-bold text-[#d63384] text-sm">{dish.price.toLocaleString()} đ</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Chưa có món ăn trong thực đơn này.</p>
        )}
      </div>

      {/* Phần tổng giá và số món ăn */}
      <div className="mt-auto pt-3 border-t text-right text-sm">
        <p><strong>Số món ăn:</strong> {selectedMenu.Dishes.length}</p>
        <p><strong>Tổng giá:</strong> {selectedMenu.Dishes.reduce((total, dish) => total + dish.price, 0).toLocaleString()} đ</p>
      </div>

      {/* Nút chức năng */}
      <div className="mt-3 flex justify-end gap-2">
        
        <DeleteBtn onclick={handleDelete} />
        <EditBtn onclick={() => setIsEdit(true)} />
      </div>
      {isEdit && (<EditMenu menu={selectedMenu} setMenu={setSelectedMenu} handleClose={() => setIsEdit(false)} />)}
    </div>
  );
}
