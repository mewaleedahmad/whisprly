import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import {API_URL} from "../config"


const useSignUp = () => {
    const {setAuthUser} = useAuthContext()

    const signUp = async ({ email, userName, fullName, gender, password, confirmPassword }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, userName, fullName, gender, password, confirmPassword }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "An error occurred");
            }
           localStorage.setItem("authUser",JSON.stringify(data))
           setAuthUser(data)
           toast.success(data.message);
           
        } catch(error) {
            toast.error(error.message || "Something went wrong");
        } 
    };

    return { signUp };
};

export default useSignUp;
