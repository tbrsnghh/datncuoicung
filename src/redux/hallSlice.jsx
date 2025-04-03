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

// thunk
export const fetchHalls = createAsyncThunk(
  "hall/fetchHalls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseURL}/hall`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch halls");
    }
  }
);

export const createHall = createAsyncThunk(
  "hall/createHall",
  async (hall, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${BaseURL}/hall`, hall, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create hall");
    }
  }
);

export const updateHall = createAsyncThunk(
  "hall/updateHall", 
  async ({id, ...hallData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${BaseURL}/hall/${id}`, hallData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update hall");
    }
  }
);

export const deleteHall = createAsyncThunk(
  "hall/deleteHall",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${BaseURL}/hall/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete hall");
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  halls: [],
  loading: false,
  error: null,
};

// Slice
const hallSlice = createSlice({
  name: "hall",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHalls.pending, handlePending)
      .addCase(fetchHalls.fulfilled, (state, action) => {
        state.halls = action.payload;
        state.loading = false;
      })
      .addCase(fetchHalls.rejected, handleRejected)
      .addCase(createHall.pending, handlePending)
      .addCase(createHall.fulfilled, (state, action) => {
        state.halls.push(action.payload);
        state.loading = false;
      })
      .addCase(createHall.rejected, handleRejected)
      .addCase(updateHall.pending, handlePending)
      .addCase(updateHall.fulfilled, (state, action) => {
        const index = state.halls.findIndex((hall) => hall.id === action.payload.hall.id);
        if (index !== -1) {
          state.halls[index] = action.payload.hall;
        }
        state.loading = false;
      })
      .addCase(updateHall.rejected, handleRejected)
      .addCase(deleteHall.pending, handlePending)
      .addCase(deleteHall.fulfilled, (state, action) => {
        
        state.halls = state.halls.filter((hall) => hall.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteHall.rejected, handleRejected);
  },
});

export const {} = hallSlice.actions;
export default hallSlice.reducer;
