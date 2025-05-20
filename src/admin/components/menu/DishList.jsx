import React, { useState, useEffect } from "react";
import { DeleteBtn, EditBtn } from "../mini/Btn";
import { useDispatch, useSelector } from "react-redux";
import EditMenu from "./EditMenu";
import Swal from "sweetalert2";
import { deleteMenu } from "../../../redux/menuSlice";
import { fetchDishImages } from "../../../redux/dishSlice";

export default function DishList({ selectedMenu, setSelectedMenu}) {
  const [isEdit, setIsEdit] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const dispatch = useDispatch();
  const dishImages = useSelector((state) => state.dish.dishImages);

  // Tải hình ảnh cho tất cả món ăn trong menu khi menu thay đổi
  useEffect(() => {
    const loadImages = async () => {
      if (selectedMenu && selectedMenu.Dishes && selectedMenu.Dishes.length > 0) {
        setLoadingImages(true);
        try {
          for (const dish of selectedMenu.Dishes) {
            await dispatch(fetchDishImages(dish.id)).unwrap();
          }
        } catch (error) {
          console.error("Error loading dish images:", error);
        } finally {
          setLoadingImages(false);
        }
      }
    };

    loadImages();
  }, [selectedMenu, dispatch]);

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
        dispatch(deleteMenu(selectedMenu.id));
        Swal.fire(
          'Đã xóa!',
          'Menu đã được xóa thành công.',
          'success'
        )
      }
    })
  };

  // Lấy ảnh chính cho một món ăn
  const getPrimaryImage = (dishId) => {
    if (!dishImages || !dishImages[dishId] || dishImages[dishId].length === 0) {
      return null;
    }
    
    const images = dishImages[dishId];
    const primaryImage = images.find(img => img.isPrimary);
    return primaryImage || images[0];
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
        {loadingImages ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : selectedMenu.Dishes && selectedMenu.Dishes.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {selectedMenu.Dishes.map((dish) => {
              const dishImage = getPrimaryImage(dish.id);
              return (
                <li key={dish.id} className="flex items-center gap-2 py-2">
                  <div className="w-12 h-12 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                    {dishImage ? (
                      <img
                        src={`http://localhost:8081/api/dishes/${dish.id}/images/${dishImage.fileName}`}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{dish.name}</h3>
                    <p className="text-gray-500 text-xs truncate">{dish.description}</p>
                  </div>
                  <span className="font-bold text-[#d63384] text-sm">{dish.price.toLocaleString()} đ</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">Chưa có món ăn trong thực đơn này.</p>
        )}
      </div>

      {/* Phần tổng giá và số món ăn */}
      <div className="mt-auto pt-3 border-t text-right text-sm">
        <p><strong>Số món ăn:</strong> {selectedMenu.Dishes ? selectedMenu.Dishes.length : 0}</p>
        <p><strong>Tổng giá:</strong> {selectedMenu.Dishes ? selectedMenu.Dishes.reduce((total, dish) => total + dish.price, 0).toLocaleString() : 0} đ</p>
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
