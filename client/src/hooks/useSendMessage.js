import {API_URL, token} from "../constants"

const useSendMessage = () => {
    const sendMessage = async (id,message) => {
      try {
        const response = await fetch(`${API_URL}/api/messages/send/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(message),

        });
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error);
        }
  
      } catch (error) {
        console.log(error.sendMessage, "Error in useSendMessage");
      }
    };
    return { sendMessage };
  };
  
  export default useSendMessage;
  