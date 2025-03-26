import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import {API_URL} from "../config"
import useGlobalState from "../zustand/useGlobalState"

const useUpdateAccountInfo  = ()=>{
    const {setAuthUser} = useAuthContext()
    const {token} = useGlobalState()
    const updateAccountInfo = async({newEmail,newUserName,newFullName})=>{
        try {
             const response = await fetch(`${API_URL}/api/profile//update-account-info`,{
                 method: "POST",
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 },
                 body: JSON.stringify({newEmail,newUserName,newFullName}),
             })
             const data = await response.json();
             if(!response.ok){
                 toast.error(data.message)
                 throw new Error(data.message)
             }
             localStorage.setItem('authUser',JSON.stringify(data))
             setAuthUser(data)
             return data
        } catch (error) {
             throw new Error(error.message || "An error occurred")
        }
    }
    return {updateAccountInfo}
}

export default useUpdateAccountInfo;