import React from 'react';

export default function Step1GeneralInfo({ eventInfo, setEventInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Thông tin sự kiện</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên sự kiện
          </label>
          <input
            type="text"
            name="eventName"
            value={eventInfo.eventName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-rose-500 focus:border-rose-500"
            placeholder="Nhập tên sự kiện"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số khách
          </label>
          <input
            type="number"
            name="guestCount"
            value={eventInfo.guestCount}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border border-gray-300 rounded focus:ring-rose-500 focus:border-rose-500"
            placeholder="Nhập số khách"
          />
        </div>
      </div>
    </div>
  );
}
