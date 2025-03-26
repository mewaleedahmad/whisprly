import {API_URL, token} from "../constants"

const useMarkMessageSeen = ()=> {
    const markMessageSeen = async(id)=>{
      try {
        await fetch(`${API_URL}/api/messages/mark-message-seen/${id}`, {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Error marking messages as seen:', error);
      }

    }
    return {markMessageSeen}
}
export default useMarkMessageSeen