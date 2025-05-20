import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  const { currentBooking } = useSelector((state) => state.booking);
  console.log(currentBooking);
  

  return (
    <div className="min-h-screen bg-pastel-pink-light flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Đặt tiệc thành công!
        </h1>

        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã chọn dịch vụ của chúng tôi. Đơn đặt tiệc của bạn đã được ghi nhận.
        </p>

        {currentBooking && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h2 className="text-lg font-semibold mb-2">Thông tin đơn đặt tiệc</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Mã đơn:</span> #{currentBooking.id}</p>
              <p><span className="font-medium">Tên sự kiện:</span> {currentBooking.eventName}</p>
              <p><span className="font-medium">Ngày tổ chức:</span> {currentBooking.eventDate}</p>
              <p><span className="font-medium">Thời gian:</span> {currentBooking.TimeSlot.startTime} - {currentBooking.TimeSlot.endTime}</p>
              <p><span className="font-medium">Tổng chi phí:</span> {} VNĐ</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Bạn sẽ nhận được email xác nhận trong vòng 24h.
          </p>

          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Về trang chủ
            </Link>
            <Link
              to="/profile"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Xem đơn đặt tiệc
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess; 