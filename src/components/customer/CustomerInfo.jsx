import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMe } from "../../redux/authSlice";

export default function CustomerInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    birth: user?.birth || "",
    gender: user?.gender || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    dispatch(editMe(formData));
    setIsEditing(false);
  };

  return (
    <>
      <div className="w-1/3 h-min max-w-md bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Thông Tin Khách Hàng
        </h2>
        {/* Hiển thị thông tin khách hàng */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xl">👤</span>
          </div>

          {/* Thông tin */}
          <div className="text-sm text-gray-700 w-full">
            <p>
              <strong>Họ và tên:</strong> {user.username || "N/A"}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {user.birth || "N/A"}
            </p>
            <p>
              <strong>Giới tính:</strong>{" "}
              {user.gender == "male"
                ? "Nam"
                : user.gender == "female"
                ? "Nữ"
                : "Khác" || "Khác"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>SĐT:</strong> {user.phone || "N/A"}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {user.address || "N/A"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 text-sm text-rose-500 hover:text-rose-700 transition"
            >
              ✏️ Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
      {/* Modal chỉnh sửa thông tin */}
      {isEditing && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Chỉnh sửa thông tin
            </h2>

            <div className="space-y-3">
              {[
                { label: "Họ và tên", name: "username", type: "text" },
                { label: "Ngày sinh", name: "birth", type: "date" },
                { label: "SĐT", name: "phone", type: "text" },
                { label: "Địa chỉ", name: "address", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm text-gray-600">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500 text-sm"
                  />
                </div>
              ))}

              {/* Giới tính */}
              <div>
                <label className="text-sm text-gray-600">Giới tính</label>
                <div className="flex space-x-4 mt-1">
                  {["male", "female", "other"].map((gender) => (
                    <label key={gender} className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="form-radio text-rose-500"
                      />
                      <span className="text-gray-700 text-sm">
                        {gender === "male"
                          ? "Nam"
                          : gender === "female"
                          ? "Nữ"
                          : "Khác"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Button hành động */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveClick}
                className="text-sm text-rose-500 hover:text-rose-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
