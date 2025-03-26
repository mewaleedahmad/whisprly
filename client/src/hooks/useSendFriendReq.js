import toast from "react-hot-toast";
import {API_URL, token} from "../constants"


const useSendFriendReq = () => {
    const sendFriendReq = async(id)=>{
        try {
            const response = await fetch(`${API_URL}/api/friends/request/send/${id}`,{
                method: "POST",
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Something went wrong")
            }
            toast.success(data.message);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
          }
    }
    return {sendFriendReq}
};
export default useSendFriendReq;
