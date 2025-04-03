import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      <Link to="/booking">booking</Link>
    </div>
  );
};

export default Admin;
