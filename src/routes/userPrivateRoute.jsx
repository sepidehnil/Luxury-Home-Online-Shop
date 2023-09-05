import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const userPrivateRoute = ({ children }) => {
  const accessToken = Cookies.get("accessToken");

  const location = useLocation().pathname;

  return accessToken ? (
    children
  ) : (
    <Navigate to={"/userlogin"} state={{ from: location }} replace />
  );
};

export default userPrivateRoute;
