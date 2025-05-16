import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../redux/bookingSlice.jsx';
import { handleGetMe } from '../../admin/components/user/userFunc';

export default function Step5Confirmation({ eventInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    handleGetMe(dispatch, token, user);
  }, [dispatch, token, user]);

  const halls = useSelector((state) => state.hall.halls);
  const menus = useSelector((state) => state.menu.menu);
  const timeslot = eventInfo.timeSlotId == 8 ? "08:00 - 14:00" : eventInfo.timeSlotId == 9 ? "15:00 - 20:00" : "17:00 - 23:00";

  
  console.log('Event Info:', eventInfo);
  //console.log('Halls:', halls);
  //console.log('Menus:', menus);
  //console.log('Selected Hall ID:', eventInfo.hallId, 'Type:', typeof eventInfo.hallId);
  //console.log('Selected Menu ID:', eventInfo.menuId, 'Type:', typeof eventInfo.menuId);
  
  // Log từng menu để kiểm tra cấu trúc
  // if (menus) {
  //   menus.forEach(menu => {
  //     console.log('Menu:', menu);
  //     console.log('Menu ID:', menu.id, 'Type:', typeof menu.id);
  //   });
  // }
  
  const selectedHall = halls && halls.find(hall => hall.id === eventInfo.hallId);
  const selectedMenu = menus && menus.find(menu => menu.id === eventInfo.menuId);
  
  //console.log('Selected Hall:', selectedHall);
  //console.log('Selected Menu:', selectedMenu);

  // Kiểm tra nếu không tìm thấy sảnh hoặc menu
  if (!selectedHall || !selectedMenu) {
    return (
      <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-semibold mb-4">Lỗi</h2>
          <p>Không tìm thấy thông tin sảnh hoặc menu. Vui lòng quay lại bước trước.</p>
          <p className="mt-2 text-sm">Hall ID: {eventInfo.hallId}, Menu ID: {eventInfo.menuId}</p>
          <p className="mt-2 text-sm">Available Menus: {menus ? menus.map(m => m.id).join(', ') : 'No menus'}</p>
        </div>
      </div>
    );
  }
  
  const handleConfirm = async () => {
    try {
      const bookingData = {
        eventName: eventInfo.eventName,
        userId: user.id,
        hallId: selectedHall.id,
        timeSlotId: eventInfo.timeSlotId,
        menuId: selectedMenu.id,
        eventDate: eventInfo.eventDate,
        numberOfTables: eventInfo.tableCount,
        numberOfGuests: eventInfo.guestCount,
        notes: eventInfo.description || ''
      };

      await dispatch(createBooking(bookingData)).unwrap();
      navigate('/booking-success');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Có lỗi xảy ra khi đặt tiệc. Vui lòng thử lại!');
    }
  };

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Xác nhận đặt tiệc</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-medium mb-4">Thông tin đặt tiệc</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Tên sự kiện:</span> {eventInfo.eventName}</p>
            <p><span className="font-medium">Ngày tổ chức:</span> {eventInfo.eventDate}</p>
            <p><span className="font-medium">Thời gian:</span> {timeslot}</p>
            <p><span className="font-medium">Số bàn:</span> {eventInfo.tableCount}</p>
            <p><span className="font-medium">Số khách:</span> {eventInfo.guestCount}</p>
            <p><span className="font-medium">Hội trường:</span> {selectedHall.name}</p>
            <p><span className="font-medium">Menu:</span> {selectedMenu.name}</p>
            <p><span className="font-medium">Tổng chi phí:</span> {(selectedHall.price + selectedMenu.price).toLocaleString()} VNĐ</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="text-lg font-medium mb-2">Lưu ý quan trọng</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận</li>
            <li>Đơn đặt tiệc sẽ được xử lý trong vòng 24h</li>
            {/* <li>Bạn sẽ nhận được email xác nhận sau khi đơn được duyệt</li> */}
            <li>Nếu cần thay đổi, vui lòng liên hệ với chúng tôi</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-rose-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-rose-600 transition-colors"
          >
            Xác nhận đặt tiệc
          </button>
        </div>
      </div>
    </div>
  );
}
