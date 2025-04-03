import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHalls } from "../../redux/hallSlice";

export default function Step2SelectHall({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const halls = useSelector((state) => state.hall.halls);
  const selectedHall = eventInfo.hallId;
  const setSelectedHall = (index) => {
    setEventInfo({ ...eventInfo, hallId: index });
  };

  useEffect(() => {
    dispatch(fetchHalls());
  }, [dispatch]);

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 my-3">Chọn hội trường</h2>
      
      <div className="w-full flex space-x-4">
        {/* Danh sách các sảnh (bên trái) */}
        <div className="w-1/4 bg-gray-100 p-4 rounded">
          {halls && halls.map((hall, index) => (
            <label
              key={index}
              className={`flex items-center p-2 rounded cursor-pointer ${
                selectedHall === index ? "bg-gray-300" : "hover:bg-gray-200"
              } transition`}
            >
              <input
                type="radio"
                name="hall"
                value={index}
                checked={selectedHall === index}
                onChange={() => setSelectedHall(index)}
                className="mr-2"
              />
              {hall.name}
            </label>
          ))}
        </div>

        {/* Ảnh mô tả (ở giữa) */}
        <div className="w-1/2 flex justify-center items-center">
          {halls && halls[selectedHall] && (
            <img
              className="w-full h-fit rounded shadow"
              //src={halls[selectedHall].image || "https://riversidepalace.vn/multidata/3-482.jpg"}
              src={"https://riversidepalace.vn/multidata/3-482.jpg"}
              alt={halls && halls[selectedHall].name}
            />
          )}
        </div>

        {/* Thông tin sảnh (bên phải) */}
        <div className="w-1/4 bg-gray-100 p-4 rounded">
          {halls && halls[selectedHall] && (
            <>
              <p className="text-lg font-semibold mb-2">{halls && halls[selectedHall].name}</p>
              <p className="text-sm text-gray-600">Sức chứa: {halls && halls[selectedHall].capacity} người</p>
              <p className="text-sm text-gray-600">Giá thuê: {halls && halls[selectedHall].price} VNĐ</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
