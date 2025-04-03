import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import useGlobalState from "../zustand/useGlobalState";

const useSendMessage = () => {
  const {authUser, setAuthUser} = useAuthContext()
  const {setMessages} = useGlobalState()

  const sendMessage = async (id, msgData) => {
    const tempId = uuidv4();
    const tempMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: id,
      message: msgData.message?.message || "",
      image: msgData.image || "",
      createdAt: new Date().toISOString(),
      seen: false,
      isOptimistic: true
    };

    setMessages(prevMessages => 
      Array.isArray(prevMessages) ? [...prevMessages, tempMessage] : [tempMessage]
    );

    try {
      const response = await fetch(`${API_URL}/api/messages/send/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`
        },
        body: JSON.stringify(msgData),
      });
      
      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("authUser");
        setAuthUser(null);
        return null;
      }

      if(!response.ok){
        setMessages(prevMessages => 
          prevMessages.filter(msg => msg._id !== tempId)
        );
        throw new Error("Something went wrong");
      }

      return data;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg._id !== tempId)
      );
    }
  };
  return { sendMessage };
};

export default useSendMessage;
