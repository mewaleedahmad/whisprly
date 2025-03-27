import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useUpdatePassword = ()=>{
  const {authUser,setAuthUser} = useAuthContext()
  const navigate = useNavigate()
    const updatePassword = async({ oldPassword, newPassword, confirmNewPassword }) => {
       try {
            const response = await fetch(`${API_URL}/api/profile/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}`
                },
                body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
            });
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
                return;
            }
            return data;
           
        } catch(error) {
            toast.error(error.message || "Something went wrong")

        } 
    }
return {updatePassword};
}

export default useUpdatePassword;