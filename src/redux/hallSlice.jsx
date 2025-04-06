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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}/hall`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch halls");
    }
  }
);

export const fetchTimeSlots = createAsyncThunk(
  "hall/fetchTimeSlots",
  async ({ hallId, date }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}/hall/${hallId}/available-time-slots`, {
        params: { date },
        ...config
      });
      // API trả về { hallId, date, availableTimeSlots: [...] }
      return response.data.availableTimeSlots;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch time slots");
    }
  }
);

export const checkHallAvailability = createAsyncThunk(
  "hall/checkHallAvailability",
  async ({ hallId, eventDate, timeSlotId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${BaseURL}/event/check-hall-availability`,
        { hallId, eventDate, timeSlotId },
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to check hall availability");
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

// New thunks for hall images
export const fetchHallImages = createAsyncThunk(
  "hall/fetchHallImages",
  async (hallId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BaseURL}/hall/${hallId}/images`, config);
      return { hallId, images: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch hall images");
    }
  }
);

export const uploadHallImage = createAsyncThunk(
  "hall/uploadHallImage",
  async ({ hallId, imageFile }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      
      const response = await axios.post(`${BaseURL}/hall/${hallId}/images`, formData, config);
      console.log("Upload response:", response.data);
      return { hallId, image: response.data };
    } catch (error) {
      console.error("Upload error in thunk:", error);
      return rejectWithValue(error.response?.data || "Failed to upload hall image");
    }
  }
);

export const deleteHallImage = createAsyncThunk(
  "hall/deleteHallImage",
  async ({ hallId, imageId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${BaseURL}/hall/${hallId}/images/${imageId}`, config);
      return { hallId, imageId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete hall image");
    }
  }
);

export const setPrimaryHallImage = createAsyncThunk(
  "hall/setPrimaryHallImage",
  async ({ hallId, imageId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`${BaseURL}/hall/${hallId}/images/${imageId}/set-primary`, {}, config);
      return { hallId, image: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to set primary hall image");
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  halls: [],
  timeSlots: [],
  hallImages: {},
  loading: false,
  error: null,
};

// Slice
const hallSlice = createSlice({
  name: "hall",
  initialState,
  reducers: {
    clearTimeSlots: (state) => {
      state.timeSlots = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHalls.pending, handlePending)
      .addCase(fetchHalls.fulfilled, (state, action) => {
        state.halls = action.payload;
        state.loading = false;
      })
      .addCase(fetchHalls.rejected, handleRejected)
      .addCase(fetchTimeSlots.pending, handlePending)
      .addCase(fetchTimeSlots.fulfilled, (state, action) => {
        state.timeSlots = action.payload;
        state.loading = false;
      })
      .addCase(fetchTimeSlots.rejected, handleRejected)
      .addCase(checkHallAvailability.pending, handlePending)
      .addCase(checkHallAvailability.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkHallAvailability.rejected, handleRejected)
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
      .addCase(deleteHall.rejected, handleRejected)
      // New cases for hall images
      .addCase(fetchHallImages.pending, handlePending)
      .addCase(fetchHallImages.fulfilled, (state, action) => {
        const { hallId, images } = action.payload;
        state.hallImages[hallId] = images;
        const hallIndex = state.halls.findIndex(hall => hall.id === hallId);
        if (hallIndex !== -1) {
          state.halls[hallIndex].images = images; // Add images to the corresponding hall
        }
        state.loading = false;
      })
      .addCase(fetchHallImages.rejected, handleRejected)
      .addCase(uploadHallImage.pending, handlePending)
      .addCase(uploadHallImage.fulfilled, (state, action) => {
        const { hallId, image } = action.payload;
        if (!state.hallImages[hallId]) {
          state.hallImages[hallId] = [];
        }
        
        // Kiểm tra xem image có tồn tại không
        if (image) {
          // Kiểm tra xem image có id không
          if (image.id) {
            state.hallImages[hallId].push(image);
          } else {
            // Nếu không có id, thêm một id tạm thời
            state.hallImages[hallId].push({
              ...image,
              id: Date.now(), // Sử dụng timestamp làm id tạm thời
            });
          }
        }
        
        state.loading = false;
      })
      .addCase(uploadHallImage.rejected, handleRejected)
      .addCase(deleteHallImage.pending, handlePending)
      .addCase(deleteHallImage.fulfilled, (state, action) => {
        const { hallId, imageId } = action.payload;
        if (state.hallImages[hallId]) {
          state.hallImages[hallId] = state.hallImages[hallId].filter(
            (img) => img.id !== imageId
          );
        }
        state.loading = false;
      })
      .addCase(deleteHallImage.rejected, handleRejected)
      .addCase(setPrimaryHallImage.pending, handlePending)
      .addCase(setPrimaryHallImage.fulfilled, (state, action) => {
        const { hallId, image } = action.payload;
        if (state.hallImages[hallId]) {
          state.hallImages[hallId] = state.hallImages[hallId].map((img) => ({
            ...img,
            isPrimary: img.id === image.id,
          }));
        }
        state.loading = false;
      })
      .addCase(setPrimaryHallImage.rejected, handleRejected);
  },
});

export const { clearTimeSlots } = hallSlice.actions;
export default hallSlice.reducer;
