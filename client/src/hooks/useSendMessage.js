import {API_URL} from "../config"

const useSendMessage = () => {

    const sendMessage = async (id,message) => {
      try {
        const response = await fetch(`${API_URL}/api/messages/send/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
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
  