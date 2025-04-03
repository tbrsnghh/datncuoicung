import React, { useState } from "react";

export default function Step1GeneralInfo({ eventInfo, setEventInfo }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!eventInfo.eventName.trim()) {
      newErrors.eventName = "Vui lòng nhập tên sự kiện";
    }

    if (!eventInfo.eventDate) {
      newErrors.eventDate = "Vui lòng chọn ngày tổ chức";
    } else {
      const selectedDate = new Date(eventInfo.eventDate);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.eventDate = "Ngày tổ chức không thể trong quá khứ";
      }
    }

    if (!eventInfo.startTime) {
      newErrors.startTime = "Vui lòng chọn giờ bắt đầu";
    }

    if (!eventInfo.endTime) {
      newErrors.endTime = "Vui lòng chọn giờ kết thúc";
    } else if (eventInfo.startTime && eventInfo.endTime <= eventInfo.startTime) {
      newErrors.endTime = "Giờ kết thúc phải sau giờ bắt đầu";
    }

    if (!eventInfo.tableCount || eventInfo.tableCount < 1) {
      newErrors.tableCount = "Số bàn phải lớn hơn 0";
    }

    if (!eventInfo.guestCount || eventInfo.guestCount < 1) {
      newErrors.guestCount = "Số khách phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Thông tin sự kiện</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-gray-700 text-lg font-medium mb-2 block">Tên sự kiện</label>
          <input
            type="text"
            name="eventName"
            value={eventInfo.eventName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.eventName ? 'border-red-500 bg-red-50' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
            placeholder="Ví dụ: Tiệc cưới Anh Tuấn & Chị Mai"
          />
          {errors.eventName && (
            <p className="mt-2 text-red-600 text-sm">{errors.eventName}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 text-lg font-medium mb-2 block">Ngày tổ chức</label>
          <input
            type="date"
            name="eventDate"
            value={eventInfo.eventDate}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.eventDate ? 'border-red-500 bg-red-50' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
          />
          {errors.eventDate && (
            <p className="mt-2 text-red-600 text-sm">{errors.eventDate}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 text-lg font-medium mb-2 block">Giờ bắt đầu</label>
            <input
              type="time"
              name="startTime"
              value={eventInfo.startTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.startTime ? 'border-red-500 bg-red-50' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
            />
            {errors.startTime && (
              <p className="mt-2 text-red-600 text-sm">{errors.startTime}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700 text-lg font-medium mb-2 block">Giờ kết thúc</label>
            <input
              type="time"
              name="endTime"
              value={eventInfo.endTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.endTime ? 'border-red-500 bg-red-50' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
            />
            {errors.endTime && (
              <p className="mt-2 text-red-600 text-sm">{errors.endTime}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700 text-lg font-medium mb-2 block">Số bàn</label>
            <input
              type="number"
              name="tableCount"
              value={eventInfo.tableCount}
              onChange={handleChange}
              min="1"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.tableCount ? 'border-red-500 bg-red-50' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
            />
            {errors.tableCount && (
              <p className="mt-2 text-red-600 text-sm">{errors.tableCount}</p>
            )}
          </div>
          <div>
            <label className="text-gray-700 text-lg font-medium mb-2 block">Số khách</label>
            <input
              type="number"
              name="guestCount"
              value={eventInfo.guestCount}
              onChange={handleChange}
              min="1"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.guestCount ? 'border-red-500 bg-red-50' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-rose-500 transition duration-200`}
            />
            {errors.guestCount && (
              <p className="mt-2 text-red-600 text-sm">{errors.guestCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
