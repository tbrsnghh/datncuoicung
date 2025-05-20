import React from 'react';

export default function ForgotPass() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Chức năng đang phát triển</h1>
        <p className="text-gray-600 mb-6">
          Tính năng quên mật khẩu hiện chưa khả dụng. Vui lòng quay lại sau hoặc liên hệ quản trị viên nếu cần hỗ trợ.
        </p>
        <a href="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
