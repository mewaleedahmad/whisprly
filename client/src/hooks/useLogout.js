import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
      });
      const data = await response.json();

     if (response.status === 400) {
        throw new Error(data.message)
      }
     if (response.status === 200) {
        toast.success(data.message)
    }
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return { logout };
};

export default useLogout;
