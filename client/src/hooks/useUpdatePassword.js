import toast from "react-hot-toast";
import {API_URL, token} from "../constants"

const useUpdatePassword = ()=>{
    const updatePassword = async({ oldPassword, newPassword, confirmNewPassword }) => {
       try {
            const response = await fetch(`${API_URL}/api/profile/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(data);
                return;
            }
            toast.success(data);
            return data;
           
        } catch(error) {
            throw new Error(error.message || "Something went wrong");
        } 
    }
return {updatePassword};
}

export default useUpdatePassword;