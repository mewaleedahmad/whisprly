import toast from "react-hot-toast";
import {API_URL} from "../constants"


const useSendEmail = () => {
    const sendEmail = async ({email}) => {
      try {
        const response = await fetch(`${API_URL}/api/auth/send-email`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),

        });
        const data = await response.json();
  
        if (response.status === 400) {
          throw new Error(data.error)
        }
        toast.success("Password reset link sent to your email")
      } catch (error) {
        toast.error(error.message || "Something went wrong")
      }
    };
    return { sendEmail };
  };
  
  export default useSendEmail;
  