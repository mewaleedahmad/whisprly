import { toast } from "react-hot-toast";
import { API_URL } from "../constants";
import { useAuthContext } from "../context/AuthContext";

const useRejectFriendRequest = () => {
  const {authUser,setAuthUser} = useAuthContext()
  const rejectFriendRequest = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/friends/request/reject/${id}`, {
        method: "DELETE",
        headers:{
          'Authorization': `Bearer ${authUser.token}`
        }
      });
       await response.json();

      if (response.status === 401) {
        localStorage.removeItem("authUser");
        setAuthUser(null);
        return null;
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return { rejectFriendRequest };
};

export default useRejectFriendRequest;
