import { useState } from "react";
import {API_URL, token} from "../constants"

const useGetMessages = () => {
const [isLoading,setIsLoading] = useState(false)
  const getMessages = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/messages/${id}`, {
        method: "POST",
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data
    }catch (error) {
      console.log(error.getMessages, "Error in useGetMessages");
    } finally{
      setIsLoading(false)
    }
  };
  return { getMessages,isLoading };
};

export default useGetMessages;
