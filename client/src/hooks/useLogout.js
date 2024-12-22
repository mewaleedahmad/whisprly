import toast from "react-hot-toast";

const useLogout = () => {

  const logout = async () => {

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      localStorage.removeItem("token");
      toast.success(data.message);

    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
};
return  {logout} ;
};

export default useLogout;
