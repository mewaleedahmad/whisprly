import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateAccountInfo  = ()=>{
    const {setAuthUser} = useAuthContext()

    const updateAccountInfo = async({newEmail,newUserName,newFullName})=>{
        try {
             const response = await fetch(`/api/profile//update-account-info`,{
                 method: "POST",
                 credentials: 'include',
                 headers: {
                    'Content-Type': 'application/json',
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