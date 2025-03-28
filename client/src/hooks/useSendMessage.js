import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


const useSendMessage = () => {
  const {authUser,setAuthUser} = useAuthContext()

    const sendMessage = async (id,msgData) => {
      try {
        const response = await fetch(`${API_URL}/api/messages/send/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        },
        body: JSON.stringify(msgData),

        });
        await response.json();
  
        if (response.status === 401) {
          localStorage.removeItem("authUser");
          setAuthUser(null);
          return null
        }

        if(!response.ok){
          throw new Error("Something went wrong")
        }
  
      } catch (error) {
        toast.error(error.message || "Something went wrong")
      }
    };
    return { sendMessage };
  };
  
  export default useSendMessage;
  