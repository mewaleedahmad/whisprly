import { useAuthContext } from "../../context/AuthContext";
import useSelectedConversation from "../../zustand/useSelectedConversation";

const ConversationContainer = () => {
  const {messages,selectedConversation,loadingState} = useSelectedConversation()
  const {authUser} = useAuthContext()
  const myMessage = authUser._id
  const myPic = authUser.profilePic

  return (
    <div className="w-full py-2 h-full">
      <section className="lg:px-5 px-3 py-6 flex scrollable-div flex-col gap-1">
        {loadingState ? 
          <>
          <div className="chat chat-end">
          <div className="chat-image   avatar">
            <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
          </div>
          <div className="chat-bubble bg-secondary  skeleton w-40 "></div>
        </div>
          <div className="chat chat-start">
          <div className="chat-image   avatar">
            <div className="w-11 h-11  bg-secondary rounded-full skeleton"></div>
          </div>
          <div className="chat-bubble bg-secondary  skeleton lg:w-40 w-32 "></div>
        </div>
          </>
         : 
        <>
          {messages.map((msg)=>(
            <div key={msg._id} className={`chat ${msg.senderId === myMessage ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={msg.senderId === myMessage ? myPic : selectedConversation.profilePic}
                />
              </div>
            </div>
            <div  className={`chat-bubble text-[14px] flex items-center justify-center lg:text-base text-gray-100 ${msg.senderId === myMessage ? "bg-violet-700" : "bg-secondary"} `}>
              {msg.message}
            </div>
          </div>
          ))}
        </>
        }
      </section>
    </div>
  );
};

export default ConversationContainer;
