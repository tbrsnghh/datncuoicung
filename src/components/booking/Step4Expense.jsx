import React from 'react';
import { useSelector } from 'react-redux';

export default function Step4Expense({ eventInfo }) {
  console.log(eventInfo);
  
  const halls = useSelector((state) => state.hall.halls);
  const menus = useSelector((state) => state.menu.menu);
  
  const selectedHall = halls && halls[eventInfo.hallId];
  const selectedMenu = menus && menus[eventInfo.menuId];
  
  const hallPrice = selectedHall ? selectedHall.price : 0;
  console.log(hallPrice);
  const menuPrice = selectedMenu ? selectedMenu.totalPrice : 0;
  console.log(menuPrice);
  const totalPrice = hallPrice + menuPrice;

  return (
    <div className="w-5/6 mx-auto text-left bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Chi phí dự kiến</h2>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium mb-2">Chi tiết chi phí</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Thuê hội trường:</span>
              <span>{hallPrice.toLocaleString()} VNĐ</span>
            </div>
            <div className="flex justify-between">
              <span>Menu:</span>
              <span>{menuPrice.toLocaleString()} VNĐ</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Tổng cộng:</span>
              <span>{totalPrice.toLocaleString()} VNĐ</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-medium mb-2">Thông tin đặt tiệc</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Tên sự kiện:</span> {eventInfo.eventName}</p>
            <p><span className="font-medium">Ngày tổ chức:</span> {eventInfo.eventDate}</p>
            <p><span className="font-medium">Thời gian:</span> {eventInfo.startTime} - {eventInfo.endTime}</p>
            <p><span className="font-medium">Số bàn:</span> {eventInfo.tableCount}</p>
            <p><span className="font-medium">Số khách:</span> {eventInfo.guestCount}</p>
            <p><span className="font-medium">Hội trường:</span> {selectedHall?.name}</p>
            <p><span className="font-medium">Menu:</span> {selectedMenu?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
