import toast from "react-hot-toast";
import {API_URL} from "../config"
import { useAuthContext } from "../context/AuthContext";
import useGlobalState from "../zustand/useGlobalState";

const useLogin = () => {
    const {setAuthUser} = useAuthContext()
    const {setToken} = useGlobalState()
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

            if (!response.ok) {
                throw new Error( data.error || "An error occurred");
            }
           localStorage.setItem("authUser",JSON.stringify(data))
           setAuthUser(data)
           setToken(data.token)
           toast.success(data.message);
           
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return { login };
};

export default useLogin;
