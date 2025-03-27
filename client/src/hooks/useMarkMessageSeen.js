import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useMarkMessageSeen = ()=> {
  const {authUser} = useAuthContext()

    const markMessageSeen = async(id)=>{
        await fetch(`${API_URL}/api/messages/mark-message-seen/${id}`, {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${authUser.token}`
          }
        });
    }
    return {markMessageSeen}
}
export default useMarkMessageSeen