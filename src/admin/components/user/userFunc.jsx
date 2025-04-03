import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe, logout } from "../../../redux/authSlice";

const handleGetMe = async (dispatch, token, user) => {
  if (token && !user) {
    try {
      await dispatch(getMe()).unwrap();
    } catch (err) {
      console.error("Lấy thông tin user thất bại:", err);
      if (token) {
        dispatch(logout());
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }
};
export  {handleGetMe};
