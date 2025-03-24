import {API_URL} from "../config"

const useGetUsers = () => {
    
    const getUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/getusers`,{
                credentials: 'include',
            })
            const data = await response.json()
            
            if (!response.ok) {
                throw new Error(data.error || "An error occurred")
            }
            return data
        } catch (error) {
            throw new Error(error.message || "Something went wrong")
        }
    }

    return { getUsers }
}

export default useGetUsers