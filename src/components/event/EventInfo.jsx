import React, { useState } from "react";

export default function EventInfo({eventInfo, setEventInfo }) {
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
  <h2 className="text-lg font-semibold text-gray-700 mb-3">Thông Tin Sự Kiện</h2>
  <div className="w-3/4 space-y-4">
    {/* Tên sự kiện */}
    <div className="grid grid-cols-3 gap-4">
      <label className="col-span-1 text-sm text-gray-600">Tên sự kiện</label>
      <input
        type="text"
        name="eventName"
        value={eventInfo.eventName}
        onChange={handleChange}
        className="col-span-2 p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
        placeholder="Nhập tên sự kiện..."
      />
    </div>

    {/* Ngày tổ chức */}
    <div className="grid grid-cols-3 gap-4">
      <label className="text-sm text-gray-600">Ngày tổ chức</label>
      <input
        type="date"
        name="eventDate"
        value={eventInfo.eventDate}
        onChange={handleChange}
        className="col-span-2 p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
      />
    </div>

    {/* Thời gian */}
    <div className="grid grid-cols-3 gap-4">
      <label className="text-sm text-gray-600">Thời gian</label>
      <div className="flex">
      <input
        type="time"
        name="eventStartTime"
        value={eventInfo.startTime}
        onChange={handleChange}
        className="col-span-1 p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
      />
      <span className="text-lg p-2"> - </span>
      <input
        type="time"
        name="eventEndTime"
        value={eventInfo.endTime}
        onChange={handleChange}
        className="col-span-1 p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
      />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <label className="text-sm text-gray-600">Số bàn đặt</label>
      <input
        type="number"
        name="tableCount"
        value={eventInfo.tableCount}
        onChange={handleChange}
        min={1}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
        placeholder="Nhập số bàn..."
      />
    </div>

    {/* Số khách ước lượng */}
    <div className="grid grid-cols-3 gap-4">
      <label className="text-sm text-gray-600">Số khách ước lượng</label>
      <input
        type="number"
        name="guestCount"
        value={eventInfo.guestCount}
        onChange={handleChange}
        min={1}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
        placeholder="Nhập số khách..."
      />
    </div>
  </div>
</div>

  );
}
