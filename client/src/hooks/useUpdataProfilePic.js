import { useAuthContext } from "../context/AuthContext";
import {API_URL} from "../config"


const useUpdataProfilePic = () => {
    const {setAuthUser} = useAuthContext()
    
    const updateProfilePic = async (file) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', file);

            const res = await fetch(`${API_URL}/api/profile/update-profile-pic`, {
                method: "POST",
                body: formData,  // Send the FormData object
                credentials: "include"
            });
            
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update profile picture");
            }
            
           const localUser = JSON.parse(localStorage.getItem("authUser"))
           localUser.profilePic = data.profilePic
           localStorage.setItem("authUser", JSON.stringify(localUser))
           setAuthUser(localUser)
            return data;
            
        } catch (error) {
            throw new Error(error.message || "Failed to update profile picture");
        }
    }
    return { updateProfilePic };
}

export default useUpdataProfilePic;