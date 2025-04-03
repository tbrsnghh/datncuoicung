import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHalls } from "../../redux/hallSlice";

export default function Step2SelectHall({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const halls = useSelector((state) => state.hall.halls);
  const selectedHall = eventInfo.hallId;
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchHalls());
  }, [dispatch]);

  const setSelectedHall = (index) => {
    setEventInfo({ ...eventInfo, hallId: index });
    setError("");
  };

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Chọn hội trường</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="w-full flex space-x-6">
        {/* Danh sách các sảnh (bên trái) */}
        <div className="w-1/4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Danh sách hội trường</h3>
          <div className="space-y-2">
            {halls && halls.map((hall, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedHall === index
                    ? "bg-rose-100 border-2 border-rose-500"
                    : "hover:bg-gray-100 border-2 border-transparent"
                }`}
                onClick={() => setSelectedHall(index)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    selectedHall === index ? "bg-rose-500" : "bg-gray-300"
                  }`} />
                  <span className={`font-medium ${
                    selectedHall === index ? "text-rose-700" : "text-gray-700"
                  }`}>
                    {hall.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {hall.price.toLocaleString()} VNĐ
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ảnh và thông tin chi tiết (bên phải) */}
        <div className="w-3/4">
          {halls && halls[selectedHall] ? (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  className="w-full h-96 object-cover"
                  src={halls[selectedHall].image || "https://riversidepalace.vn/multidata/3-482.jpg"}
                  alt={halls[selectedHall].name}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-2xl font-bold text-white">
                    {halls[selectedHall].name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Thông tin chi tiết</h4>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Sức chứa:</span>
                      <span className="font-medium">{halls[selectedHall].capacity} người</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Giá thuê:</span>
                      <span className="font-medium text-rose-600">
                        {halls[selectedHall].price.toLocaleString()} VNĐ
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Diện tích:</span>
                      <span className="font-medium">{halls[selectedHall].area} m²</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Tiện nghi</h4>
                  <ul className="space-y-2">
                    {halls[selectedHall].amenities?.map((amenity, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Vui lòng chọn một hội trường</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
