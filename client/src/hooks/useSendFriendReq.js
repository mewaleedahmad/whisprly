import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";


const useSendFriendReq = () => {
  const {authUser,setAuthUser} = useAuthContext()
    const sendFriendReq = async(id)=>{
        try {
            const response = await fetch(`${API_URL}/api/friends/request/send/${id}`,{
                method: "POST",
                headers:{
                    'Authorization': `Bearer ${authUser.token}`
                }
            })
            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("authUser");
                setAuthUser(null);
                return null
              }
            if(response.status === 400){
                throw new Error(data.error)
            }  
            toast.success(data.message)

        } catch (error) {
            toast.error(error.message || "Something went wrong");
          }
    }
    return {sendFriendReq}
};
export default useSendFriendReq;
