import { useEffect,useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useGlobalState from "../../zustand/useGlobalState";
import useGetMessages from "../../hooks/useGetMessages";
import useGetLastMessage from "../../hooks/useGetLastMessage";
import { useSocketContext } from "../../context/SocketContext";

const Message = () => {
  const [loading,setLoading] = useState(false)
  const {conversations,setConversations,selectedConversation,setSelectedConversation,setMessages,setLoadingState,lastMessage,setLastMessage} = useGlobalState();
  const {getConversations} = useGetConversations()
  const {getMessages} = useGetMessages()
  const {getLastMessage} = useGetLastMessage()
  const {onlineUsers} = useSocketContext()


  function getLocalTime(isoString) {
    try {
      const date = new Date(isoString); // Parse the ISO string
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time in local time zone
    } catch (error) {
      console.error("Invalid ISO string provided:", error);
    }
  }

  const handleSliceMessage = (message, limit) => {
    if (message.length > limit) {
      return message.slice(0, limit) + "....";
    } else return message;
  };

  const handleGetMessages = async (id) => {
    setLoadingState(true)
    const data = await getMessages(id)
    setMessages(data)
    setLoadingState(false)
  }

  useEffect(()=>{
    setLoading(false)
    const fetchConversations = async()=>{
    const data =  await getConversations()
    setConversations(data)
      setLoading(true)
    }
    fetchConversations()
  },[])

useEffect(()=>{
  const handleGetLastMessage = async()=>{
   const data = await getLastMessage()
   setLastMessage(data)
  }
  handleGetLastMessage()
},[])

useEffect(()=>{

  return ()=>{
    setSelectedConversation(null)
    setMessages([])
    setLoadingState(false)
  }
},[setLoadingState, setMessages, setSelectedConversation])


  return (
    <>
    {!loading ? 
      <div className="flex w-52 mt-4  mx-5 flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-secondary"></div>
          <div className="flex flex-col gap-1">
            <div className="skeleton h-4 w-20 bg-secondary"></div>
            <div className="skeleton h-4 w-32 bg-secondary"></div>
          </div>
        </div>
      </div> :  (
      <>
      {((conversations.message) || (conversations.length === 0)) ? (
  <p className="px-6 py-4 text-gray-400 text-base">Your chats will appear here. Send a message to get started!</p>
) : (
    conversations.map((convo) => {
      const matchingMessage = lastMessage.find(
        (msg) => convo._id === msg.senderId || convo._id === msg.receiverId
      );
      const isActive = onlineUsers.includes(convo._id);
      return (
        <div onClick={() => {setSelectedConversation(convo);handleGetMessages(convo._id);}} key={convo._id} 
         className={`w-full flex items-center justify-between  py-2 px-6 cursor-pointer ${selectedConversation?._id === convo?._id ? "bg-secondary" : ""  } hover:bg-secondary`}>
          <div className="flex gap-3 items-center ">
            <div className={`avatar ${isActive ? "online" : "offline"}`}>
              <div className="w-12 bg-quaternary rounded-full">
                <img src={convo.profilePic} alt="Profile" />
              </div>
            </div>
            <div className="name">
              <div className="flex gap-2 items-center">
              <h3>{convo.fullName}</h3>
              
              {convo.userName === "waleed_gondal" ? 
               <div className="text-[10px]  bg-[#646ee4] text-white rounded-xl px-1">Creater</div> 
              : ""}
              </div>
              {matchingMessage ? (
                <h5>{handleSliceMessage(matchingMessage.message, 28)}</h5>
              ) : (
                <h5></h5>
              )}
            </div>
          </div>
          {matchingMessage ? (
          <h5 className="text-xs">{getLocalTime(matchingMessage.createdAt)}</h5>
              ) : (
                <h5></h5>
              )}
        </div>
      );
    })
  
)}

      </>
    )}
    
    </>
  );
};

export default Message;
