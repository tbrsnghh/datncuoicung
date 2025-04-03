import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://localhost:8081/";
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const response = await axios.get(`${BaseURL}api/menu`);
  return response.data;
});
export const createMenu = createAsyncThunk("menu/createMenu", async (menu) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${BaseURL}api/menu/createfullmenu`, menu, config);
  return response.data;
});
export const updateMenu = createAsyncThunk("menu/updateMenu", async (menu) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${BaseURL}api/menu/${menu.id}`, menu, config);
  return response.data;
})
export const deleteMenu = createAsyncThunk("menu/deleteMenu", async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${BaseURL}api/menu/${id}`, config);
  return response.data;
});


const initialState = {
  menu: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu.push(action.payload);
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.menu.findIndex(item => item.id == action.payload.id);
        if (index >= 0) {
          state.menu[index] = action.payload;
        }
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = state.menu.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {  } = menuSlice.actions;
export default menuSlice.reducer;