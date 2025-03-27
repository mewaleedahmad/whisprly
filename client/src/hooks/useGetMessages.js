import { useState } from "react";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const {authUser,setAuthUser} = useAuthContext()
const [isLoading,setIsLoading] = useState(false)
  const getMessages = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "POST",
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

      return data
    }catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally{
      setIsLoading(false)
    }
  };
  return { getMessages,isLoading };
};

export default useGetMessages;
