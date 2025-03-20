const useMarkMessageSeen = ()=> {
    const markMessageSeen = async(id)=>{
      try {
        await fetch(`/api/messages/mark-message-seen/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error marking messages as seen:', error);
      }

    }
    return {markMessageSeen}
}
export default useMarkMessageSeen