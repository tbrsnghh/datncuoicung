import React, { useEffect, useState } from "react";
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaChartLine, FaUtensils } from "react-icons/fa";
import { MdRestaurantMenu, MdMeetingRoom } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenus } from "../redux/menuSlice";
import { fetchUsers } from "../redux/userMSlice";
import { fetchAllEvents } from "../redux/bookingSlice";
import { fetchHalls } from "../redux/hallSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.menu);
  const { users } = useSelector((state) => state.userM);
  const { bookings } = useSelector((state) => state.booking);
  const { halls } = useSelector((state) => state.hall);

  useEffect(() => {
    dispatch(fetchMenus());
    dispatch(fetchUsers());
    dispatch(fetchAllEvents());
    dispatch(fetchHalls());
  }, []);

  // tổng event pending
  const pendingEvents = bookings?.filter(event => event.status === 'pending')?.length || 0;
  
  // tiệc đã tổ chức (status = done)
  const doneEvents = bookings?.filter(event => event.status === 'done')?.length || 0;
  
  // doanh thu từ các tiệc đã thanh toán và đã tổ chức (status = paid hoặc done)
  const totalRevenue = bookings?.reduce((total, event) => {
    if (event.status === 'paid' || event.status === 'done') {
      return total + Number(event.totalPrice || 0);
    }
    return total;
  }, 0) || 0;

  // tổng số tiệc (trừ cancelled)
  const totalActiveEvents = bookings?.filter(event => event.status !== 'cancelled')?.length || 0;

  // thong ke su dung sanh (tính tất cả tiệc trừ cancelled)
  const hallUsage = halls?.map(hall => {
    const hallEvents = bookings?.filter(event => event.hallId === hall.id && event.status !== 'cancelled') || [];
    const totalEvents = hallEvents.length;
    const percentage = totalEvents > 0 ? (totalEvents / totalActiveEvents * 100).toFixed(0) : 0;
    
    return {
      name: hall.name,
      value: Number(percentage)
    };
  }).sort((a, b) => b.value - a.value) || [];
  
  // thong ke thực đơn phổ biến (tính tất cả tiệc trừ cancelled)
  const menuUsage = menu?.map(menuItem => {
    const menuEvents = bookings?.filter(event => event.menuId === menuItem.id && event.status !== 'cancelled') || [];
    const totalEvents = menuEvents.length;
    const percentage = totalEvents > 0 ? (totalEvents / totalActiveEvents * 100).toFixed(0) : 0;
    
    return {
      name: menuItem.name,
      value: Number(percentage)
    };
  }).sort((a, b) => b.value - a.value) || [];

  // Dữ liệu giả lập cho biểu đồ doanh thu
  const [stats] = useState({
    doanhThuTheoThang: [350, 420, 510, 430],
  });

  return (
    <div className="p-6 bg-gray-50 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Quản trị</h1>
        <p className="text-gray-600">Tổng quan dữ liệu nhà hàng tiệc cưới Diamond Palace</p>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Doanh thu tiệc đã thanh toán</p>
              <h2 className="text-2xl font-bold text-gray-800">{totalRevenue.toLocaleString('vi-VN')} VNĐ</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMoneyBillWave className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tiệc đã tổ chức</p>
              <h2 className="text-2xl font-bold text-gray-800">{doneEvents}</h2>
              <p className="text-gray-500 text-sm">Tổng số tiệc đã hoàn thành</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCalendarAlt className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-500">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Khách hàng</p>
              <h2 className="text-2xl font-bold text-gray-800">{users.length}</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUsers className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-amber-500">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Đơn đặt tiệc mới</p>
              <h2 className="text-2xl font-bold text-gray-800">{pendingEvents}</h2>
              <p className="text-gray-500 text-sm">Chờ xác nhận</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <FaUtensils className="text-amber-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 lg:col-span-2 relative">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Biểu đồ doanh thu (triệu đồng)</h3>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Năm 2024</option>
              <option>Năm 2023</option>
            </select>
          </div>
          
          {/* Overlay cho phần đang phát triển */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="text-center bg-white/80 px-4 py-2 rounded-lg shadow-lg">
              <p className="text-gray-700 font-medium">Chức năng đang được triển khai</p>
              <p className="text-gray-600 text-sm mt-1">Sắp ra mắt trong phiên bản tiếp theo</p>
            </div>
          </div>

          {/* Vẽ biểu đồ đường */}
          <div className="h-64 border-b border-l border-gray-300 relative">
            {/* Vẽ trục y */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between">
              <span className="text-xs text-gray-500 transform -translate-x-2">600</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">500</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">400</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">300</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">200</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">100</span>
              <span className="text-xs text-gray-500 transform -translate-x-2">0</span>
            </div>
            
            {/* Vẽ grid */}
            <div className="absolute left-0 top-0 w-full h-full">
              <div className="h-1/6 border-t border-gray-200"></div>
              <div className="h-1/6 border-t border-gray-200"></div>
              <div className="h-1/6 border-t border-gray-200"></div>
              <div className="h-1/6 border-t border-gray-200"></div>
              <div className="h-1/6 border-t border-gray-200"></div>
              <div className="h-1/6 border-t border-gray-200"></div>
            </div>
            
            {/* Đường dọc để dễ nhìn */}
            <div className="absolute top-0 h-full w-full flex justify-between">
              {stats.doanhThuTheoThang.map((_, index) => (
                <div 
                  key={index} 
                  className="border-r border-gray-200 h-full flex-1"
                ></div>
              ))}
            </div>
            
            {/* Vẽ đường */}
            <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                </linearGradient>
              </defs>
              {/* Đường biểu đồ */}
              <polyline
                points={stats.doanhThuTheoThang.map((value, index) => {
                  const x = (index / (stats.doanhThuTheoThang.length - 1)) * 100;
                  const y = 100 - (value / 600) * 100;
                  return `${x}% ${y}%`;
                }).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinejoin="round"
                className="transform scale-x-98 translate-x-2"
              />
              
              {/* Diện tích dưới đường */}
              <polygon
                points={`
                  0,100 
                  ${stats.doanhThuTheoThang.map((value, index) => {
                    const x = (index / (stats.doanhThuTheoThang.length - 1)) * 100;
                    const y = 100 - (value / 600) * 100;
                    return `${x}% ${y}%`;
                  }).join(' ')}
                  100,100
                `}
                fill="url(#chart-gradient)"
                className="transform scale-x-98 translate-x-2"
              />
              
              {/* Điểm trên đường */}
              {stats.doanhThuTheoThang.map((value, index) => {
                const x = (index / (stats.doanhThuTheoThang.length - 1)) * 100;
                const y = 100 - (value / 600) * 100;
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="6"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    className="transform scale-x-98 translate-x-2"
                  />
                );
              })}
              
              {/* Hiển thị giá trị */}
              {stats.doanhThuTheoThang.map((value, index) => {
                const x = (index / (stats.doanhThuTheoThang.length - 1)) * 100;
                const y = 100 - (value / 600) * 100;
                return (
                  <text
                    key={index}
                    x={`${x}%`}
                    y={`${y - 5}%`}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#3b82f6"
                    className="transform scale-x-98 translate-x-2"
                  >
                    {value}
                  </text>
                );
              })}
            </svg>
            
            {/* Trục x */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 transform translate-y-4">
              <span className="text-xs font-semibold text-gray-700">T1/2024</span>
              <span className="text-xs font-semibold text-gray-700">T2/2024</span>
              <span className="text-xs font-semibold text-gray-700">T3/2024</span>
              <span className="text-xs font-semibold text-gray-700">T4/2024</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê theo sảnh</h3>
          <div className="space-y-4">
            {hallUsage.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hàng thống kê cuối */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Thực đơn phổ biến</h3>
            <MdRestaurantMenu className="text-gray-500 text-xl" />
          </div>
          <div className="space-y-4">
            {menuUsage.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Tổng quan tài chính</h3>
            <FaChartLine className="text-gray-500 text-xl" />
          </div>

          {/* Overlay cho phần đang phát triển */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="text-center bg-white/80 px-4 py-2 rounded-lg shadow-lg">
              <p className="text-gray-700 font-medium">Chức năng đang được triển khai</p>
              <p className="text-gray-600 text-sm mt-1">Sắp ra mắt trong phiên bản tiếp theo</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Doanh thu tiệc đã thanh toán</p>
              <h4 className="text-xl font-bold text-gray-800">{totalRevenue.toLocaleString('vi-VN')} VNĐ</h4>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Chi phí vận hành</p>
              <h4 className="text-xl font-bold text-gray-800">1.853.000.000 ₫</h4>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Giá trị trung bình/tiệc</p>
              <h4 className="text-xl font-bold text-gray-800">
                {doneEvents > 0 
                  ? (totalRevenue / doneEvents).toLocaleString('vi-VN') 
                  : '0'} VNĐ
              </h4>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Số lượng tiệc đã tổ chức</p>
              <h4 className="text-xl font-bold text-gray-800">{doneEvents}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
