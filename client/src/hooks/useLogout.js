import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
const {setAuthUser} = useAuthContext()
  const logout = async () => {

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      localStorage.removeItem("authUser");
      setAuthUser(null)
      toast.success(data.message);

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
};
return  {logout} ;
};

export default useLogout;
