import {API_URL} from "../config"
import useGlobalState from "../zustand/useGlobalState";

const useGetFriends = () => {
const {token} = useGlobalState()
  const getFriends = async () => {
    try {
      const response = await fetch(`${API_URL}/api/friends`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if(!response.ok){
        const error = data.message
        return error
      }
      return data
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return { getFriends };
};

export default useGetFriends;
