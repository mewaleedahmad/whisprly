import toast from "react-hot-toast";

import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const {setAuthUser} = useAuthContext()

    const login = async ({ email,password }) => {
        try {
            const response = await fetch('/api/auth/login', {
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
           toast.success(data.message);
           
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return { login };
};

export default useLogin;
