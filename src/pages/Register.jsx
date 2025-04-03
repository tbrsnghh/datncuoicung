import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/authSlice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const result = await dispatch(registerUser({ username, email, password }));

      if (registerUser.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Đăng ký thất bại", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-rose-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-6 text-rose-500">
            Đăng ký tài khoản
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-rose-500">
              Tên đăng nhập
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              placeholder="Tên của bạn"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-rose-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-rose-500">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="example@gmail.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-rose-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-rose-500">
              Mật khẩu
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-rose-500"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-rose-500 text-white font-semibold py-2 rounded-md hover:bg-rose-600 transition duration-200"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="mt-4 text-center text-sm text-gray-600">
            Đã có tài khoản?
            <Link to="/login" className="text-rose-500 hover:underline">
              {" "}
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
