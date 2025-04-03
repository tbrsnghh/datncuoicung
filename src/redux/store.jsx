import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import menuReducer from "./menuSlice";
import hallReducer from "./hallSlice";
import dishReducer from "./dishSlice";
import userMSlice from "./userMSlice";
import bookingReducer from "./bookingSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    hall: hallReducer,
    dish: dishReducer,
    userM: userMSlice,
    booking: bookingReducer
  },
});
