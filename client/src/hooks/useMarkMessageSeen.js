import {API_URL} from "../config"
import useGlobalState from "../zustand/useGlobalState";

const useMarkMessageSeen = ()=> {
const {token} = useGlobalState()
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