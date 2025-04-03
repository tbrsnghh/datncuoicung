import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./admin/Admin";
import User_manage from "./admin/pages/User_manage";
import MenuManage from "./admin/pages/Menu_manage";
import HallManage from "./admin/pages/Hall_manage";
import Sidebar from "./admin/components/sidebar/Sidebar";
import ProtectedRoute from "./admin/ProtectedRoute";
import Home from "./pages/Home";
import CreateMenuP from "./admin/pages/CreateMenuP";
import DishManage from "./admin/pages/DishManage";
import SanhTiec from "./user/pages/SanhTiec";
import Thucdon from "./user/pages/Thucdon";
import Lienhe from "./user/components/lienhe/Lienhe";
import ThiepCuoi from "./user/components/thiepcuoi/thiepcuoi";
import ThiepCuoiEditor from "./user/components/thiepcuoi/editthiepcuoi";
import CreateHallP from "./admin/pages/CreateHallP";
import BookingSuccess from "./pages/BookingSuccess";
import EventManage from "./admin/pages/EventManage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/sanhtiec" element={<SanhTiec />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/Thucdon" element={<Thucdon />} />
        <Route path="/Lienhe" element={<Lienhe />} />
        <Route path="/thiepcuoi" element={<ThiepCuoi />} />
        <Route path="/edit-template/:id" element={<ThiepCuoiEditor />} />
        {/* login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* admin */}
        {/* <Route  path="/admin" element={<ProtectedRoute><Sidebar /><Admin /></ProtectedRoute>}/> */}
        <Route  path="/admin/home" element={<ProtectedRoute><Sidebar /><Admin /></ProtectedRoute>}/>
        <Route  path="/admin/users" element={<ProtectedRoute><Sidebar /><User_manage/></ProtectedRoute>}/>
        <Route  path="/admin/menu" element={<ProtectedRoute><Sidebar /><MenuManage/></ProtectedRoute>}/>
        <Route  path="/admin/menu/create" element={<ProtectedRoute><Sidebar /><CreateMenuP/></ProtectedRoute>}/>
        <Route  path="/admin/dishes" element={<ProtectedRoute><Sidebar /><DishManage/></ProtectedRoute>}/>

        <Route  path="/admin/halls" element={<ProtectedRoute><Sidebar /><HallManage/></ProtectedRoute>}/>
        <Route  path="/admin/hall/create" element={<ProtectedRoute><Sidebar /><CreateHallP/></ProtectedRoute>}/>
        <Route  path="/booking-success" element={<BookingSuccess/>}/>
        <Route  path="/admin/event" element={<ProtectedRoute><Sidebar /><EventManage/></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
