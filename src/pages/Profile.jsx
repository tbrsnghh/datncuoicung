import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../redux/userMSlice';
import { fetchUserBookings } from '../redux/bookingSlice';
import { fetchMenuById } from '../redux/menuSlice';
import { fetchHallById } from '../redux/hallSlice';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaSignOutAlt, FaMoneyBillWave, FaUtensils } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import Header from '../user/components/Header';
import { logout } from '../redux/authSlice';
import Swal from 'sweetalert2';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userM);
  const { bookings } = useSelector((state) => state.booking);
  const { currentMenu } = useSelector((state) => state.menu);
  const { currentHall } = useSelector((state) => state.hall);
  const [activeTab, setActiveTab] = useState('info');

  // Lấy userId từ localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId))
        .unwrap()
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: error.message || 'Không thể tải thông tin người dùng',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
        });

      dispatch(fetchUserBookings(userId))
        .unwrap()
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: error.message || 'Không thể tải lịch sử đặt tiệc',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6',
          });
        });
    }
  }, [dispatch, userId]);

  // Fetch thông tin sảnh và menu khi có booking mới
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const latestBooking = bookings[0]; // Lấy booking mới nhất
      if (latestBooking.hallId) {
        dispatch(fetchHallById(latestBooking.hallId))
          .unwrap()
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: error.message || 'Không thể tải thông tin sảnh',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
          });
      }
      if (latestBooking.menuId) {
        dispatch(fetchMenuById(latestBooking.menuId))
          .unwrap()
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: error.message || 'Không thể tải thông tin thực đơn',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
            });
          });
      }
    }
  }, [dispatch, bookings]);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Swal.fire({
      title: 'Xác nhận đăng xuất',
      text: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate('/login');
        Swal.fire({
          icon: 'success',
          title: 'Đã đăng xuất!',
          text: 'Bạn đã đăng xuất thành công.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  // Hàm chuyển đổi trạng thái tiệc sang tiếng Việt
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
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

  // Hàm lấy màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-purple-100 text-purple-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mt-20 max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaUser className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{currentUser?.username}</h1>
                  <p className="text-gray-600">Thông tin tài khoản</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'info'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Thông tin cá nhân
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'bookings'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('bookings')}
              >
                Lịch sử đặt tiệc
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'info' ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FaEnvelope className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{currentUser?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaPhone className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="text-gray-800">{currentUser?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="text-gray-800">{currentUser?.address}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings?.length > 0 ? (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-xl text-gray-800 mb-2">
                            {booking.eventName}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {getStatusText(booking.status)}
                            </span>
                            <span className="text-gray-500">
                              {new Date(booking.eventDate).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Tổng giá trị</p>
                          <p className="text-xl font-bold text-blue-600">
                            {Number(booking.totalPrice).toLocaleString('vi-VN')} VNĐ
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <MdMeetingRoom className="text-gray-400 text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Sảnh tiệc</p>
                              <p className="text-gray-800 font-medium">{currentHall?.name || 'Đang tải...'}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaUtensils className="text-gray-400 text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Thực đơn</p>
                              <p className="text-gray-800 font-medium">{currentMenu?.name || 'Đang tải...'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <FaUser className="text-gray-400 text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Số khách</p>
                              <p className="text-gray-800 font-medium">{booking.numberOfGuests} người</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FaMoneyBillWave className="text-gray-400 text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Số bàn</p>
                              <p className="text-gray-800 font-medium">{booking.numberOfTables} bàn</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Ghi chú</p>
                          <p className="text-gray-800 mt-1">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">Bạn chưa có lịch sử đặt tiệc nào</p>
                    <button
                      onClick={() => navigate('/booking')}
                      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Đặt tiệc ngay
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
