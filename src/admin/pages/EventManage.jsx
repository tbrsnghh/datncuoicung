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
import { fetchMenuById } from "../../redux/menuSlice";
import { fetchUserById } from "../../redux/userMSlice";

export default function EventManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { bookings: events, loading, error, selectedEvent } = useSelector((state) => state.booking);
  const { currentMenu } = useSelector((state) => state.menu);
  const { currentUser } = useSelector((state) => state.userM);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    setSearchResults(events);
  }, [events]);

  // Fetch menu and user details when selectedEvent changes
  useEffect(() => {
    if (selectedEvent) {
      if (selectedEvent.menuId) {
        dispatch(fetchMenuById(selectedEvent.menuId));
      }
      if (selectedEvent.userId) {
        dispatch(fetchUserById(selectedEvent.userId));
      }
    }
  }, [selectedEvent, dispatch]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'paid':
        return 'bg-purple-500';
      case 'done':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'confirmed':
        return 'Đã duyệt';
      case 'paid':
        return 'Đã thanh toán';
      case 'done':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'confirmed';
      case 'confirmed':
        return 'paid';
      case 'paid':
        return 'done';
      default:
        return null;
    }
  };

  const canMarkAsDone = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);
    
    return today > eventDay;
  };

  const handleStatusUpdate = async (eventId, newStatus) => {
    try {
      // Kiểm tra nếu đang chuyển sang trạng thái done
      if (newStatus === 'done') {
        const event = events.find(e => e.id === eventId);
        if (!canMarkAsDone(event.eventDate)) {
          Swal.fire(
            'Không thể hoàn thành!',
            'Chỉ có thể đánh dấu hoàn thành sau ngày diễn ra sự kiện.',
            'warning'
          );
          return;
        }
      }

      // Xác nhận trước khi thực hiện
      const confirmMessage = newStatus === 'cancelled' 
        ? 'Bạn có chắc chắn muốn hủy sự kiện này?'
        : `Bạn có chắc chắn muốn chuyển trạng thái sang "${getStatusText(newStatus)}"?`;

      const result = await Swal.fire({
        title: 'Xác nhận thay đổi trạng thái',
        text: confirmMessage,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        await dispatch(updateEventStatus({ eventId, status: newStatus })).unwrap();
        
        Swal.fire(
          'Thành công!',
          'Cập nhật trạng thái sự kiện thành công.',
          'success'
        );
      }
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
                      {getStatusText(event.status)}
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
                <p><span className="font-medium">Khách hàng:</span> {currentUser?.username || 'Đang tải...'}</p>
                <p><span className="font-medium">Ngày tổ chức:</span> {new Date(selectedEvent.eventDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Thời gian:</span> {selectedEvent.TimeSlot.startTime} - {selectedEvent.TimeSlot.endTime}</p>
                <p><span className="font-medium">Số bàn:</span> {selectedEvent.numberOfTables}</p>
                <p><span className="font-medium">Số khách:</span> {selectedEvent.numberOfGuests}</p>
                <p><span className="font-medium">Hội trường:</span> {selectedEvent.Hall?.name}</p>
                <p><span className="font-medium">Menu:</span> {currentMenu?.name || 'Đang tải...'}</p>
                <p><span className="font-medium">Tổng chi phí:</span> {Number(selectedEvent.totalPrice).toLocaleString('vi-VN', {minimumFractionDigits: 0, maximumFractionDigits: 0}).replace(/,/g, '.')} VNĐ</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Cập nhật trạng thái</h3>
                <div className="space-x-2">
                  {selectedEvent.status !== 'done' && selectedEvent.status !== 'cancelled' && (
                    <>
                      {getNextStatus(selectedEvent.status) && (
                        <button
                          onClick={() => handleStatusUpdate(selectedEvent.id, getNextStatus(selectedEvent.status))}
                          className={`px-3 py-1 text-blue-500 border border-blue-500 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-all ${
                            selectedEvent.status === 'paid' && !canMarkAsDone(selectedEvent.eventDate) 
                              ? 'opacity-50 cursor-not-allowed' 
                              : ''
                          }`}
                          disabled={selectedEvent.status === 'paid' && !canMarkAsDone(selectedEvent.eventDate)}
                          title={selectedEvent.status === 'paid' && !canMarkAsDone(selectedEvent.eventDate) 
                            ? 'Chỉ có thể đánh dấu hoàn thành sau ngày diễn ra sự kiện' 
                            : ''}
                        >
                          {selectedEvent.status === 'pending' ? 'Duyệt' :
                           selectedEvent.status === 'confirmed' ? 'Xác nhận thanh toán' :
                           selectedEvent.status === 'paid' ? 'Hoàn thành' : ''}
                        </button>
                      )}
                      <button
                        onClick={() => handleStatusUpdate(selectedEvent.id, 'cancelled')}
                        className="px-3 py-1 text-red-500 border border-red-500 rounded-md text-xs hover:bg-red-500 hover:text-white transition-all"
                      >
                        Hủy sự kiện
                      </button>
                    </>
                  )}
                  {selectedEvent.status === 'done' && (
                    <span className="text-green-500 text-sm">Sự kiện đã hoàn thành</span>
                  )}
                  {selectedEvent.status === 'cancelled' && (
                    <span className="text-red-500 text-sm">Sự kiện đã bị hủy</span>
                  )}
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