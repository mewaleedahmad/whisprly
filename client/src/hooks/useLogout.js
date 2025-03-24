import toast from "react-hot-toast";
import {API_URL} from "../config"


import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      localStorage.removeItem("authUser");
      setAuthUser(null);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return { logout };
};

export default useLogout;
