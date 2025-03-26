import toast from "react-hot-toast";
import {API_URL} from "../config"
import useGlobalState from "../zustand/useGlobalState";


const useGetConversations = () => {
  const {token} = useGlobalState()
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
