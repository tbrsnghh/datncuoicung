import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteHall, fetchHalls, fetchHallImages } from "../../redux/hallSlice";
import SubHeader from "../components/sub-header/SubHeader";
import Search from "../components/search/Search";
import { DeleteBtn, EditBtn, DetailBtn } from "../components/mini/Btn";
import { useNavigate } from "react-router-dom";
import { HallSelected } from "../components/hall/hallcom";
import EditHall from "../components/hall/EditHall";
import Swal from "sweetalert2";

export default function HallManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { halls, loading, error, hallImages } = useSelector((state) => state.hall);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [editingHall, setEditingHall] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  useEffect(() => {
    dispatch(fetchHalls());
    halls.forEach(hall => {
      dispatch(fetchHallImages(hall.id));
    });
    console.log(hallImages);
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(halls);
  }, [halls]);

  useEffect(() => {
    // Fetch images for selected hall when it changes
    if (selectedHall) {
      dispatch(fetchHallImages(selectedHall.id));
    }
  }, [dispatch, selectedHall]);

  const openModal = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  const openEditModal = async (hall) => {
    try {
      setIsLoadingImages(true);
      // Gọi API lấy ảnh trước khi mở modal
      await dispatch(fetchHallImages(hall.id)).unwrap();
      setEditingHall(hall);
      setShowEditModal(true);
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể tải ảnh sảnh. Vui lòng thử lại.", "error");
    } finally {
      setIsLoadingImages(false);
    }
  };

  const closeEditModal = () => {
    setEditingHall(null);
    setShowEditModal(false);
  };

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(halls);
    } else {
      const filtered = halls.filter(hall => 
        hall.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };
  const handleDelete = async (id) => {
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
        await dispatch(deleteHall(id)).unwrap();
        Swal.fire(
          'Đã xóa!',
          'Sảnh đã được xóa thành công.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Lỗi!',
        error.message || 'Có lỗi xảy ra khi xóa sảnh.',
        'error'
      );
    }
  };

  const sub = [
    { name: "Thêm mới", link: "/admin/hall/create" },
    { name: "Danh sách", link: "/admin/hall" },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full p-6 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Quản lý sảnh tiệc
      </h1>

      <div className="mb-4 flex">
        <SubHeader subheader={sub} />
        <Search 
          placeholder="Tìm kiếm sảnh"
          onSearch={handleSearch}
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="border rounded-lg p-4 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-[#d63384] mb-4">
            Danh sách sảnh
          </h2>
          <table className="w-full border-collapse text-center">
            <thead className="bg-[#f9c5d1] text-[#d63384]">
              <tr className="border-b">
                <th className="p-3">Ảnh</th>
                <th className="p-3">Tên sảnh</th>
                <th className="p-3">Sức chứa</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((hall) => {
                const images = hallImages[hall.id] || [];
                const primaryImage = images.find(img => img.isPrimary)?.fileName || images[0]?.fileName || null;
                const imageUrl = primaryImage 
                  ? `http://localhost:8081/api/hall/${hall.id}/images/${primaryImage}`
                  : null;
                
                return (
                  <tr key={hall.id} className="border-b hover:bg-[#fff5f7] transition">
                    <td className="p-3">
                      {imageUrl ? (
                        <img 
                          src={imageUrl} 
                          alt={hall.name} 
                          className="w-16 h-16 object-cover rounded mx-auto"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded mx-auto flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Không có ảnh</span>
                        </div>
                      )}
                    </td>
                    <td className="p-3">{hall.name}</td>
                    <td className="p-3">{hall.capacity} người</td>
                    <td className="p-3 space-x-2">
                      <EditBtn onclick={() => openEditModal(hall)} />
                      <DeleteBtn onclick={() => handleDelete(hall.id)} />
                      <DetailBtn onclick={() => openModal(hall)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-[#d63384] mb-4">
            Chi tiết sảnh
          </h2>

          {selectedHall ? (
            <HallSelected selectedHall={selectedHall} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Vui lòng chọn một sảnh để xem chi tiết</p>
            </div>
          )}
        </div>
        {showEditModal && editingHall && (
          <EditHall
            hall={editingHall}
            onClose={closeEditModal}
          />
        )}
      </div>
    </div>
  );
}
