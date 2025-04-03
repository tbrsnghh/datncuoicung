import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://localhost:8081/";

// Hàm helper để xử lý trạng thái pending, fulfilled, rejected
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Thunk: Đăng ký
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseURL}auth/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Đăng ký thất bại");
    }
  }
);

// Thunk: Đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseURL}auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('clear token');
        
        // Xóa token nếu lỗi 401
        const state = getState();
        state.auth.token = null;
        localStorage.removeItem("token");
      }
      return rejectWithValue(error.response?.data || "Đăng nhập thất bại");
    }
  }
);

// Thunk: Lấy thông tin người dùng
export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Lấy token từ state
    if (!token) return rejectWithValue("Bạn chưa đăng nhập!");

    try {
      const response = await axios.get(`${BaseURL}api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi lấy thông tin user");
    }
  }
);
// edit thông tin user
export const editMe = createAsyncThunk(
  "auth/editMe",
  async ({ email, username, birth, gender, phone, address }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Lấy token từ state
      if (!token) return rejectWithValue("Bạn chưa đăng nhập!");

      const response = await axios.put(
        `${BaseURL}api/me`, 
        { email, username, birth, gender, phone, address }, // Body request
        { headers: { Authorization: `Bearer ${token}` } } // Headers
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi cập nhật thông tin user");
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Đăng nhập
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      })

      // Đăng ký
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, handleRejected)

      // Lấy thông tin user
      .addCase(getMe.pending, handlePending)
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getMe.rejected, handleRejected)
      .addCase(editMe.pending, handlePending)
      .addCase(editMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(editMe.rejected, handleRejected);
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
