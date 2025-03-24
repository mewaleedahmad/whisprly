import {API_URL} from "../config"

const useGetLastMessage = ()=> {
    const getLastMessage = async()=>{
        try {
            
            const response = await fetch(`${API_URL}/api/messages/get-last-message`,{
              credentials: 'include',
            });
            const data = await response.json();
      
            if (!response.ok) {
              const error = data.message
              return error
            }
      
            return data
        } catch (error) {
          throw new Error(error.message);
          }

    }
    return {getLastMessage}
}
export default useGetLastMessage