import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Step1GeneralInfo from "../components/booking/Step1GeneralInfo";
import Step2SelectHall from "../components/booking/Step2SelectHall";
import Step3SelectMenu from "../components/booking/Step3SelectMenu";
import Step4Expense from "../components/booking/Step4Expense";
import Step5Confirmation from "../components/booking/Step5Confirmation";

const Booking = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1); // 🌟 Lưu bước hiện tại
  
  const [eventInfo, setEventInfo] = useState({
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    tableCount: 0,
    guestCount: 0,
    hallId: 0,
    menuId: 0,
  });
  
  // Nếu chưa đăng nhập, chuyển hướng về login
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 3000);
    }
  }, [token, navigate, location]);

  if (!token) {
    return (
      <div className="bg-pastel-pink-light p-4 text-center flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Bạn chưa đăng nhập</h1>
        <p>Cần đăng nhập để đặt tiệc</p>
        <p>Đang chuyển hướng đến đăng nhập... 🤗</p>
      </div>
    );
  }
  
  // 🌟 Chọn component hiển thị dựa trên bước hiện tại
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1GeneralInfo eventInfo={eventInfo} setEventInfo={setEventInfo} />;
      case 2:
        return <Step2SelectHall eventInfo={eventInfo} setEventInfo={setEventInfo}/>;
      case 3:
        return <Step3SelectMenu eventInfo={eventInfo} setEventInfo={setEventInfo}/>;
      case 4:
        return <Step4Expense />;
      case 5:
        return <Step5Confirmation />;
      default:
        return <Step1GeneralInfo />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-pastel-pink-light p-4 text-center flex flex-col">
      <h1 className="text-6xl font-bold font-dancing-script text-center mb-6">Đặt Tiệc</h1>

      {/* 🌟 Hiển thị bước hiện tại */}
      {renderStep()}

      {/* 🌟 Hiển thị tiến trình */}
      <div className="flex items-center space-x-4 justify-center absolute bottom-4 left-0 right-0">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="bg-rose-500 text-white px-4 py-2 rounded transition hover:bg-rose-600"
          >
            ← Quay lại
          </button>
        )}
        <p>Bước {step} / 5</p>
        {step < 5 && (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-rose-500 text-white px-4 py-2 rounded transition hover:bg-rose-600"
          >
            Tiếp theo →
          </button>
        )}
      </div>
    </div>
  );
};

export default Booking;
