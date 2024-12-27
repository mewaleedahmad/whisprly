import toast from "react-hot-toast";

const useRemoveFriend = () => {

    const removeFriend = async (id) => {
        try {
            const response = await fetch(`/api/friends/remove/${id}`,{
                method : "DELETE",
            })
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Something went wrong")
            }
            
            toast.success(data.message);
        } catch (error) {
            throw new Error(error.message || "Something went wrong");
        }
    }
    return {removeFriend}
}

export default useRemoveFriend