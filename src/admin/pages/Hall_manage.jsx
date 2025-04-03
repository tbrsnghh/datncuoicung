import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteHall, fetchHalls } from "../../redux/hallSlice";
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
  const { halls, loading, error } = useSelector((state) => state.hall);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [editingHall, setEditingHall] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchHalls());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(halls);
  }, [halls]);

  const openModal = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  const openEditModal = (hall) => {
    setEditingHall(hall);
    setShowEditModal(true);
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
                <th className="p-3">Tên sảnh</th>
                <th className="p-3">Sức chứa</th>
                {/* <th className="p-3">Trạng thái</th> */}
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((hall) => (
                <tr key={hall.id} className="border-b hover:bg-[#fff5f7] transition">
                  <td className="p-3">{hall.name}</td>
                  <td className="p-3">{hall.capacity} người</td>
                  {/* <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        hall.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {hall.status}
                    </span>
                  </td> */}
                  <td className="p-3 space-x-2">
                    <EditBtn onclick={() => openEditModal(hall)} />
                    <DeleteBtn onclick={() => handleDelete(hall.id)} />
                    <DetailBtn onclick={() => openModal(hall)} />
                  </td>
                </tr>
              ))}
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
