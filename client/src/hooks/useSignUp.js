import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const signUp = async ({ email, userName, fullName, gender, password, confirmPassword }) => {
        const success = handleInputValidation({ email, userName, fullName, gender, password, confirmPassword });
        if (!success) return;

        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, userName, fullName, gender, password, confirmPassword }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "An error occurred");
            }
           localStorage.setItem("authUser",JSON.stringify(data))
           setAuthUser(data)
           toast.success(data.message);
           
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signUp };
};

export default useSignUp;

const handleInputValidation = ({ email, userName, fullName, gender, password, confirmPassword }) => {
    if (!email || !userName || !fullName || !gender || !password || !confirmPassword) {
        toast.error('Please fill all fields');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be 6+ characters');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    return true;
};
