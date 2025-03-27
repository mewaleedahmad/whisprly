import { useAuthContext } from "../../context/AuthContext";
import useGlobalState from "../../zustand/useGlobalState";
import { useEffect, useRef } from "react";
import useMarkMessageSeen from "../../hooks/useMarkMessageSeen";

const ConversationContainer = () => {
  const {messages,selectedConversation,loadingState} = useGlobalState()
  const {authUser} = useAuthContext()
  const {markMessageSeen} = useMarkMessageSeen()
  const myMessage = authUser._id
  const myPic = authUser.profilePic
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  function getLocalTime(isoString) {
    try {
      const date = new Date(isoString); // Parse the ISO string
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time in local time zone
    } catch (error) {
      console.error("Invalid ISO string provided:", error);
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const lastMessage = messages?.[messages.length - 1];
    
    if (lastMessage && 
        selectedConversation?._id && 
        lastMessage.receiverId === authUser._id && 
        lastMessage.senderId === selectedConversation._id && 
        !lastMessage.seen) {
      markMessageSeen(selectedConversation._id);
    }
  }, [messages, selectedConversation?._id, authUser._id]);


  return (
    <div className="w-full py-2 h-full">
      <section className="lg:px-4 px-2 py-4 flex hidden-scrollable-div flex-col gap-2">
        {loadingState ? 
          <>
          {[1,2,3,4,5].map((i)=>(
            <div key={i}>
              <div className="chat chat-end">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton lg:w-40 w-32"></div>
          </div>
            <div className="chat chat-start">
            <div className="chat-image   avatar">
              <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
            </div>
            <div className="chat-bubble bg-secondary  skeleton lg:w-40 w-32 "></div>
          </div>
            </div>
          ))}
          </>
         : 
        <>
          {messages?.map((msg)=>(
            <div key={msg?._id}>
            {((msg.senderId === authUser._id && msg.receiverId === selectedConversation?._id) || (msg.senderId === selectedConversation._id && msg.receiverId === authUser._id)) 
            &&
            <div key={msg?._id} className={`chat ${msg?.senderId === myMessage ? "chat-end" : "chat-start"} `}>
            <h5 className="chat-header text-xs mx-1 mb-1 opacity-80">
                {getLocalTime(msg?.createdAt)}                  
            </h5>
          <div className="chat-image avatar">
            <div className="w-10 bg-quaternary rounded-full">
              <img
                src={msg?.senderId === myMessage ? myPic : selectedConversation.profilePic}
                />
            </div>
          </div>
          <div  className={`chat-bubble text-[14px] flex items-center justify-center lg:text-base text-gray-100 ${msg?.senderId === myMessage ? "bg-violet-700" : "bg-secondary"} `}>
            {msg?.message}
          </div>
          {
            msg.senderId == myMessage && 
             <h5 className="chat-footer text-xs mx-1 opacity-80">
               {msg?.seen && <p>seen</p>}
            </h5>
          }
        </div>
            }
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
        }
      </section>
    </div>
  );
};

export default ConversationContainer;
