import toast from "react-hot-toast";

const useGetConversations = () => {
  const getConversations = async () => {
    try {
      const response = await fetch("/api/messages/conversations",{
        credentials: 'include',
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
