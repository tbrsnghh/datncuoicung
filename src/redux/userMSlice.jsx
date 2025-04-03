import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://localhost:8081/api";

// Hàm helper để xử lý trạng thái pending, fulfilled, rejected
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

// Thunk: Lấy danh sách người dùng
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}/users`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Thunk: Tạo người dùng mới
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${BaseURL}/users`, userData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create user");
    }
  }
);

// Thunk: Cập nhật thông tin người dùng
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({id, ...userData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${BaseURL}/users/${id}`, userData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

// Thunk: Xóa người dùng
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${BaseURL}/users/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete user");
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Slice
const userMSlice = createSlice({
  name: "userM",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, handleRejected)

      // Create user
      .addCase(createUser.pending, handlePending)
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.rejected, handleRejected)

      // Update user
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.user.id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
        state.loading = false;
      })
      .addCase(updateUser.rejected, handleRejected)

      // Delete user
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, handleRejected);
  },
});

export default userMSlice.reducer;
