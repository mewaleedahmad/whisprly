import toast from "react-hot-toast";
import {API_URL} from "../config"


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
  
        if (!response.ok) {
          toast.error(data.error || "Email not associated with any account")
          return
        }
        toast.success("Password reset link sent to your email")
      } catch (error) {
        console.log(error.message, "Error in useSendEmail")
      }
    };
    return { sendEmail };
  };
  
  export default useSendEmail;
  