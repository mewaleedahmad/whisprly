import toast from "react-hot-toast";
import {API_URL} from "../config"


const useGetFriendRequests = () => {
  const getFriendRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/friends/request`,{
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return { getFriendRequests };
};
export default useGetFriendRequests;
