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
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  
  const [eventInfo, setEventInfo] = useState({
    userId: user?.id,
    eventName: "",
    eventDate: "",
    hallId: null,
    timeSlotId: null,
    menuId: null,
    numberOfTables: 0,
    guestCount: ""
  });

  // Nếu chưa đăng nhập, chuyển hướng về login
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 3000);
    }
  }, [token, navigate, location]);

  const validateStep = () => {
    setError("");
    switch (step) {
      case 1:
        if (!eventInfo.eventName.trim()) {
          setError("Vui lòng nhập tên sự kiện");
          return false;
        }
        if (!eventInfo.guestCount || parseInt(eventInfo.guestCount) < 1) {
          setError("Số khách phải lớn hơn 0");
          return false;
        }
        break;
      case 2:
        if (!eventInfo.eventDate) {
          setError("Vui lòng chọn ngày tổ chức");
          return false;
        }
        if (eventInfo.hallId === null) {
          setError("Vui lòng chọn một hội trường");
          return false;
        }
        if (eventInfo.timeSlotId === null) {
          setError("Vui lòng chọn một khung giờ");
          return false;
        }
        break;
      case 3:
        if (!eventInfo.tableCount || parseInt(eventInfo.tableCount) < 1) {
          setError("Số bàn phải lớn hơn 0");
          return false;
        }
        if (eventInfo.menuId === null) {
          setError("Vui lòng chọn một menu");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError("");
  };

  const handleHome = () => {
    navigate("/");
  };

  if (!token) {
    return (
      <div className="bg-pastel-pink-light p-4 text-center flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Bạn chưa đăng nhập</h1>
        <p>Cần đăng nhập để đặt tiệc</p>
        <p>Đang chuyển hướng đến đăng nhập... 🤗</p>
      </div>
    );
  }
  
  // Render component dựa trên bước hiện tại
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1GeneralInfo eventInfo={eventInfo} setEventInfo={setEventInfo} />;
      case 2:
        return <Step2SelectHall eventInfo={eventInfo} setEventInfo={setEventInfo} />;
      case 3:
        return <Step3SelectMenu eventInfo={eventInfo} setEventInfo={setEventInfo} />;
      case 4:
        return <Step4Expense eventInfo={eventInfo} />;
      case 5:
        return <Step5Confirmation eventInfo={eventInfo} />;
      default:
        return <Step1GeneralInfo eventInfo={eventInfo} setEventInfo={setEventInfo} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-pastel-pink-light p-4 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="w-full sticky top-0 z-50 bg-pastel-pink-light pt-2 flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleHome}
              className="bg-rose-100 text-rose-700 p-2 rounded-full hover:bg-rose-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold font-dancing-script text-rose-700">Đặt Tiệc</h1>
          </div>

          {/* Progress bar */}
          <div className="flex-1 ml-8">
            <div className="flex justify-between relative">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                    ${step >= num ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-500'}
                    transition-all duration-300`}>
                    {num}
                  </div>
                  <span className={`text-xs whitespace-nowrap ${
                    step >= num ? 'text-rose-500 font-medium' : 'text-gray-500'
                  }`}>
                    {num === 1 && "Thông tin"}
                    {num === 2 && "Hội trường"}
                    {num === 3 && "Menu"}
                    {num === 4 && "Chi phí"}
                    {num === 5 && "Xác nhận"}
                  </span>
                </div>
              ))}
              {/* Connecting line */}
              <div className="absolute top-4 left-0 h-[2px] bg-gray-200 w-full -z-0">
                <div 
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Step content */}
        {renderStep()}

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
          <div className="max-w-6xl mx-auto flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Quay lại
              </button>
            )}
            {step < 5 && (
              <button
                onClick={handleNext}
                className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors ml-auto"
              >
                Tiếp theo →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
