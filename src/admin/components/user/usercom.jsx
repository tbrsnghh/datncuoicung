import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../../redux/userMSlice';

const UserForm = ({ user, onClose, isEdit = false }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateUser({ id: user.id, ...formData }));
    } else {
      dispatch(createUser(formData));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-2xl font-bold text-[#d63384] mb-4">
          {isEdit ? 'Cập nhật thông tin khách hàng' : 'Thêm khách hàng mới'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Tên khách hàng</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {!isEdit && (
            <div>
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#d63384] text-white rounded-lg hover:bg-[#c21867] transition"
            >
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserDetail = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/20 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
        <div className="space-y-6">
          {/* Tên khách hàng */}
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            {user.username}
          </h3>

          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg col-span-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span>
                <span className="ml-2 break-all">{user.email}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Số điện thoại:</span>
                <span className="ml-2">{user.phone}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Vai trò:</span>
                <span className="ml-2">{user.role}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Ngày sinh:</span>
                <span className="ml-2">{user.birth || 'Chưa cập nhật'}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Giới tính:</span>
                <span className="ml-2">{user.gender || 'Chưa cập nhật'}</span>
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600">
                <span className="font-medium">Địa chỉ:</span>
                <span className="ml-2">{user.address}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#d63384] text-white rounded-lg hover:bg-[#c21867] transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserForm, UserDetail };
