import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useGetLastMessage = ()=> {
  const {authUser,setAuthUser} = useAuthContext()
    const getLastMessage = async()=>{
        try {
            const response = await fetch(`${API_URL}/api/messages/get-last-message`,{
              headers:{
                'Authorization': `Bearer ${authUser.token}`
              }
            });
            const data = await response.json();
      
            if (response.status === 401) {
              localStorage.removeItem("authUser");
              setAuthUser(null);
              return null;
            }
      
            return data
        } catch (error) {
          toast.error(error.message || "Something went wrong");
          }

    }
    return {getLastMessage}
}
export default useGetLastMessage