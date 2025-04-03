import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // if (!user || user.role !== "admin") {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex">
      {children}
    </div>
  );
};

export default ProtectedRoute;
