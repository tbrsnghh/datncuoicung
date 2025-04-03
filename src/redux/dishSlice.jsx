import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://localhost:8081/";
export const fetchDishes = createAsyncThunk("dish/fetchDishes", async () => {
  const response = await axios.get(`${BaseURL}api/dishes`);
  return response.data;
});
export const addDish = createAsyncThunk("dish/addDish", async (dish) => {
  const response = await axios.post(`${BaseURL}api/dishes`, dish);
  return response.data;
})
export const updateDish = createAsyncThunk("dish/updateDish", async (dish) => {
  const response = await axios.put(`${BaseURL}api/dishes/${dish.id}`, dish);
  return response.data;
})
export const deleteDish = createAsyncThunk("dish/deleteDish", async (id) => {
  await axios.delete(`${BaseURL}api/dishes/${id}`);
  return id;
});
const initialState = {
  dish: [],
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
        const index = state.dish.findIndex(item => item.id == action.payload.dish.id);
        console.log(action.payload);
        if (index >= 0) {
          state.dish[index] = action.payload.dish;
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
  },
});

export const {  } = dishSlice.actions;
export default dishSlice.reducer;