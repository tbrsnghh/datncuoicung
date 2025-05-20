import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://localhost:8081/";

// Hàm helper để lấy token từ localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Thunk cho việc lấy danh sách món ăn
export const fetchDishes = createAsyncThunk("dish/fetchDishes", async () => {
  const response = await axios.get(`${BaseURL}api/dishes`, getAuthHeader());
  return response.data;
});

// Thunk cho việc thêm món ăn mới
export const addDish = createAsyncThunk("dish/addDish", async (dish) => {
  const response = await axios.post(`${BaseURL}api/dishes`, dish, getAuthHeader());
  return response.data;
});

// Thunk cho việc cập nhật món ăn
export const updateDish = createAsyncThunk("dish/updateDish", async (dish) => {
  const response = await axios.put(`${BaseURL}api/dishes/${dish.id}`, dish, getAuthHeader());
  return response.data;
});

// Thunk cho việc xóa món ăn
export const deleteDish = createAsyncThunk("dish/deleteDish", async (id) => {
  await axios.delete(`${BaseURL}api/dishes/${id}`, getAuthHeader());
  return id;
});

// Thunk cho việc lấy danh sách ảnh của món ăn
export const fetchDishImages = createAsyncThunk(
  "dish/fetchDishImages",
  async (dishId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseURL}api/dishes/${dishId}/images`, getAuthHeader());
      return { dishId, images: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch dish images");
    }
  }
);

// Thunk cho việc tải lên ảnh cho món ăn
export const uploadDishImage = createAsyncThunk(
  "dish/uploadDishImage",
  async ({ dishId, imageFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...getAuthHeader().headers,
        },
      };
      
      const response = await axios.post(`${BaseURL}api/dishes/${dishId}/images`, formData, config);
      console.log("Upload response:", response.data);
      return { dishId, image: response.data };
    } catch (error) {
      console.error("Upload error in thunk:", error);
      return rejectWithValue(error.response?.data || "Failed to upload dish image");
    }
  }
);

// Thunk cho việc xóa ảnh của món ăn
export const deleteDishImage = createAsyncThunk(
  "dish/deleteDishImage",
  async ({ dishId, imageId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${BaseURL}api/dishes/${dishId}/images/${imageId}`, getAuthHeader());
      return { dishId, imageId };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete dish image");
    }
  }
);

// Thunk cho việc đặt ảnh làm ảnh chính
export const setPrimaryDishImage = createAsyncThunk(
  "dish/setPrimaryDishImage",
  async ({ dishId, imageId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BaseURL}api/dishes/${dishId}/images/${imageId}/set-primary`,
        {},
        getAuthHeader()
      );
      return { dishId, image: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to set primary dish image");
    }
  }
);

const initialState = {
  dish: [],
  dishImages: {}, // Lưu trữ ảnh theo dishId
  loading: false,
  error: null,
};

const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dish = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.dish.push(action.payload);
      })
      .addCase(addDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        const updatedDish = action.payload;
        const index = state.dish.findIndex(item => item.id === updatedDish.id);
        if (index >= 0) {
          state.dish[index] = updatedDish;
        }
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dish = state.dish.filter(item => item.id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Thêm các case cho việc quản lý ảnh món ăn
      .addCase(fetchDishImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishImages.fulfilled, (state, action) => {
        const { dishId, images } = action.payload;
        state.dishImages[dishId] = images;
        state.loading = false;
      })
      .addCase(fetchDishImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(uploadDishImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDishImage.fulfilled, (state, action) => {
        const { dishId, image } = action.payload;
        if (!state.dishImages[dishId]) {
          state.dishImages[dishId] = [];
        }
        
        // Kiểm tra xem image có tồn tại không
        if (image) {
          // Kiểm tra xem image có id không
          if (image.id) {
            state.dishImages[dishId].push(image);
          } else {
            // Nếu không có id, thêm một id tạm thời
            state.dishImages[dishId].push({
              ...image,
              id: Date.now(), // Sử dụng timestamp làm id tạm thời
            });
          }
        }
        
        state.loading = false;
      })
      .addCase(uploadDishImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDishImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDishImage.fulfilled, (state, action) => {
        const { dishId, imageId } = action.payload;
        if (state.dishImages[dishId]) {
          state.dishImages[dishId] = state.dishImages[dishId].filter(
            (img) => img.id !== imageId
          );
        }
        state.loading = false;
      })
      .addCase(deleteDishImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setPrimaryDishImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPrimaryDishImage.fulfilled, (state, action) => {
        const { dishId, image } = action.payload;
        if (state.dishImages[dishId]) {
          state.dishImages[dishId] = state.dishImages[dishId].map((img) => ({
            ...img,
            isPrimary: img.id === image.id,
          }));
        }
        state.loading = false;
      })
      .addCase(setPrimaryDishImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { } = dishSlice.actions;
export default dishSlice.reducer;