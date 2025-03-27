import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const {authUser,setAuthUser} = useAuthContext()

    const sendMessage = async (id,message) => {
      try {
        const response = await fetch(`${API_URL}/api/messages/send/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
        },
        body: JSON.stringify(message),

        });
        await response.json();
  
        if (response.status === 401) {
          localStorage.removeItem("authUser");
          setAuthUser(null);
          return null
        }
  
      } catch (error) {
        console.log(error.sendMessage, "Error in useSendMessage");
      }
    };
    return { sendMessage };
  };
  
  export default useSendMessage;
  