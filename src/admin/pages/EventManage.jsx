import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/sub-header/SubHeader";
import Search from "../components/search/Search";
import { DeleteBtn, EditBtn } from "../components/mini/Btn";
import Swal from "sweetalert2";
import { 
  fetchAllEvents, 
  updateEventStatus, 
  deleteEvent,
  setSelectedEvent,
  clearSelectedEvent
} from "../../redux/bookingSlice";

export default function EventManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { bookings: events, loading, error, selectedEvent } = useSelector((state) => state.booking);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(events);
  }, [events]);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(events);
    } else {
      const filtered = events.filter(event => 
        event.eventName.toLowerCase().includes(query.toLowerCase()) ||
        event.User?.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleStatusUpdate = async (eventId, newStatus) => {
    try {
      await dispatch(updateEventStatus({ eventId, status: newStatus })).unwrap();
      
      Swal.fire(
        'Thành công!',
        'Cập nhật trạng thái sự kiện thành công.',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Lỗi!',
        error.message || 'Có lỗi xảy ra khi cập nhật trạng thái.',
        'error'
      );
    }
  };

  const handleDelete = async (eventId) => {
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
        await dispatch(deleteEvent(eventId)).unwrap();
        
        Swal.fire(
          'Đã xóa!',
          'Sự kiện đã được xóa thành công.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire(
        'Lỗi!',
        error.message || 'Có lỗi xảy ra khi xóa sự kiện.',
        'error'
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const sub = [
    { name: "Danh sách", link: "/admin/event" },
  ];

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full p-6 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Quản lý sự kiện
      </h1>

      <div className="mb-4 flex">
        <SubHeader subheader={sub} />
        <Search 
          placeholder="Tìm kiếm sự kiện"
          onSearch={handleSearch}
        />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="border rounded-lg p-4 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-[#d63384] mb-4">
            Danh sách sự kiện
          </h2>
          <table className="w-full border-collapse text-center">
            <thead className="bg-[#f9c5d1] text-[#d63384]">
              <tr className="border-b">
                <th className="p-3">Tên sự kiện</th>
                <th className="p-3">Khách hàng</th>
                <th className="p-3">Ngày tổ chức</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((event) => (
                <tr key={event.id} className="border-b hover:bg-[#fff5f7] transition">
                  <td className="p-3">{event.eventName}</td>
                  <td className="p-3">{event.User?.name}</td>
                  <td className="p-3">{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white ${getStatusColor(event.status)}`}>
                      {event.status === 'pending' ? 'Chờ duyệt' : 
                       event.status === 'confirmed' ? 'Đã duyệt' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <EditBtn onclick={() => dispatch(setSelectedEvent(event))} />
                    <DeleteBtn onclick={() => handleDelete(event.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-[#d63384] mb-4">
            Chi tiết sự kiện
          </h2>

          {selectedEvent ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Thông tin sự kiện</h3>
                <p><span className="font-medium">Tên sự kiện:</span> {selectedEvent.eventName}</p>
                <p><span className="font-medium">Khách hàng:</span> {selectedEvent.User?.name}</p>
                <p><span className="font-medium">Ngày tổ chức:</span> {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Thời gian:</span> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                <p><span className="font-medium">Số bàn:</span> {selectedEvent.numberOfTables}</p>
                <p><span className="font-medium">Số khách:</span> {selectedEvent.numberOfGuests}</p>
                <p><span className="font-medium">Hội trường:</span> {selectedEvent.Hall?.name}</p>
                <p><span className="font-medium">Menu:</span> {selectedEvent.Menu?.name}</p>
                <p><span className="font-medium">Tổng chi phí:</span> {selectedEvent.totalPrice.toLocaleString()} VNĐ</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Cập nhật trạng thái</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedEvent.id, 'confirmed')}
                    className="px-3 py-1 text-green-500 border border-green-500 rounded-md text-xs hover:bg-green-500 hover:text-white transition-all"
                  >
                    Duyệt
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedEvent.id, 'cancelled')}
                    className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Vui lòng chọn một sự kiện để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 