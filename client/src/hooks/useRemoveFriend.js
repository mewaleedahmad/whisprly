import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";


const useRemoveFriend = () => {
  const {authUser,setAuthUser} = useAuthContext()

    const removeFriend = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/friends/remove/${id}`,{
                method : "DELETE",
                headers:{
                    'Authorization': `Bearer ${authUser.token}`
                }
            })
            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("authUser");
                setAuthUser(null);
                return null;
              }
             if (response.status === 400) {
                throw new Error(data.error)
              }
             if (response.status === 200) {
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    }
    return {removeFriend}
}

export default useRemoveFriend