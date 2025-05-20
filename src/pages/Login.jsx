import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getMe, login, logout } from "../redux/authSlice";
import Swal from 'sweetalert2';

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

  // Xử lý lỗi từ Redux state
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại!',
        text: error.message || 'Email hoặc mật khẩu không đúng',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e11d48',
      });
    }
  }, [error]);

  const handleLogin = async () => {
    if (loading) return; // Ngăn chặn spam click khi đang loading

    // Kiểm tra các trường bắt buộc
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin!',
        text: 'Vui lòng điền đầy đủ email và mật khẩu',
        confirmButtonText: 'OK',
        confirmButtonColor: '#e11d48',
      });
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Đăng nhập thất bại';
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại!',
        text: errorMessage,
        confirmButtonText: 'OK',
        confirmButtonColor: '#e11d48',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-100">
      <div className="flex items-center gap-4 absolute top-20">
        <Link to="/" className="text-rose-500 hover:text-rose-600">
          <h1 className="text-5xl font-bold text-rose-500 dancing-script-b">
            Nhà hàng tiệc cưới Đông Á
          </h1>
        </Link>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-rose-500">
          Đăng nhập
        </h2>

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
          disabled={loading}
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
          <span className="block mt-2">
            <Link to="/forgot-password" className="text-rose-500 hover:underline">
              Quên mật khẩu?
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
