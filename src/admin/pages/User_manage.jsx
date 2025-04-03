import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, createUser, updateUser } from "../../redux/userMSlice";
import { DeleteBtn, EditBtn, DetailBtn } from "../components/mini/Btn";
import { UserForm, UserDetail } from "../components/user/usercom";
import Swal from "sweetalert2";
export default function UserManage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.userM);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm)
      )
    );
  }, [users, searchTerm]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d63384',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id)).then(() => {
          Swal.fire({
            title: 'Đã xóa!',
            text: 'Người dùng đã được xóa thành công.',
            icon: 'success',
            confirmButtonColor: '#d63384'
          });
        });
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDetail = (user) => {
    setSelectedUser(user);
    setShowDetail(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setShowForm(true);
  };

  return (
    <div className="w-full p-6 bg-[#f8f9fa] min-h-screen">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-[#d63384] mb-6 text-center">
        Quản lý khách hàng
      </h1>

      {/* Thanh công cụ */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button 
          onClick={handleAdd}
          className="bg-[#d63384] text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#c21867] transition"
        >
          ➕ Thêm khách hàng
        </button>
        <p className="border border-[#f5c518] px-4 py-2 rounded-full w-56 text-center">
          Tổng số khách hàng{" "}
          <span className="text-[#f5c518]">{users.length}</span>
        </p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Tìm khách hàng..."
          className="border border-gray-300 px-4 py-2 rounded-full flex-1 shadow-md"
        />
      </div>

      {loading && <div className="text-center">Đang tải...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Danh sách khách hàng */}
      <div className="border rounded-lg p-4 bg-white shadow-lg">
        <table className="w-full border-collapse text-center">
          <thead className="bg-[#f9c5d1] text-[#d63384]">
            <tr className="border-b">
              <th className="p-3">Tên khách hàng</th>
              <th className="p-3">Email</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-[#fff5f7] transition"
              >
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3 space-x-2">
                  <DetailBtn onclick={() => handleDetail(user)} />
                  <EditBtn onclick={() => handleEdit(user)} />
                  <DeleteBtn onclick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserForm 
          user={selectedUser}
          isEdit={isEdit}
          onClose={() => setShowForm(false)}
        />
      )}

      {showDetail && (
        <UserDetail
          user={selectedUser}
          onClose={() => setShowDetail(false)}
        />
      )}
    </div>
  );
}
