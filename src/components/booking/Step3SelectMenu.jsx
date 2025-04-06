import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus } from '../../redux/menuSlice';
import { fetchDishes } from '../../redux/dishSlice';

export default function Step3SelectMenu({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const { menu, loading, error } = useSelector((state) => state.menu);
  const dishes = useSelector((state) => state.dish.dish);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchDishes());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const setMenu = (menuId) => {
    setEventInfo({ ...eventInfo, menuId });
  };

  // Tính tổng giá dựa trên số bàn và giá menu
  const selectedMenu = menu?.find(item => item.id === eventInfo.menuId);
  const totalPrice = selectedMenu && eventInfo.tableCount 
    ? selectedMenu.totalPrice * eventInfo.tableCount 
    : 0;

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Chọn menu và số bàn</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số bàn
          </label>
          <input
            type="number"
            name="tableCount"
            value={eventInfo.tableCount}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border border-gray-300 rounded focus:ring-rose-500 focus:border-rose-500"
            placeholder="Nhập số bàn"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Danh sách menu</h3>
          {loading ? (
            <p>Đang tải menu...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : menu && menu.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menu.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    eventInfo.menuId === item.id
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-rose-200'
                  }`}
                  onClick={() => setMenu(item.id)}
                >
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-rose-600 font-medium mt-2">
                    {item.totalPrice.toLocaleString()} VNĐ
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có menu nào khả dụng</p>
          )}
        </div>

        {selectedMenu && eventInfo.tableCount > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Chi phí menu</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Giá menu:</span>
                <span>{selectedMenu.totalPrice.toLocaleString()} VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span>Số bàn:</span>
                <span>{eventInfo.tableCount}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Tổng cộng:</span>
                <span>{totalPrice.toLocaleString()} VNĐ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
