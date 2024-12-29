import { useEffect,useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";

const Message = () => {
  const {getConversations} = useGetConversations()
  const [conversations,setConversations] = useState([])
  const [loading,setLoading] = useState(false)
  
  const message = "What are you doing right now , Can we talk ?";
  const online = true;

  const handleMessageSlice = (message, limit) => {
    if (message.length > limit) {
      return message.slice(0, limit) + "....";
    } else return message;
  };

  useEffect(()=>{
    const fetchConversations = async()=>{
    const data =  await getConversations()
    setConversations(data)
      setLoading(true)
    }
    fetchConversations()
  },[])


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
      {conversations.message ? <p className="px-6 py-4 text-gray-400 text-base text-wrap ">Your chats will appear here.  Send a message to get started!</p> : conversations.map((nestedArray)=>(
      nestedArray.map((conversation)=>(
        <div key={conversation._id} className="w-full flex items-center justify-between py-2 px-6 cursor-pointer hover:bg-secondary">
      <div className="flex gap-3 items-center">
        <div className={`avatar ${online ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </div>
        <div className="name">
          <h3>{conversation.fullName}</h3>
          <h5>{handleMessageSlice(message, 28)}</h5>
        </div>
      </div>
      <h5 className="text-xs">8:40 PM</h5>
    </div>
      ))
    ))}
      </>
    )}
    
    </>
  );
};

export default Message;
