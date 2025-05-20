import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHalls, fetchTimeSlots, clearTimeSlots } from "../../redux/hallSlice";

export default function Step2SelectHall({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const { halls, timeSlots, loading, error: hallError } = useSelector((state) => state.hall);
  const selectedHallId = eventInfo.hallId;
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchHalls());
  }, [dispatch]);

  useEffect(() => {
    if (eventInfo.hallId && eventInfo.eventDate) {
      dispatch(fetchTimeSlots({ hallId: eventInfo.hallId, date: eventInfo.eventDate }));
    }
    return () => {
      dispatch(clearTimeSlots());
    };
  }, [dispatch, eventInfo.hallId, eventInfo.eventDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const setSelectedHall = (hallId) => {
    setEventInfo({ ...eventInfo, hallId, timeSlotId: null });
    setError("");
  };

  const setSelectedTimeSlot = (timeSlotId) => {
    setEventInfo({ ...eventInfo, timeSlotId });
    setError("");
  };

  // Tìm hall đã chọn
  const selectedHall = halls.find(hall => hall.id === selectedHallId);

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Chọn hội trường và thời gian</h2>
      
      {(error || hallError) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error || hallError}
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ngày tổ chức
          </label>
          <input
            type="date"
            name="eventDate"
            value={eventInfo.eventDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Danh sách hội trường</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {halls && halls.map((hall) => (
              <div
                key={hall.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  eventInfo.hallId === hall.id
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-200 hover:border-rose-200'
                }`}
                onClick={() => setSelectedHall(hall.id)}
              >
                <h4 className="font-medium">{hall.name}</h4>
                <p className="text-gray-600">{hall.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600">
                    Sức chứa: <span className="font-medium">{hall.capacity} người</span>
                  </p>
                  <p className="text-rose-600 font-medium">
                    {hall.price.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {eventInfo.hallId && eventInfo.eventDate && (
          <div>
            <h3 className="text-lg font-medium mb-4">Khung giờ có sẵn</h3>
            {loading ? (
              <p>Đang tải khung giờ...</p>
            ) : hallError ? (
              <p className="text-red-500">{hallError}</p>
            ) : timeSlots && timeSlots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      eventInfo.timeSlotId === slot.id
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-gray-200 hover:border-rose-200'
                    }`}
                    onClick={() => setSelectedTimeSlot(slot.id)}
                  >
                    <h4 className="font-medium">{slot.name}</h4>
                    <p className="text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </p>
                    <p className="text-sm text-gray-500">{slot.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Không có khung giờ nào khả dụng cho ngày này</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
