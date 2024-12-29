import toast from "react-hot-toast";

const useSendFriendReq = () => {

    const sendFriendReq = async(id)=>{
        try {
            const response = await fetch(`/api/friends/request/send/${id}`,{
                method: "POST",
                credentials: 'include',
            })
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Something went wrong")
            }
            toast.success(data.message);

        } catch (error) {
            toast.error(error.message || "Something went wrong");
          }
    }
    return {sendFriendReq}
};
export default useSendFriendReq;
