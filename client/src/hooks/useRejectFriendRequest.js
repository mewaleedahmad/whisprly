import { toast } from "react-hot-toast";

const useRejectFriendRequest = () => {

  const rejectFriendRequest = async (id) => {
    try {
      const response = await fetch(`/api/friends/request/reject/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return { rejectFriendRequest };
};

export default useRejectFriendRequest;
