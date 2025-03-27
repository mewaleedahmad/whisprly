import { useAuthContext } from "../context/AuthContext";
import {API_URL} from "../constants"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";


const useUpdataProfilePic = () => {
    const navigate = useNavigate()
    const {authUser,setAuthUser} = useAuthContext()
    const updateProfilePic = async (file) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', file);

            const response = await fetch(`${API_URL}/api/profile/update-profile-pic`, {
                method: "POST",
                body: formData,  // Send the FormData object
                headers:{
                    'Authorization': `Bearer ${authUser.token}`
                }
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
             if (response.status === 500) {
                throw new Error(data.message)
              }
             if (response.status === 200) {
                toast.success(data.message)
            }
            
           const localUser = JSON.parse(localStorage.getItem("authUser"))
           localUser.profilePic = data.profilePic
           localStorage.setItem("authUser", JSON.stringify(localUser))
           setAuthUser(localUser)

            return data;
            
        } catch (error) {
            throw new Error(error.message || "Something went wrong");
        }
    }
    return { updateProfilePic };
}

export default useUpdataProfilePic;