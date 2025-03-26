import toast from "react-hot-toast";
import {API_URL, token} from "../constants"


const useRemoveFriend = () => {
    const removeFriend = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/friends/remove/${id}`,{
                method : "DELETE",
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
            throw new Error(error.message || "Something went wrong");
        }
    }
    return {removeFriend}
}

export default useRemoveFriend