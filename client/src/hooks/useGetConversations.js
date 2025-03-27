import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const {authUser,setAuthUser} = useAuthContext()
  const getConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/conversations`,{
        headers:{
          'Authorization': `Bearer ${authUser.token}`
        }
      });
      const data = await response.json();
      
      if (response.status === 401) {
        localStorage.removeItem("authUser");
        setAuthUser(null);
        return null;
      }
    
      return data;
      
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return { getConversations };
};
export default useGetConversations;
