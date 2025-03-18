import toast from "react-hot-toast";

const useSendEmail = () => {

    const sendEmail = async ({email}) => {
      try {
        const response = await fetch(`/api/auth/send-email`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),

        });
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error);
        }
        toast.success("Password reset link sent to your email")
      } catch (error) {
        console.log(error.message, "Error in useSendEmail");
      }
    };
    return { sendEmail };
  };
  
  export default useSendEmail;
  