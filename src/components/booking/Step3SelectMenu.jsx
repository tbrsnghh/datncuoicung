import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus } from '../../redux/menuSlice';
import { fetchDishes } from '../../redux/dishSlice';

export default function Step3SelectMenu({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);
  const dishes = useSelector((state) => state.dish.dish);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchDishes());
  }, [dispatch]);

  const setMenu = (index) => {
    setEventInfo({ ...eventInfo, menuId: index });
    setError("");
  };

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Chọn menu</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menu && menu.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border-2 transition-all cursor-pointer ${
              eventInfo.menuId === index
                ? "border-rose-500 bg-rose-50"
                : "border-gray-200 hover:border-rose-200"
            }`}
            onClick={() => setMenu(index)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-rose-600 font-medium mt-1">
                    {item.totalPrice.toLocaleString()} VNĐ
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  eventInfo.menuId === index
                    ? "bg-rose-500"
                    : "bg-gray-200"
                }`}>
                  {eventInfo.menuId === index && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {dishes && dishes
                  .filter(dish => dish.menuId === item.id)
                  .map((dish, dishIndex) => (
                    <div
                      key={dishIndex}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                        <span className="text-gray-700">{dish.name}</span>
                      </div>
                      <span className="text-gray-500">{dish.price.toLocaleString()} VNĐ</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
