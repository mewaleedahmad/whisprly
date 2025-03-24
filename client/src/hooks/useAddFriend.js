import toast from "react-hot-toast";
import {API_URL} from "../config"

const useAddFriend = () => {

    const addFriend = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/friends/add/${id}`,{
                method : "POST",
                credentials: 'include',
            })
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Something went wrong")
            }
            toast.success("Friend Added");
            return data
        } catch (error) {
            throw new Error(error.message || "Something went wrong");
        }
    }
    return {addFriend}
}

export default useAddFriend