import { useState } from "react";

const useGetMessages = () => {
const [isLoading,setIsLoading] = useState(false)
  const getMessages = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "POST",
        credentials: 'include',
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
