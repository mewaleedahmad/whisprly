import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import {API_URL} from "../constants"
import { useNavigate } from "react-router-dom";

const useUpdateAccountInfo  = ()=>{
    const navigate = useNavigate()
    const {authUser,setAuthUser} = useAuthContext()
    const updateAccountInfo = async({newEmail,newUserName,newFullName})=>{
        try {
             const response = await fetch(`${API_URL}/api/profile//update-account-info`,{
                 method: "POST",
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}`
                 },
                 body: JSON.stringify({newEmail,newUserName,newFullName}),
             })
             const data = await response.json();

             if (response.status === 401) {
                localStorage.removeItem("authUser");
                setAuthUser(null);
                navigate("/login")
                throw new Error("Unauthorized. Please log back in")
              }
             if (response.status === 400) {
                throw new Error(data.message)
              }
             if (response.status === 200) {
                toast.success(data.message)
            }

             const localUser = JSON.parse(localStorage.getItem('authUser'))
             localUser.email = data?.email
             localUser.userName = data?.userName
             localUser.fullName = data?.fullName
             
             localStorage.setItem('authUser',JSON.stringify(localUser))
             setAuthUser(localUser)
             
             return data
        } catch(error){
             toast.error(error.message || "Something went wrong")
        }
    }
    return {updateAccountInfo}
}

export default useUpdateAccountInfo;