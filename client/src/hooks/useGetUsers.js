import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useGetUsers = () => {
  const {authUser,setAuthUser} = useAuthContext()
    const getUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getusers`,{
                headers:{
                    'Authorization': `Bearer ${authUser.token}`
                }
            })
            const data = await response.json()
            
            if (response.status === 401) {
                localStorage.removeItem("authUser");
                setAuthUser(null);
                return null;
              }
            return data
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    return { getUsers }
}

export default useGetUsers