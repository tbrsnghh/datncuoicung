import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMe, login, logout } from "../redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, user, token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Lấy user khi có token
  useEffect(() => {
    if (token && !user) {
      dispatch(getMe()).unwrap()
        .catch((err) => {
          console.error("Lấy thông tin user thất bại:", err);
          token && dispatch(logout());
          localStorage.removeItem("token");
window.location.reload();

        });
    }
  }, [token, user, dispatch]);

  // ✅ Điều hướng khi đã có user, cho cả trường hợp chuyển đến từ trang khác
  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from || (user.role === "admin" ? "/admin/home" : "/");
      navigate(redirectTo);
    }
  }, [user, navigate, location.state]);

  const handleLogin = async () => {
    if (loading) return; // Ngăn chặn spam click khi đang loading
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-rose-500">
          Đăng nhập
        </h2>

        {/* ✅ Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-rose-500">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="nhh@gmail.com"
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
          onClick={handleLogin}
          disabled={loading} // ✅ Chặn click khi loading
          className={`w-full text-white font-semibold py-2 rounded-md transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-rose-500 hover:bg-rose-600"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?
          <Link to="/register" className="text-rose-500 hover:underline">
            {" "}
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
