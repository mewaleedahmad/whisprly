import {API_URL, token} from "../constants"

const useGetLastMessage = ()=> {
    const getLastMessage = async()=>{
        try {
            
            const response = await fetch(`${API_URL}/api/messages/get-last-message`,{
              headers:{
                'Authorization': `Bearer ${token}`
              }
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