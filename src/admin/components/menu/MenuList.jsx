import React from "react";

export default function MenuList({ menus, openModal }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg flex-grow max-h-200">
      <h2 className="text-2xl font-bold text-[#d63384] mb-4">
        Danh sách thực đơn
      </h2>
      
      <div className="max-h-[400px] overflow-y-auto ">
        <table className="w-full border-collapse text-center">
          {/* Chia thead và tbody thành block để giữ layout */}
          <thead className="bg-[#f9c5d1] text-[#d63384] sticky top-0 block w-full">
            <tr className="border-b grid grid-cols-4">
              <th className="p-3">Tên thực đơn</th>
              <th className="p-3">Mô tả</th>
              <th className="p-3">Số món</th>
              <th className="p-3">Ngày tạo</th>
            </tr>
          </thead>

          <tbody className="block w-full">
            {menus &&
              menus.map((menu) => (
                <tr
                  key={menu.id}
                  className="border-b hover:bg-[#fff5f7] transition grid grid-cols-4"
                  onClick={() => openModal(menu)}
                >
                  <td className="p-3 font-semibold">{menu.name}</td>
                  <td className="p-3 text-gray-600">{menu.description}</td>
                  <td className="p-3">{menu.Dishes.length}</td>
                  <td className="p-3">
                    {new Date(menu.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
