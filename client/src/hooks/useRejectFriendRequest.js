import { toast } from "react-hot-toast";
import { API_URL, token } from "../constants";

const useRejectFriendRequest = () => {
  const rejectFriendRequest = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/friends/request/reject/${id}`, {
        method: "DELETE",
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return { rejectFriendRequest };
};

export default useRejectFriendRequest;
