import toast from "react-hot-toast";
import {API_URL} from "../constants"
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const {setAuthUser} = useAuthContext()
    const login = async ({ email,password }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email,password }),
            });
            const data = await response.json();

             if (response.status === 400) {
                throw new Error(data.error)
              }
             if (response.status === 200) {
                toast.success(data.message)
            }
           localStorage.setItem("authUser",JSON.stringify(data))
           setAuthUser(data)
           
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return { login };
};

export default useLogin;
