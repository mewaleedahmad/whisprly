import toast from "react-hot-toast";
import {API_URL, token} from "../constants"


const useGetConversations = () => {
  const getConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/conversations`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
      
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return { getConversations };
};
export default useGetConversations;
