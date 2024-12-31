const useGetLastMessage = ()=> {
    const getLastMessage = async()=>{
        try {
            
            const response = await fetch("/api/messages/get-last-message",{
              credentials: 'include',
            });
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.error);
            }
      
            return data
        } catch (error) {
            console.log(error.getMessages, "Error in useGetLastMessage");
          }

    }
    return {getLastMessage}
}
export default useGetLastMessage